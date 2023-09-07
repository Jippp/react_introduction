/**
 * 组件通信-通过forwardRef+useImperativeHandle的方式
 * 可以用在父级往子级传递
 */

import { forwardRef, useImperativeHandle, useRef, useCallback } from 'react'

const ChildComp = forwardRef((props, ref) => {
  const inputRef = useRef()

  useImperativeHandle(ref, () => {
    return {
      onFocus: () => {
        inputRef.current.focus()
      },
    }
  }, [])
  
  return (
    <input type="text" ref={inputRef} />
  )
})

const RefCommunicate = () => {
  const ref = useRef()

  const handleFocus = useCallback(() => {
    ref.current.onFocus()
  }, [])

  return (
    <>
      <ChildComp ref={ref} />
      <button onClick={handleFocus}>聚焦</button>
    </>
  )
}

export default RefCommunicate
