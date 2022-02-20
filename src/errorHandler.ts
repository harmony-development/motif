import { Context } from "koa";
import { RequestError } from "./errors";

export default async function (ctx: Context, next: () => Promise<any>) {
  try {
    await next();
  } catch (e) {
    if (e instanceof RequestError) {
      // do something
    } else {
      throw e;
    }
  }
}
