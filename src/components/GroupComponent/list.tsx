import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as GroupApi from '../../request/GroupApi'
import * as GroupComponentType from '../../types/component/group'

export default () => {
    const [dataSource, setDataSource] = useState<GroupComponentType.GroupProListItem[]>([])
    const columns: ColumnsType<GroupComponentType.GroupProListItem> = [
        {
            title: '部门Id',
            dataIndex: 'groupId',
            key: 'groupId',
        },
        {
            title: '部门名称',
            dataIndex: 'groupName',
            key: 'groupName',
        },
        {
            title: '组长',
            dataIndex: 'leaderName',
            key: 'leaderName',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={linkToGroupDetail(record.groupId)}>查看</Button>
                    <Button>删除</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getGroupList()
    }, [])

    const navigateTo = useNavigate()

    const linkToGroupDetail = (groupId: string) => {
        navigateTo(`/memberListByGroupId?id=${groupId}`)
        return undefined
    }

    const getGroupList = async () => {
        const { data } = await GroupApi.listAllGroups()
        const dataSourceTemp: GroupComponentType.GroupProListItem[] = []
        data.map(item => {
            const { groupId, groupName, leaderId, leaderName, createdTime, updatedTime } = item
            dataSourceTemp.push({
                groupId,
                groupName,
                leaderId,
                leaderName,
                createdAt: createdTime,
                updatedAt: updatedTime
            })
        })
        setDataSource(dataSourceTemp)
    }

    return (
        <Table columns={columns} dataSource={dataSource} />
    )
}
