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
export interface ChatService<C> {
	
	createGuild(ctx: C, request: CreateGuildRequest): Promise<CreateGuildResponse>
	
	createRoom(ctx: C, request: CreateRoomRequest): Promise<CreateRoomResponse>
	
	createDirectMessage(ctx: C, request: CreateDirectMessageRequest): Promise<CreateDirectMessageResponse>
	
	upgradeRoomToGuild(ctx: C, request: UpgradeRoomToGuildRequest): Promise<UpgradeRoomToGuildResponse>
	
	createInvite(ctx: C, request: CreateInviteRequest): Promise<CreateInviteResponse>
	
	createChannel(ctx: C, request: CreateChannelRequest): Promise<CreateChannelResponse>
	
	getGuildList(ctx: C, request: GetGuildListRequest): Promise<GetGuildListResponse>
	
	inviteUserToGuild(ctx: C, request: InviteUserToGuildRequest): Promise<InviteUserToGuildResponse>
	
	getPendingInvites(ctx: C, request: GetPendingInvitesRequest): Promise<GetPendingInvitesResponse>
	
	rejectPendingInvite(ctx: C, request: RejectPendingInviteRequest): Promise<RejectPendingInviteResponse>
	
	ignorePendingInvite(ctx: C, request: IgnorePendingInviteRequest): Promise<IgnorePendingInviteResponse>
	
	getGuild(ctx: C, request: GetGuildRequest): Promise<GetGuildResponse>
	
	getGuildInvites(ctx: C, request: GetGuildInvitesRequest): Promise<GetGuildInvitesResponse>
	
	getGuildMembers(ctx: C, request: GetGuildMembersRequest): Promise<GetGuildMembersResponse>
	
	getGuildChannels(ctx: C, request: GetGuildChannelsRequest): Promise<GetGuildChannelsResponse>
	
	getChannelMessages(ctx: C, request: GetChannelMessagesRequest): Promise<GetChannelMessagesResponse>
	
	getMessage(ctx: C, request: GetMessageRequest): Promise<GetMessageResponse>
	
	updateGuildInformation(ctx: C, request: UpdateGuildInformationRequest): Promise<UpdateGuildInformationResponse>
	
	updateChannelInformation(ctx: C, request: UpdateChannelInformationRequest): Promise<UpdateChannelInformationResponse>
	
	updateChannelOrder(ctx: C, request: UpdateChannelOrderRequest): Promise<UpdateChannelOrderResponse>
	
	updateAllChannelOrder(ctx: C, request: UpdateAllChannelOrderRequest): Promise<UpdateAllChannelOrderResponse>
	
	updateMessageText(ctx: C, request: UpdateMessageTextRequest): Promise<UpdateMessageTextResponse>
	
	deleteGuild(ctx: C, request: DeleteGuildRequest): Promise<DeleteGuildResponse>
	
	deleteInvite(ctx: C, request: DeleteInviteRequest): Promise<DeleteInviteResponse>
	
	deleteChannel(ctx: C, request: DeleteChannelRequest): Promise<DeleteChannelResponse>
	
	deleteMessage(ctx: C, request: DeleteMessageRequest): Promise<DeleteMessageResponse>
	
	joinGuild(ctx: C, request: JoinGuildRequest): Promise<JoinGuildResponse>
	
	leaveGuild(ctx: C, request: LeaveGuildRequest): Promise<LeaveGuildResponse>
	
	triggerAction(ctx: C, request: TriggerActionRequest): Promise<TriggerActionResponse>
	
	sendMessage(ctx: C, request: SendMessageRequest): Promise<SendMessageResponse>
	
	hasPermission(ctx: C, request: HasPermissionRequest): Promise<HasPermissionResponse>
	
	setPermissions(ctx: C, request: SetPermissionsRequest): Promise<SetPermissionsResponse>
	
	getPermissions(ctx: C, request: GetPermissionsRequest): Promise<GetPermissionsResponse>
	
	moveRole(ctx: C, request: MoveRoleRequest): Promise<MoveRoleResponse>
	
	getGuildRoles(ctx: C, request: GetGuildRolesRequest): Promise<GetGuildRolesResponse>
	
	addGuildRole(ctx: C, request: AddGuildRoleRequest): Promise<AddGuildRoleResponse>
	
	modifyGuildRole(ctx: C, request: ModifyGuildRoleRequest): Promise<ModifyGuildRoleResponse>
	
	deleteGuildRole(ctx: C, request: DeleteGuildRoleRequest): Promise<DeleteGuildRoleResponse>
	
	manageUserRoles(ctx: C, request: ManageUserRolesRequest): Promise<ManageUserRolesResponse>
	
	getUserRoles(ctx: C, request: GetUserRolesRequest): Promise<GetUserRolesResponse>
	
	typing(ctx: C, request: TypingRequest): Promise<TypingResponse>
	
	previewGuild(ctx: C, request: PreviewGuildRequest): Promise<PreviewGuildResponse>
	
	getBannedUsers(ctx: C, request: GetBannedUsersRequest): Promise<GetBannedUsersResponse>
	
	banUser(ctx: C, request: BanUserRequest): Promise<BanUserResponse>
	
	kickUser(ctx: C, request: KickUserRequest): Promise<KickUserResponse>
	
	unbanUser(ctx: C, request: UnbanUserRequest): Promise<UnbanUserResponse>
	
	getPinnedMessages(ctx: C, request: GetPinnedMessagesRequest): Promise<GetPinnedMessagesResponse>
	
	pinMessage(ctx: C, request: PinMessageRequest): Promise<PinMessageResponse>
	
	unpinMessage(ctx: C, request: UnpinMessageRequest): Promise<UnpinMessageResponse>
	
	addReaction(ctx: C, request: AddReactionRequest): Promise<AddReactionResponse>
	
	removeReaction(ctx: C, request: RemoveReactionRequest): Promise<RemoveReactionResponse>
	
	grantOwnership(ctx: C, request: GrantOwnershipRequest): Promise<GrantOwnershipResponse>
	
	giveUpOwnership(ctx: C, request: GiveUpOwnershipRequest): Promise<GiveUpOwnershipResponse>
	
	streamEvents(ctx: C, request: AsyncIterable<StreamEventsRequest>): AsyncIterable<StreamEventsResponse>
}
