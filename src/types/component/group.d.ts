import { CaseProListContentItem } from './case'

export interface GroupProListItem {
    groupId: string,
    groupName: string,
    leaderId: string,
    leaderName: string,
    createdAt: string,
    updatedAt: string,
}

export interface MembersProTableItem {
    uid: string
    username: string
    role: string
}