import "server-only";
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { deleteSessionTokenCookie, getSessionToken, setSessionTokenCookie } from './cookie';
import { cache } from 'react';

import { db } from '@/database';
import * as table from '@/database/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const SESSION_REFRESH_INTERVAL_MS = DAY_IN_MS * 15;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

export const sessionCookieName = 'auth-session';

function generateSessionToken(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(20));
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

async function createSession(token:string, userId: string): Promise<table.Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
		createdAt: new Date()
	};
	await db.insert(table.sessionTable).values(session);
	return session;
}

async function validateRequest() {
	const sessionToken = await getSessionToken();
	if (!sessionToken) {
	  return { session: null, user: null };
	}
	return validateSessionToken(sessionToken);
}  

const validateSessionToken = cache(async (token: string) => {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const [result] = await db
		.select({
			// Adjust user table here to tweak returned data
			user: { id: table.userTable.id, email: table.userTable.email, name: table.userTable.name, picture: table.userTable.picture, role: table.userTable.role },
			session: table.sessionTable
		})
		.from(table.sessionTable)
		.innerJoin(table.userTable, eq(table.sessionTable.userId, table.userTable.id))
		.where(eq(table.sessionTable.id, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.sessionTable).where(eq(table.sessionTable.id, session.id));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
		await db
			.update(table.sessionTable)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.sessionTable.id, session.id));
	}

	return { session, user };
})

export const getCurrentUser = async () => {
    const { user } = await validateRequest();
    return user ?? undefined;
};

export const getCurrentSession = async () => {
    const { session } = await validateRequest();
    return session ?? undefined;
}

export async function setSession(userId: string) {
    const token = generateSessionToken();
    const session = await createSession(token, userId);
    setSessionTokenCookie(token, session.expiresAt);
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(table.sessionTable).where(eq(table.sessionTable.id, sessionId));
	deleteSessionTokenCookie();
}

async function invalidateUserSessions(userId: string): Promise<void> {
	await db.delete(table.sessionTable).where(eq(table.userTable.id, userId));
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;
