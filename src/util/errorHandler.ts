import type Koa from "koa";
import { RequestError, errors } from "../errors";

type Context = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>;

export default async function(ctx: Context, next: () => Promise<any>) {
	try {
		await next();
	}
	catch (e) {
		if (e instanceof RequestError) {
			ctx.status = 400;
			ctx.body = e.protoMessage;
		}
		else {
			ctx.status = 500;
			ctx.body = errors["h.internal-error"].protoMessage;
			console.error(e);
		}
	}
}
