import { sep } from "path";
import createCallsiteRecord from "callsite-record";
import { RequestError, errors } from "../errors";
import type { KoaMotifContext } from "./context";

export const errorHandler = (debug = true) => async(ctx: KoaMotifContext, next: () => Promise<any>) => {
	try {
		await next();
	}
	catch (e) {
		if (e instanceof RequestError) {
			ctx.status = 400;
			ctx.body = e.protoMessage;
		}
		else {
			ctx.status = 500;
			ctx.body = errors["h.internal-error"].protoMessage;
			if (debug && e instanceof Error) {
				console.log(createCallsiteRecord({ forError: e })?.renderSync({
					stackFilter: frame => !frame.fileName?.includes("node_modules") && !frame.fileName?.includes("node:internal"),
				}));
			}

			else { console.error(e); }
		}
	}
};
