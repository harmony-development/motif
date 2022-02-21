import parse from "co-body";
import type Router from "koa-router";
import type { Reader, Writer } from "protobufjs/minimal";
import type * as ws from "ws";
import { pEventIterator } from "../lib/p-event.js";

export function registerService<S extends IService>(
	unaryRouter: Router,
	streamRouter: Router,
	service: S,
	impl: Record<
	keyof S["methods"],
	UnaryHandler<any, any> | StreamHandler<any, any>
	>,
) {
	for (const [fnName, method] of Object.entries(service.methods)) {
		const handler = impl[fnName];
		const handlerPath = `/${service.fullName}/${method.name}`;

		// todo: handle authentication
		if (method.requestStream || method.responseStream) {
			streamRouter.all(handlerPath, async(ctx) => {
				const websocket = (ctx as any).websocket as ws; // TODO: fix type
				const requestIterator = pEventIterator(websocket, "message", {
					resolutionEvents: ["error", "close"],
				});
				const responseIterator = handler(
					requestIterator,
				) as any as AsyncIterable<any>;
				for await (const response of responseIterator)
					websocket.send(method.responseType.encode(response).finish());
			});
		}
		else {
			unaryRouter.post(handlerPath, async(ctx) => {
				const data = await parse(ctx.request);
				const msg = method.requestType.decode(data);
				const result = await handler(msg);
				ctx.body = method.responseType.encode(result).finish();
			});
		}
	}
}

interface IMethod<I, O, T> {
	// "Federate"
	name: string
	requestType: ProtoMessage<I>
	requestStream: boolean
	responseType: ProtoMessage<O>
	responseStream: boolean
	options: T
}

interface IService {
	// "AuthService"
	name: string
	// "protocol.auth.v1.AuthService"
	fullName: string
	methods: Record<string, IMethod<any, any, any>>
}

interface ProtoMessage<T> {
	encode(msg: T): Writer
	decode(read: Reader): T
	toJSON(msg: T): unknown
	fromJSON(data: unknown): T
}

type UnaryHandler<I, O> = (request: I) => Promise<O>;

type StreamHandler<I, O> = (request: AsyncIterable<I>) => AsyncIterable<O>;
