export interface SaveGradeByCaseIdReq {
    caseId: string,
    score: number
}

export interface SaveGradeByCaseIdResp {
    isOk: boolean
}

export interface GetGradeByUidReq {
    caseId: string
}

export interface GetGradeByUidResp {
    score: number
}