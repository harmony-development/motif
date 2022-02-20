/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import {
  ChannelKind,
  channelKindFromJSON,
  channelKindToJSON,
} from "../../chat/v1/channels";
import {
  LeaveReason,
  leaveReasonFromJSON,
  leaveReasonToJSON,
} from "../../chat/v1/guilds";
import { StreamEvent as StreamEvent1 } from "../../emote/v1/stream";
import { StreamEvent as StreamEvent2 } from "../../profile/v1/stream";
import {
  Message,
  FormattedText,
  ActionPayload,
  Reaction,
} from "../../chat/v1/messages";
import { ItemPosition, Metadata } from "../../harmonytypes/v1/types";
import { Permission } from "../../chat/v1/permissions";

export const protobufPackage = "protocol.chat.v1";

/**
 * Request type for use in the `StreamEvents` endpoint.
 * By default, this endpoint will subscribe to all events.
 * Any guilds joined in the future will be added to the subscription as well.
 * Use the UnsubscribeFromAll event for unsubscribing from all current subscriptions and disable the automatic guild subscriptions
 */
export interface StreamEventsRequest {
  /** Subscribe to the guild event source. */
  subscribeToGuild: StreamEventsRequest_SubscribeToGuild | undefined;
  /** Subscribe to the action event source. */
  subscribeToActions: StreamEventsRequest_SubscribeToActions | undefined;
  /** Subscribe to the homeserver event source. */
  subscribeToHomeserverEvents:
    | StreamEventsRequest_SubscribeToHomeserverEvents
    | undefined;
  /** Unsubscribe from all events. */
  unsubscribeFromAll: StreamEventsRequest_UnsubscribeFromAll | undefined;
}

/** Event source for guilds' events. */
export interface StreamEventsRequest_SubscribeToGuild {
  /** the guild id to subscribe to */
  guildId: number;
}

/** Event source for actions' events. */
export interface StreamEventsRequest_SubscribeToActions {}

/** Event source for homeserver events. */
export interface StreamEventsRequest_SubscribeToHomeserverEvents {}

/** Event to unsubscribe from all events. */
export interface StreamEventsRequest_UnsubscribeFromAll {}

/** Used in the `StreamEvents` endpoint. */
export interface StreamEventsResponse {
  /** A chat event. */
  chat: StreamEvent | undefined;
  /** A emote event. */
  emote: StreamEvent1 | undefined;
  /** A profile event. */
  profile: StreamEvent2 | undefined;
}

/** Describes an event. */
export interface StreamEvent {
  /** Send the guild added to list event. */
  guildAddedToList: StreamEvent_GuildAddedToList | undefined;
  /** Send the guild removed from list event. */
  guildRemovedFromList: StreamEvent_GuildRemovedFromList | undefined;
  /** Send the action performed event. */
  actionPerformed: StreamEvent_ActionPerformed | undefined;
  /** Send the message sent event. */
  sentMessage: StreamEvent_MessageSent | undefined;
  /** Send the message updated event. */
  editedMessage: StreamEvent_MessageUpdated | undefined;
  /** Send the message deleted event. */
  deletedMessage: StreamEvent_MessageDeleted | undefined;
  /** Send the channel created event. */
  createdChannel: StreamEvent_ChannelCreated | undefined;
  /** Send the channel updated event. */
  editedChannel: StreamEvent_ChannelUpdated | undefined;
  /** Send the channel deleted event. */
  deletedChannel: StreamEvent_ChannelDeleted | undefined;
  /** Send the guild updated event. */
  editedGuild: StreamEvent_GuildUpdated | undefined;
  /** Send the guild deleted event. */
  deletedGuild: StreamEvent_GuildDeleted | undefined;
  /** Send the member joined event. */
  joinedMember: StreamEvent_MemberJoined | undefined;
  /** Send the member left event. */
  leftMember: StreamEvent_MemberLeft | undefined;
  /** Send the typing event. */
  typing: StreamEvent_Typing | undefined;
  /** Send the role created event. */
  roleCreated: StreamEvent_RoleCreated | undefined;
  /** Send the role deleted event. */
  roleDeleted: StreamEvent_RoleDeleted | undefined;
  /** Send the role moved event. */
  roleMoved: StreamEvent_RoleMoved | undefined;
  /** Send the role updated event. */
  roleUpdated: StreamEvent_RoleUpdated | undefined;
  /** Send the role perms updated event. */
  rolePermsUpdated: StreamEvent_RolePermissionsUpdated | undefined;
  /** Send the user roles updated event. */
  userRolesUpdated: StreamEvent_UserRolesUpdated | undefined;
  /** Send the permission updated event. */
  permissionUpdated: StreamEvent_PermissionUpdated | undefined;
  /** The channels have been completely reordered. */
  channelsReordered: StreamEvent_ChannelsReordered | undefined;
  /** Send the channel position updated event. */
  editedChannelPosition: StreamEvent_ChannelPositionUpdated | undefined;
  /** Send the message pinned event. */
  messagePinned: StreamEvent_MessagePinned | undefined;
  /** Send the message unpinned event. */
  messageUnpinned: StreamEvent_MessageUnpinned | undefined;
  /** Send the reaction updated event. */
  reactionUpdated: StreamEvent_ReactionUpdated | undefined;
  /** Send the owner added event. */
  ownerAdded: StreamEvent_OwnerAdded | undefined;
  /** Send the owner removed event. */
  ownerRemoved: StreamEvent_OwnerRemoved | undefined;
  /** Send the guild invite received event. */
  inviteReceived: StreamEvent_InviteReceived | undefined;
  /** Send the guild invite rejected event. */
  inviteRejected: StreamEvent_InviteRejected | undefined;
  /** Send the invite created event. */
  inviteCreated: StreamEvent_InviteCreated | undefined;
  /** Send the invite deleted event. */
  inviteDeleted: StreamEvent_InviteDeleted | undefined;
  /** Send the invite used event. */
  inviteUsed: StreamEvent_InviteUsed | undefined;
}

/**
 * Event sent when a new message is sent.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel the message was sent in.
 */
export interface StreamEvent_MessageSent {
  /** ID that is sent by your client it can use to confirm that the message is sent. */
  echoId?: number | undefined;
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel where this event happened. */
  channelId: number;
  /** Message ID of the message that was updated. */
  messageId: number;
  /** The actual message. */
  message: Message | undefined;
}

/**
 * Event sent when a message's text content is updated.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel the message was updated in.
 */
export interface StreamEvent_MessageUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel where this event happened. */
  channelId: number;
  /** Message ID of the message that was updated. */
  messageId: number;
  /** When this message was edited, in milliseconds since unix epoch */
  editedAt: number;
  /** New message content. */
  newContent: FormattedText | undefined;
}

/**
 * Event sent when a message is deleted.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel the message was deleted in.
 */
export interface StreamEvent_MessageDeleted {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel where this event happened. */
  channelId: number;
  /** Message ID of the message that was deleted. */
  messageId: number;
}

/** Event sent when a new channel is created. */
export interface StreamEvent_ChannelCreated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel where this event happened. */
  channelId: number;
  /** Name of this channel. */
  name: string;
  /** The position in the channel list. */
  position: ItemPosition | undefined;
  /** The kind of this channel. */
  kind: ChannelKind;
  /** Metadata for this channel. */
  metadata?: Metadata | undefined;
}

/**
 * Event sent when a channel's information is changed.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel that was updated.
 */
export interface StreamEvent_ChannelUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel that was changed. */
  channelId: number;
  /** The new name of the channel. */
  newName?: string | undefined;
  /** The new metadata of the channel. */
  newMetadata?: Metadata | undefined;
}

/**
 * Event sent when a channel's position in the channel list is changed.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel that was moved.
 */
export interface StreamEvent_ChannelPositionUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel that was changed. */
  channelId: number;
  /** The new position of the channel. */
  newPosition?: ItemPosition | undefined;
}

/**
 * Event sent when all channels have been reordered.
 *
 * If a user does not have "messages.view" permission for a channel in here,
 * it should be omitted from the list.
 */
export interface StreamEvent_ChannelsReordered {
  /** guild_id: the guild whose channels are being reordered */
  guildId: number;
  /** channel_ids: the new order of channel IDs */
  channelIds: number[];
}

/**
 * Event sent when a channel is deleted.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel that was deleted.
 */
export interface StreamEvent_ChannelDeleted {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel that was deleted. */
  channelId: number;
}

/** Event sent when a guild's information is changed. */
export interface StreamEvent_GuildUpdated {
  /** Guild ID of the guild that was changed. */
  guildId: number;
  /** The new name of the guild. */
  newName?: string | undefined;
  /** The new picture of the guild. */
  newPicture?: string | undefined;
  /** The new metadata of the guild. */
  newMetadata?: Metadata | undefined;
}

/** Event sent when a guild is deleted. */
export interface StreamEvent_GuildDeleted {
  /** Guild ID of the guild that was deleted. */
  guildId: number;
}

/** Event sent a user joins to a guild. */
export interface StreamEvent_MemberJoined {
  /** Member ID of the member that joined the guild. */
  memberId: number;
  /** Guild ID of the guild where this event happened. */
  guildId: number;
}

/** Event sent when a member of a guild leaves said guild for whatever reason. */
export interface StreamEvent_MemberLeft {
  /** User ID of the member that left the guild. */
  memberId: number;
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Why this member left the guild. */
  leaveReason: LeaveReason;
}

/** Event sent when you join a new guild. */
export interface StreamEvent_GuildAddedToList {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** The homeserver this guild is on. */
  homeserver: string;
}

/** Event sent when you leave a guild. */
export interface StreamEvent_GuildRemovedFromList {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** The homeserver this guild is on. */
  homeserver: string;
}

/** Event sent when an action is performed. */
export interface StreamEvent_ActionPerformed {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel where this event happened. */
  channelId: number;
  /** Message ID where this event happened. */
  messageId: number;
  /** User ID of the user that triggered the action */
  userId: number;
  /** The action data payload */
  payload: ActionPayload | undefined;
}

/**
 * Event sent when a role's position in the role list is changed.
 *
 * This event will only be sent to users with the "roles.get" permission.
 */
export interface StreamEvent_RoleMoved {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Role ID of the role that was moved. */
  roleId: number;
  /** New position of the role. */
  newPosition: ItemPosition | undefined;
}

/**
 * Event sent when a role is deleted.
 *
 * This event will only be sent to users with the "roles.get" permission.
 */
export interface StreamEvent_RoleDeleted {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Role ID of the role that was deleted. */
  roleId: number;
}

/**
 * Event sent when a role is created.
 *
 * This event will only be sent to users with the "roles.get" permission.
 */
export interface StreamEvent_RoleCreated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Role ID of the role that was created. */
  roleId: number;
  /** The name of the role. */
  name: string;
  /** The color of the role. */
  color: number;
  /** The hoist status of the role. */
  hoist: boolean;
  /** The pingable status of the role. */
  pingable: boolean;
}

