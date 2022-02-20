import {
	CreateGuildRequest,
	CreateGuildResponse,
	CreateRoomRequest,
	CreateRoomResponse,
	CreateDirectMessageRequest,
	CreateDirectMessageResponse,
	UpgradeRoomToGuildRequest,
	UpgradeRoomToGuildResponse,
	CreateInviteRequest,
	CreateInviteResponse,
	CreateChannelRequest,
	CreateChannelResponse,
	GetGuildListRequest,
	GetGuildListResponse,
	InviteUserToGuildRequest,
	InviteUserToGuildResponse,
	GetPendingInvitesRequest,
	GetPendingInvitesResponse,
	RejectPendingInviteRequest,
	RejectPendingInviteResponse,
	IgnorePendingInviteRequest,
	IgnorePendingInviteResponse,
	GetGuildRequest,
	GetGuildResponse,
	GetGuildInvitesRequest,
	GetGuildInvitesResponse,
	GetGuildMembersRequest,
	GetGuildMembersResponse,
	GetGuildChannelsRequest,
	GetGuildChannelsResponse,
	GetChannelMessagesRequest,
	GetChannelMessagesResponse,
	GetMessageRequest,
	GetMessageResponse,
	UpdateGuildInformationRequest,
	UpdateGuildInformationResponse,
	UpdateChannelInformationRequest,
	UpdateChannelInformationResponse,
	UpdateChannelOrderRequest,
	UpdateChannelOrderResponse,
	UpdateAllChannelOrderRequest,
	UpdateAllChannelOrderResponse,
	UpdateMessageTextRequest,
	UpdateMessageTextResponse,
	DeleteGuildRequest,
	DeleteGuildResponse,
	DeleteInviteRequest,
	DeleteInviteResponse,
	DeleteChannelRequest,
	DeleteChannelResponse,
	DeleteMessageRequest,
	DeleteMessageResponse,
	JoinGuildRequest,
	JoinGuildResponse,
	LeaveGuildRequest,
	LeaveGuildResponse,
	TriggerActionRequest,
	TriggerActionResponse,
	SendMessageRequest,
	SendMessageResponse,
	HasPermissionRequest,
	HasPermissionResponse,
	SetPermissionsRequest,
	SetPermissionsResponse,
	GetPermissionsRequest,
	GetPermissionsResponse,
	MoveRoleRequest,
	MoveRoleResponse,
	GetGuildRolesRequest,
	GetGuildRolesResponse,
	AddGuildRoleRequest,
	AddGuildRoleResponse,
	ModifyGuildRoleRequest,
	ModifyGuildRoleResponse,
	DeleteGuildRoleRequest,
	DeleteGuildRoleResponse,
	ManageUserRolesRequest,
	ManageUserRolesResponse,
	GetUserRolesRequest,
	GetUserRolesResponse,
	TypingRequest,
	TypingResponse,
	PreviewGuildRequest,
	PreviewGuildResponse,
	GetBannedUsersRequest,
	GetBannedUsersResponse,
	BanUserRequest,
	BanUserResponse,
	KickUserRequest,
	KickUserResponse,
	UnbanUserRequest,
	UnbanUserResponse,
	GetPinnedMessagesRequest,
	GetPinnedMessagesResponse,
	PinMessageRequest,
	PinMessageResponse,
	UnpinMessageRequest,
	UnpinMessageResponse,
	StreamEventsRequest,
	StreamEventsResponse,
	AddReactionRequest,
	AddReactionResponse,
	RemoveReactionRequest,
	RemoveReactionResponse,
	GrantOwnershipRequest,
	GrantOwnershipResponse,
	GiveUpOwnershipRequest,
	GiveUpOwnershipResponse,
} from './chat';
export interface ChatService {
	
	createGuild(request: CreateGuildRequest): Promise<CreateGuildResponse>
	
	createRoom(request: CreateRoomRequest): Promise<CreateRoomResponse>
	
	createDirectMessage(request: CreateDirectMessageRequest): Promise<CreateDirectMessageResponse>
	
	upgradeRoomToGuild(request: UpgradeRoomToGuildRequest): Promise<UpgradeRoomToGuildResponse>
	
	createInvite(request: CreateInviteRequest): Promise<CreateInviteResponse>
	
	createChannel(request: CreateChannelRequest): Promise<CreateChannelResponse>
	
	getGuildList(request: GetGuildListRequest): Promise<GetGuildListResponse>
	
	inviteUserToGuild(request: InviteUserToGuildRequest): Promise<InviteUserToGuildResponse>
	
	getPendingInvites(request: GetPendingInvitesRequest): Promise<GetPendingInvitesResponse>
	
