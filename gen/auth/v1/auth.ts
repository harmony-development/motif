/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Token } from "../../harmonytypes/v1/types";

export const protobufPackage = "protocol.auth.v1";

/** Used in `BeginAuth` endpoint. */
export interface BeginAuthRequest {
  /**
   * If provided, this is the guest token
   * for the account being upgraded from
   * a guest account to a full account
   * during the auth flow.
   *
   * This token is provided by the server
   * at the end of the auth flow that
   * created the guest account.
   */
  forGuestToken?: string | undefined;
}

/**
 * The return type of BeginAuth, containing the
 * auth_id that will be used for the authentication
 * section.
 */
export interface BeginAuthResponse {
  /** auth_id: the ID of this auth session. */
  authId?: string;
}

/**
 * Session contains the information for a new session;
 * the user_id you logged in as and the session_token
 * which should be passed to authorisation.
 */
export interface Session {
  /** user_id: the ID of the user you logged in as. */
  userId?: number;
  /** session_token: the session token to use in authorization. */
  sessionToken?: string;
  /**
   * A token allowing for this account to be upgraded to a
   * "full" account by beginning an auth session and providing
   * this token.
   *
   * The guest token only exists to upgrade a guest account to a full
   * account, and does not permit logging in with a guest account
   * on more than one session.
   *
   * A "guest token" MAY be provided to BeginAuth to begin
   * an authorization process that will upgrade the guest account
   * to a full account if completed successfully.
   * This MUST only affect now being able to log
   * into the account with more than one session, and MUST not
   * change other information about the account, such as username
   * and password.
   */
  guestToken?: string | undefined;
}

/**
 * A step in the authentication process.
 * Contains a variety of different types of views.
 *
 * It is recommended to have a fallback_url specified
 * for non-trivial authentication procedures (such as captchas).
 */
export interface AuthStep {
  /** fallback_url: unused. */
  fallbackUrl?: string;
  /**
   * can_go_back: whether or not the client can request the
   * server to send the previous step.
   */
  canGoBack?: boolean;
  step?:
    | { $case: "choice"; choice: AuthStep_Choice }
    | { $case: "form"; form: AuthStep_Form }
    | { $case: "session"; session: Session }
    | { $case: "waiting"; waiting: AuthStep_Waiting };
}

/**
 * A step which allows the user to choose from a range of options
 * Allows you to show a heading by specifying title.
 */
export interface AuthStep_Choice {
  /** title: the title of the list of choices. */
  title?: string;
  /**
   * options: a list of choices, one of these
   * should be sent in nextstep.
   */
  options?: string[];
}

/**
 * A step which requires the user to input information
 * Allows you to show a heading by specifying title.
 */
export interface AuthStep_Form {
  /** title: the title of this form. */
  title?: string;
  /** fields: all the fields in this form. */
  fields?: AuthStep_Form_FormField[];
}

/**
 * A field in the form, containing information on how it should
 * be rendered
 * Here is a list of form types that need to be supported:
 * email: a field type that has to contain a valid email
 * password: a field type that has to contain a password
 * new-password: a field type for new passwords
 * text: a field type that has to contain text
 * number: a field type that has to contain a number
 */
export interface AuthStep_Form_FormField {
  /** name: the identifier for the form field. */
  name?: string;
  /** type: the type of the form field, as documented above. */
  type?: string;
}

/**
 * Waiting
 * A step which requires the user to perform an external action
 * The title and description should explain to the user
 * what they should do to complete this step.
 */
export interface AuthStep_Waiting {
  /** title: the title of this waiting screen. */
  title?: string;
  /** description: the explanation of what's being waited on. */
  description?: string;
}

/**
 * contains the client's response to the server's challenge
 * This needs to be called first with no arguments to
 * receive the first step.
 */
export interface NextStepRequest {
  /**
   * auth_id: the authentication session you want
   * the next step of.
   */
  authId?: string;
  step?:
    | { $case: "choice"; choice: NextStepRequest_Choice }
    | { $case: "form"; form: NextStepRequest_Form };
}

/** A simple choice string indicating which option the user chose. */
export interface NextStepRequest_Choice {
  /** choice: the choice the user picked. */
  choice?: string;
}

/** Form fields can either be bytes, string, or int64. */
export interface NextStepRequest_FormFields {
  field?:
    | { $case: "bytes"; bytes: Uint8Array }
    | { $case: "string"; string: string }
    | { $case: "number"; number: number };
}

/** An array of form fields, in the same order they came in from the server. */
export interface NextStepRequest_Form {
  /** fields: the fields the user filled out. */
  fields?: NextStepRequest_FormFields[];
}

/** Used in `NextStep` endpoint. */
export interface NextStepResponse {
  /** step: the next step in the authentication process. */
  step?: AuthStep;
}

