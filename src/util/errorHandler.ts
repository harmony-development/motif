import type Koa from "koa";
import { RequestError, errors } from "../errors";

type Context = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>;

export default async function(ctx: Context, next: () => Promise<any>) {
	try {
		await next();
	}
	catch (e) {
		if (e instanceof RequestError) { ctx.body = e.protoMessage; }
		else {
			ctx.body = errors["h.internal-error"].protoMessage;
			ctx.status = 500;
			console.error(e);
		}
	}
}
