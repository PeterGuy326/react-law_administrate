import { useEffect } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from './router'
import { message } from 'antd'

function ToLogin() {
    const navigateTo = useNavigate()
    useEffect(() => {
        navigateTo('/pwd-login')
        message.warning('处于未登录状态，请进行账号登录')
    }, [])
    return <div />
}

function ToPage1() {
    const navigateTo = useNavigate()
    useEffect(() => {
        navigateTo('/page1')
        message.warning('已处于登录状态')
    }, [])
    return <div />
}

// 路由守卫
function BeforeRouterEnter() {
    const outlet = useRoutes(router)
    // const location = useLocation()
    // let token = localStorage.getItem('react-law-token')
    // if (location.pathname === '/pwd-login' && token) {
    //     return <ToPage1 />
    // }
    // if (location.pathname !== '/pwd-login' && !token) {
    //     return <ToLogin />
    // }
    return outlet
}

function App() {
    return (
        <div className='App'>
            <BeforeRouterEnter />
        </div>
    )
}

export default App
