import type Router from "koa-router";
import type { Reader, Writer } from "protobufjs/minimal";
import { BufferReader } from "protobufjs/minimal";
import rawBody from "raw-body";
import type * as ws from "ws";
import { pEventIterator } from "../lib/p-event.js";
import type { MotifContext } from "./context";

export const newServiceManager =
	(unaryRouter: Router, streamRouter: Router) =>
	<S extends IService>(service: S, impl: Record<keyof S["methods"], UnaryHandler<any, any, MotifContext> | StreamHandler<any, any, MotifContext>>) => {
		for (const [fnName, method] of Object.entries(service.methods)) {
			const handler = impl[fnName];
			const handlerPath = `/${service.fullName}/${method.name}`;
			if (method.requestStream || method.responseStream) {
				streamRouter.all(handlerPath, async (ctx) => {
					const websocket = (ctx as any).websocket as ws; // TODO: fix type
					const rawRequestIterator = pEventIterator(websocket, "message", {
						resolutionEvents: ["error", "close"],
					});
					const requestIterator = {
						[Symbol.asyncIterator]() {
							return {
								async next() {
									const request = await rawRequestIterator.next();
									return {
										value:
											ctx.headers["content-type"] === "application/hrpc-json"
												? method.requestType.fromJSON(request.value)
												: method.requestType.decode(request.value),
										done: request.done,
									};
								},
							};
						},
					};

					const responseIterator = handler.bind(impl)(ctx.state, requestIterator) as AsyncIterable<Uint8Array>;

					if (ctx.headers.accept === "application/hrpc-json") {
						for await (const response of responseIterator) {
							// todo: this is really bad
							const json = method.responseType.toJSON(method.responseType.decode(response as any));
							websocket.send(`1${JSON.stringify(json)}`);
						}
					} else {
						for await (const response of responseIterator) websocket.send(Buffer.concat([new Uint8Array([0]), response]));
					}
				});
			} else {
				unaryRouter.post(handlerPath, async (ctx) => {
					const data = await rawBody(ctx.req);
					const msg =
						ctx.headers["content-type"] === "application/hrpc-json"
							? method.requestType.fromJSON(JSON.parse(data.toString("utf-8")))
							: method.requestType.decode(new BufferReader(data));

					const result = await handler.bind(impl)(ctx.state, msg);

					ctx.body = ctx.headers.accept === "application/hrpc-json" ? method.responseType.toJSON(result) : method.responseType.encode(result).finish();
					ctx.set("Content-Type", "application/hrpc");
				});
			}
		}
	};

interface IMethod<I, O, T> {
	// "Federate"
	name: string;
	requestType: ProtoMessage<I>;
	requestStream: boolean;
	responseType: ProtoMessage<O>;
	responseStream: boolean;
	options: T;
}

interface IService {
	// "AuthService"
	name: string;
	// "protocol.auth.v1.AuthService"
	fullName: string;
	methods: Record<string, IMethod<any, any, any>>;
}

interface ProtoMessage<T> {
	encode(msg: T): Writer;
	decode(read: Reader): T;
	toJSON(msg: T): unknown;
	fromJSON(data: unknown): T;
}

type UnaryHandler<I, O, C> = (ctx: C, request: I) => Promise<O>;

type StreamHandler<I, O, C> = (ctx: C, request: AsyncIterable<I>) => AsyncIterable<O>;
