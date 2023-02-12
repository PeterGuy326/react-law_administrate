import { ProList } from '@ant-design/pro-components'
import { Badge, Button, Space, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import * as CaseApi from '../../request/CaseApi'
import * as CaseApiType from './../../types/api/case'
import * as CaseComponentType from '../../types/component/case'
import { useNavigate } from 'react-router-dom'
import { CaseCategoryMap } from '../../constant/case'
import { Link } from 'react-router-dom'

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
	const [getCountResp, setCountResp] = useState<CaseApiType.GetCountResp>({ getCaseList: 0, getRecommendCaseList: 0, getMineCaseList: 0 })
	const [dataSource, setDataSource] = useState<CaseComponentType.CaseProListItem[]>([])

	useEffect(() => {
		getCaseList(pageVal, sizeVal, activeKey)
		getCount()
	}, [])

	const navigateTo = useNavigate()

	const linkToAdd = () => {
		navigateTo('/caseList/addCase')
	}

	const getAllCaseList = async (page: number, size: number) => {
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
		await setDataSource(dataSourceTemp)
	}

	const getRecommendCaseList = async () => {
		const dataSourceTemp: CaseComponentType.CaseProListItem[] = []
		const { data } = await CaseApi.getRecommendCaseList()
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
		await setDataSource(dataSourceTemp)
	}

	const getMineCaseList = async (page: number, size: number) => {
		const dataSourceTemp: CaseComponentType.CaseProListItem[] = []
		const { data } = await CaseApi.getMineCaseList({
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
		await setDataSource(dataSourceTemp)
	}

	const getCaseList = async (page: number, size: number, key: React.Key | undefined) => {
		if (key === 'tab1') {
			await getRecommendCaseList()
		}
		if (key === 'tab2') {
			await getAllCaseList(page, size)
		}
		if (key === 'tab3') {
			await getMineCaseList(page, size)
		}
	}

	const getCount = async () => {
		const params: CaseApiType.GetCountReq = {
			filters: {
				getCaseList: {},
				getRecommendCaseList: {},
				getMineCaseList: {}
			}
		}
		const { data, code } = await CaseApi.getCount(params)
		if (code === 0) {
			setCountResp(data)
		}
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
										{t.value}
									</div>
								</div>
							))}
						</div>
					),
				},
				actions: {
					render: (_, record) => [
						<Space size='middle'>
							<Link to={`/caseList/caseDetail?id=${record.caseId}`}>查看</Link>
						</Space>
					],
				},
			}}
			toolbar={{
				menu: {
					activeKey,
					items: [
						{
							key: 'tab1',
							label: <span>推荐案件{renderBadge(getCountResp.getRecommendCaseList, activeKey === 'tab1')}</span>,
						},
						{
							key: 'tab2',
							label: <span>全部案件{renderBadge(getCountResp.getCaseList, activeKey === 'tab2')}</span>,
						},
						{
							key: 'tab3',
							label: <span>我的案件{renderBadge(getCountResp.getMineCaseList, activeKey === 'tab3')}</span>,
						}
					],
					async onChange(key) {
						await setActiveKey(key)
						await getCaseList(1, sizeVal, key)
					},
				},
				search: {
					onSearch: async (value: string) => {
						await getCaseList(pageVal, sizeVal, activeKey)
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
					await getCaseList(page, pageSize, activeKey)
				},
			}}
		/>
	)
}
