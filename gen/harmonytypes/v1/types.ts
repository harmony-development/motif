/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "protocol.harmonytypes.v1";

/**
 * Metadata for methods. These are set in individual RPC endpoints and are
 * typically used by servers.
 */
export interface HarmonyMethodMetadata {
  /** whether the method requires authentication. */
  requiresAuthentication: boolean;
  /** whether the method allows federation or not. */
  requiresLocal: boolean;
  /** the permission nodes required to invoke the method. */
  requiresPermissionNode: string;
  /** whether the method requires owner */
  requiresOwner: boolean;
}

/** Anything holds anything */
export interface Anything {
  /** Kind is the kind of the message */
  kind: string;
  /** Body is the serialised bytes */
  body: Uint8Array;
}

/** Metadata type used by many messages. */
export interface Metadata {
  /** Kind of this metadata. */
  kind: string;
  /** A map containing information. */
  extension: { [key: string]: Anything };
}

export interface Metadata_ExtensionEntry {
  key: string;
  value?: Anything;
}

/** Token that will be used for authentication. */
export interface Token {
  /**
   * Ed25519 signature of the following serialized protobuf data, signed
   * with a private key. Which private key used to sign will be described
   * in the documentation.
   *
   * Has to be 64 bytes long, otherwise it will be rejected.
   */
  sig: Uint8Array;
  /**
   * Serialized protobuf data.
   * The protobuf type of this serialized data is dependent on the API endpoint
   * used.
   */
  data: Uint8Array;
}

/** An empty message */
export interface Empty {}

/** An object representing an item position between two other items. */
export interface ItemPosition {
  /** The ID of the item the position is relative to */
  itemId: number;
  /** Whether the position is before or after the given ID */
  position: ItemPosition_Position;
}

/** The position */
export enum ItemPosition_Position {
  /** POSITION_BEFORE_UNSPECIFIED - The position is before the item */
  POSITION_BEFORE_UNSPECIFIED = 0,
  /** POSITION_AFTER - The position is after the item */
  POSITION_AFTER = 1,
  UNRECOGNIZED = -1,
}

export function itemPosition_PositionFromJSON(
  object: any
): ItemPosition_Position {
  switch (object) {
    case 0:
    case "POSITION_BEFORE_UNSPECIFIED":
      return ItemPosition_Position.POSITION_BEFORE_UNSPECIFIED;
    case 1:
    case "POSITION_AFTER":
      return ItemPosition_Position.POSITION_AFTER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ItemPosition_Position.UNRECOGNIZED;
  }
}

export function itemPosition_PositionToJSON(
  object: ItemPosition_Position
): string {
  switch (object) {
    case ItemPosition_Position.POSITION_BEFORE_UNSPECIFIED:
      return "POSITION_BEFORE_UNSPECIFIED";
    case ItemPosition_Position.POSITION_AFTER:
      return "POSITION_AFTER";
    default:
      return "UNKNOWN";
  }
}

function createBaseHarmonyMethodMetadata(): HarmonyMethodMetadata {
  return {
    requiresAuthentication: false,
    requiresLocal: false,
    requiresPermissionNode: "",
    requiresOwner: false,
  };
}

