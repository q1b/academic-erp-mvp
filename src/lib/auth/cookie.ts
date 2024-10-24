import { env } from "process";
import { sessionCookieName } from "./session";
import { cookies } from "next/headers";

export async function getSessionToken(): Promise<string | undefined> {
	return (await cookies()).get(sessionCookieName)?.value;
}

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
	(await cookies()).set(sessionCookieName, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: env.NODE_ENV === "production",
		expires: expiresAt,
		path: "/",
	});
}

export async function deleteSessionTokenCookie(): Promise<void> {
	(await cookies()).set(sessionCookieName, "", {
		httpOnly: true,
		sameSite: "lax",
		secure: env.NODE_ENV === "production",
		maxAge: 0,
		path: "/",
	});
}