import { eq } from "drizzle-orm";
import { db } from "..";
import { userTable, type InsertUser, type User } from "../schema";

export async function getUserFromGoogleId(googleId: string): Promise<User | undefined> {
    return await db.query.userTable.findFirst({
        where: eq(userTable.googleId, googleId)
    });
}

export async function createUser({
    googleId, 
    email,
    name, 
    picture,
    role,
}:InsertUser): Promise<User> {
    return (await db.insert(userTable).values({
        googleId,
        email,
        name,
        picture,
        role
    }).returning())[0];
}