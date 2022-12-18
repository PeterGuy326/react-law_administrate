import * as AdministrateApiType from './../types/api/administrate';
import request, { Resp } from './index'

// 根据密码登录
export async function loginByPassword (params: AdministrateApiType.LoginByPasswordReq): Promise<Resp<AdministrateApiType.LoginByPasswordRes>> {
    // return request.post('http://42.192.155.212:3000/administrate/index/loginByPassword')
    return await request.post('http://127.0.0.1:3000/administrate/index/loginByPassword', params)
}