import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
  schema: "./src/database/schema",
  dialect: "turso",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
});