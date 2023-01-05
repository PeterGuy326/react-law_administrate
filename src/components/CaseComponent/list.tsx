import { ProList } from '@ant-design/pro-components'
import { Badge, Button, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import * as CaseApi from '../../request/CaseApi'
import * as CaseComponentType from '../../types/component/case'
import { useNavigate } from 'react-router-dom'
import { CaseCategoryMap } from '../../constant/case'

let dataSource: CaseComponentType.CaseProListItem[] = []

const renderBadge = (count: number, active = false) => {
	return (
		<Badge
			count={count}
			style={{
				marginBlockStart: -2,
				marginInlineStart: 4,
				color: active ? '#1890FF' : '#999',
				backgroundColor: active ? '#E6F7FF' : '#eee',
			}}
		/>
	)
}

export default () => {
	const [activeKey, setActiveKey] = useState<React.Key | undefined>('tab1')
	const [totalKey, setTotalKey] = useState(0)
	const [pageVal, setPageVal] = useState(1)
	const [sizeVal, setSizeVal] = useState(5)

	useEffect(() => {
		getCaseList(pageVal, sizeVal)
	}, [])

	const navigateTo = useNavigate()

	const linkToAdd = () => {
		navigateTo('/addCase')
	}

	const getCaseList = async (page: number, size: number) => {
		const dataSourceTemp: CaseComponentType.CaseProListItem[] = []
		const { data } = await CaseApi.getCaseList({
			page,
			size,
		})
		data.list.map((item) => {
			const { caseId, name, category, desc, createdTime, updatedTIme } = item
			dataSourceTemp.push({
				caseId,
				name,
				desc,
				category,
				content: [
					{
						label: '开始时间',
						value: createdTime,
					},
					{
						label: '修改时间',
						value: updatedTIme,
					},
				],
			})
		})
		await setTotalKey(data.total)
		dataSource = dataSourceTemp
	}

	return (
		<ProList<CaseComponentType.CaseProListItem>
			rowKey='name'
			dataSource={dataSource}
			metas={{
				title: {
					dataIndex: 'name',
				},
				description: {
					dataIndex: 'desc',
				},
				subTitle: {
					dataIndex: 'category',
					render: (text) => {
						return (
							<Space size={0}>
								<Tag color='blue'>{CaseCategoryMap[text as string]}</Tag>
							</Space>
						)
					},
				},
				content: {
					dataIndex: 'content',
					render: (text) => (
						<div key='label' style={{ display: 'flex', justifyContent: 'space-around' }}>
							{(text as CaseComponentType.CaseProListContentItem[]).map((t) => (
								<div key={t.label}>
									<div style={{ color: '#00000073' }}>{t.label}</div>
									<div style={{ color: '#000000D9' }}>
										{/* {t.status === 'success' && (
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    backgroundColor: '#52c41a',
                                                    marginInlineEnd: 8,
                                                }}
                                            />
                                        )} */}
										{t.value}
									</div>
								</div>
							))}
						</div>
					),
				},
				actions: {
					render: (text, row) => [
						<a href='' target='_blank' rel='noopener noreferrer' key='link'>
							编辑
						</a>,
						<a href='' target='_blank' rel='noopener noreferrer' key='warning'>
							复制
						</a>,
						<a href='' target='_blank' rel='noopener noreferrer' key='view'>
							删除
						</a>,
					],
				},
			}}
			toolbar={{
				menu: {
					activeKey,
					items: [
						{
							key: 'tab1',
							label: <span>全部案件{renderBadge(totalKey, activeKey === 'tab1')}</span>,
						},
						// {
						//     key: 'tab2',
						//     label: <span>我创建的案件{renderBadge(totalKey, activeKey === 'tab2')}</span>,
						// },
					],
					async onChange(key) {
						await setActiveKey(key)
					},
				},
				search: {
					onSearch: async (value: string) => {
						await getCaseList(pageVal, sizeVal)
					},
				},
				actions: [
					<Button type='primary' key='primary' onClick={linkToAdd}>
						新建案件
					</Button>,
				],
			}}
			pagination={{
				total: totalKey,
				pageSize: sizeVal,
				onChange: async (page, pageSize) => {
					await setPageVal(page)
					await setSizeVal(pageSize)
					await getCaseList(pageVal, sizeVal)
				},
			}}
		/>
	)
}
