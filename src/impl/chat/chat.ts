// prettier-ignore
import type { CreateChannelRequest, CreateChannelResponse, DeleteChannelRequest, DeleteChannelResponse, GetGuildChannelsRequest, GetGuildChannelsResponse, TypingRequest, TypingResponse, UpdateAllChannelOrderRequest, UpdateAllChannelOrderResponse, UpdateChannelInformationRequest, UpdateChannelInformationResponse, UpdateChannelOrderRequest, UpdateChannelOrderResponse } from "../../../gen/chat/v1/channels";
import type { ChatService } from "../../../gen/chat/v1/chat.iface";
// prettier-ignore
import type { BanUserRequest, BanUserResponse, CreateDirectMessageRequest, CreateDirectMessageResponse, CreateGuildRequest, CreateGuildResponse, CreateInviteRequest, CreateInviteResponse, CreateRoomRequest, CreateRoomResponse, DeleteGuildRequest, DeleteGuildResponse, DeleteInviteRequest, DeleteInviteResponse, GetBannedUsersRequest, GetBannedUsersResponse, GetGuildInvitesRequest, GetGuildInvitesResponse, GetGuildListRequest, GetGuildListResponse, GetGuildMembersRequest, GetGuildMembersResponse, GetGuildRequest, GetGuildResponse, GetPendingInvitesRequest, GetPendingInvitesResponse, GiveUpOwnershipRequest, GiveUpOwnershipResponse, GrantOwnershipRequest, GrantOwnershipResponse, Guild, GuildKind, IgnorePendingInviteRequest, IgnorePendingInviteResponse, InviteUserToGuildRequest, InviteUserToGuildResponse, JoinGuildRequest, JoinGuildResponse, KickUserRequest, KickUserResponse, LeaveGuildRequest, LeaveGuildResponse, PreviewGuildRequest, PreviewGuildResponse, RejectPendingInviteRequest, RejectPendingInviteResponse, UnbanUserRequest, UnbanUserResponse, UpdateGuildInformationRequest, UpdateGuildInformationResponse, UpgradeRoomToGuildRequest, UpgradeRoomToGuildResponse } from "../../../gen/chat/v1/guilds";
import { LeaveReason } from "../../../gen/chat/v1/guilds";
// prettier-ignore
import { AddReactionRequest, AddReactionResponse, DeleteMessageRequest, DeleteMessageResponse, GetChannelMessagesRequest, GetChannelMessagesResponse, GetMessageRequest, GetMessageResponse, GetPinnedMessagesRequest, GetPinnedMessagesResponse, MessageWithId, PinMessageRequest, PinMessageResponse, RemoveReactionRequest, RemoveReactionResponse, SendMessageRequest, SendMessageResponse, TriggerActionRequest, TriggerActionResponse, UnpinMessageRequest, UnpinMessageResponse, UpdateMessageTextRequest, UpdateMessageTextResponse } from "../../../gen/chat/v1/messages";
// prettier-ignore
import type { AddGuildRoleRequest, AddGuildRoleResponse, DeleteGuildRoleRequest, DeleteGuildRoleResponse, GetGuildRolesRequest, GetGuildRolesResponse, GetPermissionsRequest, GetPermissionsResponse, GetUserRolesRequest, GetUserRolesResponse, HasPermissionRequest, HasPermissionResponse, ManageUserRolesRequest, ManageUserRolesResponse, ModifyGuildRoleRequest, ModifyGuildRoleResponse, MoveRoleRequest, MoveRoleResponse, SetPermissionsRequest, SetPermissionsResponse } from "../../../gen/chat/v1/permissions";
import { StreamEvent, StreamEventsRequest, StreamEventsResponse } from "../../../gen/chat/v1/stream";
import type { PubSubMessage } from "../../../gen/internal";
import { MessageType } from "../../../gen/internal";
import { errors } from "../../errors";
import { pEventIterator } from "../../lib/p-event";
import type { MotifContext } from "../../util/context";

