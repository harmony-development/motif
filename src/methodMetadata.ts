import type { HarmonyMethodMetadata } from "../gen/harmonytypes/v1/types";

export const methodMetadata: Record<string, Partial<HarmonyMethodMetadata>> = {
	"/protocol.auth.v1.AuthService/StreamSteps": {
		requiresAuthentication: true,
	},
};
