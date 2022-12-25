import request, { Resp } from './index'
import * as CaseApiType from './../types/api/case'

// 案件管理
export async function getCaseList (params: CaseApiType.GetCaseListReq): Promise<Resp<CaseApiType.GetCaseListResp>> {
    return await request.post('http://127.0.0.1:3000/administrate/case/getCaseList', params)
}

export async function saveCase (params: CaseApiType.SaveCaseReq): Promise<Resp<CaseApiType.SaveCaseResp>> {
    return await request.post('http://127.0.0.1:3000/administrate/case/saveCase', params)
}