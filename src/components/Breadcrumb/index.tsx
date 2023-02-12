import React from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

const App: React.FC = () => {
	const location = useLocation()
	const pathnames = location.pathname.split('/').filter((x) => x)
	const breadcrumbMap = {
		addCase: '添加案件',
		caseList: '案件管理',
		caseDetail: '案件详情',
		groupList: '部门管理',
		memberListByGroupId: '人员管理',
	}
	return (
		<Breadcrumb style={{ margin: '16px 0' }}>
			{pathnames.map((name, index) => (
				<Breadcrumb.Item>
					<a href={`/${pathnames.slice(0, index + 1).join('/')}`}>{breadcrumbMap[name] ? breadcrumbMap[name] : name}</a>
				</Breadcrumb.Item>
			))}
		</Breadcrumb>
	)
}

export default App
