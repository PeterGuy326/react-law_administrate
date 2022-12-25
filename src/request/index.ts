import axios from "axios"
import * as BaseConstant from '../constant/base'

const Token = localStorage.getItem(BaseConstant.LOGIN_TOKEN)

const instance = axios.create({
    // 基本请求路径的抽取
    // baseURL: "",
    // 这个时间是你每次请求的过期时间，这次请求认为20秒之后这个请求就是失败的
    timeout: 20000,
    ...(Token ? { headers: { 'authorization': Token } } : {})
})

// 请求拦截器
instance.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
});

// 响应拦截器
instance.interceptors.response.use(res => {
    return res.data
}, err => {
    return Promise.reject(err)
})

export default instance

export type Resp<T> = {
    code: number,
    msg: string,
    data: T
}