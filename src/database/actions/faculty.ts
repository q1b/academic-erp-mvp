import { eq } from "drizzle-orm";
import { db } from "..";
import { facultyTable } from "../schema";

export async function getFacultyList() {
    return await db.query.facultyTable.findMany();
}

export async function getFaculty(id:string) {
    return await db.query.facultyTable.findFirst({
        where: eq(facultyTable.id, id)
    })
}