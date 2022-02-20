/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Metadata, ItemPosition } from "../../harmonytypes/v1/types";

export const protobufPackage = "protocol.chat.v1";

/** What kind the channel is. */
export enum ChannelKind {
  /** CHANNEL_KIND_TEXT_UNSPECIFIED - A text channel. Allows you to simply send messages to a group of people. */
  CHANNEL_KIND_TEXT_UNSPECIFIED = 0,
  /** CHANNEL_KIND_VOICE_MEDIA - A voice channel. Allows you to talk to other people with voice. */
  CHANNEL_KIND_VOICE_MEDIA = 1,
  /**
   * CHANNEL_KIND_CATEGORY - A category channel. All channels under this channel down to another
   * category channel belongs to this category channel.
   */
  CHANNEL_KIND_CATEGORY = 2,
  UNRECOGNIZED = -1,
}

export function channelKindFromJSON(object: any): ChannelKind {
  switch (object) {
    case 0:
    case "CHANNEL_KIND_TEXT_UNSPECIFIED":
      return ChannelKind.CHANNEL_KIND_TEXT_UNSPECIFIED;
    case 1:
    case "CHANNEL_KIND_VOICE_MEDIA":
      return ChannelKind.CHANNEL_KIND_VOICE_MEDIA;
    case 2:
    case "CHANNEL_KIND_CATEGORY":
      return ChannelKind.CHANNEL_KIND_CATEGORY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChannelKind.UNRECOGNIZED;
  }
}

export function channelKindToJSON(object: ChannelKind): string {
  switch (object) {
    case ChannelKind.CHANNEL_KIND_TEXT_UNSPECIFIED:
      return "CHANNEL_KIND_TEXT_UNSPECIFIED";
    case ChannelKind.CHANNEL_KIND_VOICE_MEDIA:
      return "CHANNEL_KIND_VOICE_MEDIA";
    case ChannelKind.CHANNEL_KIND_CATEGORY:
      return "CHANNEL_KIND_CATEGORY";
    default:
      return "UNKNOWN";
  }
}

/** An object representing a channel, without the ID. */
export interface Channel {
  /** The name of this channel. */
  channelName: string;
  /**
   * The kind of channel this is.
   * Data does not get inherently stored in the Channel type
   * Instead, clients who understand a certain ChannelKind should
   * fetch them from a separate RPC.
   */
  kind: ChannelKind;
  /** The metadata of this channel. */
  metadata?: Metadata | undefined;
}

/** The channel alongside with an ID. */
export interface ChannelWithId {
  /** ID of the channel. */
  channelId: number;
  /** The channel data. */
  channel: Channel | undefined;
}

/**
 * Channel Kinds:
 *
 * Channel kinds specified in an official Harmony protocol will start with a
 * "h." prefix. Third-party extensions should not use the "h." prefix. If no
 * kind is specified, the channel is a text channel.
 *
 * Kinds indicate additional functionality a channel may have: for example,
 * h.voice can indicate that a channel has voice functionalities alongside
 * the usual text fare.
 *
 * Used in the `CreateChannel` endpoint.
 */
export interface CreateChannelRequest {
  /** Guild ID of the guild to create a channel in. */
  guildId: number;
  /** The name of this channel. */
  channelName: string;
  /** The kind of this channel. */
  kind: ChannelKind;
  /** The metadata of this channel. */
  metadata?: Metadata | undefined;
  /**
   * The position of your new channel in the channel list.
   *
   * If not specified, it will be put at the bottom of the channel list.
   */
  position?: ItemPosition | undefined;
}

/** Used in the `CreateChannel` endpoint. */
export interface CreateChannelResponse {
  /** ID of the channel that was created. */
  channelId: number;
}

/** Used in the `GetGuildChannels` endpoint. */
export interface GetGuildChannelsRequest {
  /** Guild ID of the guild you want to get channels from. */
  guildId: number;
}

/** Used in the `GetGuildChannels` endpoint. */
export interface GetGuildChannelsResponse {
  /** Channels' data and ID the server responded with. */
  channels: ChannelWithId[];
}

/** Used in the `UpdateChannelInformation` endpoint. */
export interface UpdateChannelInformationRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel you want to change the information of. */
  channelId: number;
  /** New name to set for this channel. */
  newName?: string | undefined;
  /** New metadata to set for this channel. */
  newMetadata?: Metadata | undefined;
}

/** Used in the `UpdateChannelInformation` endpoint. */
export interface UpdateChannelInformationResponse {}

