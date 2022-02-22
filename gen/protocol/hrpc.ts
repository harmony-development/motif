/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "hrpc.v1";

/** Error type that will be returned by servers. */
export interface Error {
  /** The identifier of this error, can be used as an i18n key. */
  identifier: string;
  /** A human readable message in English, explaining why the error occured. */
  humanMessage: string;
  /** Details about this message. This is dependent on the error identifier. */
  details: Uint8Array;
}

/** Information that can be used by clients for retrying requests. */
export interface RetryInfo {
  /** How many seconds to wait before retrying the request. */
  retryAfter: number;
}

function createBaseError(): Error {
  return { identifier: "", humanMessage: "", details: new Uint8Array() };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    if (message.humanMessage !== "") {
      writer.uint32(18).string(message.humanMessage);
    }
    if (message.details.length !== 0) {
      writer.uint32(26).bytes(message.details);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        case 2:
          message.humanMessage = reader.string();
          break;
        case 3:
          message.details = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error {
    return {
      identifier: isSet(object.identifier) ? String(object.identifier) : "",
      humanMessage: isSet(object.humanMessage)
        ? String(object.humanMessage)
        : "",
      details: isSet(object.details)
        ? bytesFromBase64(object.details)
        : new Uint8Array(),
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.identifier !== undefined && (obj.identifier = message.identifier);
    message.humanMessage !== undefined &&
      (obj.humanMessage = message.humanMessage);
    message.details !== undefined &&
      (obj.details = base64FromBytes(
        message.details !== undefined ? message.details : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.identifier = object.identifier ?? "";
    message.humanMessage = object.humanMessage ?? "";
    message.details = object.details ?? new Uint8Array();
    return message;
  },
};

function createBaseRetryInfo(): RetryInfo {
  return { retryAfter: 0 };
}

export const RetryInfo = {
  encode(
    message: RetryInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.retryAfter !== 0) {
      writer.uint32(8).uint32(message.retryAfter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RetryInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRetryInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.retryAfter = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RetryInfo {
    return {
      retryAfter: isSet(object.retryAfter) ? Number(object.retryAfter) : 0,
    };
  },

  toJSON(message: RetryInfo): unknown {
    const obj: any = {};
    message.retryAfter !== undefined &&
      (obj.retryAfter = Math.round(message.retryAfter));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RetryInfo>, I>>(
    object: I
  ): RetryInfo {
    const message = createBaseRetryInfo();
    message.retryAfter = object.retryAfter ?? 0;
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
