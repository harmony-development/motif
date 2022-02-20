/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "protocol.bots.v1";

/** A description of a bot account. */
export interface Bot {
  /** The ID of the bot. */
  botId?: number;
  /** The bot's display name. */
  displayName?: string;
  /** The bot's avatar. This must be a HMC that points to an image. */
  avatarUrl?: string;
  /** The bot's invite code, if it has one. */
  invite?: string | undefined;
}

/** Request type for MyBots. */
export interface MyBotsRequest {}

/** Response type for MyBots. */
export interface MyBotsResponse {
  /** The list of owned bots. */
  bots?: Bot[];
}

/** Request type for CreateBot. */
export interface CreateBotRequest {
  /** The bot's display name. */
  displayName?: string;
  /** The bot's avatar. This must be a HMC that points to an image. */
  avatarUrl?: string | undefined;
  /** The bot's invite code, if it has one. */
  invite?: string | undefined;
}

/** Response type for CreateBot. */
export interface CreateBotResponse {
  /** The newly generated ID of the bot. */
  botId?: number;
}

/** Request type for EditBot. */
export interface EditBotRequest {
  /** The ID of the bot to edit. */
  botId?: number;
  /** The bot's new display name. */
  newDisplayName?: string | undefined;
  /**
   * The bot's new avatar. If provided, it must be a HMC
   * that points to an image.
   */
  newAvatarUrl?: string | undefined;
  /** The bot's new invite code. */
  invite?: string | undefined;
}

/** Response type for EditBot. */
export interface EditBotResponse {}

/** Request type for DeleteBot. */
export interface DeleteBotRequest {
  /** The ID of the bot to delete. */
  botId?: number;
}

/** Response type for DeleteBot. */
export interface DeleteBotResponse {}

/** Request type for GetBot. */
export interface GetBotRequest {
  /** The ID of the bot to get the information of. */
  botId?: number;
}

/** Response type for GetBot. */
export interface GetBotResponse {
  /** The requested bot. */
  bot?: Bot;
}

/** Request type for Policies. */
export interface PoliciesRequest {}

/** Response type for Policies. */
export interface PoliciesResponse {
  /** How many bots an individual account is allowed to own. */
  maxBots?: number;
}

/** Request type for AddBot. */
export interface AddBotRequest {
  /** The guild to add the bot to. */
  guildId?: number;
  /** The bot's invite code. */
  inviteCode?: string;
}

/** Response type for AddBot. */
export interface AddBotResponse {}

function createBaseBot(): Bot {
  return { botId: 0, displayName: "", avatarUrl: "", invite: undefined };
}

