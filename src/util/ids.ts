import { randomBytes } from "crypto";

export function newIdGenerator(len: number): () => string {
	return () => randomBytes(len).toString("hex");
}
