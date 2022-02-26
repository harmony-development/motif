import type { Redis } from "ioredis";
import type { UserStatus } from "../../../../gen/profile/v1/types";
import type { WrappedPool } from "../../pgWrapper";
import type { UserProfile } from "./types";
export class ProfileRespository {
	private constructor(private readonly pool: WrappedPool, private readonly redis: Redis) {}

	static async create(pool: WrappedPool, redis: Redis, _subscriber: Redis) {
		return new ProfileRespository(pool, redis);
	}

	async getProfilesById(userIds: string[]): Promise<UserProfile[]> {
		const res = await this.pool.query<UserProfile>("select username, avatar, id from users where id = any($1::bigint[])", [userIds]);
		return res.rows;
	}

	async updateProfile(userId: string, username: string | undefined, avatar: string | undefined, status: UserStatus | undefined) {
		let query = "update users set"; // actually trollge
		if (username) {
			query += " username = $1,";
		}
		if (avatar) {
			query += " avatar = $2,";
		}
		if (status) {
			query += " status = $3,";
		}
		query = query.slice(0, -1);
		query += " where id = $3";

		return this.pool.query(query, [username, avatar, status, userId]);
	}
}
