/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "protocol.sync.v1";

/** Authentication data that will be sent in a `harmonytypes.v1.Token`. */
export interface AuthData {
  /**
   * The server ID of the server initiating the transaction. For Pull,
   * this tells the server being connected to which homeservers' events it should send.
   * For Push, this tells the server being connected to which homeservers' events it is
   * receiving.
   */
  serverId: string;
  /**
   * The UTC UNIX time in seconds of when the request is started. Servers should reject
   * tokens with a time too far from the current time, at their discretion. A recommended
   * variance is 1 minute.
   */
  time: number;
}

/** Object representing a postbox event. */
export interface Event {
  /** User removed from a guild. */
  userRemovedFromGuild: Event_UserRemovedFromGuild | undefined;
  /** User added to a guild. */
  userAddedToGuild: Event_UserAddedToGuild | undefined;
  /** User invited to a guild. */
  userInvited: Event_UserInvited | undefined;
  /** User rejected a guild invitation. */
  userRejectedInvite: Event_UserRejectedInvite | undefined;
}

/** Event sent when a user is removed from a guild. */
export interface Event_UserRemovedFromGuild {
  /** User ID of the user that was removed. */
  userId: number;
  /** Guild ID of the guild where the user was. */
  guildId: number;
}

/** Event sent when a user is added to a guild. */
export interface Event_UserAddedToGuild {
  /** User ID of the user that was added. */
  userId: number;
  /** Guild ID of the guild where the user will be. */
  guildId: number;
}

/** Event sent when a user is invited to a guild. */
export interface Event_UserInvited {
  /** User ID of the invitee. */
  userId: number;
  /** User ID of the user that invited. */
  inviterId: number;
  /**
   * The unique identifier of a user's invite to another
   * user to join a given guild.
   */
  inviteId: string;
}

/** Event sent when a user rejects a guild invitation. */
export interface Event_UserRejectedInvite {
  /** Guild ID of the guild the invitee rejected an invite for. */
  guildId: number;
  /** User ID of the invitee that rejected the invitation. */
  userId: number;
  /** Invite ID of the invite that was rejected. */
  inviteId: string;
}

/** Used in `Pull` endpoint. */
export interface PullRequest {}

/** Used in `Pull` endpoint. */
export interface PullResponse {
  /** The events that were not processed yet. */
  eventQueue: Event[];
}

/** Used in `Push` endpoint. */
export interface PushRequest {
  /** The event to push to the server. */
  event: Event | undefined;
}

/** Used in `Push` endpoint. */
export interface PushResponse {}

/** Used in `NotifyNewId` endpoint. */
export interface NotifyNewIdRequest {
  /** The new server ID of the server. */
  newServerId: string;
}

/** Used in `NotifyNewId` endpoint. */
export interface NotifyNewIdResponse {}

function createBaseAuthData(): AuthData {
  return { serverId: "", time: 0 };
}

