import React, { lazy } from 'react'
import Home from '../views/Home'
// import About from '../views/About'
// import User from '../views/User'
import Login from '../views/Login'
const About = lazy(() => import('../views/About'))
const User = lazy(() => import('../views/User'))
const Page1 = lazy(() => import('../views/Page1'))
const Page2 = lazy(() => import('../views/Page2'))
const Page301 = lazy(() => import('../views/Page301'))
import { Navigate } from 'react-router-dom'

const withLoadingComponent = (component: JSX.Element) => (
    <React.Suspense fallback = {<div>Loading..</div>}>
        {component}
    </React.Suspense>
)

const routes = [
    {
        path: '/',
        element: <Navigate to='/login'/>
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
        path: '/login',
        element: <Login />
    },
    {
        path: '*',
        element: <Navigate to='/login'/>
    }
]

export default routes