const chatEvent = (event: StreamEvent) =>
	StreamEventsResponse.encode({
		event: {
			$case: "chat",
			chat: event,
		},
	}).finish();

const guildEvent = (event: StreamEvent, guildId: string): PubSubMessage => ({
	data: chatEvent(event),
	type: MessageType.GUILD_EVENT,
	value: guildId,
});

export class ChatServiceImpl implements ChatService<MotifContext> {
	async createGuild(ctx: MotifContext, { name, picture }: CreateGuildRequest): Promise<CreateGuildResponse> {
		const result = await ctx.db.chat.createGuild(name, picture, 0, ctx.userId!); // TODO: very dumb
		await ctx.db.chat.broadcast({
			type: MessageType.OWN_USER_EVENT,
			value: ctx.userId!,
			data: chatEvent({
				event: {
					$case: "guildAddedToList",
					guildAddedToList: {
						guildId: result.id,
						homeserver: "",
					},
				},
			}),
		});
		return { guildId: result.id };
	}

	createRoom(ctx: MotifContext, { name, picture }: CreateRoomRequest): Promise<CreateRoomResponse> {
		return this.createGuild(ctx, { name, picture });
	}

	createDirectMessage(_: MotifContext, __: CreateDirectMessageRequest): Promise<CreateDirectMessageResponse> {
		throw new Error("Method not implemented.");
	}

	upgradeRoomToGuild(_: MotifContext, __: UpgradeRoomToGuildRequest): Promise<UpgradeRoomToGuildResponse> {
		throw new Error("Method not implemented.");
	}

	// invites

	async inviteUserToGuild(_: MotifContext, __: InviteUserToGuildRequest): Promise<InviteUserToGuildResponse> {
		throw new Error("Method not implemented.");
	}

	createInvite(_: MotifContext, __: CreateInviteRequest): Promise<CreateInviteResponse> {
		throw new Error("Method not implemented.");
	}

	getPendingInvites(_: MotifContext, __: GetPendingInvitesRequest): Promise<GetPendingInvitesResponse> {
		throw new Error("Method not implemented.");
	}

	rejectPendingInvite(_: MotifContext, __: RejectPendingInviteRequest): Promise<RejectPendingInviteResponse> {
		throw new Error("Method not implemented.");
	}

	ignorePendingInvite(_: MotifContext, __: IgnorePendingInviteRequest): Promise<IgnorePendingInviteResponse> {
		throw new Error("Method not implemented.");
	}

	getGuildInvites(_: MotifContext, __: GetGuildInvitesRequest): Promise<GetGuildInvitesResponse> {
		throw new Error("Method not implemented.");
	}

	deleteInvite(_: MotifContext, __: DeleteInviteRequest): Promise<DeleteInviteResponse> {
		throw new Error("Method not implemented.");
	}

	joinGuild(_: MotifContext, __: JoinGuildRequest): Promise<JoinGuildResponse> {
		throw new Error("Method not implemented.");
	}

	previewGuild(_: MotifContext, __: PreviewGuildRequest): Promise<PreviewGuildResponse> {
		throw new Error("Method not implemented.");
	}

	// guilds

	async getGuildList(ctx: MotifContext, _: GetGuildListRequest): Promise<GetGuildListResponse> {
		const guildList = await ctx.db.chat.getGuildList(ctx.userId!);
		return {
			guilds: guildList.map((guild) => ({
				guildId: guild.guild_id,
				serverId: guild.host,
			})),
		};
	}

	async getGuild(ctx: MotifContext, request: GetGuildRequest): Promise<GetGuildResponse> {
		const guilds = await ctx.db.chat.getGuildsById(request.guildIds);
		return {
			guild: guilds.reduce<Record<string, Guild>>((acc, { name, id, picture, type, owner_ids }) => {
				acc[id] = {
					name,
					picture: picture ?? undefined,
					ownerIds: owner_ids,
					kind: type as GuildKind,
				};
				return acc;
			}, {}),
		};
	}

