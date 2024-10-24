import { db } from "..";
import * as schema from "../schema";

export async function resetDatabase() {
    for (const table of [
        schema.userTable,
        schema.sessionTable
    ]) {
        await db.delete(table);
    }
}