export const AuthData = {
  encode(message: AuthData, writer: Writer = Writer.create()): Writer {
    if (message.serverId !== "") {
      writer.uint32(10).string(message.serverId);
    }
    if (message.time !== 0) {
      writer.uint32(16).uint64(message.time);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthData {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverId = reader.string();
          break;
        case 2:
          message.time = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthData {
    return {
      serverId: isSet(object.serverId) ? String(object.serverId) : "",
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: AuthData): unknown {
    const obj: any = {};
    message.serverId !== undefined && (obj.serverId = message.serverId);
    message.time !== undefined && (obj.time = Math.round(message.time));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthData>, I>>(object: I): AuthData {
    const message = createBaseAuthData();
    message.serverId = object.serverId ?? "";
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseEvent(): Event {
  return {
    userRemovedFromGuild: undefined,
    userAddedToGuild: undefined,
    userInvited: undefined,
    userRejectedInvite: undefined,
  };
}

export const Event = {
  encode(message: Event, writer: Writer = Writer.create()): Writer {
    if (message.userRemovedFromGuild !== undefined) {
      Event_UserRemovedFromGuild.encode(
        message.userRemovedFromGuild,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.userAddedToGuild !== undefined) {
      Event_UserAddedToGuild.encode(
        message.userAddedToGuild,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.userInvited !== undefined) {
      Event_UserInvited.encode(
        message.userInvited,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.userRejectedInvite !== undefined) {
      Event_UserRejectedInvite.encode(
        message.userRejectedInvite,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userRemovedFromGuild = Event_UserRemovedFromGuild.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.userAddedToGuild = Event_UserAddedToGuild.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.userInvited = Event_UserInvited.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.userRejectedInvite = Event_UserRejectedInvite.decode(
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

  fromJSON(object: any): Event {
    return {
      userRemovedFromGuild: isSet(object.userRemovedFromGuild)
        ? Event_UserRemovedFromGuild.fromJSON(object.userRemovedFromGuild)
        : undefined,
      userAddedToGuild: isSet(object.userAddedToGuild)
        ? Event_UserAddedToGuild.fromJSON(object.userAddedToGuild)
        : undefined,
      userInvited: isSet(object.userInvited)
        ? Event_UserInvited.fromJSON(object.userInvited)
        : undefined,
      userRejectedInvite: isSet(object.userRejectedInvite)
        ? Event_UserRejectedInvite.fromJSON(object.userRejectedInvite)
        : undefined,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.userRemovedFromGuild !== undefined &&
      (obj.userRemovedFromGuild = message.userRemovedFromGuild
        ? Event_UserRemovedFromGuild.toJSON(message.userRemovedFromGuild)
        : undefined);
    message.userAddedToGuild !== undefined &&
      (obj.userAddedToGuild = message.userAddedToGuild
        ? Event_UserAddedToGuild.toJSON(message.userAddedToGuild)
        : undefined);
    message.userInvited !== undefined &&
      (obj.userInvited = message.userInvited
        ? Event_UserInvited.toJSON(message.userInvited)
        : undefined);
    message.userRejectedInvite !== undefined &&
      (obj.userRejectedInvite = message.userRejectedInvite
        ? Event_UserRejectedInvite.toJSON(message.userRejectedInvite)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.userRemovedFromGuild =
      object.userRemovedFromGuild !== undefined &&
      object.userRemovedFromGuild !== null
        ? Event_UserRemovedFromGuild.fromPartial(object.userRemovedFromGuild)
        : undefined;
    message.userAddedToGuild =
      object.userAddedToGuild !== undefined && object.userAddedToGuild !== null
        ? Event_UserAddedToGuild.fromPartial(object.userAddedToGuild)
        : undefined;
    message.userInvited =
      object.userInvited !== undefined && object.userInvited !== null
        ? Event_UserInvited.fromPartial(object.userInvited)
        : undefined;
    message.userRejectedInvite =
      object.userRejectedInvite !== undefined &&
      object.userRejectedInvite !== null
        ? Event_UserRejectedInvite.fromPartial(object.userRejectedInvite)
        : undefined;
    return message;
  },
};

function createBaseEvent_UserRemovedFromGuild(): Event_UserRemovedFromGuild {
  return { userId: 0, guildId: 0 };
}

export const Event_UserRemovedFromGuild = {
  encode(
    message: Event_UserRemovedFromGuild,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): Event_UserRemovedFromGuild {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_UserRemovedFromGuild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): Event_UserRemovedFromGuild {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: Event_UserRemovedFromGuild): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_UserRemovedFromGuild>, I>>(
    object: I
  ): Event_UserRemovedFromGuild {
    const message = createBaseEvent_UserRemovedFromGuild();
    message.userId = object.userId ?? 0;
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseEvent_UserAddedToGuild(): Event_UserAddedToGuild {
  return { userId: 0, guildId: 0 };
}

export const Event_UserAddedToGuild = {
  encode(
    message: Event_UserAddedToGuild,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.guildId !== 0) {
      writer.uint32(16).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Event_UserAddedToGuild {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_UserAddedToGuild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): Event_UserAddedToGuild {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: Event_UserAddedToGuild): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_UserAddedToGuild>, I>>(
    object: I
  ): Event_UserAddedToGuild {
    const message = createBaseEvent_UserAddedToGuild();
    message.userId = object.userId ?? 0;
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseEvent_UserInvited(): Event_UserInvited {
  return { userId: 0, inviterId: 0, inviteId: "" };
}

export const Event_UserInvited = {
  encode(message: Event_UserInvited, writer: Writer = Writer.create()): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.inviterId !== 0) {
      writer.uint32(16).uint64(message.inviterId);
    }
    if (message.inviteId !== "") {
      writer.uint32(26).string(message.inviteId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Event_UserInvited {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_UserInvited();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.inviterId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.inviteId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_UserInvited {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      inviterId: isSet(object.inviterId) ? Number(object.inviterId) : 0,
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
    };
  },

  toJSON(message: Event_UserInvited): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.inviterId !== undefined &&
      (obj.inviterId = Math.round(message.inviterId));
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_UserInvited>, I>>(
    object: I
  ): Event_UserInvited {
    const message = createBaseEvent_UserInvited();
    message.userId = object.userId ?? 0;
    message.inviterId = object.inviterId ?? 0;
    message.inviteId = object.inviteId ?? "";
    return message;
  },
};

function createBaseEvent_UserRejectedInvite(): Event_UserRejectedInvite {
  return { guildId: 0, userId: 0, inviteId: "" };
}

export const Event_UserRejectedInvite = {
  encode(
    message: Event_UserRejectedInvite,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.userId !== 0) {
      writer.uint32(16).uint64(message.userId);
    }
    if (message.inviteId !== "") {
      writer.uint32(26).string(message.inviteId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): Event_UserRejectedInvite {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent_UserRejectedInvite();
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
          message.inviteId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event_UserRejectedInvite {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      inviteId: isSet(object.inviteId) ? String(object.inviteId) : "",
    };
  },

  toJSON(message: Event_UserRejectedInvite): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.inviteId !== undefined && (obj.inviteId = message.inviteId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event_UserRejectedInvite>, I>>(
    object: I
  ): Event_UserRejectedInvite {
    const message = createBaseEvent_UserRejectedInvite();
    message.guildId = object.guildId ?? 0;
    message.userId = object.userId ?? 0;
    message.inviteId = object.inviteId ?? "";
    return message;
  },
};

function createBasePullRequest(): PullRequest {
  return {};
}

export const PullRequest = {
  encode(_: PullRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PullRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePullRequest();
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

  fromJSON(_: any): PullRequest {
    return {};
  },

  toJSON(_: PullRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PullRequest>, I>>(_: I): PullRequest {
    const message = createBasePullRequest();
    return message;
  },
};

function createBasePullResponse(): PullResponse {
  return { eventQueue: [] };
}

export const PullResponse = {
  encode(message: PullResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.eventQueue) {
      Event.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PullResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePullResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventQueue.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PullResponse {
    return {
      eventQueue: Array.isArray(object?.eventQueue)
        ? object.eventQueue.map((e: any) => Event.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PullResponse): unknown {
    const obj: any = {};
    if (message.eventQueue) {
      obj.eventQueue = message.eventQueue.map((e) =>
        e ? Event.toJSON(e) : undefined
      );
    } else {
      obj.eventQueue = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PullResponse>, I>>(
    object: I
  ): PullResponse {
    const message = createBasePullResponse();
    message.eventQueue =
      object.eventQueue?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

function createBasePushRequest(): PushRequest {
  return { event: undefined };
}

export const PushRequest = {
  encode(message: PushRequest, writer: Writer = Writer.create()): Writer {
    if (message.event !== undefined) {
      Event.encode(message.event, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PushRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = Event.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PushRequest {
    return {
      event: isSet(object.event) ? Event.fromJSON(object.event) : undefined,
    };
  },

  toJSON(message: PushRequest): unknown {
    const obj: any = {};
    message.event !== undefined &&
      (obj.event = message.event ? Event.toJSON(message.event) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PushRequest>, I>>(
    object: I
  ): PushRequest {
    const message = createBasePushRequest();
    message.event =
      object.event !== undefined && object.event !== null
        ? Event.fromPartial(object.event)
        : undefined;
    return message;
  },
};

function createBasePushResponse(): PushResponse {
  return {};
}

export const PushResponse = {
  encode(_: PushResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PushResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePushResponse();
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

  fromJSON(_: any): PushResponse {
    return {};
  },

  toJSON(_: PushResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PushResponse>, I>>(
    _: I
  ): PushResponse {
    const message = createBasePushResponse();
    return message;
  },
};

function createBaseNotifyNewIdRequest(): NotifyNewIdRequest {
  return { newServerId: "" };
}

export const NotifyNewIdRequest = {
  encode(
    message: NotifyNewIdRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.newServerId !== "") {
      writer.uint32(10).string(message.newServerId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NotifyNewIdRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotifyNewIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newServerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NotifyNewIdRequest {
    return {
      newServerId: isSet(object.newServerId) ? String(object.newServerId) : "",
    };
  },

  toJSON(message: NotifyNewIdRequest): unknown {
    const obj: any = {};
    message.newServerId !== undefined &&
      (obj.newServerId = message.newServerId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NotifyNewIdRequest>, I>>(
    object: I
  ): NotifyNewIdRequest {
    const message = createBaseNotifyNewIdRequest();
    message.newServerId = object.newServerId ?? "";
    return message;
  },
};

function createBaseNotifyNewIdResponse(): NotifyNewIdResponse {
  return {};
}

export const NotifyNewIdResponse = {
  encode(_: NotifyNewIdResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NotifyNewIdResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNotifyNewIdResponse();
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

  fromJSON(_: any): NotifyNewIdResponse {
    return {};
  },

  toJSON(_: NotifyNewIdResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NotifyNewIdResponse>, I>>(
    _: I
  ): NotifyNewIdResponse {
    const message = createBaseNotifyNewIdResponse();
    return message;
  },
};

/**
 * # Postbox
 *
 * The postbox service forms the core of Harmony's server <-> server communications.
 *
 * It concerns the transfer of Events between servers, as well as ensuring reliable
 * delivery of them.
 *
 * The semantics of events are documented in the event types. The postbox service
 * is solely reliable for reliable pushing and pulling.
 *
 * ## Server Identification
 *
 * Servers are identified using their domain, and the port which they serve. This is
 * called the "server ID", and must be formatted as `domain:port`. The port is NOT
 * optional. Converting this ID to a URL for communicating can simply be done via
 * prefixing the ID with a protocol, eg. `https://`.
 *
 * ## Authorisation
 *
 * Requests are authorised using a serialized `harmonytypes.v1.Token` in the Authorization HTTP header.
 * The `data` field of the token will be a serialized `AuthData` message.
 * The private key used to sign is the homeserver's private key.
 *
 * ## Events
 *
 * In this section, we will use sender and recipient to refer to the servers
 * sending the events and the server receiving the events respectively.
 *
 * At PostboxService startup, a sender should first Pull all receivers it had
 * federated from before. If a receiver makes a Push to the sender while a Pull
 * is going on, the Push should be processed after the Pull is completed.
 *
 * The sender will attempt to Push to the receiver. If the Push RPC fails more
 * than X times (a recommended retry count is 5), the event will be dispatched
 * to the sender's queue for the receiver. Unless the receiver pulls these events,
 * all new events should be dispatched to the queue. No new Push RPC should be made
 * before the queue is emptied. This ensures that events are always received in the
 * right order.
 *
 * It is recommended that receivers try pulling periodically, for example, every
 * 1 minute after the last Push RPC by the sender. This ensures that events are recieved.
 */
export const PostboxServiceDefinition = {
  name: "PostboxService",
  fullName: "protocol.sync.v1.PostboxService",
  methods: {
    /** Endpoint to pull events. */
    pull: {
      name: "Pull",
      requestType: PullRequest,
      requestStream: false,
      responseType: PullResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to push events. */
    push: {
      name: "Push",
      requestType: PushRequest,
      requestStream: false,
      responseType: PushResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to notify a server of a server ID change. It is called by the server
     * that had it's server ID changed for all servers it has federated with.
     */
    notifyNewId: {
      name: "NotifyNewId",
      requestType: NotifyNewIdRequest,
      requestStream: false,
      responseType: NotifyNewIdResponse,
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
