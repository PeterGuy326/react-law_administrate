export interface ListUsersByGroupIdReq {
    groupId: string
}

export interface ListUsersByGroupIdResp {
    uid: string,
	username: string,
    role: number
}

export interface UpdateUsersGroupByLeaderReq {
    groupId: string,
	uidList: string[]
}

export interface UpdateUsersGroupByLeaderResp {
    isOk: boolean
}

export interface DeleteUsersGroupByLeaderReq {
    uidList: string[]
}

export interface DeleteUsersGroupByLeaderRes {
    isOk: boolean
}

export interface GetUserInfoReq {}

export interface GetUserInfoResp {
    uid: string,
	username: string,
	groupId: string,
	role: number
}