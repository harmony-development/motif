import {
	FetchLinkMetadataRequest,
	FetchLinkMetadataResponse,
	InstantViewRequest,
	InstantViewResponse,
	CanInstantViewRequest,
	CanInstantViewResponse,
} from './mediaproxy';
export interface MediaProxyService<C> {
	
	fetchLinkMetadata(ctx: C, request: FetchLinkMetadataRequest): Promise<FetchLinkMetadataResponse>
	
	instantView(ctx: C, request: InstantViewRequest): Promise<InstantViewResponse>
	
	canInstantView(ctx: C, request: CanInstantViewRequest): Promise<CanInstantViewResponse>
}
