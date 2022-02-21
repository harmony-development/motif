import yargs from 'yargs';

import { runServer } from './cli/run';
import { runMigrations } from './cli/migrate';

yargs.scriptName("motif")
  .command("run", "Start the server", (yargs) => {}, (args) => { runServer() })
  .command("migrate", "Run database migrations", (yargs) => {}, (args) => { runMigrations() })
  .help()
  .argv