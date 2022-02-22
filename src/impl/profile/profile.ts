import type { ProfileService } from "../../../gen/profile/v1/profile.iface";
import type { GetAppDataRequest, GetAppDataResponse, GetProfileRequest, GetProfileResponse, SetAppDataRequest, SetAppDataResponse, UpdateProfileRequest, UpdateProfileResponse } from "../../../gen/profile/v1/types";
import type { MotifContext } from "../../util/context";

export class ProfileServiceImpl implements ProfileService<MotifContext> {
	getProfile(ctx: MotifContext, { userId }: GetProfileRequest): Promise<GetProfileResponse> {
		throw new Error("Method not implemented.");
	}

	updateProfile(ctx: MotifContext, request: UpdateProfileRequest): Promise<UpdateProfileResponse> {
		throw new Error("Method not implemented.");
	}

	getAppData(ctx: MotifContext, request: GetAppDataRequest): Promise<GetAppDataResponse> {
		throw new Error("Method not implemented.");
	}

	setAppData(ctx: MotifContext, request: SetAppDataRequest): Promise<SetAppDataResponse> {
		throw new Error("Method not implemented.");
	}
}
