import {
  BeginAuthRequest,
  BeginAuthResponse,
  CheckLoggedInRequest,
  CheckLoggedInResponse,
  FederateRequest,
  FederateResponse,
  KeyRequest,
  KeyResponse,
  LoginFederatedRequest,
  LoginFederatedResponse,
  NextStepRequest,
  NextStepResponse,
  StepBackRequest,
  StepBackResponse,
  StreamStepsRequest,
  StreamStepsResponse,
} from "../../gen/auth/v1/auth";
import { AuthService } from "../../gen/auth/v1/auth.iface";
export class AuthServiceImpl implements AuthService {
  federate(request: FederateRequest): Promise<FederateResponse> {
    throw new Error("Method not implemented.");
  }
  loginFederated(
    request: LoginFederatedRequest
  ): Promise<LoginFederatedResponse> {
    throw new Error("Method not implemented.");
  }
  async key(request: KeyRequest): Promise<KeyResponse> {
    return {
      key: new Uint8Array([1, 8, 15, 100]),
    };
  }
  beginAuth(request: BeginAuthRequest): Promise<BeginAuthResponse> {
    throw new Error("Method not implemented.");
  }
  nextStep(request: NextStepRequest): Promise<NextStepResponse> {
    throw new Error("Method not implemented.");
  }
  stepBack(request: StepBackRequest): Promise<StepBackResponse> {
    throw new Error("Method not implemented.");
  }
  checkLoggedIn(request: CheckLoggedInRequest): Promise<CheckLoggedInResponse> {
    throw new Error("Method not implemented.");
  }
  streamSteps(
    request: AsyncIterator<StreamStepsRequest, any, undefined>
  ): AsyncIterator<StreamStepsResponse, any, undefined> {
    throw new Error("Method not implemented.");
  }
}
