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
  pack?: EmotePack;
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
  event?:
    | { $case: "emotePackAdded"; emotePackAdded: EmotePackAdded }
    | { $case: "emotePackUpdated"; emotePackUpdated: EmotePackUpdated }
    | { $case: "emotePackDeleted"; emotePackDeleted: EmotePackDeleted }
    | {
        $case: "emotePackEmotesUpdated";
        emotePackEmotesUpdated: EmotePackEmotesUpdated;
      };
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
  return { event: undefined };
}

export const StreamEvent = {
  encode(message: StreamEvent, writer: Writer = Writer.create()): Writer {
    if (message.event?.$case === "emotePackAdded") {
      EmotePackAdded.encode(
        message.event.emotePackAdded,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.event?.$case === "emotePackUpdated") {
      EmotePackUpdated.encode(
        message.event.emotePackUpdated,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.event?.$case === "emotePackDeleted") {
      EmotePackDeleted.encode(
        message.event.emotePackDeleted,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.event?.$case === "emotePackEmotesUpdated") {
      EmotePackEmotesUpdated.encode(
        message.event.emotePackEmotesUpdated,
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
          message.event = {
            $case: "emotePackAdded",
            emotePackAdded: EmotePackAdded.decode(reader, reader.uint32()),
          };
          break;
        case 2:
          message.event = {
            $case: "emotePackUpdated",
            emotePackUpdated: EmotePackUpdated.decode(reader, reader.uint32()),
          };
          break;
        case 3:
          message.event = {
            $case: "emotePackDeleted",
            emotePackDeleted: EmotePackDeleted.decode(reader, reader.uint32()),
          };
          break;
        case 4:
          message.event = {
            $case: "emotePackEmotesUpdated",
            emotePackEmotesUpdated: EmotePackEmotesUpdated.decode(
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

  fromJSON(object: any): StreamEvent {
    return {
      event: isSet(object.emotePackAdded)
        ? {
            $case: "emotePackAdded",
            emotePackAdded: EmotePackAdded.fromJSON(object.emotePackAdded),
          }
        : isSet(object.emotePackUpdated)
        ? {
            $case: "emotePackUpdated",
            emotePackUpdated: EmotePackUpdated.fromJSON(
              object.emotePackUpdated
            ),
          }
        : isSet(object.emotePackDeleted)
        ? {
            $case: "emotePackDeleted",
            emotePackDeleted: EmotePackDeleted.fromJSON(
              object.emotePackDeleted
            ),
          }
        : isSet(object.emotePackEmotesUpdated)
        ? {
            $case: "emotePackEmotesUpdated",
            emotePackEmotesUpdated: EmotePackEmotesUpdated.fromJSON(
              object.emotePackEmotesUpdated
            ),
          }
        : undefined,
    };
  },

  toJSON(message: StreamEvent): unknown {
    const obj: any = {};
    message.event?.$case === "emotePackAdded" &&
      (obj.emotePackAdded = message.event?.emotePackAdded
        ? EmotePackAdded.toJSON(message.event?.emotePackAdded)
        : undefined);
    message.event?.$case === "emotePackUpdated" &&
      (obj.emotePackUpdated = message.event?.emotePackUpdated
        ? EmotePackUpdated.toJSON(message.event?.emotePackUpdated)
        : undefined);
    message.event?.$case === "emotePackDeleted" &&
      (obj.emotePackDeleted = message.event?.emotePackDeleted
        ? EmotePackDeleted.toJSON(message.event?.emotePackDeleted)
        : undefined);
    message.event?.$case === "emotePackEmotesUpdated" &&
      (obj.emotePackEmotesUpdated = message.event?.emotePackEmotesUpdated
        ? EmotePackEmotesUpdated.toJSON(message.event?.emotePackEmotesUpdated)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent>, I>>(
    object: I
  ): StreamEvent {
    const message = createBaseStreamEvent();
    if (
      object.event?.$case === "emotePackAdded" &&
      object.event?.emotePackAdded !== undefined &&
      object.event?.emotePackAdded !== null
    ) {
      message.event = {
        $case: "emotePackAdded",
        emotePackAdded: EmotePackAdded.fromPartial(object.event.emotePackAdded),
      };
    }
    if (
      object.event?.$case === "emotePackUpdated" &&
      object.event?.emotePackUpdated !== undefined &&
      object.event?.emotePackUpdated !== null
    ) {
      message.event = {
        $case: "emotePackUpdated",
        emotePackUpdated: EmotePackUpdated.fromPartial(
          object.event.emotePackUpdated
        ),
      };
    }
    if (
      object.event?.$case === "emotePackDeleted" &&
      object.event?.emotePackDeleted !== undefined &&
      object.event?.emotePackDeleted !== null
    ) {
      message.event = {
        $case: "emotePackDeleted",
        emotePackDeleted: EmotePackDeleted.fromPartial(
          object.event.emotePackDeleted
        ),
      };
    }
    if (
      object.event?.$case === "emotePackEmotesUpdated" &&
      object.event?.emotePackEmotesUpdated !== undefined &&
      object.event?.emotePackEmotesUpdated !== null
    ) {
      message.event = {
        $case: "emotePackEmotesUpdated",
        emotePackEmotesUpdated: EmotePackEmotesUpdated.fromPartial(
          object.event.emotePackEmotesUpdated
        ),
      };
    }
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
