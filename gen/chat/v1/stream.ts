/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  Message,
  FormattedText,
  ActionPayload,
  Reaction,
} from "../../chat/v1/messages";
import { ItemPosition, Metadata } from "../../harmonytypes/v1/types";
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
import { Permission } from "../../chat/v1/permissions";
import { StreamEvent as StreamEvent1 } from "../../emote/v1/stream";
import { StreamEvent as StreamEvent2 } from "../../profile/v1/stream";

export const protobufPackage = "protocol.chat.v1";

/**
 * Request type for use in the `StreamEvents` endpoint.
 * By default, this endpoint will subscribe to all events.
 * Any guilds joined in the future will be added to the subscription as well.
 * Use the UnsubscribeFromAll event for unsubscribing from all current subscriptions and disable the automatic guild subscriptions
 */
export interface StreamEventsRequest {
  request?:
    | {
        $case: "subscribeToGuild";
        subscribeToGuild: StreamEventsRequest_SubscribeToGuild;
      }
    | {
        $case: "subscribeToActions";
        subscribeToActions: StreamEventsRequest_SubscribeToActions;
      }
    | {
        $case: "subscribeToHomeserverEvents";
        subscribeToHomeserverEvents: StreamEventsRequest_SubscribeToHomeserverEvents;
      }
    | {
        $case: "unsubscribeFromAll";
        unsubscribeFromAll: StreamEventsRequest_UnsubscribeFromAll;
      };
}

/** Event source for guilds' events. */
export interface StreamEventsRequest_SubscribeToGuild {
  /** the guild id to subscribe to */
  guildId: string;
}

/** Event source for actions' events. */
export interface StreamEventsRequest_SubscribeToActions {}

/** Event source for homeserver events. */
export interface StreamEventsRequest_SubscribeToHomeserverEvents {}

/** Event to unsubscribe from all events. */
export interface StreamEventsRequest_UnsubscribeFromAll {}

/** Used in the `StreamEvents` endpoint. */
export interface StreamEventsResponse {
  event?:
    | { $case: "chat"; chat: StreamEvent }
    | { $case: "emote"; emote: StreamEvent1 }
    | { $case: "profile"; profile: StreamEvent2 };
}

/** Describes an event. */
export interface StreamEvent {
  event?:
    | {
        $case: "guildAddedToList";
        guildAddedToList: StreamEvent_GuildAddedToList;
      }
    | {
        $case: "guildRemovedFromList";
        guildRemovedFromList: StreamEvent_GuildRemovedFromList;
      }
    | { $case: "actionPerformed"; actionPerformed: StreamEvent_ActionPerformed }
    | { $case: "sentMessage"; sentMessage: StreamEvent_MessageSent }
    | { $case: "editedMessage"; editedMessage: StreamEvent_MessageUpdated }
    | { $case: "deletedMessage"; deletedMessage: StreamEvent_MessageDeleted }
    | { $case: "createdChannel"; createdChannel: StreamEvent_ChannelCreated }
    | { $case: "editedChannel"; editedChannel: StreamEvent_ChannelUpdated }
    | { $case: "deletedChannel"; deletedChannel: StreamEvent_ChannelDeleted }
    | { $case: "editedGuild"; editedGuild: StreamEvent_GuildUpdated }
    | { $case: "deletedGuild"; deletedGuild: StreamEvent_GuildDeleted }
    | { $case: "joinedMember"; joinedMember: StreamEvent_MemberJoined }
    | { $case: "leftMember"; leftMember: StreamEvent_MemberLeft }
    | { $case: "typing"; typing: StreamEvent_Typing }
    | { $case: "roleCreated"; roleCreated: StreamEvent_RoleCreated }
    | { $case: "roleDeleted"; roleDeleted: StreamEvent_RoleDeleted }
    | { $case: "roleMoved"; roleMoved: StreamEvent_RoleMoved }
    | { $case: "roleUpdated"; roleUpdated: StreamEvent_RoleUpdated }
    | {
        $case: "rolePermsUpdated";
        rolePermsUpdated: StreamEvent_RolePermissionsUpdated;
      }
    | {
        $case: "userRolesUpdated";
        userRolesUpdated: StreamEvent_UserRolesUpdated;
      }
    | {
        $case: "permissionUpdated";
        permissionUpdated: StreamEvent_PermissionUpdated;
      }
    | {
        $case: "channelsReordered";
        channelsReordered: StreamEvent_ChannelsReordered;
      }
    | {
        $case: "editedChannelPosition";
        editedChannelPosition: StreamEvent_ChannelPositionUpdated;
      }
    | { $case: "messagePinned"; messagePinned: StreamEvent_MessagePinned }
    | { $case: "messageUnpinned"; messageUnpinned: StreamEvent_MessageUnpinned }
    | { $case: "reactionUpdated"; reactionUpdated: StreamEvent_ReactionUpdated }
    | { $case: "ownerAdded"; ownerAdded: StreamEvent_OwnerAdded }
    | { $case: "ownerRemoved"; ownerRemoved: StreamEvent_OwnerRemoved }
    | { $case: "inviteReceived"; inviteReceived: StreamEvent_InviteReceived }
    | { $case: "inviteRejected"; inviteRejected: StreamEvent_InviteRejected }
    | { $case: "inviteCreated"; inviteCreated: StreamEvent_InviteCreated }
    | { $case: "inviteDeleted"; inviteDeleted: StreamEvent_InviteDeleted }
    | { $case: "inviteUsed"; inviteUsed: StreamEvent_InviteUsed };
}

/**
 * Event sent when a new message is sent.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel the message was sent in.
 */
export interface StreamEvent_MessageSent {
  /** ID that is sent by your client it can use to confirm that the message is sent. */
  echoId?: string | undefined;
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Channel ID of the channel where this event happened. */
  channelId: string;
  /** Message ID of the message that was updated. */
  messageId: string;
  /** The actual message. */
  message?: Message;
}

/**
 * Event sent when a message's text content is updated.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel the message was updated in.
 */
export interface StreamEvent_MessageUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Channel ID of the channel where this event happened. */
  channelId: string;
  /** Message ID of the message that was updated. */
  messageId: string;
  /** When this message was edited, in milliseconds since unix epoch */
  editedAt: string;
  /** New message content. */
  newContent?: FormattedText;
}

/**
 * Event sent when a message is deleted.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel the message was deleted in.
 */
export interface StreamEvent_MessageDeleted {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Channel ID of the channel where this event happened. */
  channelId: string;
  /** Message ID of the message that was deleted. */
  messageId: string;
}

/** Event sent when a new channel is created. */
export interface StreamEvent_ChannelCreated {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Channel ID of the channel where this event happened. */
  channelId: string;
  /** Name of this channel. */
  name: string;
  /** The position in the channel list. */
  position?: ItemPosition;
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
  guildId: string;
  /** Channel ID of the channel that was changed. */
  channelId: string;
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
  guildId: string;
  /** Channel ID of the channel that was changed. */
  channelId: string;
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
  guildId: string;
  /** channel_ids: the new order of channel IDs */
  channelIds: string[];
}

/**
 * Event sent when a channel is deleted.
 *
 * This event will only be sent to users that have "messages.view" permission
 * for the channel that was deleted.
 */
export interface StreamEvent_ChannelDeleted {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Channel ID of the channel that was deleted. */
  channelId: string;
}

/** Event sent when a guild's information is changed. */
export interface StreamEvent_GuildUpdated {
  /** Guild ID of the guild that was changed. */
  guildId: string;
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
  guildId: string;
}

/** Event sent a user joins to a guild. */
export interface StreamEvent_MemberJoined {
  /** Member ID of the member that joined the guild. */
  memberId: string;
  /** Guild ID of the guild where this event happened. */
  guildId: string;
}

/** Event sent when a member of a guild leaves said guild for whatever reason. */
export interface StreamEvent_MemberLeft {
  /** User ID of the member that left the guild. */
  memberId: string;
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Why this member left the guild. */
  leaveReason: LeaveReason;
}

/** Event sent when you join a new guild. */
export interface StreamEvent_GuildAddedToList {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** The homeserver this guild is on. */
  homeserver: string;
}

/** Event sent when you leave a guild. */
export interface StreamEvent_GuildRemovedFromList {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** The homeserver this guild is on. */
  homeserver: string;
}

/** Event sent when an action is performed. */
export interface StreamEvent_ActionPerformed {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Channel ID of the channel where this event happened. */
  channelId: string;
  /** Message ID where this event happened. */
  messageId: string;
  /** User ID of the user that triggered the action */
  userId: string;
  /** The action data payload */
  payload?: ActionPayload;
}

/**
 * Event sent when a role's position in the role list is changed.
 *
 * This event will only be sent to users with the "roles.get" permission.
 */
export interface StreamEvent_RoleMoved {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Role ID of the role that was moved. */
  roleId: string;
  /** New position of the role. */
  newPosition?: ItemPosition;
}

/**
 * Event sent when a role is deleted.
 *
 * This event will only be sent to users with the "roles.get" permission.
 */
export interface StreamEvent_RoleDeleted {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Role ID of the role that was deleted. */
  roleId: string;
}

/**
 * Event sent when a role is created.
 *
 * This event will only be sent to users with the "roles.get" permission.
 */
export interface StreamEvent_RoleCreated {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Role ID of the role that was created. */
  roleId: string;
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
  guildId: string;
  /** Role ID of the role that was changed. */
  roleId: string;
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
  guildId: string;
  /** Channel ID of the channel where this event happened. */
  channelId?: string | undefined;
  /** Role ID of the role that had it's permissions changed. */
  roleId: string;
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
  guildId: string;
  /** User ID of the user that had it's roles changed. */
  userId: string;
  /** The new role IDs. */
  newRoleIds: string[];
}

/**
 * Event sent when a user sends a typing notification in a guild channel.
 *
 * Should only be sent to users who have the "message.view" permission for
 * the guild channel where the typing happened.
 */
export interface StreamEvent_Typing {
  /** User ID of the user that sent the typing notification. */
  userId: string;
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Channel ID of the channel where this event happened. */
  channelId: string;
}

/**
 * Event sent when a permission is changed that matters to you.
 *
 * Servers should calculate which users to send this event to when a permission is set.
 * It should only be sent if a user is subscribed to the guild the permission pertains to.
 */
