import type { Redis } from "ioredis";
import type { Emitter } from "mitt";
import mitt from "mitt";
import type pg from "pg";
import type * as types from "./types";

export type AuthMsg = {
	$case: "session"
	authId: string
	userId: string
	session: string
} | {
	$case: "step"
	authId: string
	stepId: string
};

export class AuthRespository {
	emitter: Emitter<Record<string, AuthMsg>>;

	private constructor(private pool: pg.Pool, private redis: Redis) {
		this.emitter = mitt();
	}

	static async create(pool: pg.Pool, redis: Redis, subscriber: Redis) {
		const inst = new AuthRespository(pool, redis);
		await subscriber.subscribe("auth");
		subscriber.on("message", async(_, message) => {
			const msg: AuthMsg = JSON.parse(message);
			inst.emitter.emit(msg.authId, msg);
		});
		return inst;
	}

	async saveAuthSession(session: types.AuthStepsSession) {
		const obj: any = {};
		obj[session.auth_id] = JSON.stringify(session);
		await this.redis.hset("auth_sessions", obj);
	}

	async getAuthSession(id: string): Promise<types.AuthStepsSession | null> {
		const session = await this.redis.hget("auth_sessions", id);
		return session ? JSON.parse(session) : null;
	}

	async pushAuthStepStream(msg: AuthMsg) {
		if (msg.$case === "step") {
			await this.saveAuthSession({
				auth_id: msg.authId,
				step: msg.stepId,
			});
		}
		await this.redis.publish("auth", JSON.stringify(msg));
	}

	async saveUser(email: string, username: string, password_hash: Uint8Array): Promise<types.UserAccount> {
		const res = await this.pool.query(
			"INSERT INTO users (id, username, email, password_hash) VALUES (generate_user_id(), $1, $2, $3) returning *",
			[email, username, password_hash],
		);

		return res.rows[0];
	}

	async setSession(userId: string, session: string) {
		await this.redis.hset("sessions", { [session]: userId });
	}

	async revokeSession(session: string) {
		await this.redis.hdel("sessions", session);
	}

	async getSessionUser(token: string): Promise<types.UserAccount | null> {
		const userId = await this.redis.hget("sessions", token);
		if (userId == null) return null;
		return await this.getUserById(userId);
	}

	async getUserById(id: string): Promise<types.UserAccount | null> {
		const res = await this.pool.query<types.UserAccount>(
			"SELECT id, username, created FROM users WHERE id = $1",
			[id],
		);
		return res.rows[0];
	}

	async getUserForLogin(email: string): Promise<types.UserAccount | null> {
		const res = await this.pool.query<types.UserAccount>(
			"SELECT id, password_hash FROM users WHERE email = $1",
			[email],
		);
		return res.rows[0];
	}
}
