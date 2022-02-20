/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "protocol.emote.v1";

/** Data for a single pack of emotes. */
export interface EmotePack {
  /** The ID of the pack. */
  packId?: number;
  /** The ID of the user who created the pack. */
  packOwner?: number;
  /** The name of the pack. */
  packName?: string;
}

/** Data for a single emote. */
export interface Emote {
  /** The HMC of the emote. Must point to an image. */
  imageId?: string;
  /** The name of the emote. */
  name?: string;
}

/** Used in the `CreateEmotePack` endpoint. */
export interface CreateEmotePackRequest {
  /** the name of the pack. */
  packName?: string;
}

/** Used in the `CreateEmotePack` endpoint. */
export interface CreateEmotePackResponse {
  /** The ID of the pack. */
  packId?: number;
}

/** Used in the `GetEmotePacks` endpoint. */
export interface GetEmotePacksRequest {}

/** Used in the `GetEmotePacks` endpoint. */
export interface GetEmotePacksResponse {
  /** The list of emote packs. */
  packs?: EmotePack[];
}

/** Used in the `GetEmotes` endpoint. */
export interface GetEmotePackEmotesRequest {
  /** The ID of the pack. */
  packId?: number[];
}

/** Used in the `GetEmotes` endpoint. */
export interface GetEmotePackEmotesResponse {
  /** The requested emote packs' emotes. */
  packEmotes?: { [key: number]: GetEmotePackEmotesResponse_EmotePackEmotes };
}

/** An emote pack's emotes. */
export interface GetEmotePackEmotesResponse_EmotePackEmotes {
  /** The list of emotes in the pack. */
  emotes?: Emote[];
}

export interface GetEmotePackEmotesResponse_PackEmotesEntry {
  key: number;
  value?: GetEmotePackEmotesResponse_EmotePackEmotes;
}

/** Used in the `AddEmoteToPack` endpoint. */
export interface AddEmoteToPackRequest {
  /** The ID of the pack. */
  packId?: number;
  /** The file ID of the image to use for the emote. */
  imageId?: string;
  /** The name of the emote. */
  name?: string;
}

/** Used in the `AddEmoteToPack` endpoint. */
export interface AddEmoteToPackResponse {}

/** Used in the `DeleteEmoteFromPack` endpoint. */
export interface DeleteEmoteFromPackRequest {
  /** The ID of the pack. */
  packId?: number;
  /** The name of the emote to delete. */
  name?: string;
}

/** Used in the `DeleteEmoteFromPack` endpoint. */
export interface DeleteEmoteFromPackResponse {}

/** Used in the `DeleteEmotePack` endpoint. */
export interface DeleteEmotePackRequest {
  /** The ID of the pack. */
  packId?: number;
}

/** Used in the `DeleteEmotePack` endpoint. */
export interface DeleteEmotePackResponse {}

/** Used in the `DequipEmotePack` endpoint. */
export interface DequipEmotePackRequest {
  /** The ID of the pack. */
  packId?: number;
}

/** Used in the `DequipEmotePack` endpoint. */
export interface DequipEmotePackResponse {}

/** Used in the `EquipEmotePack` endpoint. */
export interface EquipEmotePackRequest {
  /** The ID of the pack. */
  packId?: number;
}

/** Used in the `EquipEmotePack` endpoint. */
export interface EquipEmotePackResponse {}

function createBaseEmotePack(): EmotePack {
  return { packId: 0, packOwner: 0, packName: "" };
}

