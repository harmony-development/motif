import { Error as HError } from "../gen/protocol/hrpc";
export class RequestError implements Error {
	code: string;
	name: string;
	message: string;
	stack?: string | undefined;
	jsonMessage: unknown;
	protoMessage: Uint8Array;

	constructor(code: string, humanMessage: string) {
		this.code = code;
		this.name = code;
		this.message = humanMessage;

		const error = {
			identifier: code,
			humanMessage,
			details: new Uint8Array(),
		};
		this.jsonMessage = HError.toJSON(error);
		this.protoMessage = HError.encode(error).finish();
	}

	toMessage(contentType: string | undefined): unknown {
		return contentType === "application/hrpc-json" ? this.jsonMessage : this.protoMessage;
	}
}

const errData = {
	// auth
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

	// guilds
	"h.guild-not-found": "guild not found",
	"h.user-not-in-guild": "the requested user is not a member of the guild",
	"h.user-banned": "the requested user is banned from this guild",
	"h.user-already-banned": "the requested user is already banned from this guild",
	"h.user-not-banned": "the requested user is not banned from this guild",
	"h.already-guild-owner": "the requested user is already an owner of the guild",
	"h.not-guild-owner": "you must be an owner of the guild to perform this action",
	"h.last-guild-owner": "you may not perform this action because you are the last owner of the guild",

	// channels
	"h.channel-not-found": "channel not found",

	// general errors
	"h.user-not-found": "user not found",
	"h.invalid-user-for-action": "cannot perform action on this user",
	"h.nothing-to-update": "no values to update",
	"h.internal-error": "internal server error",
};

// converts the error data above into a map of actual error objects
export const errors = Object.entries(errData).reduce<Record<string, RequestError>>((acc, [code, humanMessage]) => {
	acc[code] = new RequestError(code, humanMessage);
	return acc;
}, {}) as {
		[key in keyof typeof errData]: RequestError;
	};
