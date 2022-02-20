import {
	StreamMessageRequest,
	StreamMessageResponse,
} from './voice';
export interface VoiceService {
	
	streamMessage(request: AsyncIterable<StreamMessageRequest>): AsyncIterable<StreamMessageResponse>
}
