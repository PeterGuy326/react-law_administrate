import { CaseProListContentItem } from './case'

export interface GroupProListItem {
    groupId: string,
    groupName: string,
    content: CaseProListContentItem[]
}