export interface StreamEvent_PermissionUpdated {
  /** Guild ID of the guild where this event happened. */
  guildId: string;
  /** Channel ID of the channel where this event happened. */
  channelId?: string | undefined;
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
  guildId: string;
  /** Channel ID of the channel where this event occured. */
  channelId: string;
  /** Message ID of the message that was pinned. */
  messageId: string;
}

/**
 * Sent when a message is unpinned in a guild channel.
 *
 * Should only be sent to users who have the "message.view" permission for
 * the guild channel where the message was unpinned.
 */
export interface StreamEvent_MessageUnpinned {
  /** Guild ID of the guild where this event occured. */
  guildId: string;
  /** Channel ID of the channel where this event occured. */
  channelId: string;
  /** Message ID of the message that was unpinned. */
  messageId: string;
}

/**
 * Sent when a message's reaction is changed.
 *
 * Should only be sent to users who have the "message.view" permission for
 * the guild channel where the reaction was updated.
 */
export interface StreamEvent_ReactionUpdated {
  /** Guild ID of the guild where this event occured. */
  guildId: string;
  /** Channel ID of the channel where this event occured. */
  channelId: string;
  /** Message ID of the message that had a reaction updated. */
  messageId: string;
  /** The reaction. */
  reaction?: Reaction;
}

/** Sent when there's a new owner. */
export interface StreamEvent_OwnerAdded {
  /** Guild ID of the guild where this event occured. */
  guildId: string;
  /** User ID of the new owner. */
  userId: string;
}

/** Sent when an owner gives up their ownership. */
export interface StreamEvent_OwnerRemoved {
  /** Guild ID of the guild where this event occured. */
  guildId: string;
  /** User ID of the user who is no longer owner. */
  userId: string;
}

/** Sent when a guild invite is received. */
export interface StreamEvent_InviteReceived {
  /** ID of the invite received. */
  inviteId: string;
  /** Server ID of the server the inviter is on. */
  serverId?: string | undefined;
  /** User ID of the inviter. */
  inviterId: string;
}

/** Sent when a guild invite is rejected by the invitee. */
export interface StreamEvent_InviteRejected {
  /** Guild ID of the guild that this occured for. */
  guildId: string;
  /** ID of the invite rejected. */
  inviteId: string;
  /** User ID of the invitee. */
  userId: string;
}

/**
 * Sent when an invite is created in a guild.
 *
 * This will only be sent to members of a guild with "invites.view" permission.
 */
export interface StreamEvent_InviteCreated {
  /** Guild ID of the guild that this occured for. */
  guildId: string;
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
  guildId: string;
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
  guildId: string;
  /** ID of the invite that was used. */
  inviteId: string;
  /** User ID of the user that used this invite. */
  userId: string;
}

function createBaseStreamEventsRequest(): StreamEventsRequest {
  return { request: undefined };
}

