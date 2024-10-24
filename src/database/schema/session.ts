import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "../utils";
import { userTable } from "./user";
import { relations } from "drizzle-orm";

export const sessionTable = sqliteTable('session', {
	id,
	userId: text('user_id')
		.notNull()
      	.references(() => userTable.id, { onDelete: "cascade" }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt,
});

export const sessionTableRelation = relations(sessionTable, ({one}) => ({
	user: one(userTable,{
		fields: [sessionTable.userId],
		references: [userTable.id],
	})
}));

export type Session = typeof sessionTable.$inferSelect;