/** Used in the `UpdateChannelOrder` endpoint. */
export interface UpdateChannelOrderRequest {
  /** Guild ID of the guild that has the channel. */
  guildId: number;
  /** Channel ID of the channel that you want to move. */
  channelId: number;
  /** The new position of this channel. */
  newPosition: ItemPosition | undefined;
}

/** Used in the `UpdateChannelOrder` endpoint. */
export interface UpdateChannelOrderResponse {}

/** Request specifiying the order of all channels in a guild at once */
export interface UpdateAllChannelOrderRequest {
  /** guild_id: the guild to specify the new channel order for */
  guildId: number;
  /** channel_ids: the new order of channel ids */
  channelIds: number[];
}

/** Used in the `UpdateAllChannelOrder` endpoint. */
export interface UpdateAllChannelOrderResponse {}

/** Used in the `DeleteChannel` endpoint. */
export interface DeleteChannelRequest {
  /** Guild ID of the guild that has the channel. */
  guildId: number;
  /** Channel ID of the channel you want to delete. */
  channelId: number;
}

/** Used in the `DeleteChannel` endpoint. */
export interface DeleteChannelResponse {}

/** Used in `Typing` endpoint. */
export interface TypingRequest {
  /** The guild id of the channel the user is typing in. */
  guildId: number;
  /** The channel id of the channel the user is typing in. */
  channelId: number;
}

/** Used in `Typing` endpoint. */
export interface TypingResponse {}

function createBaseChannel(): Channel {
  return { channelName: "", kind: 0, metadata: undefined };
}

