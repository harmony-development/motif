import {
	FederateRequest,
	FederateResponse,
	LoginFederatedRequest,
	LoginFederatedResponse,
	KeyRequest,
	KeyResponse,
	BeginAuthRequest,
	BeginAuthResponse,
	NextStepRequest,
	NextStepResponse,
	StepBackRequest,
	StepBackResponse,
	StreamStepsRequest,
	StreamStepsResponse,
	CheckLoggedInRequest,
	CheckLoggedInResponse,
} from './auth';
export interface AuthService<C> {
	
	federate(ctx: C, request: FederateRequest): Promise<FederateResponse>
	
	loginFederated(ctx: C, request: LoginFederatedRequest): Promise<LoginFederatedResponse>
	
	key(ctx: C, request: KeyRequest): Promise<KeyResponse>
	
	beginAuth(ctx: C, request: BeginAuthRequest): Promise<BeginAuthResponse>
	
	nextStep(ctx: C, request: NextStepRequest): Promise<NextStepResponse>
	
	stepBack(ctx: C, request: StepBackRequest): Promise<StepBackResponse>
	
	checkLoggedIn(ctx: C, request: CheckLoggedInRequest): Promise<CheckLoggedInResponse>
	
	streamSteps(ctx: C, request: AsyncIterable<StreamStepsRequest>): AsyncIterable<Uint8Array>
}
