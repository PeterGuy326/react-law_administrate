export interface ListUsersByGroupIdReq {
    groupId: string
}

export interface ListUsersByGroupIdResp {
    uid: string,
	username: string,
    role: number
}