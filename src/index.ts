import yargs from "yargs";
import { runMigrations } from "./cli/migrate";
import { runServer } from "./cli/run";

process.on("unhandledRejection", console.error);

// eslint-disable-next-line no-unused-expressions
// eslint-disable-next-line no-void
void yargs.scriptName("motif")
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	.command("$0", "Start the server", () => {}, () => { runServer(); })
	.command("migrate", "Run database migrations", () => {}, async() => {
		await runMigrations();
		process.exit(0);
	})
	.help()
	.argv;
