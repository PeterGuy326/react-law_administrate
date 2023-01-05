import request, { Resp } from './index'
import * as UserApiType from './../types/api/user'

export async function listUsersByGroupId(params: UserApiType.ListUsersByGroupIdReq): Promise<Resp<UserApiType.ListUsersByGroupIdResp[]>> {
	return await request.post('http://127.0.0.1:3000/administrate/user/listUsersByGroupId', params)
}