	async getGuildMembers(ctx: MotifContext, request: GetGuildMembersRequest): Promise<GetGuildMembersResponse> {
		const isGuildMember = await ctx.db.chat.isGuildMember(ctx.userId!, request.guildId);
		if (!isGuildMember) throw errors["h.guild-not-found"];

		const res = await ctx.db.chat.getGuildMembers(request.guildId);
		return { members: res.map((m) => m.user_id) };
	}

	async getGuildChannels(ctx: MotifContext, request: GetGuildChannelsRequest): Promise<GetGuildChannelsResponse> {
		const isGuildMember = await ctx.db.chat.isGuildMember(ctx.userId!, request.guildId);
		if (!isGuildMember) throw errors["h.guild-not-found"];
		const channels = await ctx.db.chat.getChannelList(request.guildId);
		const h = {
			channels: channels.map((channel) => ({
				// todo: move db conversions into separate file
				channelId: channel.id,
				channel: {
					channelName: channel.name,
					kind: channel.kind,
				},
			})),
		};
		return h;
	}

	async updateGuildInformation(_: MotifContext, __: UpdateGuildInformationRequest): Promise<UpdateGuildInformationResponse> {
		throw new Error("Method not implemented.");
	}

	// channels

	async createChannel(ctx: MotifContext, request: CreateChannelRequest): Promise<CreateChannelResponse> {
		const isGuildMember = await ctx.db.chat.isGuildMember(ctx.userId!, request.guildId);
		if (!isGuildMember) throw errors["h.guild-not-found"];

		// todo: permissions etc

		const channel = await ctx.db.chat.createChannel(request.guildId, request.channelName, request.kind);

		await ctx.db.chat.broadcast(
			guildEvent(
				{
					event: {
						$case: "createdChannel",
						createdChannel: {
							channelId: channel.id,
							guildId: request.guildId,
							kind: channel.kind,
							name: channel.name,
							// position: channel.position,
						},
					},
				},
				request.guildId
			)
		);

		return {
			channelId: channel.id,
		};
	}

	async updateChannelInformation(_: MotifContext, __: UpdateChannelInformationRequest): Promise<UpdateChannelInformationResponse> {
		throw new Error("Method not implemented.");
	}

	async deleteChannel(ctx: MotifContext, request: DeleteChannelRequest): Promise<DeleteChannelResponse> {
		// todo: permissions

		if (!(await ctx.db.chat.isGuildMember(ctx.userId!, request.guildId))) throw errors["h.guild-not-found"];

		const channel = await ctx.db.chat.getChannelById(request.channelId);
		if (!channel) throw errors["h.channel-not-found"];

		await ctx.db.postgres.query("delete from channels where id = $1", [request.channelId]);

		await ctx.db.chat.broadcast(
			guildEvent(
				{
					event: {
						$case: "deletedChannel",
						deletedChannel: request,
					},
				},
				request.guildId
			)
		);

		return {};
	}

	updateChannelOrder(_: MotifContext, __: UpdateChannelOrderRequest): Promise<UpdateChannelOrderResponse> {
		throw new Error("Method not implemented.");
	}

	updateAllChannelOrder(_: MotifContext, __: UpdateAllChannelOrderRequest): Promise<UpdateAllChannelOrderResponse> {
		throw new Error("Method not implemented.");
	}

	async typing(ctx: MotifContext, request: TypingRequest): Promise<TypingResponse> {
		if (!(await ctx.db.chat.isGuildMember(ctx.userId!, request.guildId))) throw errors["h.guild-not-found"];
		const channel = await ctx.db.chat.getChannelById(request.channelId);
		if (!channel) throw errors["h.channel-not-found"];

		await ctx.db.chat.broadcast(
			guildEvent(
				{
					event: {
						$case: "typing",
						typing: {
							channelId: request.channelId,
							guildId: request.guildId,
							userId: ctx.userId!,
						},
					},
				},
				request.guildId
			)
		);
		return {};
	}

