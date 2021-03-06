/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ItemPosition } from "../../harmonytypes/v1/types";

export const protobufPackage = "protocol.chat.v1";

/** Object representing a single permission node. */
export interface Permission {
  /** The permission matcher. (example: roles.manage). */
  matches: string;
  /** Whether the permission is allowed or not. */
  ok: boolean;
}

/** Object representing a role without the ID. */
export interface Role {
  /** The role name. */
  name: string;
  /** The role color. */
  color: number;
  /** Whether the role is hoisted or not. */
  hoist: boolean;
  /** Whether the role is mentionable or not. */
  pingable: boolean;
}

/**
 * Object representing a role with it's ID.
 *
 * The role ID for the default role in a guild should always be 0.
 */
export interface RoleWithId {
  /** ID of the role. */
  roleId: string;
  /** The role data. */
  role?: Role;
}

/** Used in the `HasPermission` endpoint. */
export interface HasPermissionRequest {
  /** The guild ID to query permissions for. */
  guildId: string;
  /**
   * The channel ID to query permissions for. If not set, it will query
   * permissions for the guild.
   */
  channelId?: string | undefined;
  /**
   * The user ID to query permissions for (if not provided, the current user is
   * assumed).
   */
  as?: string | undefined;
  /** The permission node(s) to check for. */
  checkFor: string[];
}

/** Used in the `HasPermission` endpoint. */
export interface HasPermissionResponse {
  /** The permissions for the requested node(s). */
  perms: Permission[];
}

/** Used in the `SetPermissions` endpoint. */
export interface SetPermissionsRequest {
  /** The guild ID to set permissions for. */
  guildId: string;
  /**
   * The channel ID to set permissions for. Only set if the role is for a
   * channel.
   */
  channelId?: string | undefined;
  /** The role ID to set permissions for. */
  roleId: string;
  /**
   * The permission list to give.
   *
   * There is no "perms_to_take" because not given permissions are by
   * default not allowed.
   */
  permsToGive: Permission[];
}

/** Used in the `SetPermissions` endpoint. */
export interface SetPermissionsResponse {}

/** Used in the `GetPermissions` endpoint. */
export interface GetPermissionsRequest {
  /** The guild ID to get permissions for. */
  guildId: string;
  /**
   * The channel ID(s) to get permissions for. Only applicable for roles in a
   * channel.
   */
  channelIds: string[];
  /** The role ID to get permissions for. */
  roleId: string;
}

/** Used in the `GetPermissions` endpoint. */
export interface GetPermissionsResponse {
  /** The permissions for the guild. */
  guildPerms?: GetPermissionsResponse_Permissions;
  /**
   * The channel id -> permissions list map for the given role.
   *
   * This will contain permissions for any requested channels.
   */
  channelPerms: { [key: string]: GetPermissionsResponse_Permissions };
}

/** Permissions of a role for a channel or guild. */
export interface GetPermissionsResponse_Permissions {
  /** The permissions. */
  perms: Permission[];
}

export interface GetPermissionsResponse_ChannelPermsEntry {
  key: string;
  value?: GetPermissionsResponse_Permissions;
}

/** Used in the `MoveRole` endpoint. */
export interface MoveRoleRequest {
  /** The guild ID to move the role in. */
  guildId: string;
  /** The role ID to move. */
  roleId: string;
  /** The new position of the role. */
  newPosition?: ItemPosition;
}

/** Used in the `MoveRole` endpoint. */
export interface MoveRoleResponse {}

/** Used in the `GetGuildRoles` endpoint. */
export interface GetGuildRolesRequest {
  /** The guild ID to get roles for. */
  guildId: string;
}

/** Used in the `GetGuildRoles` endpoint. */
export interface GetGuildRolesResponse {
  /** The list of roles in the guild. */
  roles: RoleWithId[];
}

/** Used in the `AddGuildRole` endpoint. */
export interface AddGuildRoleRequest {
  /** The guild ID to add the role to. */
  guildId: string;
  /** The role name. */
  name: string;
  /** The role color. */
  color: number;
  /** Whether the role is hoisted or not. */
  hoist: boolean;
  /** Whether the role is mentionable or not. */
  pingable: boolean;
}

/** Used in the `AddGuildRole` endpoint. */
export interface AddGuildRoleResponse {
  /** The ID of the newly created role. */
  roleId: string;
}

/** Used in the `DeleteGuildRole` endpoint. */
export interface DeleteGuildRoleRequest {
  /** The guild ID to delete the role from. */
  guildId: string;
  /** The role ID to delete. */
  roleId: string;
}

