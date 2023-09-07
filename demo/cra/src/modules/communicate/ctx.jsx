/**
 * 组件通信-通过createContext+useContext的方式
 * 可以用在顶层管理状态，组件间通用
 */

import { createContext, useCallback, useContext, useState } from 'react'

// 顶层的context，状态通过Provider的value来设置
const Context = createContext()

const ChildComp = () => {
  const info = useContext(Context)

  return (
    <>
      <p>子组件中 获取theme: {info.theme}</p>
    </>
  )
}

const CtxCommunicate = () => {
  const [info, setInfo] = useState({
    theme: 'light',
    language: 'zh'
  })

  const hanldeChangeTheme = useCallback(() => {
    setInfo(d => {
      return {
        ...d,
        theme: d.theme === 'light' ? 'dark' : 'light'
      }
    })
  }, [])

  return (
    <Context.Provider value={info}>
      <div>
        <button onClick={hanldeChangeTheme}>{info.theme === 'light' ? 'dark' : 'light'}</button>
        <ChildComp />
      </div>
    </Context.Provider>
  )
}

export default CtxCommunicate
