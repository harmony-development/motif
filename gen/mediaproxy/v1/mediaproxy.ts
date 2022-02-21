/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "protocol.mediaproxy.v1";

/** Object representing the metadata of a website. */
export interface SiteMetadata {
  /** Title of the website. */
  siteTitle: string;
  /** Page title of the website page. */
  pageTitle: string;
  /** Kind of the website. */
  kind: string;
  /** Description of the website page. */
  description: string;
  /** URL of the website. */
  url: string;
  /** A thumbnail image for the website. */
  thumbnail: SiteMetadata_ThumbnailImage[];
}

/** Information pertaining to a thumbnail image. */
export interface SiteMetadata_ThumbnailImage {
  /** URL of the thumbnail. */
  url: string;
  /** Width of the image, in pixels. */
  width: number;
  /** Height of the image, in pixels. */
  height: number;
}

/** Object represeting the metadata of a media. */
export interface MediaMetadata {
  /** Mimetype of the media. */
  mimetype: string;
  /** Filename of the media. */
  name: string;
  /** File ID of the media. */
  id: string;
  /**
   * Sıze of the media.
   *
   * This should (usually) be the size taken from the `Content-Length` header
   * (for HTTP requests).
   * If this is not included, then it means the size could not be determined.
   */
  size?: number | undefined;
  info?: { $case: "image"; image: MediaMetadata_ImageInfo };
}

/** Information pertaining to an image. */
export interface MediaMetadata_ImageInfo {
  /** Width of the image, in pixels. */
  width: number;
  /** Height of the image, in pixels. */
  height: number;
}

/** Used in the `FetchLinkMetadata` endpoint. */
export interface FetchLinkMetadataRequest {
  /** URL to fetch metadata from. */
  url: string[];
}

/** Used in the `FetchLinkMetadata` endpoint. */
export interface FetchLinkMetadataResponse {
  /** Fetched metadata for the requested URL(s). */
  metadata: { [key: string]: FetchLinkMetadataResponse_Metadata };
  /** URL(s) that errored out while trying to fetch metadata for them. */
  errors: { [key: string]: FetchLinkMetadataResponse_Error };
}

/** Fetched metadata for a link. */
export interface FetchLinkMetadataResponse_Metadata {
  data?:
    | { $case: "isSite"; isSite: SiteMetadata }
    | { $case: "isMedia"; isMedia: MediaMetadata };
}

/** Error data for a link. */
export interface FetchLinkMetadataResponse_Error {
  /** Error status (usually HTTP, eg. `500 Internal Server Error`). */
  status: string;
  /** Error message, if the requested URL's server has provided one. */
  message: string;
}

export interface FetchLinkMetadataResponse_MetadataEntry {
  key: string;
  value?: FetchLinkMetadataResponse_Metadata;
}

export interface FetchLinkMetadataResponse_ErrorsEntry {
  key: string;
  value?: FetchLinkMetadataResponse_Error;
}

/** Used in the `InstantView` endpoint. */
export interface InstantViewRequest {
  /** URL to get instant view for. */
  url: string;
}

/** Used in the `InstantView` endpoint. */
export interface InstantViewResponse {
  /** Site metadata for the URL. */
  metadata?: SiteMetadata;
  /** Instant view content. */
  content: string;
  /** Whether the instant view is valid. */
  isValid: boolean;
}

/** Used in the `CanInstantView` endpoint. */
export interface CanInstantViewRequest {
  /** URL(s) to query if server can instant view the website. */
  url: string[];
}

/** Used in the `CanInstantView` endpoint. */
export interface CanInstantViewResponse {
  /** Whether the server generate an instant view for the URL(s) queried. */
  canInstantView: { [key: string]: boolean };
}

export interface CanInstantViewResponse_CanInstantViewEntry {
  key: string;
  value: boolean;
}

function createBaseSiteMetadata(): SiteMetadata {
  return {
    siteTitle: "",
    pageTitle: "",
    kind: "",
    description: "",
    url: "",
    thumbnail: [],
  };
}

