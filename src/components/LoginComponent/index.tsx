import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Space, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { captchaApi } from '@/request/CaptchaApi'
import * as AdministrateApi from '@/request/AdministrateApi'
import * as UserApi from '@/request/UserApi'
import { aes_encrypt } from '@/utils/aes'
import * as BaseConstant from '../../constant/base'
const Login: React.FC = () => {
	const navigateTo = useNavigate()
	useEffect(() => {
		getCaptchaImg()
	}, [])

	const [uidVal, setUidVal] = useState('')
	const [passwordVal, setPasswordVal] = useState('')
	const [captchaVal, setCaptchaVal] = useState('')
	const [captchaImg, setCaptchaImg] = useState('')

	const uidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUidVal(e.target.value)
	}
	const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordVal(e.target.value)
	}
	const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCaptchaVal(e.target.value)
	}

	// 点击登录按钮的事件
	const gotoLogin = async () => {
		if (!uidVal.trim() || !passwordVal.trim()) {
			message.warning('请输入用户完整信息')
			return
		}
		const password_aes_key = 'lsjd821234567890'
		const password_aes_iv = '9djsal1234567890'
		const passwordByAesDecrypt = aes_encrypt(passwordVal, password_aes_key, password_aes_iv)
		const loginByPasswordRes = await AdministrateApi.loginByPassword({
			uid: uidVal,
			password: passwordByAesDecrypt,
		})
		if (loginByPasswordRes.code === 0) {
			message.success('登录成功')
			localStorage.setItem(BaseConstant.LOGIN_TOKEN, loginByPasswordRes.data.token)
			const { data, code } = await UserApi.getUserInfo()
			if (code === 0) {
				const { uid, username, groupId, role } = data
				const userStr = JSON.stringify({
					uid,
					username,
					groupId,
					role
				})
				localStorage.setItem(BaseConstant.USER_INFO, userStr)
			}
			navigateTo('/page1')
		} else {
			message.error(loginByPasswordRes.msg)
		}
	}

	const gotoRegister = async () => {
		navigateTo('/register')
	}

	const getCaptchaImg = async () => {
		const captchaApiRes = await captchaApi()
		if (captchaApiRes.code === 200) {
			setCaptchaImg(`data:image/gif;base64,${captchaApiRes.img}`)
			localStorage.setItem('uuid', captchaApiRes.uuid)
		}
	}
	return (
		<div className='form'>
			<Space direction='vertical' size='large' style={{ display: 'flex' }}>
				<Input placeholder='用户名' onChange={uidChange} />
				<Input.Password placeholder='密码' onChange={passwordChange} />
				{/* <div className='captchaBox'>
					<Input placeholder='验证码' onChange={captchaChange} />
					<div className='catpchaImg' onClick={getCaptchaImg}>
						<img height='38' src={captchaImg} alt='' />
					</div>
				</div> */}
				<Button type='primary' block onClick={gotoLogin}>
					登录
				</Button>
				<Button type='dashed' block onClick={gotoRegister}>
					注册
				</Button>
			</Space>
		</div>
	)
}

export default Login
