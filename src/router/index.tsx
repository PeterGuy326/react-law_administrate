import React, { lazy } from 'react'
import Home from '../views/Home'
// import About from '../views/About'
// import User from '../views/User'
import Index from '../views/Index'
const About = lazy(() => import('../views/About'))
const User = lazy(() => import('../views/User'))
const Page1 = lazy(() => import('../views/Page1'))
const Page2 = lazy(() => import('../views/Page2'))
const Page301 = lazy(() => import('../views/Page301'))
const Case = lazy(() => import('../views/Case'))

const LoginComponent = lazy(() => import('../components/LoginComponent'))
const RegisterComponent = lazy(() => import('../components/RegisterComponent'))
import { Navigate } from 'react-router-dom'

const withLoadingComponent = (component: JSX.Element) => (
    <React.Suspense fallback = {<div>Loading..</div>}>
        {component}
    </React.Suspense>
)

const routes = [
    {
        path: '/',
        element: <Navigate to='/pwd-login'/>
    },
    {
        path: '/',
        element: <Index />,
        children: [
            {
                path: '/pwd-login',
                element: withLoadingComponent(<LoginComponent />)
            },
            {
                path: '/register',
                element: withLoadingComponent(<RegisterComponent />)
            }
        ]
    },
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/page1',
                element: withLoadingComponent(<Page1 />)
            },
            {
                path: '/page2',
                element: withLoadingComponent(<Page2 />)
            },
            {
                path:"/page3/page301",
                element: withLoadingComponent(<Page301 />)
            }
        ]
    },
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/case',
                element: withLoadingComponent(<Case />)
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/pwd-login'/>
    }
]

export default routes