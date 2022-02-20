import {
	FetchLinkMetadataRequest,
	FetchLinkMetadataResponse,
	InstantViewRequest,
	InstantViewResponse,
	CanInstantViewRequest,
	CanInstantViewResponse,
} from './mediaproxy';
export interface MediaProxyService {
	
	fetchLinkMetadata(request: FetchLinkMetadataRequest): Promise<FetchLinkMetadataResponse>
	
	instantView(request: InstantViewRequest): Promise<InstantViewResponse>
	
	canInstantView(request: CanInstantViewRequest): Promise<CanInstantViewResponse>
}
