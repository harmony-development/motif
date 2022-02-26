import type { Redis } from "ioredis";
import type { WrappedPool } from "../../pgWrapper";
import type { UserProfile } from "./types";
export class ProfileRespository {
	private constructor(private readonly pool: WrappedPool, private readonly redis: Redis) {}

	static async create(pool: WrappedPool, redis: Redis, subscriber: Redis) {
		return new ProfileRespository(pool, redis);
	}

	async getProfilesById(userIds: string[]): Promise<UserProfile[]> {
		const res = await this.pool.query<UserProfile>("select username, avatar, id from users where id = any($1::bigint[])", [userIds]);
		return res.rows;
	}
}
