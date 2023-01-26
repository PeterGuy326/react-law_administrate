export interface GetCommentListByCaseIdReq {
    caseId: string
}

export interface GetCommentListByCaseIdResp {
    content: string,
    creatorId: string,
    createdAt: string,
    updatedAt: string
}

export interface AddCommentReq {
    caseId: string,
    content: string
}

export interface AddCommentResp {
    isOk: boolean
}