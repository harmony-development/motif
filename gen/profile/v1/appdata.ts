/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Empty } from "../../harmonytypes/v1/types";

export const protobufPackage = "protocol.profile.v1";

/**
 * A tag for an override. This is used as a
 * standard shorthand for sending a message with
 * an override. If a message starts with before and
 * ends with after, clients should send a message
 * with the override the tag belongs to, stripping
 * the tag indicators.
 */
export interface OverrideTag {
  /** The portion of the tag before the messge. */
  before?: string;
  /** The portion of the tag after the messge. */
  after?: string;
}

/** An individual override. */
export interface ProfileOverride {
  /** The username for this override. */
  username?: string | undefined;
  /**
   * The avatar for this override.
   *
   * This can be a file ID or an external image URL.
   */
  avatar?: string | undefined;
  /** The tags for this override. */
  tags?: OverrideTag[];
  reason?:
    | { $case: "userDefined"; userDefined: string }
    | { $case: "systemPlurality"; systemPlurality: Empty };
}

/**
 * The message used for the 'h.overrides' app ID
 * of appdata.
 */
export interface AppDataOverrides {
  /** The list of overrides. */
  overrides?: ProfileOverride[];
}

function createBaseOverrideTag(): OverrideTag {
  return { before: "", after: "" };
}

export const OverrideTag = {
  encode(message: OverrideTag, writer: Writer = Writer.create()): Writer {
    if (message.before !== undefined && message.before !== "") {
      writer.uint32(10).string(message.before);
    }
    if (message.after !== undefined && message.after !== "") {
      writer.uint32(18).string(message.after);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): OverrideTag {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOverrideTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.before = reader.string();
          break;
        case 2:
          message.after = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OverrideTag {
    return {
      before: isSet(object.before) ? String(object.before) : "",
      after: isSet(object.after) ? String(object.after) : "",
    };
  },

  toJSON(message: OverrideTag): unknown {
    const obj: any = {};
    message.before !== undefined && (obj.before = message.before);
    message.after !== undefined && (obj.after = message.after);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OverrideTag>, I>>(
    object: I
  ): OverrideTag {
    const message = createBaseOverrideTag();
    message.before = object.before ?? "";
    message.after = object.after ?? "";
    return message;
  },
};

function createBaseProfileOverride(): ProfileOverride {
  return {
    username: undefined,
    avatar: undefined,
    tags: [],
    reason: undefined,
  };
}

export const ProfileOverride = {
  encode(message: ProfileOverride, writer: Writer = Writer.create()): Writer {
    if (message.username !== undefined) {
      writer.uint32(10).string(message.username);
    }
    if (message.avatar !== undefined) {
      writer.uint32(18).string(message.avatar);
    }
    if (message.tags !== undefined && message.tags.length !== 0) {
      for (const v of message.tags) {
        OverrideTag.encode(v!, writer.uint32(26).fork()).ldelim();
      }
    }
    if (message.reason?.$case === "userDefined") {
      writer.uint32(34).string(message.reason.userDefined);
    }
    if (message.reason?.$case === "systemPlurality") {
      Empty.encode(
        message.reason.systemPlurality,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ProfileOverride {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfileOverride();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.avatar = reader.string();
          break;
        case 3:
          message.tags!.push(OverrideTag.decode(reader, reader.uint32()));
          break;
        case 4:
          message.reason = {
            $case: "userDefined",
            userDefined: reader.string(),
          };
          break;
        case 5:
          message.reason = {
            $case: "systemPlurality",
            systemPlurality: Empty.decode(reader, reader.uint32()),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProfileOverride {
    return {
      username: isSet(object.username) ? String(object.username) : undefined,
      avatar: isSet(object.avatar) ? String(object.avatar) : undefined,
      tags: Array.isArray(object?.tags)
        ? object.tags.map((e: any) => OverrideTag.fromJSON(e))
        : [],
      reason: isSet(object.userDefined)
        ? { $case: "userDefined", userDefined: String(object.userDefined) }
        : isSet(object.systemPlurality)
        ? {
            $case: "systemPlurality",
            systemPlurality: Empty.fromJSON(object.systemPlurality),
          }
        : undefined,
    };
  },

  toJSON(message: ProfileOverride): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    if (message.tags) {
      obj.tags = message.tags.map((e) =>
        e ? OverrideTag.toJSON(e) : undefined
      );
    } else {
      obj.tags = [];
    }
    message.reason?.$case === "userDefined" &&
      (obj.userDefined = message.reason?.userDefined);
    message.reason?.$case === "systemPlurality" &&
      (obj.systemPlurality = message.reason?.systemPlurality
        ? Empty.toJSON(message.reason?.systemPlurality)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProfileOverride>, I>>(
    object: I
  ): ProfileOverride {
    const message = createBaseProfileOverride();
    message.username = object.username ?? undefined;
    message.avatar = object.avatar ?? undefined;
    message.tags = object.tags?.map((e) => OverrideTag.fromPartial(e)) || [];
    if (
      object.reason?.$case === "userDefined" &&
      object.reason?.userDefined !== undefined &&
      object.reason?.userDefined !== null
    ) {
      message.reason = {
        $case: "userDefined",
        userDefined: object.reason.userDefined,
      };
    }
    if (
      object.reason?.$case === "systemPlurality" &&
      object.reason?.systemPlurality !== undefined &&
      object.reason?.systemPlurality !== null
    ) {
      message.reason = {
        $case: "systemPlurality",
        systemPlurality: Empty.fromPartial(object.reason.systemPlurality),
      };
    }
    return message;
  },
};

function createBaseAppDataOverrides(): AppDataOverrides {
  return { overrides: [] };
}

export const AppDataOverrides = {
  encode(message: AppDataOverrides, writer: Writer = Writer.create()): Writer {
    if (message.overrides !== undefined && message.overrides.length !== 0) {
      for (const v of message.overrides) {
        ProfileOverride.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AppDataOverrides {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAppDataOverrides();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.overrides!.push(
            ProfileOverride.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AppDataOverrides {
    return {
      overrides: Array.isArray(object?.overrides)
        ? object.overrides.map((e: any) => ProfileOverride.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AppDataOverrides): unknown {
    const obj: any = {};
    if (message.overrides) {
      obj.overrides = message.overrides.map((e) =>
        e ? ProfileOverride.toJSON(e) : undefined
      );
    } else {
      obj.overrides = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AppDataOverrides>, I>>(
    object: I
  ): AppDataOverrides {
    const message = createBaseAppDataOverrides();
    message.overrides =
      object.overrides?.map((e) => ProfileOverride.fromPartial(e)) || [];
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
