import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "../../utils";
import { relations } from "drizzle-orm";
import { facultyTable } from "../user/faculty";

// Engineering and Technology, Ayurveda
export const academicDivisionTable = sqliteTable('academic_division', {
	id,
    name: text('name'),
    createdAt
});

export const academicDivisionTableRelation = relations(academicDivisionTable, ({ many }) => ({
    faculties: many(facultyTable),
}));

export type AcademicDivision = typeof academicDivisionTable.$inferSelect;