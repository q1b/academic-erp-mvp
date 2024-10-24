import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createdAt, id } from '../utils';
import { relations } from 'drizzle-orm';
import { sessionTable } from './session';

export const userTable = sqliteTable('user', {
	id,
	name: text('name').notNull(),
	email: text('email').notNull(),
	picture: text('picture'),
	role: text('role', { enum: ['user', 'admin', 'professor', 'student'] }).default('user'),
	createdAt
});

export const userTableRelation = relations(userTable, ({many}) => ({
	sessions: many(sessionTable)
}));

export type User = typeof userTable.$inferSelect;
export type InsertUser = typeof userTable.$inferInsert;