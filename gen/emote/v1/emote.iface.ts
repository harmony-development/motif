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
export interface EmoteService {
	
	createEmotePack(request: CreateEmotePackRequest): Promise<CreateEmotePackResponse>
	
	getEmotePacks(request: GetEmotePacksRequest): Promise<GetEmotePacksResponse>
	
	getEmotePackEmotes(request: GetEmotePackEmotesRequest): Promise<GetEmotePackEmotesResponse>
	
	addEmoteToPack(request: AddEmoteToPackRequest): Promise<AddEmoteToPackResponse>
	
	deleteEmotePack(request: DeleteEmotePackRequest): Promise<DeleteEmotePackResponse>
	
	deleteEmoteFromPack(request: DeleteEmoteFromPackRequest): Promise<DeleteEmoteFromPackResponse>
	
	dequipEmotePack(request: DequipEmotePackRequest): Promise<DequipEmotePackResponse>
	
	equipEmotePack(request: EquipEmotePackRequest): Promise<EquipEmotePackResponse>
}
