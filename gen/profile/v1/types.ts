/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "protocol.profile.v1";

/** The possible statuses a user can have. */
export enum UserStatus {
  /** USER_STATUS_OFFLINE_UNSPECIFIED - User is offline (not connected to the server). */
  USER_STATUS_OFFLINE_UNSPECIFIED = 0,
  /** USER_STATUS_ONLINE - User is online (this is the default value if ommitted). */
  USER_STATUS_ONLINE = 1,
  /** USER_STATUS_IDLE - User is away. */
  USER_STATUS_IDLE = 2,
  /** USER_STATUS_DO_NOT_DISTURB - User does not want to be disturbed. */
  USER_STATUS_DO_NOT_DISTURB = 3,
  /** USER_STATUS_MOBILE - User is on mobile. */
  USER_STATUS_MOBILE = 4,
  /** USER_STATUS_STREAMING - User is streaming */
  USER_STATUS_STREAMING = 5,
  UNRECOGNIZED = -1,
}

export function userStatusFromJSON(object: any): UserStatus {
  switch (object) {
    case 0:
    case "USER_STATUS_OFFLINE_UNSPECIFIED":
      return UserStatus.USER_STATUS_OFFLINE_UNSPECIFIED;
    case 1:
    case "USER_STATUS_ONLINE":
      return UserStatus.USER_STATUS_ONLINE;
    case 2:
    case "USER_STATUS_IDLE":
      return UserStatus.USER_STATUS_IDLE;
    case 3:
    case "USER_STATUS_DO_NOT_DISTURB":
      return UserStatus.USER_STATUS_DO_NOT_DISTURB;
    case 4:
    case "USER_STATUS_MOBILE":
      return UserStatus.USER_STATUS_MOBILE;
    case 5:
    case "USER_STATUS_STREAMING":
      return UserStatus.USER_STATUS_STREAMING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserStatus.UNRECOGNIZED;
  }
}

export function userStatusToJSON(object: UserStatus): string {
  switch (object) {
    case UserStatus.USER_STATUS_OFFLINE_UNSPECIFIED:
      return "USER_STATUS_OFFLINE_UNSPECIFIED";
    case UserStatus.USER_STATUS_ONLINE:
      return "USER_STATUS_ONLINE";
    case UserStatus.USER_STATUS_IDLE:
      return "USER_STATUS_IDLE";
    case UserStatus.USER_STATUS_DO_NOT_DISTURB:
      return "USER_STATUS_DO_NOT_DISTURB";
    case UserStatus.USER_STATUS_MOBILE:
      return "USER_STATUS_MOBILE";
    case UserStatus.USER_STATUS_STREAMING:
      return "USER_STATUS_STREAMING";
    default:
      return "UNKNOWN";
  }
}

/** The possible kinds of an account */
export enum AccountKind {
  /** ACCOUNT_KIND_FULL_UNSPECIFIED - The account is a full-fledged account controlled by a human */
  ACCOUNT_KIND_FULL_UNSPECIFIED = 0,
  /** ACCOUNT_KIND_BOT - The account is an account controlled by a bot */
  ACCOUNT_KIND_BOT = 1,
  /** ACCOUNT_KIND_GUEST - The account is a guest account controlled by a human */
  ACCOUNT_KIND_GUEST = 2,
  UNRECOGNIZED = -1,
}

export function accountKindFromJSON(object: any): AccountKind {
  switch (object) {
    case 0:
    case "ACCOUNT_KIND_FULL_UNSPECIFIED":
      return AccountKind.ACCOUNT_KIND_FULL_UNSPECIFIED;
    case 1:
    case "ACCOUNT_KIND_BOT":
      return AccountKind.ACCOUNT_KIND_BOT;
    case 2:
    case "ACCOUNT_KIND_GUEST":
      return AccountKind.ACCOUNT_KIND_GUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AccountKind.UNRECOGNIZED;
  }
}

