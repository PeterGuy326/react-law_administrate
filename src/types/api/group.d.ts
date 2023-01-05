export interface ListAllGroupsResp {
    groupId: string,
    groupName: string,
    leaderId: string,
    leaderName: string,
    createdTime: string,
    updatedTime: string
}

export interface ListUsersByGroupIdReq {
    groupId: string
}

export interface ListUsersByGroupIdResp {
    uid: string,
	username: string,
    role: number
}