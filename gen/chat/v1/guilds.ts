/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Metadata } from "../../harmonytypes/v1/types";

export const protobufPackage = "protocol.chat.v1";

/** A reason for why a user has left a guild. */
export enum LeaveReason {
  /** LEAVE_REASON_WILLINGLY_UNSPECIFIED - The user left the guild willingly. */
  LEAVE_REASON_WILLINGLY_UNSPECIFIED = 0,
  /** LEAVE_REASON_BANNED - The user was banned from the guild. */
  LEAVE_REASON_BANNED = 1,
  /** LEAVE_REASON_KICKED - The user was kicked from the guild. */
  LEAVE_REASON_KICKED = 2,
  UNRECOGNIZED = -1,
}

export function leaveReasonFromJSON(object: any): LeaveReason {
  switch (object) {
    case 0:
    case "LEAVE_REASON_WILLINGLY_UNSPECIFIED":
      return LeaveReason.LEAVE_REASON_WILLINGLY_UNSPECIFIED;
    case 1:
    case "LEAVE_REASON_BANNED":
      return LeaveReason.LEAVE_REASON_BANNED;
    case 2:
    case "LEAVE_REASON_KICKED":
      return LeaveReason.LEAVE_REASON_KICKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LeaveReason.UNRECOGNIZED;
  }
}

export function leaveReasonToJSON(object: LeaveReason): string {
  switch (object) {
    case LeaveReason.LEAVE_REASON_WILLINGLY_UNSPECIFIED:
      return "LEAVE_REASON_WILLINGLY_UNSPECIFIED";
    case LeaveReason.LEAVE_REASON_BANNED:
      return "LEAVE_REASON_BANNED";
    case LeaveReason.LEAVE_REASON_KICKED:
      return "LEAVE_REASON_KICKED";
    default:
      return "UNKNOWN";
  }
}

/** The kind of a guild. */
export interface GuildKind {
  kind?:
    | { $case: "normal"; normal: GuildKind_Normal }
    | { $case: "room"; room: GuildKind_Room }
    | { $case: "directMessage"; directMessage: GuildKind_DirectMessage };
}

/** A "normal" guild as in a guild that allows multiple channels. */
export interface GuildKind_Normal {}

/**
 * A "room" guild as in a guild that only has one channel.
 *
 * - Clients should not show a channel list for guilds of this type.
 */
export interface GuildKind_Room {}

/**
 * A "direct message" guild as in a guild that has at most two members,
 * and has only one channel.
 *
 * - Clients should not show a channel list for guilds of this type.
 * - Clients should show this guild in the guild list with the profile picture
 * and the username of the other user.
 * - Servers should "upgrade" this guild to a "room" guild if another
 * user joins the guild. A name should be crafted using the algorithm
 * described below:
 *   - Get at most 3 members' usernames, by their
 *   - Concat them with ", " as a seperator.
 */
export interface GuildKind_DirectMessage {
  /** Whether this direct message was rejected by the invitee or not. */
  rejected?: boolean;
}

/** Object representing a guild without the ID part. */
export interface Guild {
  /**
   * The name of the guild.
   *
   * This will be empty if the guild kind is "direct message". See
   * the documentation of "direct message" guild kind on how to display
   * a name for those guilds.
   */
  name?: string;
  /** The picture of the guild. This must be a file ID that points to an image. */
  picture?: string | undefined;
  /** User ID of the owners of the guild. */
  ownerIds?: number[];
  /** The kind of this guild. */
  kind?: GuildKind;
  /** Metadata of the guild. */
  metadata?: Metadata | undefined;
}

/** Object representing a guild with the ID part. */
export interface GuildWithId {
  /** The ID of the guild. */
  guildId?: number;
  /** The guild. */
  guild?: Guild;
}

/** Object representing an invite without the ID part. */
export interface Invite {
  /** Possible uses of this invite. A use of `0` means infinite uses. */
  possibleUses?: number;
  /** Total use count of this invite. */
  useCount?: number;
}

/** Invite with ID. */
export interface InviteWithId {
  /** ID of the invite. */
  inviteId?: string;
  /** The invite data. */
  invite?: Invite;
}

/** A pending invite. */
export interface PendingInvite {
  /** Invite ID of the invite. */
  inviteId?: string;
  /** Server ID of the server the inviter is on. */
  serverId?: string | undefined;
  /** User ID of the inviter. */
  inviterId?: number;
}

/** Object representing a guild list entry. */
export interface GuildListEntry {
  /** Guild ID of this guild entry. */
  guildId?: number;
  /** Server ID of the homeserver of this guild. */
  serverId?: string;
}

/** Request type used in `CreateGuild` endpoint. */
export interface CreateGuildRequest {
  /** The name of the guild. */
  name?: string;
  /** The picture file ID of the guild. */
  picture?: string | undefined;
  /** Metadata of the guild. */
  metadata?: Metadata | undefined;
}

/** Used in the `CreateGuild` endpoint. */
export interface CreateGuildResponse {
  /** Guild ID of the guild that was created. */
  guildId?: number;
}

/** Request type used in `CreateRoom` endpoint. */
export interface CreateRoomRequest {
  /** The name of the guild. */
  name?: string;
  /** The picture file ID of the guild. */
  picture?: string | undefined;
  /** Metadata of the guild. */
  metadata?: Metadata | undefined;
}

/** Used in the `CreateRoom` endpoint. */
export interface CreateRoomResponse {
  /** Guild ID of the guild that was created. */
  guildId?: number;
}

/** Used in the `CreateDirectMessage` endpoint. */
export interface CreateDirectMessageRequest {
  /** The user name of the user to DM with. */
  userName?: string;
  /**
   * The server ID of the server the user is on.
   *
   * Should be left unspecified if it's a user on the homeserver.
   */
  serverId?: string | undefined;
}

/** Used in the `CreateDirectMessage` endpoint. */
export interface CreateDirectMessageResponse {
  /** Guild ID of the just created "direct message" guild. */
  guildId?: number;
}

/** Used in the `CreateInvite` endpoint. */
export interface CreateInviteRequest {
  /** Guild ID of the guild to create an invite in. */
  guildId?: number;
  /** The name of the invite. */
  name?: string;
  /**
   * The possible uses of the invite.
   *
   * A possible use of `0` means that the invite can be used infinitely many times.
   */
  possibleUses?: number;
}

/** Used in the `CreateInvite` endpoint. */
export interface CreateInviteResponse {
  /** The invite ID of the invite that was created. */
  inviteId?: string;
}

/** Used in the `GetGuildList` endpoint. */
export interface GetGuildListRequest {}

/** Used in the `GetGuildList` endpoint. */
export interface GetGuildListResponse {
  /** Guild list returned by the server. */
  guilds?: GuildListEntry[];
}

/** Used in the `GetGuild` endpoint. */
export interface GetGuildRequest {
  /** Guild ID(s) to get information about. */
  guildIds?: number[];
}

/** Used in the `GetGuild` endpoint. */
export interface GetGuildResponse {
  /** The information(s) of the guild(s) requested. */
  guild?: { [key: number]: Guild };
}

export interface GetGuildResponse_GuildEntry {
  key: number;
  value?: Guild;
}

/** Used in the `GetGuildInvites` endpoint. */
export interface GetGuildInvitesRequest {
  /** Guild ID of the guild you want to get invites of. */
  guildId?: number;
}

/** Used in the `GetGuildInvites` endpoint. */
export interface GetGuildInvitesResponse {
  /** The invites of the guild, with IDs. */
  invites?: InviteWithId[];
}