export function accountKindToJSON(object: AccountKind): string {
  switch (object) {
    case AccountKind.ACCOUNT_KIND_FULL_UNSPECIFIED:
      return "ACCOUNT_KIND_FULL_UNSPECIFIED";
    case AccountKind.ACCOUNT_KIND_BOT:
      return "ACCOUNT_KIND_BOT";
    case AccountKind.ACCOUNT_KIND_GUEST:
      return "ACCOUNT_KIND_GUEST";
    default:
      return "UNKNOWN";
  }
}

/** Data for a single profile, without the user's ID. */
export interface Profile {
  /** the name of the user. */
  userName: string;
  /** the user's avatar. This must be a file ID that points to an image. */
  userAvatar?: string | undefined;
  /** the status of the user. */
  userStatus: UserStatus;
  /** what kind of account the user is, e.g. full, guest, bot. */
  accountKind: AccountKind;
}

/** Used in `GetProfile` endpoint. */
export interface GetProfileRequest {
  /** The ID(s) of the user(s) to get. */
  userId: string[];
}

/** Used in `GetProfile` endpoint. */
export interface GetProfileResponse {
  /** The users' profile(s). */
  profile: { [key: string]: Profile };
}

export interface GetProfileResponse_ProfileEntry {
  key: string;
  value?: Profile;
}

/** Used in `UpdateProfile` endpoint. */
export interface UpdateProfileRequest {
  /** New name of the user. */
  newUserName?: string | undefined;
  /** New user avatar. The avatar will be removed if the string is empty. */
  newUserAvatar?: string | undefined;
  /** New status of the user. */
  newUserStatus?: UserStatus | undefined;
}

/** Used in `UpdateProfile` endpoint. */
export interface UpdateProfileResponse {}

/** Used in `GetAppData` endpoint. */
export interface GetAppDataRequest {
  /** The app id. */
  appId: string;
}

/** Used in `GetAppData` endpoint. */
export interface GetAppDataResponse {
  /** The app data. */
  appData: Uint8Array;
}

/** Used in `SetAppData` endpoint. */
export interface SetAppDataRequest {
  /** The app id. */
  appId: string;
  /** The app data. */
  appData: Uint8Array;
}

/** Used in `SetAppData` endpoint. */
export interface SetAppDataResponse {}

function createBaseProfile(): Profile {
  return { userName: "", userAvatar: undefined, userStatus: 0, accountKind: 0 };
}

