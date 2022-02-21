import type { CreateChannelRequest, CreateChannelResponse, DeleteChannelRequest, DeleteChannelResponse, GetGuildChannelsRequest, GetGuildChannelsResponse, TypingRequest, TypingResponse, UpdateAllChannelOrderRequest, UpdateAllChannelOrderResponse, UpdateChannelInformationRequest, UpdateChannelInformationResponse, UpdateChannelOrderRequest, UpdateChannelOrderResponse } from "../../../gen/chat/v1/channels";
import type { ChatService } from "../../../gen/chat/v1/chat.iface";
import type { BanUserRequest, BanUserResponse, CreateDirectMessageRequest, CreateDirectMessageResponse, CreateGuildRequest, CreateGuildResponse, CreateInviteRequest, CreateInviteResponse, CreateRoomRequest, CreateRoomResponse, DeleteGuildRequest, DeleteGuildResponse, DeleteInviteRequest, DeleteInviteResponse, GetBannedUsersRequest, GetBannedUsersResponse, GetGuildInvitesRequest, GetGuildInvitesResponse, GetGuildListRequest, GetGuildListResponse, GetGuildMembersRequest, GetGuildMembersResponse, GetGuildRequest, GetGuildResponse, GetPendingInvitesRequest, GetPendingInvitesResponse, GiveUpOwnershipRequest, GiveUpOwnershipResponse, GrantOwnershipRequest, GrantOwnershipResponse, Guild, GuildKind, IgnorePendingInviteRequest, IgnorePendingInviteResponse, InviteUserToGuildRequest, InviteUserToGuildResponse, JoinGuildRequest, JoinGuildResponse, KickUserRequest, KickUserResponse, LeaveGuildRequest, LeaveGuildResponse, PreviewGuildRequest, PreviewGuildResponse, RejectPendingInviteRequest, RejectPendingInviteResponse, UnbanUserRequest, UnbanUserResponse, UpdateGuildInformationRequest, UpdateGuildInformationResponse, UpgradeRoomToGuildRequest, UpgradeRoomToGuildResponse } from "../../../gen/chat/v1/guilds";
import type { AddReactionRequest, AddReactionResponse, DeleteMessageRequest, DeleteMessageResponse, GetChannelMessagesRequest, GetChannelMessagesResponse, GetMessageRequest, GetMessageResponse, GetPinnedMessagesRequest, GetPinnedMessagesResponse, PinMessageRequest, PinMessageResponse, RemoveReactionRequest, RemoveReactionResponse, SendMessageRequest, SendMessageResponse, TriggerActionRequest, TriggerActionResponse, UnpinMessageRequest, UnpinMessageResponse, UpdateMessageTextRequest, UpdateMessageTextResponse } from "../../../gen/chat/v1/messages";
import type { AddGuildRoleRequest, AddGuildRoleResponse, DeleteGuildRoleRequest, DeleteGuildRoleResponse, GetGuildRolesRequest, GetGuildRolesResponse, GetPermissionsRequest, GetPermissionsResponse, GetUserRolesRequest, GetUserRolesResponse, HasPermissionRequest, HasPermissionResponse, ManageUserRolesRequest, ManageUserRolesResponse, ModifyGuildRoleRequest, ModifyGuildRoleResponse, MoveRoleRequest, MoveRoleResponse, SetPermissionsRequest, SetPermissionsResponse } from "../../../gen/chat/v1/permissions";
import { StreamEventsResponse } from "../../../gen/chat/v1/stream";
import type { StreamEventsRequest } from "../../../gen/chat/v1/stream";
import type { MotifContext } from "../../util/context";
import { pEventIterator } from "../../lib/p-event";
import { errors } from "../../errors";
export class ChatServiceImpl implements ChatService<MotifContext> {
	async createGuild(ctx: MotifContext, { name, picture }: CreateGuildRequest): Promise<CreateGuildResponse> {
		const result = await ctx.db.chat.createGuild(name, picture, 0, ctx.userId!); // TODO: very dumb
		return {
			guildId: result.id, // todo: use bigint type
		};
	}

	createRoom(ctx: MotifContext, { name, picture }: CreateRoomRequest): Promise<CreateRoomResponse> {
		return this.createGuild(ctx, { name, picture });
	}

	createDirectMessage(ctx: MotifContext, request: CreateDirectMessageRequest): Promise<CreateDirectMessageResponse> {
		throw new Error("Method not implemented.");
	}

	upgradeRoomToGuild(ctx: MotifContext, request: UpgradeRoomToGuildRequest): Promise<UpgradeRoomToGuildResponse> {
		throw new Error("Method not implemented.");
	}

	createInvite(ctx: MotifContext, request: CreateInviteRequest): Promise<CreateInviteResponse> {
		throw new Error("Method not implemented.");
	}

