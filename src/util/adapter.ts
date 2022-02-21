import rawBody from "raw-body";
import type Router from "koa-router";
import type { Reader, Writer } from "protobufjs/minimal";
import { BufferReader } from "protobufjs/minimal";
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
				const rawRequestIterator = pEventIterator(websocket, "message", {
					resolutionEvents: ["error", "close"],
				});
				const requestIterator = {
					[Symbol.asyncIterator]() {
						return {
							async next() {
								const request = await rawRequestIterator.next();
								return { value: method.requestType.decode(request.value), done: request.done };
							},
						};
					},
				};
				const responseIterator = handler.bind(impl)(
					requestIterator,
				) as any as AsyncIterable<any>;
				for await (const response of responseIterator)
					websocket.send(method.responseType.encode(response).finish());
			});
		}
		else {
			unaryRouter.post(handlerPath, async(ctx) => {
				const data = await rawBody(ctx.req);
				const msg = method.requestType.decode(new BufferReader(data));
				const result = await handler.bind(impl)(msg);
				ctx.body = method.responseType.encode(result).finish();
				ctx.set("Content-Type", "application/hrpc");
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
