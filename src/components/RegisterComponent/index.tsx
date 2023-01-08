import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Space, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { aes_encrypt } from '@/utils/aes'
import * as AdministrateApi from '@/request/AdministrateApi'
const Register: React.FC = () => {
    const navigateTo = useNavigate()
    useEffect(() => {

    }, [])

    const [usernameVal, setUsernameVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')

    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsernameVal(e.target.value)
    } 
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value)
    }

    // 点击注册
    const register = async () => {
        if (!usernameVal.trim() || !passwordVal.trim()) {
            message.warning('请输入用户完整信息')
            return 
        }
        const password_aes_key = 'lsjd821234567890'
        const password_aes_iv = '9djsal1234567890'
        const passwordByAesDecrypt = aes_encrypt(passwordVal, password_aes_key, password_aes_iv)
        const registerRes = await AdministrateApi.register({
            username: usernameVal,
            password: passwordByAesDecrypt
        })
        if (registerRes.code === 0) {
            message.success('注册成功')
            navigateTo('/login')
        }
    }

    const gotoLogin = () => {
        navigateTo('/login')
    }

    return (
        <div className="form">
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Input placeholder="姓名" onChange={usernameChange} />
                <Input.Password placeholder="密码" onChange={passwordChange} />
                <Button type="primary" block onClick={register}>注册</Button>
                <Button type='dashed' block onClick={gotoLogin}>
					返回
				</Button>
            </Space>
        </div>
    )
}

export default Register