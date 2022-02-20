import {
	MyBotsRequest,
	MyBotsResponse,
	GetBotRequest,
	GetBotResponse,
	CreateBotRequest,
	CreateBotResponse,
	EditBotRequest,
	EditBotResponse,
	DeleteBotRequest,
	DeleteBotResponse,
	PoliciesRequest,
	PoliciesResponse,
	AddBotRequest,
	AddBotResponse,
} from './bots';
export interface BotsService {
	
	myBots(request: MyBotsRequest): Promise<MyBotsResponse>
	
	getBot(request: GetBotRequest): Promise<GetBotResponse>
	
	createBot(request: CreateBotRequest): Promise<CreateBotResponse>
	
	editBot(request: EditBotRequest): Promise<EditBotResponse>
	
	deleteBot(request: DeleteBotRequest): Promise<DeleteBotResponse>
	
	policies(request: PoliciesRequest): Promise<PoliciesResponse>
	
	addBot(request: AddBotRequest): Promise<AddBotResponse>
}
