import createCallsiteRecord from "callsite-record";
import yargs from "yargs";
import { runMigrations } from "./cli/migrate";
import { runServer } from "./cli/run";

const debug = !!process.env.DEBUG || false;

process.on("unhandledRejection", (err) => {
	if (debug && err instanceof Error)
		console.log(createCallsiteRecord({ forError: err })?.renderSync({}));
	else console.error(err);
});

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
