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
} from './emote';
export interface EmoteService<C> {
	
	createEmotePack(ctx: C, request: CreateEmotePackRequest): Promise<CreateEmotePackResponse>
	
	getEmotePacks(ctx: C, request: GetEmotePacksRequest): Promise<GetEmotePacksResponse>
	
	getEmotePackEmotes(ctx: C, request: GetEmotePackEmotesRequest): Promise<GetEmotePackEmotesResponse>
	
	addEmoteToPack(ctx: C, request: AddEmoteToPackRequest): Promise<AddEmoteToPackResponse>
	
	deleteEmotePack(ctx: C, request: DeleteEmotePackRequest): Promise<DeleteEmotePackResponse>
	
	deleteEmoteFromPack(ctx: C, request: DeleteEmoteFromPackRequest): Promise<DeleteEmoteFromPackResponse>
	
	dequipEmotePack(ctx: C, request: DequipEmotePackRequest): Promise<DequipEmotePackResponse>
	
	equipEmotePack(ctx: C, request: EquipEmotePackRequest): Promise<EquipEmotePackResponse>
}
