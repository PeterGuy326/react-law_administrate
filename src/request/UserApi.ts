import request, { Resp } from './index'
import * as UserApiType from './../types/api/user'

export async function listUsersByGroupId(params: UserApiType.ListUsersByGroupIdReq): Promise<Resp<UserApiType.ListUsersByGroupIdResp[]>> {
	return await request.post('http://127.0.0.1:3000/administrate/user/listUsersByGroupId', params)
}

export async function updateUsersGroupByLeader(params: UserApiType.UpdateUsersGroupByLeaderReq): Promise<Resp<UserApiType.UpdateUsersGroupByLeaderResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/user/updateUsersGroupByLeader', params)
}

export async function deleteUsersGroupByLeader(params: UserApiType.DeleteUsersGroupByLeaderReq): Promise<Resp<UserApiType.DeleteUsersGroupByLeaderRes>> {
	return await request.post('http://127.0.0.1:3000/administrate/user/deleteUsersGroupByLeader', params)
}

export async function getUserInfo(): Promise<Resp<UserApiType.GetUserInfoResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/user/getUserInfo')
}