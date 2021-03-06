/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "protocol.voice.v1";

/**
 * Data containing all the necessary information to
 * create a consumer for a user in a voice channel.
 *
 * This corresponds to https://mediasoup.org/documentation/v3/mediasoup-client/api/#ConsumerOptions on client:
 * - `consumer_id` -> `id`
 * - `producer_id` -> `producerId`
 * - `rtp_parameters` -> `rtpParameters`
 * - and `kind` should be set to "audio".
 */
export interface UserConsumerOptions {
  /** User ID of the user. */
  userId: string;
  /** Producer ID of the producer being consumed. */
  producerId: string;
  /** Consumer ID for the user's producer consumer. */
  consumerId: string;
  /** RTP paramaters for the user's audio track. Corresponds to `RtpParameters` in mediasoup's TypeScript API. */
  rtpParameters: string;
}

/**
 * Object containing all the necessary information about transport options required
 * from the server to establish transport connection on the client.
 *
 * This corresponds to https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions on client:
 * - `id` -> `id`
 * - `ice_parameters` -> `iceParameters`
 * - `dtls_parameters` -> `dtlsParameters`
 * - `ice_candidates` -> `iceCandidates`
 */
export interface TransportOptions {
  /** The transport ID. */
  id: string;
  /** DTLS paramaters in JSON. Corresponds to `DtlsParameters` in mediasoup's TypeScript API. */
  dtlsParameters: string;
  /** ICE candidates in JSON. Corresponds to `IceCandidate` in mediasoup's TypeScript API. */
  iceCandidates: string[];
  /** ICE paramaters in JSON. Corresponds to `IceParameters` in mediasoup's TypeScript API. */
  iceParameters: string;
}

/** Used in `StreamMessage` endpoint. */
export interface StreamMessageRequest {
  message?:
    | { $case: "initialize"; initialize: StreamMessageRequest_Initialize }
    | {
        $case: "prepareForJoinChannel";
        prepareForJoinChannel: StreamMessageRequest_PrepareForJoinChannel;
      }
    | { $case: "joinChannel"; joinChannel: StreamMessageRequest_JoinChannel }
    | {
        $case: "resumeConsumer";
        resumeConsumer: StreamMessageRequest_ResumeConsumer;
      };
}

/** IDs that will be used to know which channel this WS will operate in. */
export interface StreamMessageRequest_Initialize {
  /** Guild ID of the guild where the channel is. */
  guildId: string;
  /** Channel ID of the voice channel to initialize for. */
  channelId: string;
}

/** Data needed to prepare for joining a channel. */
export interface StreamMessageRequest_PrepareForJoinChannel {
  /** RTP capabilities in JSON. */
  rtpCapabilities: string;
}

/**
 * Data needed to join a channel.
 *
 * This takes one RTP paramaters for one track, which will be
 * assumed to be Audio.
 *
 * It also takes DTLS paramaters for connecting both producer and consumer.
 */
export interface StreamMessageRequest_JoinChannel {
  /** RTP paramaters in JSON. Corresponds to `RtpParameters` in mediasoup's TypeScript API. */
  rtpParamaters: string;
  /** DTLS paramaters for producer transport, in JSON. Corresponds to `DtlsParameters` in mediasoup's TypeScript API. */
  producerDtlsParamaters: string;
  /** DTLS paramaters for consumer transport, in JSON. Corresponds to `DtlsParameters` in mediasoup's TypeScript API. */
  consumerDtlsParamaters: string;
}

/** Message to resume a consumer. */
export interface StreamMessageRequest_ResumeConsumer {
  /** ID of the consumer to resume. */
  consumerId: string;
}

/** Used in `StreamMessage` endpoint. */
export interface StreamMessageResponse {
  message?:
    | { $case: "initialized"; initialized: StreamMessageResponse_Initialized }
    | {
        $case: "preparedForJoinChannel";
        preparedForJoinChannel: StreamMessageResponse_PreparedForJoinChannel;
      }
    | {
        $case: "joinedChannel";
        joinedChannel: StreamMessageResponse_JoinedChannel;
      }
    | { $case: "userJoined"; userJoined: StreamMessageResponse_UserJoined }
    | { $case: "userLeft"; userLeft: StreamMessageResponse_UserLeft };
}

