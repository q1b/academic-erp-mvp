import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from "./schema";
import { env } from '@/env';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!(env.NODE_ENV === 'development') && !env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN, concurrency: 0 });

export const db = drizzle(client, { schema });