/** Used in the `DeleteGuildRole` endpoint. */
export interface DeleteGuildRoleResponse {}

/** Used in the `ModifyGuildRole` endpoint. */
export interface ModifyGuildRoleRequest {
  /** The ID of the guild where the role is located. */
  guildId: string;
  /** The ID of the role to modify. */
  roleId: string;
  /** The new name of the role. */
  newName?: string | undefined;
  /** The new color of the role. */
  newColor?: number | undefined;
  /** The new hoist status of the role. */
  newHoist?: boolean | undefined;
  /** The new pingable status of the role. */
  newPingable?: boolean | undefined;
}

/** Used in the `ModifyGuildRole` endpoint. */
export interface ModifyGuildRoleResponse {}

/** Used in the `ManageUserRoles` endpoint. */
export interface ManageUserRolesRequest {
  /** The ID of the guild where the user is being managed. */
  guildId: string;
  /** The ID of the user to modify. */
  userId: string;
  /** The IDs of the roles to add. */
  giveRoleIds: string[];
  /** The IDs of the roles to remove. */
  takeRoleIds: string[];
}

/** Used in the `ManageUserRoles` endpoint. */
export interface ManageUserRolesResponse {}

/** Used in the `GetUserRoles` endpoint. */
export interface GetUserRolesRequest {
  /** The ID of the guild where the user(s) are located. */
  guildId: string;
  /** The ID(s) of the user to get roles for. */
  userIds: string[];
}

/** Used in the `GetUserRoles` endpoint. */
export interface GetUserRolesResponse {
  /** User ID -> user role IDs map for the requested user(s). */
  userRoles: { [key: string]: GetUserRolesResponse_UserRoles };
}

/** Contains role IDs for a user in a guild. */
export interface GetUserRolesResponse_UserRoles {
  /** A list of IDs of the roles the user has. */
  roles: string[];
}

export interface GetUserRolesResponse_UserRolesEntry {
  key: string;
  value?: GetUserRolesResponse_UserRoles;
}

function createBasePermission(): Permission {
  return { matches: "", ok: false };
}

