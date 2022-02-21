import { readConfig } from "../config/config";
import { DB } from "../db/db";

export async function runMigrations() {
	const config = await readConfig();
	const db = await DB.create(config);
	await db.migrate();
}
