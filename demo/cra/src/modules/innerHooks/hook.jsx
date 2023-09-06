import { useRef, useState, useEffect, useLayoutEffect, useMemo, useCallback, Fragment } from 'react'

const defaultArr = [1, 2, 3]

const HookComponent = () => {
  const [count, setCount] = useState(1)
  const [arr, setArr] = useState(defaultArr)
  const inputRef = useRef(null)

  // const handleInputChange = useCallback(() => {
  //    填充
  // }, [])

  const handlePushArr = useCallback(() => {
    if(inputRef.current.value) {
      setArr((old) => {
        // old.push(inputRef.current.value)
        // console.log(Object.is(old, defaultArr))
        // return old
        return [...old, inputRef.current.value]
      })
    }
  }, [])

  const handleAdd = useCallback(() => {
    setCount(d => d + 1)
  }, [])

  useEffect(() => {
    console.log('%cuseeffect', 'color: red; font-size: 20px', );
  })

  useLayoutEffect(() => {
    console.log('%cuselayouteffect', 'color: red; font-size: 20px', );
  })

  const result = useMemo(() => count > 5 ? '这个数字大于五' : '', [count])

  return (
    <>
      <button onClick={handleAdd}>加点</button>
      <h3>{count}</h3>
      <h3>{result}</h3>

      <input /* onChange={handleInputChange} */ ref={inputRef} />
      <button onClick={handlePushArr}>添加！</button>
      {
        arr.map((item) => (
          <Fragment key={item}>
            <li>{item}</li>
          </Fragment>
        ))
      }
    </>
  )

}

export default HookComponent