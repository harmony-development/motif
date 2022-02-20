import Koa from "koa";
import Router from "koa-router";
import { AuthServiceDefinition } from "../gen/auth/v1/auth";
import { registerService } from "./adapter";
import { AuthServiceImpl } from "./impl/auth";

function newApp() {
  const app = new Koa();
  const router = new Router();
  const auth = new AuthServiceImpl();
  registerService(router, AuthServiceDefinition, auth);

  app.use(router.routes());
  return app;
}

newApp().listen(2289);