	// messages

	async getChannelMessages(ctx: MotifContext, request: GetChannelMessagesRequest): Promise<GetChannelMessagesResponse> {
		var guildMember = await ctx.db.chat.getGuildMember(ctx.userId!, request.guildId);
		if (!guildMember) throw errors['h.guild-not-found'];

		// todo: permissions

		var channel = await ctx.db.chat.getChannelById(request.channelId);
		if (!channel) throw errors['h.channel-not-found'];

		var messages = await ctx.db.postgres.query("select messages.*, to_json(override) as override from messages where channel_id = $1 order by id desc limit 50", [channel.id]);
		
		return {
			reachedTop: false,
			reachedBottom: true,
			messages: messages.rows.map((msg): MessageWithId => ({
				messageId: msg.id,
				message: {
					authorId: msg.author_id,
					createdAt: (+new Date(msg.created_at)).toString(),
					reactions: [],
					content: {
						text: msg.content,
						textFormats: [],
						embeds: [],
						attachments: [],
					},
					editedAt: (+new Date(msg.edited_at)).toString() || undefined,
					inReplyTo: msg.reply_to_id ?? undefined,
					overrides: {
						username: msg.override?.username ?? undefined,
						avatar: msg.override?.avatar ?? undefined,
						reason: msg.override?.reason ?? undefined,
					},
				}
			}))
		}
	}

	getMessage(_: MotifContext, __: GetMessageRequest): Promise<GetMessageResponse> {
		throw new Error("Method not implemented.");
	}

	async sendMessage(ctx: MotifContext, request: SendMessageRequest): Promise<SendMessageResponse> {
		var guildMember = await ctx.db.chat.getGuildMember(ctx.userId!, request.guildId);
		if (!guildMember) throw errors['h.guild-not-found'];

		// todo: permissions

		var channel = await ctx.db.chat.getChannelById(request.channelId);
		if (!channel) throw errors['h.channel-not-found'];

		var res = await ctx.db.postgres.query(
			`insert into messages
			(id, channel_id, author_id, content, override)
			values (generate_id(), $1, $2, $3, jsonb_populate_record(null::message_override, $4))
			returning *`,
			[channel.id, ctx.userId, request.content?.text, request.overrides]
		);

		// todo: stream
		await ctx.db.chat.broadcast(
			guildEvent({
				event: {
					$case: "sentMessage",
					sentMessage: {
						messageId: res.rows[0].id,
						guildId: request.guildId,
						channelId: request.channelId,
						echoId: request.echoId,
						message: res.rows.map((msg) => ({
							authorId: msg.author_id,
							createdAt: (+new Date(msg.created_at)).toString(),
							reactions: [],
							content: {
								text: msg.content,
								textFormats: [],
								embeds: [],
								attachments: [],
							},
							editedAt: (+new Date(msg.edited_at)).toString() || undefined,
							inReplyTo: msg.reply_to_id ?? undefined,
							overrides: {
								username: msg.override?.username ?? undefined,
								avatar: msg.override?.avatar ?? undefined,
								reason: msg.override?.reason ?? undefined,
							},
						}))[0]
					}
				}
			}, request.guildId),
		);

		return { messageId: res.rows[0].id };
	}

	updateMessageText(_: MotifContext, __: UpdateMessageTextRequest): Promise<UpdateMessageTextResponse> {
		throw new Error("Method not implemented.");
	}

	deleteMessage(_: MotifContext, __: DeleteMessageRequest): Promise<DeleteMessageResponse> {
		throw new Error("Method not implemented.");
	}

	addReaction(_: MotifContext, __: AddReactionRequest): Promise<AddReactionResponse> {
		throw new Error("Method not implemented.");
	}

