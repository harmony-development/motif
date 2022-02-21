import type { Redis as RedisType } from "ioredis";
import Redis from "ioredis";
import pg from "pg";
import type { IConfig } from "../config/config";
import migrations from "./migrations/migrations";
import { AuthRespository } from "./repository/auth/auth";

export class DB {
	postgres: pg.Pool;
	redis: RedisType;
	subscriber: RedisType;

	_auth: AuthRespository | undefined;

	private constructor(config: IConfig) {
		this.postgres = new pg.Pool({
			connectionString: config.postgres,
		});
		this.redis = new Redis(config.redis);
		this.subscriber = new Redis(config.redis);
	}

	static async create(config: IConfig) {
		const db = new DB(config);
		db._auth = await AuthRespository.create(db.postgres, db.redis, db.subscriber);
		return db;
	}

	get auth() {
		return this._auth!;
	}

	async migrate() {
		const currentMigration = await this.getCurrentMigration();
		// eslint-disable-next-line no-console
		console.log(`Current database version: ${currentMigration}`);

		for (const migration of migrations) {
			if (migrations.indexOf(migration) > currentMigration) {
				// eslint-disable-next-line no-console
				console.log(`Running migration ${migrations.indexOf(migration)}`);
				await migration.up(this.postgres);
			}
		}
		// eslint-disable-next-line no-console
		console.log("Migration complete!");
	}

	async getCurrentMigration(): Promise<number> {
		try {
			const res = await this.postgres.query("select current_migration from meta");
			return res.rows[0]?.current_migration ?? -1;
		}
		catch (e) {
			if (e.message === "relation \"meta\" does not exist")
				return -1;

			throw e;
		}

		return -1;
	}
}
