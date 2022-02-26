import type Koa from "koa";
import type { DB } from "../db/db";
import type { SmallerMetadata } from "../methodMetadata";

export type KoaMotifContext = Koa.ParameterizedContext<MotifContext>;

export interface MotifContext {
	db: DB;
	metadata: Partial<SmallerMetadata>;
	userId?: string;
}
