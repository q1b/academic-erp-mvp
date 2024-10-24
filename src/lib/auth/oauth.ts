import { Google } from "arctic";
import { env } from "@/env";

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${env.NODE_ENV === 'development' ? 'http://localhost:3000/api/auth/callback/google' : 'https://srisriuniversity.vercel.app/api/auth/callback/google'}`
);