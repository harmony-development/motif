/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { EmotePack, Emote } from "../../emote/v1/types";

export const protobufPackage = "protocol.emote.v1";

/**
 * Event sent when an emote pack's information is changed.
 *
 * Should only be sent to users who have the pack equipped.
 */
export interface EmotePackUpdated {
  /** ID of the pack that was updated. */
  packId: number;
  /** New pack name of the pack. */
  newPackName?: string | undefined;
}

/**
 * Event sent when an emote pack is deleted.
 *
 * Should only be sent to users who have the pack equipped.
 * Should also be sent if a user dequips an emote pack, only to the user that dequipped it.
 */
export interface EmotePackDeleted {
  /** ID of the pack that was deleted. */
  packId: number;
}

/**
 * Event sent when an emote pack is added.
 *
 * Should only be sent to the user who equipped the pack.
 */
export interface EmotePackAdded {
  /** Emote pack that was equipped by the user. */
  pack: EmotePack | undefined;
}

/**
 * Event sent when an emote pack's emotes were changed.
 *
 * Should only be sent to users who have the pack equipped.
 */
export interface EmotePackEmotesUpdated {
  /** ID of the pack to update the emotes of. */
  packId: number;
  /** The added emotes. */
  addedEmotes: Emote[];
  /** The names of the deleted emotes. */
  deletedEmotes: string[];
}

/** Describes an emote service event. */
export interface StreamEvent {
  /** Send the emote pack added event. */
  emotePackAdded: EmotePackAdded | undefined;
  /** Send the emote pack updated event. */
  emotePackUpdated: EmotePackUpdated | undefined;
  /** Send the emote pack deleted event. */
  emotePackDeleted: EmotePackDeleted | undefined;
  /** Send the emote pack emotes updated event. */
  emotePackEmotesUpdated: EmotePackEmotesUpdated | undefined;
}

function createBaseEmotePackUpdated(): EmotePackUpdated {
  return { packId: 0, newPackName: undefined };
}

