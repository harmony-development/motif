import type { AuthStep } from "../../../gen/auth/v1/auth";

type AuthStepWithInfo = AuthStep & {
	previousStep: string | null;
};

export function generateSteps(disableRegister?: boolean): [Record<string, AuthStepWithInfo>, Record<string, string | null>] {
	const initialStep: AuthStepWithInfo = {
		canGoBack: false,
		fallbackUrl: "",
		previousStep: null,
		step: {
			$case: "choice",
			choice: {
				title: "initial",
				options: ["login"],
			},
		},
	};

	if (!disableRegister) {
		initialStep.step?.$case === "choice" && initialStep.step.choice.options?.push("register");
	}

	const loginStep: AuthStepWithInfo = {
		previousStep: "initial",
		canGoBack: true,
		fallbackUrl: "",
		step: {
			$case: "form",
			form: {
				title: "login",
				fields: [
					{ name: "email", type: "email" },
					{ name: "password", type: "password" },
				],
			},
		},
	};

	const registerStep: AuthStepWithInfo = {
		previousStep: "initial",
		canGoBack: true,
		fallbackUrl: "",
		step: {
			$case: "form",
			form: {
				title: "register",
				fields: [
					{ name: "email", type: "email" },
					{ name: "username", type: "text" },
					{ name: "password", type: "new-password" },
				],
			},
		},
	};

	const stepResponses: Record<string, AuthStepWithInfo> = {
		initial: initialStep,
		login: loginStep,
		register: registerStep,
	};

	return [stepResponses, Object.fromEntries(Object.entries(stepResponses).map(([key, value]) => [key, value.previousStep]))];
}
