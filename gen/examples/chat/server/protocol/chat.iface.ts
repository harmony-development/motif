import {
	Message,
	Empty,
	Empty,
	Message,
} from './chat';
export interface Chat<C> {
	
	sendMessage(ctx: C, request: Message): Promise<Empty>
	
	streamMessages(ctx: C, request: AsyncIterable<Empty>): AsyncIterable<Message>
}
