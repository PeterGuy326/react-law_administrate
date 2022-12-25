import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    {
        label: '栏目 1',
        key: '/page1',
        icon: <PieChartOutlined />
    },
    {
        label: '栏目 2',
        key: '/page2',
        icon: <DesktopOutlined />
    },
    {
        label: '栏目 3',
        key: 'page3',
        icon: <UserOutlined />,
        children: [
            {
                label: '栏目 301',
                key: '/page3/page301',
            },
            {
                label: '栏目 302',
                key: '/page3/page302',
            },
            {
                label: '栏目 303',
                key: '/page3/page303',
            }
        ]
    },
    {
        label: '案件管理',
        key: '/caseList',
        icon: <TeamOutlined />
    },
    {
        label: '栏目 5',
        key: '/page5',
        icon: <FileOutlined />
    }
]

const MainMenu: React.FC = () => {

    const navigateTo = useNavigate()

    const currentRoute = useLocation()

    const menuClick = (e: { key: string }) => {
        navigateTo(e.key)
    }

    let firstOpenKey: string = "";
    // 在这里进行对比   find
    function findKey(obj: { key: string }) {
        return obj.key === currentRoute.pathname
    }
    // 多对比的是多个children
    for (let i = 0; i < items.length; i++) {
        // 判断找到不到
        if (items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(findKey)) {
            firstOpenKey = items[i]!.key as string;
            break;
        }
    }

    const [openKeys, setOpenKeys] = useState([firstOpenKey])
    const handleOpenChange = (keys: string[]) => {
        setOpenKeys([keys[keys.length - 1]])
    }

    return (
        <Menu
            theme='dark'
            defaultSelectedKeys={[currentRoute.pathname]}
            mode='inline'
            items={items}
            onClick={menuClick}
            onOpenChange={handleOpenChange}
            openKeys={openKeys}
        />
    )
}

export default MainMenu;