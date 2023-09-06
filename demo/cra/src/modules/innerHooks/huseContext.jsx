import { createContext, useContext, useState, useCallback } from 'react'

const Context = createContext()

const ChildComp = () => {
  const info = useContext(Context)
  console.log('%cChild1 render', 'color: red; font-size: 20px;');

  return (
    <>
      <p>name: {info.name}</p>
      {/* <p>like: {info.like}</p> */}
    </>
  )
}
const ChildComp2 = () => {
  const info = useContext(Context)
  console.log('%cChild2 render', 'color: red; font-size: 20px;');
  
  return (
    <>
      <p>like: {info.like}</p>
    </>
  )
}

const HuseContext = () => {
  const [info, setInfo] = useState({
    name: 'sunflower', like: 'sunshine'
  })

  const handleChange = useCallback(() => {
    setInfo(o => ({ ...o, like: 'water' }))
  }, [])

  return (
    <Context.Provider 
      value={info}
    >
      <button onClick={handleChange}>change</button>
      <ChildComp />
      <ChildComp2 />
    </Context.Provider>
  )
}

export default HuseContext
