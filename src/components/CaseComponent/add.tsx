import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Input, message, Radio, RadioChangeEvent } from 'antd';
import * as CaseApi from '../../request/CaseApi'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input;
type LayoutType = Parameters<typeof Form>[0]['layout'];

const App: React.FC = () => {
    const navigateTo = useNavigate()
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
    const [caseName, setCaseName] = useState('');
    const [caseDesc, setCaseDesc] = useState('');
    const [caseCategoryValue, setCaseCategory] = useState('');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };

    const onChangeCaseCategory = (e: RadioChangeEvent) => {
        setCaseCategory(e.target.value);
    };

    const onChangeCaseName = (e: ChangeEvent<HTMLInputElement>) => {
        setCaseName(e.target.value)
    }

    const onChangeCaseDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCaseDesc(e.target.value)
    }

    const addCase = async () => {
        const res = await CaseApi.saveCase({
            name: caseName,
            category: caseCategoryValue,
            desc: caseDesc
        })
        if (res.code === 0) {
            message.success('案件添加成功')
            navigateTo('/caseList')
        } else {
            message.error(res.msg)
        }
    }

    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: { span: 14, offset: 4 },
            }
            : null;

    return (
        <Form
            layout={formLayout}
            form={form}
            initialValues={{ layout: formLayout }}
            onValuesChange={onFormLayoutChange}
            style={{ position: 'absolute', left: '35%' }}
        >
            <Form.Item label="案件名称">
                <Input placeholder="input placeholder" onChange={onChangeCaseName} />
            </Form.Item>
            <Form.Item label="案件类型">
                <Radio.Group onChange={onChangeCaseCategory} value={caseCategoryValue}>
                    <Radio value={'criminal'}>刑事案件</Radio>
                    <Radio value={'administrative'}>行政案件</Radio>
                    <Radio value={'civil'}>民事案件</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="案件描述">
                <TextArea
                    showCount
                    maxLength={100}
                    style={{ height: 120, width: 600, resize: 'none' }}
                    onChange={onChangeCaseDesc}
                    placeholder="disable resize"
                />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
                <Button type="primary" onClick={addCase}>提交</Button>
                <Button style={{ position: 'absolute', left: '100%' }}>取消</Button>
            </Form.Item>
        </Form>
    );
};

export default App;