/**
 * Event sent when a role's information is changed.
 *
 * This event will only be sent to users with the "roles.get" permission.
 */
export interface StreamEvent_RoleUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Role ID of the role that was changed. */
  roleId: number;
  /** The new name of the role. */
  newName?: string | undefined;
  /** The new color of the role. */
  newColor?: number | undefined;
  /** The new hoist status of the role. */
  newHoist?: boolean | undefined;
  /** The new pingable status of the role. */
  newPingable?: boolean | undefined;
}

/**
 * Event sent when a role's permissions are changed.
 *
 * This event will only be sent to users with the "roles.manage" permission.
 */
export interface StreamEvent_RolePermissionsUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel where this event happened. */
  channelId?: number | undefined;
  /** Role ID of the role that had it's permissions changed. */
  roleId: number;
  /** The new permissions. */
  newPerms: Permission[];
}

/**
 * Event sent when a user's roles are changed.
 *
 * This event will only be sent to users with the "roles.user.get" permission.
 */
export interface StreamEvent_UserRolesUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** User ID of the user that had it's roles changed. */
  userId: number;
  /** The new role IDs. */
  newRoleIds: number[];
}

/**
 * Event sent when a user sends a typing notification in a guild channel.
 *
 * Should only be sent to users who have the "message.view" permission for
 * the guild channel where the typing happened.
 */
export interface StreamEvent_Typing {
  /** User ID of the user that sent the typing notification. */
  userId: number;
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel where this event happened. */
  channelId: number;
}

/**
 * Event sent when a permission is changed that matters to you.
 *
 * Servers should calculate which users to send this event to when a permission is set.
 * It should only be sent if a user is subscribed to the guild the permission pertains to.
 */
export interface StreamEvent_PermissionUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: number;
  /** Channel ID of the channel where this event happened. */
  channelId?: number | undefined;
  /** The permission node that was changed. */
  query: string;
  /** Whether you have the permission or not. */
  ok: boolean;
}

/**
 * Sent when a message is pinned in a guild channel.
 *
 * Should only be sent to users who have the "message.view" permission for
 * the guild channel where the message was pinned.
 */
export interface StreamEvent_MessagePinned {
  /** Guild ID of the guild where this event occured. */
  guildId: number;
  /** Channel ID of the channel where this event occured. */
  channelId: number;
  /** Message ID of the message that was pinned. */
  messageId: number;
}

/**
 * Sent when a message is unpinned in a guild channel.
 *
 * Should only be sent to users who have the "message.view" permission for
 * the guild channel where the message was unpinned.
 */
export interface StreamEvent_MessageUnpinned {
  /** Guild ID of the guild where this event occured. */
  guildId: number;
  /** Channel ID of the channel where this event occured. */
  channelId: number;
  /** Message ID of the message that was unpinned. */
  messageId: number;
}

/**
 * Sent when a message's reaction is changed.
 *
 * Should only be sent to users who have the "message.view" permission for
 * the guild channel where the reaction was updated.
 */
export interface StreamEvent_ReactionUpdated {
  /** Guild ID of the guild where this event occured. */
  guildId: number;
  /** Channel ID of the channel where this event occured. */
  channelId: number;
  /** Message ID of the message that had a reaction updated. */
  messageId: number;
  /** The reaction. */
  reaction: Reaction | undefined;
}

/** Sent when there's a new owner. */
export interface StreamEvent_OwnerAdded {
  /** Guild ID of the guild where this event occured. */
  guildId: number;
  /** User ID of the new owner. */
  userId: number;
}

/** Sent when an owner gives up their ownership. */
export interface StreamEvent_OwnerRemoved {
  /** Guild ID of the guild where this event occured. */
  guildId: number;
  /** User ID of the user who is no longer owner. */
  userId: number;
}

/** Sent when a guild invite is received. */
export interface StreamEvent_InviteReceived {
  /** ID of the invite received. */
  inviteId: string;
  /** Server ID of the server the inviter is on. */
  serverId?: string | undefined;
  /** User ID of the inviter. */
  inviterId: number;
}

/** Sent when a guild invite is rejected by the invitee. */
export interface StreamEvent_InviteRejected {
  /** Guild ID of the guild that this occured for. */
  guildId: number;
  /** ID of the invite rejected. */
  inviteId: string;
  /** User ID of the invitee. */
  userId: number;
}

/**
 * Sent when an invite is created in a guild.
 *
 * This will only be sent to members of a guild with "invites.view" permission.
 */
export interface StreamEvent_InviteCreated {
  /** Guild ID of the guild that this occured for. */
  guildId: number;
  /** ID of the invite that was created. */
  inviteId: string;
  /** Possible uses of the created invite. */
  possibleUses: number;
}

/**
 * Sent when an invite is deleted in a guild.
 *
 * This can occur because of the invite being used up (0 remaining uses),
 * or a user deleting the invite.
 *
 * This will only be sent to members of a guild with "invites.view" permission.
 */
export interface StreamEvent_InviteDeleted {
  /** Guild ID of the guild that this occured for. */
  guildId: number;
  /** ID of the invite that was deleted. */
  inviteId: string;
}

/**
 * Sent when an invite is used once by a user.
 *
 * This will only be sent to members of a guild with "invites.view" permission.
 */
export interface StreamEvent_InviteUsed {
  /** Guild ID of the guild that this occured for. */
  guildId: number;
  /** ID of the invite that was used. */
  inviteId: string;
  /** User ID of the user that used this invite. */
  userId: number;
}

function createBaseStreamEventsRequest(): StreamEventsRequest {
  return {
    subscribeToGuild: undefined,
    subscribeToActions: undefined,
    subscribeToHomeserverEvents: undefined,
    unsubscribeFromAll: undefined,
  };
}

