import { useState } from 'react'

// 不通过useState是无法更新ui的
// function Case1() {
//   let count = 1

//   const handleAdd = () => {
//     count++
//   }
//   return (
//     <>
//       <button onClick={handleAdd}>加点</button>
//       <h3>{count}</h3>
//     </>
//   )
// }

// 通过useState更新ui的简单示例
function Case2() {
  const [count, setCount] = useState(1)
  const handleAdd = () => {
    setCount(old => old + 1)
  }

  return (
    <>
      <button onClick={handleAdd}>加点</button>
      <h3>{count}</h3>
    </>
  )
}

// 使用useState处理的点：1.判断更新 2.更新的值 3.批处理
// function Case3() {
//   const [count, setCount] = useState(1)
  
//   const handleAdd = () => {
//     // 1.通过Object.is判断是否变化
//     // setCount(1)

//     // 2. 更新的是下一次渲染的状态，更新之后并不能立即拿到值
//     // setCount(n => n + 1)
//     // console.log(count) // 0

//     // 3. 批处理：直接更新到3、5，页面并不会更新两次
//     setCount(n => n + 1)
//     setCount(n => n + 1)
//   }

//   return (
//     <>
//       <button onClick={handleAdd}>加点*2</button>
//       <h3>{count}</h3>
//     </>
//   )
// }

// 更新引用值-数组
// function Case4() {
//   const [list, setList] = useState(['sleep', 'game'])

//   const handleAddFoods = () => {
//     setList(f => {
//       return [...f, 'cook']
//     })
//   }

//   return (
//     <>
//       <button onClick={handleAddFoods}>push cook to list</button>
//       {
//         list.map(item => <div key={item}>i like {item}</div>)
//       }
//     </>
//   )
// }

// 更新引用值-对象
// function Case5() {
//   const [info, setInfo] = useState({
//     name: 'cat',
//     food: 'fish'
//   })

//   const handleChangeInfo = () => {
//     setInfo(f => {
//       return {
//         ...f,
//         food: 'green grass'
//       }
//     })
//   }

//   return (
//     <>
//       <button onClick={handleChangeInfo}>change food in info</button>
//       <div>
//         {info.name} like eat {info.food}
//       </div>
//     </>
//   )
// }


const StateComponent = () => {
  return (
    <> 
      {/* <Case1 /> */}
      <Case2 />
      {/* <Case3 /> */}
      {/* <Case4 /> */}
      {/* <Case5 /> */}
    </>
  )
}

export default StateComponent