export const HarmonyMethodMetadata = {
  encode(
    message: HarmonyMethodMetadata,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.requiresAuthentication === true) {
      writer.uint32(8).bool(message.requiresAuthentication);
    }
    if (message.requiresLocal === true) {
      writer.uint32(16).bool(message.requiresLocal);
    }
    if (message.requiresPermissionNode !== "") {
      writer.uint32(26).string(message.requiresPermissionNode);
    }
    if (message.requiresOwner === true) {
      writer.uint32(32).bool(message.requiresOwner);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): HarmonyMethodMetadata {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHarmonyMethodMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.requiresAuthentication = reader.bool();
          break;
        case 2:
          message.requiresLocal = reader.bool();
          break;
        case 3:
          message.requiresPermissionNode = reader.string();
          break;
        case 4:
          message.requiresOwner = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HarmonyMethodMetadata {
    return {
      requiresAuthentication: isSet(object.requiresAuthentication)
        ? Boolean(object.requiresAuthentication)
        : false,
      requiresLocal: isSet(object.requiresLocal)
        ? Boolean(object.requiresLocal)
        : false,
      requiresPermissionNode: isSet(object.requiresPermissionNode)
        ? String(object.requiresPermissionNode)
        : "",
      requiresOwner: isSet(object.requiresOwner)
        ? Boolean(object.requiresOwner)
        : false,
    };
  },

  toJSON(message: HarmonyMethodMetadata): unknown {
    const obj: any = {};
    message.requiresAuthentication !== undefined &&
      (obj.requiresAuthentication = message.requiresAuthentication);
    message.requiresLocal !== undefined &&
      (obj.requiresLocal = message.requiresLocal);
    message.requiresPermissionNode !== undefined &&
      (obj.requiresPermissionNode = message.requiresPermissionNode);
    message.requiresOwner !== undefined &&
      (obj.requiresOwner = message.requiresOwner);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HarmonyMethodMetadata>, I>>(
    object: I
  ): HarmonyMethodMetadata {
    const message = createBaseHarmonyMethodMetadata();
    message.requiresAuthentication = object.requiresAuthentication ?? false;
    message.requiresLocal = object.requiresLocal ?? false;
    message.requiresPermissionNode = object.requiresPermissionNode ?? "";
    message.requiresOwner = object.requiresOwner ?? false;
    return message;
  },
};

function createBaseAnything(): Anything {
  return { kind: "", body: new Uint8Array() };
}

export const Anything = {
  encode(message: Anything, writer: Writer = Writer.create()): Writer {
    if (message.kind !== "") {
      writer.uint32(10).string(message.kind);
    }
    if (message.body.length !== 0) {
      writer.uint32(18).bytes(message.body);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Anything {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnything();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = reader.string();
          break;
        case 2:
          message.body = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Anything {
    return {
      kind: isSet(object.kind) ? String(object.kind) : "",
      body: isSet(object.body)
        ? bytesFromBase64(object.body)
        : new Uint8Array(),
    };
  },

  toJSON(message: Anything): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = message.kind);
    message.body !== undefined &&
      (obj.body = base64FromBytes(
        message.body !== undefined ? message.body : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Anything>, I>>(object: I): Anything {
    const message = createBaseAnything();
    message.kind = object.kind ?? "";
    message.body = object.body ?? new Uint8Array();
    return message;
  },
};

function createBaseMetadata(): Metadata {
  return { kind: "", extension: {} };
}

export const Metadata = {
  encode(message: Metadata, writer: Writer = Writer.create()): Writer {
    if (message.kind !== "") {
      writer.uint32(10).string(message.kind);
    }
    Object.entries(message.extension).forEach(([key, value]) => {
      Metadata_ExtensionEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = reader.string();
          break;
        case 2:
          const entry2 = Metadata_ExtensionEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.extension[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      kind: isSet(object.kind) ? String(object.kind) : "",
      extension: isObject(object.extension)
        ? Object.entries(object.extension).reduce<{ [key: string]: Anything }>(
            (acc, [key, value]) => {
              acc[key] = Anything.fromJSON(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    message.kind !== undefined && (obj.kind = message.kind);
    obj.extension = {};
    if (message.extension) {
      Object.entries(message.extension).forEach(([k, v]) => {
        obj.extension[k] = Anything.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.kind = object.kind ?? "";
    message.extension = Object.entries(object.extension ?? {}).reduce<{
      [key: string]: Anything;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Anything.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseMetadata_ExtensionEntry(): Metadata_ExtensionEntry {
  return { key: "", value: undefined };
}

export const Metadata_ExtensionEntry = {
  encode(
    message: Metadata_ExtensionEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Anything.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Metadata_ExtensionEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata_ExtensionEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Anything.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata_ExtensionEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Anything.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Metadata_ExtensionEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Anything.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Metadata_ExtensionEntry>, I>>(
    object: I
  ): Metadata_ExtensionEntry {
    const message = createBaseMetadata_ExtensionEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Anything.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseToken(): Token {
  return { sig: new Uint8Array(), data: new Uint8Array() };
}

export const Token = {
  encode(message: Token, writer: Writer = Writer.create()): Writer {
    if (message.sig.length !== 0) {
      writer.uint32(10).bytes(message.sig);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Token {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sig = reader.bytes();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Token {
    return {
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: Token): unknown {
    const obj: any = {};
    message.sig !== undefined &&
      (obj.sig = base64FromBytes(
        message.sig !== undefined ? message.sig : new Uint8Array()
      ));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Token>, I>>(object: I): Token {
    const message = createBaseToken();
    message.sig = object.sig ?? new Uint8Array();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
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

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseItemPosition(): ItemPosition {
  return { itemId: 0, position: 0 };
}

export const ItemPosition = {
  encode(message: ItemPosition, writer: Writer = Writer.create()): Writer {
    if (message.itemId !== 0) {
      writer.uint32(8).uint64(message.itemId);
    }
    if (message.position !== 0) {
      writer.uint32(16).int32(message.position);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ItemPosition {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.itemId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.position = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ItemPosition {
    return {
      itemId: isSet(object.itemId) ? Number(object.itemId) : 0,
      position: isSet(object.position)
        ? itemPosition_PositionFromJSON(object.position)
        : 0,
    };
  },

  toJSON(message: ItemPosition): unknown {
    const obj: any = {};
    message.itemId !== undefined && (obj.itemId = Math.round(message.itemId));
    message.position !== undefined &&
      (obj.position = itemPosition_PositionToJSON(message.position));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ItemPosition>, I>>(
    object: I
  ): ItemPosition {
    const message = createBaseItemPosition();
    message.itemId = object.itemId ?? 0;
    message.position = object.position ?? 0;
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

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
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