/** Initialization data for client. */
export interface StreamMessageResponse_Initialized {
  /** Server RTP capabilities in JSON. Corresponds to `RtpCapabilities` in mediasoup's TypeScript API. */
  rtpCapabilities: string;
}

/** RTP capabilities validated. */
export interface StreamMessageResponse_PreparedForJoinChannel {
  /** Consumer transport options. */
  consumerTransportOptions?: TransportOptions;
  /** Producer transport options. */
  producerTransportOptions?: TransportOptions;
}

/** Producer for voice created; consumer and producer transports are connected. */
export interface StreamMessageResponse_JoinedChannel {
  /** Consumer options for users that were already in the room. */
  otherUsers: UserConsumerOptions[];
}

/** Data for the user that joined the room and it's producer. */
export interface StreamMessageResponse_UserJoined {
  /** Consumer options for this user. */
  data?: UserConsumerOptions;
}

/** Data for the user that left the room and the producer. */
export interface StreamMessageResponse_UserLeft {
  /** ID of the user that left. */
  userId: string;
}

function createBaseUserConsumerOptions(): UserConsumerOptions {
  return { userId: "0", producerId: "", consumerId: "", rtpParameters: "" };
}

export const UserConsumerOptions = {
  encode(
    message: UserConsumerOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userId !== "0") {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.producerId !== "") {
      writer.uint32(18).string(message.producerId);
    }
    if (message.consumerId !== "") {
      writer.uint32(26).string(message.consumerId);
    }
    if (message.rtpParameters !== "") {
      writer.uint32(34).string(message.rtpParameters);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserConsumerOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConsumerOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.producerId = reader.string();
          break;
        case 3:
          message.consumerId = reader.string();
          break;
        case 4:
          message.rtpParameters = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserConsumerOptions {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "0",
      producerId: isSet(object.producerId) ? String(object.producerId) : "",
      consumerId: isSet(object.consumerId) ? String(object.consumerId) : "",
      rtpParameters: isSet(object.rtpParameters)
        ? String(object.rtpParameters)
        : "",
    };
  },

  toJSON(message: UserConsumerOptions): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.producerId !== undefined && (obj.producerId = message.producerId);
    message.consumerId !== undefined && (obj.consumerId = message.consumerId);
    message.rtpParameters !== undefined &&
      (obj.rtpParameters = message.rtpParameters);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserConsumerOptions>, I>>(
    object: I
  ): UserConsumerOptions {
    const message = createBaseUserConsumerOptions();
    message.userId = object.userId ?? "0";
    message.producerId = object.producerId ?? "";
    message.consumerId = object.consumerId ?? "";
    message.rtpParameters = object.rtpParameters ?? "";
    return message;
  },
};

function createBaseTransportOptions(): TransportOptions {
  return { id: "", dtlsParameters: "", iceCandidates: [], iceParameters: "" };
}

export const TransportOptions = {
  encode(
    message: TransportOptions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.dtlsParameters !== "") {
      writer.uint32(18).string(message.dtlsParameters);
    }
    for (const v of message.iceCandidates) {
      writer.uint32(26).string(v!);
    }
    if (message.iceParameters !== "") {
      writer.uint32(34).string(message.iceParameters);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransportOptions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransportOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.dtlsParameters = reader.string();
          break;
        case 3:
          message.iceCandidates.push(reader.string());
          break;
        case 4:
          message.iceParameters = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransportOptions {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      dtlsParameters: isSet(object.dtlsParameters)
        ? String(object.dtlsParameters)
        : "",
      iceCandidates: Array.isArray(object?.iceCandidates)
        ? object.iceCandidates.map((e: any) => String(e))
        : [],
      iceParameters: isSet(object.iceParameters)
        ? String(object.iceParameters)
        : "",
    };
  },

  toJSON(message: TransportOptions): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.dtlsParameters !== undefined &&
      (obj.dtlsParameters = message.dtlsParameters);
    if (message.iceCandidates) {
      obj.iceCandidates = message.iceCandidates.map((e) => e);
    } else {
      obj.iceCandidates = [];
    }
    message.iceParameters !== undefined &&
      (obj.iceParameters = message.iceParameters);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransportOptions>, I>>(
    object: I
  ): TransportOptions {
    const message = createBaseTransportOptions();
    message.id = object.id ?? "";
    message.dtlsParameters = object.dtlsParameters ?? "";
    message.iceCandidates = object.iceCandidates?.map((e) => e) || [];
    message.iceParameters = object.iceParameters ?? "";
    return message;
  },
};

