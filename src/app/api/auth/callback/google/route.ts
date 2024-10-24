import { setSession } from "@/lib/auth/session";
import { google } from "@/lib/auth/oauth";
import { cookies } from "next/headers";
import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { createUser, getUserFromEmail, updateUserPicture } from "@/database/actions/user";
import { redirect } from "next/navigation";

type GoogleUserResult = {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
};

function extractFromEmail(email_id: string | undefined | null) {
	let group;
	if (!(typeof email_id === 'string')) return { batch: null, program: null, ssu_email: false, student: false };
	const regrex = /(?<name>\w+)\.(?<meta>\w+)@(?<university>\w+)\.edu\.in/;
	group = email_id.match(regrex)?.groups;
	if (!group) return { batch: null, program: null, ssu_email: false, student: false };
	const { name, meta } = group;
	const reg = /(?:[a-zA-Z])+(?<batch>\d{2,4})(?<program>(?:[a-zA-Z])+)/;
	group = meta.match(reg)?.groups;
	if (!group) return { batch: null, program: null, ssu_email: true, student: false };
	const { batch, program } = group;
	return { ssu_email: true, student: true, batch: batch.length === 2 ? `20${batch}` : batch, program };
}

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
	
	const claims = decodeIdToken(tokens.idToken()) as GoogleUserResult;
	console.log(claims);
	
	const name = claims.name;
    const email = claims.email;
    const picture = claims.picture;

	const { batch, program, ssu_email, student } = extractFromEmail(email);
	
	if (ssu_email === false) {
		return redirect('/?info=Only Gmail provided to you by Sri Sri University are valid for now');
	}
	
	const existingUser = await getUserFromEmail(email);
	
	if (existingUser) {
		if((!existingUser.picture) && picture) await updateUserPicture(existingUser.id, picture);
		
		await setSession(existingUser.id)
		return redirect("/");
	}
	
	const user = await createUser({ name, email, picture, role: student ? 'student' : 'user' })
	
	await setSession(user.id);

	return redirect("/");
}