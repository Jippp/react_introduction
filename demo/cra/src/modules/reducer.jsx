import { Fragment, useReducer, useRef } from 'react'

const reducer = (state, { action, payload }) => {
  switch(action) {
    case 'todo':
      return { 
        ...state, 
        todo: [...state.todo, payload]
      }
    case 'unTodo':
      return { 
        ...state, 
        unTodo: [...state.unTodo, payload],
      }
    default:
      return state
  }
}

const initState = {
  todo: [
    '公园散步',
    '商场闲逛'
  ],
  unTodo: [
    '去看电影'
  ]
}
const init = (initState) => {
  return initState
}

const ReducerComponent = () => {
  const [state, dispatch] = useReducer(reducer, initState, init)
  const todoInputRef = useRef()
  const unTodoInputRef = useRef()

  return (
    <>
      <h3>已完成列表</h3>
      <input type="text" placeholder='输入值添加到已完成列表' ref={todoInputRef} />
      <button onClick={() => dispatch({ action: 'todo', payload: todoInputRef.current.value })}>确定</button>
      {
        state.todo.map(thing => (
          <Fragment key={thing}>
            <li>{thing}</li>
          </Fragment>
        ))
      }
      
      <h3>未完成列表</h3>
      <input type="text" placeholder='输入值添加到未完成列表' ref={unTodoInputRef} />
      <button onClick={() => dispatch({ action: 'unTodo', payload: unTodoInputRef.current.value })}>确定</button>
      {
        state.unTodo.map(thing => (
          <Fragment key={thing}>
            <li>{thing}</li>
          </Fragment>
        ))
      }
    </>
  )
}

export default ReducerComponent