	async createChannel(ctx: MotifContext, request: CreateChannelRequest): Promise<CreateChannelResponse> {
		const channel = await ctx.db.chat.createChannel(request.guildId, request.channelName, request.kind);
		return {
			channelId: channel.id,
		};

		// todo: send to stream
	}

	async getGuildList(ctx: MotifContext, _: GetGuildListRequest): Promise<GetGuildListResponse> {
		const guildList = await ctx.db.chat.getGuildList(ctx.userId!);
		return {
			guilds: guildList.map(guild => ({
				guildId: guild.guild_id,
				serverId: guild.host || "",
			})),
		};
	}

	inviteUserToGuild(ctx: MotifContext, request: InviteUserToGuildRequest): Promise<InviteUserToGuildResponse> {
		throw new Error("Method not implemented.");
	}

	getPendingInvites(ctx: MotifContext, request: GetPendingInvitesRequest): Promise<GetPendingInvitesResponse> {
		throw new Error("Method not implemented.");
	}

	rejectPendingInvite(ctx: MotifContext, request: RejectPendingInviteRequest): Promise<RejectPendingInviteResponse> {
		throw new Error("Method not implemented.");
	}

	ignorePendingInvite(ctx: MotifContext, request: IgnorePendingInviteRequest): Promise<IgnorePendingInviteResponse> {
		throw new Error("Method not implemented.");
	}

	async getGuild(ctx: MotifContext, request: GetGuildRequest): Promise<GetGuildResponse> {
		const guilds = await ctx.db.chat.getGuildsById(request.guildIds);
		return {
			guild: guilds.reduce<Record<string, Guild>>((acc, { name, id, picture, type }) => {
				acc[id] = {
					name,
					picture: picture ?? undefined,
					ownerIds: [], // TODO: write a join for owner IDs
					kind: type as GuildKind,
				};
				return acc;
			}, {}),
		};
	}

	getGuildInvites(ctx: MotifContext, request: GetGuildInvitesRequest): Promise<GetGuildInvitesResponse> {
		throw new Error("Method not implemented.");
	}

	async getGuildMembers(ctx: MotifContext, { guildId }: GetGuildMembersRequest): Promise<GetGuildMembersResponse> {
		const res = await ctx.db.chat.getGuildMembers(guildId);
		return { members: res.map(m => m.user_id) };
	}

	async getGuildChannels(ctx: MotifContext, request: GetGuildChannelsRequest): Promise<GetGuildChannelsResponse> {
		const guild = await ctx.db.chat.getGuildById(String(request.guildId));
		if (!guild) throw errors["h.guild-not-found"];
		const channels = await ctx.db.chat.getChannelList(guild.id);
		const h = {
			channels: channels.map(channel => ({ // todo: move db conversions into separate file
				channelId: channel.id,
				channel: {
					channelName: channel.name,
					kind: channel.kind,
				},
			})),
		};
		return h;
	}

	getChannelMessages(ctx: MotifContext, request: GetChannelMessagesRequest): Promise<GetChannelMessagesResponse> {
		throw new Error("Method not implemented.");
	}

	getMessage(ctx: MotifContext, request: GetMessageRequest): Promise<GetMessageResponse> {
		throw new Error("Method not implemented.");
	}

	updateGuildInformation(ctx: MotifContext, request: UpdateGuildInformationRequest): Promise<UpdateGuildInformationResponse> {
		throw new Error("Method not implemented.");
	}

	updateChannelInformation(ctx: MotifContext, request: UpdateChannelInformationRequest): Promise<UpdateChannelInformationResponse> {
		throw new Error("Method not implemented.");
	}

	updateChannelOrder(ctx: MotifContext, request: UpdateChannelOrderRequest): Promise<UpdateChannelOrderResponse> {
		throw new Error("Method not implemented.");
	}

	updateAllChannelOrder(ctx: MotifContext, request: UpdateAllChannelOrderRequest): Promise<UpdateAllChannelOrderResponse> {
		throw new Error("Method not implemented.");
	}

	updateMessageText(ctx: MotifContext, request: UpdateMessageTextRequest): Promise<UpdateMessageTextResponse> {
		throw new Error("Method not implemented.");
	}

	deleteGuild(ctx: MotifContext, request: DeleteGuildRequest): Promise<DeleteGuildResponse> {
		throw new Error("Method not implemented.");
	}

	deleteInvite(ctx: MotifContext, request: DeleteInviteRequest): Promise<DeleteInviteResponse> {
		throw new Error("Method not implemented.");
	}

	deleteChannel(ctx: MotifContext, request: DeleteChannelRequest): Promise<DeleteChannelResponse> {
		throw new Error("Method not implemented.");
	}

	deleteMessage(ctx: MotifContext, request: DeleteMessageRequest): Promise<DeleteMessageResponse> {
		throw new Error("Method not implemented.");
	}

