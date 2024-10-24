import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createdAt, id } from '../../utils';
import { relations } from 'drizzle-orm';
import { academicDivisionTable } from '../university/academic_division';

export const facultyTable = sqliteTable('faculty', {
	id,
    academicDivisionId: text('academic_division_id').references(() => academicDivisionTable.id),
    designation: text('designation'),
	createdAt
});

export const facultyTableRelation = relations(facultyTable, ({ one }) => ({
    academicDivision: one(academicDivisionTable,{
		fields: [facultyTable.academicDivisionId],
		references: [academicDivisionTable.id],
	})
}));

export type Faculty = typeof facultyTable.$inferSelect;