import type { Redis as RedisType } from "ioredis";
import Redis from "ioredis";
import type { IConfig } from "../config/config";
import migrations from "./migrations/migrations";
import { WrappedPool } from "./pgWrapper";
import { AuthRespository } from "./repository/auth/auth";
import { ChatRespository } from "./repository/chat/chat";
import { ProfileRespository } from "./repository/profile/profile";

export class DB {
	public readonly auth: AuthRespository;
	public readonly chat: ChatRespository;
	public readonly profile: ProfileRespository;

	public readonly postgres: WrappedPool;
	public readonly redis: RedisType;
	private readonly subscriber: RedisType;

	private constructor(config: IConfig, subscriber: RedisType) {
		this.postgres = new WrappedPool({ connectionString: config.postgres });
		this.redis = new Redis(config.redis);
		this.subscriber = subscriber;

		this.auth = new AuthRespository(this.postgres, this.redis, subscriber);
		this.chat = new ChatRespository(this.postgres, this.redis, subscriber);
		this.profile = new ProfileRespository(this.postgres, this.redis);
	}

	static async create(config: IConfig) {
		const subscriber = new Redis(config.redis);
		await subscriber.subscribe(["auth", "chat"]);

		return new DB(config, subscriber);
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