	joinGuild(ctx: MotifContext, request: JoinGuildRequest): Promise<JoinGuildResponse> {
		throw new Error("Method not implemented.");
	}

	leaveGuild(ctx: MotifContext, request: LeaveGuildRequest): Promise<LeaveGuildResponse> {
		throw new Error("Method not implemented.");
	}

	triggerAction(ctx: MotifContext, request: TriggerActionRequest): Promise<TriggerActionResponse> {
		throw new Error("Method not implemented.");
	}

	sendMessage(ctx: MotifContext, request: SendMessageRequest): Promise<SendMessageResponse> {
		throw new Error("Method not implemented.");
	}

	hasPermission(ctx: MotifContext, request: HasPermissionRequest): Promise<HasPermissionResponse> {
		throw new Error("Method not implemented.");
	}

	setPermissions(ctx: MotifContext, request: SetPermissionsRequest): Promise<SetPermissionsResponse> {
		throw new Error("Method not implemented.");
	}

	getPermissions(ctx: MotifContext, request: GetPermissionsRequest): Promise<GetPermissionsResponse> {
		throw new Error("Method not implemented.");
	}

	moveRole(ctx: MotifContext, request: MoveRoleRequest): Promise<MoveRoleResponse> {
		throw new Error("Method not implemented.");
	}

	getGuildRoles(ctx: MotifContext, request: GetGuildRolesRequest): Promise<GetGuildRolesResponse> {
		throw new Error("Method not implemented.");
	}

	addGuildRole(ctx: MotifContext, request: AddGuildRoleRequest): Promise<AddGuildRoleResponse> {
		throw new Error("Method not implemented.");
	}

	modifyGuildRole(ctx: MotifContext, request: ModifyGuildRoleRequest): Promise<ModifyGuildRoleResponse> {
		throw new Error("Method not implemented.");
	}

	deleteGuildRole(ctx: MotifContext, request: DeleteGuildRoleRequest): Promise<DeleteGuildRoleResponse> {
		throw new Error("Method not implemented.");
	}

	manageUserRoles(ctx: MotifContext, request: ManageUserRolesRequest): Promise<ManageUserRolesResponse> {
		throw new Error("Method not implemented.");
	}

	getUserRoles(ctx: MotifContext, request: GetUserRolesRequest): Promise<GetUserRolesResponse> {
		throw new Error("Method not implemented.");
	}

	typing(ctx: MotifContext, request: TypingRequest): Promise<TypingResponse> {
		throw new Error("Method not implemented.");
	}

	previewGuild(ctx: MotifContext, request: PreviewGuildRequest): Promise<PreviewGuildResponse> {
		throw new Error("Method not implemented.");
	}

	getBannedUsers(ctx: MotifContext, request: GetBannedUsersRequest): Promise<GetBannedUsersResponse> {
		throw new Error("Method not implemented.");
	}

	banUser(ctx: MotifContext, request: BanUserRequest): Promise<BanUserResponse> {
		throw new Error("Method not implemented.");
	}

	kickUser(ctx: MotifContext, request: KickUserRequest): Promise<KickUserResponse> {
		throw new Error("Method not implemented.");
	}

	unbanUser(ctx: MotifContext, request: UnbanUserRequest): Promise<UnbanUserResponse> {
		throw new Error("Method not implemented.");
	}

	getPinnedMessages(ctx: MotifContext, request: GetPinnedMessagesRequest): Promise<GetPinnedMessagesResponse> {
		throw new Error("Method not implemented.");
	}

	pinMessage(ctx: MotifContext, request: PinMessageRequest): Promise<PinMessageResponse> {
		throw new Error("Method not implemented.");
	}

	unpinMessage(ctx: MotifContext, request: UnpinMessageRequest): Promise<UnpinMessageResponse> {
		throw new Error("Method not implemented.");
	}

	addReaction(ctx: MotifContext, request: AddReactionRequest): Promise<AddReactionResponse> {
		throw new Error("Method not implemented.");
	}

	removeReaction(ctx: MotifContext, request: RemoveReactionRequest): Promise<RemoveReactionResponse> {
		throw new Error("Method not implemented.");
	}

	grantOwnership(ctx: MotifContext, request: GrantOwnershipRequest): Promise<GrantOwnershipResponse> {
		throw new Error("Method not implemented.");
	}

	giveUpOwnership(ctx: MotifContext, request: GiveUpOwnershipRequest): Promise<GiveUpOwnershipResponse> {
		throw new Error("Method not implemented.");
	}

	async *streamEvents(ctx: MotifContext, request: AsyncIterable<StreamEventsRequest>): AsyncIterable<StreamEventsResponse> {
		const eventsStream = pEventIterator<string, Uint8Array>(ctx.db.chat.emitter, "events");

		for await (const event of eventsStream) {
			// todo: actually check if the user should get this message
			// todo: this is horrible
			yield StreamEventsResponse.decode(event);
		}
	}
}
