import type { ProfileService } from "../../../gen/profile/v1/profile.iface";
import type {
	GetAppDataRequest,
	GetAppDataResponse,
	GetProfileRequest,
	GetProfileResponse,
	SetAppDataRequest,
	SetAppDataResponse,
	UpdateProfileRequest,
	UpdateProfileResponse,
} from "../../../gen/profile/v1/types";
import { AccountKind, UserStatus } from "../../../gen/profile/v1/types";
import { arrayToObj } from "../../util/common";
import type { MotifContext } from "../../util/context";

export class ProfileServiceImpl implements ProfileService<MotifContext> {
	async getProfile(ctx: MotifContext, { userId }: GetProfileRequest): Promise<GetProfileResponse> {
		const profiles = await ctx.db.profile.getProfilesById(userId);
		return {
			profile: arrayToObj(profiles, (p) => [
				p.id,
				{
					userName: p.username,
					profile: p.avatar,
					userStatus: UserStatus.USER_STATUS_ONLINE,
					accountKind: AccountKind.ACCOUNT_KIND_FULL_UNSPECIFIED,
				},
			]),
		};
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
