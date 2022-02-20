import {
	StreamMessageRequest,
	StreamMessageResponse,
} from './voice';
export interface VoiceService {
	
	streamMessage(request: AsyncIterator<StreamMessageRequest>): AsyncIterator<StreamMessageResponse>
}
