import React, { lazy } from 'react'
import Home from '../views/Home'
import Index from '../views/Index'
const Page1 = lazy(() => import('../views/Page1'))
const Page2 = lazy(() => import('../views/Page2'))
const Page301 = lazy(() => import('../views/Page301'))
const LoginComponent = lazy(() => import('../components/LoginComponent'))
const RegisterComponent = lazy(() => import('../components/RegisterComponent'))
const CaseListComponent = lazy(() => import('../components/CaseComponent/list'))
const AddCaseComponent = lazy(() => import('../components/CaseComponent/add'))
const GroupListComponent = lazy(() => import('../components/GroupComponent/list'))

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
                path: '/caseList',
                element: withLoadingComponent(<CaseListComponent />)
            },
            {
                path: '/addCase',
                element: withLoadingComponent(<AddCaseComponent />)
            }
        ]
    },
     {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/groupList',
                element: withLoadingComponent(<GroupListComponent />)
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to='/pwd-login'/>
    }
]

export default routes