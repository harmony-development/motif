import { AuthStep } from "../../../gen/auth/v1/auth";
export function generateSteps(disableRegister?: boolean) {
  const initialStep: AuthStep = {
    canGoBack: false,
    fallbackUrl: "",
    step: {
      $case: "choice",
      choice: {
        title: "initial",
        options: ["login"],
      },
    },
  };

  if (!disableRegister) {
    initialStep.step?.$case == "choice" &&
      initialStep.step.choice.options?.push("register");
  }

  const loginStep: AuthStep = {
    canGoBack: true,
    fallbackUrl: "",
    step: {
      $case: "form",
      form: {
        title: "login",
        fields: [{ name: "email", type: "email" }],
      },
    },
  };

  const registerStep: AuthStep = {
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

  const stepResponses: Record<string, AuthStep> = {
    initial: initialStep,
    login: loginStep,
    register: registerStep,
  };

  return stepResponses;
}
