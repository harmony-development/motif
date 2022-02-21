import Koa from "koa";
import logger from "koa-logger";
import Router from "koa-router";
import websockify from "koa-websocket";
import cors from "@koa/cors";
import chalk from "chalk";
import { AuthServiceDefinition } from "../../gen/auth/v1/auth";
import { registerService } from "../util/adapter";
import { readConfig } from "../config/config";
import { DB } from "../db/db";
import { AuthServiceImpl } from "../impl/auth/auth";

import { authMiddleware } from "../middleware/auth";

import errorHandler from "../util/errorHandler";
import { mainMiddleware } from "../middleware/main";
import { methodMetadata } from "../methodMetadata";

// eslint-ignore

export async function runServer() {
	const config = await readConfig();
	const app = websockify(new Koa());

	const use = (middleware: Koa.Middleware) => {
		app.use(middleware);
		app.ws.use(middleware);
	};

	use(logger());
	use(errorHandler);
	app.use(cors({
		maxAge: 3600,
	}));

	const db = await DB.create(config);

	use(mainMiddleware(db, methodMetadata));
	use(authMiddleware);

	const auth = new AuthServiceImpl(db, config);

	const unaryRouter = new Router();
	const streamRouter = new Router();

	registerService(unaryRouter, streamRouter, AuthServiceDefinition, auth);

	app.use(unaryRouter.routes());
	app.ws.use(streamRouter.routes() as any); // TODO: fix type issue here

	app.listen(config.port, () => {
		// eslint-disable-next-line no-console
		console.log(chalk.magentaBright`                 _   _  __
 _ __ ___   ___ | |_(_)/ _|
| '_ \` _ \\ / _ \\| __| | |_ 
| | | | | | (_) | |_| |  _|
|_| |_| |_|\\___/ \\__|_|_|`);
		// eslint-disable-next-line no-console
		console.log(`${chalk.grey("Listening on")} ${chalk.blueBright(config.port)}`);
	});
}
