import { readConfig } from "../config/config";
import { DB } from "../db";

export async function runMigrations() {
  const config = await readConfig();
  const db = new DB(config);
  await db.migrate();
}
