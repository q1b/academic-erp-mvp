import { redirect } from "next/navigation";
import { getCurrentSession, invalidateSession } from "./session";
import { generateCodeVerifier, generateState } from "arctic";
import { google } from "./oauth";
import { cookies } from "next/headers";

export async function signIn(): Promise<ActionResult> {
    const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "profile", "email"]);
    const cookieStore = await cookies();
	cookieStore.set("google_oauth_state", state, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax"
	});
	cookieStore.set("google_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax"
	});

    return redirect(url.toString())
}

export async function signOut(): Promise<ActionResult> {
	"use server";
	const session = await getCurrentSession();

	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await invalidateSession(session.id);
	return redirect("/");
}

interface ActionResult {
	error: string | null;
}