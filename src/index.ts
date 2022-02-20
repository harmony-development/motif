import Koa from "koa";
import logger from "koa-logger";
import Router from "koa-router";
import websockify from "koa-websocket";
import { AuthServiceDefinition } from "../gen/auth/v1/auth";
import { registerService } from "./adapter";
import { readConfig } from "./config/config";
import { DB } from "./db/index";
import { AuthServiceImpl } from "./impl/auth/auth";

async function newApp() {
  const config = await readConfig();
  const app = websockify(new Koa());
  app.use(logger());
  app.ws.use(logger());

  const db = new DB(config);
  const auth = new AuthServiceImpl(db);

  const unaryRouter = new Router();
  const streamRouter = new Router();

  registerService(unaryRouter, streamRouter, AuthServiceDefinition, auth);

  app.use(unaryRouter.routes());
  app.ws.use(streamRouter.routes() as any); // TODO: fix type issue here

  app.listen(config.port);
}

newApp();
