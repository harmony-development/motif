import yargs from "yargs";
import { runMigrations } from "./cli/migrate";
import { runServer } from "./cli/run";

// eslint-disable-next-line no-unused-expressions
yargs.scriptName("motif")
	.command("$0", "Start the server", () => {}, () => { runServer(); })
	.command("migrate", "Run database migrations", () => {}, () => { runMigrations(); })
	.help()
	.argv;
