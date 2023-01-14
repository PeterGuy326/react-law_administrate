export interface GetCaseListReq {
    startTime?: string,
    endTime?: string,
    category?: string,
    page?: number,
    size?: number
}

export interface GetCaseItem {
    caseId: string,
    name: string,
    category: string,
    desc: string,
    createdTime: string,
    updatedTIme: string
}

export interface GetCaseListResp {
    total: number,
    list: GetCaseItem[]
}

export interface SaveCaseReq {
    caseId?: string,
    name?: string,
    category?: string,
    filenameList?: string[],
    text?: string,
    desc?: string
}

export interface SaveCaseResp {
    caseId: string
}