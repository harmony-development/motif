import parse from "co-body";
import Router from "koa-router";
import { Reader, Writer } from "protobufjs/minimal";

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

type UnaryHandler<I, O> = (request: I) => Promise<O>;

type StreamHandler<I, O> = (request: AsyncIterator<I>) => AsyncIterator<O>;

export function registerService<S extends IService>(
  router: Router,
  service: S,
  impl: Record<
    keyof S["methods"],
    UnaryHandler<any, any> | StreamHandler<any, any>
  >
) {
  for (const [fnName, method] of Object.entries(service.methods)) {
    const handler = impl[fnName];
    router.post(`/${service.fullName}.${method.name}`, async (ctx) => {
      const data = await parse(ctx.request);
      const msg = method.requestType.decode(data);
      const result = await handler(msg);
      ctx.body = method.responseType.encode(result).finish();
    });
  }
}
