import {
	PullRequest,
	PullResponse,
	PushRequest,
	PushResponse,
	NotifyNewIdRequest,
	NotifyNewIdResponse,
} from './sync';
export interface PostboxService<C> {
	
	pull(ctx: C, request: PullRequest): Promise<PullResponse>
	
	push(ctx: C, request: PushRequest): Promise<PushResponse>
	
	notifyNewId(ctx: C, request: NotifyNewIdRequest): Promise<NotifyNewIdResponse>
}
