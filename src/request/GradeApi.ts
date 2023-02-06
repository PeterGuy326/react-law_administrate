import request, { Resp } from './index'
import * as GradeType from './../types/api/grade'

export async function saveGradeByCaseId(params: GradeType.SaveGradeByCaseIdReq): Promise<Resp<GradeType.SaveGradeByCaseIdResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/grade/saveGradeByCaseId', params)
}


export async function getGradeByUid(params: GradeType.GetGradeByUidReq): Promise<Resp<GradeType.GetGradeByUidResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/grade/getGradeByUid', params)
}