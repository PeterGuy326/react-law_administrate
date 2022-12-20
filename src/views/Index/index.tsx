import { useEffect } from 'react'
import styles from './index.module.scss'
import initLoginBg from './init.ts'
import './index.less'
import { Outlet } from 'react-router-dom'

const View = () => {
    useEffect(() => {
        initLoginBg()
        window.onresize = function () { initLoginBg() }
    }, [])

    return (
        <div className={styles.loginPage}>
            <canvas id="canvas" style={{ display: "block" }}></canvas>
            <div className={styles.loginBox + " loginbox"}>
                <div className={styles.title}>
                    <h1>zucc&nbsp;·&nbsp;律所管理系统</h1>
                    <p>Strive Everyday</p>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default View

