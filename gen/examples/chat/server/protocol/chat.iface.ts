import {
	Message,
	Empty,
	Empty,
	Message,
} from './chat';
export interface Chat {
	
	sendMessage(request: Message): Promise<Empty>
	
	streamMessages(request: AsyncIterable<Empty>): AsyncIterable<Message>
}
