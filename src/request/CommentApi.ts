import request, { Resp } from './index'
import * as CommentApiType from './../types/api/comment'

export async function getCommentListByCaseId(params: CommentApiType.GetCommentListByCaseIdReq): Promise<Resp<CommentApiType.GetCommentListByCaseIdResp[]>> {
    return await request.post('http://127.0.0.1:3000/administrate/comment/getCommentListByCaseId', params)
}

export async function addComment(params: CommentApiType.AddCommentReq): Promise<Resp<CommentApiType.AddCommentResp>> {
    return await request.post('http://127.0.0.1:3000/administrate/comment/addComment', params)
}