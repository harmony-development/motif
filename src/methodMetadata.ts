import { mapObject } from "./util/common";

export interface SmallerMetadata {
	auth?: boolean;
	local?: boolean;
	owner?: boolean;
	node?: string;
}

export const meta = ({ auth, local, owner, node }: SmallerMetadata): SmallerMetadata => ({
	auth: auth ?? true,
	local: local ?? false,
	owner: owner ?? false,
	node: node ?? "",
});

const unprocessedMeta: Record<string, Partial<SmallerMetadata>> = {
	/* BEGIN AUTH */
	"/protocol.auth.v1.AuthService/Federate": { auth: false },
	"/protocol.auth.v1.AuthService/LoginFederated": { auth: false },
	"/protocol.auth.v1.AuthService/Key": { auth: false },
	"/protocol.auth.v1.AuthService/BeginAuth": { auth: false },
	"/protocol.auth.v1.AuthService/NextStep": { auth: false },
	"/protocol.auth.v1.AuthService/StepBack": { auth: false },
	"/protocol.auth.v1.AuthService/StreamSteps": { auth: false },
	"/protocol.auth.v1.AuthService/CheckLoggedIn": {},
	/* END AUTH */

	/* BEGIN CHAT */

	/* END CHAT */
	"/_harmony/about": { auth: false },
};

export const metadata = mapObject(unprocessedMeta, (value) => meta(value));
