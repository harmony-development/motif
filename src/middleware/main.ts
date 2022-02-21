import type { Next, ParameterizedContext } from "koa";
import type { DB } from "../db/db";
import type { HarmonyMethodMetadata } from "../../gen/harmonytypes/v1/types";
import type { MotifContext } from "../util/context";

export const mainMiddleware = (db: DB, metadata: Record<string, Partial<HarmonyMethodMetadata>>) => (ctx: ParameterizedContext<MotifContext>, next: Next) => {
	ctx.state.db = db;
	ctx.state.metadata = metadata;
	return next();
};
