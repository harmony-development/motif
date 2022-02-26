import type { Redis as RedisType } from "ioredis";
import Redis from "ioredis";
import type { IConfig } from "../config/config";
import migrations from "./migrations/migrations";
import { WrappedPool } from "./pgWrapper";
import { AuthRespository } from "./repository/auth/auth";
import { ChatRespository } from "./repository/chat/chat";
import { ProfileRespository } from "./repository/profile/profileRepository";

export class DB {
	private constructor(
		public readonly config: IConfig,
		public readonly auth: AuthRespository,
		public readonly chat: ChatRespository,
		public readonly profile: ProfileRespository,
		public readonly subscriber: RedisType,
		public readonly redis: RedisType,
		public readonly postgres: WrappedPool
	) {}

	static async create(config: IConfig) {
		const postgres = new WrappedPool({ connectionString: config.postgres });

		const redis = new Redis(config.redis);
		const subscriber = new Redis(config.redis);

		const auth = await AuthRespository.create(postgres, redis, subscriber);
		const chat = await ChatRespository.create(postgres, redis, subscriber);
		const profile = await ProfileRespository.create(postgres, redis, subscriber);

		return new DB(config, auth, chat, profile, subscriber, redis, postgres);
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
		} catch (e) {
			if (e.message === 'relation "meta" does not exist') return -1;

			throw e;
		}

		return -1;
	}
}