export const Channel = {
  encode(message: Channel, writer: Writer = Writer.create()): Writer {
    if (message.channelName !== "") {
      writer.uint32(10).string(message.channelName);
    }
    if (message.kind !== 0) {
      writer.uint32(16).int32(message.kind);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Channel {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelName = reader.string();
          break;
        case 2:
          message.kind = reader.int32() as any;
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

  fromJSON(object: any): Channel {
    return {
      channelName: isSet(object.channelName) ? String(object.channelName) : "",
      kind: isSet(object.kind) ? channelKindFromJSON(object.kind) : 0,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: Channel): unknown {
    const obj: any = {};
    message.channelName !== undefined &&
      (obj.channelName = message.channelName);
    message.kind !== undefined && (obj.kind = channelKindToJSON(message.kind));
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Channel>, I>>(object: I): Channel {
    const message = createBaseChannel();
    message.channelName = object.channelName ?? "";
    message.kind = object.kind ?? 0;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseChannelWithId(): ChannelWithId {
  return { channelId: 0, channel: undefined };
}

export const ChannelWithId = {
  encode(message: ChannelWithId, writer: Writer = Writer.create()): Writer {
    if (message.channelId !== 0) {
      writer.uint32(8).uint64(message.channelId);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ChannelWithId {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelWithId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelWithId {
    return {
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      channel: isSet(object.channel)
        ? Channel.fromJSON(object.channel)
        : undefined,
    };
  },

  toJSON(message: ChannelWithId): unknown {
    const obj: any = {};
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.channel !== undefined &&
      (obj.channel = message.channel
        ? Channel.toJSON(message.channel)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChannelWithId>, I>>(
    object: I
  ): ChannelWithId {
    const message = createBaseChannelWithId();
    message.channelId = object.channelId ?? 0;
    message.channel =
      object.channel !== undefined && object.channel !== null
        ? Channel.fromPartial(object.channel)
        : undefined;
    return message;
  },
};

function createBaseCreateChannelRequest(): CreateChannelRequest {
  return {
    guildId: 0,
    channelName: "",
    kind: 0,
    metadata: undefined,
    position: undefined,
  };
}

export const CreateChannelRequest = {
  encode(
    message: CreateChannelRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelName !== "") {
      writer.uint32(18).string(message.channelName);
    }
    if (message.kind !== 0) {
      writer.uint32(24).int32(message.kind);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(34).fork()).ldelim();
    }
    if (message.position !== undefined) {
      ItemPosition.encode(message.position, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateChannelRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChannelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelName = reader.string();
          break;
        case 3:
          message.kind = reader.int32() as any;
          break;
        case 4:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 5:
          message.position = ItemPosition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateChannelRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelName: isSet(object.channelName) ? String(object.channelName) : "",
      kind: isSet(object.kind) ? channelKindFromJSON(object.kind) : 0,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      position: isSet(object.position)
        ? ItemPosition.fromJSON(object.position)
        : undefined,
    };
  },

  toJSON(message: CreateChannelRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelName !== undefined &&
      (obj.channelName = message.channelName);
    message.kind !== undefined && (obj.kind = channelKindToJSON(message.kind));
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.position !== undefined &&
      (obj.position = message.position
        ? ItemPosition.toJSON(message.position)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateChannelRequest>, I>>(
    object: I
  ): CreateChannelRequest {
    const message = createBaseCreateChannelRequest();
    message.guildId = object.guildId ?? 0;
    message.channelName = object.channelName ?? "";
    message.kind = object.kind ?? 0;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.position =
      object.position !== undefined && object.position !== null
        ? ItemPosition.fromPartial(object.position)
        : undefined;
    return message;
  },
};

function createBaseCreateChannelResponse(): CreateChannelResponse {
  return { channelId: 0 };
}

export const CreateChannelResponse = {
  encode(
    message: CreateChannelResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.channelId !== 0) {
      writer.uint32(8).uint64(message.channelId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateChannelResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateChannelResponse {
    return {
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
    };
  },

  toJSON(message: CreateChannelResponse): unknown {
    const obj: any = {};
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateChannelResponse>, I>>(
    object: I
  ): CreateChannelResponse {
    const message = createBaseCreateChannelResponse();
    message.channelId = object.channelId ?? 0;
    return message;
  },
};

function createBaseGetGuildChannelsRequest(): GetGuildChannelsRequest {
  return { guildId: 0 };
}

export const GetGuildChannelsRequest = {
  encode(
    message: GetGuildChannelsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetGuildChannelsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildChannelsRequest();
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

  fromJSON(object: any): GetGuildChannelsRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
    };
  },

  toJSON(message: GetGuildChannelsRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildChannelsRequest>, I>>(
    object: I
  ): GetGuildChannelsRequest {
    const message = createBaseGetGuildChannelsRequest();
    message.guildId = object.guildId ?? 0;
    return message;
  },
};

function createBaseGetGuildChannelsResponse(): GetGuildChannelsResponse {
  return { channels: [] };
}

export const GetGuildChannelsResponse = {
  encode(
    message: GetGuildChannelsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.channels) {
      ChannelWithId.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetGuildChannelsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildChannelsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channels.push(ChannelWithId.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildChannelsResponse {
    return {
      channels: Array.isArray(object?.channels)
        ? object.channels.map((e: any) => ChannelWithId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetGuildChannelsResponse): unknown {
    const obj: any = {};
    if (message.channels) {
      obj.channels = message.channels.map((e) =>
        e ? ChannelWithId.toJSON(e) : undefined
      );
    } else {
      obj.channels = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildChannelsResponse>, I>>(
    object: I
  ): GetGuildChannelsResponse {
    const message = createBaseGetGuildChannelsResponse();
    message.channels =
      object.channels?.map((e) => ChannelWithId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateChannelInformationRequest(): UpdateChannelInformationRequest {
  return {
    guildId: 0,
    channelId: 0,
    newName: undefined,
    newMetadata: undefined,
  };
}

export const UpdateChannelInformationRequest = {
  encode(
    message: UpdateChannelInformationRequest,
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
  ): UpdateChannelInformationRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChannelInformationRequest();
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

  fromJSON(object: any): UpdateChannelInformationRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      newName: isSet(object.newName) ? String(object.newName) : undefined,
      newMetadata: isSet(object.newMetadata)
        ? Metadata.fromJSON(object.newMetadata)
        : undefined,
    };
  },

  toJSON(message: UpdateChannelInformationRequest): unknown {
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

  fromPartial<I extends Exact<DeepPartial<UpdateChannelInformationRequest>, I>>(
    object: I
  ): UpdateChannelInformationRequest {
    const message = createBaseUpdateChannelInformationRequest();
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

function createBaseUpdateChannelInformationResponse(): UpdateChannelInformationResponse {
  return {};
}

export const UpdateChannelInformationResponse = {
  encode(
    _: UpdateChannelInformationResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpdateChannelInformationResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChannelInformationResponse();
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

  fromJSON(_: any): UpdateChannelInformationResponse {
    return {};
  },

  toJSON(_: UpdateChannelInformationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<UpdateChannelInformationResponse>, I>
  >(_: I): UpdateChannelInformationResponse {
    const message = createBaseUpdateChannelInformationResponse();
    return message;
  },
};

function createBaseUpdateChannelOrderRequest(): UpdateChannelOrderRequest {
  return { guildId: 0, channelId: 0, newPosition: undefined };
}

export const UpdateChannelOrderRequest = {
  encode(
    message: UpdateChannelOrderRequest,
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
  ): UpdateChannelOrderRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChannelOrderRequest();
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

  fromJSON(object: any): UpdateChannelOrderRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      newPosition: isSet(object.newPosition)
        ? ItemPosition.fromJSON(object.newPosition)
        : undefined,
    };
  },

  toJSON(message: UpdateChannelOrderRequest): unknown {
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

  fromPartial<I extends Exact<DeepPartial<UpdateChannelOrderRequest>, I>>(
    object: I
  ): UpdateChannelOrderRequest {
    const message = createBaseUpdateChannelOrderRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.newPosition =
      object.newPosition !== undefined && object.newPosition !== null
        ? ItemPosition.fromPartial(object.newPosition)
        : undefined;
    return message;
  },
};

function createBaseUpdateChannelOrderResponse(): UpdateChannelOrderResponse {
  return {};
}

export const UpdateChannelOrderResponse = {
  encode(
    _: UpdateChannelOrderResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpdateChannelOrderResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateChannelOrderResponse();
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

  fromJSON(_: any): UpdateChannelOrderResponse {
    return {};
  },

  toJSON(_: UpdateChannelOrderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateChannelOrderResponse>, I>>(
    _: I
  ): UpdateChannelOrderResponse {
    const message = createBaseUpdateChannelOrderResponse();
    return message;
  },
};

function createBaseUpdateAllChannelOrderRequest(): UpdateAllChannelOrderRequest {
  return { guildId: 0, channelIds: [] };
}

export const UpdateAllChannelOrderRequest = {
  encode(
    message: UpdateAllChannelOrderRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    writer.uint32(18).fork();
    for (const v of message.channelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpdateAllChannelOrderRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAllChannelOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
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

  fromJSON(object: any): UpdateAllChannelOrderRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelIds: Array.isArray(object?.channelIds)
        ? object.channelIds.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: UpdateAllChannelOrderRequest): unknown {
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

  fromPartial<I extends Exact<DeepPartial<UpdateAllChannelOrderRequest>, I>>(
    object: I
  ): UpdateAllChannelOrderRequest {
    const message = createBaseUpdateAllChannelOrderRequest();
    message.guildId = object.guildId ?? 0;
    message.channelIds = object.channelIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseUpdateAllChannelOrderResponse(): UpdateAllChannelOrderResponse {
  return {};
}

export const UpdateAllChannelOrderResponse = {
  encode(
    _: UpdateAllChannelOrderResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpdateAllChannelOrderResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAllChannelOrderResponse();
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

  fromJSON(_: any): UpdateAllChannelOrderResponse {
    return {};
  },

  toJSON(_: UpdateAllChannelOrderResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateAllChannelOrderResponse>, I>>(
    _: I
  ): UpdateAllChannelOrderResponse {
    const message = createBaseUpdateAllChannelOrderResponse();
    return message;
  },
};

function createBaseDeleteChannelRequest(): DeleteChannelRequest {
  return { guildId: 0, channelId: 0 };
}

export const DeleteChannelRequest = {
  encode(
    message: DeleteChannelRequest,
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

  decode(input: Reader | Uint8Array, length?: number): DeleteChannelRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteChannelRequest();
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

  fromJSON(object: any): DeleteChannelRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
    };
  },

  toJSON(message: DeleteChannelRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteChannelRequest>, I>>(
    object: I
  ): DeleteChannelRequest {
    const message = createBaseDeleteChannelRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    return message;
  },
};

function createBaseDeleteChannelResponse(): DeleteChannelResponse {
  return {};
}

export const DeleteChannelResponse = {
  encode(_: DeleteChannelResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteChannelResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteChannelResponse();
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

  fromJSON(_: any): DeleteChannelResponse {
    return {};
  },

  toJSON(_: DeleteChannelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteChannelResponse>, I>>(
    _: I
  ): DeleteChannelResponse {
    const message = createBaseDeleteChannelResponse();
    return message;
  },
};

function createBaseTypingRequest(): TypingRequest {
  return { guildId: 0, channelId: 0 };
}

export const TypingRequest = {
  encode(message: TypingRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TypingRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypingRequest();
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

  fromJSON(object: any): TypingRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
    };
  },

  toJSON(message: TypingRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TypingRequest>, I>>(
    object: I
  ): TypingRequest {
    const message = createBaseTypingRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    return message;
  },
};

function createBaseTypingResponse(): TypingResponse {
  return {};
}

export const TypingResponse = {
  encode(_: TypingResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TypingResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTypingResponse();
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

  fromJSON(_: any): TypingResponse {
    return {};
  },

  toJSON(_: TypingResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TypingResponse>, I>>(
    _: I
  ): TypingResponse {
    const message = createBaseTypingResponse();
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