	removeReaction(_: MotifContext, __: RemoveReactionRequest): Promise<RemoveReactionResponse> {
		throw new Error("Method not implemented.");
	}

	getPinnedMessages(_: MotifContext, __: GetPinnedMessagesRequest): Promise<GetPinnedMessagesResponse> {
		throw new Error("Method not implemented.");
	}

	pinMessage(_: MotifContext, __: PinMessageRequest): Promise<PinMessageResponse> {
		throw new Error("Method not implemented.");
	}

	unpinMessage(_: MotifContext, __: UnpinMessageRequest): Promise<UnpinMessageResponse> {
		throw new Error("Method not implemented.");
	}

	triggerAction(_: MotifContext, __: TriggerActionRequest): Promise<TriggerActionResponse> {
		throw new Error("Method not implemented.");
	}

	// roles/permissions

	hasPermission(_: MotifContext, __: HasPermissionRequest): Promise<HasPermissionResponse> {
		throw new Error("Method not implemented.");
	}

	setPermissions(_: MotifContext, __: SetPermissionsRequest): Promise<SetPermissionsResponse> {
		throw new Error("Method not implemented.");
	}

	getPermissions(_: MotifContext, __: GetPermissionsRequest): Promise<GetPermissionsResponse> {
		throw new Error("Method not implemented.");
	}

	moveRole(_: MotifContext, __: MoveRoleRequest): Promise<MoveRoleResponse> {
		throw new Error("Method not implemented.");
	}

	getGuildRoles(_: MotifContext, __: GetGuildRolesRequest): Promise<GetGuildRolesResponse> {
		throw new Error("Method not implemented.");
	}

	addGuildRole(_: MotifContext, __: AddGuildRoleRequest): Promise<AddGuildRoleResponse> {
		throw new Error("Method not implemented.");
	}

	modifyGuildRole(_: MotifContext, __: ModifyGuildRoleRequest): Promise<ModifyGuildRoleResponse> {
		throw new Error("Method not implemented.");
	}

	deleteGuildRole(_: MotifContext, __: DeleteGuildRoleRequest): Promise<DeleteGuildRoleResponse> {
		throw new Error("Method not implemented.");
	}

	manageUserRoles(_: MotifContext, __: ManageUserRolesRequest): Promise<ManageUserRolesResponse> {
		throw new Error("Method not implemented.");
	}

	getUserRoles(_: MotifContext, __: GetUserRolesRequest): Promise<GetUserRolesResponse> {
		throw new Error("Method not implemented.");
	}

	// guild management

	async userLeaveHandler({ db }: MotifContext, userId: string, guildId: string, reason: LeaveReason): Promise<void> {
		await db.chat.leaveGuild(userId, guildId);

		await db.chat.broadcast(
			guildEvent(
				{
					event: {
						$case: "leftMember",
						leftMember: {
							guildId,
							memberId: userId,
							leaveReason: reason,
						},
					},
				},
				guildId
			)
		);

		await db.chat.broadcast({
			type: MessageType.OWN_USER_EVENT,
			value: userId,
			data: chatEvent({
				event: {
					$case: "guildRemovedFromList",
					guildRemovedFromList: {
						guildId,
						homeserver: "",
					},
				},
			}),
		});
	}

	async kickUser(ctx: MotifContext, request: KickUserRequest): Promise<KickUserResponse> {
		// todo: permissions

		const guildMember = await ctx.db.chat.getGuildMember(ctx.userId!, request.guildId);
		if (!guildMember) throw errors["h.guild-not-found"];
		if (!guildMember.owns_guild) throw errors["h.not-guild-owner"];

		if (ctx.userId === request.userId) throw errors["h.invalid-user-for-action"];

		const guildMember2 = await ctx.db.chat.getGuildMember(request.userId, request.guildId);

		if (!guildMember2) {
			throw (await ctx.db.chat.hasSharedGuilds(ctx.userId!, request.userId)) ? errors["h.user-not-in-guild"] : errors["h.user-not-found"];
		}

		await this.userLeaveHandler(ctx, request.userId, request.guildId, LeaveReason.LEAVE_REASON_KICKED);

		return {};
	}

