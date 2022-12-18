import { RootState } from '@/types/store'
import { useSelector, useDispatch } from 'react-redux'
import numStatus from '@/store/NumStatus'
const View = () => {
    const { num, sarr } = useSelector((state: RootState) => ({
        num: state.handleNum.num,
        sarr: state.handleArr.sarr
    }))

    // 修改仓库函数
    const dispatch = useDispatch()
    const changeNum = () => {
        dispatch({ type: 'add3', val: 100 })
    }
    const changeNum2 = () => {
        // dispatch({ type: 'add1' })
        dispatch(numStatus.asyncActions.asyncAdd1)
    }

    const changeArr = () => {
        dispatch({ type: 'sarrpush', val: 100 })
    }

    return (
        <div className='page1'>
            <p>这是Page1组件</p>
            <p>{num}</p>
            <button onClick={changeNum}>同步按钮</button>
            <button onClick={changeNum2}>异步按钮</button>
            <p>{sarr}</p>
            <button onClick={changeArr}>按钮</button>
        </div>
    )
}

export default View