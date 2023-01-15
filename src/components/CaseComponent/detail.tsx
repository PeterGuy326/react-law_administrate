import { message, Upload, UploadFile } from 'antd'
import { useEffect, useState } from 'react'
import * as CaseApi from '../../request/CaseApi'
import { Divider, Typography, UploadProps } from 'antd'
import './detail.less'
import { DownloadOutlined } from '@ant-design/icons'
import * as FileApi from '../../request/FileApi'
import * as _ from 'lodash'

const { Title, Paragraph } = Typography

export default () => {
    const [article, setArticle] = useState('')
    let fileList: UploadFile[] = []
    const props: UploadProps = {
        showUploadList: {
            showDownloadIcon: true,
            downloadIcon: <DownloadOutlined />,
            showRemoveIcon: false,
        },
        async onDownload(file) {
            
        },
    }
    const caseId = new URLSearchParams(window.location.search).get('id') || ''
    useEffect(() => {
        getCaseDetail()
    }, [])
    const getCaseDetail = async () => {
        const { data, code, msg } = await CaseApi.getCaseDetail({ caseId })
        const { filenameList } = data
        if (code === 0) {
            await setArticle(data.text || '暂无内容')
            filenameList.map(filename => {
                fileList.push({
                    uid: filename,
                    name: filename,
                    status: 'done',
                    url: `http://127.0.0.1:3000/upload/${filename}`
                })
            })
        } else {
            message.error(msg)
        }
    }
    return (
        <Typography>
            <Paragraph>
                <div dangerouslySetInnerHTML={{ __html: article }} />
            </Paragraph>
            <Divider />
            <Paragraph>
                <Title level={2}>相关文件</Title>
                <Upload
                    {...props}
                    listType="picture"
                    defaultFileList={fileList}
                    className="upload-list-inline"
                />
            </Paragraph>
        </Typography>
    )
}
