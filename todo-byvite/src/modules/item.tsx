/**
 * 拆分出来：
 * 1. 想要修改页面的显示，必须要用useState才行
 * 2. 在父级中使用setState，会让整个列表都修改。但是我们只想某一个列表修改
 */

import { FC, memo, useState, useCallback, ChangeEvent } from 'react'
import { Input, Button } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import md5 from 'md5'
import styled from 'styled-components'

import { ListItemProps, StatusEnums } from './types'

const statusMap = new Map([
  [StatusEnums.TODO, '#1677ff'],
  [StatusEnums.DONE, '#ccc'],
])

interface ItemProps {
  item: ListItemProps;
  setList: React.Dispatch<React.SetStateAction<ListItemProps[]>>
}

const Item: FC<ItemProps> = ({ item, setList }) => {
  // 是否是编辑状态
  const [isEditing, setIsEditing] = useState(false)
  // 输入框的value，受控处理，方便清除
  const [inputValue, setInputValue] = useState(item.title)

  /** 和受控value一起使用，达到双向绑定的效果 */
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  /** 
   * 退出编辑
   * 1. 退出编辑状态
   * 2. 操作按钮显示
   */
  const handleEditCancel = useCallback(() => {
    setIsEditing(false)
  }, [])

  /** 
   * 确认编辑
   * 1. 更新列表该项的内容
   * 2. 退出编辑状态
   * 3. 操作按钮显示
   */
  const handleEditAdd = useCallback((id: string) => {
    if(inputValue) {
      setList(d => {
        return d.map(item => ({
          ...item,
          title: item.id === id ? inputValue : item.title,
          // 需要一块修改的，否则key没有变化，会导致再次编辑还是之前的状态
          id: md5((item.id === id ? inputValue : item.title) + Date.now())
        }))
      })
      handleEditCancel()
    }
  }, [inputValue, handleEditCancel, setList])

  /** 处理列表的删除 */
  const handleDelete = useCallback((id: string) => {
    setList(d => {
      const curIdx = d.findIndex(item => item.id === id)
      return [...d.slice(0, curIdx), ...d.slice(curIdx + 1)]
    })
  }, [])

  /** 
   * 处理列表的修改
   * 1. 进入编辑状态
   * 2. 操作按钮隐藏
   */
  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleDone = useCallback((item: ListItemProps) => {
    setList(d => {
      return d.map(i => ({
        ...i,
        status: i.id === item.id ? (i.status === StatusEnums.TODO ? StatusEnums.DONE : StatusEnums.TODO) : i.status
      }))
    })
  }, [])

  return (
    <ItemContainer status={statusMap.get(item.status)!}>
      <ItemContent>
        <CheckCircleTwoTone twoToneColor={statusMap.get(item.status)} onClick={() => handleDone(item)} />
        {
          isEditing ? (
            <Input value={inputValue} size='small' onChange={handleChange} onPressEnter={() => handleEditAdd(item.id)} className='edit-input' />
          ) : <div>{item.title}</div>
        }
      </ItemContent>
      {
        isEditing ? (
          <div>
            <Button type="primary" size='small' onClick={handleEditCancel}>取消</Button>
            <Button type="primary" size='small' onClick={() => handleEditAdd(item.id)}>确定</Button>
          </div>
        ) : (
          <div>
            <Button type='primary' size='small' onClick={handleEdit}>修改</Button>
            <Button type='primary' size='small' onClick={() => handleDelete(item.id)}>删除</Button>
          </div>
        )
      }
    </ItemContainer>
  )
}

export default memo(Item)

const ItemContainer = styled.div<{ status: string }>`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ status }) => status};
  border-radius: 5px;
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  .anticon {
    cursor: pointer;
    margin-right: 8px;
  }
  .ant-input.edit-input {
    width: 610px;
  }
`

