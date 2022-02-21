import { Error as HError } from "../gen/protocol/hrpc";
export class RequestError implements Error {
	code: string;
	name: string;
	message: string;
	stack?: string | undefined;
	protoMessage: Uint8Array;

	constructor(code: string, humanMessage: string) {
		this.code = code;
		this.name = code;
		this.message = humanMessage;
		this.protoMessage = HError.encode({
			identifier: code,
			humanMessage,
			details: new Uint8Array(),
		}).finish();
	}
}

const errData = {
	"h.bad-password": "invalid credentials",
	"h.bad-auth-id": "invalid auth id",
	"h.no-step-action": "no step action provided",
	"h.step-mismatch": "step mismatch",
	"h.no-step-back": "no step back",
	"h.missing-form": "missing form",
	"h.invalid-form": "invalid form",
	"h.email-already-used": "there is already an account with this email address",
	"h.username-already-used": "there is already an account with this username",
	"h.invalid-auth": "the authentication token was missing or invalid",
	"h.internal-error": "internal server error",
};

// converts the error data above into a map of actual error objects
export const errors = Object.entries(errData).reduce<
Record<string, RequestError>
>((acc, [code, humanMessage]) => {
	acc[code] = new RequestError(code, humanMessage);
	return acc;
}, {}) as {
	[key in keyof typeof errData]: RequestError;
};
