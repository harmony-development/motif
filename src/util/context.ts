import type Koa from "koa";
import type { HarmonyMethodMetadata } from "../../gen/harmonytypes/v1/types";
import type { DB } from "../db/db";

export type KoaMotifContext = Koa.ParameterizedContext<MotifContext>;

export interface MotifContext {
	db: DB
	metadata: Partial<HarmonyMethodMetadata>
	userId?: string
}
