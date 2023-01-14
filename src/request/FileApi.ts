import request, { Resp } from './index'
import * as FileApiType from './../types//api/file'

export async function deleteByFilename(params: FileApiType.DeleteByFilenameReq): Promise<Resp<FileApiType.DeleteByFilenameResp>> {
	return await request.post('http://127.0.0.1:3000/administrate/file/deleteByFilename', params)
}
