import type Koa from "koa";
import type { HarmonyMethodMetadata } from "../../gen/harmonytypes/v1/types";
import type { DB } from "../db/db";
import type { SmallerMetadata } from "../methodMetadata";

export type KoaMotifContext = Koa.ParameterizedContext<MotifContext>;

export interface MotifContext {
	db: DB
	metadata: Partial<SmallerMetadata>
	userId?: string
}
