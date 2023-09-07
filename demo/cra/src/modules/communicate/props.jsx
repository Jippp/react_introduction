/**
 * 组件通信-通过props的方式
 */
import { useCallback, useState, useRef } from 'react'


const Child1 = ({ name }) => {
  return (
    <p>传入子组件的name：{ name }</p>
  )
}

const PropCommunicate = () => {
  const [name, setName] = useState('default name')
  const inputRef = useRef()

  const handleChange = useCallback(() => {
    setName(inputRef.current.value)
  }, [])

  return (
    <>
      <input type="text" placeholder='修改name' ref={inputRef} />
      <button onClick={handleChange}>确定</button>
      <Child1 name={name} />
    </>
  )
}

export default PropCommunicate
