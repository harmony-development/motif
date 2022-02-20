/* eslint-disable */
import { util, configure } from "protobufjs/minimal";
import * as Long from "long";
import {
  CreateEmotePackRequest,
  CreateEmotePackResponse,
  GetEmotePacksRequest,
  GetEmotePacksResponse,
  GetEmotePackEmotesRequest,
  GetEmotePackEmotesResponse,
  AddEmoteToPackRequest,
  AddEmoteToPackResponse,
  DeleteEmotePackRequest,
  DeleteEmotePackResponse,
  DeleteEmoteFromPackRequest,
  DeleteEmoteFromPackResponse,
  DequipEmotePackRequest,
  DequipEmotePackResponse,
  EquipEmotePackRequest,
  EquipEmotePackResponse,
} from "../../emote/v1/types";

export const protobufPackage = "protocol.emote.v1";

/** Harmony's Emote service manages the emotes and emote packs. */
export const EmoteServiceDefinition = {
  name: "EmoteService",
  fullName: "protocol.emote.v1.EmoteService",
  methods: {
    /** Endpoint to create an emote pack. */
    createEmotePack: {
      name: "CreateEmotePack",
      requestType: CreateEmotePackRequest,
      requestStream: false,
      responseType: CreateEmotePackResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get the emote packs you have equipped. */
    getEmotePacks: {
      name: "GetEmotePacks",
      requestType: GetEmotePacksRequest,
      requestStream: false,
      responseType: GetEmotePacksResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to get the emotes in an emote pack. */
    getEmotePackEmotes: {
      name: "GetEmotePackEmotes",
      requestType: GetEmotePackEmotesRequest,
      requestStream: false,
      responseType: GetEmotePackEmotesResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Endpoint to add an emote to an emote pack that you own.
     *
     * If a file ID is used in this request, the server should convert
     * it to a HMC before storing the emote.
     */
    addEmoteToPack: {
      name: "AddEmoteToPack",
      requestType: AddEmoteToPackRequest,
      requestStream: false,
      responseType: AddEmoteToPackResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to delete an emote pack that you own. */
    deleteEmotePack: {
      name: "DeleteEmotePack",
      requestType: DeleteEmotePackRequest,
      requestStream: false,
      responseType: DeleteEmotePackResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to delete an emote from an emote pack. */
    deleteEmoteFromPack: {
      name: "DeleteEmoteFromPack",
      requestType: DeleteEmoteFromPackRequest,
      requestStream: false,
      responseType: DeleteEmoteFromPackResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to dequip an emote pack that you have equipped. */
    dequipEmotePack: {
      name: "DequipEmotePack",
      requestType: DequipEmotePackRequest,
      requestStream: false,
      responseType: DequipEmotePackResponse,
      responseStream: false,
      options: {},
    },
    /** Endpoint to equip an emote pack. */
    equipEmotePack: {
      name: "EquipEmotePack",
      requestType: EquipEmotePackRequest,
      requestStream: false,
      responseType: EquipEmotePackResponse,
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
