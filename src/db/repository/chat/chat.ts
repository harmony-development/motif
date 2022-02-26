import type { Redis } from "ioredis";
import { LexoRank } from "lexorank";
import type { Emitter } from "mitt";
import mitt from "mitt";
import type { ChannelKind } from "../../../../gen/chat/v1/channels";
import { PubSubMessage } from "../../../../gen/internal";
import type { WrappedPool } from "../../pgWrapper";
import type * as types from "./types";

export class ChatRespository {
	emitter: Emitter<{ event: PubSubMessage }>;

	private constructor(private pool: WrappedPool, private redis: Redis) {
		this.emitter = mitt();
	}

	static async create(pool: WrappedPool, redis: Redis, subscriber: Redis) {
		const inst = new ChatRespository(pool, redis);
		await subscriber.subscribe("chat");
		subscriber.on("messageBuffer", async (channel, message) => {
			if (channel.toString("utf-8") !== "chat") return;
			inst.emitter.emit("event", PubSubMessage.decode(message));
		});
		return inst;
	}

	async createGuild(name: string, picture: string | undefined, type: number, creatorId: string): Promise<types.Guild> {
		const [topGuild] = await this.getGuildList(creatorId, 1);
		const conn = await this.pool.connect();
		await conn.query("begin");
		const res = await conn.query("insert into guilds (id, name, picture, type) values (generate_id(), $1, $2, $3) returning *", [name, picture, type]);
		await conn.query("insert into guild_members (user_id, guild_id, owns_guild) values ($1, $2, true)", [creatorId, res.rows[0].id]);
		await conn.query("insert into guild_list (user_id, guild_id, host, position) values ($1, $2, '', $3)", [
			creatorId,
			res.rows[0].id,
			topGuild?.position ? LexoRank.parse(topGuild.position).genPrev().toString() : LexoRank.middle().toString(),
		]);
		await conn.query("commit");
		conn.release();
		await this.redis.hset(`guild_members::${res.rows[0].id}`, { [creatorId]: 1 });
		return res.rows[0];
	}

	async getGuildList(userId: string, limit?: number): Promise<types.ListedGuild[]> {
		const params: any[] = [userId];
		if (limit) params.push(limit);
		const res = await this.pool.query<types.ListedGuild>(
			`select guild_id, host, position from guild_list where user_id = $1 order by position desc ${limit ? "limit $2" : ""}`,
			params
		);
		return res.rows;
	}

	async getGuildsById(guildIds: string[]): Promise<types.Guild[]> {
		const res = await this.pool.query(
			`select guilds.*, array_agg(guild_members.user_id) as owner_ids
			from guilds left join guild_members on guild_members.guild_id = guilds.id
			where guilds.id = any($1::bigint[]) and guild_members.owns_guild group by guilds.id;`,
			[guildIds]
		);
		return res.rows;
	}

	async createChannel(guildId: string, name: string, kind: ChannelKind): Promise<types.Channel> {
		const [topChannel] = await this.getChannelList(guildId, 1);

		const res = await this.pool.query<types.Channel>(
			"insert into channels (id, guild_id, name, kind, position) values (generate_id(), $1, $2, $3, $4) returning *",
			[guildId, name, kind, topChannel?.position ? LexoRank.parse(topChannel.position).genPrev().toString() : LexoRank.middle().toString()]
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
		const res = await this.pool.query(`select * from channels where guild_id = $1 order by position desc ${limit ? "limit $2" : ""}`, params);
		return res.rows;
	}

	async getGuildMembers(guildId: string): Promise<types.GuildMember[]> {
		const res = await this.pool.query<types.GuildMember>("select user_id, owns_guild from guild_members where guild_id = $1", [guildId]);
		return res.rows;
	}

	async isGuildMember(userId: string, guildId: string): Promise<boolean> {
		const res = await this.pool.query("select true as exists from guild_members where user_id = $1 and guild_id = $2", [userId, guildId]);

		return res.rows[0]?.exists;
	}

	async getGuildMember(userId: string, guildId: string): Promise<types.GuildMember> {
		const res = await this.pool.query("select * from guild_members where user_id = $1 and guild_id = $2", [userId, guildId]);

		return res.rows[0];
	}

	async hasSharedGuilds(user1: string, user2: string): Promise<boolean> {
		const res = await this.pool.query(
			`select 
				(select array_agg(guild_id) from guild_members where user_id = $1) 
			 && (select array_agg(guild_id) from guild_members where user_id = $2) 
			as exists`,
			[user1, user2]
		);

		return res.rows[0]?.exists;
	}

	async leaveGuild(userId: string, guildId: string) {
		await this.pool.transaction(async (conn) => {
			// lol
			const doThing = async (tableName: string) => await conn.query(`delete from ${tableName} where user_id = $1 and guild_id = $2`, [userId, guildId]);

			await doThing("guild_members");
			await doThing("guild_list");
			await conn.query("commit");
		});
		await this.redis.hdel(`guild_members::${guildId}`, userId);
	}

	async broadcast(data: PubSubMessage): Promise<void> {
		await this.redis.publishBuffer("chat", Buffer.from(PubSubMessage.encode(data).finish()));
	}
}
