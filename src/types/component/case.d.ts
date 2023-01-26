export interface CaseProListItem {
    caseId: string,
    name: string,
    desc: string,
    category: string,
    content: CaseProListContentItem[],
}

export interface CaseProListContentItem {
    label: string,
    value: string
}

export interface CaseDetailCommentItem {
    creatorId: string,
    content: string,
    createdAt: string,
    updatedAt: string
}