export const Bot = {
  encode(message: Bot, writer: Writer = Writer.create()): Writer {
    if (message.botId !== undefined && message.botId !== 0) {
      writer.uint32(8).uint64(message.botId);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.avatarUrl !== undefined && message.avatarUrl !== "") {
      writer.uint32(26).string(message.avatarUrl);
    }
    if (message.invite !== undefined) {
      writer.uint32(34).string(message.invite);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Bot {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.botId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.displayName = reader.string();
          break;
        case 3:
          message.avatarUrl = reader.string();
          break;
        case 4:
          message.invite = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Bot {
    return {
      botId: isSet(object.botId) ? Number(object.botId) : 0,
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : "",
      invite: isSet(object.invite) ? String(object.invite) : undefined,
    };
  },

  toJSON(message: Bot): unknown {
    const obj: any = {};
    message.botId !== undefined && (obj.botId = Math.round(message.botId));
    message.displayName !== undefined &&
      (obj.displayName = message.displayName);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.invite !== undefined && (obj.invite = message.invite);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Bot>, I>>(object: I): Bot {
    const message = createBaseBot();
    message.botId = object.botId ?? 0;
    message.displayName = object.displayName ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    message.invite = object.invite ?? undefined;
    return message;
  },
};

function createBaseMyBotsRequest(): MyBotsRequest {
  return {};
}

export const MyBotsRequest = {
  encode(_: MyBotsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MyBotsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMyBotsRequest();
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

  fromJSON(_: any): MyBotsRequest {
    return {};
  },

  toJSON(_: MyBotsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MyBotsRequest>, I>>(
    _: I
  ): MyBotsRequest {
    const message = createBaseMyBotsRequest();
    return message;
  },
};

function createBaseMyBotsResponse(): MyBotsResponse {
  return { bots: [] };
}

export const MyBotsResponse = {
  encode(message: MyBotsResponse, writer: Writer = Writer.create()): Writer {
    if (message.bots !== undefined && message.bots.length !== 0) {
      for (const v of message.bots) {
        Bot.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MyBotsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMyBotsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bots!.push(Bot.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MyBotsResponse {
    return {
      bots: Array.isArray(object?.bots)
        ? object.bots.map((e: any) => Bot.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MyBotsResponse): unknown {
    const obj: any = {};
    if (message.bots) {
      obj.bots = message.bots.map((e) => (e ? Bot.toJSON(e) : undefined));
    } else {
      obj.bots = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MyBotsResponse>, I>>(
    object: I
  ): MyBotsResponse {
    const message = createBaseMyBotsResponse();
    message.bots = object.bots?.map((e) => Bot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateBotRequest(): CreateBotRequest {
  return { displayName: "", avatarUrl: undefined, invite: undefined };
}

export const CreateBotRequest = {
  encode(message: CreateBotRequest, writer: Writer = Writer.create()): Writer {
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.avatarUrl !== undefined) {
      writer.uint32(18).string(message.avatarUrl);
    }
    if (message.invite !== undefined) {
      writer.uint32(26).string(message.invite);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateBotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.displayName = reader.string();
          break;
        case 2:
          message.avatarUrl = reader.string();
          break;
        case 3:
          message.invite = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateBotRequest {
    return {
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      avatarUrl: isSet(object.avatarUrl) ? String(object.avatarUrl) : undefined,
      invite: isSet(object.invite) ? String(object.invite) : undefined,
    };
  },

  toJSON(message: CreateBotRequest): unknown {
    const obj: any = {};
    message.displayName !== undefined &&
      (obj.displayName = message.displayName);
    message.avatarUrl !== undefined && (obj.avatarUrl = message.avatarUrl);
    message.invite !== undefined && (obj.invite = message.invite);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateBotRequest>, I>>(
    object: I
  ): CreateBotRequest {
    const message = createBaseCreateBotRequest();
    message.displayName = object.displayName ?? "";
    message.avatarUrl = object.avatarUrl ?? undefined;
    message.invite = object.invite ?? undefined;
    return message;
  },
};

function createBaseCreateBotResponse(): CreateBotResponse {
  return { botId: 0 };
}

export const CreateBotResponse = {
  encode(message: CreateBotResponse, writer: Writer = Writer.create()): Writer {
    if (message.botId !== undefined && message.botId !== 0) {
      writer.uint32(8).uint64(message.botId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CreateBotResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.botId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateBotResponse {
    return {
      botId: isSet(object.botId) ? Number(object.botId) : 0,
    };
  },

  toJSON(message: CreateBotResponse): unknown {
    const obj: any = {};
    message.botId !== undefined && (obj.botId = Math.round(message.botId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateBotResponse>, I>>(
    object: I
  ): CreateBotResponse {
    const message = createBaseCreateBotResponse();
    message.botId = object.botId ?? 0;
    return message;
  },
};

function createBaseEditBotRequest(): EditBotRequest {
  return {
    botId: 0,
    newDisplayName: undefined,
    newAvatarUrl: undefined,
    invite: undefined,
  };
}

export const EditBotRequest = {
  encode(message: EditBotRequest, writer: Writer = Writer.create()): Writer {
    if (message.botId !== undefined && message.botId !== 0) {
      writer.uint32(8).uint64(message.botId);
    }
    if (message.newDisplayName !== undefined) {
      writer.uint32(18).string(message.newDisplayName);
    }
    if (message.newAvatarUrl !== undefined) {
      writer.uint32(26).string(message.newAvatarUrl);
    }
    if (message.invite !== undefined) {
      writer.uint32(34).string(message.invite);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EditBotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEditBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.botId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.newDisplayName = reader.string();
          break;
        case 3:
          message.newAvatarUrl = reader.string();
          break;
        case 4:
          message.invite = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EditBotRequest {
    return {
      botId: isSet(object.botId) ? Number(object.botId) : 0,
      newDisplayName: isSet(object.newDisplayName)
        ? String(object.newDisplayName)
        : undefined,
      newAvatarUrl: isSet(object.newAvatarUrl)
        ? String(object.newAvatarUrl)
        : undefined,
      invite: isSet(object.invite) ? String(object.invite) : undefined,
    };
  },

  toJSON(message: EditBotRequest): unknown {
    const obj: any = {};
    message.botId !== undefined && (obj.botId = Math.round(message.botId));
    message.newDisplayName !== undefined &&
      (obj.newDisplayName = message.newDisplayName);
    message.newAvatarUrl !== undefined &&
      (obj.newAvatarUrl = message.newAvatarUrl);
    message.invite !== undefined && (obj.invite = message.invite);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EditBotRequest>, I>>(
    object: I
  ): EditBotRequest {
    const message = createBaseEditBotRequest();
    message.botId = object.botId ?? 0;
    message.newDisplayName = object.newDisplayName ?? undefined;
    message.newAvatarUrl = object.newAvatarUrl ?? undefined;
    message.invite = object.invite ?? undefined;
    return message;
  },
};

function createBaseEditBotResponse(): EditBotResponse {
  return {};
}

export const EditBotResponse = {
  encode(_: EditBotResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EditBotResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEditBotResponse();
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

  fromJSON(_: any): EditBotResponse {
    return {};
  },

  toJSON(_: EditBotResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EditBotResponse>, I>>(
    _: I
  ): EditBotResponse {
    const message = createBaseEditBotResponse();
    return message;
  },
};

function createBaseDeleteBotRequest(): DeleteBotRequest {
  return { botId: 0 };
}

export const DeleteBotRequest = {
  encode(message: DeleteBotRequest, writer: Writer = Writer.create()): Writer {
    if (message.botId !== undefined && message.botId !== 0) {
      writer.uint32(8).uint64(message.botId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteBotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.botId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteBotRequest {
    return {
      botId: isSet(object.botId) ? Number(object.botId) : 0,
    };
  },

  toJSON(message: DeleteBotRequest): unknown {
    const obj: any = {};
    message.botId !== undefined && (obj.botId = Math.round(message.botId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteBotRequest>, I>>(
    object: I
  ): DeleteBotRequest {
    const message = createBaseDeleteBotRequest();
    message.botId = object.botId ?? 0;
    return message;
  },
};

function createBaseDeleteBotResponse(): DeleteBotResponse {
  return {};
}

export const DeleteBotResponse = {
  encode(_: DeleteBotResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteBotResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteBotResponse();
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

  fromJSON(_: any): DeleteBotResponse {
    return {};
  },

  toJSON(_: DeleteBotResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteBotResponse>, I>>(
    _: I
  ): DeleteBotResponse {
    const message = createBaseDeleteBotResponse();
    return message;
  },
};

function createBaseGetBotRequest(): GetBotRequest {
  return { botId: 0 };
}

export const GetBotRequest = {
  encode(message: GetBotRequest, writer: Writer = Writer.create()): Writer {
    if (message.botId !== undefined && message.botId !== 0) {
      writer.uint32(8).uint64(message.botId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetBotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.botId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBotRequest {
    return {
      botId: isSet(object.botId) ? Number(object.botId) : 0,
    };
  },

  toJSON(message: GetBotRequest): unknown {
    const obj: any = {};
    message.botId !== undefined && (obj.botId = Math.round(message.botId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBotRequest>, I>>(
    object: I
  ): GetBotRequest {
    const message = createBaseGetBotRequest();
    message.botId = object.botId ?? 0;
    return message;
  },
};

function createBaseGetBotResponse(): GetBotResponse {
  return { bot: undefined };
}

export const GetBotResponse = {
  encode(message: GetBotResponse, writer: Writer = Writer.create()): Writer {
    if (message.bot !== undefined) {
      Bot.encode(message.bot, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetBotResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bot = Bot.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBotResponse {
    return {
      bot: isSet(object.bot) ? Bot.fromJSON(object.bot) : undefined,
    };
  },

  toJSON(message: GetBotResponse): unknown {
    const obj: any = {};
    message.bot !== undefined &&
      (obj.bot = message.bot ? Bot.toJSON(message.bot) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBotResponse>, I>>(
    object: I
  ): GetBotResponse {
    const message = createBaseGetBotResponse();
    message.bot =
      object.bot !== undefined && object.bot !== null
        ? Bot.fromPartial(object.bot)
        : undefined;
    return message;
  },
};

function createBasePoliciesRequest(): PoliciesRequest {
  return {};
}

export const PoliciesRequest = {
  encode(_: PoliciesRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PoliciesRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoliciesRequest();
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

  fromJSON(_: any): PoliciesRequest {
    return {};
  },

  toJSON(_: PoliciesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoliciesRequest>, I>>(
    _: I
  ): PoliciesRequest {
    const message = createBasePoliciesRequest();
    return message;
  },
};

function createBasePoliciesResponse(): PoliciesResponse {
  return { maxBots: 0 };
}

export const PoliciesResponse = {
  encode(message: PoliciesResponse, writer: Writer = Writer.create()): Writer {
    if (message.maxBots !== undefined && message.maxBots !== 0) {
      writer.uint32(8).uint32(message.maxBots);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PoliciesResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoliciesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.maxBots = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoliciesResponse {
    return {
      maxBots: isSet(object.maxBots) ? Number(object.maxBots) : 0,
    };
  },

  toJSON(message: PoliciesResponse): unknown {
    const obj: any = {};
    message.maxBots !== undefined &&
      (obj.maxBots = Math.round(message.maxBots));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoliciesResponse>, I>>(
    object: I
  ): PoliciesResponse {
    const message = createBasePoliciesResponse();
    message.maxBots = object.maxBots ?? 0;
    return message;
  },
};

function createBaseAddBotRequest(): AddBotRequest {
  return { guildId: 0, inviteCode: "" };
}

export const AddBotRequest = {
  encode(message: AddBotRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== undefined && message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.inviteCode !== undefined && message.inviteCode !== "") {
      writer.uint32(18).string(message.inviteCode);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddBotRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.inviteCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddBotRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      inviteCode: isSet(object.inviteCode) ? String(object.inviteCode) : "",
    };
  },

  toJSON(message: AddBotRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.inviteCode !== undefined && (obj.inviteCode = message.inviteCode);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddBotRequest>, I>>(
    object: I
  ): AddBotRequest {
    const message = createBaseAddBotRequest();
    message.guildId = object.guildId ?? 0;
    message.inviteCode = object.inviteCode ?? "";
    return message;
  },
};

function createBaseAddBotResponse(): AddBotResponse {
  return {};
}

export const AddBotResponse = {
  encode(_: AddBotResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddBotResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddBotResponse();
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

  fromJSON(_: any): AddBotResponse {
    return {};
  },

  toJSON(_: AddBotResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddBotResponse>, I>>(
    _: I
  ): AddBotResponse {
    const message = createBaseAddBotResponse();
    return message;
  },
};

/** The Bots service allows the management of bot accounts. */
export const BotsServiceDefinition = {
  name: "BotsService",
  fullName: "protocol.bots.v1.BotsService",
  methods: {
    /** Gets the list of bots that you own. */
    myBots: {
      name: "MyBots",
      requestType: MyBotsRequest,
      requestStream: false,
      responseType: MyBotsResponse,
      responseStream: false,
      options: {},
    },
    /** Gets information on a given bot. */
    getBot: {
      name: "GetBot",
      requestType: GetBotRequest,
      requestStream: false,
      responseType: GetBotResponse,
      responseStream: false,
      options: {},
    },
    /** Creates a new bot account. */
    createBot: {
      name: "CreateBot",
      requestType: CreateBotRequest,
      requestStream: false,
      responseType: CreateBotResponse,
      responseStream: false,
      options: {},
    },
    /** Modifies a bot account that you own. */
    editBot: {
      name: "EditBot",
      requestType: EditBotRequest,
      requestStream: false,
      responseType: EditBotResponse,
      responseStream: false,
      options: {},
    },
    /** Deletes a bot account that you own. */
    deleteBot: {
      name: "DeleteBot",
      requestType: DeleteBotRequest,
      requestStream: false,
      responseType: DeleteBotResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Server policies for bot accounts that the client
     * may display in its UI or restrict actions to prevent
     * request errors.
     */
    policies: {
      name: "Policies",
      requestType: PoliciesRequest,
      requestStream: false,
      responseType: PoliciesResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Requests a bot to add itself to the guild.
     *
     * For cross-server bots, this dispatches a UserInvited
     * request across sync, inviting the bot to the guild.
     */
    addBot: {
      name: "AddBot",
      requestType: AddBotRequest,
      requestStream: false,
      responseType: AddBotResponse,
      responseStream: false,
      options: {},
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
