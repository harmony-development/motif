import yargs from "yargs";
import { runMigrations } from "./cli/migrate";
import { runServer } from "./cli/run";
import { wipe } from "./cli/wipe";
import { errorHandler } from "./util/errorHandler";

const debug = !!process.env.DEBUG || false;

process.on("unhandledRejection", errorHandler(debug));

// eslint-disable-next-line no-void
void yargs
	.scriptName("motif")
	.command(
		"$0",
		"Start the server",
		() => {},
		() => runServer()
	)
	.command(
		"migrate",
		"Run database migrations",
		() => {},
		async () => {
			await runMigrations();
			process.exit(0);
		}
	)
	.command(
		"wipe",
		"Wipes the database",
		() => {},
		async () => {
			await wipe();
			process.exit(0);
		}
	)
	.help().argv;
