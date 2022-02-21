// :trollface:
//
// real
type Real<T> = Exclude<T, undefined>;

export interface UserAccount {
  id: string;
  email: string;
  password_hash: string;
  created: Date;
}

export interface AuthStepsSession {
  auth_id: string;
  step: "initial" | "login" | "register";
}

export interface Session {
  userId: UserAccount["id"];
  startTime: Date;
}
