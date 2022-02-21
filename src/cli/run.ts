import Koa from "koa";
import logger from "koa-logger";
import Router from "koa-router";
import websockify from "koa-websocket";
import cors from "@koa/cors";
import { AuthServiceDefinition } from "../../gen/auth/v1/auth";
import { registerService } from "../util/adapter";
import { readConfig } from "../config/config";
import { DB } from "../db/index";
import { AuthServiceImpl } from "../impl/auth/auth";

import errorHandler from "../util/errorHandler";

export async function runServer() {
	const config = await readConfig();
	const app = websockify(new Koa());

	const use = (middleware: Koa.Middleware) => {
		app.use(middleware);
		app.ws.use(middleware);
	};

	use(errorHandler);
	use(logger());
	app.use(cors({
		maxAge: 3600,
	}));

	const db = await DB.create(config);
	const auth = new AuthServiceImpl(db);

	const unaryRouter = new Router();
	const streamRouter = new Router();

	registerService(unaryRouter, streamRouter, AuthServiceDefinition, auth);

	app.use(unaryRouter.routes());
	app.ws.use(streamRouter.routes() as any); // TODO: fix type issue here

	app.listen(config.port);
}
