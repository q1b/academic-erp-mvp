import { db } from "..";
import * as schema from "../schema"
import facultyList from './data/faculty.json'
import userList from './data/user.json'

let one = 0;

export async function seedDatabase() {
    console.log(one, "SEEDING")
    if (one >= 1) return;
    one+=1;

}

// Seed Faculty & it's professors
export async function seedFacultyUserDatabase() {
    console.log(one, "SEEDING")
    if (one >= 1) return;
    one+=1;
    for (let facultyIndex = 0; facultyIndex < facultyList.length; facultyIndex++) {
        const faculty = facultyList[facultyIndex];
        // await db.insert(schema.facultyTable).values({
        //     id: faculty.id,
        //     name: faculty.name
        // });
        for (let index = 0; index < userList.length; index++) {
            const user = userList[index]
            switch (user.role) {
                case 'admin':
                    break;
                case 'professor':
                    const userId = crypto.randomUUID();
                    await db.batch([
                        db.insert(schema.userTable).values({
                            id: userId,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            picture: user.picture,
                        }),
                        db.insert(schema.professorTable).values({
                            userId: userId,
                            facultyId: faculty.id,
                            designation: user.desgination
                        })
                    ]);
                    console.log("Inserted Professors")
                    break;
                case 'student':
                    break;
                default:
                    break;
            }
        }
    }
}

export async function resetDatabase() {
    for (const table of [
        schema.userTable,
        schema.sessionTable
    ]) {
        await db.delete(table);
    }
}