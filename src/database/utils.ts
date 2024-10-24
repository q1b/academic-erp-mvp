import { sql } from 'drizzle-orm';
import { integer, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core';

export const table = sqliteTableCreator((name) => name);

export const id = text('id').primaryKey().$defaultFn(() => crypto.randomUUID());

export const createdAt = integer('created_at', { mode: 'timestamp_ms' }).notNull().default(sql`(unixepoch() * 1000)`)