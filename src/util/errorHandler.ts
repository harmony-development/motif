import createCallsiteRecord from "callsite-record";
import { errors, RequestError } from "../errors";
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
			return await next();
		} catch (e) {
			if (e instanceof RequestError) {
				ctx.status = 400;
				ctx.body = e.toMessage(ctx.headers.accept);
			} else {
				handler(e);
				ctx.status = 500;
				ctx.body = errors["h.internal-error"].toMessage(ctx.headers.accept);
			}
		}
	};
};

export const wsErrorHandlerMiddleware = (debug = true) => {
	const handler = errorHandler(debug);
	return async (ctx: KoaMotifContext, next: () => Promise<any>) => {
		try {
			return await next();
		} catch (e) {
			if (e instanceof RequestError) {
				ctx.websocket.send(e.toMessage(ctx.headers.accept));
			} else {
				handler(e);
				ctx.websocket.send(errors["h.internal-error"].toMessage(ctx.headers.accept));
			}
		}
	};
};
