import request, { Resp } from './index'
import * as CaseApiType from './../types/api/case'

// 案件管理
export async function getCaseList(params: CaseApiType.GetCaseListReq): Promise<Resp<CaseApiType.GetCaseListResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/case/getCaseList', params)
}

export async function saveCase(params: CaseApiType.SaveCaseReq): Promise<Resp<CaseApiType.SaveCaseResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/case/saveCase', params)
}

export async function getCaseDetail(params: CaseApiType.GetCaseDetailReq): Promise<Resp<CaseApiType.GetCaseDetailResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/case/getCaseDetail', params)
}

export async function getRecommendCaseList(): Promise<Resp<CaseApiType.GetRecommendCaseListResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/case/getRecommendCaseList')
}

export async function getMineCaseList(params: CaseApiType.GetMineCaseListReq): Promise<Resp<CaseApiType.GetMineCaseListResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/case/getMineCaseList', params)
}

export async function getCount(params: CaseApiType.GetCountReq): Promise<Resp<CaseApiType.GetCountResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/case/getCount', params)
}