import { useState, useMemo, useEffect } from 'react'

/**
 * 大组件，重渲染代价很大
 */
const SleepComp = ({ info }) => {
  const [status, setStatus] = useState(false)

  useEffect(() => {
    console.log('%crender start', 'color: red; font-size: 20px;');
    let target = Date.now() + 2000
    while(Date.now() < target) {}
    setStatus(true)

    console.log('%crender end', 'color: red; font-size: 20px;');
  }, [info])

  return (
    <>
      {
        status ? (
          <>
            <p>food: {info.food}</p>
            <p>drink: {info.drink}</p>
          </>
        ) : 'loading'
      }
    </>
  )
}

const HuseMemo = () => {
  const [name, setName] = useState('cat')
 
  // 阻止重渲染。
  const info = useMemo(() => {
    return {
      food: 'fish',
      drink: 'water'
    }
  }, [])

  return (
    <>
      <button onClick={() => setName('dog')}>change name</button>
      <p>{name}</p>
      <SleepComp info={info} />
    </>
  )
}

export default HuseMemo
