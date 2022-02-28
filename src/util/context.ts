import type Koa from "koa";
import type { IConfig } from "../config/config";
import type { DB } from "../db/db";
import type { SmallerMetadata } from "../methodMetadata";

export type KoaMotifContext = Koa.ParameterizedContext<MotifContext>;

export interface MotifContext {
	config: IConfig;
	db: DB;
	metadata: Partial<SmallerMetadata>;
	userId?: string;
}
