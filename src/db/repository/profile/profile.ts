import type { Redis } from "ioredis";
import type { UserStatus } from "../../../../gen/profile/v1/types";
import type { WrappedPool } from "../../pgWrapper";
import { generateQuery } from "../../updateHelper";
import type { UserProfile } from "./types";
export class ProfileRespository {
	constructor(private readonly pool: WrappedPool, private readonly redis: Redis) { }

	async getProfilesById(userIds: string[]): Promise<UserProfile[]> {
		const res = await this.pool.query<UserProfile>("select username, avatar, id from users where id = any($1::bigint[])", [userIds]);
		return res.rows;
	}

	async updateProfile(userId: string, username?: string, avatar?: string, user_status?: UserStatus) {
		const [query, pms] = generateQuery("users", userId, { username, avatar, user_status });
		return this.pool.query(query, pms);
	}
}
