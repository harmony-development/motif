export class RequestError implements Error {
  code: string;
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(code: string, humanMessage: string) {
    this.code = code;
    this.name = code;
    this.message = humanMessage;
  }
}

export const wrongEmailOrPassword = new RequestError(
  "h.bad-password\nh.bad-email",
  "invalid credentials"
);
export const missingForm = new RequestError("h.missing-form", "missing form");
