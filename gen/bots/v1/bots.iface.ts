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
export interface BotsService<C> {
	
	myBots(ctx: C, request: MyBotsRequest): Promise<MyBotsResponse>
	
	getBot(ctx: C, request: GetBotRequest): Promise<GetBotResponse>
	
	createBot(ctx: C, request: CreateBotRequest): Promise<CreateBotResponse>
	
	editBot(ctx: C, request: EditBotRequest): Promise<EditBotResponse>
	
	deleteBot(ctx: C, request: DeleteBotRequest): Promise<DeleteBotResponse>
	
	policies(ctx: C, request: PoliciesRequest): Promise<PoliciesResponse>
	
	addBot(ctx: C, request: AddBotRequest): Promise<AddBotResponse>
}
