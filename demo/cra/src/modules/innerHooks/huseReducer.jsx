import { useRef, useState, useCallback, useReducer } from 'react'

// useState实现
// const Item = ({ type }) => {
//   const oneRef = useRef()
//   const twoRef = useRef()
//   const [result, setResult] = useState(0)

//   const handleAdd = useCallback(() => {
//     if(type === '+') {
//       setResult(Number(oneRef.current.value) + Number(twoRef.current.value))
//     }else if(type === '-') {
//       setResult(Number(oneRef.current.value) - Number(twoRef.current.value))
//     }
//   }, [])

//   return (
//     <>
//       <input type="text" placeholder='0' ref={oneRef} />
//       {type}
//       <input type="text" placeholder='0' ref={twoRef} />
//       <button onClick={handleAdd}>=</button>
//       <span>{result}</span>
//     </>
//   )
// }

/**
 * reducer纯函数，可以单独在一个文件
 * @param {*} oldState 上一次状态
 * @param {*} param1 dispatch传递的参数
 * @returns 新的状态
 */
const reducer = (oldState, { type, info }) => {
  switch(type) {
    case "+": {
      return info.one + info.two
    }
    case "-": {
      return info.one - info.two
    }
    default: {
      return 0
    }
  }
}

/**
 * useReducer实现
 * 1. 可以将reducer更新逻辑单独放到一个文件中维护
 * 2. 补充逻辑时看的也更加清晰
 * 当useState的逻辑很多且复杂时就可以考虑使用useReducer来简化代码
 * 使得代码可读性更好。
 */
const Item = ({ type }) => {
  const oneRef = useRef()
  const twoRef = useRef()
  const [result, dispatch] = useReducer(reducer, 0)

  const handleCompute = useCallback(() => {
    dispatch({ 
      type, 
      info: { 
        one: Number(oneRef.current.value), 
        two: Number(twoRef.current.value) 
      } 
    })
  }, [type])

  return (
    <>
      <input type="text" placeholder='0' ref={oneRef} />
      {type}
      <input type="text" placeholder='0' ref={twoRef} />
      <button onClick={handleCompute}>=</button>
      <span>{result}</span>
    </>
  )
}

const HuseReducer = () => {
  return (
    <>
      <Item type='+' />
      <Item type='-' />
    </>
  )
}

export default HuseReducer
