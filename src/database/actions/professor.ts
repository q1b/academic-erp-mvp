import { eq } from "drizzle-orm";
import { db } from "..";
import { professorTable } from "../schema";

export async function getProfessorListFromFaculty(facultyId:string) {
    return await db.query.professorTable.findMany({
        where: eq(professorTable.facultyId, facultyId),
        with: {
            user: true
        }
    });
}
