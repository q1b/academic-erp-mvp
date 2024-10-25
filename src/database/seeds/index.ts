import { db } from "..";
import * as schema from "../schema"
import faculty from './data/faculty.json'
import users from './data/user.json'

let one = 0;

export async function seedDatabase() {
    if (one >= 1) return;
    one+=1;
    for (let facultyIndex = 0; facultyIndex < faculty.length; facultyIndex++) {
        const facultyId = faculty[facultyIndex].id;
        await db.insert(schema.facultyTable).values({
            id: facultyId,
            name: faculty[facultyIndex].name,
        });
        for (let index = 0; index < users.length; index++) {
            const user = users[index]
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
                            role: user.role
                        }),
                        db.insert(schema.professorTable).values({
                            userId: userId,
                            facultyId: facultyId
                        })
                    ])
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