/** A request to go back 1 step. */
export interface StepBackRequest {
  /**
   * auth_id: the authentication session the user
   * wants to go back in.
   */
  authId?: string;
}

/** Used in `StepBack` endpoint. */
export interface StepBackResponse {
  /** step: the previous step in the authentication process. */
  step?: AuthStep;
}

/**
 * Required to be initiated by all authenticating clients
 * Allows the server to send steps.
 */
export interface StreamStepsRequest {
  /**
   * auth_id: the authorization session
   * who's steps you want to stream.
   */
  authId?: string;
}

/** Used in `StreamSteps` endpoint. */
export interface StreamStepsResponse {
  /** step: the next step in the authentication process. */
  step?: AuthStep;
}

/** The request to federate with a foreign server. */
export interface FederateRequest {
  /** The server ID foreign server you want to federate with. */
  serverId?: string;
}

/**
 * The reply to a successful federation request,
 * containing the token you need to present to the
 * foreign server.
 */
export interface FederateResponse {
  /**
   * A `harmonytypes.v1.Token` whose `data` field is a serialized `TokenData` message.
   * It is signed with the homeserver's private key.
   */
  token?: Token;
}

/** Used in `Key` endpoint. */
export interface KeyRequest {}

/** Contains a key's bytes. */
export interface KeyResponse {
  /** key: the bytes of the public key. */
  key?: Uint8Array;
}

/**
 * Log into a foreignserver using a token from your homeserver,
 * obtained through a FederateRequest.
 */
export interface LoginFederatedRequest {
  /**
   * A `harmonytypes.v1.Token` whose `data` field is a serialized `TokenData` message.
   * It is signed with the homeserver's private key.
   */
  authToken?: Token;
  /** The server ID of the homeserver that the auth token is from */
  serverId?: string;
}

/** Used in `LoginFederated` endpoint. */
export interface LoginFederatedResponse {
  /** The user's session. */
  session?: Session;
}

/**
 * Information sent by a client's homeserver, in a `harmonytypes.v1.Token`.
 * It will be sent to a foreignserver by the client.
 */
export interface TokenData {
  /** The client's user ID on the homeserver. */
  userId?: number;
  /** The foreignserver's server ID. */
  serverId?: string;
  /** The username of the client. */
  username?: string;
  /** The avatar of the client. This must be a HMC that points to an image. */
  avatar?: string | undefined;
}

/** Used in `CheckLoggedIn` endpoint. */
export interface CheckLoggedInRequest {}

/** Used in `CheckLoggedIn` endpoint. */
export interface CheckLoggedInResponse {}

function createBaseBeginAuthRequest(): BeginAuthRequest {
  return { forGuestToken: undefined };
}

