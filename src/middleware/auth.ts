import type { Next } from "koa";
import type { KoaMotifContext } from "../util/context";
import { errors } from "../errors";

export const authMiddleware = async (ctx: KoaMotifContext, next: Next) => {
	const { db, metadata } = ctx.state;
	if (metadata.auth) {
		if (!ctx.headers.authorization) throw errors["h.invalid-auth"];
		const user = await db.auth.getSessionUser(ctx.headers.authorization);
		if (!user) throw errors["h.invalid-auth"];
		ctx.state.userId = user.id;
	}

	await next();
};
