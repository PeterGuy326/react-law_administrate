import { PlusOutlined } from '@ant-design/icons';
import {
    ModalForm,
    ProForm,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import * as UserApi from '../../request/UserApi'

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {
    const [form] = Form.useForm<{ name: string; company: string }>();

    const addMember = async (uid: string) => {
        const groupId = new URLSearchParams(window.location.search).get('id') || ''
        const { msg, code } = await UserApi.updateUsersGroupByLeader({ uidList: [uid], groupId })
        if (code === 0) {
            window.location.reload()
            message.success('添加成功')
        } else {
            message.error(msg)
        }
    }

    return (
        <ModalForm<{
            name: string;
        }>
            title="添加组员"
            trigger={
                <Button type="primary">
                    <PlusOutlined />
                    添加组员
                </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
                addMember(values.name)
                return true;
            }}
        >
            <ProForm.Group>
                <ProFormText
                    width="lg"
                    name="name"
                    label="组员名称"
                    tooltip="最长为 24 位"
                    placeholder="请输入名称"
                />
            </ProForm.Group>
        </ModalForm>
    );
};