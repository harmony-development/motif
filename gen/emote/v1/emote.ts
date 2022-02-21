/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
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
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Endpoint to get the emote packs you have equipped. */
    getEmotePacks: {
      name: "GetEmotePacks",
      requestType: GetEmotePacksRequest,
      requestStream: false,
      responseType: GetEmotePacksResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Endpoint to get the emotes in an emote pack. */
    getEmotePackEmotes: {
      name: "GetEmotePackEmotes",
      requestType: GetEmotePackEmotesRequest,
      requestStream: false,
      responseType: GetEmotePackEmotesResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
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
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Endpoint to delete an emote pack that you own. */
    deleteEmotePack: {
      name: "DeleteEmotePack",
      requestType: DeleteEmotePackRequest,
      requestStream: false,
      responseType: DeleteEmotePackResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Endpoint to delete an emote from an emote pack. */
    deleteEmoteFromPack: {
      name: "DeleteEmoteFromPack",
      requestType: DeleteEmoteFromPackRequest,
      requestStream: false,
      responseType: DeleteEmoteFromPackResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Endpoint to dequip an emote pack that you have equipped. */
    dequipEmotePack: {
      name: "DequipEmotePack",
      requestType: DequipEmotePackRequest,
      requestStream: false,
      responseType: DequipEmotePackResponse,
      responseStream: false,
      options: {
        8730: [{ type: "Buffer", data: [2, 8, 1] }],
      },
    },
    /** Endpoint to equip an emote pack. */
    equipEmotePack: {
      name: "EquipEmotePack",
      requestType: EquipEmotePackRequest,
      requestStream: false,
      responseType: EquipEmotePackResponse,
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
