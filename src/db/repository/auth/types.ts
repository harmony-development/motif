export interface UserAccount {
	id: string;
	email: string;
	password_hash: Buffer;
	created: Date;
}

export interface AuthStepsSession {
	auth_id: string;
	step: string;
}

export interface Session {
	userId: UserAccount["id"];
	startTime: Date;
}