	async getBannedUsers(ctx: MotifContext, request: GetBannedUsersRequest): Promise<GetBannedUsersResponse> {
		// todo: permissions

		const guildMember = await ctx.db.chat.getGuildMember(ctx.userId!, request.guildId);
		if (!guildMember) throw errors["h.guild-not-found"];
		if (!guildMember.owns_guild) throw errors["h.not-guild-owner"];

		const [guild] = await ctx.db.chat.getGuildsById([request.guildId]);
		return { bannedUsers: guild.banned_users };
	}

	async banUser(ctx: MotifContext, request: BanUserRequest): Promise<BanUserResponse> {
		// todo: permissions

		const [guild] = await ctx.db.chat.getGuildsById([request.guildId]);
		if (!guild) throw errors["h.guild-not-found"];
		if (!guild.owner_ids.includes(ctx.userId!)) throw errors["h.not-guild-owner"];
		if (guild.banned_users.includes(request.userId)) throw errors["h.user-already-banned"];

		if (ctx.userId === request.userId) throw errors["h.invalid-user-for-action"];

		const guildMember2 = await ctx.db.chat.getGuildMember(request.userId, request.guildId);
		if (!guildMember2) {
			throw (await ctx.db.chat.hasSharedGuilds(ctx.userId!, request.userId)) ? errors["h.user-not-in-guild"] : errors["h.user-not-found"];
		}

		await ctx.db.postgres.query("update guilds set banned_users = array_append(banned_users, $1) where id = $2", [request.userId, request.guildId]);

		await this.userLeaveHandler(ctx, request.userId, request.guildId, LeaveReason.LEAVE_REASON_BANNED);

		return {};
	}

	async unbanUser(ctx: MotifContext, request: UnbanUserRequest): Promise<UnbanUserResponse> {
		// todo: permissions

		const [guild] = await ctx.db.chat.getGuildsById([request.guildId]);
		if (!guild) throw errors["h.guild-not-found"];
		if (!guild.owner_ids.includes(ctx.userId!)) throw errors["h.not-guild-owner"];
		if (!guild.banned_users.includes(request.userId)) throw errors["h.user-not-banned"];

		if (ctx.userId === request.userId) throw errors["h.invalid-user-for-action"];

		await ctx.db.postgres.query("update guilds set banned_users = array_remove(banned_users, $1) where id = $2", [request.userId, request.guildId]);

		return {};
	}

	async grantOwnership(ctx: MotifContext, request: GrantOwnershipRequest): Promise<GrantOwnershipResponse> {
		const guildMember = await ctx.db.chat.getGuildMember(ctx.userId!, request.guildId);
		if (!guildMember) throw errors["h.guild-not-found"];
		if (!guildMember.owns_guild) throw errors["h.not-guild-owner"];

		if (ctx.userId === request.newOwnerId) throw errors["h.invalid-user-for-action"];

		const guildMember2 = await ctx.db.chat.getGuildMember(request.newOwnerId, request.guildId);

		if (!guildMember2) {
			throw (await ctx.db.chat.hasSharedGuilds(ctx.userId!, request.newOwnerId)) ? errors["h.user-not-in-guild"] : errors["h.user-not-found"];
		}

		if (guildMember2.owns_guild) throw errors["h.already-guild-owner"];
		await ctx.db.postgres.query("update guild_members set owns_guild = true where user_id = $1 and guild_id = $2", [request.newOwnerId, request.guildId]);

		await ctx.db.chat.broadcast(
			guildEvent(
				{
					event: {
						$case: "ownerAdded",
						ownerAdded: {
							guildId: request.guildId,
							userId: request.newOwnerId,
						},
					},
				},
				request.guildId
			)
		);

		return {};
	}

