import createCallsiteRecord from "callsite-record";
import { RequestError, errors } from "../errors";
import type { KoaMotifContext } from "./context";

export const errorHandler =
	(debug = true) =>
	(e: unknown) => {
		if (debug && e instanceof Error) {
			console.error("error:", e.message);
			try {
				// eslint-disable-next-line no-console
				console.log(
					createCallsiteRecord({
						forError: e,
						isCallsiteFrame: (opts) => opts.functionName !== "WrappedPool.query",
					})?.renderSync({
						stackFilter: (frame) => !frame.fileName?.includes("node_modules") && !frame.fileName?.startsWith("node:"),
						frameSize: 2,
					})
				);
			} catch (_) {
				console.error(e);
			}
		} else {
			console.error(e);
		}
	};

export const errorHandlerMiddleware = (debug = true) => {
	const handler = errorHandler(debug);
	return async (ctx: KoaMotifContext, next: () => Promise<any>) => {
		try {
			await next();
		} catch (e) {
			if (e instanceof RequestError) {
				ctx.status = 400;
				ctx.body = ctx.headers.accept === "application/hrpc-json" ? e.jsonMessage : e.protoMessage;
			} else {
				ctx.status = 500;
				ctx.body = ctx.headers.accept === "application/hrpc-json" ? errors["h.internal-error"].jsonMessage : errors["h.internal-error"].protoMessage;
				handler(e);
			}
		}
	};
};
