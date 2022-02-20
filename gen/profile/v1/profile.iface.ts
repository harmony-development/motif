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
export interface ProfileService {
	
	getProfile(request: GetProfileRequest): Promise<GetProfileResponse>
	
	updateProfile(request: UpdateProfileRequest): Promise<UpdateProfileResponse>
	
	getAppData(request: GetAppDataRequest): Promise<GetAppDataResponse>
	
	setAppData(request: SetAppDataRequest): Promise<SetAppDataResponse>
}
