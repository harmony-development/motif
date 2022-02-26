import type { PoolClient, QueryConfig, QueryResult, QueryResultRow } from "pg";
import { Pool } from "pg";

export class WrappedPool extends Pool {
	async query<R extends QueryResultRow = any, I extends any[] = any>(q: string | QueryConfig<I>, args?: I): Promise<QueryResult<R>> {
		const stack = new Error("failed to exec").stack;
		try {
			return await super.query<R>(q, args);
		} catch (err) {
			err.stack = stack + err.stack;
			throw err;
		}
	}

	async transaction(queries: (conn: PoolClient) => any) {
		const conn = await super.connect();

		try {
			await queries(conn);
			await conn.query("commit");
		} catch (e) {
			await conn.query("rollback");
			throw e;
		} finally {
			conn.release();
		}
	}
}
