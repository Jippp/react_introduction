import { FC, useState, useCallback, ChangeEvent } from 'react'
import { Input, Button } from 'antd'
import styled from 'styled-components'
import md5 from 'md5'

import ListItem from './item'
import { StatusEnums, ListItemProps } from './types'

const TodoList: FC = () => {
  // 列表数据
  const [list, setList] = useState<ListItemProps[]>([])
  // 输入框的value，受控处理，方便清除
  const [inputValue, setInputValue] = useState('')

  /** 和受控value一起使用，达到双向绑定的效果 */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  /** 处理输入框取消 */
  const handleCancel = useCallback(() => {
    setInputValue('')
  }, [])

  /** 处理添加列表 */
  const handleAdd = useCallback(() => {
    if(inputValue) {
      setList(d => {
        return [...d, {
          title: inputValue,
          status: StatusEnums.DONE,
          id: md5(inputValue + Date.now())
        }]
      })
      handleCancel()
    }
  }, [inputValue, handleCancel])

  return (
    <TodoListWraper>
      <Input placeholder='快来添加一个待办事项吧' value={inputValue} onChange={handleChange} onPressEnter={handleAdd} />
      <Button type="primary" onClick={handleCancel}>取消</Button>
      <Button type="primary" onClick={handleAdd}>添加</Button>
      <Content>
        {
          list.map((item) => (
            // key用一个不会重复的值，但是如果修改了当前的内容是需要更新的。
            <ListItem key={item.id} item={item} setList={setList} />
          ))
        }
      </Content>
      
    </TodoListWraper>
  )
}

export default TodoList

const TodoListWraper = styled.div`
  .ant-input {
    width: 700px;
    margin-right: 20px;
  }
  .ant-btn:not(:last-of-type) {
    margin-right: 8px;
  }
`

const Content = styled.div`
  box-sizing: border-box;
  width: 800px;
  height: 600px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  overflow: hidden;
`