export const BeginAuthRequest = {
  encode(message: BeginAuthRequest, writer: Writer = Writer.create()): Writer {
    if (message.forGuestToken !== undefined) {
      writer.uint32(10).string(message.forGuestToken);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BeginAuthRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBeginAuthRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.forGuestToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BeginAuthRequest {
    return {
      forGuestToken: isSet(object.forGuestToken)
        ? String(object.forGuestToken)
        : undefined,
    };
  },

  toJSON(message: BeginAuthRequest): unknown {
    const obj: any = {};
    message.forGuestToken !== undefined &&
      (obj.forGuestToken = message.forGuestToken);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BeginAuthRequest>, I>>(
    object: I
  ): BeginAuthRequest {
    const message = createBaseBeginAuthRequest();
    message.forGuestToken = object.forGuestToken ?? undefined;
    return message;
  },
};

function createBaseBeginAuthResponse(): BeginAuthResponse {
  return { authId: "" };
}

export const BeginAuthResponse = {
  encode(message: BeginAuthResponse, writer: Writer = Writer.create()): Writer {
    if (message.authId !== undefined && message.authId !== "") {
      writer.uint32(10).string(message.authId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BeginAuthResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBeginAuthResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BeginAuthResponse {
    return {
      authId: isSet(object.authId) ? String(object.authId) : "",
    };
  },

  toJSON(message: BeginAuthResponse): unknown {
    const obj: any = {};
    message.authId !== undefined && (obj.authId = message.authId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BeginAuthResponse>, I>>(
    object: I
  ): BeginAuthResponse {
    const message = createBaseBeginAuthResponse();
    message.authId = object.authId ?? "";
    return message;
  },
};

function createBaseSession(): Session {
  return { userId: 0, sessionToken: "", guestToken: undefined };
}

export const Session = {
  encode(message: Session, writer: Writer = Writer.create()): Writer {
    if (message.userId !== undefined && message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.sessionToken !== undefined && message.sessionToken !== "") {
      writer.uint32(18).string(message.sessionToken);
    }
    if (message.guestToken !== undefined) {
      writer.uint32(26).string(message.guestToken);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Session {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSession();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.sessionToken = reader.string();
          break;
        case 3:
          message.guestToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Session {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      sessionToken: isSet(object.sessionToken)
        ? String(object.sessionToken)
        : "",
      guestToken: isSet(object.guestToken)
        ? String(object.guestToken)
        : undefined,
    };
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.sessionToken !== undefined &&
      (obj.sessionToken = message.sessionToken);
    message.guestToken !== undefined && (obj.guestToken = message.guestToken);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Session>, I>>(object: I): Session {
    const message = createBaseSession();
    message.userId = object.userId ?? 0;
    message.sessionToken = object.sessionToken ?? "";
    message.guestToken = object.guestToken ?? undefined;
    return message;
  },
};

function createBaseAuthStep(): AuthStep {
  return { fallbackUrl: "", canGoBack: false, step: undefined };
}

export const AuthStep = {
  encode(message: AuthStep, writer: Writer = Writer.create()): Writer {
    if (message.fallbackUrl !== undefined && message.fallbackUrl !== "") {
      writer.uint32(10).string(message.fallbackUrl);
    }
    if (message.canGoBack === true) {
      writer.uint32(16).bool(message.canGoBack);
    }
    if (message.step?.$case === "choice") {
      AuthStep_Choice.encode(
        message.step.choice,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.step?.$case === "form") {
      AuthStep_Form.encode(
        message.step.form,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.step?.$case === "session") {
      Session.encode(message.step.session, writer.uint32(42).fork()).ldelim();
    }
    if (message.step?.$case === "waiting") {
      AuthStep_Waiting.encode(
        message.step.waiting,
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthStep {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthStep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fallbackUrl = reader.string();
          break;
        case 2:
          message.canGoBack = reader.bool();
          break;
        case 3:
          message.step = {
            $case: "choice",
            choice: AuthStep_Choice.decode(reader, reader.uint32()),
          };
          break;
        case 4:
          message.step = {
            $case: "form",
            form: AuthStep_Form.decode(reader, reader.uint32()),
          };
          break;
        case 5:
          message.step = {
            $case: "session",
            session: Session.decode(reader, reader.uint32()),
          };
          break;
        case 6:
          message.step = {
            $case: "waiting",
            waiting: AuthStep_Waiting.decode(reader, reader.uint32()),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthStep {
    return {
      fallbackUrl: isSet(object.fallbackUrl) ? String(object.fallbackUrl) : "",
      canGoBack: isSet(object.canGoBack) ? Boolean(object.canGoBack) : false,
      step: isSet(object.choice)
        ? { $case: "choice", choice: AuthStep_Choice.fromJSON(object.choice) }
        : isSet(object.form)
        ? { $case: "form", form: AuthStep_Form.fromJSON(object.form) }
        : isSet(object.session)
        ? { $case: "session", session: Session.fromJSON(object.session) }
        : isSet(object.waiting)
        ? {
            $case: "waiting",
            waiting: AuthStep_Waiting.fromJSON(object.waiting),
          }
        : undefined,
    };
  },

  toJSON(message: AuthStep): unknown {
    const obj: any = {};
    message.fallbackUrl !== undefined &&
      (obj.fallbackUrl = message.fallbackUrl);
    message.canGoBack !== undefined && (obj.canGoBack = message.canGoBack);
    message.step?.$case === "choice" &&
      (obj.choice = message.step?.choice
        ? AuthStep_Choice.toJSON(message.step?.choice)
        : undefined);
    message.step?.$case === "form" &&
      (obj.form = message.step?.form
        ? AuthStep_Form.toJSON(message.step?.form)
        : undefined);
    message.step?.$case === "session" &&
      (obj.session = message.step?.session
        ? Session.toJSON(message.step?.session)
        : undefined);
    message.step?.$case === "waiting" &&
      (obj.waiting = message.step?.waiting
        ? AuthStep_Waiting.toJSON(message.step?.waiting)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthStep>, I>>(object: I): AuthStep {
    const message = createBaseAuthStep();
    message.fallbackUrl = object.fallbackUrl ?? "";
    message.canGoBack = object.canGoBack ?? false;
    if (
      object.step?.$case === "choice" &&
      object.step?.choice !== undefined &&
      object.step?.choice !== null
    ) {
      message.step = {
        $case: "choice",
        choice: AuthStep_Choice.fromPartial(object.step.choice),
      };
    }
    if (
      object.step?.$case === "form" &&
      object.step?.form !== undefined &&
      object.step?.form !== null
    ) {
      message.step = {
        $case: "form",
        form: AuthStep_Form.fromPartial(object.step.form),
      };
    }
    if (
      object.step?.$case === "session" &&
      object.step?.session !== undefined &&
      object.step?.session !== null
    ) {
      message.step = {
        $case: "session",
        session: Session.fromPartial(object.step.session),
      };
    }
    if (
      object.step?.$case === "waiting" &&
      object.step?.waiting !== undefined &&
      object.step?.waiting !== null
    ) {
      message.step = {
        $case: "waiting",
        waiting: AuthStep_Waiting.fromPartial(object.step.waiting),
      };
    }
    return message;
  },
};

function createBaseAuthStep_Choice(): AuthStep_Choice {
  return { title: "", options: [] };
}

export const AuthStep_Choice = {
  encode(message: AuthStep_Choice, writer: Writer = Writer.create()): Writer {
    if (message.title !== undefined && message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.options !== undefined && message.options.length !== 0) {
      for (const v of message.options) {
        writer.uint32(18).string(v!);
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthStep_Choice {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthStep_Choice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.options!.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthStep_Choice {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      options: Array.isArray(object?.options)
        ? object.options.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: AuthStep_Choice): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    if (message.options) {
      obj.options = message.options.map((e) => e);
    } else {
      obj.options = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthStep_Choice>, I>>(
    object: I
  ): AuthStep_Choice {
    const message = createBaseAuthStep_Choice();
    message.title = object.title ?? "";
    message.options = object.options?.map((e) => e) || [];
    return message;
  },
};

function createBaseAuthStep_Form(): AuthStep_Form {
  return { title: "", fields: [] };
}

export const AuthStep_Form = {
  encode(message: AuthStep_Form, writer: Writer = Writer.create()): Writer {
    if (message.title !== undefined && message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        AuthStep_Form_FormField.encode(v!, writer.uint32(18).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthStep_Form {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthStep_Form();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.fields!.push(
            AuthStep_Form_FormField.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthStep_Form {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      fields: Array.isArray(object?.fields)
        ? object.fields.map((e: any) => AuthStep_Form_FormField.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AuthStep_Form): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    if (message.fields) {
      obj.fields = message.fields.map((e) =>
        e ? AuthStep_Form_FormField.toJSON(e) : undefined
      );
    } else {
      obj.fields = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthStep_Form>, I>>(
    object: I
  ): AuthStep_Form {
    const message = createBaseAuthStep_Form();
    message.title = object.title ?? "";
    message.fields =
      object.fields?.map((e) => AuthStep_Form_FormField.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAuthStep_Form_FormField(): AuthStep_Form_FormField {
  return { name: "", type: "" };
}

export const AuthStep_Form_FormField = {
  encode(
    message: AuthStep_Form_FormField,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthStep_Form_FormField {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthStep_Form_FormField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthStep_Form_FormField {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? String(object.type) : "",
    };
  },

  toJSON(message: AuthStep_Form_FormField): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = message.type);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthStep_Form_FormField>, I>>(
    object: I
  ): AuthStep_Form_FormField {
    const message = createBaseAuthStep_Form_FormField();
    message.name = object.name ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseAuthStep_Waiting(): AuthStep_Waiting {
  return { title: "", description: "" };
}

export const AuthStep_Waiting = {
  encode(message: AuthStep_Waiting, writer: Writer = Writer.create()): Writer {
    if (message.title !== undefined && message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AuthStep_Waiting {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthStep_Waiting();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthStep_Waiting {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: AuthStep_Waiting): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthStep_Waiting>, I>>(
    object: I
  ): AuthStep_Waiting {
    const message = createBaseAuthStep_Waiting();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseNextStepRequest(): NextStepRequest {
  return { authId: "", step: undefined };
}

export const NextStepRequest = {
  encode(message: NextStepRequest, writer: Writer = Writer.create()): Writer {
    if (message.authId !== undefined && message.authId !== "") {
      writer.uint32(10).string(message.authId);
    }
    if (message.step?.$case === "choice") {
      NextStepRequest_Choice.encode(
        message.step.choice,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.step?.$case === "form") {
      NextStepRequest_Form.encode(
        message.step.form,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NextStepRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNextStepRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authId = reader.string();
          break;
        case 2:
          message.step = {
            $case: "choice",
            choice: NextStepRequest_Choice.decode(reader, reader.uint32()),
          };
          break;
        case 3:
          message.step = {
            $case: "form",
            form: NextStepRequest_Form.decode(reader, reader.uint32()),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NextStepRequest {
    return {
      authId: isSet(object.authId) ? String(object.authId) : "",
      step: isSet(object.choice)
        ? {
            $case: "choice",
            choice: NextStepRequest_Choice.fromJSON(object.choice),
          }
        : isSet(object.form)
        ? { $case: "form", form: NextStepRequest_Form.fromJSON(object.form) }
        : undefined,
    };
  },

  toJSON(message: NextStepRequest): unknown {
    const obj: any = {};
    message.authId !== undefined && (obj.authId = message.authId);
    message.step?.$case === "choice" &&
      (obj.choice = message.step?.choice
        ? NextStepRequest_Choice.toJSON(message.step?.choice)
        : undefined);
    message.step?.$case === "form" &&
      (obj.form = message.step?.form
        ? NextStepRequest_Form.toJSON(message.step?.form)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NextStepRequest>, I>>(
    object: I
  ): NextStepRequest {
    const message = createBaseNextStepRequest();
    message.authId = object.authId ?? "";
    if (
      object.step?.$case === "choice" &&
      object.step?.choice !== undefined &&
      object.step?.choice !== null
    ) {
      message.step = {
        $case: "choice",
        choice: NextStepRequest_Choice.fromPartial(object.step.choice),
      };
    }
    if (
      object.step?.$case === "form" &&
      object.step?.form !== undefined &&
      object.step?.form !== null
    ) {
      message.step = {
        $case: "form",
        form: NextStepRequest_Form.fromPartial(object.step.form),
      };
    }
    return message;
  },
};

function createBaseNextStepRequest_Choice(): NextStepRequest_Choice {
  return { choice: "" };
}

export const NextStepRequest_Choice = {
  encode(
    message: NextStepRequest_Choice,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.choice !== undefined && message.choice !== "") {
      writer.uint32(10).string(message.choice);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NextStepRequest_Choice {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNextStepRequest_Choice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.choice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NextStepRequest_Choice {
    return {
      choice: isSet(object.choice) ? String(object.choice) : "",
    };
  },

  toJSON(message: NextStepRequest_Choice): unknown {
    const obj: any = {};
    message.choice !== undefined && (obj.choice = message.choice);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NextStepRequest_Choice>, I>>(
    object: I
  ): NextStepRequest_Choice {
    const message = createBaseNextStepRequest_Choice();
    message.choice = object.choice ?? "";
    return message;
  },
};

function createBaseNextStepRequest_FormFields(): NextStepRequest_FormFields {
  return { field: undefined };
}

export const NextStepRequest_FormFields = {
  encode(
    message: NextStepRequest_FormFields,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.field?.$case === "bytes") {
      writer.uint32(10).bytes(message.field.bytes);
    }
    if (message.field?.$case === "string") {
      writer.uint32(18).string(message.field.string);
    }
    if (message.field?.$case === "number") {
      writer.uint32(24).int64(message.field.number);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): NextStepRequest_FormFields {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNextStepRequest_FormFields();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.field = { $case: "bytes", bytes: reader.bytes() };
          break;
        case 2:
          message.field = { $case: "string", string: reader.string() };
          break;
        case 3:
          message.field = {
            $case: "number",
            number: longToNumber(reader.int64() as Long),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NextStepRequest_FormFields {
    return {
      field: isSet(object.bytes)
        ? { $case: "bytes", bytes: bytesFromBase64(object.bytes) }
        : isSet(object.string)
        ? { $case: "string", string: String(object.string) }
        : isSet(object.number)
        ? { $case: "number", number: Number(object.number) }
        : undefined,
    };
  },

  toJSON(message: NextStepRequest_FormFields): unknown {
    const obj: any = {};
    message.field?.$case === "bytes" &&
      (obj.bytes =
        message.field?.bytes !== undefined
          ? base64FromBytes(message.field?.bytes)
          : undefined);
    message.field?.$case === "string" && (obj.string = message.field?.string);
    message.field?.$case === "number" &&
      (obj.number = Math.round(message.field?.number));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NextStepRequest_FormFields>, I>>(
    object: I
  ): NextStepRequest_FormFields {
    const message = createBaseNextStepRequest_FormFields();
    if (
      object.field?.$case === "bytes" &&
      object.field?.bytes !== undefined &&
      object.field?.bytes !== null
    ) {
      message.field = { $case: "bytes", bytes: object.field.bytes };
    }
    if (
      object.field?.$case === "string" &&
      object.field?.string !== undefined &&
      object.field?.string !== null
    ) {
      message.field = { $case: "string", string: object.field.string };
    }
    if (
      object.field?.$case === "number" &&
      object.field?.number !== undefined &&
      object.field?.number !== null
    ) {
      message.field = { $case: "number", number: object.field.number };
    }
    return message;
  },
};

function createBaseNextStepRequest_Form(): NextStepRequest_Form {
  return { fields: [] };
}

export const NextStepRequest_Form = {
  encode(
    message: NextStepRequest_Form,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.fields !== undefined && message.fields.length !== 0) {
      for (const v of message.fields) {
        NextStepRequest_FormFields.encode(
          v!,
          writer.uint32(10).fork()
        ).ldelim();
      }
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NextStepRequest_Form {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNextStepRequest_Form();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fields!.push(
            NextStepRequest_FormFields.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NextStepRequest_Form {
    return {
      fields: Array.isArray(object?.fields)
        ? object.fields.map((e: any) => NextStepRequest_FormFields.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NextStepRequest_Form): unknown {
    const obj: any = {};
    if (message.fields) {
      obj.fields = message.fields.map((e) =>
        e ? NextStepRequest_FormFields.toJSON(e) : undefined
      );
    } else {
      obj.fields = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NextStepRequest_Form>, I>>(
    object: I
  ): NextStepRequest_Form {
    const message = createBaseNextStepRequest_Form();
    message.fields =
      object.fields?.map((e) => NextStepRequest_FormFields.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseNextStepResponse(): NextStepResponse {
  return { step: undefined };
}

export const NextStepResponse = {
  encode(message: NextStepResponse, writer: Writer = Writer.create()): Writer {
    if (message.step !== undefined) {
      AuthStep.encode(message.step, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NextStepResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNextStepResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.step = AuthStep.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NextStepResponse {
    return {
      step: isSet(object.step) ? AuthStep.fromJSON(object.step) : undefined,
    };
  },

  toJSON(message: NextStepResponse): unknown {
    const obj: any = {};
    message.step !== undefined &&
      (obj.step = message.step ? AuthStep.toJSON(message.step) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NextStepResponse>, I>>(
    object: I
  ): NextStepResponse {
    const message = createBaseNextStepResponse();
    message.step =
      object.step !== undefined && object.step !== null
        ? AuthStep.fromPartial(object.step)
        : undefined;
    return message;
  },
};

function createBaseStepBackRequest(): StepBackRequest {
  return { authId: "" };
}

export const StepBackRequest = {
  encode(message: StepBackRequest, writer: Writer = Writer.create()): Writer {
    if (message.authId !== undefined && message.authId !== "") {
      writer.uint32(10).string(message.authId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StepBackRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepBackRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StepBackRequest {
    return {
      authId: isSet(object.authId) ? String(object.authId) : "",
    };
  },

  toJSON(message: StepBackRequest): unknown {
    const obj: any = {};
    message.authId !== undefined && (obj.authId = message.authId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StepBackRequest>, I>>(
    object: I
  ): StepBackRequest {
    const message = createBaseStepBackRequest();
    message.authId = object.authId ?? "";
    return message;
  },
};

function createBaseStepBackResponse(): StepBackResponse {
  return { step: undefined };
}

export const StepBackResponse = {
  encode(message: StepBackResponse, writer: Writer = Writer.create()): Writer {
    if (message.step !== undefined) {
      AuthStep.encode(message.step, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StepBackResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStepBackResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.step = AuthStep.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StepBackResponse {
    return {
      step: isSet(object.step) ? AuthStep.fromJSON(object.step) : undefined,
    };
  },

  toJSON(message: StepBackResponse): unknown {
    const obj: any = {};
    message.step !== undefined &&
      (obj.step = message.step ? AuthStep.toJSON(message.step) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StepBackResponse>, I>>(
    object: I
  ): StepBackResponse {
    const message = createBaseStepBackResponse();
    message.step =
      object.step !== undefined && object.step !== null
        ? AuthStep.fromPartial(object.step)
        : undefined;
    return message;
  },
};

function createBaseStreamStepsRequest(): StreamStepsRequest {
  return { authId: "" };
}

export const StreamStepsRequest = {
  encode(
    message: StreamStepsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.authId !== undefined && message.authId !== "") {
      writer.uint32(10).string(message.authId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamStepsRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamStepsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamStepsRequest {
    return {
      authId: isSet(object.authId) ? String(object.authId) : "",
    };
  },

  toJSON(message: StreamStepsRequest): unknown {
    const obj: any = {};
    message.authId !== undefined && (obj.authId = message.authId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamStepsRequest>, I>>(
    object: I
  ): StreamStepsRequest {
    const message = createBaseStreamStepsRequest();
    message.authId = object.authId ?? "";
    return message;
  },
};

function createBaseStreamStepsResponse(): StreamStepsResponse {
  return { step: undefined };
}

export const StreamStepsResponse = {
  encode(
    message: StreamStepsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.step !== undefined) {
      AuthStep.encode(message.step, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StreamStepsResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamStepsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.step = AuthStep.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamStepsResponse {
    return {
      step: isSet(object.step) ? AuthStep.fromJSON(object.step) : undefined,
    };
  },

  toJSON(message: StreamStepsResponse): unknown {
    const obj: any = {};
    message.step !== undefined &&
      (obj.step = message.step ? AuthStep.toJSON(message.step) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StreamStepsResponse>, I>>(
    object: I
  ): StreamStepsResponse {
    const message = createBaseStreamStepsResponse();
    message.step =
      object.step !== undefined && object.step !== null
        ? AuthStep.fromPartial(object.step)
        : undefined;
    return message;
  },
};

function createBaseFederateRequest(): FederateRequest {
  return { serverId: "" };
}

export const FederateRequest = {
  encode(message: FederateRequest, writer: Writer = Writer.create()): Writer {
    if (message.serverId !== undefined && message.serverId !== "") {
      writer.uint32(10).string(message.serverId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FederateRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFederateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FederateRequest {
    return {
      serverId: isSet(object.serverId) ? String(object.serverId) : "",
    };
  },

  toJSON(message: FederateRequest): unknown {
    const obj: any = {};
    message.serverId !== undefined && (obj.serverId = message.serverId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FederateRequest>, I>>(
    object: I
  ): FederateRequest {
    const message = createBaseFederateRequest();
    message.serverId = object.serverId ?? "";
    return message;
  },
};

function createBaseFederateResponse(): FederateResponse {
  return { token: undefined };
}

export const FederateResponse = {
  encode(message: FederateResponse, writer: Writer = Writer.create()): Writer {
    if (message.token !== undefined) {
      Token.encode(message.token, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FederateResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFederateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = Token.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FederateResponse {
    return {
      token: isSet(object.token) ? Token.fromJSON(object.token) : undefined,
    };
  },

  toJSON(message: FederateResponse): unknown {
    const obj: any = {};
    message.token !== undefined &&
      (obj.token = message.token ? Token.toJSON(message.token) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FederateResponse>, I>>(
    object: I
  ): FederateResponse {
    const message = createBaseFederateResponse();
    message.token =
      object.token !== undefined && object.token !== null
        ? Token.fromPartial(object.token)
        : undefined;
    return message;
  },
};

function createBaseKeyRequest(): KeyRequest {
  return {};
}

export const KeyRequest = {
  encode(_: KeyRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): KeyRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyRequest();
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

  fromJSON(_: any): KeyRequest {
    return {};
  },

  toJSON(_: KeyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeyRequest>, I>>(_: I): KeyRequest {
    const message = createBaseKeyRequest();
    return message;
  },
};

function createBaseKeyResponse(): KeyResponse {
  return { key: new Uint8Array() };
}

export const KeyResponse = {
  encode(message: KeyResponse, writer: Writer = Writer.create()): Writer {
    if (message.key !== undefined && message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): KeyResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeyResponse {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
    };
  },

  toJSON(message: KeyResponse): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeyResponse>, I>>(
    object: I
  ): KeyResponse {
    const message = createBaseKeyResponse();
    message.key = object.key ?? new Uint8Array();
    return message;
  },
};

function createBaseLoginFederatedRequest(): LoginFederatedRequest {
  return { authToken: undefined, serverId: "" };
}

export const LoginFederatedRequest = {
  encode(
    message: LoginFederatedRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.authToken !== undefined) {
      Token.encode(message.authToken, writer.uint32(10).fork()).ldelim();
    }
    if (message.serverId !== undefined && message.serverId !== "") {
      writer.uint32(18).string(message.serverId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LoginFederatedRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginFederatedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authToken = Token.decode(reader, reader.uint32());
          break;
        case 2:
          message.serverId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginFederatedRequest {
    return {
      authToken: isSet(object.authToken)
        ? Token.fromJSON(object.authToken)
        : undefined,
      serverId: isSet(object.serverId) ? String(object.serverId) : "",
    };
  },

  toJSON(message: LoginFederatedRequest): unknown {
    const obj: any = {};
    message.authToken !== undefined &&
      (obj.authToken = message.authToken
        ? Token.toJSON(message.authToken)
        : undefined);
    message.serverId !== undefined && (obj.serverId = message.serverId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoginFederatedRequest>, I>>(
    object: I
  ): LoginFederatedRequest {
    const message = createBaseLoginFederatedRequest();
    message.authToken =
      object.authToken !== undefined && object.authToken !== null
        ? Token.fromPartial(object.authToken)
        : undefined;
    message.serverId = object.serverId ?? "";
    return message;
  },
};

function createBaseLoginFederatedResponse(): LoginFederatedResponse {
  return { session: undefined };
}

export const LoginFederatedResponse = {
  encode(
    message: LoginFederatedResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.session !== undefined) {
      Session.encode(message.session, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): LoginFederatedResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginFederatedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session = Session.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginFederatedResponse {
    return {
      session: isSet(object.session)
        ? Session.fromJSON(object.session)
        : undefined,
    };
  },

  toJSON(message: LoginFederatedResponse): unknown {
    const obj: any = {};
    message.session !== undefined &&
      (obj.session = message.session
        ? Session.toJSON(message.session)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoginFederatedResponse>, I>>(
    object: I
  ): LoginFederatedResponse {
    const message = createBaseLoginFederatedResponse();
    message.session =
      object.session !== undefined && object.session !== null
        ? Session.fromPartial(object.session)
        : undefined;
    return message;
  },
};

function createBaseTokenData(): TokenData {
  return { userId: 0, serverId: "", username: "", avatar: undefined };
}

export const TokenData = {
  encode(message: TokenData, writer: Writer = Writer.create()): Writer {
    if (message.userId !== undefined && message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    if (message.serverId !== undefined && message.serverId !== "") {
      writer.uint32(18).string(message.serverId);
    }
    if (message.username !== undefined && message.username !== "") {
      writer.uint32(26).string(message.username);
    }
    if (message.avatar !== undefined) {
      writer.uint32(34).string(message.avatar);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TokenData {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.serverId = reader.string();
          break;
        case 3:
          message.username = reader.string();
          break;
        case 4:
          message.avatar = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TokenData {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
      serverId: isSet(object.serverId) ? String(object.serverId) : "",
      username: isSet(object.username) ? String(object.username) : "",
      avatar: isSet(object.avatar) ? String(object.avatar) : undefined,
    };
  },

  toJSON(message: TokenData): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    message.serverId !== undefined && (obj.serverId = message.serverId);
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TokenData>, I>>(
    object: I
  ): TokenData {
    const message = createBaseTokenData();
    message.userId = object.userId ?? 0;
    message.serverId = object.serverId ?? "";
    message.username = object.username ?? "";
    message.avatar = object.avatar ?? undefined;
    return message;
  },
};

function createBaseCheckLoggedInRequest(): CheckLoggedInRequest {
  return {};
}

export const CheckLoggedInRequest = {
  encode(_: CheckLoggedInRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CheckLoggedInRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckLoggedInRequest();
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

  fromJSON(_: any): CheckLoggedInRequest {
    return {};
  },

  toJSON(_: CheckLoggedInRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CheckLoggedInRequest>, I>>(
    _: I
  ): CheckLoggedInRequest {
    const message = createBaseCheckLoggedInRequest();
    return message;
  },
};

function createBaseCheckLoggedInResponse(): CheckLoggedInResponse {
  return {};
}

export const CheckLoggedInResponse = {
  encode(_: CheckLoggedInResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CheckLoggedInResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckLoggedInResponse();
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

  fromJSON(_: any): CheckLoggedInResponse {
    return {};
  },

  toJSON(_: CheckLoggedInResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CheckLoggedInResponse>, I>>(
    _: I
  ): CheckLoggedInResponse {
    const message = createBaseCheckLoggedInResponse();
    return message;
  },
};

/** The service containing authorization/entication methods. */
export const AuthServiceDefinition = {
  name: "AuthService",
  fullName: "protocol.auth.v1.AuthService",
  methods: {
    /**
     * Federate with a foreignserver, obtaining a token
     * you can use to call LoginFederated on it.
     */
    federate: {
      name: "Federate",
      requestType: FederateRequest,
      requestStream: false,
      responseType: FederateResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Present a token to a foreignserver from a Federate call
     * on your homeserver in order to login.
     */
    loginFederated: {
      name: "LoginFederated",
      requestType: LoginFederatedRequest,
      requestStream: false,
      responseType: LoginFederatedResponse,
      responseStream: false,
      options: {},
    },
    /** Returns the public key of this server. */
    key: {
      name: "Key",
      requestType: KeyRequest,
      requestStream: false,
      responseType: KeyResponse,
      responseStream: false,
      options: {},
    },
    /** Begins an authentication session. */
    beginAuth: {
      name: "BeginAuth",
      requestType: BeginAuthRequest,
      requestStream: false,
      responseType: BeginAuthResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Goes to the next step of the authentication session,
     * possibly presenting user input.
     */
    nextStep: {
      name: "NextStep",
      requestType: NextStepRequest,
      requestStream: false,
      responseType: NextStepResponse,
      responseStream: false,
      options: {},
    },
    /** Goes to the previous step of the authentication session if possible. */
    stepBack: {
      name: "StepBack",
      requestType: StepBackRequest,
      requestStream: false,
      responseType: StepBackResponse,
      responseStream: false,
      options: {},
    },
    /** Consume the steps of an authentication session as a stream. */
    streamSteps: {
      name: "StreamSteps",
      requestType: StreamStepsRequest,
      requestStream: false,
      responseType: StreamStepsResponse,
      responseStream: true,
      options: {},
    },
    /** Check whether or not you're logged in and the session is valid. */
    checkLoggedIn: {
      name: "CheckLoggedIn",
      requestType: CheckLoggedInRequest,
      requestStream: false,
      responseType: CheckLoggedInResponse,
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
