import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { id } from '../../utils';
import { relations } from 'drizzle-orm';
import { facultyTable } from '.';
import { userTable } from '../user';

export const professorTable = sqliteTable('professor', {
	id,
	facultyId: text('faculty_id').references(() => facultyTable.id, { onDelete: 'cascade' }).notNull(),
	userId: text('user_id').references(() => userTable.id, { onDelete: 'cascade' }).notNull(),
	designation: text('designation')
})

export const professorTableRelation = relations(professorTable, ({ one }) => ({
	user: one(userTable, {
		fields: [professorTable.userId],
		references: [userTable.id],
	}),
    faculty: one(facultyTable,{
		fields: [professorTable.facultyId],
		references: [facultyTable.id],
	})
}))

export type Professor = typeof professorTable.$inferSelect;