export const EmotePack = {
  encode(message: EmotePack, writer: Writer = Writer.create()): Writer {
    if (message.packId !== undefined && message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    if (message.packOwner !== undefined && message.packOwner !== 0) {
      writer.uint32(16).uint64(message.packOwner);
    }
    if (message.packName !== undefined && message.packName !== "") {
      writer.uint32(26).string(message.packName);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EmotePack {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmotePack();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.packOwner = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.packName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EmotePack {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
      packOwner: isSet(object.packOwner) ? Number(object.packOwner) : 0,
      packName: isSet(object.packName) ? String(object.packName) : "",
    };
  },

  toJSON(message: EmotePack): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    message.packOwner !== undefined &&
      (obj.packOwner = Math.round(message.packOwner));
    message.packName !== undefined && (obj.packName = message.packName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmotePack>, I>>(
    object: I
  ): EmotePack {
    const message = createBaseEmotePack();
    message.packId = object.packId ?? 0;
    message.packOwner = object.packOwner ?? 0;
    message.packName = object.packName ?? "";
    return message;
  },
};

function createBaseEmote(): Emote {
  return { imageId: "", name: "" };
}

export const Emote = {
  encode(message: Emote, writer: Writer = Writer.create()): Writer {
    if (message.imageId !== undefined && message.imageId !== "") {
      writer.uint32(10).string(message.imageId);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Emote {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.imageId = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Emote {
    return {
      imageId: isSet(object.imageId) ? String(object.imageId) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: Emote): unknown {
    const obj: any = {};
    message.imageId !== undefined && (obj.imageId = message.imageId);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Emote>, I>>(object: I): Emote {
    const message = createBaseEmote();
    message.imageId = object.imageId ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCreateEmotePackRequest(): CreateEmotePackRequest {
  return { packName: "" };
}

export const CreateEmotePackRequest = {
  encode(
    message: CreateEmotePackRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packName !== undefined && message.packName !== "") {
      writer.uint32(10).string(message.packName);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateEmotePackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateEmotePackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateEmotePackRequest {
    return {
      packName: isSet(object.packName) ? String(object.packName) : "",
    };
  },

  toJSON(message: CreateEmotePackRequest): unknown {
    const obj: any = {};
    message.packName !== undefined && (obj.packName = message.packName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateEmotePackRequest>, I>>(
    object: I
  ): CreateEmotePackRequest {
    const message = createBaseCreateEmotePackRequest();
    message.packName = object.packName ?? "";
    return message;
  },
};

function createBaseCreateEmotePackResponse(): CreateEmotePackResponse {
  return { packId: 0 };
}

export const CreateEmotePackResponse = {
  encode(
    message: CreateEmotePackResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packId !== undefined && message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateEmotePackResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateEmotePackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateEmotePackResponse {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
    };
  },

  toJSON(message: CreateEmotePackResponse): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateEmotePackResponse>, I>>(
    object: I
  ): CreateEmotePackResponse {
    const message = createBaseCreateEmotePackResponse();
    message.packId = object.packId ?? 0;
    return message;
  },
};

function createBaseGetEmotePacksRequest(): GetEmotePacksRequest {
  return {};
}

export const GetEmotePacksRequest = {
  encode(_: GetEmotePacksRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetEmotePacksRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEmotePacksRequest();
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

  fromJSON(_: any): GetEmotePacksRequest {
    return {};
  },

  toJSON(_: GetEmotePacksRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEmotePacksRequest>, I>>(
    _: I
  ): GetEmotePacksRequest {
    const message = createBaseGetEmotePacksRequest();
    return message;
  },
};

function createBaseGetEmotePacksResponse(): GetEmotePacksResponse {
  return { packs: [] };
}

export const GetEmotePacksResponse = {
  encode(
    message: GetEmotePacksResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packs !== undefined && message.packs.length !== 0) {
      for (const v of message.packs) {
        EmotePack.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetEmotePacksResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEmotePacksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packs!.push(EmotePack.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetEmotePacksResponse {
    return {
      packs: Array.isArray(object?.packs)
        ? object.packs.map((e: any) => EmotePack.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetEmotePacksResponse): unknown {
    const obj: any = {};
    if (message.packs) {
      obj.packs = message.packs.map((e) =>
        e ? EmotePack.toJSON(e) : undefined
      );
    } else {
      obj.packs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEmotePacksResponse>, I>>(
    object: I
  ): GetEmotePacksResponse {
    const message = createBaseGetEmotePacksResponse();
    message.packs = object.packs?.map((e) => EmotePack.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetEmotePackEmotesRequest(): GetEmotePackEmotesRequest {
  return { packId: [] };
}

export const GetEmotePackEmotesRequest = {
  encode(
    message: GetEmotePackEmotesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packId !== undefined && message.packId.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.packId) {
        writer.uint64(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetEmotePackEmotesRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEmotePackEmotesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.packId!.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.packId!.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetEmotePackEmotesRequest {
    return {
      packId: Array.isArray(object?.packId)
        ? object.packId.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: GetEmotePackEmotesRequest): unknown {
    const obj: any = {};
    if (message.packId) {
      obj.packId = message.packId.map((e) => Math.round(e));
    } else {
      obj.packId = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEmotePackEmotesRequest>, I>>(
    object: I
  ): GetEmotePackEmotesRequest {
    const message = createBaseGetEmotePackEmotesRequest();
    message.packId = object.packId?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetEmotePackEmotesResponse(): GetEmotePackEmotesResponse {
  return { packEmotes: {} };
}

export const GetEmotePackEmotesResponse = {
  encode(
    message: GetEmotePackEmotesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    Object.entries(message.packEmotes || {}).forEach(([key, value]) => {
      GetEmotePackEmotesResponse_PackEmotesEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetEmotePackEmotesResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEmotePackEmotesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GetEmotePackEmotesResponse_PackEmotesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.packEmotes![entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetEmotePackEmotesResponse {
    return {
      packEmotes: isObject(object.packEmotes)
        ? Object.entries(object.packEmotes).reduce<{
            [key: number]: GetEmotePackEmotesResponse_EmotePackEmotes;
          }>((acc, [key, value]) => {
            acc[Number(key)] =
              GetEmotePackEmotesResponse_EmotePackEmotes.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: GetEmotePackEmotesResponse): unknown {
    const obj: any = {};
    obj.packEmotes = {};
    if (message.packEmotes) {
      Object.entries(message.packEmotes).forEach(([k, v]) => {
        obj.packEmotes[k] =
          GetEmotePackEmotesResponse_EmotePackEmotes.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetEmotePackEmotesResponse>, I>>(
    object: I
  ): GetEmotePackEmotesResponse {
    const message = createBaseGetEmotePackEmotesResponse();
    message.packEmotes = Object.entries(object.packEmotes ?? {}).reduce<{
      [key: number]: GetEmotePackEmotesResponse_EmotePackEmotes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[Number(key)] =
          GetEmotePackEmotesResponse_EmotePackEmotes.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetEmotePackEmotesResponse_EmotePackEmotes(): GetEmotePackEmotesResponse_EmotePackEmotes {
  return { emotes: [] };
}

export const GetEmotePackEmotesResponse_EmotePackEmotes = {
  encode(
    message: GetEmotePackEmotesResponse_EmotePackEmotes,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.emotes !== undefined && message.emotes.length !== 0) {
      for (const v of message.emotes) {
        Emote.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetEmotePackEmotesResponse_EmotePackEmotes {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEmotePackEmotesResponse_EmotePackEmotes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.emotes!.push(Emote.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetEmotePackEmotesResponse_EmotePackEmotes {
    return {
      emotes: Array.isArray(object?.emotes)
        ? object.emotes.map((e: any) => Emote.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetEmotePackEmotesResponse_EmotePackEmotes): unknown {
    const obj: any = {};
    if (message.emotes) {
      obj.emotes = message.emotes.map((e) => (e ? Emote.toJSON(e) : undefined));
    } else {
      obj.emotes = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetEmotePackEmotesResponse_EmotePackEmotes>, I>
  >(object: I): GetEmotePackEmotesResponse_EmotePackEmotes {
    const message = createBaseGetEmotePackEmotesResponse_EmotePackEmotes();
    message.emotes = object.emotes?.map((e) => Emote.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetEmotePackEmotesResponse_PackEmotesEntry(): GetEmotePackEmotesResponse_PackEmotesEntry {
  return { key: 0, value: undefined };
}

export const GetEmotePackEmotesResponse_PackEmotesEntry = {
  encode(
    message: GetEmotePackEmotesResponse_PackEmotesEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== 0) {
      writer.uint32(8).uint64(message.key);
    }
    if (message.value !== undefined) {
      GetEmotePackEmotesResponse_EmotePackEmotes.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetEmotePackEmotesResponse_PackEmotesEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetEmotePackEmotesResponse_PackEmotesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.value = GetEmotePackEmotesResponse_EmotePackEmotes.decode(
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

  fromJSON(object: any): GetEmotePackEmotesResponse_PackEmotesEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value)
        ? GetEmotePackEmotesResponse_EmotePackEmotes.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: GetEmotePackEmotesResponse_PackEmotesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = Math.round(message.key));
    message.value !== undefined &&
      (obj.value = message.value
        ? GetEmotePackEmotesResponse_EmotePackEmotes.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetEmotePackEmotesResponse_PackEmotesEntry>, I>
  >(object: I): GetEmotePackEmotesResponse_PackEmotesEntry {
    const message = createBaseGetEmotePackEmotesResponse_PackEmotesEntry();
    message.key = object.key ?? 0;
    message.value =
      object.value !== undefined && object.value !== null
        ? GetEmotePackEmotesResponse_EmotePackEmotes.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseAddEmoteToPackRequest(): AddEmoteToPackRequest {
  return { packId: 0, imageId: "", name: "" };
}

export const AddEmoteToPackRequest = {
  encode(
    message: AddEmoteToPackRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packId !== undefined && message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    if (message.imageId !== undefined && message.imageId !== "") {
      writer.uint32(18).string(message.imageId);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddEmoteToPackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddEmoteToPackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.imageId = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddEmoteToPackRequest {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
      imageId: isSet(object.imageId) ? String(object.imageId) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: AddEmoteToPackRequest): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    message.imageId !== undefined && (obj.imageId = message.imageId);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddEmoteToPackRequest>, I>>(
    object: I
  ): AddEmoteToPackRequest {
    const message = createBaseAddEmoteToPackRequest();
    message.packId = object.packId ?? 0;
    message.imageId = object.imageId ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseAddEmoteToPackResponse(): AddEmoteToPackResponse {
  return {};
}

export const AddEmoteToPackResponse = {
  encode(_: AddEmoteToPackResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddEmoteToPackResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddEmoteToPackResponse();
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

  fromJSON(_: any): AddEmoteToPackResponse {
    return {};
  },

  toJSON(_: AddEmoteToPackResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddEmoteToPackResponse>, I>>(
    _: I
  ): AddEmoteToPackResponse {
    const message = createBaseAddEmoteToPackResponse();
    return message;
  },
};

function createBaseDeleteEmoteFromPackRequest(): DeleteEmoteFromPackRequest {
  return { packId: 0, name: "" };
}

export const DeleteEmoteFromPackRequest = {
  encode(
    message: DeleteEmoteFromPackRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packId !== undefined && message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): DeleteEmoteFromPackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteEmoteFromPackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteEmoteFromPackRequest {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: DeleteEmoteFromPackRequest): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteEmoteFromPackRequest>, I>>(
    object: I
  ): DeleteEmoteFromPackRequest {
    const message = createBaseDeleteEmoteFromPackRequest();
    message.packId = object.packId ?? 0;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseDeleteEmoteFromPackResponse(): DeleteEmoteFromPackResponse {
  return {};
}

export const DeleteEmoteFromPackResponse = {
  encode(
    _: DeleteEmoteFromPackResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): DeleteEmoteFromPackResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteEmoteFromPackResponse();
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

  fromJSON(_: any): DeleteEmoteFromPackResponse {
    return {};
  },

  toJSON(_: DeleteEmoteFromPackResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteEmoteFromPackResponse>, I>>(
    _: I
  ): DeleteEmoteFromPackResponse {
    const message = createBaseDeleteEmoteFromPackResponse();
    return message;
  },
};

function createBaseDeleteEmotePackRequest(): DeleteEmotePackRequest {
  return { packId: 0 };
}

export const DeleteEmotePackRequest = {
  encode(
    message: DeleteEmotePackRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packId !== undefined && message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteEmotePackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteEmotePackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteEmotePackRequest {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
    };
  },

  toJSON(message: DeleteEmotePackRequest): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteEmotePackRequest>, I>>(
    object: I
  ): DeleteEmotePackRequest {
    const message = createBaseDeleteEmotePackRequest();
    message.packId = object.packId ?? 0;
    return message;
  },
};

function createBaseDeleteEmotePackResponse(): DeleteEmotePackResponse {
  return {};
}

export const DeleteEmotePackResponse = {
  encode(_: DeleteEmotePackResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteEmotePackResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteEmotePackResponse();
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

  fromJSON(_: any): DeleteEmotePackResponse {
    return {};
  },

  toJSON(_: DeleteEmotePackResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteEmotePackResponse>, I>>(
    _: I
  ): DeleteEmotePackResponse {
    const message = createBaseDeleteEmotePackResponse();
    return message;
  },
};

function createBaseDequipEmotePackRequest(): DequipEmotePackRequest {
  return { packId: 0 };
}

export const DequipEmotePackRequest = {
  encode(
    message: DequipEmotePackRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packId !== undefined && message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DequipEmotePackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDequipEmotePackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DequipEmotePackRequest {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
    };
  },

  toJSON(message: DequipEmotePackRequest): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DequipEmotePackRequest>, I>>(
    object: I
  ): DequipEmotePackRequest {
    const message = createBaseDequipEmotePackRequest();
    message.packId = object.packId ?? 0;
    return message;
  },
};

function createBaseDequipEmotePackResponse(): DequipEmotePackResponse {
  return {};
}

export const DequipEmotePackResponse = {
  encode(_: DequipEmotePackResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DequipEmotePackResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDequipEmotePackResponse();
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

  fromJSON(_: any): DequipEmotePackResponse {
    return {};
  },

  toJSON(_: DequipEmotePackResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DequipEmotePackResponse>, I>>(
    _: I
  ): DequipEmotePackResponse {
    const message = createBaseDequipEmotePackResponse();
    return message;
  },
};

function createBaseEquipEmotePackRequest(): EquipEmotePackRequest {
  return { packId: 0 };
}

export const EquipEmotePackRequest = {
  encode(
    message: EquipEmotePackRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packId !== undefined && message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EquipEmotePackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEquipEmotePackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EquipEmotePackRequest {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
    };
  },

  toJSON(message: EquipEmotePackRequest): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EquipEmotePackRequest>, I>>(
    object: I
  ): EquipEmotePackRequest {
    const message = createBaseEquipEmotePackRequest();
    message.packId = object.packId ?? 0;
    return message;
  },
};

function createBaseEquipEmotePackResponse(): EquipEmotePackResponse {
  return {};
}

export const EquipEmotePackResponse = {
  encode(_: EquipEmotePackResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EquipEmotePackResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEquipEmotePackResponse();
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

  fromJSON(_: any): EquipEmotePackResponse {
    return {};
  },

  toJSON(_: EquipEmotePackResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EquipEmotePackResponse>, I>>(
    _: I
  ): EquipEmotePackResponse {
    const message = createBaseEquipEmotePackResponse();
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
