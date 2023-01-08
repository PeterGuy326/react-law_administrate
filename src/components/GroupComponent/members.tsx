import * as GroupComponentType from '../../types/component/group'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { useState, useEffect } from 'react'
import * as UserApi from '../../request/UserApi'
import * as UserConstant from '../../constant/user'
import AddMemberButton from './addMember'
import { Button, message, Space } from 'antd'

export default () => {
	const [dataSource, setDataSource] = useState<GroupComponentType.MembersProTableItem[]>([])
	const groupId = new URLSearchParams(window.location.search).get('id') || ''
	const columns: ProColumns<GroupComponentType.MembersProTableItem>[] = [
		{
			title: '账号',
			dataIndex: 'uid',
			key: 'uid'
		},
		{
			title: '名称',
			dataIndex: 'username',
			key: 'username'
		},
		{
			title: '角色',
			dataIndex: 'role',
			key: 'role'
		},
		{
			title: '操作',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Button type="link" onClick={() => deleteUserInGroup(record.uid)}>删除</Button>
				</Space>
			)
		}
	]

	useEffect(() => {
		userListByGroupId()
	}, [])

	const userListByGroupId = async () => {
		const tableListDataSourceTmp: GroupComponentType.MembersProTableItem[] = []
		if (groupId !== '') {
			const { data } = await UserApi.listUsersByGroupId({ groupId })
			data.map((item) => {
				const { uid, username, role } = item
				tableListDataSourceTmp.push({
					uid,
					username,
					role: UserConstant.RoleMapType[role].name
				})
			})
		}
		setDataSource(tableListDataSourceTmp)
	}

	const deleteUserInGroup = async (uid: string) => {
		const { msg, code } = await UserApi.deleteUsersGroupByLeader({ uidList: [uid] })
		if (code === 0) {
			userListByGroupId()
			message.success('移除成功')
		} else {
			message.error(msg)
		}
	}

	return (
		<ProTable
			columns={columns}
			dataSource={dataSource}
			search={false}
			pagination={{
				pageSize: 10,
			}}
			toolBarRender={() => [
				<AddMemberButton></AddMemberButton>
			]}
		/>
	)
}