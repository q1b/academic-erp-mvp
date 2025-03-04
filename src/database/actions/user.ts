import { eq } from "drizzle-orm";
import { db } from "..";
import { userTable, type InsertUser, type User } from "../schema";

export async function getUserFromEmail(email: string): Promise<User | undefined> {
    return await db.query.userTable.findFirst({
        where: eq(userTable.email, email)
    });
}

export async function createUser({
    email,
    name, 
    picture,
    role,
}:InsertUser): Promise<User> {
    return (await db.insert(userTable).values({
        email,
        name,
        picture,
        role
    }).returning())[0];
}

export async function updateUser(userId: string, props: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<void> {
    await db.update(userTable).set({
        ...props
    }).where(eq(userTable.id, userId));
}