export const Profile = {
  encode(
    message: Profile,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    if (message.userAvatar !== undefined) {
      writer.uint32(18).string(message.userAvatar);
    }
    if (message.userStatus !== 0) {
      writer.uint32(24).int32(message.userStatus);
    }
    if (message.accountKind !== 0) {
      writer.uint32(32).int32(message.accountKind);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Profile {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userName = reader.string();
          break;
        case 2:
          message.userAvatar = reader.string();
          break;
        case 3:
          message.userStatus = reader.int32() as any;
          break;
        case 4:
          message.accountKind = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Profile {
    return {
      userName: isSet(object.userName) ? String(object.userName) : "",
      userAvatar: isSet(object.userAvatar)
        ? String(object.userAvatar)
        : undefined,
      userStatus: isSet(object.userStatus)
        ? userStatusFromJSON(object.userStatus)
        : 0,
      accountKind: isSet(object.accountKind)
        ? accountKindFromJSON(object.accountKind)
        : 0,
    };
  },

  toJSON(message: Profile): unknown {
    const obj: any = {};
    message.userName !== undefined && (obj.userName = message.userName);
    message.userAvatar !== undefined && (obj.userAvatar = message.userAvatar);
    message.userStatus !== undefined &&
      (obj.userStatus = userStatusToJSON(message.userStatus));
    message.accountKind !== undefined &&
      (obj.accountKind = accountKindToJSON(message.accountKind));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Profile>, I>>(object: I): Profile {
    const message = createBaseProfile();
    message.userName = object.userName ?? "";
    message.userAvatar = object.userAvatar ?? undefined;
    message.userStatus = object.userStatus ?? 0;
    message.accountKind = object.accountKind ?? 0;
    return message;
  },
};

function createBaseGetProfileRequest(): GetProfileRequest {
  return { userId: [] };
}

export const GetProfileRequest = {
  encode(
    message: GetProfileRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.userId) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProfileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.userId.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.userId.push(longToString(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProfileRequest {
    return {
      userId: Array.isArray(object?.userId)
        ? object.userId.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GetProfileRequest): unknown {
    const obj: any = {};
    if (message.userId) {
      obj.userId = message.userId.map((e) => e);
    } else {
      obj.userId = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProfileRequest>, I>>(
    object: I
  ): GetProfileRequest {
    const message = createBaseGetProfileRequest();
    message.userId = object.userId?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetProfileResponse(): GetProfileResponse {
  return { profile: {} };
}

export const GetProfileResponse = {
  encode(
    message: GetProfileResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.profile).forEach(([key, value]) => {
      GetProfileResponse_ProfileEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProfileResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProfileResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GetProfileResponse_ProfileEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.profile[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProfileResponse {
    return {
      profile: isObject(object.profile)
        ? Object.entries(object.profile).reduce<{ [key: string]: Profile }>(
            (acc, [key, value]) => {
              acc[key] = Profile.fromJSON(value);
              return acc;
            },
            {}
          )
        : {},
    };
  },

  toJSON(message: GetProfileResponse): unknown {
    const obj: any = {};
    obj.profile = {};
    if (message.profile) {
      Object.entries(message.profile).forEach(([k, v]) => {
        obj.profile[k] = Profile.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProfileResponse>, I>>(
    object: I
  ): GetProfileResponse {
    const message = createBaseGetProfileResponse();
    message.profile = Object.entries(object.profile ?? {}).reduce<{
      [key: string]: Profile;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Profile.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetProfileResponse_ProfileEntry(): GetProfileResponse_ProfileEntry {
  return { key: "0", value: undefined };
}

export const GetProfileResponse_ProfileEntry = {
  encode(
    message: GetProfileResponse_ProfileEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "0") {
      writer.uint32(8).uint64(message.key);
    }
    if (message.value !== undefined) {
      Profile.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetProfileResponse_ProfileEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProfileResponse_ProfileEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.value = Profile.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProfileResponse_ProfileEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "0",
      value: isSet(object.value) ? Profile.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GetProfileResponse_ProfileEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Profile.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProfileResponse_ProfileEntry>, I>>(
    object: I
  ): GetProfileResponse_ProfileEntry {
    const message = createBaseGetProfileResponse_ProfileEntry();
    message.key = object.key ?? "0";
    message.value =
      object.value !== undefined && object.value !== null
        ? Profile.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseUpdateProfileRequest(): UpdateProfileRequest {
  return {
    newUserName: undefined,
    newUserAvatar: undefined,
    newUserStatus: undefined,
  };
}

export const UpdateProfileRequest = {
  encode(
    message: UpdateProfileRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.newUserName !== undefined) {
      writer.uint32(10).string(message.newUserName);
    }
    if (message.newUserAvatar !== undefined) {
      writer.uint32(18).string(message.newUserAvatar);
    }
    if (message.newUserStatus !== undefined) {
      writer.uint32(24).int32(message.newUserStatus);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateProfileRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newUserName = reader.string();
          break;
        case 2:
          message.newUserAvatar = reader.string();
          break;
        case 3:
          message.newUserStatus = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateProfileRequest {
    return {
      newUserName: isSet(object.newUserName)
        ? String(object.newUserName)
        : undefined,
      newUserAvatar: isSet(object.newUserAvatar)
        ? String(object.newUserAvatar)
        : undefined,
      newUserStatus: isSet(object.newUserStatus)
        ? userStatusFromJSON(object.newUserStatus)
        : undefined,
    };
  },

  toJSON(message: UpdateProfileRequest): unknown {
    const obj: any = {};
    message.newUserName !== undefined &&
      (obj.newUserName = message.newUserName);
    message.newUserAvatar !== undefined &&
      (obj.newUserAvatar = message.newUserAvatar);
    message.newUserStatus !== undefined &&
      (obj.newUserStatus =
        message.newUserStatus !== undefined
          ? userStatusToJSON(message.newUserStatus)
          : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateProfileRequest>, I>>(
    object: I
  ): UpdateProfileRequest {
    const message = createBaseUpdateProfileRequest();
    message.newUserName = object.newUserName ?? undefined;
    message.newUserAvatar = object.newUserAvatar ?? undefined;
    message.newUserStatus = object.newUserStatus ?? undefined;
    return message;
  },
};

function createBaseUpdateProfileResponse(): UpdateProfileResponse {
  return {};
}

export const UpdateProfileResponse = {
  encode(
    _: UpdateProfileResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateProfileResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProfileResponse();
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

  fromJSON(_: any): UpdateProfileResponse {
    return {};
  },

  toJSON(_: UpdateProfileResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateProfileResponse>, I>>(
    _: I
  ): UpdateProfileResponse {
    const message = createBaseUpdateProfileResponse();
    return message;
  },
};

function createBaseGetAppDataRequest(): GetAppDataRequest {
  return { appId: "" };
}

export const GetAppDataRequest = {
  encode(
    message: GetAppDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.appId !== "") {
      writer.uint32(10).string(message.appId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAppDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAppDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.appId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAppDataRequest {
    return {
      appId: isSet(object.appId) ? String(object.appId) : "",
    };
  },

  toJSON(message: GetAppDataRequest): unknown {
    const obj: any = {};
    message.appId !== undefined && (obj.appId = message.appId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAppDataRequest>, I>>(
    object: I
  ): GetAppDataRequest {
    const message = createBaseGetAppDataRequest();
    message.appId = object.appId ?? "";
    return message;
  },
};

function createBaseGetAppDataResponse(): GetAppDataResponse {
  return { appData: new Uint8Array() };
}

export const GetAppDataResponse = {
  encode(
    message: GetAppDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.appData.length !== 0) {
      writer.uint32(10).bytes(message.appData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAppDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAppDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.appData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAppDataResponse {
    return {
      appData: isSet(object.appData)
        ? bytesFromBase64(object.appData)
        : new Uint8Array(),
    };
  },

  toJSON(message: GetAppDataResponse): unknown {
    const obj: any = {};
    message.appData !== undefined &&
      (obj.appData = base64FromBytes(
        message.appData !== undefined ? message.appData : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAppDataResponse>, I>>(
    object: I
  ): GetAppDataResponse {
    const message = createBaseGetAppDataResponse();
    message.appData = object.appData ?? new Uint8Array();
    return message;
  },
};

function createBaseSetAppDataRequest(): SetAppDataRequest {
  return { appId: "", appData: new Uint8Array() };
}

export const SetAppDataRequest = {
  encode(
    message: SetAppDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.appId !== "") {
      writer.uint32(10).string(message.appId);
    }
    if (message.appData.length !== 0) {
      writer.uint32(18).bytes(message.appData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetAppDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetAppDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.appId = reader.string();
          break;
        case 2:
          message.appData = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetAppDataRequest {
    return {
      appId: isSet(object.appId) ? String(object.appId) : "",
      appData: isSet(object.appData)
        ? bytesFromBase64(object.appData)
        : new Uint8Array(),
    };
  },

  toJSON(message: SetAppDataRequest): unknown {
    const obj: any = {};
    message.appId !== undefined && (obj.appId = message.appId);
    message.appData !== undefined &&
      (obj.appData = base64FromBytes(
        message.appData !== undefined ? message.appData : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetAppDataRequest>, I>>(
    object: I
  ): SetAppDataRequest {
    const message = createBaseSetAppDataRequest();
    message.appId = object.appId ?? "";
    message.appData = object.appData ?? new Uint8Array();
    return message;
  },
};

function createBaseSetAppDataResponse(): SetAppDataResponse {
  return {};
}

export const SetAppDataResponse = {
  encode(
    _: SetAppDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SetAppDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetAppDataResponse();
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

  fromJSON(_: any): SetAppDataResponse {
    return {};
  },

  toJSON(_: SetAppDataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetAppDataResponse>, I>>(
    _: I
  ): SetAppDataResponse {
    const message = createBaseSetAppDataResponse();
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
