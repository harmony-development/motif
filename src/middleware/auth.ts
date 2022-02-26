import type { Next } from "koa";
import { errors } from "../errors";
import type { KoaMotifContext } from "../util/context";

export const authMiddleware = async (ctx: KoaMotifContext, next: Next) => {
	const { db, metadata } = ctx.state;
	if (metadata.auth) {
		const wsProtocol = ctx.header["sec-websocket-protocol"];
		const session = ctx.headers.authorization || wsProtocol?.split(", ")[1];
		if (!session) throw errors["h.invalid-auth"];
		const user = await db.auth.getSessionUser(session);
		if (!user) throw errors["h.invalid-auth"];
		ctx.state.userId = user.id;
	}

	await next();
};
