import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { id } from "../../utils"
import { relations } from "drizzle-orm"
import { professorTable } from "./professor"

export const facultyTable = sqliteTable('faculty', {
	id,
    name: text('name')
});

export const facultyTableRelation = relations(facultyTable, ({ many }) => ({
    professors: many(professorTable),
}));

export type Faculty = typeof facultyTable.$inferSelect;