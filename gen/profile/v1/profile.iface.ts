import {
	GetProfileRequest,
	GetProfileResponse,
	UpdateProfileRequest,
	UpdateProfileResponse,
	GetAppDataRequest,
	GetAppDataResponse,
	SetAppDataRequest,
	SetAppDataResponse,
} from './profile';
export interface ProfileService<C> {
	
	getProfile(ctx: C, request: GetProfileRequest): Promise<GetProfileResponse>
	
	updateProfile(ctx: C, request: UpdateProfileRequest): Promise<UpdateProfileResponse>
	
	getAppData(ctx: C, request: GetAppDataRequest): Promise<GetAppDataResponse>
	
	setAppData(ctx: C, request: SetAppDataRequest): Promise<SetAppDataResponse>
}
