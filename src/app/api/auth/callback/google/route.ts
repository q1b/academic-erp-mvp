import { setSession } from "@/lib/auth/session";
import { google } from "@/lib/auth/oauth";
import { cookies } from "next/headers";
import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { createUser, getUserFromGoogleId } from "@/database/actions/user";
import { redirect } from "next/navigation";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
    const cookieStore = await cookies()
	const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
	const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;

	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	
	const claims = decodeIdToken(tokens.idToken()) as { sub: string; name: string; email: string; picture: string };;

 	const googleUserId = claims.sub;
	const name = claims.name;
    const email = claims.email;
    const picture = claims.picture;

	const existingUser = await getUserFromGoogleId(googleUserId);

	if (existingUser) {
		await setSession(existingUser.id)
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	}

	const user = await createUser({googleId: googleUserId, name, email, picture, role: 'user'});
	await setSession(user.id);

	return redirect("/");
}