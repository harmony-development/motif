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
export interface AuthService {
	
	federate(request: FederateRequest): Promise<FederateResponse>
	
	loginFederated(request: LoginFederatedRequest): Promise<LoginFederatedResponse>
	
	key(request: KeyRequest): Promise<KeyResponse>
	
	beginAuth(request: BeginAuthRequest): Promise<BeginAuthResponse>
	
	nextStep(request: NextStepRequest): Promise<NextStepResponse>
	
	stepBack(request: StepBackRequest): Promise<StepBackResponse>
	
	checkLoggedIn(request: CheckLoggedInRequest): Promise<CheckLoggedInResponse>
	
	streamSteps(request: AsyncIterable<StreamStepsRequest>): AsyncIterable<StreamStepsResponse>
}
