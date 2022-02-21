/* eslint-disable */
import { util, configure } from "protobufjs/minimal";
import * as Long from "long";
import {
  GetProfileRequest,
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  GetAppDataRequest,
  GetAppDataResponse,
  SetAppDataRequest,
  SetAppDataResponse,
} from "../../profile/v1/types";

export const protobufPackage = "protocol.profile.v1";

/** Harmony's Profile service manages the profiles of the users. */
export const ProfileServiceDefinition = {
  name: "ProfileService",
  fullName: "protocol.profile.v1.ProfileService",
  methods: {
    /** Gets a user's profile. */
    getProfile: {
      name: "GetProfile",
      requestType: GetProfileRequest,
      requestStream: false,
      responseType: GetProfileResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Updates the user's profile. */
    updateProfile: {
      name: "UpdateProfile",
      requestType: UpdateProfileRequest,
      requestStream: false,
      responseType: UpdateProfileResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /**
     * Gets app data for a user (this can be used to store user preferences which
     * is synchronized across devices).
     */
    getAppData: {
      name: "GetAppData",
      requestType: GetAppDataRequest,
      requestStream: false,
      responseType: GetAppDataResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Sets the app data for a user. */
    setAppData: {
      name: "SetAppData",
      requestType: SetAppDataRequest,
      requestStream: false,
      responseType: SetAppDataResponse,
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
