import { randomBytes } from "crypto";
import { hash, verify } from "argon2";
import type {
	AuthStep,
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
	NextStepRequest_FormFields,
	NextStepResponse,
	StepBackRequest,
	StepBackResponse,
	StreamStepsRequest,
	StreamStepsResponse,
} from "../../../gen/auth/v1/auth";
import type { AuthService } from "../../../gen/auth/v1/auth.iface";
import type { DB } from "../../db";
import type { AuthStepsSession } from "../../db/repository/types";
import { errors } from "../../errors";
import { pEventIterator } from "../../lib/p-event";
import { generateSteps } from "./steps";

export class AuthServiceImpl implements AuthService {
	steps: Record<string, AuthStep>;

	constructor(private db: DB) {
		this.steps = generateSteps();
	}

	federate(_: FederateRequest): Promise<FederateResponse> {
		throw new Error("Method not implemented.");
	}

	loginFederated(
		_: LoginFederatedRequest,
	): Promise<LoginFederatedResponse> {
		throw new Error("Method not implemented.");
	}

	async key(_: KeyRequest): Promise<KeyResponse> {
		return {
			key: new Uint8Array([1, 8, 15, 100]),
		};
	}

	async beginAuth(_: BeginAuthRequest): Promise<BeginAuthResponse> {
		const session: AuthStepsSession = {
			auth_id: randomBytes(64).toString("base64"),
			step: "initial",
		};

		await this.db.auth.saveAuthSession(session);

		return { authId: session.auth_id };
	}

	async loginHandler(
		form: NextStepRequest_FormFields[],
	): Promise<NextStepResponse> {
		const [{ field: email }, { field: password }] = form;

		if (email?.$case !== "string" || password?.$case !== "bytes")
			throw new Error("invalid form"); // TODO: port to HErrors

		const user = await this.db.auth.getUserByEmail(email.string);
		if (!user) throw errors["h.bad-password"];

		if (!(await verify(user.password_hash, Buffer.from(password.bytes))))
			throw errors["h.bad-password"];

		return {};
	}

	async registerHandler(
		form: NextStepRequest_FormFields[],
	): Promise<NextStepResponse> {
		const [{ field: email }, { field: username }, { field: password }] = form;
		if (
			email?.$case !== "string"
      || username?.$case !== "string"
      || password?.$case !== "bytes"
		)
			throw errors["h.invalid-form"];

		const hashedPassword = await hash(Buffer.from(password.bytes));

		await this.db.auth.saveUser(
			email.string,
			Buffer.from(hashedPassword, "utf-8"),
		);

		return {};
	}

	formHandlers = {
		login: this.loginHandler,
		register: this.registerHandler,
	};

	async nextStep(req: NextStepRequest): Promise<NextStepResponse> {
		if (!req.authId) {
			// todo: throw error
			return {};
		}

		const session = await this.db.auth.getAuthSession(req.authId);
		if (!session) {
			// todo: throw a hrpc error
			return {};
		}
		const currentStep = this.steps[session.step];
		if (session.step === "initial" || !req.step)
			return { step: currentStep }; // todo: throw an error if current step is not initial

		if (currentStep.step?.$case !== req.step.$case)
			throw new Error("mismatched request steps"); // TODO: throw an hrpc error

		if (req.step.$case === "choice") {
			const choice = req.step.choice.choice;
			if (
				currentStep.step.$case === "choice"
        && !currentStep.step.choice.options?.includes(choice)
			)
				throw new Error("invalid choice"); // TODO: throw an hrpc error
			await this.db.auth.pushAuthStepStream(req.authId, choice);
			return { step: this.steps[choice] };
		}
		else if (req.step.$case === "form") {
			const form = req.step.form.fields;
			const handler = this.formHandlers[session.step];
			return handler(form);
		}
		else {
			throw new Error("invalid step case");
		}
	}

	stepBack(_: StepBackRequest): Promise<StepBackResponse> {
		throw new Error("unimplemented");
	}

	async checkLoggedIn(
		_: CheckLoggedInRequest,
	): Promise<CheckLoggedInResponse> {
		return {};
	}

	async *streamSteps(
		request: AsyncIterable<StreamStepsRequest>,
	): AsyncIterable<StreamStepsResponse> {
		await this.db.auth.streamAuthSteps();

		const next = await request[Symbol.asyncIterator]().next();
		if (next.done) return;
		const req = next.value;

		const iterator = pEventIterator(this.db.auth.emitter, req.authId!);

		for await (const message of iterator) {
			const response = this.steps[message];
			if (!response) return; // TODO: return hRPC error
			yield { step: response };
		}
	}
}