export const SiteMetadata = {
  encode(
    message: SiteMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.siteTitle !== "") {
      writer.uint32(10).string(message.siteTitle);
    }
    if (message.pageTitle !== "") {
      writer.uint32(18).string(message.pageTitle);
    }
    if (message.kind !== "") {
      writer.uint32(26).string(message.kind);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(42).string(message.url);
    }
    for (const v of message.thumbnail) {
      SiteMetadata_ThumbnailImage.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SiteMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSiteMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.siteTitle = reader.string();
          break;
        case 2:
          message.pageTitle = reader.string();
          break;
        case 3:
          message.kind = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 5:
          message.url = reader.string();
          break;
        case 6:
          message.thumbnail.push(
            SiteMetadata_ThumbnailImage.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SiteMetadata {
    return {
      siteTitle: isSet(object.siteTitle) ? String(object.siteTitle) : "",
      pageTitle: isSet(object.pageTitle) ? String(object.pageTitle) : "",
      kind: isSet(object.kind) ? String(object.kind) : "",
      description: isSet(object.description) ? String(object.description) : "",
      url: isSet(object.url) ? String(object.url) : "",
      thumbnail: Array.isArray(object?.thumbnail)
        ? object.thumbnail.map((e: any) =>
            SiteMetadata_ThumbnailImage.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: SiteMetadata): unknown {
    const obj: any = {};
    message.siteTitle !== undefined && (obj.siteTitle = message.siteTitle);
    message.pageTitle !== undefined && (obj.pageTitle = message.pageTitle);
    message.kind !== undefined && (obj.kind = message.kind);
    message.description !== undefined &&
      (obj.description = message.description);
    message.url !== undefined && (obj.url = message.url);
    if (message.thumbnail) {
      obj.thumbnail = message.thumbnail.map((e) =>
        e ? SiteMetadata_ThumbnailImage.toJSON(e) : undefined
      );
    } else {
      obj.thumbnail = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SiteMetadata>, I>>(
    object: I
  ): SiteMetadata {
    const message = createBaseSiteMetadata();
    message.siteTitle = object.siteTitle ?? "";
    message.pageTitle = object.pageTitle ?? "";
    message.kind = object.kind ?? "";
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    message.thumbnail =
      object.thumbnail?.map((e) =>
        SiteMetadata_ThumbnailImage.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseSiteMetadata_ThumbnailImage(): SiteMetadata_ThumbnailImage {
  return { url: "", width: 0, height: 0 };
}

export const SiteMetadata_ThumbnailImage = {
  encode(
    message: SiteMetadata_ThumbnailImage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.width !== 0) {
      writer.uint32(16).uint32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(24).uint32(message.height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SiteMetadata_ThumbnailImage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSiteMetadata_ThumbnailImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.url = reader.string();
          break;
        case 2:
          message.width = reader.uint32();
          break;
        case 3:
          message.height = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SiteMetadata_ThumbnailImage {
    return {
      url: isSet(object.url) ? String(object.url) : "",
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
    };
  },

  toJSON(message: SiteMetadata_ThumbnailImage): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SiteMetadata_ThumbnailImage>, I>>(
    object: I
  ): SiteMetadata_ThumbnailImage {
    const message = createBaseSiteMetadata_ThumbnailImage();
    message.url = object.url ?? "";
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseMediaMetadata(): MediaMetadata {
  return { mimetype: "", name: "", id: "", size: undefined, info: undefined };
}

export const MediaMetadata = {
  encode(
    message: MediaMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.mimetype !== "") {
      writer.uint32(10).string(message.mimetype);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    if (message.size !== undefined) {
      writer.uint32(32).uint32(message.size);
    }
    if (message.info?.$case === "image") {
      MediaMetadata_ImageInfo.encode(
        message.info.image,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MediaMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMediaMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mimetype = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.id = reader.string();
          break;
        case 4:
          message.size = reader.uint32();
          break;
        case 5:
          message.info = {
            $case: "image",
            image: MediaMetadata_ImageInfo.decode(reader, reader.uint32()),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MediaMetadata {
    return {
      mimetype: isSet(object.mimetype) ? String(object.mimetype) : "",
      name: isSet(object.name) ? String(object.name) : "",
      id: isSet(object.id) ? String(object.id) : "",
      size: isSet(object.size) ? Number(object.size) : undefined,
      info: isSet(object.image)
        ? {
            $case: "image",
            image: MediaMetadata_ImageInfo.fromJSON(object.image),
          }
        : undefined,
    };
  },

  toJSON(message: MediaMetadata): unknown {
    const obj: any = {};
    message.mimetype !== undefined && (obj.mimetype = message.mimetype);
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = message.id);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.info?.$case === "image" &&
      (obj.image = message.info?.image
        ? MediaMetadata_ImageInfo.toJSON(message.info?.image)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MediaMetadata>, I>>(
    object: I
  ): MediaMetadata {
    const message = createBaseMediaMetadata();
    message.mimetype = object.mimetype ?? "";
    message.name = object.name ?? "";
    message.id = object.id ?? "";
    message.size = object.size ?? undefined;
    if (
      object.info?.$case === "image" &&
      object.info?.image !== undefined &&
      object.info?.image !== null
    ) {
      message.info = {
        $case: "image",
        image: MediaMetadata_ImageInfo.fromPartial(object.info.image),
      };
    }
    return message;
  },
};

function createBaseMediaMetadata_ImageInfo(): MediaMetadata_ImageInfo {
  return { width: 0, height: 0 };
}

export const MediaMetadata_ImageInfo = {
  encode(
    message: MediaMetadata_ImageInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.width !== 0) {
      writer.uint32(8).uint32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(16).uint32(message.height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MediaMetadata_ImageInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMediaMetadata_ImageInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.width = reader.uint32();
          break;
        case 2:
          message.height = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MediaMetadata_ImageInfo {
    return {
      width: isSet(object.width) ? Number(object.width) : 0,
      height: isSet(object.height) ? Number(object.height) : 0,
    };
  },

  toJSON(message: MediaMetadata_ImageInfo): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = Math.round(message.width));
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MediaMetadata_ImageInfo>, I>>(
    object: I
  ): MediaMetadata_ImageInfo {
    const message = createBaseMediaMetadata_ImageInfo();
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

function createBaseFetchLinkMetadataRequest(): FetchLinkMetadataRequest {
  return { url: [] };
}

export const FetchLinkMetadataRequest = {
  encode(
    message: FetchLinkMetadataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.url) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FetchLinkMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFetchLinkMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.url.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FetchLinkMetadataRequest {
    return {
      url: Array.isArray(object?.url)
        ? object.url.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: FetchLinkMetadataRequest): unknown {
    const obj: any = {};
    if (message.url) {
      obj.url = message.url.map((e) => e);
    } else {
      obj.url = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FetchLinkMetadataRequest>, I>>(
    object: I
  ): FetchLinkMetadataRequest {
    const message = createBaseFetchLinkMetadataRequest();
    message.url = object.url?.map((e) => e) || [];
    return message;
  },
};

function createBaseFetchLinkMetadataResponse(): FetchLinkMetadataResponse {
  return { metadata: {}, errors: {} };
}

export const FetchLinkMetadataResponse = {
  encode(
    message: FetchLinkMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.metadata).forEach(([key, value]) => {
      FetchLinkMetadataResponse_MetadataEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    Object.entries(message.errors).forEach(([key, value]) => {
      FetchLinkMetadataResponse_ErrorsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FetchLinkMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFetchLinkMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = FetchLinkMetadataResponse_MetadataEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.metadata[entry1.key] = entry1.value;
          }
          break;
        case 2:
          const entry2 = FetchLinkMetadataResponse_ErrorsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.errors[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FetchLinkMetadataResponse {
    return {
      metadata: isObject(object.metadata)
        ? Object.entries(object.metadata).reduce<{
            [key: string]: FetchLinkMetadataResponse_Metadata;
          }>((acc, [key, value]) => {
            acc[key] = FetchLinkMetadataResponse_Metadata.fromJSON(value);
            return acc;
          }, {})
        : {},
      errors: isObject(object.errors)
        ? Object.entries(object.errors).reduce<{
            [key: string]: FetchLinkMetadataResponse_Error;
          }>((acc, [key, value]) => {
            acc[key] = FetchLinkMetadataResponse_Error.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: FetchLinkMetadataResponse): unknown {
    const obj: any = {};
    obj.metadata = {};
    if (message.metadata) {
      Object.entries(message.metadata).forEach(([k, v]) => {
        obj.metadata[k] = FetchLinkMetadataResponse_Metadata.toJSON(v);
      });
    }
    obj.errors = {};
    if (message.errors) {
      Object.entries(message.errors).forEach(([k, v]) => {
        obj.errors[k] = FetchLinkMetadataResponse_Error.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FetchLinkMetadataResponse>, I>>(
    object: I
  ): FetchLinkMetadataResponse {
    const message = createBaseFetchLinkMetadataResponse();
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{
      [key: string]: FetchLinkMetadataResponse_Metadata;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = FetchLinkMetadataResponse_Metadata.fromPartial(value);
      }
      return acc;
    }, {});
    message.errors = Object.entries(object.errors ?? {}).reduce<{
      [key: string]: FetchLinkMetadataResponse_Error;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = FetchLinkMetadataResponse_Error.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseFetchLinkMetadataResponse_Metadata(): FetchLinkMetadataResponse_Metadata {
  return { data: undefined };
}

export const FetchLinkMetadataResponse_Metadata = {
  encode(
    message: FetchLinkMetadataResponse_Metadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.data?.$case === "isSite") {
      SiteMetadata.encode(
        message.data.isSite,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.data?.$case === "isMedia") {
      MediaMetadata.encode(
        message.data.isMedia,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FetchLinkMetadataResponse_Metadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFetchLinkMetadataResponse_Metadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = {
            $case: "isSite",
            isSite: SiteMetadata.decode(reader, reader.uint32()),
          };
          break;
        case 2:
          message.data = {
            $case: "isMedia",
            isMedia: MediaMetadata.decode(reader, reader.uint32()),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FetchLinkMetadataResponse_Metadata {
    return {
      data: isSet(object.isSite)
        ? { $case: "isSite", isSite: SiteMetadata.fromJSON(object.isSite) }
        : isSet(object.isMedia)
        ? { $case: "isMedia", isMedia: MediaMetadata.fromJSON(object.isMedia) }
        : undefined,
    };
  },

  toJSON(message: FetchLinkMetadataResponse_Metadata): unknown {
    const obj: any = {};
    message.data?.$case === "isSite" &&
      (obj.isSite = message.data?.isSite
        ? SiteMetadata.toJSON(message.data?.isSite)
        : undefined);
    message.data?.$case === "isMedia" &&
      (obj.isMedia = message.data?.isMedia
        ? MediaMetadata.toJSON(message.data?.isMedia)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<FetchLinkMetadataResponse_Metadata>, I>
  >(object: I): FetchLinkMetadataResponse_Metadata {
    const message = createBaseFetchLinkMetadataResponse_Metadata();
    if (
      object.data?.$case === "isSite" &&
      object.data?.isSite !== undefined &&
      object.data?.isSite !== null
    ) {
      message.data = {
        $case: "isSite",
        isSite: SiteMetadata.fromPartial(object.data.isSite),
      };
    }
    if (
      object.data?.$case === "isMedia" &&
      object.data?.isMedia !== undefined &&
      object.data?.isMedia !== null
    ) {
      message.data = {
        $case: "isMedia",
        isMedia: MediaMetadata.fromPartial(object.data.isMedia),
      };
    }
    return message;
  },
};

function createBaseFetchLinkMetadataResponse_Error(): FetchLinkMetadataResponse_Error {
  return { status: "", message: "" };
}

export const FetchLinkMetadataResponse_Error = {
  encode(
    message: FetchLinkMetadataResponse_Error,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FetchLinkMetadataResponse_Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFetchLinkMetadataResponse_Error();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        case 2:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FetchLinkMetadataResponse_Error {
    return {
      status: isSet(object.status) ? String(object.status) : "",
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: FetchLinkMetadataResponse_Error): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FetchLinkMetadataResponse_Error>, I>>(
    object: I
  ): FetchLinkMetadataResponse_Error {
    const message = createBaseFetchLinkMetadataResponse_Error();
    message.status = object.status ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseFetchLinkMetadataResponse_MetadataEntry(): FetchLinkMetadataResponse_MetadataEntry {
  return { key: "", value: undefined };
}

export const FetchLinkMetadataResponse_MetadataEntry = {
  encode(
    message: FetchLinkMetadataResponse_MetadataEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      FetchLinkMetadataResponse_Metadata.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FetchLinkMetadataResponse_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFetchLinkMetadataResponse_MetadataEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = FetchLinkMetadataResponse_Metadata.decode(
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

  fromJSON(object: any): FetchLinkMetadataResponse_MetadataEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? FetchLinkMetadataResponse_Metadata.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: FetchLinkMetadataResponse_MetadataEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? FetchLinkMetadataResponse_Metadata.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<FetchLinkMetadataResponse_MetadataEntry>, I>
  >(object: I): FetchLinkMetadataResponse_MetadataEntry {
    const message = createBaseFetchLinkMetadataResponse_MetadataEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? FetchLinkMetadataResponse_Metadata.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseFetchLinkMetadataResponse_ErrorsEntry(): FetchLinkMetadataResponse_ErrorsEntry {
  return { key: "", value: undefined };
}

export const FetchLinkMetadataResponse_ErrorsEntry = {
  encode(
    message: FetchLinkMetadataResponse_ErrorsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      FetchLinkMetadataResponse_Error.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): FetchLinkMetadataResponse_ErrorsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFetchLinkMetadataResponse_ErrorsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = FetchLinkMetadataResponse_Error.decode(
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

  fromJSON(object: any): FetchLinkMetadataResponse_ErrorsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? FetchLinkMetadataResponse_Error.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: FetchLinkMetadataResponse_ErrorsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? FetchLinkMetadataResponse_Error.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<FetchLinkMetadataResponse_ErrorsEntry>, I>
  >(object: I): FetchLinkMetadataResponse_ErrorsEntry {
    const message = createBaseFetchLinkMetadataResponse_ErrorsEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? FetchLinkMetadataResponse_Error.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseInstantViewRequest(): InstantViewRequest {
  return { url: "" };
}

export const InstantViewRequest = {
  encode(
    message: InstantViewRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstantViewRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstantViewRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstantViewRequest {
    return {
      url: isSet(object.url) ? String(object.url) : "",
    };
  },

  toJSON(message: InstantViewRequest): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InstantViewRequest>, I>>(
    object: I
  ): InstantViewRequest {
    const message = createBaseInstantViewRequest();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseInstantViewResponse(): InstantViewResponse {
  return { metadata: undefined, content: "", isValid: false };
}

export const InstantViewResponse = {
  encode(
    message: InstantViewResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.metadata !== undefined) {
      SiteMetadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    if (message.isValid === true) {
      writer.uint32(24).bool(message.isValid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstantViewResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstantViewResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = SiteMetadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.content = reader.string();
          break;
        case 3:
          message.isValid = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstantViewResponse {
    return {
      metadata: isSet(object.metadata)
        ? SiteMetadata.fromJSON(object.metadata)
        : undefined,
      content: isSet(object.content) ? String(object.content) : "",
      isValid: isSet(object.isValid) ? Boolean(object.isValid) : false,
    };
  },

  toJSON(message: InstantViewResponse): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? SiteMetadata.toJSON(message.metadata)
        : undefined);
    message.content !== undefined && (obj.content = message.content);
    message.isValid !== undefined && (obj.isValid = message.isValid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InstantViewResponse>, I>>(
    object: I
  ): InstantViewResponse {
    const message = createBaseInstantViewResponse();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? SiteMetadata.fromPartial(object.metadata)
        : undefined;
    message.content = object.content ?? "";
    message.isValid = object.isValid ?? false;
    return message;
  },
};

function createBaseCanInstantViewRequest(): CanInstantViewRequest {
  return { url: [] };
}

export const CanInstantViewRequest = {
  encode(
    message: CanInstantViewRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.url) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CanInstantViewRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanInstantViewRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.url.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanInstantViewRequest {
    return {
      url: Array.isArray(object?.url)
        ? object.url.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: CanInstantViewRequest): unknown {
    const obj: any = {};
    if (message.url) {
      obj.url = message.url.map((e) => e);
    } else {
      obj.url = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanInstantViewRequest>, I>>(
    object: I
  ): CanInstantViewRequest {
    const message = createBaseCanInstantViewRequest();
    message.url = object.url?.map((e) => e) || [];
    return message;
  },
};

function createBaseCanInstantViewResponse(): CanInstantViewResponse {
  return { canInstantView: {} };
}

export const CanInstantViewResponse = {
  encode(
    message: CanInstantViewResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.canInstantView).forEach(([key, value]) => {
      CanInstantViewResponse_CanInstantViewEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CanInstantViewResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanInstantViewResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = CanInstantViewResponse_CanInstantViewEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.canInstantView[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanInstantViewResponse {
    return {
      canInstantView: isObject(object.canInstantView)
        ? Object.entries(object.canInstantView).reduce<{
            [key: string]: boolean;
          }>((acc, [key, value]) => {
            acc[key] = Boolean(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: CanInstantViewResponse): unknown {
    const obj: any = {};
    obj.canInstantView = {};
    if (message.canInstantView) {
      Object.entries(message.canInstantView).forEach(([k, v]) => {
        obj.canInstantView[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CanInstantViewResponse>, I>>(
    object: I
  ): CanInstantViewResponse {
    const message = createBaseCanInstantViewResponse();
    message.canInstantView = Object.entries(
      object.canInstantView ?? {}
    ).reduce<{ [key: string]: boolean }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Boolean(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseCanInstantViewResponse_CanInstantViewEntry(): CanInstantViewResponse_CanInstantViewEntry {
  return { key: "", value: false };
}

export const CanInstantViewResponse_CanInstantViewEntry = {
  encode(
    message: CanInstantViewResponse_CanInstantViewEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value === true) {
      writer.uint32(16).bool(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CanInstantViewResponse_CanInstantViewEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCanInstantViewResponse_CanInstantViewEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CanInstantViewResponse_CanInstantViewEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Boolean(object.value) : false,
    };
  },

  toJSON(message: CanInstantViewResponse_CanInstantViewEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<CanInstantViewResponse_CanInstantViewEntry>, I>
  >(object: I): CanInstantViewResponse_CanInstantViewEntry {
    const message = createBaseCanInstantViewResponse_CanInstantViewEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? false;
    return message;
  },
};

/** Harmony service for fetching metadata and generating instant view for URLs. */
export const MediaProxyServiceDefinition = {
  name: "MediaProxyService",
  fullName: "protocol.mediaproxy.v1.MediaProxyService",
  methods: {
    /** Endpoint to fetch metadata for a URL. */
    fetchLinkMetadata: {
      name: "FetchLinkMetadata",
      requestType: FetchLinkMetadataRequest,
      requestStream: false,
      responseType: FetchLinkMetadataResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Endpoint to instant view a website URL. */
    instantView: {
      name: "InstantView",
      requestType: InstantViewRequest,
      requestStream: false,
      responseType: InstantViewResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Endpoint to query if the server can generate an instant view for a website URL. */
    canInstantView: {
      name: "CanInstantView",
      requestType: CanInstantViewRequest,
      requestStream: false,
      responseType: CanInstantViewResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
