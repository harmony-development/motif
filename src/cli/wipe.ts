import type { ReadLine } from "node:readline";
import * as readline from "node:readline";
import { readConfig } from "../config/config";
import { DB } from "../db/db";
import { runMigrations } from "./migrate";

const question = (rl: ReadLine, query: string) => new Promise<string>((resolve, _reject) => rl.question(query, (answer) => resolve(answer)));

export async function wipe() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	const answer = await question(
		rl,
		"Are you sure you want to clear the database? This WILL drop the public schema and recreate it, effectively wiping ALL tables you may have (y/N)"
	);

	if (answer !== "y") {
		console.log("Exiting, database has not been cleared");
	} else {
		const config = await readConfig();
		const db = await DB.create(config);
		console.log("dropping public schema");
		await db.postgres.query("drop schema public cascade");
		console.log("creating public schema");
		await db.postgres.query("create schema public");
		console.log("database wiped");
		await runMigrations();
	}
	rl.close();
}
