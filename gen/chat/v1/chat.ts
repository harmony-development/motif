/* eslint-disable */
import { util, configure } from "protobufjs/minimal";
import * as Long from "long";
import {
  CreateGuildRequest,
  CreateGuildResponse,
  CreateRoomRequest,
  CreateRoomResponse,
  CreateDirectMessageRequest,
  CreateDirectMessageResponse,
  UpgradeRoomToGuildRequest,
  UpgradeRoomToGuildResponse,
  CreateInviteRequest,
  CreateInviteResponse,
  GetGuildListRequest,
  GetGuildListResponse,
  InviteUserToGuildRequest,
  InviteUserToGuildResponse,
  GetPendingInvitesRequest,
  GetPendingInvitesResponse,
  RejectPendingInviteRequest,
  RejectPendingInviteResponse,
  IgnorePendingInviteRequest,
  IgnorePendingInviteResponse,
  GetGuildRequest,
  GetGuildResponse,
  GetGuildInvitesRequest,
  GetGuildInvitesResponse,
  GetGuildMembersRequest,
  GetGuildMembersResponse,
  UpdateGuildInformationRequest,
  UpdateGuildInformationResponse,
  DeleteGuildRequest,
  DeleteGuildResponse,
  DeleteInviteRequest,
  DeleteInviteResponse,
  JoinGuildRequest,
  JoinGuildResponse,
  LeaveGuildRequest,
  LeaveGuildResponse,
  PreviewGuildRequest,
  PreviewGuildResponse,
  GetBannedUsersRequest,
  GetBannedUsersResponse,
  BanUserRequest,
  BanUserResponse,
  KickUserRequest,
  KickUserResponse,
  UnbanUserRequest,
  UnbanUserResponse,
  GrantOwnershipRequest,
  GrantOwnershipResponse,
  GiveUpOwnershipRequest,
  GiveUpOwnershipResponse,
} from "../../chat/v1/guilds";
import {
  CreateChannelRequest,
  CreateChannelResponse,
  GetGuildChannelsRequest,
  GetGuildChannelsResponse,
  UpdateChannelInformationRequest,
  UpdateChannelInformationResponse,
  UpdateChannelOrderRequest,
  UpdateChannelOrderResponse,
  UpdateAllChannelOrderRequest,
  UpdateAllChannelOrderResponse,
  DeleteChannelRequest,
  DeleteChannelResponse,
  TypingRequest,
  TypingResponse,
} from "../../chat/v1/channels";
import {
  GetChannelMessagesRequest,
  GetChannelMessagesResponse,
  GetMessageRequest,
  GetMessageResponse,
  UpdateMessageTextRequest,
  UpdateMessageTextResponse,
  DeleteMessageRequest,
  DeleteMessageResponse,
  TriggerActionRequest,
  TriggerActionResponse,
  SendMessageRequest,
  SendMessageResponse,
  GetPinnedMessagesRequest,
  GetPinnedMessagesResponse,
  PinMessageRequest,
  PinMessageResponse,
  UnpinMessageRequest,
  UnpinMessageResponse,
  AddReactionRequest,
  AddReactionResponse,
  RemoveReactionRequest,
  RemoveReactionResponse,
} from "../../chat/v1/messages";
import {
  HasPermissionRequest,
  HasPermissionResponse,
  SetPermissionsRequest,
  SetPermissionsResponse,
  GetPermissionsRequest,
  GetPermissionsResponse,
  MoveRoleRequest,
  MoveRoleResponse,
  GetGuildRolesRequest,
  GetGuildRolesResponse,
  AddGuildRoleRequest,
  AddGuildRoleResponse,
  ModifyGuildRoleRequest,
  ModifyGuildRoleResponse,
  DeleteGuildRoleRequest,
  DeleteGuildRoleResponse,
  ManageUserRolesRequest,
  ManageUserRolesResponse,
  GetUserRolesRequest,
  GetUserRolesResponse,
} from "../../chat/v1/permissions";
import {
  StreamEventsRequest,
  StreamEventsResponse,
} from "../../chat/v1/stream";

export const protobufPackage = "protocol.chat.v1";

