/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Empty, ImageInfo, Metadata } from "../../harmonytypes/v1/types";
import { Emote } from "../../emote/v1/types";

export const protobufPackage = "protocol.chat.v1";

/** Overrides provide a way to override the name and avatar of a message. */
export interface Overrides {
  /** The overridden username. */
  username?: string | undefined;
  /**
   * The overridden avatar.
   *
   * This can be a file ID or an external image URL.
   */
  avatar?: string | undefined;
  /** A custom reason in case the builtin ones don't fit. */
  userDefined: string | undefined;
  /** The override occured because of a webhook. */
  webhook: Empty | undefined;
  /** Plurality, not system as in computer. */
  systemPlurality: Empty | undefined;
  /**
   * The override occured because it was made by the server.
   *
   * Servers should reject messages sent by users with this override.
   */
  systemMessage: Empty | undefined;
  /** The override occured because of bridging. */
  bridge: Empty | undefined;
}

/** The payload sent to the bot when an action is triggered. */
export interface ActionPayload {
  /** Payload for a button. */
  button: ActionPayload_Button | undefined;
  /** Payload for a dropdown. */
  dropdown: ActionPayload_Dropdown | undefined;
  /** Payload for a text input. */
  input: ActionPayload_Input | undefined;
}

/** The payload data for a button action. */
export interface ActionPayload_Button {
  /** The data from the Button action. */
  data: Uint8Array;
}

/** The payload for a dropdown action. */
export interface ActionPayload_Dropdown {
  /** The user choice from the dropdown. */
  choice: Uint8Array;
}

/** The payload for a text input action. */
export interface ActionPayload_Input {
  /** The user input. */
  input: string;
  /** The bot-provided data. */
  data: Uint8Array;
}

/** Actions are interactive elements that can exist within an embed. */
export interface Action {
  /** Type of the action. */
  actionType: Action_Type;
  /** Button action. */
  button: Action_Button | undefined;
  /** Dropdown action. */
  dropdown: Action_Dropdown | undefined;
  /** Input action. */
  input: Action_Input | undefined;
}

/**
 * The action type. This is primarily used to change the look of the action to
 * the user (example: Destructive actions will have a red background).
 */
export enum Action_Type {
  /** TYPE_NORMAL_UNSPECIFIED - A normal action. */
  TYPE_NORMAL_UNSPECIFIED = 0,
  /** TYPE_PRIMARY - A primary action. */
  TYPE_PRIMARY = 1,
  /** TYPE_DESTRUCTIVE - A destructive / dangerous action. */
  TYPE_DESTRUCTIVE = 2,
  UNRECOGNIZED = -1,
}

export function action_TypeFromJSON(object: any): Action_Type {
  switch (object) {
    case 0:
    case "TYPE_NORMAL_UNSPECIFIED":
      return Action_Type.TYPE_NORMAL_UNSPECIFIED;
    case 1:
    case "TYPE_PRIMARY":
      return Action_Type.TYPE_PRIMARY;
    case 2:
    case "TYPE_DESTRUCTIVE":
      return Action_Type.TYPE_DESTRUCTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Action_Type.UNRECOGNIZED;
  }
}

export function action_TypeToJSON(object: Action_Type): string {
  switch (object) {
    case Action_Type.TYPE_NORMAL_UNSPECIFIED:
      return "TYPE_NORMAL_UNSPECIFIED";
    case Action_Type.TYPE_PRIMARY:
      return "TYPE_PRIMARY";
    case Action_Type.TYPE_DESTRUCTIVE:
      return "TYPE_DESTRUCTIVE";
    default:
      return "UNKNOWN";
  }
}

/** A button that users can click on to trigger an action. */
export interface Action_Button {
  /** The text to show on the button. */
  text: string;
  /** Action data, which should be used in the call to perform the action. */
  data: Uint8Array;
  /**
   * An external URL that the button links to.
   *
   * This makes it so that tapping this button will open said URL instead
   * of triggering the action.
   */
  url?: string | undefined;
}

/** A dropdown menu that users can click on to trigger an action. */
export interface Action_Dropdown {
  /** The text describing the dropdown. */
  label: string;
  /** The options in the dropdown. */
  entries: Action_Dropdown_Entry[];
}

/** An entry in the dropdown. */
export interface Action_Dropdown_Entry {
  /** The dropdown's UI label. */
  label: string;
  /** The dropdown's associated data. */
  data: Uint8Array;
}

/** A text input that users can type in to trigger an action. */
export interface Action_Input {
  /** The label describing the input. */
  label: string;
  /** Whether this text input should be a multiline one or not. */
  multiline: boolean;
  /** Contextual data allowing the bot to discern what the user input is for. */
  data: Uint8Array;
}

/** Object representing a message embed. */
export interface Embed {
  /** Embed heading for the header. */
  header?: Embed_EmbedHeading | undefined;
  /** Title of this embed. */
  title: string;
  /** Body text of this embed. */
  body?: FormattedText | undefined;
  /** Fields of this embed. */
  fields: Embed_EmbedField[];
  /** Embed heading for the footer. */
  footer?: Embed_EmbedHeading | undefined;
  /** Color of this embed. */
  color?: number | undefined;
}

/** Object representing an embed heading. */
export interface Embed_EmbedHeading {
  /** Text of the heading. */
  text: string;
  /** Subtext of the heading. */
  subtext?: string | undefined;
  /**
   * URL of the heading.
   *
   * If this is provided, clients should make it so that
   * interacting with the heading opens this URL, for example
   * clicking on it.
   */
  url?: string | undefined;
  /** Icon of the heading. */
  icon?: string | undefined;
}

/** Object representing an embed field. */
export interface Embed_EmbedField {
  /** How to present this field. */
  presentation: Embed_EmbedField_Presentation;
  /** Title of this field. */
  title: string;
  /** Subtitle of this field. */
  subtitle?: string | undefined;
  /** Body text of this field (eg. a description). */
  body?: FormattedText | undefined;
  /** An image to display on this field. */
  image?: Embed_EmbedField_Image | undefined;
  /** Actions to show on this field. */
  actions: Action[];
}

/** Type representing how to present an embed field. */
export enum Embed_EmbedField_Presentation {
  /** PRESENTATION_DATA_UNSPECIFIED - Show the field as data. */
  PRESENTATION_DATA_UNSPECIFIED = 0,
  /** PRESENTATION_CAPTIONED_IMAGE - Show the field as a captioned image. */
  PRESENTATION_CAPTIONED_IMAGE = 1,
  /** PRESENTATION_ROW - Show the field as a row. */
  PRESENTATION_ROW = 2,
  UNRECOGNIZED = -1,
}

export function embed_EmbedField_PresentationFromJSON(
  object: any
): Embed_EmbedField_Presentation {
  switch (object) {
    case 0:
    case "PRESENTATION_DATA_UNSPECIFIED":
      return Embed_EmbedField_Presentation.PRESENTATION_DATA_UNSPECIFIED;
    case 1:
    case "PRESENTATION_CAPTIONED_IMAGE":
      return Embed_EmbedField_Presentation.PRESENTATION_CAPTIONED_IMAGE;
    case 2:
    case "PRESENTATION_ROW":
      return Embed_EmbedField_Presentation.PRESENTATION_ROW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Embed_EmbedField_Presentation.UNRECOGNIZED;
  }
}

export function embed_EmbedField_PresentationToJSON(
  object: Embed_EmbedField_Presentation
): string {
  switch (object) {
    case Embed_EmbedField_Presentation.PRESENTATION_DATA_UNSPECIFIED:
      return "PRESENTATION_DATA_UNSPECIFIED";
    case Embed_EmbedField_Presentation.PRESENTATION_CAPTIONED_IMAGE:
      return "PRESENTATION_CAPTIONED_IMAGE";
    case Embed_EmbedField_Presentation.PRESENTATION_ROW:
      return "PRESENTATION_ROW";
    default:
      return "UNKNOWN";
  }
}

/**
 * Data for displaying an image in embed.
 *
 * Servers should fill in the `width` and `height` fields.
 */
export interface Embed_EmbedField_Image {
  /** File ID or external image URL of an image. */
  id: string;
  /** Image information. */
  info: ImageInfo | undefined;
}

/** Object representing a generic message attachment. */
export interface Attachment {
  /** File ID of this attachment. */
  id: string;
  /** Filename of this attachment. */
  name: string;
  /** Mimetype of this attachment. */
  mimetype: string;
  /** File size of this attachment, in bytes. */
  size: number;
  /** Image info. */
  image: ImageInfo | undefined;
}

/**
 * Object representing a message's content other than text.
 *
 * `InviteRejected`, `InviteAccepted` and `RoomUpgradedToGuild`, can only
 * be used by servers themselves. Servers should reject messages with this
 * content if they are sent by a user.
 *
 * Text should be displayed before embeds, and embeds should be displayed before attachments.
 */
export interface Content {
  /** Text content of the message. */
  text: string;
  /** Text formatting of the text content. */
  textFormats: Format[];
  /** Embed content. */
  embeds: Embed[];
  /** Attachment content. */
  attachments: Attachment[];
  /** A user rejected an invite. */
  inviteRejected: Content_InviteRejected | undefined;
  /** A user accepted an invite. */
  inviteAccepted: Content_InviteAccepted | undefined;
  /** A user upgraded a guild from "room" to "normal". */
  roomUpgradedToGuild: Content_RoomUpgradedToGuild | undefined;
}

/** Represents a user rejecting an invite. */
export interface Content_InviteRejected {
  /** User ID of the invitee. */
  inviteeId: number;
  /** User ID of the inviter. */
  inviterId: number;
}

/** Represents a user accepting an invite. */
export interface Content_InviteAccepted {
  /** User ID of the invitee. */
  inviteeId: number;
  /** User ID of the inviter. */
  inviterId: number;
}

/** Represents a guild upgrade from "room" to "normal". */
export interface Content_RoomUpgradedToGuild {
  /** User ID of the user that upgraded the guild. */
  upgradedBy: number;
}

/** Object representing a reaction. */
export interface Reaction {
  /**
   * Emote data for this reaction.
   *
   * - Emote's image ID is used as an identifier for unique reactions.
   * - Emotes with the same names should be "deduplicated" by a client,
   * by suffixing their names with `~1`, `~2` and so on.
   */
  emote: Emote | undefined;
  /** How many times this reaction has been used. */
  count: number;
}

/** A format for text. */
export interface Format {
  /** Where the format begins to apply to. */
  start: number;
  /** How many characters the format is. */
  length: number;
  /** A text format for bold text. */
  bold: Format_Bold | undefined;
  /** A text format for italic text. */
  italic: Format_Italic | undefined;
  /** A text format for underline text. */
  underline: Format_Underline | undefined;
  /** A text format for monospace text. */
  monospace: Format_Monospace | undefined;
  /** A text format for superscript text. */
  superscript: Format_Superscript | undefined;
  /** A text format for subscript text. */
  subscript: Format_Subscript | undefined;
  /** A text format for a codeblock. */
  codeBlock: Format_CodeBlock | undefined;
  /** A text format for a user mention. */
  userMention: Format_UserMention | undefined;
  /** A text format for a role mention. */
  roleMention: Format_RoleMention | undefined;
  /** A text format for a channel mention. */
  channelMention: Format_ChannelMention | undefined;
  /** A text format for a guild mention. */
  guildMention: Format_GuildMention | undefined;
  /** A text format for an emoji. */
  emoji: Format_Emoji | undefined;
  /** A text format for coloured text. */
  color: Format_Color | undefined;
  /** A text format for localization. */
  localization: Format_Localization | undefined;
}

/** Bold text. */
export interface Format_Bold {}

/** Italic text. */
export interface Format_Italic {}

/** Underlined text. */
export interface Format_Underline {}

/** Monospace text. */
export interface Format_Monospace {}

/** Superscript text. */
export interface Format_Superscript {}

/** Subscript text. */
export interface Format_Subscript {}

/**
 * A larger codeblock, with a programming language specified.
 *
 * Clients should ideally not bound the width of codeblock messages,
 * possibly scrolling the codeblock horizontally separately from the
 * rest of the message.
 */
export interface Format_CodeBlock {
  /** Programming language of the code block. */
  language: string;
}

/** Mention of a user (on the current homeserver). */
export interface Format_UserMention {
  /** User ID of the user being mentioned. */
  userId: number;
}

/** Mention of a role (on the current guild). */
export interface Format_RoleMention {
  /** The role being mentioned. */
  roleId: number;
}

/** Mention of a channel (on the current guild). */
export interface Format_ChannelMention {
  /** The channel being mentioned. */
  channelId: number;
}

/** Mention of a guild. */
export interface Format_GuildMention {
  /** The guild being mentioned. */
  guildId: number;
  /** Which homeserver it belongs to. */
  homeserver: string;
}

/** An emoji. */
export interface Format_Emoji {
  /** The emote data of the emoji. */
  emote: Emote | undefined;
}

/** Colour modification. */
export interface Format_Color {
  /** The kind of colour modification to apply. */
  kind: Format_Color_Kind;
}

