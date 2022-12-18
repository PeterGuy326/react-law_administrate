import { useEffect } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from './router'

function ToLogin() {
    const navigateTo = useNavigate()
    useEffect(() => {
        navigateTo('/login')
    }, [])
    return <div />
}

function ToPage1() {
    const navigateTo = useNavigate()
    useEffect(() => {
        navigateTo('/page1')
    }, [])
    return <div />
}

function BeforeRouterEnter() {
    const outlet = useRoutes(router)
    const location = useLocation()
    let token = localStorage.getItem('react-law-token')
    console.log(token)
    if (location.pathname === '/login' && token) {
        return <ToPage1 />
    }
    if (location.pathname !== '/login' && !token) {
        return <ToLogin />
    }
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
