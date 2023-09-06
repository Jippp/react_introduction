import { useEffect, useState, useCallback, useRef } from 'react'

// effect执行时机
// const EffectTimeComponent = () => {
//   const [render, setRender] = useState(false)

//   const handleRender = useCallback(() => {
//     setRender(o => !o)
//   }, [])

//   useEffect(() => {
//     console.log('%crender', 'color: red; font-size: 20px', render);
//     return () => {
//       console.log('%cclear function', 'color: red; font-size: 20px', render);
//     }
//   }, [render])

//   return (
//     <>
//       <button onClick={handleRender}>render effect component</button>
//     </>
//   )
// }

// effect清除函数什么时候使用
const InputValueComponent = ({showInput}) => {
  const timerRef = useRef()
  const [timeValue, setTimeValue] = useState('2023-08-09')

  useEffect(() => {
    // 虽然在React18中不会报错了，但还是会导致内存泄露
    // 通过Performance面板来查看内存情况
    timerRef.current = setTimeout(() => {
      setTimeValue('2021-08-08')
    }, 5000)
    return () => {
      if(timerRef.current) clearTimeout(timerRef.current)
    }

    // 也是可以的
    // let timer = setTimeout(() => {
    //   setTimeValue('2021-08-08')
    // }, 5000)
    // return () => {
    //   if(timer) clearTimeout(timer)
    // }
  }, [showInput])

  return <input type="date" defaultValue={timeValue} />
}

const InputComponent = () => {
  const [showInput, setShowInput] = useState(false)

  const handleShow = useCallback(() => {
    setShowInput(o => !o)
  }, [])

  return (
    <>
      <button onClick={handleShow} >{showInput ? '隐藏' : '显示'}</button>
      {
        showInput ? <InputValueComponent showInput={showInput} /> : null
      }
    </>
  )
}


const EffectComponent = () => {
  return (
    <>
      {/* <EffectTimeComponent /> */}
      <InputComponent />
    </>
  )
}

export default EffectComponent