/** Used in the `GetGuildMembers` endpoint. */
export interface GetGuildMembersRequest {
  /** Guild ID of the guild you want to get members of. */
  guildId?: number;
}

/** Used in the `GetGuildMembers` endpoint. */
export interface GetGuildMembersResponse {
  /** User IDs of all the guild members. */
  members?: number[];
}

/** Used in the `UpdateGuildInformation` endpoint. */
export interface UpdateGuildInformationRequest {
  /** Guild ID of the guild you want to update the information of. */
  guildId?: number;
  /** New name for the guild. */
  newName?: string | undefined;
  /** New picture for the guild. */
  newPicture?: string | undefined;
  /** New metadata for the guild. */
  newMetadata?: Metadata | undefined;
}

/** Used in the `UpdateGuildInformation` endpoint. */
export interface UpdateGuildInformationResponse {}

/** Used in the `UpgradeRoomToGuild` endpoint. */
export interface UpgradeRoomToGuildRequest {
  /** Guild ID of the "room" guild to upgrade to a "normal" guild. */
  guildId?: number;
}

/** Used in the `UpgradeRoomToGuild` endpoint. */
export interface UpgradeRoomToGuildResponse {}

/** Used in the `DeleteGuild` endpoint. */
export interface DeleteGuildRequest {
  /** Guild ID of the guild you want to delete. */
  guildId?: number;
}

/** Used in the `DeleteGuild` endpoint. */
export interface DeleteGuildResponse {}

/** Used in the `DeleteInvite` endpoint. */
export interface DeleteInviteRequest {
  /** Guild ID of the guild where the invite is located. */
  guildId?: number;
  /** Invite ID of the invite you want to delete. */
  inviteId?: string;
}

/** Used in the `DeleteInvite` endpoint. */
export interface DeleteInviteResponse {}

/** Used in the `JoinGuild` endpoint. */
export interface JoinGuildRequest {
  /** Invite ID of the guild you want to join. */
  inviteId?: string;
}

/** Used in the `JoinGuild` endpoint. */
export interface JoinGuildResponse {
  /** Guild ID of the guild you joined. */
  guildId?: number;
}

/** Used in the `PreviewGuild` endpoint. */
export interface PreviewGuildRequest {
  /** Invite ID of the guild you want to get information from. */
  inviteId?: string;
}

/** Used in the `PreviewGuild` endpoint. */
export interface PreviewGuildResponse {
  /** Name of the guild requested. */
  name?: string;
  /** Picture of the guild requested. */
  picture?: string | undefined;
  /** Member count of the guild requested. */
  memberCount?: number;
}

/** Used in the `LeaveGuild` endpoint. */
export interface LeaveGuildRequest {
  /** Guild ID of the guild you want to leave. */
  guildId?: number;
}

/** Used in the `LeaveGuild` endpoint. */
export interface LeaveGuildResponse {}

/** Used in `BanUser` endpoint. */
export interface BanUserRequest {
  /** The guild ID of the guild to ban the user from. */
  guildId?: number;
  /** The ID of the user to ban. */
  userId?: number;
}

/** Used in `BanUser` endpoint. */
export interface BanUserResponse {}

/** Used in `KickUser` endpoint. */
export interface KickUserRequest {
  /** The guild ID of the guild to kick the user from. */
  guildId?: number;
  /** The user ID of the user to kick. */
  userId?: number;
}

/** Used in `KickUser` endpoint. */
export interface KickUserResponse {}

/** Used in `UnbanUser` endpoint. */
export interface UnbanUserRequest {
  /** The guild ID of the guild to unban the user from. */
  guildId?: number;
  /** The user ID of the user to unban. */
  userId?: number;
}

/** Used in `UnbanUser` endpoint. */
export interface UnbanUserResponse {}

/** Used in `GetBannedUsers` endpoint. */
export interface GetBannedUsersRequest {
  /** Guild ID to get banned users for. */
  guildId?: number;
}

/** Used in `GetBannedUsers` endpoint. */
export interface GetBannedUsersResponse {
  /** The user IDs of banned users. */
  bannedUsers?: number[];
}

/** Request for GrantOwnership */
export interface GrantOwnershipRequest {
  /** Guild ID of the guild to give a user ownership on. */
  guildId?: number;
  /** The ID of the new owner to add. */
  newOwnerId?: number;
}

/** Response for GrantOwnership */
export interface GrantOwnershipResponse {}

/** Request for GiveUpOwnership */
export interface GiveUpOwnershipRequest {
  /** Guild ID to give up your ownership on. */
  guildId?: number;
}

/** Response for GiveUpOwnership */
export interface GiveUpOwnershipResponse {}

/** Used in `GetPendingInvites` endpoint. */
export interface GetPendingInvitesRequest {}

/** Used in `GetPendingInvites` endpoint. */
export interface GetPendingInvitesResponse {
  /** The pending invite(s). */
  pendingInvites?: PendingInvite[];
}

/** Used in `RejectPendingInvite` endpoint. */
export interface RejectPendingInviteRequest {
  /** Invite ID of the pending invite to reject. */
  inviteId?: string;
  /** Server ID of the pending invite to reject. */
  serverId?: string | undefined;
}

/** Used in `RejectPendingInvite` endpoint. */
export interface RejectPendingInviteResponse {}

/** Used in `IgnorePendingInvite` endpoint. */
export interface IgnorePendingInviteRequest {
  /** ID of the pending invite to ignore. */
  inviteId?: string;
  /** Server ID of the pending invite to reject. */
  serverId?: string | undefined;
}

/** Used in `IgnorePendingInvite` endpoint. */
export interface IgnorePendingInviteResponse {}

/** Used in `InviteUserToGuild` endpoint. */
export interface InviteUserToGuildRequest {
  /** User name of the user to invite. */
  userName?: string;
  /** Server ID of the user if they are on another server. */
  serverId?: string | undefined;
  /** Guild ID of the guild to invite to. */
  guildId?: number;
}

/** Used in `InviteUserToGuild` endpoint. */
export interface InviteUserToGuildResponse {}

function createBaseGuildKind(): GuildKind {
  return { kind: undefined };
}

