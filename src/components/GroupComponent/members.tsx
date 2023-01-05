import { DownOutlined } from '@ant-design/icons'
import type { ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Dropdown, Popconfirm } from 'antd'
import React from 'react'

export type Member = {
	uid: string
	username: string
	role: RoleType
}

export type RoleMapType = Record<
	string,
	{
		name: string
		desc: string
	}
>

export type RoleType = 'leader' | 'admin' | 'member'

const RoleMap: RoleMapType = {
	leader: {
		name: '组长',
		desc: '修改组员，案件的权限',
	},
	admin: {
		name: '管理员',
		desc: '修改案件的权限',
	},
	member: {
		name: '组员',
		desc: '查看案件的权限',
	},
}

const MemberList: React.FC = () => {
	const tableListDataSource: Member[] = []

	const UserListByGroupId = () => {}

	const renderRemoveUser = (text: string) => (
		<Popconfirm key='popconfirm' title={`确认${text}吗?`} okText='是' cancelText='否'>
			<a>{text}</a>
		</Popconfirm>
	)

	const columns: ProColumns<Member>[] = [
		{
			dataIndex: 'uid',
			title: '成员账号',
			width: 150,
		},
		{
			dataIndex: 'username',
			title: '名称',
		},
		{
			dataIndex: 'role',
			title: '角色',
			render: (_, record) => (
				<Dropdown
					menu={{
						items: [
							{
								label: '管理员',
								key: 'admin',
							},
							{
								label: '操作员',
								key: 'operator',
							},
						],
					}}
				>
					<a>
						{RoleMap[record.role || 'admin'].name} <DownOutlined />
					</a>
				</Dropdown>
			),
		},
		{
			title: '操作',
			dataIndex: 'x',
			valueType: 'option',
			render: (_, record) => {
				let node = renderRemoveUser('退出')
				if (record.role === 'admin') {
					node = renderRemoveUser('移除')
				}
				return [<a key='edit'>编辑</a>, node]
			},
		},
	]

	return (
		<ProTable<Member>
			columns={columns}
			dataSource={tableListDataSource}
			rowKey='outUserNo'
			pagination={{
				showQuickJumper: true,
			}}
			toolBarRender={false}
			search={false}
		/>
	)
}

export default MemberList
