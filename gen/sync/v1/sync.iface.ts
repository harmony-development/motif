import {
	PullRequest,
	PullResponse,
	PushRequest,
	PushResponse,
	NotifyNewIdRequest,
	NotifyNewIdResponse,
} from './sync';
export interface PostboxService {
	
	pull(request: PullRequest): Promise<PullResponse>
	
	push(request: PushRequest): Promise<PushResponse>
	
	notifyNewId(request: NotifyNewIdRequest): Promise<NotifyNewIdResponse>
}
