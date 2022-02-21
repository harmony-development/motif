import type { Redis } from "ioredis";
import type { Emitter } from "mitt";
import mitt from "mitt";
import type pg from "pg";
import type * as types from "./types";

interface AuthMsg {
	authId: string
	stepId?: string
}

export class AuthRespository {
	emitter: Emitter<Record<string, string | undefined>>;

	private constructor(private pool: pg.Pool, private redis: Redis) {
		this.emitter = mitt();
	}

	static async create(pool: pg.Pool, redis: Redis, subscriber: Redis) {
		const inst = new AuthRespository(pool, redis);
		await subscriber.subscribe("auth");
		subscriber.on("message", async(_, message) => {
			const msg: AuthMsg = JSON.parse(message);
			inst.emitter.emit(msg.authId, msg.stepId);
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
		await this.redis.publish("auth", JSON.stringify(msg));
	}

	async saveUser(email: string, password_hash: Uint8Array) {
		this.pool.query(
			"INSERT INTO users (id, email, password_hash) VALUES (id_generator(), $2, $3)",
			[email, password_hash],
		);
	}

	async getUserById(id: string): Promise<types.UserAccount | null> {
		const res = await this.pool.query<types.UserAccount>(
			"SELECT id, email, created FROM users WHERE id = $1",
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