export const GuildKind = {
  encode(message: GuildKind, writer: Writer = Writer.create()): Writer {
    if (message.kind?.$case === "normal") {
      GuildKind_Normal.encode(
        message.kind.normal,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.kind?.$case === "room") {
      GuildKind_Room.encode(
        message.kind.room,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.kind?.$case === "directMessage") {
      GuildKind_DirectMessage.encode(
        message.kind.directMessage,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GuildKind {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildKind();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = {
            $case: "normal",
            normal: GuildKind_Normal.decode(reader, reader.uint32()),
          };
          break;
        case 2:
          message.kind = {
            $case: "room",
            room: GuildKind_Room.decode(reader, reader.uint32()),
          };
          break;
        case 3:
          message.kind = {
            $case: "directMessage",
            directMessage: GuildKind_DirectMessage.decode(
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

  fromJSON(object: any): GuildKind {
    return {
      kind: isSet(object.normal)
        ? { $case: "normal", normal: GuildKind_Normal.fromJSON(object.normal) }
        : isSet(object.room)
        ? { $case: "room", room: GuildKind_Room.fromJSON(object.room) }
        : isSet(object.directMessage)
        ? {
            $case: "directMessage",
            directMessage: GuildKind_DirectMessage.fromJSON(
              object.directMessage
            ),
          }
        : undefined,
    };
  },

  toJSON(message: GuildKind): unknown {
    const obj: any = {};
    message.kind?.$case === "normal" &&
      (obj.normal = message.kind?.normal
        ? GuildKind_Normal.toJSON(message.kind?.normal)
        : undefined);
    message.kind?.$case === "room" &&
      (obj.room = message.kind?.room
        ? GuildKind_Room.toJSON(message.kind?.room)
        : undefined);
    message.kind?.$case === "directMessage" &&
      (obj.directMessage = message.kind?.directMessage
        ? GuildKind_DirectMessage.toJSON(message.kind?.directMessage)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GuildKind>, I>>(
    object: I
  ): GuildKind {
    const message = createBaseGuildKind();
    if (
      object.kind?.$case === "normal" &&
      object.kind?.normal !== undefined &&
      object.kind?.normal !== null
    ) {
      message.kind = {
        $case: "normal",
        normal: GuildKind_Normal.fromPartial(object.kind.normal),
      };
    }
    if (
      object.kind?.$case === "room" &&
      object.kind?.room !== undefined &&
      object.kind?.room !== null
    ) {
      message.kind = {
        $case: "room",
        room: GuildKind_Room.fromPartial(object.kind.room),
      };
    }
    if (
      object.kind?.$case === "directMessage" &&
      object.kind?.directMessage !== undefined &&
      object.kind?.directMessage !== null
    ) {
      message.kind = {
        $case: "directMessage",
        directMessage: GuildKind_DirectMessage.fromPartial(
          object.kind.directMessage
        ),
      };
    }
    return message;
  },
};

function createBaseGuildKind_Normal(): GuildKind_Normal {
  return {};
}

export const GuildKind_Normal = {
  encode(_: GuildKind_Normal, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GuildKind_Normal {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildKind_Normal();
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

  fromJSON(_: any): GuildKind_Normal {
    return {};
  },

  toJSON(_: GuildKind_Normal): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GuildKind_Normal>, I>>(
    _: I
  ): GuildKind_Normal {
    const message = createBaseGuildKind_Normal();
    return message;
  },
};

function createBaseGuildKind_Room(): GuildKind_Room {
  return {};
}

export const GuildKind_Room = {
  encode(_: GuildKind_Room, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GuildKind_Room {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildKind_Room();
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

  fromJSON(_: any): GuildKind_Room {
    return {};
  },

  toJSON(_: GuildKind_Room): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GuildKind_Room>, I>>(
    _: I
  ): GuildKind_Room {
    const message = createBaseGuildKind_Room();
    return message;
  },
};

function createBaseGuildKind_DirectMessage(): GuildKind_DirectMessage {
  return { rejected: false };
}

export const GuildKind_DirectMessage = {
  encode(
    message: GuildKind_DirectMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.rejected === true) {
      writer.uint32(8).bool(message.rejected);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GuildKind_DirectMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildKind_DirectMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rejected = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GuildKind_DirectMessage {
    return {
      rejected: isSet(object.rejected) ? Boolean(object.rejected) : false,
    };
  },

  toJSON(message: GuildKind_DirectMessage): unknown {
    const obj: any = {};
    message.rejected !== undefined && (obj.rejected = message.rejected);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GuildKind_DirectMessage>, I>>(
    object: I
  ): GuildKind_DirectMessage {
    const message = createBaseGuildKind_DirectMessage();
    message.rejected = object.rejected ?? false;
    return message;
  },
};

function createBaseGuild(): Guild {
  return {
    name: "",
    picture: undefined,
    ownerIds: [],
    kind: undefined,
    metadata: undefined,
  };
}

export const Guild = {
  encode(message: Guild, writer: Writer = Writer.create()): Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.picture !== undefined) {
      writer.uint32(18).string(message.picture);
    }
    if (message.ownerIds !== undefined && message.ownerIds.length !== 0) {
      writer.uint32(26).fork();
      for (const v of message.ownerIds) {
        writer.uint64(v);
      }
      writer.ldelim();
    }
    if (message.kind !== undefined) {
      GuildKind.encode(message.kind, writer.uint32(34).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Guild {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.picture = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ownerIds!.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.ownerIds!.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 4:
          message.kind = GuildKind.decode(reader, reader.uint32());
          break;
        case 5:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Guild {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      picture: isSet(object.picture) ? String(object.picture) : undefined,
      ownerIds: Array.isArray(object?.ownerIds)
        ? object.ownerIds.map((e: any) => Number(e))
        : [],
      kind: isSet(object.kind) ? GuildKind.fromJSON(object.kind) : undefined,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: Guild): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.picture !== undefined && (obj.picture = message.picture);
    if (message.ownerIds) {
      obj.ownerIds = message.ownerIds.map((e) => Math.round(e));
    } else {
      obj.ownerIds = [];
    }
    message.kind !== undefined &&
      (obj.kind = message.kind ? GuildKind.toJSON(message.kind) : undefined);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Guild>, I>>(object: I): Guild {
    const message = createBaseGuild();
    message.name = object.name ?? "";
    message.picture = object.picture ?? undefined;
    message.ownerIds = object.ownerIds?.map((e) => e) || [];
    message.kind =
      object.kind !== undefined && object.kind !== null
        ? GuildKind.fromPartial(object.kind)
        : undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseGuildWithId(): GuildWithId {
  return { guildId: 0, guild: undefined };
}

export const GuildWithId = {
  encode(message: GuildWithId, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.guild !== undefined) {
      Guild.encode(message.guild, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GuildWithId {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildWithId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.guild = Guild.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GuildWithId {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      guild: isSet(object.guild) ? Guild.fromJSON(object.guild) : undefined,
    };
  },

  toJSON(message: GuildWithId): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.guild !== undefined &&
      (obj.guild = message.guild ? Guild.toJSON(message.guild) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GuildWithId>, I>>(
    object: I
  ): GuildWithId {
    const message = createBaseGuildWithId();
    message.guildId = object.guildId ?? 0;
    message.guild =
      object.guild !== undefined && object.guild !== null
        ? Guild.fromPartial(object.guild)
        : undefined;
    return message;
  },
};

function createBaseInvite(): Invite {
  return { possibleUses: 0, useCount: 0 };
}

export const Invite = {
  encode(message: Invite, writer: Writer = Writer.create()): Writer {
    if (message.possibleUses !== undefined && message.possibleUses !== 0) {
      writer.uint32(8).uint32(message.possibleUses);
    }
    if (message.useCount !== undefined && message.useCount !== 0) {
      writer.uint32(16).uint32(message.useCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Invite {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvite();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.possibleUses = reader.uint32();
          break;
        case 2:
          message.useCount = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Invite {
    return {
      possibleUses: isSet(object.possibleUses)
        ? Number(object.possibleUses)
        : 0,
      useCount: isSet(object.useCount) ? Number(object.useCount) : 0,
    };
  },

  toJSON(message: Invite): unknown {
    const obj: any = {};
    message.possibleUses !== undefined &&
      (obj.possibleUses = Math.round(message.possibleUses));
    message.useCount !== undefined &&
      (obj.useCount = Math.round(message.useCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Invite>, I>>(object: I): Invite {
    const message = createBaseInvite();
    message.possibleUses = object.possibleUses ?? 0;
    message.useCount = object.useCount ?? 0;
    return message;
  },
};

function createBaseInviteWithId(): InviteWithId {
  return { inviteId: "", invite: undefined };
}

export const InviteWithId = {
  encode(message: InviteWithId, writer: Writer = Writer.create()): Writer {
    if (message.inviteId !== undefined && message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    if (message.invite !== undefined) {
      Invite.encode(message.invite, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): InviteWithId {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteWithId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteId = reader.string();
          break;
        case 2:
          message.invite = Invite.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InviteWithId {
    return {
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      invite: isSet(object.invite) ? Invite.fromJSON(object.invite) : undefined,
    };
  },

  toJSON(message: InviteWithId): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.invite !== undefined &&
      (obj.invite = message.invite ? Invite.toJSON(message.invite) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InviteWithId>, I>>(
    object: I
  ): InviteWithId {
    const message = createBaseInviteWithId();
    message.inviteId = object.inviteId ?? "";
    message.invite =
      object.invite !== undefined && object.invite !== null
        ? Invite.fromPartial(object.invite)
        : undefined;
    return message;
  },
};

function createBasePendingInvite(): PendingInvite {
  return { inviteId: "", serverId: undefined, inviterId: 0 };
}

export const PendingInvite = {
  encode(message: PendingInvite, writer: Writer = Writer.create()): Writer {
    if (message.inviteId !== undefined && message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    if (message.serverId !== undefined) {
      writer.uint32(18).string(message.serverId);
    }
    if (message.inviterId !== undefined && message.inviterId !== 0) {
      writer.uint32(24).uint64(message.inviterId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PendingInvite {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingInvite();
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

  fromJSON(object: any): PendingInvite {
    return {
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      serverId: isSet(object.serverId) ? String(object.serverId) : undefined,
      inviterId: isSet(object.inviterId) ? Number(object.inviterId) : 0,
    };
  },

  toJSON(message: PendingInvite): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.serverId !== undefined && (obj.serverId = message.serverId);
    message.inviterId !== undefined &&
      (obj.inviterId = Math.round(message.inviterId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PendingInvite>, I>>(
    object: I
  ): PendingInvite {
    const message = createBasePendingInvite();
    message.inviteId = object.inviteId ?? "";
    message.serverId = object.serverId ?? undefined;
    message.inviterId = object.inviterId ?? 0;
    return message;
  },
};

function createBaseGuildListEntry(): GuildListEntry {
  return { guildId: 0, serverId: "" };
}

export const GuildListEntry = {
  encode(message: GuildListEntry, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.serverId !== undefined && message.serverId !== "") {
      writer.uint32(18).string(message.serverId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GuildListEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuildListEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.serverId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GuildListEntry {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      serverId: isSet(object.serverId) ? String(object.serverId) : "",
    };
  },

  toJSON(message: GuildListEntry): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.serverId !== undefined && (obj.serverId = message.serverId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GuildListEntry>, I>>(
    object: I
  ): GuildListEntry {
    const message = createBaseGuildListEntry();
    message.guildId = object.guildId ?? 0;
    message.serverId = object.serverId ?? "";
    return message;
  },
};

function createBaseCreateGuildRequest(): CreateGuildRequest {
  return { name: "", picture: undefined, metadata: undefined };
}

export const CreateGuildRequest = {
  encode(
    message: CreateGuildRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.picture !== undefined) {
      writer.uint32(18).string(message.picture);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateGuildRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateGuildRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.picture = reader.string();
          break;
        case 3:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateGuildRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      picture: isSet(object.picture) ? String(object.picture) : undefined,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: CreateGuildRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.picture !== undefined && (obj.picture = message.picture);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateGuildRequest>, I>>(
    object: I
  ): CreateGuildRequest {
    const message = createBaseCreateGuildRequest();
    message.name = object.name ?? "";
    message.picture = object.picture ?? undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseCreateGuildResponse(): CreateGuildResponse {
  return { guildId: 0 };
}

export const CreateGuildResponse = {
  encode(
    message: CreateGuildResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateGuildResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateGuildResponse();
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

  fromJSON(object: any): CreateGuildResponse {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: CreateGuildResponse): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateGuildResponse>, I>>(
    object: I
  ): CreateGuildResponse {
    const message = createBaseCreateGuildResponse();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseCreateRoomRequest(): CreateRoomRequest {
  return { name: "", picture: undefined, metadata: undefined };
}

export const CreateRoomRequest = {
  encode(message: CreateRoomRequest, writer: Writer = Writer.create()): Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.picture !== undefined) {
      writer.uint32(18).string(message.picture);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateRoomRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRoomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.picture = reader.string();
          break;
        case 3:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateRoomRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      picture: isSet(object.picture) ? String(object.picture) : undefined,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: CreateRoomRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.picture !== undefined && (obj.picture = message.picture);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateRoomRequest>, I>>(
    object: I
  ): CreateRoomRequest {
    const message = createBaseCreateRoomRequest();
    message.name = object.name ?? "";
    message.picture = object.picture ?? undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseCreateRoomResponse(): CreateRoomResponse {
  return { guildId: 0 };
}

export const CreateRoomResponse = {
  encode(
    message: CreateRoomResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateRoomResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRoomResponse();
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

  fromJSON(object: any): CreateRoomResponse {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: CreateRoomResponse): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateRoomResponse>, I>>(
    object: I
  ): CreateRoomResponse {
    const message = createBaseCreateRoomResponse();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseCreateDirectMessageRequest(): CreateDirectMessageRequest {
  return { userName: "", serverId: undefined };
}

export const CreateDirectMessageRequest = {
  encode(
    message: CreateDirectMessageRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userName !== undefined && message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    if (message.serverId !== undefined) {
      writer.uint32(18).string(message.serverId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): CreateDirectMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateDirectMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userName = reader.string();
          break;
        case 2:
          message.serverId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateDirectMessageRequest {
    return {
      userName: isSet(object.userName) ? String(object.userName) : "",
      serverId: isSet(object.serverId) ? String(object.serverId) : undefined,
    };
  },

  toJSON(message: CreateDirectMessageRequest): unknown {
    const obj: any = {};
    message.userName !== undefined && (obj.userName = message.userName);
    message.serverId !== undefined && (obj.serverId = message.serverId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateDirectMessageRequest>, I>>(
    object: I
  ): CreateDirectMessageRequest {
    const message = createBaseCreateDirectMessageRequest();
    message.userName = object.userName ?? "";
    message.serverId = object.serverId ?? undefined;
    return message;
  },
};

function createBaseCreateDirectMessageResponse(): CreateDirectMessageResponse {
  return { guildId: 0 };
}

export const CreateDirectMessageResponse = {
  encode(
    message: CreateDirectMessageResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): CreateDirectMessageResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateDirectMessageResponse();
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

  fromJSON(object: any): CreateDirectMessageResponse {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: CreateDirectMessageResponse): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateDirectMessageResponse>, I>>(
    object: I
  ): CreateDirectMessageResponse {
    const message = createBaseCreateDirectMessageResponse();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseCreateInviteRequest(): CreateInviteRequest {
  return { guildId: 0, name: "", possibleUses: 0 };
}

export const CreateInviteRequest = {
  encode(
    message: CreateInviteRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.possibleUses !== undefined && message.possibleUses !== 0) {
      writer.uint32(24).uint32(message.possibleUses);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateInviteRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInviteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.name = reader.string();
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

  fromJSON(object: any): CreateInviteRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
      possibleUses: isSet(object.possibleUses)
        ? Number(object.possibleUses)
        : 0,
    };
  },

  toJSON(message: CreateInviteRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.name !== undefined && (obj.name = message.name);
    message.possibleUses !== undefined &&
      (obj.possibleUses = Math.round(message.possibleUses));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateInviteRequest>, I>>(
    object: I
  ): CreateInviteRequest {
    const message = createBaseCreateInviteRequest();
    message.guildId = object.guildId ?? 0;
    message.name = object.name ?? "";
    message.possibleUses = object.possibleUses ?? 0;
    return message;
  },
};

function createBaseCreateInviteResponse(): CreateInviteResponse {
  return { inviteId: "" };
}

export const CreateInviteResponse = {
  encode(
    message: CreateInviteResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.inviteId !== undefined && message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateInviteResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInviteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateInviteResponse {
    return {
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
    };
  },

  toJSON(message: CreateInviteResponse): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateInviteResponse>, I>>(
    object: I
  ): CreateInviteResponse {
    const message = createBaseCreateInviteResponse();
    message.inviteId = object.inviteId ?? "";
    return message;
  },
};

function createBaseGetGuildListRequest(): GetGuildListRequest {
  return {};
}

export const GetGuildListRequest = {
  encode(_: GetGuildListRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildListRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildListRequest();
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

  fromJSON(_: any): GetGuildListRequest {
    return {};
  },

  toJSON(_: GetGuildListRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildListRequest>, I>>(
    _: I
  ): GetGuildListRequest {
    const message = createBaseGetGuildListRequest();
    return message;
  },
};

function createBaseGetGuildListResponse(): GetGuildListResponse {
  return { guilds: [] };
}

export const GetGuildListResponse = {
  encode(
    message: GetGuildListResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guilds !== undefined && message.guilds.length !== 0) {
      for (const v of message.guilds) {
        GuildListEntry.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildListResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guilds!.push(GuildListEntry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildListResponse {
    return {
      guilds: Array.isArray(object?.guilds)
        ? object.guilds.map((e: any) => GuildListEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetGuildListResponse): unknown {
    const obj: any = {};
    if (message.guilds) {
      obj.guilds = message.guilds.map((e) =>
        e ? GuildListEntry.toJSON(e) : undefined
      );
    } else {
      obj.guilds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildListResponse>, I>>(
    object: I
  ): GetGuildListResponse {
    const message = createBaseGetGuildListResponse();
    message.guilds =
      object.guilds?.map((e) => GuildListEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetGuildRequest(): GetGuildRequest {
  return { guildIds: [] };
}

export const GetGuildRequest = {
  encode(message: GetGuildRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildIds !== undefined && message.guildIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.guildIds) {
        writer.uint64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.guildIds!.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.guildIds!.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildRequest {
    return {
      guildIds: Array.isArray(object?.guildIds)
        ? object.guildIds.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: GetGuildRequest): unknown {
    const obj: any = {};
    if (message.guildIds) {
      obj.guildIds = message.guildIds.map((e) => Math.round(e));
    } else {
      obj.guildIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildRequest>, I>>(
    object: I
  ): GetGuildRequest {
    const message = createBaseGetGuildRequest();
    message.guildIds = object.guildIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetGuildResponse(): GetGuildResponse {
  return { guild: {} };
}

export const GetGuildResponse = {
  encode(message: GetGuildResponse, writer: Writer = Writer.create()): Writer {
    Object.entries(message.guild || {}).forEach(([key, value]) => {
      GetGuildResponse_GuildEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GetGuildResponse_GuildEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.guild![entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildResponse {
    return {
      guild: isObject(object.guild)
        ? Object.entries(object.guild).reduce<{ [key: number]: Guild }>(
            (acc, [key, value]) => {
              acc[Number(key)] = Guild.fromJSON(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: GetGuildResponse): unknown {
    const obj: any = {};
    obj.guild = {};
    if (message.guild) {
      Object.entries(message.guild).forEach(([k, v]) => {
        obj.guild[k] = Guild.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildResponse>, I>>(
    object: I
  ): GetGuildResponse {
    const message = createBaseGetGuildResponse();
    message.guild = Object.entries(object.guild ?? {}).reduce<{
      [key: number]: Guild;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] = Guild.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetGuildResponse_GuildEntry(): GetGuildResponse_GuildEntry {
  return { key: 0, value: undefined };
}

export const GetGuildResponse_GuildEntry = {
  encode(
    message: GetGuildResponse_GuildEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== 0) {
      writer.uint32(8).uint64(message.key);
    }
    if (message.value !== undefined) {
      Guild.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetGuildResponse_GuildEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildResponse_GuildEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.value = Guild.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildResponse_GuildEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? Guild.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GetGuildResponse_GuildEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined &&
      (obj.value = message.value ? Guild.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildResponse_GuildEntry>, I>>(
    object: I
  ): GetGuildResponse_GuildEntry {
    const message = createBaseGetGuildResponse_GuildEntry();
    message.key = object.key ?? 0;
    message.value =
      object.value !== undefined && object.value !== null
        ? Guild.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseGetGuildInvitesRequest(): GetGuildInvitesRequest {
  return { guildId: 0 };
}

export const GetGuildInvitesRequest = {
  encode(
    message: GetGuildInvitesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildInvitesRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildInvitesRequest();
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

  fromJSON(object: any): GetGuildInvitesRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: GetGuildInvitesRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildInvitesRequest>, I>>(
    object: I
  ): GetGuildInvitesRequest {
    const message = createBaseGetGuildInvitesRequest();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseGetGuildInvitesResponse(): GetGuildInvitesResponse {
  return { invites: [] };
}

export const GetGuildInvitesResponse = {
  encode(
    message: GetGuildInvitesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.invites !== undefined && message.invites.length !== 0) {
      for (const v of message.invites) {
        InviteWithId.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildInvitesResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildInvitesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.invites!.push(InviteWithId.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildInvitesResponse {
    return {
      invites: Array.isArray(object?.invites)
        ? object.invites.map((e: any) => InviteWithId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetGuildInvitesResponse): unknown {
    const obj: any = {};
    if (message.invites) {
      obj.invites = message.invites.map((e) =>
        e ? InviteWithId.toJSON(e) : undefined
      );
    } else {
      obj.invites = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildInvitesResponse>, I>>(
    object: I
  ): GetGuildInvitesResponse {
    const message = createBaseGetGuildInvitesResponse();
    message.invites =
      object.invites?.map((e) => InviteWithId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetGuildMembersRequest(): GetGuildMembersRequest {
  return { guildId: 0 };
}

export const GetGuildMembersRequest = {
  encode(
    message: GetGuildMembersRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildMembersRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildMembersRequest();
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

  fromJSON(object: any): GetGuildMembersRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: GetGuildMembersRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildMembersRequest>, I>>(
    object: I
  ): GetGuildMembersRequest {
    const message = createBaseGetGuildMembersRequest();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseGetGuildMembersResponse(): GetGuildMembersResponse {
  return { members: [] };
}

export const GetGuildMembersResponse = {
  encode(
    message: GetGuildMembersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.members !== undefined && message.members.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.members) {
        writer.uint64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildMembersResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildMembersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.members!.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.members!.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildMembersResponse {
    return {
      members: Array.isArray(object?.members)
        ? object.members.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: GetGuildMembersResponse): unknown {
    const obj: any = {};
    if (message.members) {
      obj.members = message.members.map((e) => Math.round(e));
    } else {
      obj.members = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildMembersResponse>, I>>(
    object: I
  ): GetGuildMembersResponse {
    const message = createBaseGetGuildMembersResponse();
    message.members = object.members?.map((e) => e) || [];
    return message;
  },
};

function createBaseUpdateGuildInformationRequest(): UpdateGuildInformationRequest {
  return {
    guildId: 0,
    newName: undefined,
    newPicture: undefined,
    newMetadata: undefined,
  };
}

export const UpdateGuildInformationRequest = {
  encode(
    message: UpdateGuildInformationRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
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
  ): UpdateGuildInformationRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateGuildInformationRequest();
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

  fromJSON(object: any): UpdateGuildInformationRequest {
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

  toJSON(message: UpdateGuildInformationRequest): unknown {
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

  fromPartial<I extends Exact<DeepPartial<UpdateGuildInformationRequest>, I>>(
    object: I
  ): UpdateGuildInformationRequest {
    const message = createBaseUpdateGuildInformationRequest();
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

function createBaseUpdateGuildInformationResponse(): UpdateGuildInformationResponse {
  return {};
}

export const UpdateGuildInformationResponse = {
  encode(
    _: UpdateGuildInformationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpdateGuildInformationResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateGuildInformationResponse();
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

  fromJSON(_: any): UpdateGuildInformationResponse {
    return {};
  },

  toJSON(_: UpdateGuildInformationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateGuildInformationResponse>, I>>(
    _: I
  ): UpdateGuildInformationResponse {
    const message = createBaseUpdateGuildInformationResponse();
    return message;
  },
};

function createBaseUpgradeRoomToGuildRequest(): UpgradeRoomToGuildRequest {
  return { guildId: 0 };
}

export const UpgradeRoomToGuildRequest = {
  encode(
    message: UpgradeRoomToGuildRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpgradeRoomToGuildRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpgradeRoomToGuildRequest();
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

  fromJSON(object: any): UpgradeRoomToGuildRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: UpgradeRoomToGuildRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpgradeRoomToGuildRequest>, I>>(
    object: I
  ): UpgradeRoomToGuildRequest {
    const message = createBaseUpgradeRoomToGuildRequest();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseUpgradeRoomToGuildResponse(): UpgradeRoomToGuildResponse {
  return {};
}

export const UpgradeRoomToGuildResponse = {
  encode(
    _: UpgradeRoomToGuildResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpgradeRoomToGuildResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpgradeRoomToGuildResponse();
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

  fromJSON(_: any): UpgradeRoomToGuildResponse {
    return {};
  },

  toJSON(_: UpgradeRoomToGuildResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpgradeRoomToGuildResponse>, I>>(
    _: I
  ): UpgradeRoomToGuildResponse {
    const message = createBaseUpgradeRoomToGuildResponse();
    return message;
  },
};

function createBaseDeleteGuildRequest(): DeleteGuildRequest {
  return { guildId: 0 };
}

export const DeleteGuildRequest = {
  encode(
    message: DeleteGuildRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteGuildRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteGuildRequest();
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

  fromJSON(object: any): DeleteGuildRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: DeleteGuildRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteGuildRequest>, I>>(
    object: I
  ): DeleteGuildRequest {
    const message = createBaseDeleteGuildRequest();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseDeleteGuildResponse(): DeleteGuildResponse {
  return {};
}

export const DeleteGuildResponse = {
  encode(_: DeleteGuildResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteGuildResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteGuildResponse();
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

  fromJSON(_: any): DeleteGuildResponse {
    return {};
  },

  toJSON(_: DeleteGuildResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteGuildResponse>, I>>(
    _: I
  ): DeleteGuildResponse {
    const message = createBaseDeleteGuildResponse();
    return message;
  },
};

function createBaseDeleteInviteRequest(): DeleteInviteRequest {
  return { guildId: 0, inviteId: "" };
}

export const DeleteInviteRequest = {
  encode(
    message: DeleteInviteRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteId !== undefined && message.inviteId !== "") {
      writer.uint32(18).string(message.inviteId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteInviteRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteInviteRequest();
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

  fromJSON(object: any): DeleteInviteRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
    };
  },

  toJSON(message: DeleteInviteRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteInviteRequest>, I>>(
    object: I
  ): DeleteInviteRequest {
    const message = createBaseDeleteInviteRequest();
    message.guildId = object.guildId ?? 0;
    message.inviteId = object.inviteId ?? "";
    return message;
  },
};

function createBaseDeleteInviteResponse(): DeleteInviteResponse {
  return {};
}

export const DeleteInviteResponse = {
  encode(_: DeleteInviteResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteInviteResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteInviteResponse();
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

  fromJSON(_: any): DeleteInviteResponse {
    return {};
  },

  toJSON(_: DeleteInviteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteInviteResponse>, I>>(
    _: I
  ): DeleteInviteResponse {
    const message = createBaseDeleteInviteResponse();
    return message;
  },
};

function createBaseJoinGuildRequest(): JoinGuildRequest {
  return { inviteId: "" };
}

export const JoinGuildRequest = {
  encode(message: JoinGuildRequest, writer: Writer = Writer.create()): Writer {
    if (message.inviteId !== undefined && message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): JoinGuildRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinGuildRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): JoinGuildRequest {
    return {
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
    };
  },

  toJSON(message: JoinGuildRequest): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinGuildRequest>, I>>(
    object: I
  ): JoinGuildRequest {
    const message = createBaseJoinGuildRequest();
    message.inviteId = object.inviteId ?? "";
    return message;
  },
};

function createBaseJoinGuildResponse(): JoinGuildResponse {
  return { guildId: 0 };
}

export const JoinGuildResponse = {
  encode(message: JoinGuildResponse, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): JoinGuildResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinGuildResponse();
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

  fromJSON(object: any): JoinGuildResponse {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: JoinGuildResponse): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<JoinGuildResponse>, I>>(
    object: I
  ): JoinGuildResponse {
    const message = createBaseJoinGuildResponse();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBasePreviewGuildRequest(): PreviewGuildRequest {
  return { inviteId: "" };
}

export const PreviewGuildRequest = {
  encode(
    message: PreviewGuildRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.inviteId !== undefined && message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PreviewGuildRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewGuildRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewGuildRequest {
    return {
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
    };
  },

  toJSON(message: PreviewGuildRequest): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PreviewGuildRequest>, I>>(
    object: I
  ): PreviewGuildRequest {
    const message = createBasePreviewGuildRequest();
    message.inviteId = object.inviteId ?? "";
    return message;
  },
};

function createBasePreviewGuildResponse(): PreviewGuildResponse {
  return { name: "", picture: undefined, memberCount: 0 };
}

export const PreviewGuildResponse = {
  encode(
    message: PreviewGuildResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.picture !== undefined) {
      writer.uint32(18).string(message.picture);
    }
    if (message.memberCount !== undefined && message.memberCount !== 0) {
      writer.uint32(24).uint64(message.memberCount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PreviewGuildResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePreviewGuildResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.picture = reader.string();
          break;
        case 3:
          message.memberCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PreviewGuildResponse {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      picture: isSet(object.picture) ? String(object.picture) : undefined,
      memberCount: isSet(object.memberCount) ? Number(object.memberCount) : 0,
    };
  },

  toJSON(message: PreviewGuildResponse): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.picture !== undefined && (obj.picture = message.picture);
    message.memberCount !== undefined &&
      (obj.memberCount = Math.round(message.memberCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PreviewGuildResponse>, I>>(
    object: I
  ): PreviewGuildResponse {
    const message = createBasePreviewGuildResponse();
    message.name = object.name ?? "";
    message.picture = object.picture ?? undefined;
    message.memberCount = object.memberCount ?? 0;
    return message;
  },
};

function createBaseLeaveGuildRequest(): LeaveGuildRequest {
  return { guildId: 0 };
}

export const LeaveGuildRequest = {
  encode(message: LeaveGuildRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LeaveGuildRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaveGuildRequest();
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

  fromJSON(object: any): LeaveGuildRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: LeaveGuildRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LeaveGuildRequest>, I>>(
    object: I
  ): LeaveGuildRequest {
    const message = createBaseLeaveGuildRequest();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseLeaveGuildResponse(): LeaveGuildResponse {
  return {};
}

export const LeaveGuildResponse = {
  encode(_: LeaveGuildResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LeaveGuildResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaveGuildResponse();
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

  fromJSON(_: any): LeaveGuildResponse {
    return {};
  },

  toJSON(_: LeaveGuildResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LeaveGuildResponse>, I>>(
    _: I
  ): LeaveGuildResponse {
    const message = createBaseLeaveGuildResponse();
    return message;
  },
};

function createBaseBanUserRequest(): BanUserRequest {
  return { guildId: 0, userId: 0 };
}

export const BanUserRequest = {
  encode(message: BanUserRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.userId !== undefined && message.userId !== 0) {
      writer.uint32(16).uint64(message.userId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BanUserRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBanUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BanUserRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: BanUserRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BanUserRequest>, I>>(
    object: I
  ): BanUserRequest {
    const message = createBaseBanUserRequest();
    message.guildId = object.guildId ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseBanUserResponse(): BanUserResponse {
  return {};
}

export const BanUserResponse = {
  encode(_: BanUserResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BanUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBanUserResponse();
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

  fromJSON(_: any): BanUserResponse {
    return {};
  },

  toJSON(_: BanUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BanUserResponse>, I>>(
    _: I
  ): BanUserResponse {
    const message = createBaseBanUserResponse();
    return message;
  },
};

function createBaseKickUserRequest(): KickUserRequest {
  return { guildId: 0, userId: 0 };
}

export const KickUserRequest = {
  encode(message: KickUserRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.userId !== undefined && message.userId !== 0) {
      writer.uint32(16).uint64(message.userId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): KickUserRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKickUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KickUserRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: KickUserRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KickUserRequest>, I>>(
    object: I
  ): KickUserRequest {
    const message = createBaseKickUserRequest();
    message.guildId = object.guildId ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseKickUserResponse(): KickUserResponse {
  return {};
}

export const KickUserResponse = {
  encode(_: KickUserResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): KickUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKickUserResponse();
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

  fromJSON(_: any): KickUserResponse {
    return {};
  },

  toJSON(_: KickUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KickUserResponse>, I>>(
    _: I
  ): KickUserResponse {
    const message = createBaseKickUserResponse();
    return message;
  },
};

function createBaseUnbanUserRequest(): UnbanUserRequest {
  return { guildId: 0, userId: 0 };
}

export const UnbanUserRequest = {
  encode(message: UnbanUserRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.userId !== undefined && message.userId !== 0) {
      writer.uint32(16).uint64(message.userId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UnbanUserRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbanUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnbanUserRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: UnbanUserRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnbanUserRequest>, I>>(
    object: I
  ): UnbanUserRequest {
    const message = createBaseUnbanUserRequest();
    message.guildId = object.guildId ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseUnbanUserResponse(): UnbanUserResponse {
  return {};
}

export const UnbanUserResponse = {
  encode(_: UnbanUserResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UnbanUserResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbanUserResponse();
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

  fromJSON(_: any): UnbanUserResponse {
    return {};
  },

  toJSON(_: UnbanUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnbanUserResponse>, I>>(
    _: I
  ): UnbanUserResponse {
    const message = createBaseUnbanUserResponse();
    return message;
  },
};

function createBaseGetBannedUsersRequest(): GetBannedUsersRequest {
  return { guildId: 0 };
}

export const GetBannedUsersRequest = {
  encode(
    message: GetBannedUsersRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetBannedUsersRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBannedUsersRequest();
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

  fromJSON(object: any): GetBannedUsersRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: GetBannedUsersRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBannedUsersRequest>, I>>(
    object: I
  ): GetBannedUsersRequest {
    const message = createBaseGetBannedUsersRequest();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseGetBannedUsersResponse(): GetBannedUsersResponse {
  return { bannedUsers: [] };
}

export const GetBannedUsersResponse = {
  encode(
    message: GetBannedUsersResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.bannedUsers !== undefined && message.bannedUsers.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.bannedUsers) {
        writer.uint64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetBannedUsersResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBannedUsersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.bannedUsers!.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.bannedUsers!.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBannedUsersResponse {
    return {
      bannedUsers: Array.isArray(object?.bannedUsers)
        ? object.bannedUsers.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: GetBannedUsersResponse): unknown {
    const obj: any = {};
    if (message.bannedUsers) {
      obj.bannedUsers = message.bannedUsers.map((e) => Math.round(e));
    } else {
      obj.bannedUsers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBannedUsersResponse>, I>>(
    object: I
  ): GetBannedUsersResponse {
    const message = createBaseGetBannedUsersResponse();
    message.bannedUsers = object.bannedUsers?.map((e) => e) || [];
    return message;
  },
};

function createBaseGrantOwnershipRequest(): GrantOwnershipRequest {
  return { guildId: 0, newOwnerId: 0 };
}

export const GrantOwnershipRequest = {
  encode(
    message: GrantOwnershipRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.newOwnerId !== undefined && message.newOwnerId !== 0) {
      writer.uint32(16).uint64(message.newOwnerId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GrantOwnershipRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantOwnershipRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.newOwnerId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GrantOwnershipRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      newOwnerId: isSet(object.newOwnerId) ? Number(object.newOwnerId) : 0,
    };
  },

  toJSON(message: GrantOwnershipRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.newOwnerId !== undefined &&
      (obj.newOwnerId = Math.round(message.newOwnerId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GrantOwnershipRequest>, I>>(
    object: I
  ): GrantOwnershipRequest {
    const message = createBaseGrantOwnershipRequest();
    message.guildId = object.guildId ?? 0;
    message.newOwnerId = object.newOwnerId ?? 0;
    return message;
  },
};

function createBaseGrantOwnershipResponse(): GrantOwnershipResponse {
  return {};
}

export const GrantOwnershipResponse = {
  encode(_: GrantOwnershipResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GrantOwnershipResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantOwnershipResponse();
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

  fromJSON(_: any): GrantOwnershipResponse {
    return {};
  },

  toJSON(_: GrantOwnershipResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GrantOwnershipResponse>, I>>(
    _: I
  ): GrantOwnershipResponse {
    const message = createBaseGrantOwnershipResponse();
    return message;
  },
};

function createBaseGiveUpOwnershipRequest(): GiveUpOwnershipRequest {
  return { guildId: 0 };
}

export const GiveUpOwnershipRequest = {
  encode(
    message: GiveUpOwnershipRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GiveUpOwnershipRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGiveUpOwnershipRequest();
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

  fromJSON(object: any): GiveUpOwnershipRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: GiveUpOwnershipRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GiveUpOwnershipRequest>, I>>(
    object: I
  ): GiveUpOwnershipRequest {
    const message = createBaseGiveUpOwnershipRequest();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseGiveUpOwnershipResponse(): GiveUpOwnershipResponse {
  return {};
}

export const GiveUpOwnershipResponse = {
  encode(_: GiveUpOwnershipResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GiveUpOwnershipResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGiveUpOwnershipResponse();
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

  fromJSON(_: any): GiveUpOwnershipResponse {
    return {};
  },

  toJSON(_: GiveUpOwnershipResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GiveUpOwnershipResponse>, I>>(
    _: I
  ): GiveUpOwnershipResponse {
    const message = createBaseGiveUpOwnershipResponse();
    return message;
  },
};

function createBaseGetPendingInvitesRequest(): GetPendingInvitesRequest {
  return {};
}

export const GetPendingInvitesRequest = {
  encode(
    _: GetPendingInvitesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetPendingInvitesRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPendingInvitesRequest();
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

  fromJSON(_: any): GetPendingInvitesRequest {
    return {};
  },

  toJSON(_: GetPendingInvitesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPendingInvitesRequest>, I>>(
    _: I
  ): GetPendingInvitesRequest {
    const message = createBaseGetPendingInvitesRequest();
    return message;
  },
};

function createBaseGetPendingInvitesResponse(): GetPendingInvitesResponse {
  return { pendingInvites: [] };
}

export const GetPendingInvitesResponse = {
  encode(
    message: GetPendingInvitesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (
      message.pendingInvites !== undefined &&
      message.pendingInvites.length !== 0
    ) {
      for (const v of message.pendingInvites) {
        PendingInvite.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetPendingInvitesResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPendingInvitesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pendingInvites!.push(
            PendingInvite.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPendingInvitesResponse {
    return {
      pendingInvites: Array.isArray(object?.pendingInvites)
        ? object.pendingInvites.map((e: any) => PendingInvite.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetPendingInvitesResponse): unknown {
    const obj: any = {};
    if (message.pendingInvites) {
      obj.pendingInvites = message.pendingInvites.map((e) =>
        e ? PendingInvite.toJSON(e) : undefined
      );
    } else {
      obj.pendingInvites = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPendingInvitesResponse>, I>>(
    object: I
  ): GetPendingInvitesResponse {
    const message = createBaseGetPendingInvitesResponse();
    message.pendingInvites =
      object.pendingInvites?.map((e) => PendingInvite.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRejectPendingInviteRequest(): RejectPendingInviteRequest {
  return { inviteId: "", serverId: undefined };
}

export const RejectPendingInviteRequest = {
  encode(
    message: RejectPendingInviteRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.inviteId !== undefined && message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    if (message.serverId !== undefined) {
      writer.uint32(18).string(message.serverId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): RejectPendingInviteRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRejectPendingInviteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteId = reader.string();
          break;
        case 2:
          message.serverId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RejectPendingInviteRequest {
    return {
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      serverId: isSet(object.serverId) ? String(object.serverId) : undefined,
    };
  },

  toJSON(message: RejectPendingInviteRequest): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.serverId !== undefined && (obj.serverId = message.serverId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RejectPendingInviteRequest>, I>>(
    object: I
  ): RejectPendingInviteRequest {
    const message = createBaseRejectPendingInviteRequest();
    message.inviteId = object.inviteId ?? "";
    message.serverId = object.serverId ?? undefined;
    return message;
  },
};

function createBaseRejectPendingInviteResponse(): RejectPendingInviteResponse {
  return {};
}

export const RejectPendingInviteResponse = {
  encode(
    _: RejectPendingInviteResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): RejectPendingInviteResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRejectPendingInviteResponse();
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

  fromJSON(_: any): RejectPendingInviteResponse {
    return {};
  },

  toJSON(_: RejectPendingInviteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RejectPendingInviteResponse>, I>>(
    _: I
  ): RejectPendingInviteResponse {
    const message = createBaseRejectPendingInviteResponse();
    return message;
  },
};

function createBaseIgnorePendingInviteRequest(): IgnorePendingInviteRequest {
  return { inviteId: "", serverId: undefined };
}

export const IgnorePendingInviteRequest = {
  encode(
    message: IgnorePendingInviteRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.inviteId !== undefined && message.inviteId !== "") {
      writer.uint32(10).string(message.inviteId);
    }
    if (message.serverId !== undefined) {
      writer.uint32(18).string(message.serverId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): IgnorePendingInviteRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIgnorePendingInviteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteId = reader.string();
          break;
        case 2:
          message.serverId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): IgnorePendingInviteRequest {
    return {
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
      serverId: isSet(object.serverId) ? String(object.serverId) : undefined,
    };
  },

  toJSON(message: IgnorePendingInviteRequest): unknown {
    const obj: any = {};
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    message.serverId !== undefined && (obj.serverId = message.serverId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IgnorePendingInviteRequest>, I>>(
    object: I
  ): IgnorePendingInviteRequest {
    const message = createBaseIgnorePendingInviteRequest();
    message.inviteId = object.inviteId ?? "";
    message.serverId = object.serverId ?? undefined;
    return message;
  },
};

function createBaseIgnorePendingInviteResponse(): IgnorePendingInviteResponse {
  return {};
}

export const IgnorePendingInviteResponse = {
  encode(
    _: IgnorePendingInviteResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): IgnorePendingInviteResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIgnorePendingInviteResponse();
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

  fromJSON(_: any): IgnorePendingInviteResponse {
    return {};
  },

  toJSON(_: IgnorePendingInviteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<IgnorePendingInviteResponse>, I>>(
    _: I
  ): IgnorePendingInviteResponse {
    const message = createBaseIgnorePendingInviteResponse();
    return message;
  },
};

function createBaseInviteUserToGuildRequest(): InviteUserToGuildRequest {
  return { userName: "", serverId: undefined, guildId: 0 };
}

export const InviteUserToGuildRequest = {
  encode(
    message: InviteUserToGuildRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userName !== undefined && message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    if (message.serverId !== undefined) {
      writer.uint32(18).string(message.serverId);
    }
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(24).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): InviteUserToGuildRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteUserToGuildRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userName = reader.string();
          break;
        case 2:
          message.serverId = reader.string();
          break;
        case 3:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InviteUserToGuildRequest {
    return {
      userName: isSet(object.userName) ? String(object.userName) : "",
      serverId: isSet(object.serverId) ? String(object.serverId) : undefined,
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: InviteUserToGuildRequest): unknown {
    const obj: any = {};
    message.userName !== undefined && (obj.userName = message.userName);
    message.serverId !== undefined && (obj.serverId = message.serverId);
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InviteUserToGuildRequest>, I>>(
    object: I
  ): InviteUserToGuildRequest {
    const message = createBaseInviteUserToGuildRequest();
    message.userName = object.userName ?? "";
    message.serverId = object.serverId ?? undefined;
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseInviteUserToGuildResponse(): InviteUserToGuildResponse {
  return {};
}

export const InviteUserToGuildResponse = {
  encode(
    _: InviteUserToGuildResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): InviteUserToGuildResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteUserToGuildResponse();
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

  fromJSON(_: any): InviteUserToGuildResponse {
    return {};
  },

  toJSON(_: InviteUserToGuildResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InviteUserToGuildResponse>, I>>(
    _: I
  ): InviteUserToGuildResponse {
    const message = createBaseInviteUserToGuildResponse();
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
