import type { Redis } from "ioredis";
import type { Emitter } from "mitt";
import mitt from "mitt";
import type pg from "pg";
import { LexoRank } from "lexorank";
import type { ChannelKind } from "../../../../gen/chat/v1/channels";
import type { GuildKind } from "../../../../gen/chat/v1/guilds";
import type * as types from "./types";

export class ChatRespository {
	emitter: Emitter<{
		event: Uint8Array
	}>;

	private constructor(private pool: pg.Pool, private redis: Redis) {
		this.emitter = mitt();
	}

	static async create(pool: pg.Pool, redis: Redis, subscriber: Redis) {
		const inst = new ChatRespository(pool, redis);
		await subscriber.subscribe("auth");
		subscriber.on("message", async(_, message) => {
			inst.emitter.emit("event", message);
		});
		return inst;
	}

	async createGuild(name: string, picture: string | undefined, type: number, creatorId: string): Promise<types.Guild> {
		const [topGuild] = await this.getGuildList(creatorId, 1);
		const conn = await this.pool.connect();
		await conn.query("begin");
		const res = await conn.query("insert into guilds (id, name, picture, type) values (generate_id(), $1, $2, $3) returning *", [name, picture, type]);
		await conn.query("insert into guild_members (user_id, guild_id, owns_guild) values ($1, $2, true)", [creatorId, res.rows[0].id]);
		await conn.query(
			"insert into guild_list (user_id, guild_id, position) values ($1, $2, $3)",
			[
				creatorId,
				res.rows[0].id,
				topGuild?.position ? LexoRank.parse(topGuild.position).genPrev() : LexoRank.min(),
			],
		);
		await conn.query("commit");
		return res.rows[0];
	}

	async getGuildList(userId: string, limit?: number): Promise<types.ListedGuild[]> {
		const params: any[] = [userId];
		if (limit) params.push(limit);
		const res = await this.pool.query<types.ListedGuild>(
			`select guild_id, host, position from guild_list where user_id = $1 order by position${limit ? " limit $2" : ""}`,
			params);
		return res.rows;
	}

	async getGuildById(id: string): Promise<types.Guild | null> {
		const res = await this.pool.query("select * from guilds where id = $1", [id]);
		return res.rows[0];
	}

	async getGuildsById(guildIds: string[]): Promise<types.Guild[]> {
		const res = await this.pool.query("select * from guilds where id = any($1::bigint[])", [guildIds]);
		return res.rows;
	}

	async createChannel(guildId: string, name: string, kind: ChannelKind): Promise<types.Channel> {
		const [topChannel] = await this.getChannelList(guildId, 1);

		const res = await this.pool.query<types.Channel>(
			"insert into channels (id, guild_id, name, kind, position) values (generate_id(), $1, $2, $3, $4) returning *",
			[guildId, name, kind, topChannel?.position ? LexoRank.parse(topChannel.position).genPrev().toString() : LexoRank.min().toString()],
		);
		return res.rows[0];
	}

	async getChannelById(channelId: string): Promise<types.Channel | undefined> {
		const res = await this.pool.query("select * from channels where id = $1", [channelId]);
		return res.rows[0];
	}

	async getChannelList(guildId: string, limit?: number): Promise<types.Channel[]> {
		const params: any[] = [guildId];
		if (limit) params.push(limit);
		const res = await this.pool.query(`select * from channels where guild_id = $1 order by position${limit ? " limit $2" : ""}`, params);
		return res.rows;
	}
}