export const Permission = {
  encode(
    message: Permission,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.matches !== "") {
      writer.uint32(10).string(message.matches);
    }
    if (message.ok === true) {
      writer.uint32(16).bool(message.ok);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Permission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePermission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.matches = reader.string();
          break;
        case 2:
          message.ok = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Permission {
    return {
      matches: isSet(object.matches) ? String(object.matches) : "",
      ok: isSet(object.ok) ? Boolean(object.ok) : false,
    };
  },

  toJSON(message: Permission): unknown {
    const obj: any = {};
    message.matches !== undefined && (obj.matches = message.matches);
    message.ok !== undefined && (obj.ok = message.ok);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Permission>, I>>(
    object: I
  ): Permission {
    const message = createBasePermission();
    message.matches = object.matches ?? "";
    message.ok = object.ok ?? false;
    return message;
  },
};

function createBaseRole(): Role {
  return { name: "", color: 0, hoist: false, pingable: false };
}

export const Role = {
  encode(message: Role, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.color !== 0) {
      writer.uint32(16).int32(message.color);
    }
    if (message.hoist === true) {
      writer.uint32(24).bool(message.hoist);
    }
    if (message.pingable === true) {
      writer.uint32(32).bool(message.pingable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Role {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRole();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.color = reader.int32();
          break;
        case 3:
          message.hoist = reader.bool();
          break;
        case 4:
          message.pingable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Role {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      color: isSet(object.color) ? Number(object.color) : 0,
      hoist: isSet(object.hoist) ? Boolean(object.hoist) : false,
      pingable: isSet(object.pingable) ? Boolean(object.pingable) : false,
    };
  },

  toJSON(message: Role): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = Math.round(message.color));
    message.hoist !== undefined && (obj.hoist = message.hoist);
    message.pingable !== undefined && (obj.pingable = message.pingable);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Role>, I>>(object: I): Role {
    const message = createBaseRole();
    message.name = object.name ?? "";
    message.color = object.color ?? 0;
    message.hoist = object.hoist ?? false;
    message.pingable = object.pingable ?? false;
    return message;
  },
};

function createBaseRoleWithId(): RoleWithId {
  return { roleId: "0", role: undefined };
}

export const RoleWithId = {
  encode(
    message: RoleWithId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.roleId !== "0") {
      writer.uint32(8).uint64(message.roleId);
    }
    if (message.role !== undefined) {
      Role.encode(message.role, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoleWithId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoleWithId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roleId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.role = Role.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RoleWithId {
    return {
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
      role: isSet(object.role) ? Role.fromJSON(object.role) : undefined,
    };
  },

  toJSON(message: RoleWithId): unknown {
    const obj: any = {};
    message.roleId !== undefined && (obj.roleId = message.roleId);
    message.role !== undefined &&
      (obj.role = message.role ? Role.toJSON(message.role) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RoleWithId>, I>>(
    object: I
  ): RoleWithId {
    const message = createBaseRoleWithId();
    message.roleId = object.roleId ?? "0";
    message.role =
      object.role !== undefined && object.role !== null
        ? Role.fromPartial(object.role)
        : undefined;
    return message;
  },
};

function createBaseHasPermissionRequest(): HasPermissionRequest {
  return { guildId: "0", channelId: undefined, as: undefined, checkFor: [] };
}

export const HasPermissionRequest = {
  encode(
    message: HasPermissionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== undefined) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.as !== undefined) {
      writer.uint32(32).uint64(message.as);
    }
    for (const v of message.checkFor) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): HasPermissionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHasPermissionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.as = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.checkFor.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HasPermissionRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : undefined,
      as: isSet(object.as) ? String(object.as) : undefined,
      checkFor: Array.isArray(object?.checkFor)
        ? object.checkFor.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: HasPermissionRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.as !== undefined && (obj.as = message.as);
    if (message.checkFor) {
      obj.checkFor = message.checkFor.map((e) => e);
    } else {
      obj.checkFor = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HasPermissionRequest>, I>>(
    object: I
  ): HasPermissionRequest {
    const message = createBaseHasPermissionRequest();
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? undefined;
    message.as = object.as ?? undefined;
    message.checkFor = object.checkFor?.map((e) => e) || [];
    return message;
  },
};

function createBaseHasPermissionResponse(): HasPermissionResponse {
  return { perms: [] };
}

export const HasPermissionResponse = {
  encode(
    message: HasPermissionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.perms) {
      Permission.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): HasPermissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHasPermissionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perms.push(Permission.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HasPermissionResponse {
    return {
      perms: Array.isArray(object?.perms)
        ? object.perms.map((e: any) => Permission.fromJSON(e))
        : [],
    };
  },

  toJSON(message: HasPermissionResponse): unknown {
    const obj: any = {};
    if (message.perms) {
      obj.perms = message.perms.map((e) =>
        e ? Permission.toJSON(e) : undefined
      );
    } else {
      obj.perms = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HasPermissionResponse>, I>>(
    object: I
  ): HasPermissionResponse {
    const message = createBaseHasPermissionResponse();
    message.perms = object.perms?.map((e) => Permission.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetPermissionsRequest(): SetPermissionsRequest {
  return { guildId: "0", channelId: undefined, roleId: "0", permsToGive: [] };
}

export const SetPermissionsRequest = {
  encode(
    message: SetPermissionsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.channelId !== undefined) {
      writer.uint32(16).uint64(message.channelId);
    }
    if (message.roleId !== "0") {
      writer.uint32(24).uint64(message.roleId);
    }
    for (const v of message.permsToGive) {
      Permission.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPermissionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPermissionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.channelId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.roleId = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.permsToGive.push(Permission.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SetPermissionsRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelId: isSet(object.channelId) ? String(object.channelId) : undefined,
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
      permsToGive: Array.isArray(object?.permsToGive)
        ? object.permsToGive.map((e: any) => Permission.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SetPermissionsRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
    if (message.permsToGive) {
      obj.permsToGive = message.permsToGive.map((e) =>
        e ? Permission.toJSON(e) : undefined
      );
    } else {
      obj.permsToGive = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPermissionsRequest>, I>>(
    object: I
  ): SetPermissionsRequest {
    const message = createBaseSetPermissionsRequest();
    message.guildId = object.guildId ?? "0";
    message.channelId = object.channelId ?? undefined;
    message.roleId = object.roleId ?? "0";
    message.permsToGive =
      object.permsToGive?.map((e) => Permission.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSetPermissionsResponse(): SetPermissionsResponse {
  return {};
}

export const SetPermissionsResponse = {
  encode(
    _: SetPermissionsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SetPermissionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetPermissionsResponse();
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

  fromJSON(_: any): SetPermissionsResponse {
    return {};
  },

  toJSON(_: SetPermissionsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SetPermissionsResponse>, I>>(
    _: I
  ): SetPermissionsResponse {
    const message = createBaseSetPermissionsResponse();
    return message;
  },
};

function createBaseGetPermissionsRequest(): GetPermissionsRequest {
  return { guildId: "0", channelIds: [], roleId: "0" };
}

export const GetPermissionsRequest = {
  encode(
    message: GetPermissionsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    writer.uint32(18).fork();
    for (const v of message.channelIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.roleId !== "0") {
      writer.uint32(24).uint64(message.roleId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPermissionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPermissionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.channelIds.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.channelIds.push(longToString(reader.uint64() as Long));
          }
          break;
        case 3:
          message.roleId = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPermissionsRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      channelIds: Array.isArray(object?.channelIds)
        ? object.channelIds.map((e: any) => String(e))
        : [],
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
    };
  },

  toJSON(message: GetPermissionsRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    if (message.channelIds) {
      obj.channelIds = message.channelIds.map((e) => e);
    } else {
      obj.channelIds = [];
    }
    message.roleId !== undefined && (obj.roleId = message.roleId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPermissionsRequest>, I>>(
    object: I
  ): GetPermissionsRequest {
    const message = createBaseGetPermissionsRequest();
    message.guildId = object.guildId ?? "0";
    message.channelIds = object.channelIds?.map((e) => e) || [];
    message.roleId = object.roleId ?? "0";
    return message;
  },
};

function createBaseGetPermissionsResponse(): GetPermissionsResponse {
  return { guildPerms: undefined, channelPerms: {} };
}

export const GetPermissionsResponse = {
  encode(
    message: GetPermissionsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildPerms !== undefined) {
      GetPermissionsResponse_Permissions.encode(
        message.guildPerms,
        writer.uint32(10).fork()
      ).ldelim();
    }
    Object.entries(message.channelPerms).forEach(([key, value]) => {
      GetPermissionsResponse_ChannelPermsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPermissionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPermissionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildPerms = GetPermissionsResponse_Permissions.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          const entry2 = GetPermissionsResponse_ChannelPermsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.channelPerms[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPermissionsResponse {
    return {
      guildPerms: isSet(object.guildPerms)
        ? GetPermissionsResponse_Permissions.fromJSON(object.guildPerms)
        : undefined,
      channelPerms: isObject(object.channelPerms)
        ? Object.entries(object.channelPerms).reduce<{
            [key: string]: GetPermissionsResponse_Permissions;
          }>((acc, [key, value]) => {
            acc[key] = GetPermissionsResponse_Permissions.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: GetPermissionsResponse): unknown {
    const obj: any = {};
    message.guildPerms !== undefined &&
      (obj.guildPerms = message.guildPerms
        ? GetPermissionsResponse_Permissions.toJSON(message.guildPerms)
        : undefined);
    obj.channelPerms = {};
    if (message.channelPerms) {
      Object.entries(message.channelPerms).forEach(([k, v]) => {
        obj.channelPerms[k] = GetPermissionsResponse_Permissions.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPermissionsResponse>, I>>(
    object: I
  ): GetPermissionsResponse {
    const message = createBaseGetPermissionsResponse();
    message.guildPerms =
      object.guildPerms !== undefined && object.guildPerms !== null
        ? GetPermissionsResponse_Permissions.fromPartial(object.guildPerms)
        : undefined;
    message.channelPerms = Object.entries(object.channelPerms ?? {}).reduce<{
      [key: string]: GetPermissionsResponse_Permissions;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = GetPermissionsResponse_Permissions.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetPermissionsResponse_Permissions(): GetPermissionsResponse_Permissions {
  return { perms: [] };
}

export const GetPermissionsResponse_Permissions = {
  encode(
    message: GetPermissionsResponse_Permissions,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.perms) {
      Permission.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPermissionsResponse_Permissions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPermissionsResponse_Permissions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.perms.push(Permission.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPermissionsResponse_Permissions {
    return {
      perms: Array.isArray(object?.perms)
        ? object.perms.map((e: any) => Permission.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetPermissionsResponse_Permissions): unknown {
    const obj: any = {};
    if (message.perms) {
      obj.perms = message.perms.map((e) =>
        e ? Permission.toJSON(e) : undefined
      );
    } else {
      obj.perms = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetPermissionsResponse_Permissions>, I>
  >(object: I): GetPermissionsResponse_Permissions {
    const message = createBaseGetPermissionsResponse_Permissions();
    message.perms = object.perms?.map((e) => Permission.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetPermissionsResponse_ChannelPermsEntry(): GetPermissionsResponse_ChannelPermsEntry {
  return { key: "0", value: undefined };
}

export const GetPermissionsResponse_ChannelPermsEntry = {
  encode(
    message: GetPermissionsResponse_ChannelPermsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "0") {
      writer.uint32(8).uint64(message.key);
    }
    if (message.value !== undefined) {
      GetPermissionsResponse_Permissions.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetPermissionsResponse_ChannelPermsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPermissionsResponse_ChannelPermsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.value = GetPermissionsResponse_Permissions.decode(
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

  fromJSON(object: any): GetPermissionsResponse_ChannelPermsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "0",
      value: isSet(object.value)
        ? GetPermissionsResponse_Permissions.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: GetPermissionsResponse_ChannelPermsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? GetPermissionsResponse_Permissions.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetPermissionsResponse_ChannelPermsEntry>, I>
  >(object: I): GetPermissionsResponse_ChannelPermsEntry {
    const message = createBaseGetPermissionsResponse_ChannelPermsEntry();
    message.key = object.key ?? "0";
    message.value =
      object.value !== undefined && object.value !== null
        ? GetPermissionsResponse_Permissions.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseMoveRoleRequest(): MoveRoleRequest {
  return { guildId: "0", roleId: "0", newPosition: undefined };
}

export const MoveRoleRequest = {
  encode(
    message: MoveRoleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== "0") {
      writer.uint32(16).uint64(message.roleId);
    }
    if (message.newPosition !== undefined) {
      ItemPosition.encode(
        message.newPosition,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MoveRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoveRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.newPosition = ItemPosition.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MoveRoleRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
      newPosition: isSet(object.newPosition)
        ? ItemPosition.fromJSON(object.newPosition)
        : undefined,
    };
  },

  toJSON(message: MoveRoleRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
    message.newPosition !== undefined &&
      (obj.newPosition = message.newPosition
        ? ItemPosition.toJSON(message.newPosition)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MoveRoleRequest>, I>>(
    object: I
  ): MoveRoleRequest {
    const message = createBaseMoveRoleRequest();
    message.guildId = object.guildId ?? "0";
    message.roleId = object.roleId ?? "0";
    message.newPosition =
      object.newPosition !== undefined && object.newPosition !== null
        ? ItemPosition.fromPartial(object.newPosition)
        : undefined;
    return message;
  },
};

function createBaseMoveRoleResponse(): MoveRoleResponse {
  return {};
}

export const MoveRoleResponse = {
  encode(
    _: MoveRoleResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MoveRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoveRoleResponse();
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

  fromJSON(_: any): MoveRoleResponse {
    return {};
  },

  toJSON(_: MoveRoleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MoveRoleResponse>, I>>(
    _: I
  ): MoveRoleResponse {
    const message = createBaseMoveRoleResponse();
    return message;
  },
};

function createBaseGetGuildRolesRequest(): GetGuildRolesRequest {
  return { guildId: "0" };
}

export const GetGuildRolesRequest = {
  encode(
    message: GetGuildRolesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetGuildRolesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildRolesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildRolesRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
    };
  },

  toJSON(message: GetGuildRolesRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildRolesRequest>, I>>(
    object: I
  ): GetGuildRolesRequest {
    const message = createBaseGetGuildRolesRequest();
    message.guildId = object.guildId ?? "0";
    return message;
  },
};

function createBaseGetGuildRolesResponse(): GetGuildRolesResponse {
  return { roles: [] };
}

export const GetGuildRolesResponse = {
  encode(
    message: GetGuildRolesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.roles) {
      RoleWithId.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetGuildRolesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGuildRolesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roles.push(RoleWithId.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetGuildRolesResponse {
    return {
      roles: Array.isArray(object?.roles)
        ? object.roles.map((e: any) => RoleWithId.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetGuildRolesResponse): unknown {
    const obj: any = {};
    if (message.roles) {
      obj.roles = message.roles.map((e) =>
        e ? RoleWithId.toJSON(e) : undefined
      );
    } else {
      obj.roles = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetGuildRolesResponse>, I>>(
    object: I
  ): GetGuildRolesResponse {
    const message = createBaseGetGuildRolesResponse();
    message.roles = object.roles?.map((e) => RoleWithId.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddGuildRoleRequest(): AddGuildRoleRequest {
  return { guildId: "0", name: "", color: 0, hoist: false, pingable: false };
}

export const AddGuildRoleRequest = {
  encode(
    message: AddGuildRoleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.color !== 0) {
      writer.uint32(24).int32(message.color);
    }
    if (message.hoist === true) {
      writer.uint32(32).bool(message.hoist);
    }
    if (message.pingable === true) {
      writer.uint32(40).bool(message.pingable);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddGuildRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddGuildRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.color = reader.int32();
          break;
        case 4:
          message.hoist = reader.bool();
          break;
        case 5:
          message.pingable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddGuildRoleRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      name: isSet(object.name) ? String(object.name) : "",
      color: isSet(object.color) ? Number(object.color) : 0,
      hoist: isSet(object.hoist) ? Boolean(object.hoist) : false,
      pingable: isSet(object.pingable) ? Boolean(object.pingable) : false,
    };
  },

  toJSON(message: AddGuildRoleRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.name !== undefined && (obj.name = message.name);
    message.color !== undefined && (obj.color = Math.round(message.color));
    message.hoist !== undefined && (obj.hoist = message.hoist);
    message.pingable !== undefined && (obj.pingable = message.pingable);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddGuildRoleRequest>, I>>(
    object: I
  ): AddGuildRoleRequest {
    const message = createBaseAddGuildRoleRequest();
    message.guildId = object.guildId ?? "0";
    message.name = object.name ?? "";
    message.color = object.color ?? 0;
    message.hoist = object.hoist ?? false;
    message.pingable = object.pingable ?? false;
    return message;
  },
};

function createBaseAddGuildRoleResponse(): AddGuildRoleResponse {
  return { roleId: "0" };
}

export const AddGuildRoleResponse = {
  encode(
    message: AddGuildRoleResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.roleId !== "0") {
      writer.uint32(8).uint64(message.roleId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddGuildRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddGuildRoleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.roleId = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddGuildRoleResponse {
    return {
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
    };
  },

  toJSON(message: AddGuildRoleResponse): unknown {
    const obj: any = {};
    message.roleId !== undefined && (obj.roleId = message.roleId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddGuildRoleResponse>, I>>(
    object: I
  ): AddGuildRoleResponse {
    const message = createBaseAddGuildRoleResponse();
    message.roleId = object.roleId ?? "0";
    return message;
  },
};

function createBaseDeleteGuildRoleRequest(): DeleteGuildRoleRequest {
  return { guildId: "0", roleId: "0" };
}

export const DeleteGuildRoleRequest = {
  encode(
    message: DeleteGuildRoleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== "0") {
      writer.uint32(16).uint64(message.roleId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteGuildRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteGuildRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteGuildRoleRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
    };
  },

  toJSON(message: DeleteGuildRoleRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteGuildRoleRequest>, I>>(
    object: I
  ): DeleteGuildRoleRequest {
    const message = createBaseDeleteGuildRoleRequest();
    message.guildId = object.guildId ?? "0";
    message.roleId = object.roleId ?? "0";
    return message;
  },
};

function createBaseDeleteGuildRoleResponse(): DeleteGuildRoleResponse {
  return {};
}

export const DeleteGuildRoleResponse = {
  encode(
    _: DeleteGuildRoleResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DeleteGuildRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteGuildRoleResponse();
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

  fromJSON(_: any): DeleteGuildRoleResponse {
    return {};
  },

  toJSON(_: DeleteGuildRoleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteGuildRoleResponse>, I>>(
    _: I
  ): DeleteGuildRoleResponse {
    const message = createBaseDeleteGuildRoleResponse();
    return message;
  },
};

function createBaseModifyGuildRoleRequest(): ModifyGuildRoleRequest {
  return {
    guildId: "0",
    roleId: "0",
    newName: undefined,
    newColor: undefined,
    newHoist: undefined,
    newPingable: undefined,
  };
}

export const ModifyGuildRoleRequest = {
  encode(
    message: ModifyGuildRoleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.roleId !== "0") {
      writer.uint32(16).uint64(message.roleId);
    }
    if (message.newName !== undefined) {
      writer.uint32(26).string(message.newName);
    }
    if (message.newColor !== undefined) {
      writer.uint32(32).int32(message.newColor);
    }
    if (message.newHoist !== undefined) {
      writer.uint32(40).bool(message.newHoist);
    }
    if (message.newPingable !== undefined) {
      writer.uint32(48).bool(message.newPingable);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ModifyGuildRoleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyGuildRoleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.roleId = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.newName = reader.string();
          break;
        case 4:
          message.newColor = reader.int32();
          break;
        case 5:
          message.newHoist = reader.bool();
          break;
        case 6:
          message.newPingable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModifyGuildRoleRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      roleId: isSet(object.roleId) ? String(object.roleId) : "0",
      newName: isSet(object.newName) ? String(object.newName) : undefined,
      newColor: isSet(object.newColor) ? Number(object.newColor) : undefined,
      newHoist: isSet(object.newHoist) ? Boolean(object.newHoist) : undefined,
      newPingable: isSet(object.newPingable)
        ? Boolean(object.newPingable)
        : undefined,
    };
  },

  toJSON(message: ModifyGuildRoleRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.roleId !== undefined && (obj.roleId = message.roleId);
    message.newName !== undefined && (obj.newName = message.newName);
    message.newColor !== undefined &&
      (obj.newColor = Math.round(message.newColor));
    message.newHoist !== undefined && (obj.newHoist = message.newHoist);
    message.newPingable !== undefined &&
      (obj.newPingable = message.newPingable);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModifyGuildRoleRequest>, I>>(
    object: I
  ): ModifyGuildRoleRequest {
    const message = createBaseModifyGuildRoleRequest();
    message.guildId = object.guildId ?? "0";
    message.roleId = object.roleId ?? "0";
    message.newName = object.newName ?? undefined;
    message.newColor = object.newColor ?? undefined;
    message.newHoist = object.newHoist ?? undefined;
    message.newPingable = object.newPingable ?? undefined;
    return message;
  },
};

function createBaseModifyGuildRoleResponse(): ModifyGuildRoleResponse {
  return {};
}

export const ModifyGuildRoleResponse = {
  encode(
    _: ModifyGuildRoleResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ModifyGuildRoleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyGuildRoleResponse();
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

  fromJSON(_: any): ModifyGuildRoleResponse {
    return {};
  },

  toJSON(_: ModifyGuildRoleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModifyGuildRoleResponse>, I>>(
    _: I
  ): ModifyGuildRoleResponse {
    const message = createBaseModifyGuildRoleResponse();
    return message;
  },
};

function createBaseManageUserRolesRequest(): ManageUserRolesRequest {
  return { guildId: "0", userId: "0", giveRoleIds: [], takeRoleIds: [] };
}

export const ManageUserRolesRequest = {
  encode(
    message: ManageUserRolesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    if (message.userId !== "0") {
      writer.uint32(16).uint64(message.userId);
    }
    writer.uint32(26).fork();
    for (const v of message.giveRoleIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    writer.uint32(34).fork();
    for (const v of message.takeRoleIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ManageUserRolesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManageUserRolesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.userId = longToString(reader.uint64() as Long);
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.giveRoleIds.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.giveRoleIds.push(longToString(reader.uint64() as Long));
          }
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.takeRoleIds.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.takeRoleIds.push(longToString(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ManageUserRolesRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      userId: isSet(object.userId) ? String(object.userId) : "0",
      giveRoleIds: Array.isArray(object?.giveRoleIds)
        ? object.giveRoleIds.map((e: any) => String(e))
        : [],
      takeRoleIds: Array.isArray(object?.takeRoleIds)
        ? object.takeRoleIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ManageUserRolesRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    message.userId !== undefined && (obj.userId = message.userId);
    if (message.giveRoleIds) {
      obj.giveRoleIds = message.giveRoleIds.map((e) => e);
    } else {
      obj.giveRoleIds = [];
    }
    if (message.takeRoleIds) {
      obj.takeRoleIds = message.takeRoleIds.map((e) => e);
    } else {
      obj.takeRoleIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManageUserRolesRequest>, I>>(
    object: I
  ): ManageUserRolesRequest {
    const message = createBaseManageUserRolesRequest();
    message.guildId = object.guildId ?? "0";
    message.userId = object.userId ?? "0";
    message.giveRoleIds = object.giveRoleIds?.map((e) => e) || [];
    message.takeRoleIds = object.takeRoleIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseManageUserRolesResponse(): ManageUserRolesResponse {
  return {};
}

export const ManageUserRolesResponse = {
  encode(
    _: ManageUserRolesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ManageUserRolesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseManageUserRolesResponse();
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

  fromJSON(_: any): ManageUserRolesResponse {
    return {};
  },

  toJSON(_: ManageUserRolesResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ManageUserRolesResponse>, I>>(
    _: I
  ): ManageUserRolesResponse {
    const message = createBaseManageUserRolesResponse();
    return message;
  },
};

function createBaseGetUserRolesRequest(): GetUserRolesRequest {
  return { guildId: "0", userIds: [] };
}

export const GetUserRolesRequest = {
  encode(
    message: GetUserRolesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.guildId !== "0") {
      writer.uint32(8).uint64(message.guildId);
    }
    writer.uint32(18).fork();
    for (const v of message.userIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserRolesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserRolesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.guildId = longToString(reader.uint64() as Long);
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.userIds.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.userIds.push(longToString(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserRolesRequest {
    return {
      guildId: isSet(object.guildId) ? String(object.guildId) : "0",
      userIds: Array.isArray(object?.userIds)
        ? object.userIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GetUserRolesRequest): unknown {
    const obj: any = {};
    message.guildId !== undefined && (obj.guildId = message.guildId);
    if (message.userIds) {
      obj.userIds = message.userIds.map((e) => e);
    } else {
      obj.userIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserRolesRequest>, I>>(
    object: I
  ): GetUserRolesRequest {
    const message = createBaseGetUserRolesRequest();
    message.guildId = object.guildId ?? "0";
    message.userIds = object.userIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetUserRolesResponse(): GetUserRolesResponse {
  return { userRoles: {} };
}

export const GetUserRolesResponse = {
  encode(
    message: GetUserRolesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.userRoles).forEach(([key, value]) => {
      GetUserRolesResponse_UserRolesEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetUserRolesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserRolesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GetUserRolesResponse_UserRolesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.userRoles[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserRolesResponse {
    return {
      userRoles: isObject(object.userRoles)
        ? Object.entries(object.userRoles).reduce<{
            [key: string]: GetUserRolesResponse_UserRoles;
          }>((acc, [key, value]) => {
            acc[key] = GetUserRolesResponse_UserRoles.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: GetUserRolesResponse): unknown {
    const obj: any = {};
    obj.userRoles = {};
    if (message.userRoles) {
      Object.entries(message.userRoles).forEach(([k, v]) => {
        obj.userRoles[k] = GetUserRolesResponse_UserRoles.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserRolesResponse>, I>>(
    object: I
  ): GetUserRolesResponse {
    const message = createBaseGetUserRolesResponse();
    message.userRoles = Object.entries(object.userRoles ?? {}).reduce<{
      [key: string]: GetUserRolesResponse_UserRoles;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = GetUserRolesResponse_UserRoles.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGetUserRolesResponse_UserRoles(): GetUserRolesResponse_UserRoles {
  return { roles: [] };
}

export const GetUserRolesResponse_UserRoles = {
  encode(
    message: GetUserRolesResponse_UserRoles,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.roles) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetUserRolesResponse_UserRoles {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserRolesResponse_UserRoles();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.roles.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.roles.push(longToString(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserRolesResponse_UserRoles {
    return {
      roles: Array.isArray(object?.roles)
        ? object.roles.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GetUserRolesResponse_UserRoles): unknown {
    const obj: any = {};
    if (message.roles) {
      obj.roles = message.roles.map((e) => e);
    } else {
      obj.roles = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserRolesResponse_UserRoles>, I>>(
    object: I
  ): GetUserRolesResponse_UserRoles {
    const message = createBaseGetUserRolesResponse_UserRoles();
    message.roles = object.roles?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetUserRolesResponse_UserRolesEntry(): GetUserRolesResponse_UserRolesEntry {
  return { key: "0", value: undefined };
}

export const GetUserRolesResponse_UserRolesEntry = {
  encode(
    message: GetUserRolesResponse_UserRolesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "0") {
      writer.uint32(8).uint64(message.key);
    }
    if (message.value !== undefined) {
      GetUserRolesResponse_UserRoles.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetUserRolesResponse_UserRolesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserRolesResponse_UserRolesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.value = GetUserRolesResponse_UserRoles.decode(
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

  fromJSON(object: any): GetUserRolesResponse_UserRolesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "0",
      value: isSet(object.value)
        ? GetUserRolesResponse_UserRoles.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: GetUserRolesResponse_UserRolesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? GetUserRolesResponse_UserRoles.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetUserRolesResponse_UserRolesEntry>, I>
  >(object: I): GetUserRolesResponse_UserRolesEntry {
    const message = createBaseGetUserRolesResponse_UserRolesEntry();
    message.key = object.key ?? "0";
    message.value =
      object.value !== undefined && object.value !== null
        ? GetUserRolesResponse_UserRoles.fromPartial(object.value)
        : undefined;
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