/** The kind of colour modification to apply. */
export enum Format_Color_Kind {
  /** KIND_DIM_UNSPECIFIED - Dimmed colour. */
  KIND_DIM_UNSPECIFIED = 0,
  /** KIND_BRIGHT - Brightened colour. */
  KIND_BRIGHT = 1,
  /** KIND_NEGATIVE - Negative colour (usually red). */
  KIND_NEGATIVE = 2,
  /** KIND_POSITIVE - Positive colour (usually green). */
  KIND_POSITIVE = 3,
  /** KIND_INFO - Informational colour (usually blue). */
  KIND_INFO = 4,
  /** KIND_WARNING - Warning colour (usually yellow-orange). */
  KIND_WARNING = 5,
  UNRECOGNIZED = -1,
}

export function format_Color_KindFromJSON(object: any): Format_Color_Kind {
  switch (object) {
    case 0:
    case "KIND_DIM_UNSPECIFIED":
      return Format_Color_Kind.KIND_DIM_UNSPECIFIED;
    case 1:
    case "KIND_BRIGHT":
      return Format_Color_Kind.KIND_BRIGHT;
    case 2:
    case "KIND_NEGATIVE":
      return Format_Color_Kind.KIND_NEGATIVE;
    case 3:
    case "KIND_POSITIVE":
      return Format_Color_Kind.KIND_POSITIVE;
    case 4:
    case "KIND_INFO":
      return Format_Color_Kind.KIND_INFO;
    case 5:
    case "KIND_WARNING":
      return Format_Color_Kind.KIND_WARNING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Format_Color_Kind.UNRECOGNIZED;
  }
}

export function format_Color_KindToJSON(object: Format_Color_Kind): string {
  switch (object) {
    case Format_Color_Kind.KIND_DIM_UNSPECIFIED:
      return "KIND_DIM_UNSPECIFIED";
    case Format_Color_Kind.KIND_BRIGHT:
      return "KIND_BRIGHT";
    case Format_Color_Kind.KIND_NEGATIVE:
      return "KIND_NEGATIVE";
    case Format_Color_Kind.KIND_POSITIVE:
      return "KIND_POSITIVE";
    case Format_Color_Kind.KIND_INFO:
      return "KIND_INFO";
    case Format_Color_Kind.KIND_WARNING:
      return "KIND_WARNING";
    default:
      return "UNKNOWN";
  }
}

/**
 * Replace a part of the text with the text matching the i18n code.
 * If i18n code was not found, keep the original text.
 */
export interface Format_Localization {
  /** i18n code for the text. */
  i18nCode: string;
}

/** Formatted text. */
export interface FormattedText {
  /** The textual content of a message. */
  text: string;
  /** The formats for a message. */
  format: Format[];
}

/** Object representing a message without the ID part. */
export interface Message {
  /** Metadata of this message. */
  metadata?: Metadata | undefined;
  /** Overrides of this message. */
  overrides: Overrides | undefined;
  /** User ID of the user who sent this message. */
  authorId: number;
  /** When this message was created, in seconds since unix epoch. */
  createdAt: number;
  /** The most recent time this message was edited, in seconds since unix epoch. */
  editedAt?: number | undefined;
  /** The message this message is a reply to. */
  inReplyTo?: number | undefined;
  /** The content of the message. */
  content: Content | undefined;
  /** The reactions of the message. */
  reactions: Reaction[];
}

/** Object representing a message with it's ID. */
export interface MessageWithId {
  /** ID of the message. */
  messageId: number;
  /** The message data. */
  message: Message | undefined;
}

/** Used in the `GetChannelMessages` endpoint. */
export interface GetChannelMessagesRequest {
  /** Guild ID of the guild that has the channel. */
  guildId: number;
  /** Channel ID of the channel to get messages from. */
  channelId: number;
  /**
   * The ID of the message that will be used as an "anchor" point to figure out
   * where to get the messages.
   * If not specified, the `direction` will be ignored and the newest messages
   * will be returned.
   */
  messageId?: number | undefined;
  /**
   * On which direction to get the messages.
   *
   * - By default, it is "before", which means you will get messages before the
   * `message_id` message.
   * - If it is "around", you will get the messages around the `message_id`
   * message. This will include the `message_id` message itself, as the middle
   * item of the list returned.
   * - If it is "after", you will get the messages after the `message_id`
   * message.
   */
  direction?: GetChannelMessagesRequest_Direction | undefined;
  /**
   * How many messages to get.
   *
   * - If `0`, a recommended message count to return is 25. If the direction is
   * "around", the recommended value is 12.
   * - If the direction to get the messages is "around", this count will not be
   * the *total* count of messages to return, but instead the count of messages
   * to return *for each direction*, before and after.
   * - Servers should enforce their own maximum limit, and clamp this value to
   * the limit.
   */
  count?: number | undefined;
}

/** The direction relative to the `message_id` message to get messages from. */
export enum GetChannelMessagesRequest_Direction {
  /** DIRECTION_BEFORE_UNSPECIFIED - Get messages before the anchor. */
  DIRECTION_BEFORE_UNSPECIFIED = 0,
  /** DIRECTION_AROUND - Get messages around the anchor, including the anchor. */
  DIRECTION_AROUND = 1,
  /** DIRECTION_AFTER - Get messages after the anchor. */
  DIRECTION_AFTER = 2,
  UNRECOGNIZED = -1,
}

export function getChannelMessagesRequest_DirectionFromJSON(
  object: any
): GetChannelMessagesRequest_Direction {
  switch (object) {
    case 0:
    case "DIRECTION_BEFORE_UNSPECIFIED":
      return GetChannelMessagesRequest_Direction.DIRECTION_BEFORE_UNSPECIFIED;
    case 1:
    case "DIRECTION_AROUND":
      return GetChannelMessagesRequest_Direction.DIRECTION_AROUND;
    case 2:
    case "DIRECTION_AFTER":
      return GetChannelMessagesRequest_Direction.DIRECTION_AFTER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GetChannelMessagesRequest_Direction.UNRECOGNIZED;
  }
}

export function getChannelMessagesRequest_DirectionToJSON(
  object: GetChannelMessagesRequest_Direction
): string {
  switch (object) {
    case GetChannelMessagesRequest_Direction.DIRECTION_BEFORE_UNSPECIFIED:
      return "DIRECTION_BEFORE_UNSPECIFIED";
    case GetChannelMessagesRequest_Direction.DIRECTION_AROUND:
      return "DIRECTION_AROUND";
    case GetChannelMessagesRequest_Direction.DIRECTION_AFTER:
      return "DIRECTION_AFTER";
    default:
      return "UNKNOWN";
  }
}

/** Used in the `GetChannelMessages` endpoint. */
export interface GetChannelMessagesResponse {
  /** Has reached the top (first message) of the message history. */
  reachedTop: boolean;
  /** Has reached the bottom (last message) of the message history. */
  reachedBottom: boolean;
  /** The messages requested. */
  messages: MessageWithId[];
}

/** Used in the `GetMessage` endpoint. */
export interface GetMessageRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel where the message is. */
  channelId: number;
  /** Message ID of the message you want to get. */
  messageId: number;
}

/** Used in the `GetMessage` endpoint. */
export interface GetMessageResponse {
  /** The message requested. */
  message: Message | undefined;
}

/** Used in the `DeleteMessage` endpoint. */
export interface DeleteMessageRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel where the message is. */
  channelId: number;
  /** Message ID of the message you want to delete. */
  messageId: number;
}

/** Used in the `DeleteMessage` endpoint. */
export interface DeleteMessageResponse {}

/** Used in the `TriggerAction` endpoint. */
export interface TriggerActionRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel where the message is. */
  channelId: number;
  /** Message ID of the message you want to trigger an action in. */
  messageId: number;
  /** Payload of action data. */
  payload: ActionPayload | undefined;
}

/** Used in the `TriggerAction` endpoint. */
export interface TriggerActionResponse {}

/** Used in the `SendMessage` endpoint. */
export interface SendMessageRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel you want to send a message in. */
  channelId: number;
  /** Content of the new message. */
  content: SendMessageRequest_Content | undefined;
  /**
   * Echo ID of the new message. This can be used by clients to
   * determine whether a message has been broadcasted properly
   * to other clients. Note that this does not mean the broadcast
   * reached other clients.
   */
  echoId?: number | undefined;
  /** The overrides of this new message. */
  overrides?: Overrides | undefined;
  /** The message this new message is a reply to. */
  inReplyTo?: number | undefined;
  /** The metadata of this new message. */
  metadata?: Metadata | undefined;
}

/** Information a user can add to a image attachment. */
export interface SendMessageRequest_ImageInfo {
  /** The image's caption. */
  caption?: string | undefined;
  /**
   * Whether to use the original image, instead of compressing the image.
   *
   * Compression can be forced by servers, so this option may not work on
   * every homeserver.
   */
  useOriginal: boolean;
}

/** Attachment info that can be sent by a user. */
export interface SendMessageRequest_Attachment {
  /** The file ID of the attachment. */
  id: string;
  /** Name of the attachment. */
  name: string;
  /** Image info. */
  image: SendMessageRequest_ImageInfo | undefined;
}

/** Content that can be sent by a user. */
export interface SendMessageRequest_Content {
  /**
   * Text content of the message to be sent.
   *
   * If this is empty, then `extra` must be specified.
   */
  text: string;
  /** Text formats for the text content. */
  textFormats: Format[];
  /** Attachment content. */
  attachments: SendMessageRequest_Content_Attachments | undefined;
  /** Embed content. */
  embeds: SendMessageRequest_Content_Embeds | undefined;
}

/** Attachment content. */
export interface SendMessageRequest_Content_Attachments {
  /** Attachments. */
  attachments: SendMessageRequest_Attachment[];
}

/** Embed content. */
export interface SendMessageRequest_Content_Embeds {
  /** Embeds. */
  embeds: Embed[];
}

/** Used in the `SendMessage` endpoint. */
export interface SendMessageResponse {
  /** Message ID of the message sent. */
  messageId: number;
}

/** Used in the `UpdateMessageText` endpoint. */
export interface UpdateMessageTextRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel where the message is. */
  channelId: number;
  /** Message ID of the message you want to edit the text of. */
  messageId: number;
  /** New content for this message. */
  newContent: FormattedText | undefined;
}

/** Used in the `UpdateMessageText` endpoint. */
export interface UpdateMessageTextResponse {}

/** Used in the `PinMessage` endpoint. */
export interface PinMessageRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel where the message is. */
  channelId: number;
  /** Message ID of the message we want to pin. */
  messageId: number;
}

/** Used in the `UnpinMessage` endpoint. */
export interface PinMessageResponse {}

/** Used in the `UnpinMessage` endpoint. */
export interface UnpinMessageRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel where the message is. */
  channelId: number;
  /** Message ID of the message we want to unpin. */
  messageId: number;
}

/** Used in the `UnpinMessage` endpoint. */
export interface UnpinMessageResponse {}

/** Used in the `GetPinnedMessages` endpoint. */
export interface GetPinnedMessagesRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel we want to get pins of. */
  channelId: number;
}

/** Used in the `GetPinnedMessages` endpoint. */
export interface GetPinnedMessagesResponse {
  /** The IDs of the pinned messages. */
  pinnedMessageIds: number[];
}

/** Used in `AddReaction` endpoint. */
export interface AddReactionRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel where the message is. */
  channelId: number;
  /** Message ID of the message we want to add a reaction to. */
  messageId: number;
  /** The emote we want to react with. */
  emote: Emote | undefined;
}

/** Used in `AddReaction` endpoint. */
export interface AddReactionResponse {}

/** Used in `RemoveReaction` endpoint. */
export interface RemoveReactionRequest {
  /** Guild ID of the guild where the channel is. */
  guildId: number;
  /** Channel ID of the channel where the message is. */
  channelId: number;
  /** Message ID of the message we want to remove a reaction. */
  messageId: number;
  /** The emote we want to remove the react of. */
  emote: Emote | undefined;
}

/** Used in `RemoveReaction` endpoint. */
export interface RemoveReactionResponse {}

function createBaseOverrides(): Overrides {
  return {
    username: undefined,
    avatar: undefined,
    userDefined: undefined,
    webhook: undefined,
    systemPlurality: undefined,
    systemMessage: undefined,
    bridge: undefined,
  };
}

