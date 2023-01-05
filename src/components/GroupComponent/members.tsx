import * as GroupComponentType from '../../types/component/group'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { useState, useEffect } from 'react'
import * as UserApi from '../../request/UserApi'
import * as UserConstant from '../../constant/user'

export default () => {
	const [dataSource, setDataSource] = useState<GroupComponentType.MembersProTableItem[]>([])
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
	]

	useEffect(() => {
		userListByGroupId()
	}, [])

	const userListByGroupId = async () => {
		const groupId = new URLSearchParams(window.location.search).get('id') || ''
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

	return (
		<ProTable
			columns={columns}
			dataSource={dataSource}
			search={false}
			pagination={{
				pageSize: 10,
			}}
		/>
	)
}