	async giveUpOwnership(ctx: MotifContext, request: GiveUpOwnershipRequest): Promise<GiveUpOwnershipResponse> {
		const guildMember = await ctx.db.chat.getGuildMember(ctx.userId!, request.guildId);
		if (!guildMember) throw errors["h.guild-not-found"];
		if (!guildMember.owns_guild) throw errors["h.not-guild-owner"];

		const [guild] = await ctx.db.chat.getGuildsById([request.guildId]);

		if (guild.owner_ids.length === 1 && guild.owner_ids.includes(ctx.userId!)) throw errors["h.last-guild-owner"];

		await ctx.db.postgres.query("update guild_members set owns_guild = false where user_id = $1 and guild_id = $2", [ctx.userId, request.guildId]);

		await ctx.db.chat.broadcast(
			guildEvent(
				{
					event: {
						$case: "ownerRemoved",
						ownerRemoved: {
							guildId: request.guildId,
							userId: ctx.userId!,
						},
					},
				},
				request.guildId
			)
		);

		return {};
	}

	async deleteGuild(ctx: MotifContext, request: DeleteGuildRequest): Promise<DeleteGuildResponse> {
		const member = await ctx.db.chat.getGuildMember(ctx.userId!, request.guildId);

		if (!member) throw errors["h.guild-not-found"];

		if (!member.owns_guild) throw errors["h.not-guild-owner"];

		await ctx.db.postgres.query("delete from guilds where id = $1", [request.guildId]);
		// clear guild members cache (in a bit, so the remove guild broadcast can happen)
		// todo: this seems to not work correctly
		await ctx.db.redis.expire(`guild_members::${request.guildId}`, 15);

		await ctx.db.chat.broadcast(
			guildEvent(
				{
					event: {
						$case: "deletedGuild",
						deletedGuild: {
							guildId: request.guildId,
						},
					},
				},
				request.guildId
			)
		);

		// todo: delete from guild list
		// todo: do we need to send a guild list remove event?

		return {};
	}

	async leaveGuild(ctx: MotifContext, request: LeaveGuildRequest): Promise<LeaveGuildResponse> {
		// todo: optimize by just getting the guild member list instead of fetching the guild and then the member
		// note that we need to get just the owner members and the self member, NOT all members

		const [guild] = await ctx.db.chat.getGuildsById([request.guildId]);
		if (!guild) throw errors["h.guild-not-found"];

		if (guild.owner_ids.length === 1 && guild.owner_ids.includes(ctx.userId!)) throw errors["h.last-guild-owner"];

		if (!(await ctx.db.chat.isGuildMember(ctx.userId!, request.guildId))) throw errors["h.guild-not-found"];

		await this.userLeaveHandler(ctx, ctx.userId!, request.guildId, LeaveReason.LEAVE_REASON_WILLINGLY_UNSPECIFIED);

		return {};
	}

	// stream events

	async *streamEvents(ctx: MotifContext, _: AsyncIterable<StreamEventsRequest>): AsyncIterable<Uint8Array> {
		const eventsStream = pEventIterator<string, PubSubMessage>(ctx.db.chat.emitter, "event");

		for await (const event of eventsStream) {
			console.log(event);
			// eslint-disable-next-line padded-blocks
			switch (event.type) {
				case MessageType.GUILD_EVENT:
					// todo: permissions
					if (await ctx.db.redis.hexists(`guild_members::${event.value}`, ctx.userId!)) yield event.data;
					continue;

				case MessageType.PROFILE_EVENT:
					if (await ctx.db.chat.hasSharedGuilds(ctx.userId!, event.value)) yield event.data;
					continue;

				case MessageType.OWN_USER_EVENT:
					if (ctx.userId === event.value) yield event.data;
					continue;

				// eslint is stupid
				// eslint-disable-next-line @typescript-eslint/indent
				// todo: emote packs?

				default:
					continue;
			}
		}
	}
}
