import request from './index'
import * as CaptchaApiType from '../types/api/captcha'

// 验证码请求
export const captchaApi = (): Promise<CaptchaApiType.CaptchaApiRes> => request.get('http://xue.cnkdl.cn:23683/prod-api/captchaImage')