
export interface Guild {
	id: string
	name: string
	picture?: string
	created: Date
	type: number
}

export interface ListedGuild {
	guild_id: string
	host?: string
	position: string
}

export interface Channel {
	guild_id: string
	id: string
	created_at: Date
	name: string
	kind: number
	position: string
}