/** The core of Harmony's chat operations. */
export const ChatServiceDefinition = {
  name: "ChatService",
  fullName: "protocol.chat.v1.ChatService",
  methods: {
    /** Endpoint to create a guild. */
    createGuild: {
      name: "CreateGuild",
      requestType: CreateGuildRequest,
      requestStream: false,
      responseType: CreateGuildResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to create a "room" guild. */
    createRoom: {
      name: "CreateRoom",
      requestType: CreateRoomRequest,
      requestStream: false,
      responseType: CreateRoomResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to create a "direct message" guild.
     *
     * - The inviter and the invitee that join the created guild will both be owners.
     * - The guild should be created on the server that inviter is on.
     * - The server should send a guild invite to the invitee (specified in the request),
     * using the `UserInvited` postbox event if the invitee is on another server,
     * otherwise see the below item.
     * - The server should process this as follows: adding the invite to their pending
     * invite list and sending an `InviteReceived` event over their event stream if
     * the invitee is on this server.
     * - The invitee may or may not use the invite. Only the invitee may use the invite.
     */
    createDirectMessage: {
      name: "CreateDirectMessage",
      requestType: CreateDirectMessageRequest,
      requestStream: false,
      responseType: CreateDirectMessageResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to upgrade a "room" guild to a "normal" guild. */
    upgradeRoomToGuild: {
      name: "UpgradeRoomToGuild",
      requestType: UpgradeRoomToGuildRequest,
      requestStream: false,
      responseType: UpgradeRoomToGuildResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to create an invite. */
    createInvite: {
      name: "CreateInvite",
      requestType: CreateInviteRequest,
      requestStream: false,
      responseType: CreateInviteResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to create a channel. */
    createChannel: {
      name: "CreateChannel",
      requestType: CreateChannelRequest,
      requestStream: false,
      responseType: CreateChannelResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get your guild list. */
    getGuildList: {
      name: "GetGuildList",
      requestType: GetGuildListRequest,
      requestStream: false,
      responseType: GetGuildListResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to invite a user to a guild. */
    inviteUserToGuild: {
      name: "InviteUserToGuild",
      requestType: InviteUserToGuildRequest,
      requestStream: false,
      responseType: InviteUserToGuildResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get your pending invites. */
    getPendingInvites: {
      name: "GetPendingInvites",
      requestType: GetPendingInvitesRequest,
      requestStream: false,
      responseType: GetPendingInvitesResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to reject (delete with notification to the inviter) an invite
     * from your pending invite list.
     *
     * If the invitee is on a different server than the inviter, the invitee's
     * server should send a `UserRejectedInvite` postbox event to the inviter's
     * server.
     *
     * The "notification" is sending a `InviteRejected` stream event to the
     * inviter. If the guild's kind is `DirectMessage`, the server should also
     * set the `rejected` field of the guild's kind to `true`.
     */
    rejectPendingInvite: {
      name: "RejectPendingInvite",
      requestType: RejectPendingInviteRequest,
      requestStream: false,
      responseType: RejectPendingInviteResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to ignore (delete without notification to the inviter) an
     * invite from your pending invite list.
     */
    ignorePendingInvite: {
      name: "IgnorePendingInvite",
      requestType: IgnorePendingInviteRequest,
      requestStream: false,
      responseType: IgnorePendingInviteResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get information about a guild. */
    getGuild: {
      name: "GetGuild",
      requestType: GetGuildRequest,
      requestStream: false,
      responseType: GetGuildResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to get the invites of a guild.
     *
     * This requires the "invites.view" permission.
     */
    getGuildInvites: {
      name: "GetGuildInvites",
      requestType: GetGuildInvitesRequest,
      requestStream: false,
      responseType: GetGuildInvitesResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get the members of a guild. */
    getGuildMembers: {
      name: "GetGuildMembers",
      requestType: GetGuildMembersRequest,
      requestStream: false,
      responseType: GetGuildMembersResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to get the channels of a guild.
     *
     * You will only be informed of channels you have the "messages.view"
     * permission for.
     */
    getGuildChannels: {
      name: "GetGuildChannels",
      requestType: GetGuildChannelsRequest,
      requestStream: false,
      responseType: GetGuildChannelsResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get the messages from a guild channel. */
    getChannelMessages: {
      name: "GetChannelMessages",
      requestType: GetChannelMessagesRequest,
      requestStream: false,
      responseType: GetChannelMessagesResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get a single message from a guild channel. */
    getMessage: {
      name: "GetMessage",
      requestType: GetMessageRequest,
      requestStream: false,
      responseType: GetMessageResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to update a guild's information. */
    updateGuildInformation: {
      name: "UpdateGuildInformation",
      requestType: UpdateGuildInformationRequest,
      requestStream: false,
      responseType: UpdateGuildInformationResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to update a channel's information. */
    updateChannelInformation: {
      name: "UpdateChannelInformation",
      requestType: UpdateChannelInformationRequest,
      requestStream: false,
      responseType: UpdateChannelInformationResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to change the position of a channel in the channel list. */
    updateChannelOrder: {
      name: "UpdateChannelOrder",
      requestType: UpdateChannelOrderRequest,
      requestStream: false,
      responseType: UpdateChannelOrderResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to change the position of all channels in the guild;
     * must specifcy all channels or fails
     */
    updateAllChannelOrder: {
      name: "UpdateAllChannelOrder",
      requestType: UpdateAllChannelOrderRequest,
      requestStream: false,
      responseType: UpdateAllChannelOrderResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to change the text of a message. */
    updateMessageText: {
      name: "UpdateMessageText",
      requestType: UpdateMessageTextRequest,
      requestStream: false,
      responseType: UpdateMessageTextResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to delete a guild.
     * Can only be invoked if there's one owner.
     */
    deleteGuild: {
      name: "DeleteGuild",
      requestType: DeleteGuildRequest,
      requestStream: false,
      responseType: DeleteGuildResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to delete an invite. */
    deleteInvite: {
      name: "DeleteInvite",
      requestType: DeleteInviteRequest,
      requestStream: false,
      responseType: DeleteInviteResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to delete a channel. */
    deleteChannel: {
      name: "DeleteChannel",
      requestType: DeleteChannelRequest,
      requestStream: false,
      responseType: DeleteChannelResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to delete a message.
     *
     * This requires the "messages.manage.delete" permission if you are not the
     * message author.
     */
    deleteMessage: {
      name: "DeleteMessage",
      requestType: DeleteMessageRequest,
      requestStream: false,
      responseType: DeleteMessageResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to join a guild.
     *
     * - If the invite used is in a user's "pending invites" list, it should be
     * removed from there.
     * - If the invite used reaches a use count bigger or equal to it's possible
     * uses, the invite should be deleted by the server. This doesn't apply if
     * possible uses is 0, which means an infinite amount of uses.
     */
    joinGuild: {
      name: "JoinGuild",
      requestType: JoinGuildRequest,
      requestStream: false,
      responseType: JoinGuildResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to leave a guild.
     *
     * - If you're the only owner, you can't leave a guild. Exception to this
     * rule are "direct message" guilds.
     * - When the last member in a "direct message" guild leaves it, that guild
     * should be deleted.
     */
    leaveGuild: {
      name: "LeaveGuild",
      requestType: LeaveGuildRequest,
      requestStream: false,
      responseType: LeaveGuildResponse,
      responseStream: false,
      options: {},
    },
    /** Endpont to trigger an action. */
    triggerAction: {
      name: "TriggerAction",
      requestType: TriggerActionRequest,
      requestStream: false,
      responseType: TriggerActionResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to send a message. */
    sendMessage: {
      name: "SendMessage",
      requestType: SendMessageRequest,
      requestStream: false,
      responseType: SendMessageResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to query if a user has a permission. */
    hasPermission: {
      name: "HasPermission",
      requestType: HasPermissionRequest,
      requestStream: false,
      responseType: HasPermissionResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to set permissions for a role in a guild. */
    setPermissions: {
      name: "SetPermissions",
      requestType: SetPermissionsRequest,
      requestStream: false,
      responseType: SetPermissionsResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get permissions for a role in a guild. */
    getPermissions: {
      name: "GetPermissions",
      requestType: GetPermissionsRequest,
      requestStream: false,
      responseType: GetPermissionsResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to change the position of a role in the role list in a guild. */
    moveRole: {
      name: "MoveRole",
      requestType: MoveRoleRequest,
      requestStream: false,
      responseType: MoveRoleResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get the roles from a guild. */
    getGuildRoles: {
      name: "GetGuildRoles",
      requestType: GetGuildRolesRequest,
      requestStream: false,
      responseType: GetGuildRolesResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to add a role to a guild. */
    addGuildRole: {
      name: "AddGuildRole",
      requestType: AddGuildRoleRequest,
      requestStream: false,
      responseType: AddGuildRoleResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to a modify a role from a guild. */
    modifyGuildRole: {
      name: "ModifyGuildRole",
      requestType: ModifyGuildRoleRequest,
      requestStream: false,
      responseType: ModifyGuildRoleResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to delete a role from a guild. */
    deleteGuildRole: {
      name: "DeleteGuildRole",
      requestType: DeleteGuildRoleRequest,
      requestStream: false,
      responseType: DeleteGuildRoleResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to manage the roles of a guild member. */
    manageUserRoles: {
      name: "ManageUserRoles",
      requestType: ManageUserRolesRequest,
      requestStream: false,
      responseType: ManageUserRolesResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get the roles a guild member has. */
    getUserRoles: {
      name: "GetUserRoles",
      requestType: GetUserRolesRequest,
      requestStream: false,
      responseType: GetUserRolesResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to send a typing notification in a guild channel. */
    typing: {
      name: "Typing",
      requestType: TypingRequest,
      requestStream: false,
      responseType: TypingResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to "preview" a guild, which returns some information about a
     * guild.
     *
     * - Guilds with the "direct message" kind can only be previewed
     * by the user who is invited to the guild.
     */
    previewGuild: {
      name: "PreviewGuild",
      requestType: PreviewGuildRequest,
      requestStream: false,
      responseType: PreviewGuildResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get banned users in a guild. */
    getBannedUsers: {
      name: "GetBannedUsers",
      requestType: GetBannedUsersRequest,
      requestStream: false,
      responseType: GetBannedUsersResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to ban a user from a guild. */
    banUser: {
      name: "BanUser",
      requestType: BanUserRequest,
      requestStream: false,
      responseType: BanUserResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to kick a user from a guild. */
    kickUser: {
      name: "KickUser",
      requestType: KickUserRequest,
      requestStream: false,
      responseType: KickUserResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to unban a user from a guild. */
    unbanUser: {
      name: "UnbanUser",
      requestType: UnbanUserRequest,
      requestStream: false,
      responseType: UnbanUserResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get all pinned messages in a guild channel. */
    getPinnedMessages: {
      name: "GetPinnedMessages",
      requestType: GetPinnedMessagesRequest,
      requestStream: false,
      responseType: GetPinnedMessagesResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to pin a message in a guild channel. */
    pinMessage: {
      name: "PinMessage",
      requestType: PinMessageRequest,
      requestStream: false,
      responseType: PinMessageResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to unpin a message in a guild channel. */
    unpinMessage: {
      name: "UnpinMessage",
      requestType: UnpinMessageRequest,
      requestStream: false,
      responseType: UnpinMessageResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to stream events from the homeserver.
     *
     * By default, this endpoint will subscribe to all events. Any guilds joined
     * in the future will be added to the subscription as well.
     *
     * Use `StreamEventsRequest.UnsubscribeFromAll` for unsubscribing from all
     * current subscriptions and disable automatic guild subscriptions.
     */
    streamEvents: {
      name: "StreamEvents",
      requestType: StreamEventsRequest,
      requestStream: true,
      responseType: StreamEventsResponse,
      responseStream: true,
      options: {},
    },
    /**
     * Endpoint to add a reaction to a message.
     *
     * Servers should prevent a user from adding multiple same reactions.
     */
    addReaction: {
      name: "AddReaction",
      requestType: AddReactionRequest,
      requestStream: false,
      responseType: AddReactionResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to remove a reaction from a message.
     *
     * Servers should only remove a reaction if the user making the request
     * added the reaction before.
     */
    removeReaction: {
      name: "RemoveReaction",
      requestType: RemoveReactionRequest,
      requestStream: false,
      responseType: RemoveReactionResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to give ownership to someone else. */
    grantOwnership: {
      name: "GrantOwnership",
      requestType: GrantOwnershipRequest,
      requestStream: false,
      responseType: GrantOwnershipResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to give up your own ownership.
     *
     * Requires that at least one other person will still be owner.
     */
    giveUpOwnership: {
      name: "GiveUpOwnership",
      requestType: GiveUpOwnershipRequest,
      requestStream: false,
      responseType: GiveUpOwnershipResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface DataLoaderOptions {
  cache?: boolean;
}

export interface DataLoaders {
  rpcDataLoaderOptions?: DataLoaderOptions;
  getDataLoader<T>(identifier: string, constructorFn: () => T): T;
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
