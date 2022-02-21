/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import {
  UserStatus,
  AccountKind,
  userStatusFromJSON,
  accountKindFromJSON,
  userStatusToJSON,
  accountKindToJSON,
} from "../../profile/v1/types";

export const protobufPackage = "protocol.profile.v1";

/**
 * Event sent when a user's profile is updated.
 *
 * Servers should sent this event only to users that can "see" (eg. they are
 * in the same guild) the user this event was triggered by.
 */
export interface ProfileUpdated {
  /** User ID of the user that had it's profile updated. */
  userId: number;
  /** New username for this user. */
  newUsername?: string | undefined;
  /** New avatar for this user. */
  newAvatar?: string | undefined;
  /** New status for this user. */
  newStatus?: UserStatus | undefined;
  /** The new account kind for this account. */
  newAccountKind?: AccountKind | undefined;
}

/** Describes an emote service event. */
export interface StreamEvent {
  event?: { $case: "profileUpdated"; profileUpdated: ProfileUpdated };
}

function createBaseProfileUpdated(): ProfileUpdated {
  return {
    userId: 0,
    newUsername: undefined,
    newAvatar: undefined,
    newStatus: undefined,
    newAccountKind: undefined,
  };
}

export const ProfileUpdated = {
  encode(message: ProfileUpdated, writer: Writer = Writer.create()): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.newUsername !== undefined) {
      writer.uint32(18).string(message.newUsername);
    }
    if (message.newAvatar !== undefined) {
      writer.uint32(26).string(message.newAvatar);
    }
    if (message.newStatus !== undefined) {
      writer.uint32(32).int32(message.newStatus);
    }
    if (message.newAccountKind !== undefined) {
      writer.uint32(40).int32(message.newAccountKind);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ProfileUpdated {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfileUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.newUsername = reader.string();
          break;
        case 3:
          message.newAvatar = reader.string();
          break;
        case 4:
          message.newStatus = reader.int32() as any;
          break;
        case 5:
          message.newAccountKind = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProfileUpdated {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      newUsername: isSet(object.newUsername)
        ? String(object.newUsername)
        : undefined,
      newAvatar: isSet(object.newAvatar) ? String(object.newAvatar) : undefined,
      newStatus: isSet(object.newStatus)
        ? userStatusFromJSON(object.newStatus)
        : undefined,
      newAccountKind: isSet(object.newAccountKind)
        ? accountKindFromJSON(object.newAccountKind)
        : undefined,
    };
  },

  toJSON(message: ProfileUpdated): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.newUsername !== undefined &&
      (obj.newUsername = message.newUsername);
    message.newAvatar !== undefined && (obj.newAvatar = message.newAvatar);
    message.newStatus !== undefined &&
      (obj.newStatus =
        message.newStatus !== undefined
          ? userStatusToJSON(message.newStatus)
          : undefined);
    message.newAccountKind !== undefined &&
      (obj.newAccountKind =
        message.newAccountKind !== undefined
          ? accountKindToJSON(message.newAccountKind)
          : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProfileUpdated>, I>>(
    object: I
  ): ProfileUpdated {
    const message = createBaseProfileUpdated();
    message.userId = object.userId ?? 0;
    message.newUsername = object.newUsername ?? undefined;
    message.newAvatar = object.newAvatar ?? undefined;
    message.newStatus = object.newStatus ?? undefined;
    message.newAccountKind = object.newAccountKind ?? undefined;
    return message;
  },
};

function createBaseStreamEvent(): StreamEvent {
  return { event: undefined };
}

export const StreamEvent = {
  encode(message: StreamEvent, writer: Writer = Writer.create()): Writer {
    if (message.event?.$case === "profileUpdated") {
      ProfileUpdated.encode(
        message.event.profileUpdated,
        writer.uint32(10).fork()
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
            $case: "profileUpdated",
            profileUpdated: ProfileUpdated.decode(reader, reader.uint32()),
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
      event: isSet(object.profileUpdated)
        ? {
            $case: "profileUpdated",
            profileUpdated: ProfileUpdated.fromJSON(object.profileUpdated),
          }
        : undefined,
    };
  },

  toJSON(message: StreamEvent): unknown {
    const obj: any = {};
    message.event?.$case === "profileUpdated" &&
      (obj.profileUpdated = message.event?.profileUpdated
        ? ProfileUpdated.toJSON(message.event?.profileUpdated)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamEvent>, I>>(
    object: I
  ): StreamEvent {
    const message = createBaseStreamEvent();
    if (
      object.event?.$case === "profileUpdated" &&
      object.event?.profileUpdated !== undefined &&
      object.event?.profileUpdated !== null
    ) {
      message.event = {
        $case: "profileUpdated",
        profileUpdated: ProfileUpdated.fromPartial(object.event.profileUpdated),
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
