import { Redis } from "ioredis";
import mitt, { Emitter } from "mitt";
import pg from "pg";
import * as types from "../types/auth";

interface AuthMsg {
  authId: string;
  step?: string;
}

export default class {
  emitter: Emitter<{
    [authId: string]: string | undefined;
  }>;

  constructor(private pool: pg.Pool, private redis: Redis) {
    this.emitter = mitt();
    this.redis.on("message", async (_, message) => {
      const msg: AuthMsg = JSON.parse(message);
      this.emitter.emit(msg.authId, msg.step);
    });
  }

  async saveAuthSession(session: types.AuthStepsSession) {
    let obj: any = {};
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
}
