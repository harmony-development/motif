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
} from "../../../gen/auth/v1/auth";
import { StreamStepsResponse } from "../../../gen/auth/v1/auth";
import type { AuthService } from "../../../gen/auth/v1/auth.iface";
import type { IConfig } from "../../config/config";
import type { DB } from "../../db/db";
import type { AuthMsg } from "../../db/repository/auth/auth";
import type { AuthStepsSession } from "../../db/repository/auth/types";
import { errors } from "../../errors";
import { pEventIterator } from "../../lib/p-event";
import type { MotifContext } from "../../util/context";
import { newIdGenerator } from "../../util/ids";
import { generateSteps } from "./steps";

export class AuthServiceImpl implements AuthService<MotifContext> {
	steps: Record<string, AuthStep>;
	previousSteps: Record<string, string | null>;
	generateToken: () => string;

	constructor(private readonly db: DB, config: IConfig) {
		this.generateToken = newIdGenerator(config.auth.tokenLength);
		[this.steps, this.previousSteps] = generateSteps();
	}

	federate(_: MotifContext, __: FederateRequest): Promise<FederateResponse> {
		throw new Error("Method not implemented.");
	}

	loginFederated(_: MotifContext, __: LoginFederatedRequest): Promise<LoginFederatedResponse> {
		throw new Error("Method not implemented.");
	}

	async key(_: MotifContext, __: KeyRequest): Promise<KeyResponse> {
		return {
			key: new Uint8Array([1, 8, 15, 100]),
		};
	}

	async beginAuth(_: MotifContext, __: BeginAuthRequest): Promise<BeginAuthResponse> {
		const session: AuthStepsSession = {
			auth_id: this.generateToken(),
			step: "initial",
		};

		await this.db.auth.saveAuthSession(session);

		return { authId: session.auth_id };
	}

	async createSession(authId: string, userId: string): Promise<NextStepResponse> {
		const sessionToken = this.generateToken();
		await this.db.auth.setSession(userId, sessionToken);

		await this.db.auth.pushAuthStepStream({ authId, userId, session: sessionToken, $case: "session" });
		return {
			step: {
				fallbackUrl: "",
				canGoBack: false,
				step: {
					$case: "session",
					session: {
						sessionToken,
						userId, // TODO: move to bigint when they fucking fix the codegen
					},
				},
			},
		};
	}

	async loginHandler(authId: string, form: NextStepRequest_FormFields[]): Promise<NextStepResponse> {
		const [{ field: email }, { field: password }] = form;

		if (email?.$case !== "string" || password?.$case !== "bytes") throw errors["h.invalid-form"];

		const user = await this.db.auth.getUserForLogin(email.string);
		if (!user) throw errors["h.bad-password"];
		if (!(await verify(user.password_hash.toString("utf-8"), Buffer.from(password.bytes)))) throw errors["h.bad-password"];

		return this.createSession(authId, user.id);
	}

	async registerHandler(authId: string, form: NextStepRequest_FormFields[]): Promise<NextStepResponse> {
		const [{ field: email }, { field: username }, { field: password }] = form;
		if (email?.$case !== "string" || username?.$case !== "string" || password?.$case !== "bytes") throw errors["h.invalid-form"];

		const hashedPassword = await hash(Buffer.from(password.bytes));

		try {
			const user = await this.db.auth.saveUser(email.string, username.string, Buffer.from(hashedPassword, "utf-8"));

			return this.createSession(authId, user.id);
		} catch (e) {
			if (e.message === 'duplicate key value violates unique constraint "users_email_key"') throw errors["h.email-already-used"];
			else if (e.message === 'duplicate key value violates unique constraint "users_username_key"') throw errors["h.username-already-used"];
			else throw e;
		}
	}

	formHandlers: Record<string, ((authId: string, form: NextStepRequest_FormFields[]) => Promise<NextStepResponse>) | undefined> = {
		login: this.loginHandler,
		register: this.registerHandler,
	};

	async nextStep(ctx: MotifContext, req: NextStepRequest): Promise<NextStepResponse> {
		if (!req.authId) throw errors["h.bad-auth-id"];

		const session = await this.db.auth.getAuthSession(req.authId);
		if (!session) throw errors["h.bad-auth-id"];

		const currentStep = this.steps[session.step];
		if (!req.step) {
			if (session.step === "initial") {
				await this.db.auth.pushAuthStepStream({ authId: req.authId, $case: "step", stepId: session.step });
				return { step: this.steps.initial };
			}

			throw errors["h.no-step-action"];
		}

		if (currentStep.step?.$case !== req.step.$case) throw errors["h.step-mismatch"];

		if (req.step.$case === "choice") {
			const choice = req.step.choice.choice;
			if (currentStep.step.$case === "choice" && !currentStep.step.choice.options?.includes(choice)) throw new Error("invalid choice"); // TODO: throw an hrpc error
			await this.db.auth.pushAuthStepStream({ authId: req.authId, $case: "step", stepId: choice });
			return { step: this.steps[choice] };
		} else if (req.step.$case === "form") {
			const form = req.step.form.fields;
			const handler = this.formHandlers[session.step];
			if (!handler) throw errors["h.internal-error"];
			return handler.bind(this)(req.authId, form);
		} else {
			throw new Error("invalid step case");
		}
	}

	async stepBack(ctx: MotifContext, { authId }: StepBackRequest): Promise<StepBackResponse> {
		const user = await this.db.auth.getAuthSession(authId);
		if (!user) throw errors["h.bad-auth-id"];
		const previousStepId = this.previousSteps[user.step];
		if (!previousStepId) throw errors["h.no-step-back"];
		await this.db.auth.pushAuthStepStream({ authId, stepId: previousStepId, $case: "step" });
		return { step: this.steps[previousStepId] };
	}

	async checkLoggedIn(_: MotifContext, __: CheckLoggedInRequest): Promise<CheckLoggedInResponse> {
		return {};
	}

	async *streamSteps(ctx: MotifContext, request: AsyncIterable<StreamStepsRequest>): AsyncIterable<Uint8Array> {
		const next = await request[Symbol.asyncIterator]().next();
		if (next.done) return;
		const req = next.value;

		const iterator = pEventIterator<string, AuthMsg>(this.db.auth.emitter, req.authId);
		for await (const message of iterator) {
			if (message.$case === "session") {
				yield StreamStepsResponse.encode({
					step: {
						canGoBack: false,
						fallbackUrl: "",
						step: {
							$case: "session",
							session: {
								sessionToken: message.session,
								userId: message.userId,
							},
						},
					},
				}).finish();
			} else if (message.$case === "step") {
				const response = this.steps[message.stepId];
				if (!response) throw errors["h.internal-error"];
				yield StreamStepsResponse.encode({ step: response }).finish();
			} else {
				throw errors["h.internal-error"];
			}
		}
	}
}
