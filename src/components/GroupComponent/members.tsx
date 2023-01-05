import { DownOutlined } from '@ant-design/icons'
import type { ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Dropdown, Popconfirm } from 'antd'
import React, { useEffect } from 'react'
import * as UserApi from '../../request/UserApi'
import * as UserConstant from '../../constant/user'

export type Member = {
	uid: string
	username: string
	role: number
}

const MemberList: React.FC = () => {
	let tableListDataSource: Member[] = []

	useEffect(() => {
		userListByGroupId()
	}, [])

	const userListByGroupId = async () => {
		const groupId = new URLSearchParams(window.location.search).get('id') || ''
		const tableListDataSourceTmp: Member[] = []
		if (groupId !== '') {
			const { data } = await UserApi.listUsersByGroupId({ groupId })
			data.map((item) => {
				const { uid, username, role } = item
				tableListDataSourceTmp.push({
					uid,
					username,
					role
				})
			})
		}
		tableListDataSource = tableListDataSourceTmp
	}

	const renderRemoveUser = (text: string) => (
		<Popconfirm key='popconfirm' title={`确认${text}吗?`} okText='是' cancelText='否'>
			<a>{text}</a>
		</Popconfirm>
	)

	const columns: ProColumns<Member>[] = [
		{
			dataIndex: 'uid',
			title: '账号',
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
								label: '组长',
								key: 'leader',
							},
							{
								label: '管理员',
								key: 'admin',
							},
							{
								label: '组员',
								key: 'member',
							},
						],
					}}
				>
					<a>
						{UserConstant.RoleMapType[record.role].name} <DownOutlined />
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
				// if (record.role === 'admin') {
				// 	node = renderRemoveUser('移除')
				// }
				return [<a key='edit'>编辑</a>, node]
			},
		},
	]

	return (
		<ProTable<Member>
			columns={columns}
			rowKey='uid'
			pagination={{
				showQuickJumper: true,
			}}
			toolBarRender={false}
			search={false}
		/>
	)
}

export default MemberList
