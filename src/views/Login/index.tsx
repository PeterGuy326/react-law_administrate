import { ChangeEvent, useEffect, useState } from 'react'
import styles from './login.module.scss'
import initLoginBg from './init.ts'
import { Button, Input, Space, message } from 'antd'
import './login.less'
import { useNavigate } from 'react-router-dom'
import { captchaApi } from '@/request/CaptchaApi'
import * as AdministrateApi from '@/request/AdministrateApi'
import { aes_encrypt } from '@/utils/aes'

const View = () => {
    const navigateTo = useNavigate()
    useEffect(() => {
        initLoginBg()
        window.onresize = function () { initLoginBg() }
        getCaptchaImg()
    }, [])

    const [usernameVal, setUsernameVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')
    const [captchaVal, setCaptchaVal] = useState('')
    const [captchaImg, setCaptchaImg] = useState('')

    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsernameVal(e.target.value)
    } 
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value)
    }
    const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value)
    }

    // 点击登录按钮的事件
    const gotoLogin = async () => {
        if (!usernameVal.trim() || !passwordVal.trim()) {
            message.warning('请输入用户完整信息')
            return 
        }
        const password_aes_key = 'lsjd821234567890'
        const password_aes_iv = '9djsal1234567890'
        const passwordByAesDecrypt = aes_encrypt(passwordVal, password_aes_key, password_aes_iv)
        const loginByPasswordRes = await AdministrateApi.loginByPassword({
            uid: usernameVal,
            password: passwordByAesDecrypt
        })
        console.log(loginByPasswordRes.code)
        if (loginByPasswordRes.code === 0) {
            message.success('登录成功')
            localStorage.setItem('react-law-token', loginByPasswordRes.data.token)
            navigateTo('/page1')
        }
    }
    const getCaptchaImg = async () => {
        const captchaApiRes = await captchaApi()
        if (captchaApiRes.code === 200) {
            setCaptchaImg(`data:image/gif;base64,${captchaApiRes.img}`)
            localStorage.setItem('uuid', captchaApiRes.uuid)
        }
    }


    return (
        <div className={styles.loginPage}>
            <canvas id="canvas" style={{ display: "block" }}></canvas>
            <div className={styles.loginBox + " loginbox"}>
                <div className={styles.title}>
                    <h1>zucc&nbsp;·&nbsp;律所管理系统</h1>
                    <p>Strive Everyday</p>
                </div>
                <div className="form">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="用户名" onChange={usernameChange} />
                        <Input.Password placeholder="密码" onChange={passwordChange} />
                        <div className="captchaBox">
                            <Input placeholder="验证码" onChange={captchaChange} />
                            <div className="catpchaImg" onClick={getCaptchaImg}>
                                <img height="38" src={captchaImg} alt="" />
                            </div>
                        </div>
                        <Button type="primary" block onClick={gotoLogin}>登录</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default View

