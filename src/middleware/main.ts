import type { Next, ParameterizedContext } from "koa";
import type { DB } from "../db/db";
import type { MotifContext } from "../util/context";
import type { SmallerMetadata } from "../methodMetadata";

export const mainMiddleware = (db: DB, metadata: Record<string, Partial<SmallerMetadata>>) => (ctx: ParameterizedContext<MotifContext>, next: Next) => {
	ctx.state.db = db;
	ctx.state.metadata = metadata[ctx.path] ?? { auth: true };
	return next();
};
