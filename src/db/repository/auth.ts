import type { Redis } from "ioredis";
import type { Emitter } from "mitt";
import mitt from "mitt";
import type pg from "pg";
import type * as types from "./types";

interface AuthMsg {
	authId: string
	currentStepId?: string
}

export default class {
	emitter: Emitter<Record<string, string | undefined>>;

	constructor(private pool: pg.Pool, private redis: Redis) {
		this.emitter = mitt();
		this.redis.on("message", async(_, message) => {
			const msg: AuthMsg = JSON.parse(message);
			this.emitter.emit(msg.authId, msg.currentStepId);
		});
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

	async pushAuthStepStream(authId: string, step: string) {
		await this.redis.publish("auth", JSON.stringify({ authId, step }));
	}

	subscribedYet = false;
	async streamAuthSteps() {
		if (!this.subscribedYet) {
			await this.redis.subscribe("auth");
			this.subscribedYet = true;
		}
	}

	async saveUser(email: string, password_hash: Uint8Array) {
		this.pool.query(
			"INSERT INTO users (id, email, password_hash) VALUES (id_generator(), $2, $3)",
			[email, password_hash],
		);
	}

	async getUser(id: string): Promise<types.UserAccount | null> {
		const res = await this.pool.query<types.UserAccount>(
			"SELECT id, email, password_hash, created FROM users WHERE id = $1",
			[id],
		);
		return res.rows[0];
	}

	async getUserByEmail(email: string): Promise<types.UserAccount | null> {
		const res = await this.pool.query<types.UserAccount>(
			"SELECT id, email, password_hash, created FROM users WHERE email = $1",
			[email],
		);
		return res.rows[0];
	}
}
