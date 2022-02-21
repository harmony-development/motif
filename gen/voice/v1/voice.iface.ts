import {
	StreamMessageRequest,
	StreamMessageResponse,
} from './voice';
export interface VoiceService<C> {
	
	streamMessage(ctx: C, request: AsyncIterable<StreamMessageRequest>): AsyncIterable<StreamMessageResponse>
}