export const StreamEventsRequest = {
  encode(
    message: StreamEventsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.request?.$case === "subscribeToGuild") {
      StreamEventsRequest_SubscribeToGuild.encode(
        message.request.subscribeToGuild,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.request?.$case === "subscribeToActions") {
      StreamEventsRequest_SubscribeToActions.encode(
        message.request.subscribeToActions,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.request?.$case === "subscribeToHomeserverEvents") {
      StreamEventsRequest_SubscribeToHomeserverEvents.encode(
        message.request.subscribeToHomeserverEvents,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.request?.$case === "unsubscribeFromAll") {
      StreamEventsRequest_UnsubscribeFromAll.encode(
        message.request.unsubscribeFromAll,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamEventsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.request = {
            $case: "subscribeToGuild",
            subscribeToGuild: StreamEventsRequest_SubscribeToGuild.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 2:
          message.request = {
            $case: "subscribeToActions",
            subscribeToActions: StreamEventsRequest_SubscribeToActions.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 3:
          message.request = {
            $case: "subscribeToHomeserverEvents",
            subscribeToHomeserverEvents:
              StreamEventsRequest_SubscribeToHomeserverEvents.decode(
                reader,
                reader.uint32()
              ),
          };
          break;
        case 4:
          message.request = {
            $case: "unsubscribeFromAll",
            unsubscribeFromAll: StreamEventsRequest_UnsubscribeFromAll.decode(
              reader,
              reader.uint32()
            ),
          };
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
      request: isSet(object.subscribeToGuild)
        ? {
            $case: "subscribeToGuild",
            subscribeToGuild: StreamEventsRequest_SubscribeToGuild.fromJSON(
              object.subscribeToGuild
            ),
          }
        : isSet(object.subscribeToActions)
        ? {
            $case: "subscribeToActions",
            subscribeToActions: StreamEventsRequest_SubscribeToActions.fromJSON(
              object.subscribeToActions
            ),
          }
        : isSet(object.subscribeToHomeserverEvents)
        ? {
            $case: "subscribeToHomeserverEvents",
            subscribeToHomeserverEvents:
              StreamEventsRequest_SubscribeToHomeserverEvents.fromJSON(
                object.subscribeToHomeserverEvents
              ),
          }
        : isSet(object.unsubscribeFromAll)
        ? {
            $case: "unsubscribeFromAll",
            unsubscribeFromAll: StreamEventsRequest_UnsubscribeFromAll.fromJSON(
              object.unsubscribeFromAll
            ),
          }
        : undefined,
    };
  },

  toJSON(message: StreamEventsRequest): unknown {
    const obj: any = {};
    message.request?.$case === "subscribeToGuild" &&
      (obj.subscribeToGuild = message.request?.subscribeToGuild
        ? StreamEventsRequest_SubscribeToGuild.toJSON(
            message.request?.subscribeToGuild
          )
        : undefined);
    message.request?.$case === "subscribeToActions" &&
      (obj.subscribeToActions = message.request?.subscribeToActions
        ? StreamEventsRequest_SubscribeToActions.toJSON(
            message.request?.subscribeToActions
          )
        : undefined);
    message.request?.$case === "subscribeToHomeserverEvents" &&
      (obj.subscribeToHomeserverEvents = message.request
        ?.subscribeToHomeserverEvents
        ? StreamEventsRequest_SubscribeToHomeserverEvents.toJSON(
            message.request?.subscribeToHomeserverEvents
          )
        : undefined);
    message.request?.$case === "unsubscribeFromAll" &&
      (obj.unsubscribeFromAll = message.request?.unsubscribeFromAll
        ? StreamEventsRequest_UnsubscribeFromAll.toJSON(
            message.request?.unsubscribeFromAll
          )
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEventsRequest>, I>>(
    object: I
  ): StreamEventsRequest {
    const message = createBaseStreamEventsRequest();
    if (
      object.request?.$case === "subscribeToGuild" &&
      object.request?.subscribeToGuild !== undefined &&
      object.request?.subscribeToGuild !== null
    ) {
      message.request = {
        $case: "subscribeToGuild",
        subscribeToGuild: StreamEventsRequest_SubscribeToGuild.fromPartial(
          object.request.subscribeToGuild
        ),
      };
    }
    if (
      object.request?.$case === "subscribeToActions" &&
      object.request?.subscribeToActions !== undefined &&
      object.request?.subscribeToActions !== null
    ) {
      message.request = {
        $case: "subscribeToActions",
        subscribeToActions: StreamEventsRequest_SubscribeToActions.fromPartial(
          object.request.subscribeToActions
        ),
      };
    }
    if (
      object.request?.$case === "subscribeToHomeserverEvents" &&
      object.request?.subscribeToHomeserverEvents !== undefined &&
      object.request?.subscribeToHomeserverEvents !== null
    ) {
      message.request = {
        $case: "subscribeToHomeserverEvents",
        subscribeToHomeserverEvents:
          StreamEventsRequest_SubscribeToHomeserverEvents.fromPartial(
            object.request.subscribeToHomeserverEvents
          ),
      };
    }
    if (
      object.request?.$case === "unsubscribeFromAll" &&
      object.request?.unsubscribeFromAll !== undefined &&
      object.request?.unsubscribeFromAll !== null
    ) {
      message.request = {
        $case: "unsubscribeFromAll",
        unsubscribeFromAll: StreamEventsRequest_UnsubscribeFromAll.fromPartial(
          object.request.unsubscribeFromAll
        ),
      };
    }
    return message;
  },
};

function createBaseStreamEventsRequest_SubscribeToGuild(): StreamEventsRequest_SubscribeToGuild {
  return { guildId: "0" };
}

export const StreamEventsRequest_SubscribeToGuild = {
  encode(
    message: StreamEventsRequest_SubscribeToGuild,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEventsRequest_SubscribeToGuild {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsRequest_SubscribeToGuild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
    };
  },

  toJSON(message: StreamEventsRequest_SubscribeToGuild): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamEventsRequest_SubscribeToGuild>, I>
  >(object: I): StreamEventsRequest_SubscribeToGuild {
    const message = createBaseStreamEventsRequest_SubscribeToGuild();
    message.guildId = object.guildId ?? "0";
    return message;
  },
};

function createBaseStreamEventsRequest_SubscribeToActions(): StreamEventsRequest_SubscribeToActions {
  return {};
}

export const StreamEventsRequest_SubscribeToActions = {
  encode(
    _: StreamEventsRequest_SubscribeToActions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEventsRequest_SubscribeToActions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEventsRequest_SubscribeToHomeserverEvents {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEventsRequest_UnsubscribeFromAll {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
  return { event: undefined };
}

export const StreamEventsResponse = {
  encode(
    message: StreamEventsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.event?.$case === "chat") {
      StreamEvent.encode(message.event.chat, writer.uint32(10).fork()).ldelim();
    }
    if (message.event?.$case === "emote") {
      StreamEvent1.encode(
        message.event.emote,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.event?.$case === "profile") {
      StreamEvent2.encode(
        message.event.profile,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEventsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEventsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = {
            $case: "chat",
            chat: StreamEvent.decode(reader, reader.uint32()),
          };
          break;
        case 2:
          message.event = {
            $case: "emote",
            emote: StreamEvent1.decode(reader, reader.uint32()),
          };
          break;
        case 3:
          message.event = {
            $case: "profile",
            profile: StreamEvent2.decode(reader, reader.uint32()),
          };
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
      event: isSet(object.chat)
        ? { $case: "chat", chat: StreamEvent.fromJSON(object.chat) }
        : isSet(object.emote)
        ? { $case: "emote", emote: StreamEvent1.fromJSON(object.emote) }
        : isSet(object.profile)
        ? { $case: "profile", profile: StreamEvent2.fromJSON(object.profile) }
        : undefined,
    };
  },

  toJSON(message: StreamEventsResponse): unknown {
    const obj: any = {};
    message.event?.$case === "chat" &&
      (obj.chat = message.event?.chat
        ? StreamEvent.toJSON(message.event?.chat)
        : undefined);
    message.event?.$case === "emote" &&
      (obj.emote = message.event?.emote
        ? StreamEvent1.toJSON(message.event?.emote)
        : undefined);
    message.event?.$case === "profile" &&
      (obj.profile = message.event?.profile
        ? StreamEvent2.toJSON(message.event?.profile)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEventsResponse>, I>>(
    object: I
  ): StreamEventsResponse {
    const message = createBaseStreamEventsResponse();
    if (
      object.event?.$case === "chat" &&
      object.event?.chat !== undefined &&
      object.event?.chat !== null
    ) {
      message.event = {
        $case: "chat",
        chat: StreamEvent.fromPartial(object.event.chat),
      };
    }
    if (
      object.event?.$case === "emote" &&
      object.event?.emote !== undefined &&
      object.event?.emote !== null
    ) {
      message.event = {
        $case: "emote",
        emote: StreamEvent1.fromPartial(object.event.emote),
      };
    }
    if (
      object.event?.$case === "profile" &&
      object.event?.profile !== undefined &&
      object.event?.profile !== null
    ) {
      message.event = {
        $case: "profile",
        profile: StreamEvent2.fromPartial(object.event.profile),
      };
    }
    return message;
  },
};

function createBaseStreamEvent(): StreamEvent {
  return { event: undefined };
}

export const StreamEvent = {
  encode(
    message: StreamEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.event?.$case === "guildAddedToList") {
      StreamEvent_GuildAddedToList.encode(
        message.event.guildAddedToList,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.event?.$case === "guildRemovedFromList") {
      StreamEvent_GuildRemovedFromList.encode(
        message.event.guildRemovedFromList,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.event?.$case === "actionPerformed") {
      StreamEvent_ActionPerformed.encode(
        message.event.actionPerformed,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.event?.$case === "sentMessage") {
      StreamEvent_MessageSent.encode(
        message.event.sentMessage,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.event?.$case === "editedMessage") {
      StreamEvent_MessageUpdated.encode(
        message.event.editedMessage,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.event?.$case === "deletedMessage") {
      StreamEvent_MessageDeleted.encode(
        message.event.deletedMessage,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.event?.$case === "createdChannel") {
      StreamEvent_ChannelCreated.encode(
        message.event.createdChannel,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.event?.$case === "editedChannel") {
      StreamEvent_ChannelUpdated.encode(
        message.event.editedChannel,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.event?.$case === "deletedChannel") {
      StreamEvent_ChannelDeleted.encode(
        message.event.deletedChannel,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.event?.$case === "editedGuild") {
      StreamEvent_GuildUpdated.encode(
        message.event.editedGuild,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.event?.$case === "deletedGuild") {
      StreamEvent_GuildDeleted.encode(
        message.event.deletedGuild,
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.event?.$case === "joinedMember") {
      StreamEvent_MemberJoined.encode(
        message.event.joinedMember,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.event?.$case === "leftMember") {
      StreamEvent_MemberLeft.encode(
        message.event.leftMember,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.event?.$case === "typing") {
      StreamEvent_Typing.encode(
        message.event.typing,
        writer.uint32(114).fork()
      ).ldelim();
    }
    if (message.event?.$case === "roleCreated") {
      StreamEvent_RoleCreated.encode(
        message.event.roleCreated,
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.event?.$case === "roleDeleted") {
      StreamEvent_RoleDeleted.encode(
        message.event.roleDeleted,
        writer.uint32(130).fork()
      ).ldelim();
    }
    if (message.event?.$case === "roleMoved") {
      StreamEvent_RoleMoved.encode(
        message.event.roleMoved,
        writer.uint32(138).fork()
      ).ldelim();
    }
    if (message.event?.$case === "roleUpdated") {
      StreamEvent_RoleUpdated.encode(
        message.event.roleUpdated,
        writer.uint32(146).fork()
      ).ldelim();
    }
    if (message.event?.$case === "rolePermsUpdated") {
      StreamEvent_RolePermissionsUpdated.encode(
        message.event.rolePermsUpdated,
        writer.uint32(154).fork()
      ).ldelim();
    }
    if (message.event?.$case === "userRolesUpdated") {
      StreamEvent_UserRolesUpdated.encode(
        message.event.userRolesUpdated,
        writer.uint32(162).fork()
      ).ldelim();
    }
    if (message.event?.$case === "permissionUpdated") {
      StreamEvent_PermissionUpdated.encode(
        message.event.permissionUpdated,
        writer.uint32(170).fork()
      ).ldelim();
    }
    if (message.event?.$case === "channelsReordered") {
      StreamEvent_ChannelsReordered.encode(
        message.event.channelsReordered,
        writer.uint32(178).fork()
      ).ldelim();
    }
    if (message.event?.$case === "editedChannelPosition") {
      StreamEvent_ChannelPositionUpdated.encode(
        message.event.editedChannelPosition,
        writer.uint32(186).fork()
      ).ldelim();
    }
    if (message.event?.$case === "messagePinned") {
      StreamEvent_MessagePinned.encode(
        message.event.messagePinned,
        writer.uint32(194).fork()
      ).ldelim();
    }
    if (message.event?.$case === "messageUnpinned") {
      StreamEvent_MessageUnpinned.encode(
        message.event.messageUnpinned,
        writer.uint32(202).fork()
      ).ldelim();
    }
    if (message.event?.$case === "reactionUpdated") {
      StreamEvent_ReactionUpdated.encode(
        message.event.reactionUpdated,
        writer.uint32(210).fork()
      ).ldelim();
    }
    if (message.event?.$case === "ownerAdded") {
      StreamEvent_OwnerAdded.encode(
        message.event.ownerAdded,
        writer.uint32(218).fork()
      ).ldelim();
    }
    if (message.event?.$case === "ownerRemoved") {
      StreamEvent_OwnerRemoved.encode(
        message.event.ownerRemoved,
        writer.uint32(226).fork()
      ).ldelim();
    }
    if (message.event?.$case === "inviteReceived") {
      StreamEvent_InviteReceived.encode(
        message.event.inviteReceived,
        writer.uint32(234).fork()
      ).ldelim();
    }
    if (message.event?.$case === "inviteRejected") {
      StreamEvent_InviteRejected.encode(
        message.event.inviteRejected,
        writer.uint32(242).fork()
      ).ldelim();
    }
    if (message.event?.$case === "inviteCreated") {
      StreamEvent_InviteCreated.encode(
        message.event.inviteCreated,
        writer.uint32(250).fork()
      ).ldelim();
    }
    if (message.event?.$case === "inviteDeleted") {
      StreamEvent_InviteDeleted.encode(
        message.event.inviteDeleted,
        writer.uint32(258).fork()
      ).ldelim();
    }
    if (message.event?.$case === "inviteUsed") {
      StreamEvent_InviteUsed.encode(
        message.event.inviteUsed,
        writer.uint32(266).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = {
            $case: "guildAddedToList",
            guildAddedToList: StreamEvent_GuildAddedToList.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 2:
          message.event = {
            $case: "guildRemovedFromList",
            guildRemovedFromList: StreamEvent_GuildRemovedFromList.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 3:
          message.event = {
            $case: "actionPerformed",
            actionPerformed: StreamEvent_ActionPerformed.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 4:
          message.event = {
            $case: "sentMessage",
            sentMessage: StreamEvent_MessageSent.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 5:
          message.event = {
            $case: "editedMessage",
            editedMessage: StreamEvent_MessageUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 6:
          message.event = {
            $case: "deletedMessage",
            deletedMessage: StreamEvent_MessageDeleted.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 7:
          message.event = {
            $case: "createdChannel",
            createdChannel: StreamEvent_ChannelCreated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 8:
          message.event = {
            $case: "editedChannel",
            editedChannel: StreamEvent_ChannelUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 9:
          message.event = {
            $case: "deletedChannel",
            deletedChannel: StreamEvent_ChannelDeleted.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 10:
          message.event = {
            $case: "editedGuild",
            editedGuild: StreamEvent_GuildUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 11:
          message.event = {
            $case: "deletedGuild",
            deletedGuild: StreamEvent_GuildDeleted.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 12:
          message.event = {
            $case: "joinedMember",
            joinedMember: StreamEvent_MemberJoined.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 13:
          message.event = {
            $case: "leftMember",
            leftMember: StreamEvent_MemberLeft.decode(reader, reader.uint32()),
          };
          break;
        case 14:
          message.event = {
            $case: "typing",
            typing: StreamEvent_Typing.decode(reader, reader.uint32()),
          };
          break;
        case 15:
          message.event = {
            $case: "roleCreated",
            roleCreated: StreamEvent_RoleCreated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 16:
          message.event = {
            $case: "roleDeleted",
            roleDeleted: StreamEvent_RoleDeleted.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 17:
          message.event = {
            $case: "roleMoved",
            roleMoved: StreamEvent_RoleMoved.decode(reader, reader.uint32()),
          };
          break;
        case 18:
          message.event = {
            $case: "roleUpdated",
            roleUpdated: StreamEvent_RoleUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 19:
          message.event = {
            $case: "rolePermsUpdated",
            rolePermsUpdated: StreamEvent_RolePermissionsUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 20:
          message.event = {
            $case: "userRolesUpdated",
            userRolesUpdated: StreamEvent_UserRolesUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 21:
          message.event = {
            $case: "permissionUpdated",
            permissionUpdated: StreamEvent_PermissionUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 22:
          message.event = {
            $case: "channelsReordered",
            channelsReordered: StreamEvent_ChannelsReordered.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 23:
          message.event = {
            $case: "editedChannelPosition",
            editedChannelPosition: StreamEvent_ChannelPositionUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 24:
          message.event = {
            $case: "messagePinned",
            messagePinned: StreamEvent_MessagePinned.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 25:
          message.event = {
            $case: "messageUnpinned",
            messageUnpinned: StreamEvent_MessageUnpinned.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 26:
          message.event = {
            $case: "reactionUpdated",
            reactionUpdated: StreamEvent_ReactionUpdated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 27:
          message.event = {
            $case: "ownerAdded",
            ownerAdded: StreamEvent_OwnerAdded.decode(reader, reader.uint32()),
          };
          break;
        case 28:
          message.event = {
            $case: "ownerRemoved",
            ownerRemoved: StreamEvent_OwnerRemoved.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 29:
          message.event = {
            $case: "inviteReceived",
            inviteReceived: StreamEvent_InviteReceived.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 30:
          message.event = {
            $case: "inviteRejected",
            inviteRejected: StreamEvent_InviteRejected.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 31:
          message.event = {
            $case: "inviteCreated",
            inviteCreated: StreamEvent_InviteCreated.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 32:
          message.event = {
            $case: "inviteDeleted",
            inviteDeleted: StreamEvent_InviteDeleted.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 33:
          message.event = {
            $case: "inviteUsed",
            inviteUsed: StreamEvent_InviteUsed.decode(reader, reader.uint32()),
          };
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
      event: isSet(object.guildAddedToList)
        ? {
            $case: "guildAddedToList",
            guildAddedToList: StreamEvent_GuildAddedToList.fromJSON(
              object.guildAddedToList
            ),
          }
        : isSet(object.guildRemovedFromList)
        ? {
            $case: "guildRemovedFromList",
            guildRemovedFromList: StreamEvent_GuildRemovedFromList.fromJSON(
              object.guildRemovedFromList
            ),
          }
        : isSet(object.actionPerformed)
        ? {
            $case: "actionPerformed",
            actionPerformed: StreamEvent_ActionPerformed.fromJSON(
              object.actionPerformed
            ),
          }
        : isSet(object.sentMessage)
        ? {
            $case: "sentMessage",
            sentMessage: StreamEvent_MessageSent.fromJSON(object.sentMessage),
          }
        : isSet(object.editedMessage)
        ? {
            $case: "editedMessage",
            editedMessage: StreamEvent_MessageUpdated.fromJSON(
              object.editedMessage
            ),
          }
        : isSet(object.deletedMessage)
        ? {
            $case: "deletedMessage",
            deletedMessage: StreamEvent_MessageDeleted.fromJSON(
              object.deletedMessage
            ),
          }
        : isSet(object.createdChannel)
        ? {
            $case: "createdChannel",
            createdChannel: StreamEvent_ChannelCreated.fromJSON(
              object.createdChannel
            ),
          }
        : isSet(object.editedChannel)
        ? {
            $case: "editedChannel",
            editedChannel: StreamEvent_ChannelUpdated.fromJSON(
              object.editedChannel
            ),
          }
        : isSet(object.deletedChannel)
        ? {
            $case: "deletedChannel",
            deletedChannel: StreamEvent_ChannelDeleted.fromJSON(
              object.deletedChannel
            ),
          }
        : isSet(object.editedGuild)
        ? {
            $case: "editedGuild",
            editedGuild: StreamEvent_GuildUpdated.fromJSON(object.editedGuild),
          }
        : isSet(object.deletedGuild)
        ? {
            $case: "deletedGuild",
            deletedGuild: StreamEvent_GuildDeleted.fromJSON(
              object.deletedGuild
            ),
          }
        : isSet(object.joinedMember)
        ? {
            $case: "joinedMember",
            joinedMember: StreamEvent_MemberJoined.fromJSON(
              object.joinedMember
            ),
          }
        : isSet(object.leftMember)
        ? {
            $case: "leftMember",
            leftMember: StreamEvent_MemberLeft.fromJSON(object.leftMember),
          }
        : isSet(object.typing)
        ? {
            $case: "typing",
            typing: StreamEvent_Typing.fromJSON(object.typing),
          }
        : isSet(object.roleCreated)
        ? {
            $case: "roleCreated",
            roleCreated: StreamEvent_RoleCreated.fromJSON(object.roleCreated),
          }
        : isSet(object.roleDeleted)
        ? {
            $case: "roleDeleted",
            roleDeleted: StreamEvent_RoleDeleted.fromJSON(object.roleDeleted),
          }
        : isSet(object.roleMoved)
        ? {
            $case: "roleMoved",
            roleMoved: StreamEvent_RoleMoved.fromJSON(object.roleMoved),
          }
        : isSet(object.roleUpdated)
        ? {
            $case: "roleUpdated",
            roleUpdated: StreamEvent_RoleUpdated.fromJSON(object.roleUpdated),
          }
        : isSet(object.rolePermsUpdated)
        ? {
            $case: "rolePermsUpdated",
            rolePermsUpdated: StreamEvent_RolePermissionsUpdated.fromJSON(
              object.rolePermsUpdated
            ),
          }
        : isSet(object.userRolesUpdated)
        ? {
            $case: "userRolesUpdated",
            userRolesUpdated: StreamEvent_UserRolesUpdated.fromJSON(
              object.userRolesUpdated
            ),
          }
        : isSet(object.permissionUpdated)
        ? {
            $case: "permissionUpdated",
            permissionUpdated: StreamEvent_PermissionUpdated.fromJSON(
              object.permissionUpdated
            ),
          }
        : isSet(object.channelsReordered)
        ? {
            $case: "channelsReordered",
            channelsReordered: StreamEvent_ChannelsReordered.fromJSON(
              object.channelsReordered
            ),
          }
        : isSet(object.editedChannelPosition)
        ? {
            $case: "editedChannelPosition",
            editedChannelPosition: StreamEvent_ChannelPositionUpdated.fromJSON(
              object.editedChannelPosition
            ),
          }
        : isSet(object.messagePinned)
        ? {
            $case: "messagePinned",
            messagePinned: StreamEvent_MessagePinned.fromJSON(
              object.messagePinned
            ),
          }
        : isSet(object.messageUnpinned)
        ? {
            $case: "messageUnpinned",
            messageUnpinned: StreamEvent_MessageUnpinned.fromJSON(
              object.messageUnpinned
            ),
          }
        : isSet(object.reactionUpdated)
        ? {
            $case: "reactionUpdated",
            reactionUpdated: StreamEvent_ReactionUpdated.fromJSON(
              object.reactionUpdated
            ),
          }
        : isSet(object.ownerAdded)
        ? {
            $case: "ownerAdded",
            ownerAdded: StreamEvent_OwnerAdded.fromJSON(object.ownerAdded),
          }
        : isSet(object.ownerRemoved)
        ? {
            $case: "ownerRemoved",
            ownerRemoved: StreamEvent_OwnerRemoved.fromJSON(
              object.ownerRemoved
            ),
          }
        : isSet(object.inviteReceived)
        ? {
            $case: "inviteReceived",
            inviteReceived: StreamEvent_InviteReceived.fromJSON(
              object.inviteReceived
            ),
          }
        : isSet(object.inviteRejected)
        ? {
            $case: "inviteRejected",
            inviteRejected: StreamEvent_InviteRejected.fromJSON(
              object.inviteRejected
            ),
          }
        : isSet(object.inviteCreated)
        ? {
            $case: "inviteCreated",
            inviteCreated: StreamEvent_InviteCreated.fromJSON(
              object.inviteCreated
            ),
          }
        : isSet(object.inviteDeleted)
        ? {
            $case: "inviteDeleted",
            inviteDeleted: StreamEvent_InviteDeleted.fromJSON(
              object.inviteDeleted
            ),
          }
        : isSet(object.inviteUsed)
        ? {
            $case: "inviteUsed",
            inviteUsed: StreamEvent_InviteUsed.fromJSON(object.inviteUsed),
          }
        : undefined,
    };
  },

  toJSON(message: StreamEvent): unknown {
    const obj: any = {};
    message.event?.$case === "guildAddedToList" &&
      (obj.guildAddedToList = message.event?.guildAddedToList
        ? StreamEvent_GuildAddedToList.toJSON(message.event?.guildAddedToList)
        : undefined);
    message.event?.$case === "guildRemovedFromList" &&
      (obj.guildRemovedFromList = message.event?.guildRemovedFromList
        ? StreamEvent_GuildRemovedFromList.toJSON(
            message.event?.guildRemovedFromList
          )
        : undefined);
    message.event?.$case === "actionPerformed" &&
      (obj.actionPerformed = message.event?.actionPerformed
        ? StreamEvent_ActionPerformed.toJSON(message.event?.actionPerformed)
        : undefined);
    message.event?.$case === "sentMessage" &&
      (obj.sentMessage = message.event?.sentMessage
        ? StreamEvent_MessageSent.toJSON(message.event?.sentMessage)
        : undefined);
    message.event?.$case === "editedMessage" &&
      (obj.editedMessage = message.event?.editedMessage
        ? StreamEvent_MessageUpdated.toJSON(message.event?.editedMessage)
        : undefined);
    message.event?.$case === "deletedMessage" &&
      (obj.deletedMessage = message.event?.deletedMessage
        ? StreamEvent_MessageDeleted.toJSON(message.event?.deletedMessage)
        : undefined);
    message.event?.$case === "createdChannel" &&
      (obj.createdChannel = message.event?.createdChannel
        ? StreamEvent_ChannelCreated.toJSON(message.event?.createdChannel)
        : undefined);
    message.event?.$case === "editedChannel" &&
      (obj.editedChannel = message.event?.editedChannel
        ? StreamEvent_ChannelUpdated.toJSON(message.event?.editedChannel)
        : undefined);
    message.event?.$case === "deletedChannel" &&
      (obj.deletedChannel = message.event?.deletedChannel
        ? StreamEvent_ChannelDeleted.toJSON(message.event?.deletedChannel)
        : undefined);
    message.event?.$case === "editedGuild" &&
      (obj.editedGuild = message.event?.editedGuild
        ? StreamEvent_GuildUpdated.toJSON(message.event?.editedGuild)
        : undefined);
    message.event?.$case === "deletedGuild" &&
      (obj.deletedGuild = message.event?.deletedGuild
        ? StreamEvent_GuildDeleted.toJSON(message.event?.deletedGuild)
        : undefined);
    message.event?.$case === "joinedMember" &&
      (obj.joinedMember = message.event?.joinedMember
        ? StreamEvent_MemberJoined.toJSON(message.event?.joinedMember)
        : undefined);
    message.event?.$case === "leftMember" &&
      (obj.leftMember = message.event?.leftMember
        ? StreamEvent_MemberLeft.toJSON(message.event?.leftMember)
        : undefined);
    message.event?.$case === "typing" &&
      (obj.typing = message.event?.typing
        ? StreamEvent_Typing.toJSON(message.event?.typing)
        : undefined);
    message.event?.$case === "roleCreated" &&
      (obj.roleCreated = message.event?.roleCreated
        ? StreamEvent_RoleCreated.toJSON(message.event?.roleCreated)
        : undefined);
    message.event?.$case === "roleDeleted" &&
      (obj.roleDeleted = message.event?.roleDeleted
        ? StreamEvent_RoleDeleted.toJSON(message.event?.roleDeleted)
        : undefined);
    message.event?.$case === "roleMoved" &&
      (obj.roleMoved = message.event?.roleMoved
        ? StreamEvent_RoleMoved.toJSON(message.event?.roleMoved)
        : undefined);
    message.event?.$case === "roleUpdated" &&
      (obj.roleUpdated = message.event?.roleUpdated
        ? StreamEvent_RoleUpdated.toJSON(message.event?.roleUpdated)
        : undefined);
    message.event?.$case === "rolePermsUpdated" &&
      (obj.rolePermsUpdated = message.event?.rolePermsUpdated
        ? StreamEvent_RolePermissionsUpdated.toJSON(
            message.event?.rolePermsUpdated
          )
        : undefined);
    message.event?.$case === "userRolesUpdated" &&
      (obj.userRolesUpdated = message.event?.userRolesUpdated
        ? StreamEvent_UserRolesUpdated.toJSON(message.event?.userRolesUpdated)
        : undefined);
    message.event?.$case === "permissionUpdated" &&
      (obj.permissionUpdated = message.event?.permissionUpdated
        ? StreamEvent_PermissionUpdated.toJSON(message.event?.permissionUpdated)
        : undefined);
    message.event?.$case === "channelsReordered" &&
      (obj.channelsReordered = message.event?.channelsReordered
        ? StreamEvent_ChannelsReordered.toJSON(message.event?.channelsReordered)
        : undefined);
    message.event?.$case === "editedChannelPosition" &&
      (obj.editedChannelPosition = message.event?.editedChannelPosition
        ? StreamEvent_ChannelPositionUpdated.toJSON(
            message.event?.editedChannelPosition
          )
        : undefined);
    message.event?.$case === "messagePinned" &&
      (obj.messagePinned = message.event?.messagePinned
        ? StreamEvent_MessagePinned.toJSON(message.event?.messagePinned)
        : undefined);
    message.event?.$case === "messageUnpinned" &&
      (obj.messageUnpinned = message.event?.messageUnpinned
        ? StreamEvent_MessageUnpinned.toJSON(message.event?.messageUnpinned)
        : undefined);
    message.event?.$case === "reactionUpdated" &&
      (obj.reactionUpdated = message.event?.reactionUpdated
        ? StreamEvent_ReactionUpdated.toJSON(message.event?.reactionUpdated)
        : undefined);
    message.event?.$case === "ownerAdded" &&
      (obj.ownerAdded = message.event?.ownerAdded
        ? StreamEvent_OwnerAdded.toJSON(message.event?.ownerAdded)
        : undefined);
    message.event?.$case === "ownerRemoved" &&
      (obj.ownerRemoved = message.event?.ownerRemoved
        ? StreamEvent_OwnerRemoved.toJSON(message.event?.ownerRemoved)
        : undefined);
    message.event?.$case === "inviteReceived" &&
      (obj.inviteReceived = message.event?.inviteReceived
        ? StreamEvent_InviteReceived.toJSON(message.event?.inviteReceived)
        : undefined);
    message.event?.$case === "inviteRejected" &&
      (obj.inviteRejected = message.event?.inviteRejected
        ? StreamEvent_InviteRejected.toJSON(message.event?.inviteRejected)
        : undefined);
    message.event?.$case === "inviteCreated" &&
      (obj.inviteCreated = message.event?.inviteCreated
        ? StreamEvent_InviteCreated.toJSON(message.event?.inviteCreated)
        : undefined);
    message.event?.$case === "inviteDeleted" &&
      (obj.inviteDeleted = message.event?.inviteDeleted
        ? StreamEvent_InviteDeleted.toJSON(message.event?.inviteDeleted)
        : undefined);
    message.event?.$case === "inviteUsed" &&
      (obj.inviteUsed = message.event?.inviteUsed
        ? StreamEvent_InviteUsed.toJSON(message.event?.inviteUsed)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent>, I>>(
    object: I
  ): StreamEvent {
    const message = createBaseStreamEvent();
    if (
      object.event?.$case === "guildAddedToList" &&
      object.event?.guildAddedToList !== undefined &&
      object.event?.guildAddedToList !== null
    ) {
      message.event = {
        $case: "guildAddedToList",
        guildAddedToList: StreamEvent_GuildAddedToList.fromPartial(
          object.event.guildAddedToList
        ),
      };
    }
    if (
      object.event?.$case === "guildRemovedFromList" &&
      object.event?.guildRemovedFromList !== undefined &&
      object.event?.guildRemovedFromList !== null
    ) {
      message.event = {
        $case: "guildRemovedFromList",
        guildRemovedFromList: StreamEvent_GuildRemovedFromList.fromPartial(
          object.event.guildRemovedFromList
        ),
      };
    }
    if (
      object.event?.$case === "actionPerformed" &&
      object.event?.actionPerformed !== undefined &&
      object.event?.actionPerformed !== null
    ) {
      message.event = {
        $case: "actionPerformed",
        actionPerformed: StreamEvent_ActionPerformed.fromPartial(
          object.event.actionPerformed
        ),
      };
    }
    if (
      object.event?.$case === "sentMessage" &&
      object.event?.sentMessage !== undefined &&
      object.event?.sentMessage !== null
    ) {
      message.event = {
        $case: "sentMessage",
        sentMessage: StreamEvent_MessageSent.fromPartial(
          object.event.sentMessage
        ),
      };
    }
    if (
      object.event?.$case === "editedMessage" &&
      object.event?.editedMessage !== undefined &&
      object.event?.editedMessage !== null
    ) {
      message.event = {
        $case: "editedMessage",
        editedMessage: StreamEvent_MessageUpdated.fromPartial(
          object.event.editedMessage
        ),
      };
    }
    if (
      object.event?.$case === "deletedMessage" &&
      object.event?.deletedMessage !== undefined &&
      object.event?.deletedMessage !== null
    ) {
      message.event = {
        $case: "deletedMessage",
        deletedMessage: StreamEvent_MessageDeleted.fromPartial(
          object.event.deletedMessage
        ),
      };
    }
    if (
      object.event?.$case === "createdChannel" &&
      object.event?.createdChannel !== undefined &&
      object.event?.createdChannel !== null
    ) {
      message.event = {
        $case: "createdChannel",
        createdChannel: StreamEvent_ChannelCreated.fromPartial(
          object.event.createdChannel
        ),
      };
    }
    if (
      object.event?.$case === "editedChannel" &&
      object.event?.editedChannel !== undefined &&
      object.event?.editedChannel !== null
    ) {
      message.event = {
        $case: "editedChannel",
        editedChannel: StreamEvent_ChannelUpdated.fromPartial(
          object.event.editedChannel
        ),
      };
    }
    if (
      object.event?.$case === "deletedChannel" &&
      object.event?.deletedChannel !== undefined &&
      object.event?.deletedChannel !== null
    ) {
      message.event = {
        $case: "deletedChannel",
        deletedChannel: StreamEvent_ChannelDeleted.fromPartial(
          object.event.deletedChannel
        ),
      };
    }
    if (
      object.event?.$case === "editedGuild" &&
      object.event?.editedGuild !== undefined &&
      object.event?.editedGuild !== null
    ) {
      message.event = {
        $case: "editedGuild",
        editedGuild: StreamEvent_GuildUpdated.fromPartial(
          object.event.editedGuild
        ),
      };
    }
    if (
      object.event?.$case === "deletedGuild" &&
      object.event?.deletedGuild !== undefined &&
      object.event?.deletedGuild !== null
    ) {
      message.event = {
        $case: "deletedGuild",
        deletedGuild: StreamEvent_GuildDeleted.fromPartial(
          object.event.deletedGuild
        ),
      };
    }
    if (
      object.event?.$case === "joinedMember" &&
      object.event?.joinedMember !== undefined &&
      object.event?.joinedMember !== null
    ) {
      message.event = {
        $case: "joinedMember",
        joinedMember: StreamEvent_MemberJoined.fromPartial(
          object.event.joinedMember
        ),
      };
    }
    if (
      object.event?.$case === "leftMember" &&
      object.event?.leftMember !== undefined &&
      object.event?.leftMember !== null
    ) {
      message.event = {
        $case: "leftMember",
        leftMember: StreamEvent_MemberLeft.fromPartial(object.event.leftMember),
      };
    }
    if (
      object.event?.$case === "typing" &&
      object.event?.typing !== undefined &&
      object.event?.typing !== null
    ) {
      message.event = {
        $case: "typing",
        typing: StreamEvent_Typing.fromPartial(object.event.typing),
      };
    }
    if (
      object.event?.$case === "roleCreated" &&
      object.event?.roleCreated !== undefined &&
      object.event?.roleCreated !== null
    ) {
      message.event = {
        $case: "roleCreated",
        roleCreated: StreamEvent_RoleCreated.fromPartial(
          object.event.roleCreated
        ),
      };
    }
    if (
      object.event?.$case === "roleDeleted" &&
      object.event?.roleDeleted !== undefined &&
      object.event?.roleDeleted !== null
    ) {
      message.event = {
        $case: "roleDeleted",
        roleDeleted: StreamEvent_RoleDeleted.fromPartial(
          object.event.roleDeleted
        ),
      };
    }
    if (
      object.event?.$case === "roleMoved" &&
      object.event?.roleMoved !== undefined &&
      object.event?.roleMoved !== null
    ) {
      message.event = {
        $case: "roleMoved",
        roleMoved: StreamEvent_RoleMoved.fromPartial(object.event.roleMoved),
      };
    }
    if (
      object.event?.$case === "roleUpdated" &&
      object.event?.roleUpdated !== undefined &&
      object.event?.roleUpdated !== null
    ) {
      message.event = {
        $case: "roleUpdated",
        roleUpdated: StreamEvent_RoleUpdated.fromPartial(
          object.event.roleUpdated
        ),
      };
    }
    if (
      object.event?.$case === "rolePermsUpdated" &&
      object.event?.rolePermsUpdated !== undefined &&
      object.event?.rolePermsUpdated !== null
    ) {
      message.event = {
        $case: "rolePermsUpdated",
        rolePermsUpdated: StreamEvent_RolePermissionsUpdated.fromPartial(
          object.event.rolePermsUpdated
        ),
      };
    }
    if (
      object.event?.$case === "userRolesUpdated" &&
      object.event?.userRolesUpdated !== undefined &&
      object.event?.userRolesUpdated !== null
    ) {
      message.event = {
        $case: "userRolesUpdated",
        userRolesUpdated: StreamEvent_UserRolesUpdated.fromPartial(
          object.event.userRolesUpdated
        ),
      };
    }
    if (
      object.event?.$case === "permissionUpdated" &&
      object.event?.permissionUpdated !== undefined &&
      object.event?.permissionUpdated !== null
    ) {
      message.event = {
        $case: "permissionUpdated",
        permissionUpdated: StreamEvent_PermissionUpdated.fromPartial(
          object.event.permissionUpdated
        ),
      };
    }
    if (
      object.event?.$case === "channelsReordered" &&
      object.event?.channelsReordered !== undefined &&
      object.event?.channelsReordered !== null
    ) {
      message.event = {
        $case: "channelsReordered",
        channelsReordered: StreamEvent_ChannelsReordered.fromPartial(
          object.event.channelsReordered
        ),
      };
    }
    if (
      object.event?.$case === "editedChannelPosition" &&
      object.event?.editedChannelPosition !== undefined &&
      object.event?.editedChannelPosition !== null
    ) {
      message.event = {
        $case: "editedChannelPosition",
        editedChannelPosition: StreamEvent_ChannelPositionUpdated.fromPartial(
          object.event.editedChannelPosition
        ),
      };
    }
    if (
      object.event?.$case === "messagePinned" &&
      object.event?.messagePinned !== undefined &&
      object.event?.messagePinned !== null
    ) {
      message.event = {
        $case: "messagePinned",
        messagePinned: StreamEvent_MessagePinned.fromPartial(
          object.event.messagePinned
        ),
      };
    }
    if (
      object.event?.$case === "messageUnpinned" &&
      object.event?.messageUnpinned !== undefined &&
      object.event?.messageUnpinned !== null
    ) {
      message.event = {
        $case: "messageUnpinned",
        messageUnpinned: StreamEvent_MessageUnpinned.fromPartial(
          object.event.messageUnpinned
        ),
      };
    }
    if (
      object.event?.$case === "reactionUpdated" &&
      object.event?.reactionUpdated !== undefined &&
      object.event?.reactionUpdated !== null
    ) {
      message.event = {
        $case: "reactionUpdated",
        reactionUpdated: StreamEvent_ReactionUpdated.fromPartial(
          object.event.reactionUpdated
        ),
      };
    }
    if (
      object.event?.$case === "ownerAdded" &&
      object.event?.ownerAdded !== undefined &&
      object.event?.ownerAdded !== null
    ) {
      message.event = {
        $case: "ownerAdded",
        ownerAdded: StreamEvent_OwnerAdded.fromPartial(object.event.ownerAdded),
      };
    }
    if (
      object.event?.$case === "ownerRemoved" &&
      object.event?.ownerRemoved !== undefined &&
      object.event?.ownerRemoved !== null
    ) {
      message.event = {
        $case: "ownerRemoved",
        ownerRemoved: StreamEvent_OwnerRemoved.fromPartial(
          object.event.ownerRemoved
        ),
      };
    }
    if (
      object.event?.$case === "inviteReceived" &&
      object.event?.inviteReceived !== undefined &&
      object.event?.inviteReceived !== null
    ) {
      message.event = {
        $case: "inviteReceived",
        inviteReceived: StreamEvent_InviteReceived.fromPartial(
          object.event.inviteReceived
        ),
      };
    }
    if (
      object.event?.$case === "inviteRejected" &&
      object.event?.inviteRejected !== undefined &&
      object.event?.inviteRejected !== null
    ) {
      message.event = {
        $case: "inviteRejected",
        inviteRejected: StreamEvent_InviteRejected.fromPartial(
          object.event.inviteRejected
        ),
      };
    }
    if (
      object.event?.$case === "inviteCreated" &&
      object.event?.inviteCreated !== undefined &&
      object.event?.inviteCreated !== null
    ) {
      message.event = {
        $case: "inviteCreated",
        inviteCreated: StreamEvent_InviteCreated.fromPartial(
          object.event.inviteCreated
        ),
      };
    }
    if (
      object.event?.$case === "inviteDeleted" &&
      object.event?.inviteDeleted !== undefined &&
      object.event?.inviteDeleted !== null
    ) {
      message.event = {
        $case: "inviteDeleted",
        inviteDeleted: StreamEvent_InviteDeleted.fromPartial(
          object.event.inviteDeleted
        ),
      };
    }
    if (
      object.event?.$case === "inviteUsed" &&
      object.event?.inviteUsed !== undefined &&
      object.event?.inviteUsed !== null
    ) {
      message.event = {
        $case: "inviteUsed",
        inviteUsed: StreamEvent_InviteUsed.fromPartial(object.event.inviteUsed),
      };
    }
    return message;
  },
};

function createBaseStreamEvent_MessageSent(): StreamEvent_MessageSent {
  return {
    echoId: undefined,
    guildId: "0",
    channelId: "0",
    messageId: "0",
    message: undefined,
  };
}

export const StreamEvent_MessageSent = {
  encode(
    message: StreamEvent_MessageSent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.echoId !== undefined) {
      writer.uint32(8).uint64(message.echoId);
    }
    if (message.guildId !== "0") {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(24).uint64(message.channelId);
    }
    if (message.messageId !== "0") {
      writer.uint32(32).uint64(message.messageId);
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessageSent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessageSent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.echoId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.messageId = longToString(reader.uint64() as Long);
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
      echoId: isSet(object.echoId) ? String(object.echoId) : undefined,
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      messageId: isSet(object.messageId) ? String(object.messageId) : "0",
      message: isSet(object.message)
        ? Message.fromJSON(object.message)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_MessageSent): unknown {
    const obj: any = {};
    message.echoId !== undefined && (obj.echoId = message.echoId);
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
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
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.messageId = object.messageId ?? "0";
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_MessageUpdated(): StreamEvent_MessageUpdated {
  return {
    guildId: "0",
    channelId: "0",
    messageId: "0",
    editedAt: "0",
    newContent: undefined,
  };
}

export const StreamEvent_MessageUpdated = {
  encode(
    message: StreamEvent_MessageUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== "0") {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.editedAt !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessageUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessageUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.editedAt = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      messageId: isSet(object.messageId) ? String(object.messageId) : "0",
      editedAt: isSet(object.editedAt) ? String(object.editedAt) : "0",
      newContent: isSet(object.newContent)
        ? FormattedText.fromJSON(object.newContent)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_MessageUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.editedAt !== undefined && (obj.editedAt = message.editedAt);
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
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.messageId = object.messageId ?? "0";
    message.editedAt = object.editedAt ?? "0";
    message.newContent =
      object.newContent !== undefined && object.newContent !== null
        ? FormattedText.fromPartial(object.newContent)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_MessageDeleted(): StreamEvent_MessageDeleted {
  return { guildId: "0", channelId: "0", messageId: "0" };
}

export const StreamEvent_MessageDeleted = {
  encode(
    message: StreamEvent_MessageDeleted,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== "0") {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessageDeleted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessageDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      messageId: isSet(object.messageId) ? String(object.messageId) : "0",
    };
  },

  toJSON(message: StreamEvent_MessageDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MessageDeleted>, I>>(
    object: I
  ): StreamEvent_MessageDeleted {
    const message = createBaseStreamEvent_MessageDeleted();
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.messageId = object.messageId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_ChannelCreated(): StreamEvent_ChannelCreated {
  return {
    guildId: "0",
    channelId: "0",
    name: "",
    position: undefined,
    kind: 0,
    metadata: undefined,
  };
}

export const StreamEvent_ChannelCreated = {
  encode(
    message: StreamEvent_ChannelCreated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelCreated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
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
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
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
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
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
    guildId: "0",
    channelId: "0",
    newName: undefined,
    newMetadata: undefined,
  };
}

export const StreamEvent_ChannelUpdated = {
  encode(
    message: StreamEvent_ChannelUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      newName: isSet(object.newName) ? String(object.newName) : undefined,
      newMetadata: isSet(object.newMetadata)
        ? Metadata.fromJSON(object.newMetadata)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ChannelUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
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
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.newName = object.newName ?? undefined;
    message.newMetadata =
      object.newMetadata !== undefined && object.newMetadata !== null
        ? Metadata.fromPartial(object.newMetadata)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_ChannelPositionUpdated(): StreamEvent_ChannelPositionUpdated {
  return { guildId: "0", channelId: "0", newPosition: undefined };
}

export const StreamEvent_ChannelPositionUpdated = {
  encode(
    message: StreamEvent_ChannelPositionUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelPositionUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelPositionUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      newPosition: isSet(object.newPosition)
        ? ItemPosition.fromJSON(object.newPosition)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ChannelPositionUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
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
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.newPosition =
      object.newPosition !== undefined && object.newPosition !== null
        ? ItemPosition.fromPartial(object.newPosition)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_ChannelsReordered(): StreamEvent_ChannelsReordered {
  return { guildId: "0", channelIds: [] };
}

export const StreamEvent_ChannelsReordered = {
  encode(
    message: StreamEvent_ChannelsReordered,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelsReordered {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelsReordered();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.channelIds.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.channelIds.push(longToString(reader.uint64() as Long));
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelIds: Array.isArray(object?.channelIds)
        ? object.channelIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: StreamEvent_ChannelsReordered): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    if (message.channelIds) {
      obj.channelIds = message.channelIds.map((e) => e);
    } else {
      obj.channelIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_ChannelsReordered>, I>>(
    object: I
  ): StreamEvent_ChannelsReordered {
    const message = createBaseStreamEvent_ChannelsReordered();
    message.guildId = object.guildId ?? "0";
    message.channelIds = object.channelIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseStreamEvent_ChannelDeleted(): StreamEvent_ChannelDeleted {
  return { guildId: "0", channelId: "0" };
}

export const StreamEvent_ChannelDeleted = {
  encode(
    message: StreamEvent_ChannelDeleted,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(16).uint64(message.channelId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_ChannelDeleted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ChannelDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
    };
  },

  toJSON(message: StreamEvent_ChannelDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_ChannelDeleted>, I>>(
    object: I
  ): StreamEvent_ChannelDeleted {
    const message = createBaseStreamEvent_ChannelDeleted();
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_GuildUpdated(): StreamEvent_GuildUpdated {
  return {
    guildId: "0",
    newName: undefined,
    newPicture: undefined,
    newMetadata: undefined,
  };
}

export const StreamEvent_GuildUpdated = {
  encode(
    message: StreamEvent_GuildUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_GuildUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_GuildUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
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
    message.guildId !== undefined && (obj.guildId = message.guildId);
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
    message.guildId = object.guildId ?? "0";
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
  return { guildId: "0" };
}

export const StreamEvent_GuildDeleted = {
  encode(
    message: StreamEvent_GuildDeleted,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_GuildDeleted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_GuildDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
    };
  },

  toJSON(message: StreamEvent_GuildDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_GuildDeleted>, I>>(
    object: I
  ): StreamEvent_GuildDeleted {
    const message = createBaseStreamEvent_GuildDeleted();
    message.guildId = object.guildId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_MemberJoined(): StreamEvent_MemberJoined {
  return { memberId: "0", guildId: "0" };
}

export const StreamEvent_MemberJoined = {
  encode(
    message: StreamEvent_MemberJoined,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.memberId !== "0") {
      writer.uint32(8).uint64(message.memberId);
    }
    if (message.guildId !== "0") {
      writer.uint32(16).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_MemberJoined {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MemberJoined();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.memberId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.guildId = longToString(reader.uint64() as Long);
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
      memberId: isSet(object.memberId) ? String(object.memberId) : "0",
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
    };
  },

  toJSON(message: StreamEvent_MemberJoined): unknown {
    const obj: any = {};
    message.memberId !== undefined && (obj.memberId = message.memberId);
    message.guildId !== undefined && (obj.guildId = message.guildId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MemberJoined>, I>>(
    object: I
  ): StreamEvent_MemberJoined {
    const message = createBaseStreamEvent_MemberJoined();
    message.memberId = object.memberId ?? "0";
    message.guildId = object.guildId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_MemberLeft(): StreamEvent_MemberLeft {
  return { memberId: "0", guildId: "0", leaveReason: 0 };
}

export const StreamEvent_MemberLeft = {
  encode(
    message: StreamEvent_MemberLeft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.memberId !== "0") {
      writer.uint32(8).uint64(message.memberId);
    }
    if (message.guildId !== "0") {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.leaveReason !== 0) {
      writer.uint32(24).int32(message.leaveReason);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_MemberLeft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MemberLeft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.memberId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.guildId = longToString(reader.uint64() as Long);
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
      memberId: isSet(object.memberId) ? String(object.memberId) : "0",
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      leaveReason: isSet(object.leaveReason)
        ? leaveReasonFromJSON(object.leaveReason)
        : 0,
    };
  },

  toJSON(message: StreamEvent_MemberLeft): unknown {
    const obj: any = {};
    message.memberId !== undefined && (obj.memberId = message.memberId);
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.leaveReason !== undefined &&
      (obj.leaveReason = leaveReasonToJSON(message.leaveReason));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MemberLeft>, I>>(
    object: I
  ): StreamEvent_MemberLeft {
    const message = createBaseStreamEvent_MemberLeft();
    message.memberId = object.memberId ?? "0";
    message.guildId = object.guildId ?? "0";
    message.leaveReason = object.leaveReason ?? 0;
    return message;
  },
};

function createBaseStreamEvent_GuildAddedToList(): StreamEvent_GuildAddedToList {
  return { guildId: "0", homeserver: "" };
}

export const StreamEvent_GuildAddedToList = {
  encode(
    message: StreamEvent_GuildAddedToList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.homeserver !== "") {
      writer.uint32(18).string(message.homeserver);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_GuildAddedToList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_GuildAddedToList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      homeserver: isSet(object.homeserver) ? String(object.homeserver) : "",
    };
  },

  toJSON(message: StreamEvent_GuildAddedToList): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.homeserver !== undefined && (obj.homeserver = message.homeserver);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_GuildAddedToList>, I>>(
    object: I
  ): StreamEvent_GuildAddedToList {
    const message = createBaseStreamEvent_GuildAddedToList();
    message.guildId = object.guildId ?? "0";
    message.homeserver = object.homeserver ?? "";
    return message;
  },
};

function createBaseStreamEvent_GuildRemovedFromList(): StreamEvent_GuildRemovedFromList {
  return { guildId: "0", homeserver: "" };
}

export const StreamEvent_GuildRemovedFromList = {
  encode(
    message: StreamEvent_GuildRemovedFromList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.homeserver !== "") {
      writer.uint32(18).string(message.homeserver);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_GuildRemovedFromList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_GuildRemovedFromList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      homeserver: isSet(object.homeserver) ? String(object.homeserver) : "",
    };
  },

  toJSON(message: StreamEvent_GuildRemovedFromList): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.homeserver !== undefined && (obj.homeserver = message.homeserver);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamEvent_GuildRemovedFromList>, I>
  >(object: I): StreamEvent_GuildRemovedFromList {
    const message = createBaseStreamEvent_GuildRemovedFromList();
    message.guildId = object.guildId ?? "0";
    message.homeserver = object.homeserver ?? "";
    return message;
  },
};

function createBaseStreamEvent_ActionPerformed(): StreamEvent_ActionPerformed {
  return {
    guildId: "0",
    channelId: "0",
    messageId: "0",
    userId: "0",
    payload: undefined,
  };
}

export const StreamEvent_ActionPerformed = {
  encode(
    message: StreamEvent_ActionPerformed,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== "0") {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.userId !== "0") {
      writer.uint32(32).uint64(message.userId);
    }
    if (message.payload !== undefined) {
      ActionPayload.encode(message.payload, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_ActionPerformed {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ActionPerformed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.userId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      messageId: isSet(object.messageId) ? String(object.messageId) : "0",
      userId: isSet(object.userId) ? String(object.userId) : "0",
      payload: isSet(object.payload)
        ? ActionPayload.fromJSON(object.payload)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ActionPerformed): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
    message.userId !== undefined && (obj.userId = message.userId);
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
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.messageId = object.messageId ?? "0";
    message.userId = object.userId ?? "0";
    message.payload =
      object.payload !== undefined && object.payload !== null
        ? ActionPayload.fromPartial(object.payload)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_RoleMoved(): StreamEvent_RoleMoved {
  return { guildId: "0", roleId: "0", newPosition: undefined };
}

export const StreamEvent_RoleMoved = {
  encode(
    message: StreamEvent_RoleMoved,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== "0") {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_RoleMoved {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RoleMoved();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
      newPosition: isSet(object.newPosition)
        ? ItemPosition.fromJSON(object.newPosition)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_RoleMoved): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
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
    message.guildId = object.guildId ?? "0";
    message.roleId = object.roleId ?? "0";
    message.newPosition =
      object.newPosition !== undefined && object.newPosition !== null
        ? ItemPosition.fromPartial(object.newPosition)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_RoleDeleted(): StreamEvent_RoleDeleted {
  return { guildId: "0", roleId: "0" };
}

export const StreamEvent_RoleDeleted = {
  encode(
    message: StreamEvent_RoleDeleted,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== "0") {
      writer.uint32(16).uint64(message.roleId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_RoleDeleted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RoleDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
    };
  },

  toJSON(message: StreamEvent_RoleDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_RoleDeleted>, I>>(
    object: I
  ): StreamEvent_RoleDeleted {
    const message = createBaseStreamEvent_RoleDeleted();
    message.guildId = object.guildId ?? "0";
    message.roleId = object.roleId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_RoleCreated(): StreamEvent_RoleCreated {
  return {
    guildId: "0",
    roleId: "0",
    name: "",
    color: 0,
    hoist: false,
    pingable: false,
  };
}

export const StreamEvent_RoleCreated = {
  encode(
    message: StreamEvent_RoleCreated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== "0") {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_RoleCreated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RoleCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
      name: isSet(object.name) ? String(object.name) : "",
      color: isSet(object.color) ? Number(object.color) : 0,
      hoist: isSet(object.hoist) ? Boolean(object.hoist) : false,
      pingable: isSet(object.pingable) ? Boolean(object.pingable) : false,
    };
  },

  toJSON(message: StreamEvent_RoleCreated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
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
    message.guildId = object.guildId ?? "0";
    message.roleId = object.roleId ?? "0";
    message.name = object.name ?? "";
    message.color = object.color ?? 0;
    message.hoist = object.hoist ?? false;
    message.pingable = object.pingable ?? false;
    return message;
  },
};

function createBaseStreamEvent_RoleUpdated(): StreamEvent_RoleUpdated {
  return {
    guildId: "0",
    roleId: "0",
    newName: undefined,
    newColor: undefined,
    newHoist: undefined,
    newPingable: undefined,
  };
}

export const StreamEvent_RoleUpdated = {
  encode(
    message: StreamEvent_RoleUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== "0") {
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_RoleUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RoleUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
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
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
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
    message.guildId = object.guildId ?? "0";
    message.roleId = object.roleId ?? "0";
    message.newName = object.newName ?? undefined;
    message.newColor = object.newColor ?? undefined;
    message.newHoist = object.newHoist ?? undefined;
    message.newPingable = object.newPingable ?? undefined;
    return message;
  },
};

function createBaseStreamEvent_RolePermissionsUpdated(): StreamEvent_RolePermissionsUpdated {
  return { guildId: "0", channelId: undefined, roleId: "0", newPerms: [] };
}

export const StreamEvent_RolePermissionsUpdated = {
  encode(
    message: StreamEvent_RolePermissionsUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== undefined) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.roleId !== "0") {
      writer.uint32(24).uint64(message.roleId);
    }
    for (const v of message.newPerms) {
      Permission.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_RolePermissionsUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_RolePermissionsUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.roleId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : undefined,
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
      newPerms: Array.isArray(object?.newPerms)
        ? object.newPerms.map((e: any) => Permission.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StreamEvent_RolePermissionsUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
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
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? undefined;
    message.roleId = object.roleId ?? "0";
    message.newPerms =
      object.newPerms?.map((e) => Permission.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStreamEvent_UserRolesUpdated(): StreamEvent_UserRolesUpdated {
  return { guildId: "0", userId: "0", newRoleIds: [] };
}

export const StreamEvent_UserRolesUpdated = {
  encode(
    message: StreamEvent_UserRolesUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.userId !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_UserRolesUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_UserRolesUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.userId = longToString(reader.uint64() as Long);
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.newRoleIds.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.newRoleIds.push(longToString(reader.uint64() as Long));
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      userId: isSet(object.userId) ? String(object.userId) : "0",
      newRoleIds: Array.isArray(object?.newRoleIds)
        ? object.newRoleIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: StreamEvent_UserRolesUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.userId !== undefined && (obj.userId = message.userId);
    if (message.newRoleIds) {
      obj.newRoleIds = message.newRoleIds.map((e) => e);
    } else {
      obj.newRoleIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_UserRolesUpdated>, I>>(
    object: I
  ): StreamEvent_UserRolesUpdated {
    const message = createBaseStreamEvent_UserRolesUpdated();
    message.guildId = object.guildId ?? "0";
    message.userId = object.userId ?? "0";
    message.newRoleIds = object.newRoleIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseStreamEvent_Typing(): StreamEvent_Typing {
  return { userId: "0", guildId: "0", channelId: "0" };
}

export const StreamEvent_Typing = {
  encode(
    message: StreamEvent_Typing,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userId !== "0") {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.guildId !== "0") {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(24).uint64(message.channelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamEvent_Typing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_Typing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.channelId = longToString(reader.uint64() as Long);
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
      userId: isSet(object.userId) ? String(object.userId) : "0",
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
    };
  },

  toJSON(message: StreamEvent_Typing): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_Typing>, I>>(
    object: I
  ): StreamEvent_Typing {
    const message = createBaseStreamEvent_Typing();
    message.userId = object.userId ?? "0";
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_PermissionUpdated(): StreamEvent_PermissionUpdated {
  return { guildId: "0", channelId: undefined, query: "", ok: false };
}

export const StreamEvent_PermissionUpdated = {
  encode(
    message: StreamEvent_PermissionUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_PermissionUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_PermissionUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : undefined,
      query: isSet(object.query) ? String(object.query) : "",
      ok: isSet(object.ok) ? Boolean(object.ok) : false,
    };
  },

  toJSON(message: StreamEvent_PermissionUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.query !== undefined && (obj.query = message.query);
    message.ok !== undefined && (obj.ok = message.ok);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_PermissionUpdated>, I>>(
    object: I
  ): StreamEvent_PermissionUpdated {
    const message = createBaseStreamEvent_PermissionUpdated();
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? undefined;
    message.query = object.query ?? "";
    message.ok = object.ok ?? false;
    return message;
  },
};

function createBaseStreamEvent_MessagePinned(): StreamEvent_MessagePinned {
  return { guildId: "0", channelId: "0", messageId: "0" };
}

export const StreamEvent_MessagePinned = {
  encode(
    message: StreamEvent_MessagePinned,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== "0") {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessagePinned {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessagePinned();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      messageId: isSet(object.messageId) ? String(object.messageId) : "0",
    };
  },

  toJSON(message: StreamEvent_MessagePinned): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MessagePinned>, I>>(
    object: I
  ): StreamEvent_MessagePinned {
    const message = createBaseStreamEvent_MessagePinned();
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.messageId = object.messageId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_MessageUnpinned(): StreamEvent_MessageUnpinned {
  return { guildId: "0", channelId: "0", messageId: "0" };
}

export const StreamEvent_MessageUnpinned = {
  encode(
    message: StreamEvent_MessageUnpinned,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== "0") {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_MessageUnpinned {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_MessageUnpinned();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      messageId: isSet(object.messageId) ? String(object.messageId) : "0",
    };
  },

  toJSON(message: StreamEvent_MessageUnpinned): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_MessageUnpinned>, I>>(
    object: I
  ): StreamEvent_MessageUnpinned {
    const message = createBaseStreamEvent_MessageUnpinned();
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.messageId = object.messageId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_ReactionUpdated(): StreamEvent_ReactionUpdated {
  return { guildId: "0", channelId: "0", messageId: "0", reaction: undefined };
}

export const StreamEvent_ReactionUpdated = {
  encode(
    message: StreamEvent_ReactionUpdated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== "0") {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.reaction !== undefined) {
      Reaction.encode(message.reaction, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_ReactionUpdated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_ReactionUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
      messageId: isSet(object.messageId) ? String(object.messageId) : "0",
      reaction: isSet(object.reaction)
        ? Reaction.fromJSON(object.reaction)
        : undefined,
    };
  },

  toJSON(message: StreamEvent_ReactionUpdated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.messageId !== undefined && (obj.messageId = message.messageId);
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
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    message.messageId = object.messageId ?? "0";
    message.reaction =
      object.reaction !== undefined && object.reaction !== null
        ? Reaction.fromPartial(object.reaction)
        : undefined;
    return message;
  },
};

function createBaseStreamEvent_OwnerAdded(): StreamEvent_OwnerAdded {
  return { guildId: "0", userId: "0" };
}

export const StreamEvent_OwnerAdded = {
  encode(
    message: StreamEvent_OwnerAdded,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.userId !== "0") {
      writer.uint32(8).uint64(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_OwnerAdded {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_OwnerAdded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 1:
          message.userId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      userId: isSet(object.userId) ? String(object.userId) : "0",
    };
  },

  toJSON(message: StreamEvent_OwnerAdded): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_OwnerAdded>, I>>(
    object: I
  ): StreamEvent_OwnerAdded {
    const message = createBaseStreamEvent_OwnerAdded();
    message.guildId = object.guildId ?? "0";
    message.userId = object.userId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_OwnerRemoved(): StreamEvent_OwnerRemoved {
  return { guildId: "0", userId: "0" };
}

export const StreamEvent_OwnerRemoved = {
  encode(
    message: StreamEvent_OwnerRemoved,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(16).uint64(message.guildId);
    }
    if (message.userId !== "0") {
      writer.uint32(8).uint64(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_OwnerRemoved {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_OwnerRemoved();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 1:
          message.userId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      userId: isSet(object.userId) ? String(object.userId) : "0",
    };
  },

  toJSON(message: StreamEvent_OwnerRemoved): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_OwnerRemoved>, I>>(
    object: I
  ): StreamEvent_OwnerRemoved {
    const message = createBaseStreamEvent_OwnerRemoved();
    message.guildId = object.guildId ?? "0";
    message.userId = object.userId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_InviteReceived(): StreamEvent_InviteReceived {
  return { inviteId: "", serverId: undefined, inviterId: "0" };
}

export const StreamEvent_InviteReceived = {
  encode(
    message: StreamEvent_InviteReceived,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    if (message.serverId !== undefined) {
      writer.uint32(18).string(message.serverId);
    }
    if (message.inviterId !== "0") {
      writer.uint32(24).uint64(message.inviterId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteReceived {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
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
          message.inviterId = longToString(reader.uint64() as Long);
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
      inviterId: isSet(object.inviterId) ? String(object.inviterId) : "0",
    };
  },

  toJSON(message: StreamEvent_InviteReceived): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.serverId !== undefined && (obj.serverId = message.serverId);
    message.inviterId !== undefined && (obj.inviterId = message.inviterId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteReceived>, I>>(
    object: I
  ): StreamEvent_InviteReceived {
    const message = createBaseStreamEvent_InviteReceived();
    message.inviteId = object.inviteId ?? "";
    message.serverId = object.serverId ?? undefined;
    message.inviterId = object.inviterId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_InviteRejected(): StreamEvent_InviteRejected {
  return { guildId: "0", inviteId: "", userId: "0" };
}

export const StreamEvent_InviteRejected = {
  encode(
    message: StreamEvent_InviteRejected,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteId !== "") {
      writer.uint32(18).string(message.inviteId);
    }
    if (message.userId !== "0") {
      writer.uint32(24).uint64(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteRejected {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteRejected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.inviteId = reader.string();
          break;
        case 3:
          message.userId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "0",
    };
  },

  toJSON(message: StreamEvent_InviteRejected): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteRejected>, I>>(
    object: I
  ): StreamEvent_InviteRejected {
    const message = createBaseStreamEvent_InviteRejected();
    message.guildId = object.guildId ?? "0";
    message.inviteId = object.inviteId ?? "";
    message.userId = object.userId ?? "0";
    return message;
  },
};

function createBaseStreamEvent_InviteCreated(): StreamEvent_InviteCreated {
  return { guildId: "0", inviteId: "", possibleUses: 0 };
}

export const StreamEvent_InviteCreated = {
  encode(
    message: StreamEvent_InviteCreated,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
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
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteCreated {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      possibleUses: isSet(object.possibleUses)
        ? Number(object.possibleUses)
        : 0,
    };
  },

  toJSON(message: StreamEvent_InviteCreated): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.possibleUses !== undefined &&
      (obj.possibleUses = Math.round(message.possibleUses));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteCreated>, I>>(
    object: I
  ): StreamEvent_InviteCreated {
    const message = createBaseStreamEvent_InviteCreated();
    message.guildId = object.guildId ?? "0";
    message.inviteId = object.inviteId ?? "";
    message.possibleUses = object.possibleUses ?? 0;
    return message;
  },
};

function createBaseStreamEvent_InviteDeleted(): StreamEvent_InviteDeleted {
  return { guildId: "0", inviteId: "" };
}

export const StreamEvent_InviteDeleted = {
  encode(
    message: StreamEvent_InviteDeleted,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteId !== "") {
      writer.uint32(18).string(message.inviteId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteDeleted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
    };
  },

  toJSON(message: StreamEvent_InviteDeleted): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteDeleted>, I>>(
    object: I
  ): StreamEvent_InviteDeleted {
    const message = createBaseStreamEvent_InviteDeleted();
    message.guildId = object.guildId ?? "0";
    message.inviteId = object.inviteId ?? "";
    return message;
  },
};

function createBaseStreamEvent_InviteUsed(): StreamEvent_InviteUsed {
  return { guildId: "0", inviteId: "", userId: "0" };
}

export const StreamEvent_InviteUsed = {
  encode(
    message: StreamEvent_InviteUsed,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteId !== "") {
      writer.uint32(18).string(message.inviteId);
    }
    if (message.userId !== "0") {
      writer.uint32(24).uint64(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamEvent_InviteUsed {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamEvent_InviteUsed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.inviteId = reader.string();
          break;
        case 3:
          message.userId = longToString(reader.uint64() as Long);
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
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "0",
    };
  },

  toJSON(message: StreamEvent_InviteUsed): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent_InviteUsed>, I>>(
    object: I
  ): StreamEvent_InviteUsed {
    const message = createBaseStreamEvent_InviteUsed();
    message.guildId = object.guildId ?? "0";
    message.inviteId = object.inviteId ?? "";
    message.userId = object.userId ?? "0";
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
  : T extends { $case: string }
  ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & {
      $case: T["$case"];
    }
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