export const EmotePackUpdated = {
  encode(message: EmotePackUpdated, writer: Writer = Writer.create()): Writer {
    if (message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    if (message.newPackName !== undefined) {
      writer.uint32(18).string(message.newPackName);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EmotePackUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmotePackUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.newPackName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EmotePackUpdated {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
      newPackName: isSet(object.newPackName)
        ? String(object.newPackName)
        : undefined,
    };
  },

  toJSON(message: EmotePackUpdated): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    message.newPackName !== undefined &&
      (obj.newPackName = message.newPackName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmotePackUpdated>, I>>(
    object: I
  ): EmotePackUpdated {
    const message = createBaseEmotePackUpdated();
    message.packId = object.packId ?? 0;
    message.newPackName = object.newPackName ?? undefined;
    return message;
  },
};

function createBaseEmotePackDeleted(): EmotePackDeleted {
  return { packId: 0 };
}

export const EmotePackDeleted = {
  encode(message: EmotePackDeleted, writer: Writer = Writer.create()): Writer {
    if (message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EmotePackDeleted {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmotePackDeleted();
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

  fromJSON(object: any): EmotePackDeleted {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
    };
  },

  toJSON(message: EmotePackDeleted): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmotePackDeleted>, I>>(
    object: I
  ): EmotePackDeleted {
    const message = createBaseEmotePackDeleted();
    message.packId = object.packId ?? 0;
    return message;
  },
};

function createBaseEmotePackAdded(): EmotePackAdded {
  return { pack: undefined };
}

export const EmotePackAdded = {
  encode(message: EmotePackAdded, writer: Writer = Writer.create()): Writer {
    if (message.pack !== undefined) {
      EmotePack.encode(message.pack, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EmotePackAdded {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmotePackAdded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pack = EmotePack.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EmotePackAdded {
    return {
      pack: isSet(object.pack) ? EmotePack.fromJSON(object.pack) : undefined,
    };
  },

  toJSON(message: EmotePackAdded): unknown {
    const obj: any = {};
    message.pack !== undefined &&
      (obj.pack = message.pack ? EmotePack.toJSON(message.pack) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmotePackAdded>, I>>(
    object: I
  ): EmotePackAdded {
    const message = createBaseEmotePackAdded();
    message.pack =
      object.pack !== undefined && object.pack !== null
        ? EmotePack.fromPartial(object.pack)
        : undefined;
    return message;
  },
};

function createBaseEmotePackEmotesUpdated(): EmotePackEmotesUpdated {
  return { packId: 0, addedEmotes: [], deletedEmotes: [] };
}

export const EmotePackEmotesUpdated = {
  encode(
    message: EmotePackEmotesUpdated,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.packId !== 0) {
      writer.uint32(8).uint64(message.packId);
    }
    for (const v of message.addedEmotes) {
      Emote.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.deletedEmotes) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EmotePackEmotesUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmotePackEmotesUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.addedEmotes.push(Emote.decode(reader, reader.uint32()));
          break;
        case 3:
          message.deletedEmotes.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EmotePackEmotesUpdated {
    return {
      packId: isSet(object.packId) ? Number(object.packId) : 0,
      addedEmotes: Array.isArray(object?.addedEmotes)
        ? object.addedEmotes.map((e: any) => Emote.fromJSON(e))
        : [],
      deletedEmotes: Array.isArray(object?.deletedEmotes)
        ? object.deletedEmotes.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: EmotePackEmotesUpdated): unknown {
    const obj: any = {};
    message.packId !== undefined && (obj.packId = Math.round(message.packId));
    if (message.addedEmotes) {
      obj.addedEmotes = message.addedEmotes.map((e) =>
        e ? Emote.toJSON(e) : undefined
      );
    } else {
      obj.addedEmotes = [];
    }
    if (message.deletedEmotes) {
      obj.deletedEmotes = message.deletedEmotes.map((e) => e);
    } else {
      obj.deletedEmotes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmotePackEmotesUpdated>, I>>(
    object: I
  ): EmotePackEmotesUpdated {
    const message = createBaseEmotePackEmotesUpdated();
    message.packId = object.packId ?? 0;
    message.addedEmotes =
      object.addedEmotes?.map((e) => Emote.fromPartial(e)) || [];
    message.deletedEmotes = object.deletedEmotes?.map((e) => e) || [];
    return message;
  },
};

function createBaseStreamEvent(): StreamEvent {
  return {
    emotePackAdded: undefined,
    emotePackUpdated: undefined,
    emotePackDeleted: undefined,
    emotePackEmotesUpdated: undefined,
  };
}

export const StreamEvent = {
  encode(message: StreamEvent, writer: Writer = Writer.create()): Writer {
    if (message.emotePackAdded !== undefined) {
      EmotePackAdded.encode(
        message.emotePackAdded,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.emotePackUpdated !== undefined) {
      EmotePackUpdated.encode(
        message.emotePackUpdated,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.emotePackDeleted !== undefined) {
      EmotePackDeleted.encode(
        message.emotePackDeleted,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.emotePackEmotesUpdated !== undefined) {
      EmotePackEmotesUpdated.encode(
        message.emotePackEmotesUpdated,
        writer.uint32(34).fork()
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
          message.emotePackAdded = EmotePackAdded.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.emotePackUpdated = EmotePackUpdated.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.emotePackDeleted = EmotePackDeleted.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.emotePackEmotesUpdated = EmotePackEmotesUpdated.decode(
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
      emotePackAdded: isSet(object.emotePackAdded)
        ? EmotePackAdded.fromJSON(object.emotePackAdded)
        : undefined,
      emotePackUpdated: isSet(object.emotePackUpdated)
        ? EmotePackUpdated.fromJSON(object.emotePackUpdated)
        : undefined,
      emotePackDeleted: isSet(object.emotePackDeleted)
        ? EmotePackDeleted.fromJSON(object.emotePackDeleted)
        : undefined,
      emotePackEmotesUpdated: isSet(object.emotePackEmotesUpdated)
        ? EmotePackEmotesUpdated.fromJSON(object.emotePackEmotesUpdated)
        : undefined,
    };
  },

  toJSON(message: StreamEvent): unknown {
    const obj: any = {};
    message.emotePackAdded !== undefined &&
      (obj.emotePackAdded = message.emotePackAdded
        ? EmotePackAdded.toJSON(message.emotePackAdded)
        : undefined);
    message.emotePackUpdated !== undefined &&
      (obj.emotePackUpdated = message.emotePackUpdated
        ? EmotePackUpdated.toJSON(message.emotePackUpdated)
        : undefined);
    message.emotePackDeleted !== undefined &&
      (obj.emotePackDeleted = message.emotePackDeleted
        ? EmotePackDeleted.toJSON(message.emotePackDeleted)
        : undefined);
    message.emotePackEmotesUpdated !== undefined &&
      (obj.emotePackEmotesUpdated = message.emotePackEmotesUpdated
        ? EmotePackEmotesUpdated.toJSON(message.emotePackEmotesUpdated)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent>, I>>(
    object: I
  ): StreamEvent {
    const message = createBaseStreamEvent();
    message.emotePackAdded =
      object.emotePackAdded !== undefined && object.emotePackAdded !== null
        ? EmotePackAdded.fromPartial(object.emotePackAdded)
        : undefined;
    message.emotePackUpdated =
      object.emotePackUpdated !== undefined && object.emotePackUpdated !== null
        ? EmotePackUpdated.fromPartial(object.emotePackUpdated)
        : undefined;
    message.emotePackDeleted =
      object.emotePackDeleted !== undefined && object.emotePackDeleted !== null
        ? EmotePackDeleted.fromPartial(object.emotePackDeleted)
        : undefined;
    message.emotePackEmotesUpdated =
      object.emotePackEmotesUpdated !== undefined &&
      object.emotePackEmotesUpdated !== null
        ? EmotePackEmotesUpdated.fromPartial(object.emotePackEmotesUpdated)
        : undefined;
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