function createBaseStreamMessageRequest(): StreamMessageRequest {
  return { message: undefined };
}

export const StreamMessageRequest = {
  encode(
    message: StreamMessageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message?.$case === "initialize") {
      StreamMessageRequest_Initialize.encode(
        message.message.initialize,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.message?.$case === "prepareForJoinChannel") {
      StreamMessageRequest_PrepareForJoinChannel.encode(
        message.message.prepareForJoinChannel,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.message?.$case === "joinChannel") {
      StreamMessageRequest_JoinChannel.encode(
        message.message.joinChannel,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.message?.$case === "resumeConsumer") {
      StreamMessageRequest_ResumeConsumer.encode(
        message.message.resumeConsumer,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = {
            $case: "initialize",
            initialize: StreamMessageRequest_Initialize.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 2:
          message.message = {
            $case: "prepareForJoinChannel",
            prepareForJoinChannel:
              StreamMessageRequest_PrepareForJoinChannel.decode(
                reader,
                reader.uint32()
              ),
          };
          break;
        case 3:
          message.message = {
            $case: "joinChannel",
            joinChannel: StreamMessageRequest_JoinChannel.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 4:
          message.message = {
            $case: "resumeConsumer",
            resumeConsumer: StreamMessageRequest_ResumeConsumer.decode(
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

  fromJSON(object: any): StreamMessageRequest {
    return {
      message: isSet(object.initialize)
        ? {
            $case: "initialize",
            initialize: StreamMessageRequest_Initialize.fromJSON(
              object.initialize
            ),
          }
        : isSet(object.prepareForJoinChannel)
        ? {
            $case: "prepareForJoinChannel",
            prepareForJoinChannel:
              StreamMessageRequest_PrepareForJoinChannel.fromJSON(
                object.prepareForJoinChannel
              ),
          }
        : isSet(object.joinChannel)
        ? {
            $case: "joinChannel",
            joinChannel: StreamMessageRequest_JoinChannel.fromJSON(
              object.joinChannel
            ),
          }
        : isSet(object.resumeConsumer)
        ? {
            $case: "resumeConsumer",
            resumeConsumer: StreamMessageRequest_ResumeConsumer.fromJSON(
              object.resumeConsumer
            ),
          }
        : undefined,
    };
  },

  toJSON(message: StreamMessageRequest): unknown {
    const obj: any = {};
    message.message?.$case === "initialize" &&
      (obj.initialize = message.message?.initialize
        ? StreamMessageRequest_Initialize.toJSON(message.message?.initialize)
        : undefined);
    message.message?.$case === "prepareForJoinChannel" &&
      (obj.prepareForJoinChannel = message.message?.prepareForJoinChannel
        ? StreamMessageRequest_PrepareForJoinChannel.toJSON(
            message.message?.prepareForJoinChannel
          )
        : undefined);
    message.message?.$case === "joinChannel" &&
      (obj.joinChannel = message.message?.joinChannel
        ? StreamMessageRequest_JoinChannel.toJSON(message.message?.joinChannel)
        : undefined);
    message.message?.$case === "resumeConsumer" &&
      (obj.resumeConsumer = message.message?.resumeConsumer
        ? StreamMessageRequest_ResumeConsumer.toJSON(
            message.message?.resumeConsumer
          )
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamMessageRequest>, I>>(
    object: I
  ): StreamMessageRequest {
    const message = createBaseStreamMessageRequest();
    if (
      object.message?.$case === "initialize" &&
      object.message?.initialize !== undefined &&
      object.message?.initialize !== null
    ) {
      message.message = {
        $case: "initialize",
        initialize: StreamMessageRequest_Initialize.fromPartial(
          object.message.initialize
        ),
      };
    }
    if (
      object.message?.$case === "prepareForJoinChannel" &&
      object.message?.prepareForJoinChannel !== undefined &&
      object.message?.prepareForJoinChannel !== null
    ) {
      message.message = {
        $case: "prepareForJoinChannel",
        prepareForJoinChannel:
          StreamMessageRequest_PrepareForJoinChannel.fromPartial(
            object.message.prepareForJoinChannel
          ),
      };
    }
    if (
      object.message?.$case === "joinChannel" &&
      object.message?.joinChannel !== undefined &&
      object.message?.joinChannel !== null
    ) {
      message.message = {
        $case: "joinChannel",
        joinChannel: StreamMessageRequest_JoinChannel.fromPartial(
          object.message.joinChannel
        ),
      };
    }
    if (
      object.message?.$case === "resumeConsumer" &&
      object.message?.resumeConsumer !== undefined &&
      object.message?.resumeConsumer !== null
    ) {
      message.message = {
        $case: "resumeConsumer",
        resumeConsumer: StreamMessageRequest_ResumeConsumer.fromPartial(
          object.message.resumeConsumer
        ),
      };
    }
    return message;
  },
};

function createBaseStreamMessageRequest_Initialize(): StreamMessageRequest_Initialize {
  return { guildId: "0", channelId: "0" };
}

export const StreamMessageRequest_Initialize = {
  encode(
    message: StreamMessageRequest_Initialize,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== "0") {
      writer.uint32(16).uint64(message.channelId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageRequest_Initialize {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageRequest_Initialize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessageRequest_Initialize {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : "0",
    };
  },

  toJSON(message: StreamMessageRequest_Initialize): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamMessageRequest_Initialize>, I>>(
    object: I
  ): StreamMessageRequest_Initialize {
    const message = createBaseStreamMessageRequest_Initialize();
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? "0";
    return message;
  },
};

function createBaseStreamMessageRequest_PrepareForJoinChannel(): StreamMessageRequest_PrepareForJoinChannel {
  return { rtpCapabilities: "" };
}

export const StreamMessageRequest_PrepareForJoinChannel = {
  encode(
    message: StreamMessageRequest_PrepareForJoinChannel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rtpCapabilities !== "") {
      writer.uint32(10).string(message.rtpCapabilities);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageRequest_PrepareForJoinChannel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageRequest_PrepareForJoinChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rtpCapabilities = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessageRequest_PrepareForJoinChannel {
    return {
      rtpCapabilities: isSet(object.rtpCapabilities)
        ? String(object.rtpCapabilities)
        : "",
    };
  },

  toJSON(message: StreamMessageRequest_PrepareForJoinChannel): unknown {
    const obj: any = {};
    message.rtpCapabilities !== undefined &&
      (obj.rtpCapabilities = message.rtpCapabilities);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamMessageRequest_PrepareForJoinChannel>, I>
  >(object: I): StreamMessageRequest_PrepareForJoinChannel {
    const message = createBaseStreamMessageRequest_PrepareForJoinChannel();
    message.rtpCapabilities = object.rtpCapabilities ?? "";
    return message;
  },
};

function createBaseStreamMessageRequest_JoinChannel(): StreamMessageRequest_JoinChannel {
  return {
    rtpParamaters: "",
    producerDtlsParamaters: "",
    consumerDtlsParamaters: "",
  };
}

export const StreamMessageRequest_JoinChannel = {
  encode(
    message: StreamMessageRequest_JoinChannel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rtpParamaters !== "") {
      writer.uint32(10).string(message.rtpParamaters);
    }
    if (message.producerDtlsParamaters !== "") {
      writer.uint32(18).string(message.producerDtlsParamaters);
    }
    if (message.consumerDtlsParamaters !== "") {
      writer.uint32(26).string(message.consumerDtlsParamaters);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageRequest_JoinChannel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageRequest_JoinChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rtpParamaters = reader.string();
          break;
        case 2:
          message.producerDtlsParamaters = reader.string();
          break;
        case 3:
          message.consumerDtlsParamaters = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessageRequest_JoinChannel {
    return {
      rtpParamaters: isSet(object.rtpParamaters)
        ? String(object.rtpParamaters)
        : "",
      producerDtlsParamaters: isSet(object.producerDtlsParamaters)
        ? String(object.producerDtlsParamaters)
        : "",
      consumerDtlsParamaters: isSet(object.consumerDtlsParamaters)
        ? String(object.consumerDtlsParamaters)
        : "",
    };
  },

  toJSON(message: StreamMessageRequest_JoinChannel): unknown {
    const obj: any = {};
    message.rtpParamaters !== undefined &&
      (obj.rtpParamaters = message.rtpParamaters);
    message.producerDtlsParamaters !== undefined &&
      (obj.producerDtlsParamaters = message.producerDtlsParamaters);
    message.consumerDtlsParamaters !== undefined &&
      (obj.consumerDtlsParamaters = message.consumerDtlsParamaters);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamMessageRequest_JoinChannel>, I>
  >(object: I): StreamMessageRequest_JoinChannel {
    const message = createBaseStreamMessageRequest_JoinChannel();
    message.rtpParamaters = object.rtpParamaters ?? "";
    message.producerDtlsParamaters = object.producerDtlsParamaters ?? "";
    message.consumerDtlsParamaters = object.consumerDtlsParamaters ?? "";
    return message;
  },
};

function createBaseStreamMessageRequest_ResumeConsumer(): StreamMessageRequest_ResumeConsumer {
  return { consumerId: "" };
}

export const StreamMessageRequest_ResumeConsumer = {
  encode(
    message: StreamMessageRequest_ResumeConsumer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageRequest_ResumeConsumer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageRequest_ResumeConsumer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessageRequest_ResumeConsumer {
    return {
      consumerId: isSet(object.consumerId) ? String(object.consumerId) : "",
    };
  },

  toJSON(message: StreamMessageRequest_ResumeConsumer): unknown {
    const obj: any = {};
    message.consumerId !== undefined && (obj.consumerId = message.consumerId);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamMessageRequest_ResumeConsumer>, I>
  >(object: I): StreamMessageRequest_ResumeConsumer {
    const message = createBaseStreamMessageRequest_ResumeConsumer();
    message.consumerId = object.consumerId ?? "";
    return message;
  },
};

function createBaseStreamMessageResponse(): StreamMessageResponse {
  return { message: undefined };
}

export const StreamMessageResponse = {
  encode(
    message: StreamMessageResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message?.$case === "initialized") {
      StreamMessageResponse_Initialized.encode(
        message.message.initialized,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.message?.$case === "preparedForJoinChannel") {
      StreamMessageResponse_PreparedForJoinChannel.encode(
        message.message.preparedForJoinChannel,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.message?.$case === "joinedChannel") {
      StreamMessageResponse_JoinedChannel.encode(
        message.message.joinedChannel,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.message?.$case === "userJoined") {
      StreamMessageResponse_UserJoined.encode(
        message.message.userJoined,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.message?.$case === "userLeft") {
      StreamMessageResponse_UserLeft.encode(
        message.message.userLeft,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = {
            $case: "initialized",
            initialized: StreamMessageResponse_Initialized.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 2:
          message.message = {
            $case: "preparedForJoinChannel",
            preparedForJoinChannel:
              StreamMessageResponse_PreparedForJoinChannel.decode(
                reader,
                reader.uint32()
              ),
          };
          break;
        case 3:
          message.message = {
            $case: "joinedChannel",
            joinedChannel: StreamMessageResponse_JoinedChannel.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 4:
          message.message = {
            $case: "userJoined",
            userJoined: StreamMessageResponse_UserJoined.decode(
              reader,
              reader.uint32()
            ),
          };
          break;
        case 5:
          message.message = {
            $case: "userLeft",
            userLeft: StreamMessageResponse_UserLeft.decode(
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

  fromJSON(object: any): StreamMessageResponse {
    return {
      message: isSet(object.initialized)
        ? {
            $case: "initialized",
            initialized: StreamMessageResponse_Initialized.fromJSON(
              object.initialized
            ),
          }
        : isSet(object.preparedForJoinChannel)
        ? {
            $case: "preparedForJoinChannel",
            preparedForJoinChannel:
              StreamMessageResponse_PreparedForJoinChannel.fromJSON(
                object.preparedForJoinChannel
              ),
          }
        : isSet(object.joinedChannel)
        ? {
            $case: "joinedChannel",
            joinedChannel: StreamMessageResponse_JoinedChannel.fromJSON(
              object.joinedChannel
            ),
          }
        : isSet(object.userJoined)
        ? {
            $case: "userJoined",
            userJoined: StreamMessageResponse_UserJoined.fromJSON(
              object.userJoined
            ),
          }
        : isSet(object.userLeft)
        ? {
            $case: "userLeft",
            userLeft: StreamMessageResponse_UserLeft.fromJSON(object.userLeft),
          }
        : undefined,
    };
  },

  toJSON(message: StreamMessageResponse): unknown {
    const obj: any = {};
    message.message?.$case === "initialized" &&
      (obj.initialized = message.message?.initialized
        ? StreamMessageResponse_Initialized.toJSON(message.message?.initialized)
        : undefined);
    message.message?.$case === "preparedForJoinChannel" &&
      (obj.preparedForJoinChannel = message.message?.preparedForJoinChannel
        ? StreamMessageResponse_PreparedForJoinChannel.toJSON(
            message.message?.preparedForJoinChannel
          )
        : undefined);
    message.message?.$case === "joinedChannel" &&
      (obj.joinedChannel = message.message?.joinedChannel
        ? StreamMessageResponse_JoinedChannel.toJSON(
            message.message?.joinedChannel
          )
        : undefined);
    message.message?.$case === "userJoined" &&
      (obj.userJoined = message.message?.userJoined
        ? StreamMessageResponse_UserJoined.toJSON(message.message?.userJoined)
        : undefined);
    message.message?.$case === "userLeft" &&
      (obj.userLeft = message.message?.userLeft
        ? StreamMessageResponse_UserLeft.toJSON(message.message?.userLeft)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamMessageResponse>, I>>(
    object: I
  ): StreamMessageResponse {
    const message = createBaseStreamMessageResponse();
    if (
      object.message?.$case === "initialized" &&
      object.message?.initialized !== undefined &&
      object.message?.initialized !== null
    ) {
      message.message = {
        $case: "initialized",
        initialized: StreamMessageResponse_Initialized.fromPartial(
          object.message.initialized
        ),
      };
    }
    if (
      object.message?.$case === "preparedForJoinChannel" &&
      object.message?.preparedForJoinChannel !== undefined &&
      object.message?.preparedForJoinChannel !== null
    ) {
      message.message = {
        $case: "preparedForJoinChannel",
        preparedForJoinChannel:
          StreamMessageResponse_PreparedForJoinChannel.fromPartial(
            object.message.preparedForJoinChannel
          ),
      };
    }
    if (
      object.message?.$case === "joinedChannel" &&
      object.message?.joinedChannel !== undefined &&
      object.message?.joinedChannel !== null
    ) {
      message.message = {
        $case: "joinedChannel",
        joinedChannel: StreamMessageResponse_JoinedChannel.fromPartial(
          object.message.joinedChannel
        ),
      };
    }
    if (
      object.message?.$case === "userJoined" &&
      object.message?.userJoined !== undefined &&
      object.message?.userJoined !== null
    ) {
      message.message = {
        $case: "userJoined",
        userJoined: StreamMessageResponse_UserJoined.fromPartial(
          object.message.userJoined
        ),
      };
    }
    if (
      object.message?.$case === "userLeft" &&
      object.message?.userLeft !== undefined &&
      object.message?.userLeft !== null
    ) {
      message.message = {
        $case: "userLeft",
        userLeft: StreamMessageResponse_UserLeft.fromPartial(
          object.message.userLeft
        ),
      };
    }
    return message;
  },
};

function createBaseStreamMessageResponse_Initialized(): StreamMessageResponse_Initialized {
  return { rtpCapabilities: "" };
}

export const StreamMessageResponse_Initialized = {
  encode(
    message: StreamMessageResponse_Initialized,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.rtpCapabilities !== "") {
      writer.uint32(10).string(message.rtpCapabilities);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageResponse_Initialized {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageResponse_Initialized();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rtpCapabilities = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessageResponse_Initialized {
    return {
      rtpCapabilities: isSet(object.rtpCapabilities)
        ? String(object.rtpCapabilities)
        : "",
    };
  },

  toJSON(message: StreamMessageResponse_Initialized): unknown {
    const obj: any = {};
    message.rtpCapabilities !== undefined &&
      (obj.rtpCapabilities = message.rtpCapabilities);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamMessageResponse_Initialized>, I>
  >(object: I): StreamMessageResponse_Initialized {
    const message = createBaseStreamMessageResponse_Initialized();
    message.rtpCapabilities = object.rtpCapabilities ?? "";
    return message;
  },
};

function createBaseStreamMessageResponse_PreparedForJoinChannel(): StreamMessageResponse_PreparedForJoinChannel {
  return {
    consumerTransportOptions: undefined,
    producerTransportOptions: undefined,
  };
}

export const StreamMessageResponse_PreparedForJoinChannel = {
  encode(
    message: StreamMessageResponse_PreparedForJoinChannel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consumerTransportOptions !== undefined) {
      TransportOptions.encode(
        message.consumerTransportOptions,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.producerTransportOptions !== undefined) {
      TransportOptions.encode(
        message.producerTransportOptions,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageResponse_PreparedForJoinChannel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageResponse_PreparedForJoinChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerTransportOptions = TransportOptions.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.producerTransportOptions = TransportOptions.decode(
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

  fromJSON(object: any): StreamMessageResponse_PreparedForJoinChannel {
    return {
      consumerTransportOptions: isSet(object.consumerTransportOptions)
        ? TransportOptions.fromJSON(object.consumerTransportOptions)
        : undefined,
      producerTransportOptions: isSet(object.producerTransportOptions)
        ? TransportOptions.fromJSON(object.producerTransportOptions)
        : undefined,
    };
  },

  toJSON(message: StreamMessageResponse_PreparedForJoinChannel): unknown {
    const obj: any = {};
    message.consumerTransportOptions !== undefined &&
      (obj.consumerTransportOptions = message.consumerTransportOptions
        ? TransportOptions.toJSON(message.consumerTransportOptions)
        : undefined);
    message.producerTransportOptions !== undefined &&
      (obj.producerTransportOptions = message.producerTransportOptions
        ? TransportOptions.toJSON(message.producerTransportOptions)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<StreamMessageResponse_PreparedForJoinChannel>,
      I
    >
  >(object: I): StreamMessageResponse_PreparedForJoinChannel {
    const message = createBaseStreamMessageResponse_PreparedForJoinChannel();
    message.consumerTransportOptions =
      object.consumerTransportOptions !== undefined &&
      object.consumerTransportOptions !== null
        ? TransportOptions.fromPartial(object.consumerTransportOptions)
        : undefined;
    message.producerTransportOptions =
      object.producerTransportOptions !== undefined &&
      object.producerTransportOptions !== null
        ? TransportOptions.fromPartial(object.producerTransportOptions)
        : undefined;
    return message;
  },
};

function createBaseStreamMessageResponse_JoinedChannel(): StreamMessageResponse_JoinedChannel {
  return { otherUsers: [] };
}

export const StreamMessageResponse_JoinedChannel = {
  encode(
    message: StreamMessageResponse_JoinedChannel,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.otherUsers) {
      UserConsumerOptions.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageResponse_JoinedChannel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageResponse_JoinedChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.otherUsers.push(
            UserConsumerOptions.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessageResponse_JoinedChannel {
    return {
      otherUsers: Array.isArray(object?.otherUsers)
        ? object.otherUsers.map((e: any) => UserConsumerOptions.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StreamMessageResponse_JoinedChannel): unknown {
    const obj: any = {};
    if (message.otherUsers) {
      obj.otherUsers = message.otherUsers.map((e) =>
        e ? UserConsumerOptions.toJSON(e) : undefined
      );
    } else {
      obj.otherUsers = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamMessageResponse_JoinedChannel>, I>
  >(object: I): StreamMessageResponse_JoinedChannel {
    const message = createBaseStreamMessageResponse_JoinedChannel();
    message.otherUsers =
      object.otherUsers?.map((e) => UserConsumerOptions.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStreamMessageResponse_UserJoined(): StreamMessageResponse_UserJoined {
  return { data: undefined };
}

export const StreamMessageResponse_UserJoined = {
  encode(
    message: StreamMessageResponse_UserJoined,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.data !== undefined) {
      UserConsumerOptions.encode(
        message.data,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageResponse_UserJoined {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageResponse_UserJoined();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = UserConsumerOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessageResponse_UserJoined {
    return {
      data: isSet(object.data)
        ? UserConsumerOptions.fromJSON(object.data)
        : undefined,
    };
  },

  toJSON(message: StreamMessageResponse_UserJoined): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = message.data
        ? UserConsumerOptions.toJSON(message.data)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<StreamMessageResponse_UserJoined>, I>
  >(object: I): StreamMessageResponse_UserJoined {
    const message = createBaseStreamMessageResponse_UserJoined();
    message.data =
      object.data !== undefined && object.data !== null
        ? UserConsumerOptions.fromPartial(object.data)
        : undefined;
    return message;
  },
};

function createBaseStreamMessageResponse_UserLeft(): StreamMessageResponse_UserLeft {
  return { userId: "0" };
}

export const StreamMessageResponse_UserLeft = {
  encode(
    message: StreamMessageResponse_UserLeft,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userId !== "0") {
      writer.uint32(8).uint64(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StreamMessageResponse_UserLeft {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessageResponse_UserLeft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessageResponse_UserLeft {
    return {
      userId: isSet(object.userId) ? String(object.userId) : "0",
    };
  },

  toJSON(message: StreamMessageResponse_UserLeft): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamMessageResponse_UserLeft>, I>>(
    object: I
  ): StreamMessageResponse_UserLeft {
    const message = createBaseStreamMessageResponse_UserLeft();
    message.userId = object.userId ?? "0";
    return message;
  },
};

/**
 * Harmony service for facilitating voice operations using WebRTC.
 *
 * # Usage (for client)
 *
 * 0. Call StreamMessage to be able to send RTC commands to server.
 * 1. Send Initialize over stream with guild_id and channel_id of the request set to the channel you want to join.
 * 2. Init device by using the RTP capabilities sent in the response message, which should be Initialized.
 * 3. Send PrepareForJoinChannel over stream with client rtp capabilities.
 * 4. Wait for PreparedForJoinChannel, which contains transport options.
 * 5. Connect both transports using the transport options on client.
 * 6. Send JoinChannel over stream containing RTP paramaters for your Audio track
 * and DTLS paramaters for both consumer and producer.
 * 7. Wait for JoinedChannel, which confirms you have successfully joined the voice channel;
 * handle other_users which will be described in 8 (UserJoined handling).
 * 8. Handle UserJoined and UserLeft events appropiately
 *   - For UserJoined; use the received consumer ID, producer ID and RTP parameters on your
 *     consumer transport to consume the producer, afterwards send ResumeConsumer message
 *     with the consumer ID, then if that's successful add the track to a `user ID -> Track` map.
 *   - For UserLeft, remove the user track from the `user ID -> Track` map.
 *
 * ## How this looks for servers
 *
 * 0. Receives StreamMessage, starts the socket.
 * 1. Waits for Initialize.
 * 2. Sends Initialized over stream with it's RTP capabilities.
 * 3. Receives PrepareForJoinChannel with client RTP capabilities.
 * 4. Sends PreparedForJoinChannel over stream with consumer and producer transport options.
 * 5. Receives JoinChannel, checks for DTLS parameters for consumer and producer transports
 * and uses the RTP paramaters to create a producer for the client.
 * 6. Sends JoinedChannel over stream with the created producer ID and all other users' data (UserData).
 * 7. When another user does 1 to 7, sends UserJoined over stream to all other users;
 * when a user leaves the channel (when their stream ends), sends UserLeft to all other users.
 * 8. When receiving a ResumeConsumer message, unpauses the consumer corresponding to the consumer ID.
 */
export const VoiceServiceDefinition = {
  name: "VoiceService",
  fullName: "protocol.voice.v1.VoiceService",
  methods: {
    /**
     * Endpoint to stream messages between client and server.
     *
     * - One StreamMessage stream corresponds to being in one voice channel.
     * - It's recommended that users should not be able to be in more than one voice channel,
     * but this limitation is left up to the server implementation.
     */
    streamMessage: {
      name: "StreamMessage",
      requestType: StreamMessageRequest,
      requestStream: true,
      responseType: StreamMessageResponse,
      responseStream: true,
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
