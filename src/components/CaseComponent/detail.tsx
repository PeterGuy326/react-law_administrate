import { message, Upload, UploadFile, Avatar, List, Form, Mentions, Button, Rate } from 'antd'
import { useEffect, useState } from 'react'
import * as CaseApi from '../../request/CaseApi'
import { Typography, UploadProps } from 'antd'
import './detail.less'
import { DownloadOutlined } from '@ant-design/icons'
import * as FileApi from '../../request/FileApi'
import * as UserApi from '../../request/UserApi'
import * as _ from 'lodash'
import { USER_INFO } from '@/constant/base'
import * as CaseComponentType from '../../types/component/case'
import * as CommentApi from '../../request/CommentApi'
import * as GradeApi from '../../request/GradeApi'

const { Title, Paragraph } = Typography

export default () => {
	const [article, setArticle] = useState('')
	const [mentionsUserList, setMentionsUserList] = useState<{ label: string, value: string }[]>([])
	const [CommentsData, setCommentsData] = useState<CaseComponentType.CaseDetailCommentItem[]>([])
	const [CommentContent, setCommentContent] = useState('')
	const [gradeValue, setGradeValue] = useState(0)
	let fileList: UploadFile[] = []
	const [form] = Form.useForm()
	const props: UploadProps = {
		showUploadList: {
			showDownloadIcon: true,
			downloadIcon: <DownloadOutlined />,
			showRemoveIcon: false,
		},
		async onDownload(file) {},
	}

	const caseId = new URLSearchParams(window.location.search).get('id') || ''
	useEffect(() => {
		getCaseDetail()
		getUserList()
		getCommentList()
		getGrade()
	}, [])

	const getCaseDetail = async () => {
		const { data, code, msg } = await CaseApi.getCaseDetail({ caseId })
		const { filenameList } = data
		if (code === 0) {
			await setArticle(data.text || '暂无内容')
			filenameList.map((filename) => {
				fileList.push({
					uid: filename,
					name: filename,
					status: 'done',
					url: `http://127.0.0.1:3000/upload/${filename}`,
				})
			})
		} else {
			message.error(msg)
		}
	}

	const getUserList = async () => {
		const { groupId } = JSON.parse(localStorage.getItem(USER_INFO) || '')
		const { data, code } = await UserApi.listUsersByGroupId({ groupId })
		const res: { label: string, value: string }[] = []
		if (code === 0) {
			data.map(item => {
				res.push({
					label: item.username,
					value: item.username
				})
			})
		}
		setMentionsUserList(res)
	}

	const getCommentList = async () => {
		const { data } = await CommentApi.getCommentListByCaseId({ caseId })
		const res: CaseComponentType.CaseDetailCommentItem[] = []
		data.map(item => {
			const { creatorId, content, createdAt, updatedAt } = item
			res.push({
				creatorId,
				content,
				createdAt,
				updatedAt
			})
		})
		setCommentsData(res)
	}

	const getGrade = async () => {
		const { data, code, msg } = await GradeApi.getGradeByUid({ caseId })
		if (code !== 0) {
			message.error(msg)
		}
		setGradeValue(data.score) 
	}

	const saveGrade = async (score: number) => {
		const { code, msg } = await GradeApi.saveGradeByCaseId({ score, caseId })
		if (code !== 0) {
			message.error(msg)
		}
		setGradeValue(score)
	}

	const onFinish = async () => {
		try {
			const values = await form.validateFields()
			console.log('Submit:', values)
		} catch (errInfo) {
			console.log('Error:', errInfo)
		}
	}

	const addComment = async () => {
		const { code } = await CommentApi.addComment({ caseId, content: CommentContent })
		if (code !== 0) {
			message.error('评论发表失败')
		}
		window.location.reload()
	}

	return (
		<Typography>
			<Paragraph>
				<Rate onChange={(v) => saveGrade(v)} value={gradeValue}/>
				<div dangerouslySetInnerHTML={{ __html: article }} />
			</Paragraph>
			<Paragraph>
				<Title level={3}>相关文件</Title>
				<Upload {...props} listType='picture' defaultFileList={fileList} className='upload-list-inline' />
			</Paragraph>
			<Paragraph>
				<Title level={3}>所有评论</Title>
				<List
					itemLayout='horizontal'
					dataSource={CommentsData}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src='http://127.0.0.1:3000/upload/ZKbJAhepne5AdFxJXPYAGPiDFpTtaNA4.jpg' />}
								title={<a>{item.creatorId}</a>}
								description={item.content}
							/>
						</List.Item>
					)}
				/>
			</Paragraph>
			<Form form={form} layout='horizontal' onFinish={onFinish}>
				<Form.Item name='comment' labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} rules={[{ required: true }]}>
					<Mentions
						rows={3}
						placeholder='请发表你的评论...'
						options={mentionsUserList}
						onChange={ (v) =>  setCommentContent(v) }
					/>
				</Form.Item>
				<Form.Item wrapperCol={{ span: 14, offset: 6 }}>
					<Button htmlType='submit' type='primary' onClick={addComment}>
						回复
					</Button>
					<Button style={{ position: 'absolute', left: '15%' }}>
						重置
					</Button>
				</Form.Item>
			</Form>
		</Typography>
	)
}