export const Overrides = {
  encode(message: Overrides, writer: Writer = Writer.create()): Writer {
    if (message.username !== undefined) {
      writer.uint32(10).string(message.username);
    }
    if (message.avatar !== undefined) {
      writer.uint32(18).string(message.avatar);
    }
    if (message.userDefined !== undefined) {
      writer.uint32(26).string(message.userDefined);
    }
    if (message.webhook !== undefined) {
      Empty.encode(message.webhook, writer.uint32(34).fork()).ldelim();
    }
    if (message.systemPlurality !== undefined) {
      Empty.encode(message.systemPlurality, writer.uint32(42).fork()).ldelim();
    }
    if (message.systemMessage !== undefined) {
      Empty.encode(message.systemMessage, writer.uint32(50).fork()).ldelim();
    }
    if (message.bridge !== undefined) {
      Empty.encode(message.bridge, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Overrides {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOverrides();
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
          message.userDefined = reader.string();
          break;
        case 4:
          message.webhook = Empty.decode(reader, reader.uint32());
          break;
        case 5:
          message.systemPlurality = Empty.decode(reader, reader.uint32());
          break;
        case 6:
          message.systemMessage = Empty.decode(reader, reader.uint32());
          break;
        case 7:
          message.bridge = Empty.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Overrides {
    return {
      username: isSet(object.username) ? String(object.username) : undefined,
      avatar: isSet(object.avatar) ? String(object.avatar) : undefined,
      userDefined: isSet(object.userDefined)
        ? String(object.userDefined)
        : undefined,
      webhook: isSet(object.webhook)
        ? Empty.fromJSON(object.webhook)
        : undefined,
      systemPlurality: isSet(object.systemPlurality)
        ? Empty.fromJSON(object.systemPlurality)
        : undefined,
      systemMessage: isSet(object.systemMessage)
        ? Empty.fromJSON(object.systemMessage)
        : undefined,
      bridge: isSet(object.bridge) ? Empty.fromJSON(object.bridge) : undefined,
    };
  },

  toJSON(message: Overrides): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    message.userDefined !== undefined &&
      (obj.userDefined = message.userDefined);
    message.webhook !== undefined &&
      (obj.webhook = message.webhook
        ? Empty.toJSON(message.webhook)
        : undefined);
    message.systemPlurality !== undefined &&
      (obj.systemPlurality = message.systemPlurality
        ? Empty.toJSON(message.systemPlurality)
        : undefined);
    message.systemMessage !== undefined &&
      (obj.systemMessage = message.systemMessage
        ? Empty.toJSON(message.systemMessage)
        : undefined);
    message.bridge !== undefined &&
      (obj.bridge = message.bridge ? Empty.toJSON(message.bridge) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Overrides>, I>>(
    object: I
  ): Overrides {
    const message = createBaseOverrides();
    message.username = object.username ?? undefined;
    message.avatar = object.avatar ?? undefined;
    message.userDefined = object.userDefined ?? undefined;
    message.webhook =
      object.webhook !== undefined && object.webhook !== null
        ? Empty.fromPartial(object.webhook)
        : undefined;
    message.systemPlurality =
      object.systemPlurality !== undefined && object.systemPlurality !== null
        ? Empty.fromPartial(object.systemPlurality)
        : undefined;
    message.systemMessage =
      object.systemMessage !== undefined && object.systemMessage !== null
        ? Empty.fromPartial(object.systemMessage)
        : undefined;
    message.bridge =
      object.bridge !== undefined && object.bridge !== null
        ? Empty.fromPartial(object.bridge)
        : undefined;
    return message;
  },
};

function createBaseActionPayload(): ActionPayload {
  return { button: undefined, dropdown: undefined, input: undefined };
}

export const ActionPayload = {
  encode(message: ActionPayload, writer: Writer = Writer.create()): Writer {
    if (message.button !== undefined) {
      ActionPayload_Button.encode(
        message.button,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.dropdown !== undefined) {
      ActionPayload_Dropdown.encode(
        message.dropdown,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.input !== undefined) {
      ActionPayload_Input.encode(
        message.input,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ActionPayload {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionPayload();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.button = ActionPayload_Button.decode(reader, reader.uint32());
          break;
        case 2:
          message.dropdown = ActionPayload_Dropdown.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.input = ActionPayload_Input.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActionPayload {
    return {
      button: isSet(object.button)
        ? ActionPayload_Button.fromJSON(object.button)
        : undefined,
      dropdown: isSet(object.dropdown)
        ? ActionPayload_Dropdown.fromJSON(object.dropdown)
        : undefined,
      input: isSet(object.input)
        ? ActionPayload_Input.fromJSON(object.input)
        : undefined,
    };
  },

  toJSON(message: ActionPayload): unknown {
    const obj: any = {};
    message.button !== undefined &&
      (obj.button = message.button
        ? ActionPayload_Button.toJSON(message.button)
        : undefined);
    message.dropdown !== undefined &&
      (obj.dropdown = message.dropdown
        ? ActionPayload_Dropdown.toJSON(message.dropdown)
        : undefined);
    message.input !== undefined &&
      (obj.input = message.input
        ? ActionPayload_Input.toJSON(message.input)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActionPayload>, I>>(
    object: I
  ): ActionPayload {
    const message = createBaseActionPayload();
    message.button =
      object.button !== undefined && object.button !== null
        ? ActionPayload_Button.fromPartial(object.button)
        : undefined;
    message.dropdown =
      object.dropdown !== undefined && object.dropdown !== null
        ? ActionPayload_Dropdown.fromPartial(object.dropdown)
        : undefined;
    message.input =
      object.input !== undefined && object.input !== null
        ? ActionPayload_Input.fromPartial(object.input)
        : undefined;
    return message;
  },
};

function createBaseActionPayload_Button(): ActionPayload_Button {
  return { data: new Uint8Array() };
}

export const ActionPayload_Button = {
  encode(
    message: ActionPayload_Button,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ActionPayload_Button {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionPayload_Button();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActionPayload_Button {
    return {
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: ActionPayload_Button): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActionPayload_Button>, I>>(
    object: I
  ): ActionPayload_Button {
    const message = createBaseActionPayload_Button();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseActionPayload_Dropdown(): ActionPayload_Dropdown {
  return { choice: new Uint8Array() };
}

export const ActionPayload_Dropdown = {
  encode(
    message: ActionPayload_Dropdown,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.choice.length !== 0) {
      writer.uint32(10).bytes(message.choice);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ActionPayload_Dropdown {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionPayload_Dropdown();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.choice = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActionPayload_Dropdown {
    return {
      choice: isSet(object.choice)
        ? bytesFromBase64(object.choice)
        : new Uint8Array(),
    };
  },

  toJSON(message: ActionPayload_Dropdown): unknown {
    const obj: any = {};
    message.choice !== undefined &&
      (obj.choice = base64FromBytes(
        message.choice !== undefined ? message.choice : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActionPayload_Dropdown>, I>>(
    object: I
  ): ActionPayload_Dropdown {
    const message = createBaseActionPayload_Dropdown();
    message.choice = object.choice ?? new Uint8Array();
    return message;
  },
};

function createBaseActionPayload_Input(): ActionPayload_Input {
  return { input: "", data: new Uint8Array() };
}

export const ActionPayload_Input = {
  encode(
    message: ActionPayload_Input,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.input !== "") {
      writer.uint32(10).string(message.input);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ActionPayload_Input {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionPayload_Input();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.input = reader.string();
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

  fromJSON(object: any): ActionPayload_Input {
    return {
      input: isSet(object.input) ? String(object.input) : "",
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: ActionPayload_Input): unknown {
    const obj: any = {};
    message.input !== undefined && (obj.input = message.input);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActionPayload_Input>, I>>(
    object: I
  ): ActionPayload_Input {
    const message = createBaseActionPayload_Input();
    message.input = object.input ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseAction(): Action {
  return {
    actionType: 0,
    button: undefined,
    dropdown: undefined,
    input: undefined,
  };
}

export const Action = {
  encode(message: Action, writer: Writer = Writer.create()): Writer {
    if (message.actionType !== 0) {
      writer.uint32(8).int32(message.actionType);
    }
    if (message.button !== undefined) {
      Action_Button.encode(message.button, writer.uint32(18).fork()).ldelim();
    }
    if (message.dropdown !== undefined) {
      Action_Dropdown.encode(
        message.dropdown,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.input !== undefined) {
      Action_Input.encode(message.input, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Action {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionType = reader.int32() as any;
          break;
        case 2:
          message.button = Action_Button.decode(reader, reader.uint32());
          break;
        case 3:
          message.dropdown = Action_Dropdown.decode(reader, reader.uint32());
          break;
        case 4:
          message.input = Action_Input.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Action {
    return {
      actionType: isSet(object.actionType)
        ? action_TypeFromJSON(object.actionType)
        : 0,
      button: isSet(object.button)
        ? Action_Button.fromJSON(object.button)
        : undefined,
      dropdown: isSet(object.dropdown)
        ? Action_Dropdown.fromJSON(object.dropdown)
        : undefined,
      input: isSet(object.input)
        ? Action_Input.fromJSON(object.input)
        : undefined,
    };
  },

  toJSON(message: Action): unknown {
    const obj: any = {};
    message.actionType !== undefined &&
      (obj.actionType = action_TypeToJSON(message.actionType));
    message.button !== undefined &&
      (obj.button = message.button
        ? Action_Button.toJSON(message.button)
        : undefined);
    message.dropdown !== undefined &&
      (obj.dropdown = message.dropdown
        ? Action_Dropdown.toJSON(message.dropdown)
        : undefined);
    message.input !== undefined &&
      (obj.input = message.input
        ? Action_Input.toJSON(message.input)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Action>, I>>(object: I): Action {
    const message = createBaseAction();
    message.actionType = object.actionType ?? 0;
    message.button =
      object.button !== undefined && object.button !== null
        ? Action_Button.fromPartial(object.button)
        : undefined;
    message.dropdown =
      object.dropdown !== undefined && object.dropdown !== null
        ? Action_Dropdown.fromPartial(object.dropdown)
        : undefined;
    message.input =
      object.input !== undefined && object.input !== null
        ? Action_Input.fromPartial(object.input)
        : undefined;
    return message;
  },
};

function createBaseAction_Button(): Action_Button {
  return { text: "", data: new Uint8Array(), url: undefined };
}

export const Action_Button = {
  encode(message: Action_Button, writer: Writer = Writer.create()): Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.url !== undefined) {
      writer.uint32(26).string(message.url);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Action_Button {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction_Button();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Action_Button {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
      url: isSet(object.url) ? String(object.url) : undefined,
    };
  },

  toJSON(message: Action_Button): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Action_Button>, I>>(
    object: I
  ): Action_Button {
    const message = createBaseAction_Button();
    message.text = object.text ?? "";
    message.data = object.data ?? new Uint8Array();
    message.url = object.url ?? undefined;
    return message;
  },
};

function createBaseAction_Dropdown(): Action_Dropdown {
  return { label: "", entries: [] };
}

export const Action_Dropdown = {
  encode(message: Action_Dropdown, writer: Writer = Writer.create()): Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    for (const v of message.entries) {
      Action_Dropdown_Entry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Action_Dropdown {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction_Dropdown();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        case 2:
          message.entries.push(
            Action_Dropdown_Entry.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Action_Dropdown {
    return {
      label: isSet(object.label) ? String(object.label) : "",
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => Action_Dropdown_Entry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Action_Dropdown): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    if (message.entries) {
      obj.entries = message.entries.map((e) =>
        e ? Action_Dropdown_Entry.toJSON(e) : undefined
      );
    } else {
      obj.entries = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Action_Dropdown>, I>>(
    object: I
  ): Action_Dropdown {
    const message = createBaseAction_Dropdown();
    message.label = object.label ?? "";
    message.entries =
      object.entries?.map((e) => Action_Dropdown_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAction_Dropdown_Entry(): Action_Dropdown_Entry {
  return { label: "", data: new Uint8Array() };
}

export const Action_Dropdown_Entry = {
  encode(
    message: Action_Dropdown_Entry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Action_Dropdown_Entry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction_Dropdown_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
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

  fromJSON(object: any): Action_Dropdown_Entry {
    return {
      label: isSet(object.label) ? String(object.label) : "",
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: Action_Dropdown_Entry): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Action_Dropdown_Entry>, I>>(
    object: I
  ): Action_Dropdown_Entry {
    const message = createBaseAction_Dropdown_Entry();
    message.label = object.label ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseAction_Input(): Action_Input {
  return { label: "", multiline: false, data: new Uint8Array() };
}

export const Action_Input = {
  encode(message: Action_Input, writer: Writer = Writer.create()): Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.multiline === true) {
      writer.uint32(16).bool(message.multiline);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Action_Input {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction_Input();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        case 2:
          message.multiline = reader.bool();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Action_Input {
    return {
      label: isSet(object.label) ? String(object.label) : "",
      multiline: isSet(object.multiline) ? Boolean(object.multiline) : false,
      data: isSet(object.data)
        ? bytesFromBase64(object.data)
        : new Uint8Array(),
    };
  },

  toJSON(message: Action_Input): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    message.multiline !== undefined && (obj.multiline = message.multiline);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Action_Input>, I>>(
    object: I
  ): Action_Input {
    const message = createBaseAction_Input();
    message.label = object.label ?? "";
    message.multiline = object.multiline ?? false;
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

function createBaseEmbed(): Embed {
  return {
    header: undefined,
    title: "",
    body: undefined,
    fields: [],
    footer: undefined,
    color: undefined,
  };
}

export const Embed = {
  encode(message: Embed, writer: Writer = Writer.create()): Writer {
    if (message.header !== undefined) {
      Embed_EmbedHeading.encode(
        message.header,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.body !== undefined) {
      FormattedText.encode(message.body, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.fields) {
      Embed_EmbedField.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.footer !== undefined) {
      Embed_EmbedHeading.encode(
        message.footer,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.color !== undefined) {
      writer.uint32(48).int32(message.color);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Embed {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmbed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = Embed_EmbedHeading.decode(reader, reader.uint32());
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.body = FormattedText.decode(reader, reader.uint32());
          break;
        case 4:
          message.fields.push(Embed_EmbedField.decode(reader, reader.uint32()));
          break;
        case 5:
          message.footer = Embed_EmbedHeading.decode(reader, reader.uint32());
          break;
        case 6:
          message.color = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Embed {
    return {
      header: isSet(object.header)
        ? Embed_EmbedHeading.fromJSON(object.header)
        : undefined,
      title: isSet(object.title) ? String(object.title) : "",
      body: isSet(object.body)
        ? FormattedText.fromJSON(object.body)
        : undefined,
      fields: Array.isArray(object?.fields)
        ? object.fields.map((e: any) => Embed_EmbedField.fromJSON(e))
        : [],
      footer: isSet(object.footer)
        ? Embed_EmbedHeading.fromJSON(object.footer)
        : undefined,
      color: isSet(object.color) ? Number(object.color) : undefined,
    };
  },

  toJSON(message: Embed): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header
        ? Embed_EmbedHeading.toJSON(message.header)
        : undefined);
    message.title !== undefined && (obj.title = message.title);
    message.body !== undefined &&
      (obj.body = message.body
        ? FormattedText.toJSON(message.body)
        : undefined);
    if (message.fields) {
      obj.fields = message.fields.map((e) =>
        e ? Embed_EmbedField.toJSON(e) : undefined
      );
    } else {
      obj.fields = [];
    }
    message.footer !== undefined &&
      (obj.footer = message.footer
        ? Embed_EmbedHeading.toJSON(message.footer)
        : undefined);
    message.color !== undefined && (obj.color = Math.round(message.color));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Embed>, I>>(object: I): Embed {
    const message = createBaseEmbed();
    message.header =
      object.header !== undefined && object.header !== null
        ? Embed_EmbedHeading.fromPartial(object.header)
        : undefined;
    message.title = object.title ?? "";
    message.body =
      object.body !== undefined && object.body !== null
        ? FormattedText.fromPartial(object.body)
        : undefined;
    message.fields =
      object.fields?.map((e) => Embed_EmbedField.fromPartial(e)) || [];
    message.footer =
      object.footer !== undefined && object.footer !== null
        ? Embed_EmbedHeading.fromPartial(object.footer)
        : undefined;
    message.color = object.color ?? undefined;
    return message;
  },
};

function createBaseEmbed_EmbedHeading(): Embed_EmbedHeading {
  return { text: "", subtext: undefined, url: undefined, icon: undefined };
}

export const Embed_EmbedHeading = {
  encode(
    message: Embed_EmbedHeading,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.subtext !== undefined) {
      writer.uint32(18).string(message.subtext);
    }
    if (message.url !== undefined) {
      writer.uint32(26).string(message.url);
    }
    if (message.icon !== undefined) {
      writer.uint32(34).string(message.icon);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Embed_EmbedHeading {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmbed_EmbedHeading();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.subtext = reader.string();
          break;
        case 3:
          message.url = reader.string();
          break;
        case 4:
          message.icon = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Embed_EmbedHeading {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      subtext: isSet(object.subtext) ? String(object.subtext) : undefined,
      url: isSet(object.url) ? String(object.url) : undefined,
      icon: isSet(object.icon) ? String(object.icon) : undefined,
    };
  },

  toJSON(message: Embed_EmbedHeading): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    message.subtext !== undefined && (obj.subtext = message.subtext);
    message.url !== undefined && (obj.url = message.url);
    message.icon !== undefined && (obj.icon = message.icon);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Embed_EmbedHeading>, I>>(
    object: I
  ): Embed_EmbedHeading {
    const message = createBaseEmbed_EmbedHeading();
    message.text = object.text ?? "";
    message.subtext = object.subtext ?? undefined;
    message.url = object.url ?? undefined;
    message.icon = object.icon ?? undefined;
    return message;
  },
};

function createBaseEmbed_EmbedField(): Embed_EmbedField {
  return {
    presentation: 0,
    title: "",
    subtitle: undefined,
    body: undefined,
    image: undefined,
    actions: [],
  };
}

export const Embed_EmbedField = {
  encode(message: Embed_EmbedField, writer: Writer = Writer.create()): Writer {
    if (message.presentation !== 0) {
      writer.uint32(8).int32(message.presentation);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.subtitle !== undefined) {
      writer.uint32(26).string(message.subtitle);
    }
    if (message.body !== undefined) {
      FormattedText.encode(message.body, writer.uint32(34).fork()).ldelim();
    }
    if (message.image !== undefined) {
      Embed_EmbedField_Image.encode(
        message.image,
        writer.uint32(42).fork()
      ).ldelim();
    }
    for (const v of message.actions) {
      Action.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Embed_EmbedField {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmbed_EmbedField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presentation = reader.int32() as any;
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.subtitle = reader.string();
          break;
        case 4:
          message.body = FormattedText.decode(reader, reader.uint32());
          break;
        case 5:
          message.image = Embed_EmbedField_Image.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.actions.push(Action.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Embed_EmbedField {
    return {
      presentation: isSet(object.presentation)
        ? embed_EmbedField_PresentationFromJSON(object.presentation)
        : 0,
      title: isSet(object.title) ? String(object.title) : "",
      subtitle: isSet(object.subtitle) ? String(object.subtitle) : undefined,
      body: isSet(object.body)
        ? FormattedText.fromJSON(object.body)
        : undefined,
      image: isSet(object.image)
        ? Embed_EmbedField_Image.fromJSON(object.image)
        : undefined,
      actions: Array.isArray(object?.actions)
        ? object.actions.map((e: any) => Action.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Embed_EmbedField): unknown {
    const obj: any = {};
    message.presentation !== undefined &&
      (obj.presentation = embed_EmbedField_PresentationToJSON(
        message.presentation
      ));
    message.title !== undefined && (obj.title = message.title);
    message.subtitle !== undefined && (obj.subtitle = message.subtitle);
    message.body !== undefined &&
      (obj.body = message.body
        ? FormattedText.toJSON(message.body)
        : undefined);
    message.image !== undefined &&
      (obj.image = message.image
        ? Embed_EmbedField_Image.toJSON(message.image)
        : undefined);
    if (message.actions) {
      obj.actions = message.actions.map((e) =>
        e ? Action.toJSON(e) : undefined
      );
    } else {
      obj.actions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Embed_EmbedField>, I>>(
    object: I
  ): Embed_EmbedField {
    const message = createBaseEmbed_EmbedField();
    message.presentation = object.presentation ?? 0;
    message.title = object.title ?? "";
    message.subtitle = object.subtitle ?? undefined;
    message.body =
      object.body !== undefined && object.body !== null
        ? FormattedText.fromPartial(object.body)
        : undefined;
    message.image =
      object.image !== undefined && object.image !== null
        ? Embed_EmbedField_Image.fromPartial(object.image)
        : undefined;
    message.actions = object.actions?.map((e) => Action.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEmbed_EmbedField_Image(): Embed_EmbedField_Image {
  return { id: "", info: undefined };
}

export const Embed_EmbedField_Image = {
  encode(
    message: Embed_EmbedField_Image,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.info !== undefined) {
      ImageInfo.encode(message.info, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Embed_EmbedField_Image {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmbed_EmbedField_Image();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.info = ImageInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Embed_EmbedField_Image {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      info: isSet(object.info) ? ImageInfo.fromJSON(object.info) : undefined,
    };
  },

  toJSON(message: Embed_EmbedField_Image): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.info !== undefined &&
      (obj.info = message.info ? ImageInfo.toJSON(message.info) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Embed_EmbedField_Image>, I>>(
    object: I
  ): Embed_EmbedField_Image {
    const message = createBaseEmbed_EmbedField_Image();
    message.id = object.id ?? "";
    message.info =
      object.info !== undefined && object.info !== null
        ? ImageInfo.fromPartial(object.info)
        : undefined;
    return message;
  },
};

function createBaseAttachment(): Attachment {
  return { id: "", name: "", mimetype: "", size: 0, image: undefined };
}

export const Attachment = {
  encode(message: Attachment, writer: Writer = Writer.create()): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.mimetype !== "") {
      writer.uint32(26).string(message.mimetype);
    }
    if (message.size !== 0) {
      writer.uint32(32).uint32(message.size);
    }
    if (message.image !== undefined) {
      ImageInfo.encode(message.image, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Attachment {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.mimetype = reader.string();
          break;
        case 4:
          message.size = reader.uint32();
          break;
        case 5:
          message.image = ImageInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Attachment {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      mimetype: isSet(object.mimetype) ? String(object.mimetype) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      image: isSet(object.image) ? ImageInfo.fromJSON(object.image) : undefined,
    };
  },

  toJSON(message: Attachment): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.mimetype !== undefined && (obj.mimetype = message.mimetype);
    message.size !== undefined && (obj.size = Math.round(message.size));
    message.image !== undefined &&
      (obj.image = message.image ? ImageInfo.toJSON(message.image) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attachment>, I>>(
    object: I
  ): Attachment {
    const message = createBaseAttachment();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.mimetype = object.mimetype ?? "";
    message.size = object.size ?? 0;
    message.image =
      object.image !== undefined && object.image !== null
        ? ImageInfo.fromPartial(object.image)
        : undefined;
    return message;
  },
};

function createBaseContent(): Content {
  return {
    text: "",
    textFormats: [],
    embeds: [],
    attachments: [],
    inviteRejected: undefined,
    inviteAccepted: undefined,
    roomUpgradedToGuild: undefined,
  };
}

export const Content = {
  encode(message: Content, writer: Writer = Writer.create()): Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    for (const v of message.textFormats) {
      Format.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.embeds) {
      Embed.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.attachments) {
      Attachment.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.inviteRejected !== undefined) {
      Content_InviteRejected.encode(
        message.inviteRejected,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.inviteAccepted !== undefined) {
      Content_InviteAccepted.encode(
        message.inviteAccepted,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.roomUpgradedToGuild !== undefined) {
      Content_RoomUpgradedToGuild.encode(
        message.roomUpgradedToGuild,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Content {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.textFormats.push(Format.decode(reader, reader.uint32()));
          break;
        case 3:
          message.embeds.push(Embed.decode(reader, reader.uint32()));
          break;
        case 4:
          message.attachments.push(Attachment.decode(reader, reader.uint32()));
          break;
        case 5:
          message.inviteRejected = Content_InviteRejected.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.inviteAccepted = Content_InviteAccepted.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.roomUpgradedToGuild = Content_RoomUpgradedToGuild.decode(
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

  fromJSON(object: any): Content {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      textFormats: Array.isArray(object?.textFormats)
        ? object.textFormats.map((e: any) => Format.fromJSON(e))
        : [],
      embeds: Array.isArray(object?.embeds)
        ? object.embeds.map((e: any) => Embed.fromJSON(e))
        : [],
      attachments: Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) => Attachment.fromJSON(e))
        : [],
      inviteRejected: isSet(object.inviteRejected)
        ? Content_InviteRejected.fromJSON(object.inviteRejected)
        : undefined,
      inviteAccepted: isSet(object.inviteAccepted)
        ? Content_InviteAccepted.fromJSON(object.inviteAccepted)
        : undefined,
      roomUpgradedToGuild: isSet(object.roomUpgradedToGuild)
        ? Content_RoomUpgradedToGuild.fromJSON(object.roomUpgradedToGuild)
        : undefined,
    };
  },

  toJSON(message: Content): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    if (message.textFormats) {
      obj.textFormats = message.textFormats.map((e) =>
        e ? Format.toJSON(e) : undefined
      );
    } else {
      obj.textFormats = [];
    }
    if (message.embeds) {
      obj.embeds = message.embeds.map((e) => (e ? Embed.toJSON(e) : undefined));
    } else {
      obj.embeds = [];
    }
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) =>
        e ? Attachment.toJSON(e) : undefined
      );
    } else {
      obj.attachments = [];
    }
    message.inviteRejected !== undefined &&
      (obj.inviteRejected = message.inviteRejected
        ? Content_InviteRejected.toJSON(message.inviteRejected)
        : undefined);
    message.inviteAccepted !== undefined &&
      (obj.inviteAccepted = message.inviteAccepted
        ? Content_InviteAccepted.toJSON(message.inviteAccepted)
        : undefined);
    message.roomUpgradedToGuild !== undefined &&
      (obj.roomUpgradedToGuild = message.roomUpgradedToGuild
        ? Content_RoomUpgradedToGuild.toJSON(message.roomUpgradedToGuild)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Content>, I>>(object: I): Content {
    const message = createBaseContent();
    message.text = object.text ?? "";
    message.textFormats =
      object.textFormats?.map((e) => Format.fromPartial(e)) || [];
    message.embeds = object.embeds?.map((e) => Embed.fromPartial(e)) || [];
    message.attachments =
      object.attachments?.map((e) => Attachment.fromPartial(e)) || [];
    message.inviteRejected =
      object.inviteRejected !== undefined && object.inviteRejected !== null
        ? Content_InviteRejected.fromPartial(object.inviteRejected)
        : undefined;
    message.inviteAccepted =
      object.inviteAccepted !== undefined && object.inviteAccepted !== null
        ? Content_InviteAccepted.fromPartial(object.inviteAccepted)
        : undefined;
    message.roomUpgradedToGuild =
      object.roomUpgradedToGuild !== undefined &&
      object.roomUpgradedToGuild !== null
        ? Content_RoomUpgradedToGuild.fromPartial(object.roomUpgradedToGuild)
        : undefined;
    return message;
  },
};

function createBaseContent_InviteRejected(): Content_InviteRejected {
  return { inviteeId: 0, inviterId: 0 };
}

export const Content_InviteRejected = {
  encode(
    message: Content_InviteRejected,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.inviteeId !== 0) {
      writer.uint32(8).uint64(message.inviteeId);
    }
    if (message.inviterId !== 0) {
      writer.uint32(16).uint64(message.inviterId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Content_InviteRejected {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContent_InviteRejected();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteeId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.inviterId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Content_InviteRejected {
    return {
      inviteeId: isSet(object.inviteeId) ? Number(object.inviteeId) : 0,
      inviterId: isSet(object.inviterId) ? Number(object.inviterId) : 0,
    };
  },

  toJSON(message: Content_InviteRejected): unknown {
    const obj: any = {};
    message.inviteeId !== undefined &&
      (obj.inviteeId = Math.round(message.inviteeId));
    message.inviterId !== undefined &&
      (obj.inviterId = Math.round(message.inviterId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Content_InviteRejected>, I>>(
    object: I
  ): Content_InviteRejected {
    const message = createBaseContent_InviteRejected();
    message.inviteeId = object.inviteeId ?? 0;
    message.inviterId = object.inviterId ?? 0;
    return message;
  },
};

function createBaseContent_InviteAccepted(): Content_InviteAccepted {
  return { inviteeId: 0, inviterId: 0 };
}

export const Content_InviteAccepted = {
  encode(
    message: Content_InviteAccepted,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.inviteeId !== 0) {
      writer.uint32(8).uint64(message.inviteeId);
    }
    if (message.inviterId !== 0) {
      writer.uint32(16).uint64(message.inviterId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Content_InviteAccepted {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContent_InviteAccepted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inviteeId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.inviterId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Content_InviteAccepted {
    return {
      inviteeId: isSet(object.inviteeId) ? Number(object.inviteeId) : 0,
      inviterId: isSet(object.inviterId) ? Number(object.inviterId) : 0,
    };
  },

  toJSON(message: Content_InviteAccepted): unknown {
    const obj: any = {};
    message.inviteeId !== undefined &&
      (obj.inviteeId = Math.round(message.inviteeId));
    message.inviterId !== undefined &&
      (obj.inviterId = Math.round(message.inviterId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Content_InviteAccepted>, I>>(
    object: I
  ): Content_InviteAccepted {
    const message = createBaseContent_InviteAccepted();
    message.inviteeId = object.inviteeId ?? 0;
    message.inviterId = object.inviterId ?? 0;
    return message;
  },
};

function createBaseContent_RoomUpgradedToGuild(): Content_RoomUpgradedToGuild {
  return { upgradedBy: 0 };
}

export const Content_RoomUpgradedToGuild = {
  encode(
    message: Content_RoomUpgradedToGuild,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.upgradedBy !== 0) {
      writer.uint32(8).uint64(message.upgradedBy);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): Content_RoomUpgradedToGuild {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContent_RoomUpgradedToGuild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgradedBy = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Content_RoomUpgradedToGuild {
    return {
      upgradedBy: isSet(object.upgradedBy) ? Number(object.upgradedBy) : 0,
    };
  },

  toJSON(message: Content_RoomUpgradedToGuild): unknown {
    const obj: any = {};
    message.upgradedBy !== undefined &&
      (obj.upgradedBy = Math.round(message.upgradedBy));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Content_RoomUpgradedToGuild>, I>>(
    object: I
  ): Content_RoomUpgradedToGuild {
    const message = createBaseContent_RoomUpgradedToGuild();
    message.upgradedBy = object.upgradedBy ?? 0;
    return message;
  },
};

function createBaseReaction(): Reaction {
  return { emote: undefined, count: 0 };
}

export const Reaction = {
  encode(message: Reaction, writer: Writer = Writer.create()): Writer {
    if (message.emote !== undefined) {
      Emote.encode(message.emote, writer.uint32(10).fork()).ldelim();
    }
    if (message.count !== 0) {
      writer.uint32(16).uint32(message.count);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Reaction {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.emote = Emote.decode(reader, reader.uint32());
          break;
        case 2:
          message.count = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Reaction {
    return {
      emote: isSet(object.emote) ? Emote.fromJSON(object.emote) : undefined,
      count: isSet(object.count) ? Number(object.count) : 0,
    };
  },

  toJSON(message: Reaction): unknown {
    const obj: any = {};
    message.emote !== undefined &&
      (obj.emote = message.emote ? Emote.toJSON(message.emote) : undefined);
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Reaction>, I>>(object: I): Reaction {
    const message = createBaseReaction();
    message.emote =
      object.emote !== undefined && object.emote !== null
        ? Emote.fromPartial(object.emote)
        : undefined;
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseFormat(): Format {
  return {
    start: 0,
    length: 0,
    bold: undefined,
    italic: undefined,
    underline: undefined,
    monospace: undefined,
    superscript: undefined,
    subscript: undefined,
    codeBlock: undefined,
    userMention: undefined,
    roleMention: undefined,
    channelMention: undefined,
    guildMention: undefined,
    emoji: undefined,
    color: undefined,
    localization: undefined,
  };
}

export const Format = {
  encode(message: Format, writer: Writer = Writer.create()): Writer {
    if (message.start !== 0) {
      writer.uint32(8).uint32(message.start);
    }
    if (message.length !== 0) {
      writer.uint32(16).uint32(message.length);
    }
    if (message.bold !== undefined) {
      Format_Bold.encode(message.bold, writer.uint32(26).fork()).ldelim();
    }
    if (message.italic !== undefined) {
      Format_Italic.encode(message.italic, writer.uint32(34).fork()).ldelim();
    }
    if (message.underline !== undefined) {
      Format_Underline.encode(
        message.underline,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.monospace !== undefined) {
      Format_Monospace.encode(
        message.monospace,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.superscript !== undefined) {
      Format_Superscript.encode(
        message.superscript,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.subscript !== undefined) {
      Format_Subscript.encode(
        message.subscript,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.codeBlock !== undefined) {
      Format_CodeBlock.encode(
        message.codeBlock,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.userMention !== undefined) {
      Format_UserMention.encode(
        message.userMention,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.roleMention !== undefined) {
      Format_RoleMention.encode(
        message.roleMention,
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.channelMention !== undefined) {
      Format_ChannelMention.encode(
        message.channelMention,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.guildMention !== undefined) {
      Format_GuildMention.encode(
        message.guildMention,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.emoji !== undefined) {
      Format_Emoji.encode(message.emoji, writer.uint32(114).fork()).ldelim();
    }
    if (message.color !== undefined) {
      Format_Color.encode(message.color, writer.uint32(122).fork()).ldelim();
    }
    if (message.localization !== undefined) {
      Format_Localization.encode(
        message.localization,
        writer.uint32(130).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.start = reader.uint32();
          break;
        case 2:
          message.length = reader.uint32();
          break;
        case 3:
          message.bold = Format_Bold.decode(reader, reader.uint32());
          break;
        case 4:
          message.italic = Format_Italic.decode(reader, reader.uint32());
          break;
        case 5:
          message.underline = Format_Underline.decode(reader, reader.uint32());
          break;
        case 6:
          message.monospace = Format_Monospace.decode(reader, reader.uint32());
          break;
        case 7:
          message.superscript = Format_Superscript.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.subscript = Format_Subscript.decode(reader, reader.uint32());
          break;
        case 9:
          message.codeBlock = Format_CodeBlock.decode(reader, reader.uint32());
          break;
        case 10:
          message.userMention = Format_UserMention.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.roleMention = Format_RoleMention.decode(
            reader,
            reader.uint32()
          );
          break;
        case 12:
          message.channelMention = Format_ChannelMention.decode(
            reader,
            reader.uint32()
          );
          break;
        case 13:
          message.guildMention = Format_GuildMention.decode(
            reader,
            reader.uint32()
          );
          break;
        case 14:
          message.emoji = Format_Emoji.decode(reader, reader.uint32());
          break;
        case 15:
          message.color = Format_Color.decode(reader, reader.uint32());
          break;
        case 16:
          message.localization = Format_Localization.decode(
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

  fromJSON(object: any): Format {
    return {
      start: isSet(object.start) ? Number(object.start) : 0,
      length: isSet(object.length) ? Number(object.length) : 0,
      bold: isSet(object.bold) ? Format_Bold.fromJSON(object.bold) : undefined,
      italic: isSet(object.italic)
        ? Format_Italic.fromJSON(object.italic)
        : undefined,
      underline: isSet(object.underline)
        ? Format_Underline.fromJSON(object.underline)
        : undefined,
      monospace: isSet(object.monospace)
        ? Format_Monospace.fromJSON(object.monospace)
        : undefined,
      superscript: isSet(object.superscript)
        ? Format_Superscript.fromJSON(object.superscript)
        : undefined,
      subscript: isSet(object.subscript)
        ? Format_Subscript.fromJSON(object.subscript)
        : undefined,
      codeBlock: isSet(object.codeBlock)
        ? Format_CodeBlock.fromJSON(object.codeBlock)
        : undefined,
      userMention: isSet(object.userMention)
        ? Format_UserMention.fromJSON(object.userMention)
        : undefined,
      roleMention: isSet(object.roleMention)
        ? Format_RoleMention.fromJSON(object.roleMention)
        : undefined,
      channelMention: isSet(object.channelMention)
        ? Format_ChannelMention.fromJSON(object.channelMention)
        : undefined,
      guildMention: isSet(object.guildMention)
        ? Format_GuildMention.fromJSON(object.guildMention)
        : undefined,
      emoji: isSet(object.emoji)
        ? Format_Emoji.fromJSON(object.emoji)
        : undefined,
      color: isSet(object.color)
        ? Format_Color.fromJSON(object.color)
        : undefined,
      localization: isSet(object.localization)
        ? Format_Localization.fromJSON(object.localization)
        : undefined,
    };
  },

  toJSON(message: Format): unknown {
    const obj: any = {};
    message.start !== undefined && (obj.start = Math.round(message.start));
    message.length !== undefined && (obj.length = Math.round(message.length));
    message.bold !== undefined &&
      (obj.bold = message.bold ? Format_Bold.toJSON(message.bold) : undefined);
    message.italic !== undefined &&
      (obj.italic = message.italic
        ? Format_Italic.toJSON(message.italic)
        : undefined);
    message.underline !== undefined &&
      (obj.underline = message.underline
        ? Format_Underline.toJSON(message.underline)
        : undefined);
    message.monospace !== undefined &&
      (obj.monospace = message.monospace
        ? Format_Monospace.toJSON(message.monospace)
        : undefined);
    message.superscript !== undefined &&
      (obj.superscript = message.superscript
        ? Format_Superscript.toJSON(message.superscript)
        : undefined);
    message.subscript !== undefined &&
      (obj.subscript = message.subscript
        ? Format_Subscript.toJSON(message.subscript)
        : undefined);
    message.codeBlock !== undefined &&
      (obj.codeBlock = message.codeBlock
        ? Format_CodeBlock.toJSON(message.codeBlock)
        : undefined);
    message.userMention !== undefined &&
      (obj.userMention = message.userMention
        ? Format_UserMention.toJSON(message.userMention)
        : undefined);
    message.roleMention !== undefined &&
      (obj.roleMention = message.roleMention
        ? Format_RoleMention.toJSON(message.roleMention)
        : undefined);
    message.channelMention !== undefined &&
      (obj.channelMention = message.channelMention
        ? Format_ChannelMention.toJSON(message.channelMention)
        : undefined);
    message.guildMention !== undefined &&
      (obj.guildMention = message.guildMention
        ? Format_GuildMention.toJSON(message.guildMention)
        : undefined);
    message.emoji !== undefined &&
      (obj.emoji = message.emoji
        ? Format_Emoji.toJSON(message.emoji)
        : undefined);
    message.color !== undefined &&
      (obj.color = message.color
        ? Format_Color.toJSON(message.color)
        : undefined);
    message.localization !== undefined &&
      (obj.localization = message.localization
        ? Format_Localization.toJSON(message.localization)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format>, I>>(object: I): Format {
    const message = createBaseFormat();
    message.start = object.start ?? 0;
    message.length = object.length ?? 0;
    message.bold =
      object.bold !== undefined && object.bold !== null
        ? Format_Bold.fromPartial(object.bold)
        : undefined;
    message.italic =
      object.italic !== undefined && object.italic !== null
        ? Format_Italic.fromPartial(object.italic)
        : undefined;
    message.underline =
      object.underline !== undefined && object.underline !== null
        ? Format_Underline.fromPartial(object.underline)
        : undefined;
    message.monospace =
      object.monospace !== undefined && object.monospace !== null
        ? Format_Monospace.fromPartial(object.monospace)
        : undefined;
    message.superscript =
      object.superscript !== undefined && object.superscript !== null
        ? Format_Superscript.fromPartial(object.superscript)
        : undefined;
    message.subscript =
      object.subscript !== undefined && object.subscript !== null
        ? Format_Subscript.fromPartial(object.subscript)
        : undefined;
    message.codeBlock =
      object.codeBlock !== undefined && object.codeBlock !== null
        ? Format_CodeBlock.fromPartial(object.codeBlock)
        : undefined;
    message.userMention =
      object.userMention !== undefined && object.userMention !== null
        ? Format_UserMention.fromPartial(object.userMention)
        : undefined;
    message.roleMention =
      object.roleMention !== undefined && object.roleMention !== null
        ? Format_RoleMention.fromPartial(object.roleMention)
        : undefined;
    message.channelMention =
      object.channelMention !== undefined && object.channelMention !== null
        ? Format_ChannelMention.fromPartial(object.channelMention)
        : undefined;
    message.guildMention =
      object.guildMention !== undefined && object.guildMention !== null
        ? Format_GuildMention.fromPartial(object.guildMention)
        : undefined;
    message.emoji =
      object.emoji !== undefined && object.emoji !== null
        ? Format_Emoji.fromPartial(object.emoji)
        : undefined;
    message.color =
      object.color !== undefined && object.color !== null
        ? Format_Color.fromPartial(object.color)
        : undefined;
    message.localization =
      object.localization !== undefined && object.localization !== null
        ? Format_Localization.fromPartial(object.localization)
        : undefined;
    return message;
  },
};

function createBaseFormat_Bold(): Format_Bold {
  return {};
}

export const Format_Bold = {
  encode(_: Format_Bold, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Bold {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Bold();
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

  fromJSON(_: any): Format_Bold {
    return {};
  },

  toJSON(_: Format_Bold): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Bold>, I>>(_: I): Format_Bold {
    const message = createBaseFormat_Bold();
    return message;
  },
};

function createBaseFormat_Italic(): Format_Italic {
  return {};
}

export const Format_Italic = {
  encode(_: Format_Italic, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Italic {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Italic();
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

  fromJSON(_: any): Format_Italic {
    return {};
  },

  toJSON(_: Format_Italic): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Italic>, I>>(
    _: I
  ): Format_Italic {
    const message = createBaseFormat_Italic();
    return message;
  },
};

function createBaseFormat_Underline(): Format_Underline {
  return {};
}

export const Format_Underline = {
  encode(_: Format_Underline, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Underline {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Underline();
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

  fromJSON(_: any): Format_Underline {
    return {};
  },

  toJSON(_: Format_Underline): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Underline>, I>>(
    _: I
  ): Format_Underline {
    const message = createBaseFormat_Underline();
    return message;
  },
};

function createBaseFormat_Monospace(): Format_Monospace {
  return {};
}

export const Format_Monospace = {
  encode(_: Format_Monospace, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Monospace {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Monospace();
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

  fromJSON(_: any): Format_Monospace {
    return {};
  },

  toJSON(_: Format_Monospace): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Monospace>, I>>(
    _: I
  ): Format_Monospace {
    const message = createBaseFormat_Monospace();
    return message;
  },
};

function createBaseFormat_Superscript(): Format_Superscript {
  return {};
}

export const Format_Superscript = {
  encode(_: Format_Superscript, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Superscript {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Superscript();
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

  fromJSON(_: any): Format_Superscript {
    return {};
  },

  toJSON(_: Format_Superscript): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Superscript>, I>>(
    _: I
  ): Format_Superscript {
    const message = createBaseFormat_Superscript();
    return message;
  },
};

function createBaseFormat_Subscript(): Format_Subscript {
  return {};
}

export const Format_Subscript = {
  encode(_: Format_Subscript, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Subscript {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Subscript();
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

  fromJSON(_: any): Format_Subscript {
    return {};
  },

  toJSON(_: Format_Subscript): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Subscript>, I>>(
    _: I
  ): Format_Subscript {
    const message = createBaseFormat_Subscript();
    return message;
  },
};

function createBaseFormat_CodeBlock(): Format_CodeBlock {
  return { language: "" };
}

export const Format_CodeBlock = {
  encode(message: Format_CodeBlock, writer: Writer = Writer.create()): Writer {
    if (message.language !== "") {
      writer.uint32(10).string(message.language);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_CodeBlock {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_CodeBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.language = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Format_CodeBlock {
    return {
      language: isSet(object.language) ? String(object.language) : "",
    };
  },

  toJSON(message: Format_CodeBlock): unknown {
    const obj: any = {};
    message.language !== undefined && (obj.language = message.language);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_CodeBlock>, I>>(
    object: I
  ): Format_CodeBlock {
    const message = createBaseFormat_CodeBlock();
    message.language = object.language ?? "";
    return message;
  },
};

function createBaseFormat_UserMention(): Format_UserMention {
  return { userId: 0 };
}

export const Format_UserMention = {
  encode(
    message: Format_UserMention,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.userId !== 0) {
      writer.uint32(8).uint64(message.userId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_UserMention {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_UserMention();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Format_UserMention {
    return {
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    };
  },

  toJSON(message: Format_UserMention): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = Math.round(message.userId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_UserMention>, I>>(
    object: I
  ): Format_UserMention {
    const message = createBaseFormat_UserMention();
    message.userId = object.userId ?? 0;
    return message;
  },
};

function createBaseFormat_RoleMention(): Format_RoleMention {
  return { roleId: 0 };
}

export const Format_RoleMention = {
  encode(
    message: Format_RoleMention,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.roleId !== 0) {
      writer.uint32(8).uint64(message.roleId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_RoleMention {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_RoleMention();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roleId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Format_RoleMention {
    return {
      roleId: isSet(object.roleId) ? Number(object.roleId) : 0,
    };
  },

  toJSON(message: Format_RoleMention): unknown {
    const obj: any = {};
    message.roleId !== undefined && (obj.roleId = Math.round(message.roleId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_RoleMention>, I>>(
    object: I
  ): Format_RoleMention {
    const message = createBaseFormat_RoleMention();
    message.roleId = object.roleId ?? 0;
    return message;
  },
};

function createBaseFormat_ChannelMention(): Format_ChannelMention {
  return { channelId: 0 };
}

export const Format_ChannelMention = {
  encode(
    message: Format_ChannelMention,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.channelId !== 0) {
      writer.uint32(8).uint64(message.channelId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_ChannelMention {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_ChannelMention();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Format_ChannelMention {
    return {
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
    };
  },

  toJSON(message: Format_ChannelMention): unknown {
    const obj: any = {};
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_ChannelMention>, I>>(
    object: I
  ): Format_ChannelMention {
    const message = createBaseFormat_ChannelMention();
    message.channelId = object.channelId ?? 0;
    return message;
  },
};

function createBaseFormat_GuildMention(): Format_GuildMention {
  return { guildId: 0, homeserver: "" };
}

export const Format_GuildMention = {
  encode(
    message: Format_GuildMention,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.homeserver !== "") {
      writer.uint32(18).string(message.homeserver);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_GuildMention {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_GuildMention();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.homeserver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Format_GuildMention {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      homeserver: isSet(object.homeserver) ? String(object.homeserver) : "",
    };
  },

  toJSON(message: Format_GuildMention): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.homeserver !== undefined && (obj.homeserver = message.homeserver);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_GuildMention>, I>>(
    object: I
  ): Format_GuildMention {
    const message = createBaseFormat_GuildMention();
    message.guildId = object.guildId ?? 0;
    message.homeserver = object.homeserver ?? "";
    return message;
  },
};

function createBaseFormat_Emoji(): Format_Emoji {
  return { emote: undefined };
}

export const Format_Emoji = {
  encode(message: Format_Emoji, writer: Writer = Writer.create()): Writer {
    if (message.emote !== undefined) {
      Emote.encode(message.emote, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Emoji {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Emoji();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.emote = Emote.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Format_Emoji {
    return {
      emote: isSet(object.emote) ? Emote.fromJSON(object.emote) : undefined,
    };
  },

  toJSON(message: Format_Emoji): unknown {
    const obj: any = {};
    message.emote !== undefined &&
      (obj.emote = message.emote ? Emote.toJSON(message.emote) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Emoji>, I>>(
    object: I
  ): Format_Emoji {
    const message = createBaseFormat_Emoji();
    message.emote =
      object.emote !== undefined && object.emote !== null
        ? Emote.fromPartial(object.emote)
        : undefined;
    return message;
  },
};

function createBaseFormat_Color(): Format_Color {
  return { kind: 0 };
}

export const Format_Color = {
  encode(message: Format_Color, writer: Writer = Writer.create()): Writer {
    if (message.kind !== 0) {
      writer.uint32(8).int32(message.kind);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Color {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Color();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kind = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Format_Color {
    return {
      kind: isSet(object.kind) ? format_Color_KindFromJSON(object.kind) : 0,
    };
  },

  toJSON(message: Format_Color): unknown {
    const obj: any = {};
    message.kind !== undefined &&
      (obj.kind = format_Color_KindToJSON(message.kind));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Color>, I>>(
    object: I
  ): Format_Color {
    const message = createBaseFormat_Color();
    message.kind = object.kind ?? 0;
    return message;
  },
};

function createBaseFormat_Localization(): Format_Localization {
  return { i18nCode: "" };
}

export const Format_Localization = {
  encode(
    message: Format_Localization,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.i18nCode !== "") {
      writer.uint32(10).string(message.i18nCode);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Format_Localization {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormat_Localization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.i18nCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Format_Localization {
    return {
      i18nCode: isSet(object.i18nCode) ? String(object.i18nCode) : "",
    };
  },

  toJSON(message: Format_Localization): unknown {
    const obj: any = {};
    message.i18nCode !== undefined && (obj.i18nCode = message.i18nCode);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Format_Localization>, I>>(
    object: I
  ): Format_Localization {
    const message = createBaseFormat_Localization();
    message.i18nCode = object.i18nCode ?? "";
    return message;
  },
};

function createBaseFormattedText(): FormattedText {
  return { text: "", format: [] };
}

export const FormattedText = {
  encode(message: FormattedText, writer: Writer = Writer.create()): Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    for (const v of message.format) {
      Format.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FormattedText {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormattedText();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.format.push(Format.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FormattedText {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      format: Array.isArray(object?.format)
        ? object.format.map((e: any) => Format.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FormattedText): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    if (message.format) {
      obj.format = message.format.map((e) =>
        e ? Format.toJSON(e) : undefined
      );
    } else {
      obj.format = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FormattedText>, I>>(
    object: I
  ): FormattedText {
    const message = createBaseFormattedText();
    message.text = object.text ?? "";
    message.format = object.format?.map((e) => Format.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMessage(): Message {
  return {
    metadata: undefined,
    overrides: undefined,
    authorId: 0,
    createdAt: 0,
    editedAt: undefined,
    inReplyTo: undefined,
    content: undefined,
    reactions: [],
  };
}

export const Message = {
  encode(message: Message, writer: Writer = Writer.create()): Writer {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
    }
    if (message.overrides !== undefined) {
      Overrides.encode(message.overrides, writer.uint32(18).fork()).ldelim();
    }
    if (message.authorId !== 0) {
      writer.uint32(24).uint64(message.authorId);
    }
    if (message.createdAt !== 0) {
      writer.uint32(32).uint64(message.createdAt);
    }
    if (message.editedAt !== undefined) {
      writer.uint32(40).uint64(message.editedAt);
    }
    if (message.inReplyTo !== undefined) {
      writer.uint32(48).uint64(message.inReplyTo);
    }
    if (message.content !== undefined) {
      Content.encode(message.content, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.reactions) {
      Reaction.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Message {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        case 2:
          message.overrides = Overrides.decode(reader, reader.uint32());
          break;
        case 3:
          message.authorId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.createdAt = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.editedAt = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.inReplyTo = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.content = Content.decode(reader, reader.uint32());
          break;
        case 8:
          message.reactions.push(Reaction.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Message {
    return {
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
      overrides: isSet(object.overrides)
        ? Overrides.fromJSON(object.overrides)
        : undefined,
      authorId: isSet(object.authorId) ? Number(object.authorId) : 0,
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
      editedAt: isSet(object.editedAt) ? Number(object.editedAt) : undefined,
      inReplyTo: isSet(object.inReplyTo) ? Number(object.inReplyTo) : undefined,
      content: isSet(object.content)
        ? Content.fromJSON(object.content)
        : undefined,
      reactions: Array.isArray(object?.reactions)
        ? object.reactions.map((e: any) => Reaction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Message): unknown {
    const obj: any = {};
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    message.overrides !== undefined &&
      (obj.overrides = message.overrides
        ? Overrides.toJSON(message.overrides)
        : undefined);
    message.authorId !== undefined &&
      (obj.authorId = Math.round(message.authorId));
    message.createdAt !== undefined &&
      (obj.createdAt = Math.round(message.createdAt));
    message.editedAt !== undefined &&
      (obj.editedAt = Math.round(message.editedAt));
    message.inReplyTo !== undefined &&
      (obj.inReplyTo = Math.round(message.inReplyTo));
    message.content !== undefined &&
      (obj.content = message.content
        ? Content.toJSON(message.content)
        : undefined);
    if (message.reactions) {
      obj.reactions = message.reactions.map((e) =>
        e ? Reaction.toJSON(e) : undefined
      );
    } else {
      obj.reactions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Message>, I>>(object: I): Message {
    const message = createBaseMessage();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    message.overrides =
      object.overrides !== undefined && object.overrides !== null
        ? Overrides.fromPartial(object.overrides)
        : undefined;
    message.authorId = object.authorId ?? 0;
    message.createdAt = object.createdAt ?? 0;
    message.editedAt = object.editedAt ?? undefined;
    message.inReplyTo = object.inReplyTo ?? undefined;
    message.content =
      object.content !== undefined && object.content !== null
        ? Content.fromPartial(object.content)
        : undefined;
    message.reactions =
      object.reactions?.map((e) => Reaction.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMessageWithId(): MessageWithId {
  return { messageId: 0, message: undefined };
}

export const MessageWithId = {
  encode(message: MessageWithId, writer: Writer = Writer.create()): Writer {
    if (message.messageId !== 0) {
      writer.uint32(8).uint64(message.messageId);
    }
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MessageWithId {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageWithId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.message = Message.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageWithId {
    return {
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      message: isSet(object.message)
        ? Message.fromJSON(object.message)
        : undefined,
    };
  },

  toJSON(message: MessageWithId): unknown {
    const obj: any = {};
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.message !== undefined &&
      (obj.message = message.message
        ? Message.toJSON(message.message)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MessageWithId>, I>>(
    object: I
  ): MessageWithId {
    const message = createBaseMessageWithId();
    message.messageId = object.messageId ?? 0;
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined;
    return message;
  },
};

function createBaseGetChannelMessagesRequest(): GetChannelMessagesRequest {
  return {
    guildId: 0,
    channelId: 0,
    messageId: undefined,
    direction: undefined,
    count: undefined,
  };
}

export const GetChannelMessagesRequest = {
  encode(
    message: GetChannelMessagesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== undefined) {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.direction !== undefined) {
      writer.uint32(32).int32(message.direction);
    }
    if (message.count !== undefined) {
      writer.uint32(40).uint32(message.count);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetChannelMessagesRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetChannelMessagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.direction = reader.int32() as any;
          break;
        case 5:
          message.count = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetChannelMessagesRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : undefined,
      direction: isSet(object.direction)
        ? getChannelMessagesRequest_DirectionFromJSON(object.direction)
        : undefined,
      count: isSet(object.count) ? Number(object.count) : undefined,
    };
  },

  toJSON(message: GetChannelMessagesRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.direction !== undefined &&
      (obj.direction =
        message.direction !== undefined
          ? getChannelMessagesRequest_DirectionToJSON(message.direction)
          : undefined);
    message.count !== undefined && (obj.count = Math.round(message.count));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetChannelMessagesRequest>, I>>(
    object: I
  ): GetChannelMessagesRequest {
    const message = createBaseGetChannelMessagesRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? undefined;
    message.direction = object.direction ?? undefined;
    message.count = object.count ?? undefined;
    return message;
  },
};

function createBaseGetChannelMessagesResponse(): GetChannelMessagesResponse {
  return { reachedTop: false, reachedBottom: false, messages: [] };
}

export const GetChannelMessagesResponse = {
  encode(
    message: GetChannelMessagesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.reachedTop === true) {
      writer.uint32(8).bool(message.reachedTop);
    }
    if (message.reachedBottom === true) {
      writer.uint32(16).bool(message.reachedBottom);
    }
    for (const v of message.messages) {
      MessageWithId.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetChannelMessagesResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetChannelMessagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reachedTop = reader.bool();
          break;
        case 2:
          message.reachedBottom = reader.bool();
          break;
        case 3:
          message.messages.push(MessageWithId.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetChannelMessagesResponse {
    return {
      reachedTop: isSet(object.reachedTop) ? Boolean(object.reachedTop) : false,
      reachedBottom: isSet(object.reachedBottom)
        ? Boolean(object.reachedBottom)
        : false,
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => MessageWithId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetChannelMessagesResponse): unknown {
    const obj: any = {};
    message.reachedTop !== undefined && (obj.reachedTop = message.reachedTop);
    message.reachedBottom !== undefined &&
      (obj.reachedBottom = message.reachedBottom);
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? MessageWithId.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetChannelMessagesResponse>, I>>(
    object: I
  ): GetChannelMessagesResponse {
    const message = createBaseGetChannelMessagesResponse();
    message.reachedTop = object.reachedTop ?? false;
    message.reachedBottom = object.reachedBottom ?? false;
    message.messages =
      object.messages?.map((e) => MessageWithId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetMessageRequest(): GetMessageRequest {
  return { guildId: 0, channelId: 0, messageId: 0 };
}

export const GetMessageRequest = {
  encode(message: GetMessageRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetMessageRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
    };
  },

  toJSON(message: GetMessageRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetMessageRequest>, I>>(
    object: I
  ): GetMessageRequest {
    const message = createBaseGetMessageRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    return message;
  },
};

function createBaseGetMessageResponse(): GetMessageResponse {
  return { message: undefined };
}

export const GetMessageResponse = {
  encode(
    message: GetMessageResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.message !== undefined) {
      Message.encode(message.message, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetMessageResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = Message.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetMessageResponse {
    return {
      message: isSet(object.message)
        ? Message.fromJSON(object.message)
        : undefined,
    };
  },

  toJSON(message: GetMessageResponse): unknown {
    const obj: any = {};
    message.message !== undefined &&
      (obj.message = message.message
        ? Message.toJSON(message.message)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetMessageResponse>, I>>(
    object: I
  ): GetMessageResponse {
    const message = createBaseGetMessageResponse();
    message.message =
      object.message !== undefined && object.message !== null
        ? Message.fromPartial(object.message)
        : undefined;
    return message;
  },
};

function createBaseDeleteMessageRequest(): DeleteMessageRequest {
  return { guildId: 0, channelId: 0, messageId: 0 };
}

export const DeleteMessageRequest = {
  encode(
    message: DeleteMessageRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteMessageRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
    };
  },

  toJSON(message: DeleteMessageRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteMessageRequest>, I>>(
    object: I
  ): DeleteMessageRequest {
    const message = createBaseDeleteMessageRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    return message;
  },
};

function createBaseDeleteMessageResponse(): DeleteMessageResponse {
  return {};
}

export const DeleteMessageResponse = {
  encode(_: DeleteMessageResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DeleteMessageResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteMessageResponse();
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

  fromJSON(_: any): DeleteMessageResponse {
    return {};
  },

  toJSON(_: DeleteMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteMessageResponse>, I>>(
    _: I
  ): DeleteMessageResponse {
    const message = createBaseDeleteMessageResponse();
    return message;
  },
};

function createBaseTriggerActionRequest(): TriggerActionRequest {
  return { guildId: 0, channelId: 0, messageId: 0, payload: undefined };
}

export const TriggerActionRequest = {
  encode(
    message: TriggerActionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.payload !== undefined) {
      ActionPayload.encode(message.payload, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TriggerActionRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTriggerActionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.payload = ActionPayload.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TriggerActionRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      payload: isSet(object.payload)
        ? ActionPayload.fromJSON(object.payload)
        : undefined,
    };
  },

  toJSON(message: TriggerActionRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.payload !== undefined &&
      (obj.payload = message.payload
        ? ActionPayload.toJSON(message.payload)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TriggerActionRequest>, I>>(
    object: I
  ): TriggerActionRequest {
    const message = createBaseTriggerActionRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    message.payload =
      object.payload !== undefined && object.payload !== null
        ? ActionPayload.fromPartial(object.payload)
        : undefined;
    return message;
  },
};

function createBaseTriggerActionResponse(): TriggerActionResponse {
  return {};
}

export const TriggerActionResponse = {
  encode(_: TriggerActionResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): TriggerActionResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTriggerActionResponse();
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

  fromJSON(_: any): TriggerActionResponse {
    return {};
  },

  toJSON(_: TriggerActionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TriggerActionResponse>, I>>(
    _: I
  ): TriggerActionResponse {
    const message = createBaseTriggerActionResponse();
    return message;
  },
};

function createBaseSendMessageRequest(): SendMessageRequest {
  return {
    guildId: 0,
    channelId: 0,
    content: undefined,
    echoId: undefined,
    overrides: undefined,
    inReplyTo: undefined,
    metadata: undefined,
  };
}

export const SendMessageRequest = {
  encode(
    message: SendMessageRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.content !== undefined) {
      SendMessageRequest_Content.encode(
        message.content,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.echoId !== undefined) {
      writer.uint32(32).uint64(message.echoId);
    }
    if (message.overrides !== undefined) {
      Overrides.encode(message.overrides, writer.uint32(50).fork()).ldelim();
    }
    if (message.inReplyTo !== undefined) {
      writer.uint32(56).uint64(message.inReplyTo);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SendMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.content = SendMessageRequest_Content.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.echoId = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.overrides = Overrides.decode(reader, reader.uint32());
          break;
        case 7:
          message.inReplyTo = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendMessageRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      content: isSet(object.content)
        ? SendMessageRequest_Content.fromJSON(object.content)
        : undefined,
      echoId: isSet(object.echoId) ? Number(object.echoId) : undefined,
      overrides: isSet(object.overrides)
        ? Overrides.fromJSON(object.overrides)
        : undefined,
      inReplyTo: isSet(object.inReplyTo) ? Number(object.inReplyTo) : undefined,
      metadata: isSet(object.metadata)
        ? Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: SendMessageRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.content !== undefined &&
      (obj.content = message.content
        ? SendMessageRequest_Content.toJSON(message.content)
        : undefined);
    message.echoId !== undefined && (obj.echoId = Math.round(message.echoId));
    message.overrides !== undefined &&
      (obj.overrides = message.overrides
        ? Overrides.toJSON(message.overrides)
        : undefined);
    message.inReplyTo !== undefined &&
      (obj.inReplyTo = Math.round(message.inReplyTo));
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendMessageRequest>, I>>(
    object: I
  ): SendMessageRequest {
    const message = createBaseSendMessageRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.content =
      object.content !== undefined && object.content !== null
        ? SendMessageRequest_Content.fromPartial(object.content)
        : undefined;
    message.echoId = object.echoId ?? undefined;
    message.overrides =
      object.overrides !== undefined && object.overrides !== null
        ? Overrides.fromPartial(object.overrides)
        : undefined;
    message.inReplyTo = object.inReplyTo ?? undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseSendMessageRequest_ImageInfo(): SendMessageRequest_ImageInfo {
  return { caption: undefined, useOriginal: false };
}

export const SendMessageRequest_ImageInfo = {
  encode(
    message: SendMessageRequest_ImageInfo,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.caption !== undefined) {
      writer.uint32(10).string(message.caption);
    }
    if (message.useOriginal === true) {
      writer.uint32(16).bool(message.useOriginal);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SendMessageRequest_ImageInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMessageRequest_ImageInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.caption = reader.string();
          break;
        case 2:
          message.useOriginal = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendMessageRequest_ImageInfo {
    return {
      caption: isSet(object.caption) ? String(object.caption) : undefined,
      useOriginal: isSet(object.useOriginal)
        ? Boolean(object.useOriginal)
        : false,
    };
  },

  toJSON(message: SendMessageRequest_ImageInfo): unknown {
    const obj: any = {};
    message.caption !== undefined && (obj.caption = message.caption);
    message.useOriginal !== undefined &&
      (obj.useOriginal = message.useOriginal);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendMessageRequest_ImageInfo>, I>>(
    object: I
  ): SendMessageRequest_ImageInfo {
    const message = createBaseSendMessageRequest_ImageInfo();
    message.caption = object.caption ?? undefined;
    message.useOriginal = object.useOriginal ?? false;
    return message;
  },
};

function createBaseSendMessageRequest_Attachment(): SendMessageRequest_Attachment {
  return { id: "", name: "", image: undefined };
}

export const SendMessageRequest_Attachment = {
  encode(
    message: SendMessageRequest_Attachment,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.image !== undefined) {
      SendMessageRequest_ImageInfo.encode(
        message.image,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SendMessageRequest_Attachment {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMessageRequest_Attachment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.image = SendMessageRequest_ImageInfo.decode(
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

  fromJSON(object: any): SendMessageRequest_Attachment {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      image: isSet(object.image)
        ? SendMessageRequest_ImageInfo.fromJSON(object.image)
        : undefined,
    };
  },

  toJSON(message: SendMessageRequest_Attachment): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.image !== undefined &&
      (obj.image = message.image
        ? SendMessageRequest_ImageInfo.toJSON(message.image)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendMessageRequest_Attachment>, I>>(
    object: I
  ): SendMessageRequest_Attachment {
    const message = createBaseSendMessageRequest_Attachment();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.image =
      object.image !== undefined && object.image !== null
        ? SendMessageRequest_ImageInfo.fromPartial(object.image)
        : undefined;
    return message;
  },
};

function createBaseSendMessageRequest_Content(): SendMessageRequest_Content {
  return {
    text: "",
    textFormats: [],
    attachments: undefined,
    embeds: undefined,
  };
}

export const SendMessageRequest_Content = {
  encode(
    message: SendMessageRequest_Content,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    for (const v of message.textFormats) {
      Format.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.attachments !== undefined) {
      SendMessageRequest_Content_Attachments.encode(
        message.attachments,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.embeds !== undefined) {
      SendMessageRequest_Content_Embeds.encode(
        message.embeds,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SendMessageRequest_Content {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMessageRequest_Content();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.textFormats.push(Format.decode(reader, reader.uint32()));
          break;
        case 3:
          message.attachments = SendMessageRequest_Content_Attachments.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.embeds = SendMessageRequest_Content_Embeds.decode(
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

  fromJSON(object: any): SendMessageRequest_Content {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      textFormats: Array.isArray(object?.textFormats)
        ? object.textFormats.map((e: any) => Format.fromJSON(e))
        : [],
      attachments: isSet(object.attachments)
        ? SendMessageRequest_Content_Attachments.fromJSON(object.attachments)
        : undefined,
      embeds: isSet(object.embeds)
        ? SendMessageRequest_Content_Embeds.fromJSON(object.embeds)
        : undefined,
    };
  },

  toJSON(message: SendMessageRequest_Content): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    if (message.textFormats) {
      obj.textFormats = message.textFormats.map((e) =>
        e ? Format.toJSON(e) : undefined
      );
    } else {
      obj.textFormats = [];
    }
    message.attachments !== undefined &&
      (obj.attachments = message.attachments
        ? SendMessageRequest_Content_Attachments.toJSON(message.attachments)
        : undefined);
    message.embeds !== undefined &&
      (obj.embeds = message.embeds
        ? SendMessageRequest_Content_Embeds.toJSON(message.embeds)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendMessageRequest_Content>, I>>(
    object: I
  ): SendMessageRequest_Content {
    const message = createBaseSendMessageRequest_Content();
    message.text = object.text ?? "";
    message.textFormats =
      object.textFormats?.map((e) => Format.fromPartial(e)) || [];
    message.attachments =
      object.attachments !== undefined && object.attachments !== null
        ? SendMessageRequest_Content_Attachments.fromPartial(object.attachments)
        : undefined;
    message.embeds =
      object.embeds !== undefined && object.embeds !== null
        ? SendMessageRequest_Content_Embeds.fromPartial(object.embeds)
        : undefined;
    return message;
  },
};

function createBaseSendMessageRequest_Content_Attachments(): SendMessageRequest_Content_Attachments {
  return { attachments: [] };
}

export const SendMessageRequest_Content_Attachments = {
  encode(
    message: SendMessageRequest_Content_Attachments,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.attachments) {
      SendMessageRequest_Attachment.encode(
        v!,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SendMessageRequest_Content_Attachments {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMessageRequest_Content_Attachments();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.attachments.push(
            SendMessageRequest_Attachment.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendMessageRequest_Content_Attachments {
    return {
      attachments: Array.isArray(object?.attachments)
        ? object.attachments.map((e: any) =>
            SendMessageRequest_Attachment.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: SendMessageRequest_Content_Attachments): unknown {
    const obj: any = {};
    if (message.attachments) {
      obj.attachments = message.attachments.map((e) =>
        e ? SendMessageRequest_Attachment.toJSON(e) : undefined
      );
    } else {
      obj.attachments = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<SendMessageRequest_Content_Attachments>, I>
  >(object: I): SendMessageRequest_Content_Attachments {
    const message = createBaseSendMessageRequest_Content_Attachments();
    message.attachments =
      object.attachments?.map((e) =>
        SendMessageRequest_Attachment.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseSendMessageRequest_Content_Embeds(): SendMessageRequest_Content_Embeds {
  return { embeds: [] };
}

export const SendMessageRequest_Content_Embeds = {
  encode(
    message: SendMessageRequest_Content_Embeds,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.embeds) {
      Embed.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SendMessageRequest_Content_Embeds {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMessageRequest_Content_Embeds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.embeds.push(Embed.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendMessageRequest_Content_Embeds {
    return {
      embeds: Array.isArray(object?.embeds)
        ? object.embeds.map((e: any) => Embed.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SendMessageRequest_Content_Embeds): unknown {
    const obj: any = {};
    if (message.embeds) {
      obj.embeds = message.embeds.map((e) => (e ? Embed.toJSON(e) : undefined));
    } else {
      obj.embeds = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<SendMessageRequest_Content_Embeds>, I>
  >(object: I): SendMessageRequest_Content_Embeds {
    const message = createBaseSendMessageRequest_Content_Embeds();
    message.embeds = object.embeds?.map((e) => Embed.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendMessageResponse(): SendMessageResponse {
  return { messageId: 0 };
}

export const SendMessageResponse = {
  encode(
    message: SendMessageResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.messageId !== 0) {
      writer.uint32(8).uint64(message.messageId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SendMessageResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendMessageResponse {
    return {
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
    };
  },

  toJSON(message: SendMessageResponse): unknown {
    const obj: any = {};
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendMessageResponse>, I>>(
    object: I
  ): SendMessageResponse {
    const message = createBaseSendMessageResponse();
    message.messageId = object.messageId ?? 0;
    return message;
  },
};

function createBaseUpdateMessageTextRequest(): UpdateMessageTextRequest {
  return { guildId: 0, channelId: 0, messageId: 0, newContent: undefined };
}

export const UpdateMessageTextRequest = {
  encode(
    message: UpdateMessageTextRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.newContent !== undefined) {
      FormattedText.encode(
        message.newContent,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpdateMessageTextRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMessageTextRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.newContent = FormattedText.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateMessageTextRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      newContent: isSet(object.newContent)
        ? FormattedText.fromJSON(object.newContent)
        : undefined,
    };
  },

  toJSON(message: UpdateMessageTextRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.newContent !== undefined &&
      (obj.newContent = message.newContent
        ? FormattedText.toJSON(message.newContent)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateMessageTextRequest>, I>>(
    object: I
  ): UpdateMessageTextRequest {
    const message = createBaseUpdateMessageTextRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    message.newContent =
      object.newContent !== undefined && object.newContent !== null
        ? FormattedText.fromPartial(object.newContent)
        : undefined;
    return message;
  },
};

function createBaseUpdateMessageTextResponse(): UpdateMessageTextResponse {
  return {};
}

export const UpdateMessageTextResponse = {
  encode(
    _: UpdateMessageTextResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): UpdateMessageTextResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateMessageTextResponse();
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

  fromJSON(_: any): UpdateMessageTextResponse {
    return {};
  },

  toJSON(_: UpdateMessageTextResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateMessageTextResponse>, I>>(
    _: I
  ): UpdateMessageTextResponse {
    const message = createBaseUpdateMessageTextResponse();
    return message;
  },
};

function createBasePinMessageRequest(): PinMessageRequest {
  return { guildId: 0, channelId: 0, messageId: 0 };
}

export const PinMessageRequest = {
  encode(message: PinMessageRequest, writer: Writer = Writer.create()): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PinMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePinMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PinMessageRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
    };
  },

  toJSON(message: PinMessageRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PinMessageRequest>, I>>(
    object: I
  ): PinMessageRequest {
    const message = createBasePinMessageRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    return message;
  },
};

function createBasePinMessageResponse(): PinMessageResponse {
  return {};
}

export const PinMessageResponse = {
  encode(_: PinMessageResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PinMessageResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePinMessageResponse();
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

  fromJSON(_: any): PinMessageResponse {
    return {};
  },

  toJSON(_: PinMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PinMessageResponse>, I>>(
    _: I
  ): PinMessageResponse {
    const message = createBasePinMessageResponse();
    return message;
  },
};

function createBaseUnpinMessageRequest(): UnpinMessageRequest {
  return { guildId: 0, channelId: 0, messageId: 0 };
}

export const UnpinMessageRequest = {
  encode(
    message: UnpinMessageRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UnpinMessageRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnpinMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnpinMessageRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
    };
  },

  toJSON(message: UnpinMessageRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnpinMessageRequest>, I>>(
    object: I
  ): UnpinMessageRequest {
    const message = createBaseUnpinMessageRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    return message;
  },
};

function createBaseUnpinMessageResponse(): UnpinMessageResponse {
  return {};
}

export const UnpinMessageResponse = {
  encode(_: UnpinMessageResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UnpinMessageResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnpinMessageResponse();
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

  fromJSON(_: any): UnpinMessageResponse {
    return {};
  },

  toJSON(_: UnpinMessageResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnpinMessageResponse>, I>>(
    _: I
  ): UnpinMessageResponse {
    const message = createBaseUnpinMessageResponse();
    return message;
  },
};

function createBaseGetPinnedMessagesRequest(): GetPinnedMessagesRequest {
  return { guildId: 0, channelId: 0 };
}

export const GetPinnedMessagesRequest = {
  encode(
    message: GetPinnedMessagesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetPinnedMessagesRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPinnedMessagesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPinnedMessagesRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
    };
  },

  toJSON(message: GetPinnedMessagesRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPinnedMessagesRequest>, I>>(
    object: I
  ): GetPinnedMessagesRequest {
    const message = createBaseGetPinnedMessagesRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    return message;
  },
};

function createBaseGetPinnedMessagesResponse(): GetPinnedMessagesResponse {
  return { pinnedMessageIds: [] };
}

export const GetPinnedMessagesResponse = {
  encode(
    message: GetPinnedMessagesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    writer.uint32(10).fork();
    for (const v of message.pinnedMessageIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): GetPinnedMessagesResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPinnedMessagesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.pinnedMessageIds.push(
                longToNumber(reader.uint64() as Long)
              );
            }
          } else {
            message.pinnedMessageIds.push(
              longToNumber(reader.uint64() as Long)
            );
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPinnedMessagesResponse {
    return {
      pinnedMessageIds: Array.isArray(object?.pinnedMessageIds)
        ? object.pinnedMessageIds.map((e: any) => Number(e))
        : [],
    };
  },

  toJSON(message: GetPinnedMessagesResponse): unknown {
    const obj: any = {};
    if (message.pinnedMessageIds) {
      obj.pinnedMessageIds = message.pinnedMessageIds.map((e) => Math.round(e));
    } else {
      obj.pinnedMessageIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPinnedMessagesResponse>, I>>(
    object: I
  ): GetPinnedMessagesResponse {
    const message = createBaseGetPinnedMessagesResponse();
    message.pinnedMessageIds = object.pinnedMessageIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseAddReactionRequest(): AddReactionRequest {
  return { guildId: 0, channelId: 0, messageId: 0, emote: undefined };
}

export const AddReactionRequest = {
  encode(
    message: AddReactionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.emote !== undefined) {
      Emote.encode(message.emote, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddReactionRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddReactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.emote = Emote.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddReactionRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      emote: isSet(object.emote) ? Emote.fromJSON(object.emote) : undefined,
    };
  },

  toJSON(message: AddReactionRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.emote !== undefined &&
      (obj.emote = message.emote ? Emote.toJSON(message.emote) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddReactionRequest>, I>>(
    object: I
  ): AddReactionRequest {
    const message = createBaseAddReactionRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    message.emote =
      object.emote !== undefined && object.emote !== null
        ? Emote.fromPartial(object.emote)
        : undefined;
    return message;
  },
};

function createBaseAddReactionResponse(): AddReactionResponse {
  return {};
}

export const AddReactionResponse = {
  encode(_: AddReactionResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): AddReactionResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddReactionResponse();
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

  fromJSON(_: any): AddReactionResponse {
    return {};
  },

  toJSON(_: AddReactionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddReactionResponse>, I>>(
    _: I
  ): AddReactionResponse {
    const message = createBaseAddReactionResponse();
    return message;
  },
};

function createBaseRemoveReactionRequest(): RemoveReactionRequest {
  return { guildId: 0, channelId: 0, messageId: 0, emote: undefined };
}

export const RemoveReactionRequest = {
  encode(
    message: RemoveReactionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.guildId !== 0) {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== 0) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.messageId !== 0) {
      writer.uint32(24).uint64(message.messageId);
    }
    if (message.emote !== undefined) {
      Emote.encode(message.emote, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RemoveReactionRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveReactionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.messageId = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.emote = Emote.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveReactionRequest {
    return {
      guildId: isSet(object.guildId) ? Number(object.guildId) : 0,
      channelId: isSet(object.channelId) ? Number(object.channelId) : 0,
      messageId: isSet(object.messageId) ? Number(object.messageId) : 0,
      emote: isSet(object.emote) ? Emote.fromJSON(object.emote) : undefined,
    };
  },

  toJSON(message: RemoveReactionRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined &&
      (obj.guildId = Math.round(message.guildId));
    message.channelId !== undefined &&
      (obj.channelId = Math.round(message.channelId));
    message.messageId !== undefined &&
      (obj.messageId = Math.round(message.messageId));
    message.emote !== undefined &&
      (obj.emote = message.emote ? Emote.toJSON(message.emote) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveReactionRequest>, I>>(
    object: I
  ): RemoveReactionRequest {
    const message = createBaseRemoveReactionRequest();
    message.guildId = object.guildId ?? 0;
    message.channelId = object.channelId ?? 0;
    message.messageId = object.messageId ?? 0;
    message.emote =
      object.emote !== undefined && object.emote !== null
        ? Emote.fromPartial(object.emote)
        : undefined;
    return message;
  },
};

function createBaseRemoveReactionResponse(): RemoveReactionResponse {
  return {};
}

export const RemoveReactionResponse = {
  encode(_: RemoveReactionResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RemoveReactionResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveReactionResponse();
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

  fromJSON(_: any): RemoveReactionResponse {
    return {};
  },

  toJSON(_: RemoveReactionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveReactionResponse>, I>>(
    _: I
  ): RemoveReactionResponse {
    const message = createBaseRemoveReactionResponse();
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
