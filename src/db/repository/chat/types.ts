export interface Guild {
	id: string;
	name: string;
	picture?: string;
	created: Date;
	type: number;
	owner_ids: string[];
	banned_users: string[];
}

export interface ListedGuild {
	guild_id: string;
	host: string;
	position: string;
}

export interface Channel {
	guild_id: string;
	id: string;
	created_at: Date;
	name: string;
	kind: number;
	position: string;
}

export interface GuildMember {
	user_id: string;
	guild_id: string;
	joined: Date;
	owns_guild: boolean;
}