export const StreamEventsRequest = {
  encode(
    message: StreamEventsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.subscribeToGuild !== undefined) {
      StreamEventsRequest_SubscribeToGuild.encode(
        message.subscribeToGuild,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.subscribeToActions !== undefined) {
      StreamEventsRequest_SubscribeToActions.encode(
        message.subscribeToActions,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.subscribeToHomeserverEvents !== undefined) {
      StreamEventsRequest_SubscribeToHomeserverEvents.encode(
        message.subscribeToHomeserverEvents,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.unsubscribeFromAll !== undefined) {
      StreamEventsRequest_UnsubscribeFromAll.encode(
        message.unsubscribeFromAll,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEventsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subscribeToGuild =
            StreamEventsRequest_SubscribeToGuild.decode(
              reader,
              reader.uint32()
            );
          break;
        case 2:
          message.subscribeToActions =
            StreamEventsRequest_SubscribeToActions.decode(
              reader,
              reader.uint32()
            );
          break;
        case 3:
          message.subscribeToHomeserverEvents =
            StreamEventsRequest_SubscribeToHomeserverEvents.decode(
              reader,
              reader.uint32()
            );
          break;
        case 4:
          message.unsubscribeFromAll =
            StreamEventsRequest_UnsubscribeFromAll.decode(
              reader,
              reader.uint32()
            );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEventsRequest {
    return {
      subscribeToGuild: isSet(object.subscribeToGuild)
        ? StreamEventsRequest_SubscribeToGuild.fromJSON(object.subscribeToGuild)
        : undefined,
      subscribeToActions: isSet(object.subscribeToActions)
        ? StreamEventsRequest_SubscribeToActions.fromJSON(
            object.subscribeToActions
          )
        : undefined,
      subscribeToHomeserverEvents: isSet(object.subscribeToHomeserverEvents)
        ? StreamEventsRequest_SubscribeToHomeserverEvents.fromJSON(
            object.subscribeToHomeserverEvents
          )
        : undefined,
      unsubscribeFromAll: isSet(object.unsubscribeFromAll)
        ? StreamEventsRequest_UnsubscribeFromAll.fromJSON(
            object.unsubscribeFromAll
          )
        : undefined,
    };
  },

  toJSON(message: StreamEventsRequest): unknown {
    const obj: any = {};
    message.subscribeToGuild !== undefined &&
      (obj.subscribeToGuild = message.subscribeToGuild
        ? StreamEventsRequest_SubscribeToGuild.toJSON(message.subscribeToGuild)
        : undefined);
    message.subscribeToActions !== undefined &&
      (obj.subscribeToActions = message.subscribeToActions
        ? StreamEventsRequest_SubscribeToActions.toJSON(
            message.subscribeToActions
          )
        : undefined);
    message.subscribeToHomeserverEvents !== undefined &&
      (obj.subscribeToHomeserverEvents = message.subscribeToHomeserverEvents
        ? StreamEventsRequest_SubscribeToHomeserverEvents.toJSON(
            message.subscribeToHomeserverEvents
          )
        : undefined);
    message.unsubscribeFromAll !== undefined &&
      (obj.unsubscribeFromAll = message.unsubscribeFromAll
        ? StreamEventsRequest_UnsubscribeFromAll.toJSON(
            message.unsubscribeFromAll
          )
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEventsRequest>, I>>(
    object: I
  ): StreamEventsRequest {
    const message = createBaseStreamEventsRequest();
    message.subscribeToGuild =
      object.subscribeToGuild !== undefined && object.subscribeToGuild !== null
        ? StreamEventsRequest_SubscribeToGuild.fromPartial(
            object.subscribeToGuild
          )
        : undefined;
    message.subscribeToActions =
      object.subscribeToActions !== undefined &&
      object.subscribeToActions !== null
        ? StreamEventsRequest_SubscribeToActions.fromPartial(
            object.subscribeToActions
          )
        : undefined;
    message.subscribeToHomeserverEvents =
      object.subscribeToHomeserverEvents !== undefined &&
      object.subscribeToHomeserverEvents !== null
        ? StreamEventsRequest_SubscribeToHomeserverEvents.fromPartial(
            object.subscribeToHomeserverEvents
          )
        : undefined;
    message.unsubscribeFromAll =
      object.unsubscribeFromAll !== undefined &&
      object.unsubscribeFromAll !== null
        ? StreamEventsRequest_UnsubscribeFromAll.fromPartial(
            object.unsubscribeFromAll
          )
        : undefined;
    return message;
  },
};

function createBaseStreamEventsRequest_SubscribeToGuild(): StreamEventsRequest_SubscribeToGuild {
  return { guildId: 0 };
}

export const StreamEventsRequest_SubscribeToGuild = {
  encode(
    message: StreamEventsRequest_SubscribeToGuild,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEventsRequest_SubscribeToGuild {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsRequest_SubscribeToGuild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEventsRequest_SubscribeToGuild {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: StreamEventsRequest_SubscribeToGuild): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamEventsRequest_SubscribeToGuild>, I>
  >(object: I): StreamEventsRequest_SubscribeToGuild {
    const message = createBaseStreamEventsRequest_SubscribeToGuild();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseStreamEventsRequest_SubscribeToActions(): StreamEventsRequest_SubscribeToActions {
  return {};
}

export const StreamEventsRequest_SubscribeToActions = {
  encode(
    _: StreamEventsRequest_SubscribeToActions,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEventsRequest_SubscribeToActions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsRequest_SubscribeToActions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): StreamEventsRequest_SubscribeToActions {
    return {};
  },

  toJSON(_: StreamEventsRequest_SubscribeToActions): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamEventsRequest_SubscribeToActions>, I>
  >(_: I): StreamEventsRequest_SubscribeToActions {
    const message = createBaseStreamEventsRequest_SubscribeToActions();
    return message;
  },
};

function createBaseStreamEventsRequest_SubscribeToHomeserverEvents(): StreamEventsRequest_SubscribeToHomeserverEvents {
  return {};
}

export const StreamEventsRequest_SubscribeToHomeserverEvents = {
  encode(
    _: StreamEventsRequest_SubscribeToHomeserverEvents,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEventsRequest_SubscribeToHomeserverEvents {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsRequest_SubscribeToHomeserverEvents();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): StreamEventsRequest_SubscribeToHomeserverEvents {
    return {};
  },

  toJSON(_: StreamEventsRequest_SubscribeToHomeserverEvents): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<StreamEventsRequest_SubscribeToHomeserverEvents>,
      I
    >
  >(_: I): StreamEventsRequest_SubscribeToHomeserverEvents {
    const message = createBaseStreamEventsRequest_SubscribeToHomeserverEvents();
    return message;
  },
};

function createBaseStreamEventsRequest_UnsubscribeFromAll(): StreamEventsRequest_UnsubscribeFromAll {
  return {};
}

export const StreamEventsRequest_UnsubscribeFromAll = {
  encode(
    _: StreamEventsRequest_UnsubscribeFromAll,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEventsRequest_UnsubscribeFromAll {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsRequest_UnsubscribeFromAll();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): StreamEventsRequest_UnsubscribeFromAll {
    return {};
  },

  toJSON(_: StreamEventsRequest_UnsubscribeFromAll): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamEventsRequest_UnsubscribeFromAll>, I>
  >(_: I): StreamEventsRequest_UnsubscribeFromAll {
    const message = createBaseStreamEventsRequest_UnsubscribeFromAll();
    return message;
  },
};

function createBaseStreamEventsResponse(): StreamEventsResponse {
  return { chat: undefined, emote: undefined, profile: undefined };
}

export const StreamEventsResponse = {
  encode(
    message: StreamEventsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.chat !== undefined) {
      StreamEvent.encode(message.chat, writer.uint32(10).fork()).ldelim();
    }
    if (message.emote !== undefined) {
      StreamEvent1.encode(message.emote, writer.uint32(18).fork()).ldelim();
    }
    if (message.profile !== undefined) {
      StreamEvent2.encode(message.profile, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEventsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chat = StreamEvent.decode(reader, reader.uint32());
          break;
        case 2:
          message.emote = StreamEvent1.decode(reader, reader.uint32());
          break;
        case 3:
          message.profile = StreamEvent2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEventsResponse {
    return {
      chat: isSet(object.chat) ? StreamEvent.fromJSON(object.chat) : undefined,
      emote: isSet(object.emote)
        ? StreamEvent1.fromJSON(object.emote)
        : undefined,
      profile: isSet(object.profile)
        ? StreamEvent2.fromJSON(object.profile)
        : undefined,
    };
  },

  toJSON(message: StreamEventsResponse): unknown {
    const obj: any = {};
    message.chat !== undefined &&
      (obj.chat = message.chat ? StreamEvent.toJSON(message.chat) : undefined);
    message.emote !== undefined &&
      (obj.emote = message.emote
        ? StreamEvent1.toJSON(message.emote)
        : undefined);
    message.profile !== undefined &&
      (obj.profile = message.profile
        ? StreamEvent2.toJSON(message.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEventsResponse>, I>>(
    object: I
  ): StreamEventsResponse {
    const message = createBaseStreamEventsResponse();
    message.chat =
      object.chat !== undefined && object.chat !== null
        ? StreamEvent.fromPartial(object.chat)
        : undefined;
    message.emote =
      object.emote !== undefined && object.emote !== null
        ? StreamEvent1.fromPartial(object.emote)
        : undefined;
    message.profile =
      object.profile !== undefined && object.profile !== null
        ? StreamEvent2.fromPartial(object.profile)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent(): StreamEvent {
  return {
    guildAddedToList: undefined,
    guildRemovedFromList: undefined,
    actionPerformed: undefined,
    sentMessage: undefined,
    editedMessage: undefined,
    deletedMessage: undefined,
    createdChannel: undefined,
    editedChannel: undefined,
    deletedChannel: undefined,
    editedGuild: undefined,
    deletedGuild: undefined,
    joinedMember: undefined,
    leftMember: undefined,
    typing: undefined,
    roleCreated: undefined,
    roleDeleted: undefined,
    roleMoved: undefined,
    roleUpdated: undefined,
    rolePermsUpdated: undefined,
    userRolesUpdated: undefined,
    permissionUpdated: undefined,
    channelsReordered: undefined,
    editedChannelPosition: undefined,
    messagePinned: undefined,
    messageUnpinned: undefined,
    reactionUpdated: undefined,
    ownerAdded: undefined,
    ownerRemoved: undefined,
    inviteReceived: undefined,
    inviteRejected: undefined,
    inviteCreated: undefined,
    inviteDeleted: undefined,
    inviteUsed: undefined,
  };
}

export const StreamEvent = {
  encode(message: StreamEvent, writer: Writer = Writer.create()): Writer {
    if (message.guildAddedToList !== undefined) {
      StreamEvent_GuildAddedToList.encode(
        message.guildAddedToList,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.guildRemovedFromList !== undefined) {
      StreamEvent_GuildRemovedFromList.encode(
        message.guildRemovedFromList,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.actionPerformed !== undefined) {
      StreamEvent_ActionPerformed.encode(
        message.actionPerformed,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.sentMessage !== undefined) {
      StreamEvent_MessageSent.encode(
        message.sentMessage,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.editedMessage !== undefined) {
      StreamEvent_MessageUpdated.encode(
        message.editedMessage,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.deletedMessage !== undefined) {
      StreamEvent_MessageDeleted.encode(
        message.deletedMessage,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.createdChannel !== undefined) {
      StreamEvent_ChannelCreated.encode(
        message.createdChannel,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.editedChannel !== undefined) {
      StreamEvent_ChannelUpdated.encode(
        message.editedChannel,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.deletedChannel !== undefined) {
      StreamEvent_ChannelDeleted.encode(
        message.deletedChannel,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.editedGuild !== undefined) {
      StreamEvent_GuildUpdated.encode(
        message.editedGuild,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.deletedGuild !== undefined) {
      StreamEvent_GuildDeleted.encode(
        message.deletedGuild,
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.joinedMember !== undefined) {
      StreamEvent_MemberJoined.encode(
        message.joinedMember,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.leftMember !== undefined) {
      StreamEvent_MemberLeft.encode(
        message.leftMember,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.typing !== undefined) {
      StreamEvent_Typing.encode(
        message.typing,
        writer.uint32(114).fork()
      ).ldelim();
    }
    if (message.roleCreated !== undefined) {
      StreamEvent_RoleCreated.encode(
        message.roleCreated,
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.roleDeleted !== undefined) {
      StreamEvent_RoleDeleted.encode(
        message.roleDeleted,
        writer.uint32(130).fork()
      ).ldelim();
    }
    if (message.roleMoved !== undefined) {
      StreamEvent_RoleMoved.encode(
        message.roleMoved,
        writer.uint32(138).fork()
      ).ldelim();
    }
    if (message.roleUpdated !== undefined) {
      StreamEvent_RoleUpdated.encode(
        message.roleUpdated,
        writer.uint32(146).fork()
      ).ldelim();
    }
    if (message.rolePermsUpdated !== undefined) {
      StreamEvent_RolePermissionsUpdated.encode(
        message.rolePermsUpdated,
        writer.uint32(154).fork()
      ).ldelim();
    }
    if (message.userRolesUpdated !== undefined) {
      StreamEvent_UserRolesUpdated.encode(
        message.userRolesUpdated,
        writer.uint32(162).fork()
      ).ldelim();
    }
    if (message.permissionUpdated !== undefined) {
      StreamEvent_PermissionUpdated.encode(
        message.permissionUpdated,
        writer.uint32(170).fork()
      ).ldelim();
    }
    if (message.channelsReordered !== undefined) {
      StreamEvent_ChannelsReordered.encode(
        message.channelsReordered,
        writer.uint32(178).fork()
      ).ldelim();
    }
    if (message.editedChannelPosition !== undefined) {
      StreamEvent_ChannelPositionUpdated.encode(
        message.editedChannelPosition,
        writer.uint32(186).fork()
      ).ldelim();
    }
    if (message.messagePinned !== undefined) {
      StreamEvent_MessagePinned.encode(
        message.messagePinned,
        writer.uint32(194).fork()
      ).ldelim();
    }
    if (message.messageUnpinned !== undefined) {
      StreamEvent_MessageUnpinned.encode(
        message.messageUnpinned,
        writer.uint32(202).fork()
      ).ldelim();
    }
    if (message.reactionUpdated !== undefined) {
      StreamEvent_ReactionUpdated.encode(
        message.reactionUpdated,
        writer.uint32(210).fork()
      ).ldelim();
    }
    if (message.ownerAdded !== undefined) {
      StreamEvent_OwnerAdded.encode(
        message.ownerAdded,
        writer.uint32(218).fork()
      ).ldelim();
    }
    if (message.ownerRemoved !== undefined) {
      StreamEvent_OwnerRemoved.encode(
        message.ownerRemoved,
        writer.uint32(226).fork()
      ).ldelim();
    }
    if (message.inviteReceived !== undefined) {
      StreamEvent_InviteReceived.encode(
        message.inviteReceived,
        writer.uint32(234).fork()
      ).ldelim();
    }
    if (message.inviteRejected !== undefined) {
      StreamEvent_InviteRejected.encode(
        message.inviteRejected,
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.inviteCreated !== undefined) {
      StreamEvent_InviteCreated.encode(
        message.inviteCreated,
        writer.uint32(250).fork()
      ).ldelim();
    }
    if (message.inviteDeleted !== undefined) {
      StreamEvent_InviteDeleted.encode(
        message.inviteDeleted,
        writer.uint32(258).fork()
      ).ldelim();
    }
    if (message.inviteUsed !== undefined) {
      StreamEvent_InviteUsed.encode(
        message.inviteUsed,
        writer.uint32(266).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildAddedToList = StreamEvent_GuildAddedToList.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.guildRemovedFromList =
            StreamEvent_GuildRemovedFromList.decode(reader, reader.uint32());
          break;
        case 3:
          message.actionPerformed = StreamEvent_ActionPerformed.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.sentMessage = StreamEvent_MessageSent.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.editedMessage = StreamEvent_MessageUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.deletedMessage = StreamEvent_MessageDeleted.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.createdChannel = StreamEvent_ChannelCreated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.editedChannel = StreamEvent_ChannelUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.deletedChannel = StreamEvent_ChannelDeleted.decode(
            reader,
            reader.uint32()
          );
          break;
        case 10:
          message.editedGuild = StreamEvent_GuildUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.deletedGuild = StreamEvent_GuildDeleted.decode(
            reader,
            reader.uint32()
          );
          break;
        case 12:
          message.joinedMember = StreamEvent_MemberJoined.decode(
            reader,
            reader.uint32()
          );
          break;
        case 13:
          message.leftMember = StreamEvent_MemberLeft.decode(
            reader,
            reader.uint32()
          );
          break;
        case 14:
          message.typing = StreamEvent_Typing.decode(reader, reader.uint32());
          break;
        case 15:
          message.roleCreated = StreamEvent_RoleCreated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 16:
          message.roleDeleted = StreamEvent_RoleDeleted.decode(
            reader,
            reader.uint32()
          );
          break;
        case 17:
          message.roleMoved = StreamEvent_RoleMoved.decode(
            reader,
            reader.uint32()
          );
          break;
        case 18:
          message.roleUpdated = StreamEvent_RoleUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 19:
          message.rolePermsUpdated = StreamEvent_RolePermissionsUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 20:
          message.userRolesUpdated = StreamEvent_UserRolesUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 21:
          message.permissionUpdated = StreamEvent_PermissionUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 22:
          message.channelsReordered = StreamEvent_ChannelsReordered.decode(
            reader,
            reader.uint32()
          );
          break;
        case 23:
          message.editedChannelPosition =
            StreamEvent_ChannelPositionUpdated.decode(reader, reader.uint32());
          break;
        case 24:
          message.messagePinned = StreamEvent_MessagePinned.decode(
            reader,
            reader.uint32()
          );
          break;
        case 25:
          message.messageUnpinned = StreamEvent_MessageUnpinned.decode(
            reader,
            reader.uint32()
          );
          break;
        case 26:
          message.reactionUpdated = StreamEvent_ReactionUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 27:
          message.ownerAdded = StreamEvent_OwnerAdded.decode(
            reader,
            reader.uint32()
          );
          break;
        case 28:
          message.ownerRemoved = StreamEvent_OwnerRemoved.decode(
            reader,
            reader.uint32()
          );
          break;
        case 29:
          message.inviteReceived = StreamEvent_InviteReceived.decode(
            reader,
            reader.uint32()
          );
          break;
        case 30:
          message.inviteRejected = StreamEvent_InviteRejected.decode(
            reader,
            reader.uint32()
          );
          break;
        case 31:
          message.inviteCreated = StreamEvent_InviteCreated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 32:
          message.inviteDeleted = StreamEvent_InviteDeleted.decode(
            reader,
            reader.uint32()
          );
          break;
        case 33:
          message.inviteUsed = StreamEvent_InviteUsed.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent {
    return {
      guildAddedToList: isSet(object.guildAddedToList)
        ? StreamEvent_GuildAddedToList.fromJSON(object.guildAddedToList)
        : undefined,
      guildRemovedFromList: isSet(object.guildRemovedFromList)
        ? StreamEvent_GuildRemovedFromList.fromJSON(object.guildRemovedFromList)
        : undefined,
      actionPerformed: isSet(object.actionPerformed)
        ? StreamEvent_ActionPerformed.fromJSON(object.actionPerformed)
        : undefined,
      sentMessage: isSet(object.sentMessage)
        ? StreamEvent_MessageSent.fromJSON(object.sentMessage)
        : undefined,
      editedMessage: isSet(object.editedMessage)
        ? StreamEvent_MessageUpdated.fromJSON(object.editedMessage)
        : undefined,
      deletedMessage: isSet(object.deletedMessage)
        ? StreamEvent_MessageDeleted.fromJSON(object.deletedMessage)
        : undefined,
      createdChannel: isSet(object.createdChannel)
        ? StreamEvent_ChannelCreated.fromJSON(object.createdChannel)
        : undefined,
      editedChannel: isSet(object.editedChannel)
        ? StreamEvent_ChannelUpdated.fromJSON(object.editedChannel)
        : undefined,
      deletedChannel: isSet(object.deletedChannel)
        ? StreamEvent_ChannelDeleted.fromJSON(object.deletedChannel)
        : undefined,
      editedGuild: isSet(object.editedGuild)
        ? StreamEvent_GuildUpdated.fromJSON(object.editedGuild)
        : undefined,
      deletedGuild: isSet(object.deletedGuild)
        ? StreamEvent_GuildDeleted.fromJSON(object.deletedGuild)
        : undefined,
      joinedMember: isSet(object.joinedMember)
        ? StreamEvent_MemberJoined.fromJSON(object.joinedMember)
        : undefined,
      leftMember: isSet(object.leftMember)
        ? StreamEvent_MemberLeft.fromJSON(object.leftMember)
        : undefined,
      typing: isSet(object.typing)
        ? StreamEvent_Typing.fromJSON(object.typing)
        : undefined,
      roleCreated: isSet(object.roleCreated)
        ? StreamEvent_RoleCreated.fromJSON(object.roleCreated)
        : undefined,
      roleDeleted: isSet(object.roleDeleted)
        ? StreamEvent_RoleDeleted.fromJSON(object.roleDeleted)
        : undefined,
      roleMoved: isSet(object.roleMoved)
        ? StreamEvent_RoleMoved.fromJSON(object.roleMoved)
        : undefined,
      roleUpdated: isSet(object.roleUpdated)
        ? StreamEvent_RoleUpdated.fromJSON(object.roleUpdated)
        : undefined,
      rolePermsUpdated: isSet(object.rolePermsUpdated)
        ? StreamEvent_RolePermissionsUpdated.fromJSON(object.rolePermsUpdated)
        : undefined,
      userRolesUpdated: isSet(object.userRolesUpdated)
        ? StreamEvent_UserRolesUpdated.fromJSON(object.userRolesUpdated)
        : undefined,
      permissionUpdated: isSet(object.permissionUpdated)
        ? StreamEvent_PermissionUpdated.fromJSON(object.permissionUpdated)
        : undefined,
      channelsReordered: isSet(object.channelsReordered)
        ? StreamEvent_ChannelsReordered.fromJSON(object.channelsReordered)
        : undefined,
      editedChannelPosition: isSet(object.editedChannelPosition)
        ? StreamEvent_ChannelPositionUpdated.fromJSON(
            object.editedChannelPosition
          )
        : undefined,
      messagePinned: isSet(object.messagePinned)
        ? StreamEvent_MessagePinned.fromJSON(object.messagePinned)
        : undefined,
      messageUnpinned: isSet(object.messageUnpinned)
        ? StreamEvent_MessageUnpinned.fromJSON(object.messageUnpinned)
        : undefined,
      reactionUpdated: isSet(object.reactionUpdated)
        ? StreamEvent_ReactionUpdated.fromJSON(object.reactionUpdated)
        : undefined,
      ownerAdded: isSet(object.ownerAdded)
        ? StreamEvent_OwnerAdded.fromJSON(object.ownerAdded)
        : undefined,
      ownerRemoved: isSet(object.ownerRemoved)
        ? StreamEvent_OwnerRemoved.fromJSON(object.ownerRemoved)
        : undefined,
      inviteReceived: isSet(object.inviteReceived)
        ? StreamEvent_InviteReceived.fromJSON(object.inviteReceived)
        : undefined,
      inviteRejected: isSet(object.inviteRejected)
        ? StreamEvent_InviteRejected.fromJSON(object.inviteRejected)
        : undefined,
      inviteCreated: isSet(object.inviteCreated)
        ? StreamEvent_InviteCreated.fromJSON(object.inviteCreated)
        : undefined,
      inviteDeleted: isSet(object.inviteDeleted)
        ? StreamEvent_InviteDeleted.fromJSON(object.inviteDeleted)
        : undefined,
      inviteUsed: isSet(object.inviteUsed)
        ? StreamEvent_InviteUsed.fromJSON(object.inviteUsed)
        : undefined,
    };
  },

  toJSON(message: StreamEvent): unknown {
    const obj: any = {};
    message.guildAddedToList !== undefined &&
      (obj.guildAddedToList = message.guildAddedToList
        ? StreamEvent_GuildAddedToList.toJSON(message.guildAddedToList)
        : undefined);
    message.guildRemovedFromList !== undefined &&
      (obj.guildRemovedFromList = message.guildRemovedFromList
        ? StreamEvent_GuildRemovedFromList.toJSON(message.guildRemovedFromList)
        : undefined);
    message.actionPerformed !== undefined &&
      (obj.actionPerformed = message.actionPerformed
        ? StreamEvent_ActionPerformed.toJSON(message.actionPerformed)
        : undefined);
    message.sentMessage !== undefined &&
      (obj.sentMessage = message.sentMessage
        ? StreamEvent_MessageSent.toJSON(message.sentMessage)
        : undefined);
    message.editedMessage !== undefined &&
      (obj.editedMessage = message.editedMessage
        ? StreamEvent_MessageUpdated.toJSON(message.editedMessage)
        : undefined);
    message.deletedMessage !== undefined &&
      (obj.deletedMessage = message.deletedMessage
        ? StreamEvent_MessageDeleted.toJSON(message.deletedMessage)
        : undefined);
    message.createdChannel !== undefined &&
      (obj.createdChannel = message.createdChannel
        ? StreamEvent_ChannelCreated.toJSON(message.createdChannel)
        : undefined);
    message.editedChannel !== undefined &&
      (obj.editedChannel = message.editedChannel
        ? StreamEvent_ChannelUpdated.toJSON(message.editedChannel)
        : undefined);
    message.deletedChannel !== undefined &&
      (obj.deletedChannel = message.deletedChannel
        ? StreamEvent_ChannelDeleted.toJSON(message.deletedChannel)
        : undefined);
    message.editedGuild !== undefined &&
      (obj.editedGuild = message.editedGuild
        ? StreamEvent_GuildUpdated.toJSON(message.editedGuild)
        : undefined);
    message.deletedGuild !== undefined &&
      (obj.deletedGuild = message.deletedGuild
        ? StreamEvent_GuildDeleted.toJSON(message.deletedGuild)
        : undefined);
    message.joinedMember !== undefined &&
      (obj.joinedMember = message.joinedMember
        ? StreamEvent_MemberJoined.toJSON(message.joinedMember)
        : undefined);
    message.leftMember !== undefined &&
      (obj.leftMember = message.leftMember
        ? StreamEvent_MemberLeft.toJSON(message.leftMember)
        : undefined);
    message.typing !== undefined &&
      (obj.typing = message.typing
        ? StreamEvent_Typing.toJSON(message.typing)
        : undefined);
    message.roleCreated !== undefined &&
      (obj.roleCreated = message.roleCreated
        ? StreamEvent_RoleCreated.toJSON(message.roleCreated)
        : undefined);
    message.roleDeleted !== undefined &&
      (obj.roleDeleted = message.roleDeleted
        ? StreamEvent_RoleDeleted.toJSON(message.roleDeleted)
        : undefined);
    message.roleMoved !== undefined &&
      (obj.roleMoved = message.roleMoved
        ? StreamEvent_RoleMoved.toJSON(message.roleMoved)
        : undefined);
    message.roleUpdated !== undefined &&
      (obj.roleUpdated = message.roleUpdated
        ? StreamEvent_RoleUpdated.toJSON(message.roleUpdated)
        : undefined);
    message.rolePermsUpdated !== undefined &&
      (obj.rolePermsUpdated = message.rolePermsUpdated
        ? StreamEvent_RolePermissionsUpdated.toJSON(message.rolePermsUpdated)
        : undefined);
    message.userRolesUpdated !== undefined &&
      (obj.userRolesUpdated = message.userRolesUpdated
        ? StreamEvent_UserRolesUpdated.toJSON(message.userRolesUpdated)
        : undefined);
    message.permissionUpdated !== undefined &&
      (obj.permissionUpdated = message.permissionUpdated
        ? StreamEvent_PermissionUpdated.toJSON(message.permissionUpdated)
        : undefined);
    message.channelsReordered !== undefined &&
      (obj.channelsReordered = message.channelsReordered
        ? StreamEvent_ChannelsReordered.toJSON(message.channelsReordered)
        : undefined);
    message.editedChannelPosition !== undefined &&
      (obj.editedChannelPosition = message.editedChannelPosition
        ? StreamEvent_ChannelPositionUpdated.toJSON(
            message.editedChannelPosition
          )
        : undefined);
    message.messagePinned !== undefined &&
      (obj.messagePinned = message.messagePinned
        ? StreamEvent_MessagePinned.toJSON(message.messagePinned)
        : undefined);
    message.messageUnpinned !== undefined &&
      (obj.messageUnpinned = message.messageUnpinned
        ? StreamEvent_MessageUnpinned.toJSON(message.messageUnpinned)
        : undefined);
    message.reactionUpdated !== undefined &&
      (obj.reactionUpdated = message.reactionUpdated
        ? StreamEvent_ReactionUpdated.toJSON(message.reactionUpdated)
        : undefined);
    message.ownerAdded !== undefined &&
      (obj.ownerAdded = message.ownerAdded
        ? StreamEvent_OwnerAdded.toJSON(message.ownerAdded)
        : undefined);
    message.ownerRemoved !== undefined &&
      (obj.ownerRemoved = message.ownerRemoved
        ? StreamEvent_OwnerRemoved.toJSON(message.ownerRemoved)
        : undefined);
    message.inviteReceived !== undefined &&
      (obj.inviteReceived = message.inviteReceived
        ? StreamEvent_InviteReceived.toJSON(message.inviteReceived)
        : undefined);
    message.inviteRejected !== undefined &&
      (obj.inviteRejected = message.inviteRejected
        ? StreamEvent_InviteRejected.toJSON(message.inviteRejected)
        : undefined);
    message.inviteCreated !== undefined &&
      (obj.inviteCreated = message.inviteCreated
        ? StreamEvent_InviteCreated.toJSON(message.inviteCreated)
        : undefined);
    message.inviteDeleted !== undefined &&
      (obj.inviteDeleted = message.inviteDeleted
        ? StreamEvent_InviteDeleted.toJSON(message.inviteDeleted)
        : undefined);
    message.inviteUsed !== undefined &&
      (obj.inviteUsed = message.inviteUsed
        ? StreamEvent_InviteUsed.toJSON(message.inviteUsed)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent>, I>>(
    object: I
  ): StreamEvent {
    const message = createBaseStreamEvent();
    message.guildAddedToList =
      object.guildAddedToList !== undefined && object.guildAddedToList !== null
        ? StreamEvent_GuildAddedToList.fromPartial(object.guildAddedToList)
        : undefined;
    message.guildRemovedFromList =
      object.guildRemovedFromList !== undefined &&
      object.guildRemovedFromList !== null
        ? StreamEvent_GuildRemovedFromList.fromPartial(
            object.guildRemovedFromList
          )
        : undefined;
    message.actionPerformed =
      object.actionPerformed !== undefined && object.actionPerformed !== null
        ? StreamEvent_ActionPerformed.fromPartial(object.actionPerformed)
        : undefined;
    message.sentMessage =
      object.sentMessage !== undefined && object.sentMessage !== null
        ? StreamEvent_MessageSent.fromPartial(object.sentMessage)
        : undefined;
    message.editedMessage =
      object.editedMessage !== undefined && object.editedMessage !== null
        ? StreamEvent_MessageUpdated.fromPartial(object.editedMessage)
        : undefined;
    message.deletedMessage =
      object.deletedMessage !== undefined && object.deletedMessage !== null
        ? StreamEvent_MessageDeleted.fromPartial(object.deletedMessage)
        : undefined;
    message.createdChannel =
      object.createdChannel !== undefined && object.createdChannel !== null
        ? StreamEvent_ChannelCreated.fromPartial(object.createdChannel)
        : undefined;
    message.editedChannel =
      object.editedChannel !== undefined && object.editedChannel !== null
        ? StreamEvent_ChannelUpdated.fromPartial(object.editedChannel)
        : undefined;
    message.deletedChannel =
      object.deletedChannel !== undefined && object.deletedChannel !== null
        ? StreamEvent_ChannelDeleted.fromPartial(object.deletedChannel)
        : undefined;
    message.editedGuild =
      object.editedGuild !== undefined && object.editedGuild !== null
        ? StreamEvent_GuildUpdated.fromPartial(object.editedGuild)
        : undefined;
    message.deletedGuild =
      object.deletedGuild !== undefined && object.deletedGuild !== null
        ? StreamEvent_GuildDeleted.fromPartial(object.deletedGuild)
        : undefined;
    message.joinedMember =
      object.joinedMember !== undefined && object.joinedMember !== null
        ? StreamEvent_MemberJoined.fromPartial(object.joinedMember)
        : undefined;
    message.leftMember =
      object.leftMember !== undefined && object.leftMember !== null
        ? StreamEvent_MemberLeft.fromPartial(object.leftMember)
        : undefined;
    message.typing =
      object.typing !== undefined && object.typing !== null
        ? StreamEvent_Typing.fromPartial(object.typing)
        : undefined;
    message.roleCreated =
      object.roleCreated !== undefined && object.roleCreated !== null
        ? StreamEvent_RoleCreated.fromPartial(object.roleCreated)
        : undefined;
    message.roleDeleted =
      object.roleDeleted !== undefined && object.roleDeleted !== null
        ? StreamEvent_RoleDeleted.fromPartial(object.roleDeleted)
        : undefined;
    message.roleMoved =
      object.roleMoved !== undefined && object.roleMoved !== null
        ? StreamEvent_RoleMoved.fromPartial(object.roleMoved)
        : undefined;
    message.roleUpdated =
      object.roleUpdated !== undefined && object.roleUpdated !== null
        ? StreamEvent_RoleUpdated.fromPartial(object.roleUpdated)
        : undefined;
    message.rolePermsUpdated =
      object.rolePermsUpdated !== undefined && object.rolePermsUpdated !== null
        ? StreamEvent_RolePermissionsUpdated.fromPartial(
            object.rolePermsUpdated
          )
        : undefined;
    message.userRolesUpdated =
      object.userRolesUpdated !== undefined && object.userRolesUpdated !== null
        ? StreamEvent_UserRolesUpdated.fromPartial(object.userRolesUpdated)
        : undefined;
    message.permissionUpdated =
      object.permissionUpdated !== undefined &&
      object.permissionUpdated !== null
        ? StreamEvent_PermissionUpdated.fromPartial(object.permissionUpdated)
        : undefined;
    message.channelsReordered =
      object.channelsReordered !== undefined &&
      object.channelsReordered !== null
        ? StreamEvent_ChannelsReordered.fromPartial(object.channelsReordered)
        : undefined;
    message.editedChannelPosition =
      object.editedChannelPosition !== undefined &&
      object.editedChannelPosition !== null
        ? StreamEvent_ChannelPositionUpdated.fromPartial(
            object.editedChannelPosition
          )
        : undefined;
    message.messagePinned =
      object.messagePinned !== undefined && object.messagePinned !== null
        ? StreamEvent_MessagePinned.fromPartial(object.messagePinned)
        : undefined;
    message.messageUnpinned =
      object.messageUnpinned !== undefined && object.messageUnpinned !== null
        ? StreamEvent_MessageUnpinned.fromPartial(object.messageUnpinned)
        : undefined;
    message.reactionUpdated =
      object.reactionUpdated !== undefined && object.reactionUpdated !== null
        ? StreamEvent_ReactionUpdated.fromPartial(object.reactionUpdated)
        : undefined;
    message.ownerAdded =
      object.ownerAdded !== undefined && object.ownerAdded !== null
        ? StreamEvent_OwnerAdded.fromPartial(object.ownerAdded)
        : undefined;
    message.ownerRemoved =
      object.ownerRemoved !== undefined && object.ownerRemoved !== null
        ? StreamEvent_OwnerRemoved.fromPartial(object.ownerRemoved)
        : undefined;
    message.inviteReceived =
      object.inviteReceived !== undefined && object.inviteReceived !== null
        ? StreamEvent_InviteReceived.fromPartial(object.inviteReceived)
        : undefined;
    message.inviteRejected =
      object.inviteRejected !== undefined && object.inviteRejected !== null
        ? StreamEvent_InviteRejected.fromPartial(object.inviteRejected)
        : undefined;
    message.inviteCreated =
      object.inviteCreated !== undefined && object.inviteCreated !== null
        ? StreamEvent_InviteCreated.fromPartial(object.inviteCreated)
        : undefined;
    message.inviteDeleted =
      object.inviteDeleted !== undefined && object.inviteDeleted !== null
        ? StreamEvent_InviteDeleted.fromPartial(object.inviteDeleted)
        : undefined;
    message.inviteUsed =
      object.inviteUsed !== undefined && object.inviteUsed !== null
        ? StreamEvent_InviteUsed.fromPartial(object.inviteUsed)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_MessageSent(): StreamEvent_MessageSent {
  return {
    echoId: undefined,
    guildId: 0,
    channelId: 0,
    messageId: 0,
    message: undefined,
  };
}

export const StreamEvent_MessageSent = {
  encode(
    message: StreamEvent_MessageSent,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.echoId !== undefined) {
      writer.uint32(8).uint64(message.echoId);
    }
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(24).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(32).uint64(message.messageId);
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_MessageSent {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessageSent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.echoId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.message = Message.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_MessageSent {
    return {
      echoId: isSet(object.echoId) ? Number(object.echoId) : undefined,
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      message: isSet(object.message)
        ? Message.fromJSON(object.message)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_MessageSent): unknown {
    const obj: any = {};
    message.echoId !== undefined && (obj.echoId = Math.round(message.echoId));
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.message !== undefined &&
      (obj.message = message.message
        ? Message.toJSON(message.message)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MessageSent>, I>>(
    object: I
  ): StreamEvent_MessageSent {
    const message = createBaseStreamEvent_MessageSent();
    message.echoId = object.echoId ?? undefined;
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_MessageUpdated(): StreamEvent_MessageUpdated {
  return {
    guildId: 0,
    channelId: 0,
    messageId: 0,
    editedAt: 0,
    newContent: undefined,
  };
}

export const StreamEvent_MessageUpdated = {
  encode(
    message: StreamEvent_MessageUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.editedAt !== 0) {
      writer.uint32(32).uint64(message.editedAt);
    }
    if (message.newContent !== undefined) {
      FormattedText.encode(
        message.newContent,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessageUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessageUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.editedAt = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.newContent = FormattedText.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_MessageUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      editedAt: isSet(object.editedAt) ? Number(object.editedAt) : 0,
      newContent: isSet(object.newContent)
        ? FormattedText.fromJSON(object.newContent)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_MessageUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.editedAt !== undefined &&
      (obj.editedAt = Math.round(message.editedAt));
    message.newContent !== undefined &&
      (obj.newContent = message.newContent
        ? FormattedText.toJSON(message.newContent)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MessageUpdated>, I>>(
    object: I
  ): StreamEvent_MessageUpdated {
    const message = createBaseStreamEvent_MessageUpdated();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    message.editedAt = object.editedAt ?? 0;
    message.newContent =
      object.newContent !== undefined && object.newContent !== null
        ? FormattedText.fromPartial(object.newContent)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_MessageDeleted(): StreamEvent_MessageDeleted {
  return { guildId: 0, channelId: 0, messageId: 0 };
}

export const StreamEvent_MessageDeleted = {
  encode(
    message: StreamEvent_MessageDeleted,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessageDeleted {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessageDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_MessageDeleted {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
    };
  },

  toJSON(message: StreamEvent_MessageDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MessageDeleted>, I>>(
    object: I
  ): StreamEvent_MessageDeleted {
    const message = createBaseStreamEvent_MessageDeleted();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_ChannelCreated(): StreamEvent_ChannelCreated {
  return {
    guildId: 0,
    channelId: 0,
    name: "",
    position: undefined,
    kind: 0,
    metadata: undefined,
  };
}

export const StreamEvent_ChannelCreated = {
  encode(
    message: StreamEvent_ChannelCreated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.position !== undefined) {
      ItemPosition.encode(message.position, writer.uint32(34).fork()).ldelim();
    }
    if (message.kind !== 0) {
      writer.uint32(40).int32(message.kind);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelCreated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.position = ItemPosition.decode(reader, reader.uint32());
          break;
        case 5:
          message.kind = reader.int32() as any;
          break;
        case 6:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_ChannelCreated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      position: isSet(object.position)
        ? ItemPosition.fromJSON(object.position)
        : undefined,
      kind: isSet(object.kind) ? channelKindFromJSON(object.kind) : 0,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ChannelCreated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.name !== undefined && (obj.name = message.name);
    message.position !== undefined &&
      (obj.position = message.position
        ? ItemPosition.toJSON(message.position)
        : undefined);
    message.kind !== undefined && (obj.kind = channelKindToJSON(message.kind));
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_ChannelCreated>, I>>(
    object: I
  ): StreamEvent_ChannelCreated {
    const message = createBaseStreamEvent_ChannelCreated();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.name = object.name ?? "";
    message.position =
      object.position !== undefined && object.position !== null
        ? ItemPosition.fromPartial(object.position)
        : undefined;
    message.kind = object.kind ?? 0;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_ChannelUpdated(): StreamEvent_ChannelUpdated {
  return {
    guildId: 0,
    channelId: 0,
    newName: undefined,
    newMetadata: undefined,
  };
}

export const StreamEvent_ChannelUpdated = {
  encode(
    message: StreamEvent_ChannelUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.newName !== undefined) {
      writer.uint32(26).string(message.newName);
    }
    if (message.newMetadata !== undefined) {
      Metadata.encode(message.newMetadata, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.newName = reader.string();
          break;
        case 4:
          message.newMetadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_ChannelUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      newName: isSet(object.newName) ? String(object.newName) : undefined,
      newMetadata: isSet(object.newMetadata)
        ? Metadata.fromJSON(object.newMetadata)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ChannelUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.newName !== undefined && (obj.newName = message.newName);
    message.newMetadata !== undefined &&
      (obj.newMetadata = message.newMetadata
        ? Metadata.toJSON(message.newMetadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_ChannelUpdated>, I>>(
    object: I
  ): StreamEvent_ChannelUpdated {
    const message = createBaseStreamEvent_ChannelUpdated();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.newName = object.newName ?? undefined;
    message.newMetadata =
      object.newMetadata !== undefined && object.newMetadata !== null
        ? Metadata.fromPartial(object.newMetadata)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_ChannelPositionUpdated(): StreamEvent_ChannelPositionUpdated {
  return { guildId: 0, channelId: 0, newPosition: undefined };
}

export const StreamEvent_ChannelPositionUpdated = {
  encode(
    message: StreamEvent_ChannelPositionUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.newPosition !== undefined) {
      ItemPosition.encode(
        message.newPosition,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelPositionUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelPositionUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.newPosition = ItemPosition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_ChannelPositionUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      newPosition: isSet(object.newPosition)
        ? ItemPosition.fromJSON(object.newPosition)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ChannelPositionUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.newPosition !== undefined &&
      (obj.newPosition = message.newPosition
        ? ItemPosition.toJSON(message.newPosition)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamEvent_ChannelPositionUpdated>, I>
  >(object: I): StreamEvent_ChannelPositionUpdated {
    const message = createBaseStreamEvent_ChannelPositionUpdated();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.newPosition =
      object.newPosition !== undefined && object.newPosition !== null
        ? ItemPosition.fromPartial(object.newPosition)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_ChannelsReordered(): StreamEvent_ChannelsReordered {
  return { guildId: 0, channelIds: [] };
}

export const StreamEvent_ChannelsReordered = {
  encode(
    message: StreamEvent_ChannelsReordered,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    writer.uint32(10).fork();
    for (const v of message.channelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelsReordered {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelsReordered();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.channelIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.channelIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_ChannelsReordered {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelIds: Array.isArray(object?.channelIds)
        ? object.channelIds.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: StreamEvent_ChannelsReordered): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    if (message.channelIds) {
      obj.channelIds = message.channelIds.map((e) => Math.round(e));
    } else {
      obj.channelIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_ChannelsReordered>, I>>(
    object: I
  ): StreamEvent_ChannelsReordered {
    const message = createBaseStreamEvent_ChannelsReordered();
    message.guildId = object.guildId ?? 0;
    message.channelIds = object.channelIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseStreamEvent_ChannelDeleted(): StreamEvent_ChannelDeleted {
  return { guildId: 0, channelId: 0 };
}

export const StreamEvent_ChannelDeleted = {
  encode(
    message: StreamEvent_ChannelDeleted,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelDeleted {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_ChannelDeleted {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
    };
  },

  toJSON(message: StreamEvent_ChannelDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_ChannelDeleted>, I>>(
    object: I
  ): StreamEvent_ChannelDeleted {
    const message = createBaseStreamEvent_ChannelDeleted();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_GuildUpdated(): StreamEvent_GuildUpdated {
  return {
    guildId: 0,
    newName: undefined,
    newPicture: undefined,
    newMetadata: undefined,
  };
}

export const StreamEvent_GuildUpdated = {
  encode(
    message: StreamEvent_GuildUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.newName !== undefined) {
      writer.uint32(18).string(message.newName);
    }
    if (message.newPicture !== undefined) {
      writer.uint32(26).string(message.newPicture);
    }
    if (message.newMetadata !== undefined) {
      Metadata.encode(message.newMetadata, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_GuildUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_GuildUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.newName = reader.string();
          break;
        case 3:
          message.newPicture = reader.string();
          break;
        case 4:
          message.newMetadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_GuildUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      newName: isSet(object.newName) ? String(object.newName) : undefined,
      newPicture: isSet(object.newPicture)
        ? String(object.newPicture)
        : undefined,
      newMetadata: isSet(object.newMetadata)
        ? Metadata.fromJSON(object.newMetadata)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_GuildUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.newName !== undefined && (obj.newName = message.newName);
    message.newPicture !== undefined && (obj.newPicture = message.newPicture);
    message.newMetadata !== undefined &&
      (obj.newMetadata = message.newMetadata
        ? Metadata.toJSON(message.newMetadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_GuildUpdated>, I>>(
    object: I
  ): StreamEvent_GuildUpdated {
    const message = createBaseStreamEvent_GuildUpdated();
    message.guildId = object.guildId ?? 0;
    message.newName = object.newName ?? undefined;
    message.newPicture = object.newPicture ?? undefined;
    message.newMetadata =
      object.newMetadata !== undefined && object.newMetadata !== null
        ? Metadata.fromPartial(object.newMetadata)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_GuildDeleted(): StreamEvent_GuildDeleted {
  return { guildId: 0 };
}

export const StreamEvent_GuildDeleted = {
  encode(
    message: StreamEvent_GuildDeleted,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_GuildDeleted {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_GuildDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_GuildDeleted {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: StreamEvent_GuildDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_GuildDeleted>, I>>(
    object: I
  ): StreamEvent_GuildDeleted {
    const message = createBaseStreamEvent_GuildDeleted();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_MemberJoined(): StreamEvent_MemberJoined {
  return { memberId: 0, guildId: 0 };
}

export const StreamEvent_MemberJoined = {
  encode(
    message: StreamEvent_MemberJoined,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.memberId !== 0) {
      writer.uint32(8).uint64(message.memberId);
    }
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_MemberJoined {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MemberJoined();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.memberId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_MemberJoined {
    return {
      memberId: isSet(object.memberId) ? Number(object.memberId) : 0,
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: StreamEvent_MemberJoined): unknown {
    const obj: any = {};
    message.memberId !== undefined &&
      (obj.memberId = Math.round(message.memberId));
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MemberJoined>, I>>(
    object: I
  ): StreamEvent_MemberJoined {
    const message = createBaseStreamEvent_MemberJoined();
    message.memberId = object.memberId ?? 0;
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_MemberLeft(): StreamEvent_MemberLeft {
  return { memberId: 0, guildId: 0, leaveReason: 0 };
}

export const StreamEvent_MemberLeft = {
  encode(
    message: StreamEvent_MemberLeft,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.memberId !== 0) {
      writer.uint32(8).uint64(message.memberId);
    }
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.leaveReason !== 0) {
      writer.uint32(24).int32(message.leaveReason);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_MemberLeft {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MemberLeft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.memberId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.leaveReason = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_MemberLeft {
    return {
      memberId: isSet(object.memberId) ? Number(object.memberId) : 0,
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      leaveReason: isSet(object.leaveReason)
        ? leaveReasonFromJSON(object.leaveReason)
        : 0,
    };
  },

  toJSON(message: StreamEvent_MemberLeft): unknown {
    const obj: any = {};
    message.memberId !== undefined &&
      (obj.memberId = Math.round(message.memberId));
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.leaveReason !== undefined &&
      (obj.leaveReason = leaveReasonToJSON(message.leaveReason));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MemberLeft>, I>>(
    object: I
  ): StreamEvent_MemberLeft {
    const message = createBaseStreamEvent_MemberLeft();
    message.memberId = object.memberId ?? 0;
    message.guildId = object.guildId ?? 0;
    message.leaveReason = object.leaveReason ?? 0;
    return message;
  },
};

function createBaseStreamEvent_GuildAddedToList(): StreamEvent_GuildAddedToList {
  return { guildId: 0, homeserver: "" };
}

export const StreamEvent_GuildAddedToList = {
  encode(
    message: StreamEvent_GuildAddedToList,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.homeserver !== "") {
      writer.uint32(18).string(message.homeserver);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_GuildAddedToList {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_GuildAddedToList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.homeserver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_GuildAddedToList {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      homeserver: isSet(object.homeserver) ? String(object.homeserver) : "",
    };
  },

  toJSON(message: StreamEvent_GuildAddedToList): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.homeserver !== undefined && (obj.homeserver = message.homeserver);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_GuildAddedToList>, I>>(
    object: I
  ): StreamEvent_GuildAddedToList {
    const message = createBaseStreamEvent_GuildAddedToList();
    message.guildId = object.guildId ?? 0;
    message.homeserver = object.homeserver ?? "";
    return message;
  },
};

function createBaseStreamEvent_GuildRemovedFromList(): StreamEvent_GuildRemovedFromList {
  return { guildId: 0, homeserver: "" };
}

export const StreamEvent_GuildRemovedFromList = {
  encode(
    message: StreamEvent_GuildRemovedFromList,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.homeserver !== "") {
      writer.uint32(18).string(message.homeserver);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_GuildRemovedFromList {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_GuildRemovedFromList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.homeserver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_GuildRemovedFromList {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      homeserver: isSet(object.homeserver) ? String(object.homeserver) : "",
    };
  },

  toJSON(message: StreamEvent_GuildRemovedFromList): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.homeserver !== undefined && (obj.homeserver = message.homeserver);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamEvent_GuildRemovedFromList>, I>
  >(object: I): StreamEvent_GuildRemovedFromList {
    const message = createBaseStreamEvent_GuildRemovedFromList();
    message.guildId = object.guildId ?? 0;
    message.homeserver = object.homeserver ?? "";
    return message;
  },
};

function createBaseStreamEvent_ActionPerformed(): StreamEvent_ActionPerformed {
  return {
    guildId: 0,
    channelId: 0,
    messageId: 0,
    userId: 0,
    payload: undefined,
  };
}

export const StreamEvent_ActionPerformed = {
  encode(
    message: StreamEvent_ActionPerformed,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.userId !== 0) {
      writer.uint32(32).uint64(message.userId);
    }
    if (message.payload !== undefined) {
      ActionPayload.encode(message.payload, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_ActionPerformed {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ActionPerformed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.payload = ActionPayload.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_ActionPerformed {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      payload: isSet(object.payload)
        ? ActionPayload.fromJSON(object.payload)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ActionPerformed): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.payload !== undefined &&
      (obj.payload = message.payload
        ? ActionPayload.toJSON(message.payload)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_ActionPerformed>, I>>(
    object: I
  ): StreamEvent_ActionPerformed {
    const message = createBaseStreamEvent_ActionPerformed();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    message.userId = object.userId ?? 0;
    message.payload =
      object.payload !== undefined && object.payload !== null
        ? ActionPayload.fromPartial(object.payload)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_RoleMoved(): StreamEvent_RoleMoved {
  return { guildId: 0, roleId: 0, newPosition: undefined };
}

export const StreamEvent_RoleMoved = {
  encode(
    message: StreamEvent_RoleMoved,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== 0) {
      writer.uint32(16).uint64(message.roleId);
    }
    if (message.newPosition !== undefined) {
      ItemPosition.encode(
        message.newPosition,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_RoleMoved {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RoleMoved();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.newPosition = ItemPosition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_RoleMoved {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      roleId: isSet(object.roleId) ? Number(object.roleId) : 0,
      newPosition: isSet(object.newPosition)
        ? ItemPosition.fromJSON(object.newPosition)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_RoleMoved): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.roleId !== undefined && (obj.roleId = Math.round(message.roleId));
    message.newPosition !== undefined &&
      (obj.newPosition = message.newPosition
        ? ItemPosition.toJSON(message.newPosition)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_RoleMoved>, I>>(
    object: I
  ): StreamEvent_RoleMoved {
    const message = createBaseStreamEvent_RoleMoved();
    message.guildId = object.guildId ?? 0;
    message.roleId = object.roleId ?? 0;
    message.newPosition =
      object.newPosition !== undefined && object.newPosition !== null
        ? ItemPosition.fromPartial(object.newPosition)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_RoleDeleted(): StreamEvent_RoleDeleted {
  return { guildId: 0, roleId: 0 };
}

export const StreamEvent_RoleDeleted = {
  encode(
    message: StreamEvent_RoleDeleted,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== 0) {
      writer.uint32(16).uint64(message.roleId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_RoleDeleted {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RoleDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_RoleDeleted {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      roleId: isSet(object.roleId) ? Number(object.roleId) : 0,
    };
  },

  toJSON(message: StreamEvent_RoleDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.roleId !== undefined && (obj.roleId = Math.round(message.roleId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_RoleDeleted>, I>>(
    object: I
  ): StreamEvent_RoleDeleted {
    const message = createBaseStreamEvent_RoleDeleted();
    message.guildId = object.guildId ?? 0;
    message.roleId = object.roleId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_RoleCreated(): StreamEvent_RoleCreated {
  return {
    guildId: 0,
    roleId: 0,
    name: "",
    color: 0,
    hoist: false,
    pingable: false,
  };
}

export const StreamEvent_RoleCreated = {
  encode(
    message: StreamEvent_RoleCreated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== 0) {
      writer.uint32(16).uint64(message.roleId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.color !== 0) {
      writer.uint32(32).int32(message.color);
    }
    if (message.hoist === true) {
      writer.uint32(40).bool(message.hoist);
    }
    if (message.pingable === true) {
      writer.uint32(48).bool(message.pingable);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_RoleCreated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RoleCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.color = reader.int32();
          break;
        case 5:
          message.hoist = reader.bool();
          break;
        case 6:
          message.pingable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_RoleCreated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      roleId: isSet(object.roleId) ? Number(object.roleId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      color: isSet(object.color) ? Number(object.color) : 0,
      hoist: isSet(object.hoist) ? Boolean(object.hoist) : false,
      pingable: isSet(object.pingable) ? Boolean(object.pingable) : false,
    };
  },

  toJSON(message: StreamEvent_RoleCreated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.roleId !== undefined && (obj.roleId = Math.round(message.roleId));
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = Math.round(message.color));
    message.hoist !== undefined && (obj.hoist = message.hoist);
    message.pingable !== undefined && (obj.pingable = message.pingable);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_RoleCreated>, I>>(
    object: I
  ): StreamEvent_RoleCreated {
    const message = createBaseStreamEvent_RoleCreated();
    message.guildId = object.guildId ?? 0;
    message.roleId = object.roleId ?? 0;
    message.name = object.name ?? "";
    message.color = object.color ?? 0;
    message.hoist = object.hoist ?? false;
    message.pingable = object.pingable ?? false;
    return message;
  },
};

function createBaseStreamEvent_RoleUpdated(): StreamEvent_RoleUpdated {
  return {
    guildId: 0,
    roleId: 0,
    newName: undefined,
    newColor: undefined,
    newHoist: undefined,
    newPingable: undefined,
  };
}

export const StreamEvent_RoleUpdated = {
  encode(
    message: StreamEvent_RoleUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== 0) {
      writer.uint32(16).uint64(message.roleId);
    }
    if (message.newName !== undefined) {
      writer.uint32(26).string(message.newName);
    }
    if (message.newColor !== undefined) {
      writer.uint32(32).int32(message.newColor);
    }
    if (message.newHoist !== undefined) {
      writer.uint32(40).bool(message.newHoist);
    }
    if (message.newPingable !== undefined) {
      writer.uint32(48).bool(message.newPingable);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_RoleUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RoleUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.newName = reader.string();
          break;
        case 4:
          message.newColor = reader.int32();
          break;
        case 5:
          message.newHoist = reader.bool();
          break;
        case 6:
          message.newPingable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_RoleUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      roleId: isSet(object.roleId) ? Number(object.roleId) : 0,
      newName: isSet(object.newName) ? String(object.newName) : undefined,
      newColor: isSet(object.newColor) ? Number(object.newColor) : undefined,
      newHoist: isSet(object.newHoist) ? Boolean(object.newHoist) : undefined,
      newPingable: isSet(object.newPingable)
        ? Boolean(object.newPingable)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_RoleUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.roleId !== undefined && (obj.roleId = Math.round(message.roleId));
    message.newName !== undefined && (obj.newName = message.newName);
    message.newColor !== undefined &&
      (obj.newColor = Math.round(message.newColor));
    message.newHoist !== undefined && (obj.newHoist = message.newHoist);
    message.newPingable !== undefined &&
      (obj.newPingable = message.newPingable);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_RoleUpdated>, I>>(
    object: I
  ): StreamEvent_RoleUpdated {
    const message = createBaseStreamEvent_RoleUpdated();
    message.guildId = object.guildId ?? 0;
    message.roleId = object.roleId ?? 0;
    message.newName = object.newName ?? undefined;
    message.newColor = object.newColor ?? undefined;
    message.newHoist = object.newHoist ?? undefined;
    message.newPingable = object.newPingable ?? undefined;
    return message;
  },
};

function createBaseStreamEvent_RolePermissionsUpdated(): StreamEvent_RolePermissionsUpdated {
  return { guildId: 0, channelId: undefined, roleId: 0, newPerms: [] };
}

export const StreamEvent_RolePermissionsUpdated = {
  encode(
    message: StreamEvent_RolePermissionsUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== undefined) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.roleId !== 0) {
      writer.uint32(24).uint64(message.roleId);
    }
    for (const v of message.newPerms) {
      Permission.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_RolePermissionsUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RolePermissionsUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.roleId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.newPerms.push(Permission.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_RolePermissionsUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : undefined,
      roleId: isSet(object.roleId) ? Number(object.roleId) : 0,
      newPerms: Array.isArray(object?.newPerms)
        ? object.newPerms.map((e: any) => Permission.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StreamEvent_RolePermissionsUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.roleId !== undefined && (obj.roleId = Math.round(message.roleId));
    if (message.newPerms) {
      obj.newPerms = message.newPerms.map((e) =>
        e ? Permission.toJSON(e) : undefined
      );
    } else {
      obj.newPerms = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamEvent_RolePermissionsUpdated>, I>
  >(object: I): StreamEvent_RolePermissionsUpdated {
    const message = createBaseStreamEvent_RolePermissionsUpdated();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? undefined;
    message.roleId = object.roleId ?? 0;
    message.newPerms =
      object.newPerms?.map((e) => Permission.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStreamEvent_UserRolesUpdated(): StreamEvent_UserRolesUpdated {
  return { guildId: 0, userId: 0, newRoleIds: [] };
}

export const StreamEvent_UserRolesUpdated = {
  encode(
    message: StreamEvent_UserRolesUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.userId !== 0) {
      writer.uint32(16).uint64(message.userId);
    }
    writer.uint32(26).fork();
    for (const v of message.newRoleIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_UserRolesUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_UserRolesUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.newRoleIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.newRoleIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_UserRolesUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      newRoleIds: Array.isArray(object?.newRoleIds)
        ? object.newRoleIds.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: StreamEvent_UserRolesUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    if (message.newRoleIds) {
      obj.newRoleIds = message.newRoleIds.map((e) => Math.round(e));
    } else {
      obj.newRoleIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_UserRolesUpdated>, I>>(
    object: I
  ): StreamEvent_UserRolesUpdated {
    const message = createBaseStreamEvent_UserRolesUpdated();
    message.guildId = object.guildId ?? 0;
    message.userId = object.userId ?? 0;
    message.newRoleIds = object.newRoleIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseStreamEvent_Typing(): StreamEvent_Typing {
  return { userId: 0, guildId: 0, channelId: 0 };
}

export const StreamEvent_Typing = {
  encode(
    message: StreamEvent_Typing,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(24).uint64(message.channelId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_Typing {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_Typing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_Typing {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
    };
  },

  toJSON(message: StreamEvent_Typing): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_Typing>, I>>(
    object: I
  ): StreamEvent_Typing {
    const message = createBaseStreamEvent_Typing();
    message.userId = object.userId ?? 0;
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_PermissionUpdated(): StreamEvent_PermissionUpdated {
  return { guildId: 0, channelId: undefined, query: "", ok: false };
}

export const StreamEvent_PermissionUpdated = {
  encode(
    message: StreamEvent_PermissionUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== undefined) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.query !== "") {
      writer.uint32(26).string(message.query);
    }
    if (message.ok === true) {
      writer.uint32(32).bool(message.ok);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_PermissionUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_PermissionUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.query = reader.string();
          break;
        case 4:
          message.ok = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_PermissionUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : undefined,
      query: isSet(object.query) ? String(object.query) : "",
      ok: isSet(object.ok) ? Boolean(object.ok) : false,
    };
  },

  toJSON(message: StreamEvent_PermissionUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.query !== undefined && (obj.query = message.query);
    message.ok !== undefined && (obj.ok = message.ok);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_PermissionUpdated>, I>>(
    object: I
  ): StreamEvent_PermissionUpdated {
    const message = createBaseStreamEvent_PermissionUpdated();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? undefined;
    message.query = object.query ?? "";
    message.ok = object.ok ?? false;
    return message;
  },
};

function createBaseStreamEvent_MessagePinned(): StreamEvent_MessagePinned {
  return { guildId: 0, channelId: 0, messageId: 0 };
}

export const StreamEvent_MessagePinned = {
  encode(
    message: StreamEvent_MessagePinned,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessagePinned {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessagePinned();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_MessagePinned {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
    };
  },

  toJSON(message: StreamEvent_MessagePinned): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MessagePinned>, I>>(
    object: I
  ): StreamEvent_MessagePinned {
    const message = createBaseStreamEvent_MessagePinned();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_MessageUnpinned(): StreamEvent_MessageUnpinned {
  return { guildId: 0, channelId: 0, messageId: 0 };
}

export const StreamEvent_MessageUnpinned = {
  encode(
    message: StreamEvent_MessageUnpinned,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessageUnpinned {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessageUnpinned();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_MessageUnpinned {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
    };
  },

  toJSON(message: StreamEvent_MessageUnpinned): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MessageUnpinned>, I>>(
    object: I
  ): StreamEvent_MessageUnpinned {
    const message = createBaseStreamEvent_MessageUnpinned();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_ReactionUpdated(): StreamEvent_ReactionUpdated {
  return { guildId: 0, channelId: 0, messageId: 0, reaction: undefined };
}

export const StreamEvent_ReactionUpdated = {
  encode(
    message: StreamEvent_ReactionUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.reaction !== undefined) {
      Reaction.encode(message.reaction, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_ReactionUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ReactionUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.reaction = Reaction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_ReactionUpdated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      reaction: isSet(object.reaction)
        ? Reaction.fromJSON(object.reaction)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ReactionUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.reaction !== undefined &&
      (obj.reaction = message.reaction
        ? Reaction.toJSON(message.reaction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_ReactionUpdated>, I>>(
    object: I
  ): StreamEvent_ReactionUpdated {
    const message = createBaseStreamEvent_ReactionUpdated();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    message.reaction =
      object.reaction !== undefined && object.reaction !== null
        ? Reaction.fromPartial(object.reaction)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_OwnerAdded(): StreamEvent_OwnerAdded {
  return { guildId: 0, userId: 0 };
}

export const StreamEvent_OwnerAdded = {
  encode(
    message: StreamEvent_OwnerAdded,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_OwnerAdded {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_OwnerAdded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_OwnerAdded {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: StreamEvent_OwnerAdded): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_OwnerAdded>, I>>(
    object: I
  ): StreamEvent_OwnerAdded {
    const message = createBaseStreamEvent_OwnerAdded();
    message.guildId = object.guildId ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_OwnerRemoved(): StreamEvent_OwnerRemoved {
  return { guildId: 0, userId: 0 };
}

export const StreamEvent_OwnerRemoved = {
  encode(
    message: StreamEvent_OwnerRemoved,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_OwnerRemoved {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_OwnerRemoved();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_OwnerRemoved {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: StreamEvent_OwnerRemoved): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_OwnerRemoved>, I>>(
    object: I
  ): StreamEvent_OwnerRemoved {
    const message = createBaseStreamEvent_OwnerRemoved();
    message.guildId = object.guildId ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_InviteReceived(): StreamEvent_InviteReceived {
  return { inviteId: "", serverId: undefined, inviterId: 0 };
}

export const StreamEvent_InviteReceived = {
  encode(
    message: StreamEvent_InviteReceived,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    if (message.serverId !== undefined) {
      writer.uint32(18).string(message.serverId);
    }
    if (message.inviterId !== 0) {
      writer.uint32(24).uint64(message.inviterId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteReceived {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteReceived();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteId = reader.string();
          break;
        case 2:
          message.serverId = reader.string();
          break;
        case 3:
          message.inviterId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_InviteReceived {
    return {
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      serverId: isSet(object.serverId) ? String(object.serverId) : undefined,
      inviterId: isSet(object.inviterId) ? Number(object.inviterId) : 0,
    };
  },

  toJSON(message: StreamEvent_InviteReceived): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.serverId !== undefined && (obj.serverId = message.serverId);
    message.inviterId !== undefined &&
      (obj.inviterId = Math.round(message.inviterId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteReceived>, I>>(
    object: I
  ): StreamEvent_InviteReceived {
    const message = createBaseStreamEvent_InviteReceived();
    message.inviteId = object.inviteId ?? "";
    message.serverId = object.serverId ?? undefined;
    message.inviterId = object.inviterId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_InviteRejected(): StreamEvent_InviteRejected {
  return { guildId: 0, inviteId: "", userId: 0 };
}

export const StreamEvent_InviteRejected = {
  encode(
    message: StreamEvent_InviteRejected,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteId !== "") {
      writer.uint32(18).string(message.inviteId);
    }
    if (message.userId !== 0) {
      writer.uint32(24).uint64(message.userId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteRejected {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteRejected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.inviteId = reader.string();
          break;
        case 3:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_InviteRejected {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: StreamEvent_InviteRejected): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteRejected>, I>>(
    object: I
  ): StreamEvent_InviteRejected {
    const message = createBaseStreamEvent_InviteRejected();
    message.guildId = object.guildId ?? 0;
    message.inviteId = object.inviteId ?? "";
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseStreamEvent_InviteCreated(): StreamEvent_InviteCreated {
  return { guildId: 0, inviteId: "", possibleUses: 0 };
}

export const StreamEvent_InviteCreated = {
  encode(
    message: StreamEvent_InviteCreated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteId !== "") {
      writer.uint32(18).string(message.inviteId);
    }
    if (message.possibleUses !== 0) {
      writer.uint32(24).uint32(message.possibleUses);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteCreated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.inviteId = reader.string();
          break;
        case 3:
          message.possibleUses = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_InviteCreated {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      possibleUses: isSet(object.possibleUses)
        ? Number(object.possibleUses)
        : 0,
    };
  },

  toJSON(message: StreamEvent_InviteCreated): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.possibleUses !== undefined &&
      (obj.possibleUses = Math.round(message.possibleUses));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteCreated>, I>>(
    object: I
  ): StreamEvent_InviteCreated {
    const message = createBaseStreamEvent_InviteCreated();
    message.guildId = object.guildId ?? 0;
    message.inviteId = object.inviteId ?? "";
    message.possibleUses = object.possibleUses ?? 0;
    return message;
  },
};

function createBaseStreamEvent_InviteDeleted(): StreamEvent_InviteDeleted {
  return { guildId: 0, inviteId: "" };
}

export const StreamEvent_InviteDeleted = {
  encode(
    message: StreamEvent_InviteDeleted,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteId !== "") {
      writer.uint32(18).string(message.inviteId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteDeleted {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.inviteId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_InviteDeleted {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
    };
  },

  toJSON(message: StreamEvent_InviteDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteDeleted>, I>>(
    object: I
  ): StreamEvent_InviteDeleted {
    const message = createBaseStreamEvent_InviteDeleted();
    message.guildId = object.guildId ?? 0;
    message.inviteId = object.inviteId ?? "";
    return message;
  },
};

function createBaseStreamEvent_InviteUsed(): StreamEvent_InviteUsed {
  return { guildId: 0, inviteId: "", userId: 0 };
}

export const StreamEvent_InviteUsed = {
  encode(
    message: StreamEvent_InviteUsed,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteId !== "") {
      writer.uint32(18).string(message.inviteId);
    }
    if (message.userId !== 0) {
      writer.uint32(24).uint64(message.userId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamEvent_InviteUsed {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteUsed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.inviteId = reader.string();
          break;
        case 3:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamEvent_InviteUsed {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: StreamEvent_InviteUsed): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteUsed>, I>>(
    object: I
  ): StreamEvent_InviteUsed {
    const message = createBaseStreamEvent_InviteUsed();
    message.guildId = object.guildId ?? 0;
    message.inviteId = object.inviteId ?? "";
    message.userId = object.userId ?? 0;
    return message;
  },
};

export interface DataLoaderOptions {
  cache?: boolean;
}

export interface DataLoaders {
  rpcDataLoaderOptions?: DataLoaderOptions;
  getDataLoader<T>(identifier: string, constructorFn: () => T): T;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
