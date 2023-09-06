import { Fragment, useState } from 'react'

/*                       JSX中书写HTML                          */
/**
 * 小驼峰命名
 */
function CamelCase() {
  return <h4 className='camel-case'>camelCase 小驼峰命名的类名</h4>
}
function CacelCaseSpecial() {
  return <h4 data-something='custom-data'>自定义的data-*属性</h4>
}

/** 
 * 函数式组件返回的JSX只能有一个。Fragment看后面循环渲染的例子
 */
function ReturnSingleElement() {
  return (
    <>
      <h4>single element 标题1</h4>
      <h4>single element 标题2</h4>
    </>
  )
}

/**
 * 所有标签都要有闭合标签。对比HTML的写法
 */
function CloseAllTags() {
  return (
    <ul>
      <li>吃饭</li>
      <li>睡觉</li>
    </ul>
  )
}

/*                       JSX中书写JS代码                          */
/**
 * 在{}引用变量
 */
function VariableInJsx({ content }) {
  // 变量
  return <div>{content}</div>
}
function VariableComponent() {
  return (
    <>
      {/* 字符串可以直接写 */}
      <VariableInJsx content='content' />
      {/* 其他类型的都需要用{}包裹 */}
      <VariableInJsx content={100} />
      <VariableInJsx content={['name1', 'name2']} />
      {/* 这里是{}包裹了一层对象，并不是Vue中的{{}}语法 */}
      <div width={100} style={{color: 'red'}}>{'{} in style'}</div>

      {/* Error: not valid */}
      {/* <VariableInJsx content={[{ name: 'name1' }, { name: 'name2' }]} /> */}
      {/* <VariableInJsx content={{ name: 'name' }} /> */}
      {/* <VariableInJsx content={() => 'name'} /> */}
    </>
  )
}

/**
 * 三元表达式 => 条件渲染
 */
function ConditionalOperatorInJsx({ isRender }) {
  return (
    <>
      {
        isRender ? <h1>test show</h1> : null
      }
    </>
  )
}
function ConditionalOperator() {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(d => !d)}>{show ? '隐藏' : '显示'}</button>  
      <ConditionalOperatorInJsx isRender={show} />
    </>
  )
}

/**
 * 函数调用 循环渲染
 */
function renderMapInJsx(list) {
  return (
    <div>
      { 
        list.map((name, idx) => <Fragment key={idx}><li>{name}</li></Fragment>)
      }
    </div>
  )
}
const list = ['list item1', 'list item2']
function FunctionCallee() {
  return (
    <>
      {renderMapInJsx(list)}
    </>
  )
}

export default function JsxComponent() {
  return (
    <>
      <CamelCase />
      <CacelCaseSpecial />
      <ReturnSingleElement />
      <CloseAllTags />
      <VariableComponent />
      <ConditionalOperator />
      <FunctionCallee />
    </>
  )
}