	rejectPendingInvite(request: RejectPendingInviteRequest): Promise<RejectPendingInviteResponse>
	
	ignorePendingInvite(request: IgnorePendingInviteRequest): Promise<IgnorePendingInviteResponse>
	
	getGuild(request: GetGuildRequest): Promise<GetGuildResponse>
	
	getGuildInvites(request: GetGuildInvitesRequest): Promise<GetGuildInvitesResponse>
	
	getGuildMembers(request: GetGuildMembersRequest): Promise<GetGuildMembersResponse>
	
	getGuildChannels(request: GetGuildChannelsRequest): Promise<GetGuildChannelsResponse>
	
	getChannelMessages(request: GetChannelMessagesRequest): Promise<GetChannelMessagesResponse>
	
	getMessage(request: GetMessageRequest): Promise<GetMessageResponse>
	
	updateGuildInformation(request: UpdateGuildInformationRequest): Promise<UpdateGuildInformationResponse>
	
	updateChannelInformation(request: UpdateChannelInformationRequest): Promise<UpdateChannelInformationResponse>
	
	updateChannelOrder(request: UpdateChannelOrderRequest): Promise<UpdateChannelOrderResponse>
	
	updateAllChannelOrder(request: UpdateAllChannelOrderRequest): Promise<UpdateAllChannelOrderResponse>
	
	updateMessageText(request: UpdateMessageTextRequest): Promise<UpdateMessageTextResponse>
	
	deleteGuild(request: DeleteGuildRequest): Promise<DeleteGuildResponse>
	
	deleteInvite(request: DeleteInviteRequest): Promise<DeleteInviteResponse>
	
	deleteChannel(request: DeleteChannelRequest): Promise<DeleteChannelResponse>
	
	deleteMessage(request: DeleteMessageRequest): Promise<DeleteMessageResponse>
	
	joinGuild(request: JoinGuildRequest): Promise<JoinGuildResponse>
	
	leaveGuild(request: LeaveGuildRequest): Promise<LeaveGuildResponse>
	
	triggerAction(request: TriggerActionRequest): Promise<TriggerActionResponse>
	
	sendMessage(request: SendMessageRequest): Promise<SendMessageResponse>
	
	hasPermission(request: HasPermissionRequest): Promise<HasPermissionResponse>
	
	setPermissions(request: SetPermissionsRequest): Promise<SetPermissionsResponse>
	
	getPermissions(request: GetPermissionsRequest): Promise<GetPermissionsResponse>
	
	moveRole(request: MoveRoleRequest): Promise<MoveRoleResponse>
	
	getGuildRoles(request: GetGuildRolesRequest): Promise<GetGuildRolesResponse>
	
	addGuildRole(request: AddGuildRoleRequest): Promise<AddGuildRoleResponse>
	
	modifyGuildRole(request: ModifyGuildRoleRequest): Promise<ModifyGuildRoleResponse>
	
	deleteGuildRole(request: DeleteGuildRoleRequest): Promise<DeleteGuildRoleResponse>
	
	manageUserRoles(request: ManageUserRolesRequest): Promise<ManageUserRolesResponse>
	
	getUserRoles(request: GetUserRolesRequest): Promise<GetUserRolesResponse>
	
	typing(request: TypingRequest): Promise<TypingResponse>
	
	previewGuild(request: PreviewGuildRequest): Promise<PreviewGuildResponse>
	
	getBannedUsers(request: GetBannedUsersRequest): Promise<GetBannedUsersResponse>
	
	banUser(request: BanUserRequest): Promise<BanUserResponse>
	
	kickUser(request: KickUserRequest): Promise<KickUserResponse>
	
	unbanUser(request: UnbanUserRequest): Promise<UnbanUserResponse>
	
	getPinnedMessages(request: GetPinnedMessagesRequest): Promise<GetPinnedMessagesResponse>
	
	pinMessage(request: PinMessageRequest): Promise<PinMessageResponse>
	
	unpinMessage(request: UnpinMessageRequest): Promise<UnpinMessageResponse>
	
	addReaction(request: AddReactionRequest): Promise<AddReactionResponse>
	
	removeReaction(request: RemoveReactionRequest): Promise<RemoveReactionResponse>
	
	grantOwnership(request: GrantOwnershipRequest): Promise<GrantOwnershipResponse>
	
	giveUpOwnership(request: GiveUpOwnershipRequest): Promise<GiveUpOwnershipResponse>
	
	streamEvents(request: AsyncIterable<StreamEventsRequest>): AsyncIterable<StreamEventsResponse>
}
