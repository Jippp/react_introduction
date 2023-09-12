### react入门

#### 使用create-react-app/vite创建一个app应用

##### create-react-app

```bash
npx create-react-app react_1_cra
```

##### vite

```bash
pnpm/yarn/npm create vite
```

现在react官方已经并不推荐使用`create-react-app`来创建一个react项目了，更推荐通过`next`这类顶层框架来创建，或者是使用`vite`来创建。

> Next 是一个流行的、基于 React 构建的轻量级框架，用于构建静态和服务器端渲染的应用程序。如果想要自由的配置这些东西，也可以通过vite来创建，然后自由的选择。

如果不考虑兼容性以及产物不一致的问题或者只是自己的小项目，是可以使用vite的，毕竟启动的速度真的很快。

react的项目创建完成之后，就来介绍一些react中的一些基本概念。由于类组件基本已经不再使用了，所以这里只介绍函数式组件。

---

#### JSX(JavaScript Syntax Extension)

JSX是`Meta`研发的一种`DSL(Domain Specific Language)`即领域特定语言，是对JS的语法扩展。在React中使用JSX可以在JS文件中书写类HTML代码。

> 关于JSX的更多知识可以看Meta的[官网](https://facebook.github.io/jsx/)

可以通过Babel等工具来编译JSX，在React中通过`@babel/plugin-transform-react-jsx`这个Babel插件将JSX编译为React.createElement函数，从而渲染到页面上的。

```react
function TestComponent() {
  return (
    <div>这里是测试组件</div>
  )
}
export default TestComponent

// 通过Babel的编译后 React.createElement("div", null, "这里是测试组件");
```

这段代码中`return()`内的代码就是`JSX`语法。

##### 在JSX中写HTML

严格来说这里写的已经不是HTML了，是JSX提供给我们的`Markup`标记

> 可以类比W3C的HTML，也是提供给开发者一系列的Markup标记以便能够在浏览器上更方便的进行设计。JSX提供的Markup和HTML差别并不大

在JSX中写Markup有几个主要的语法规则需要注意和HTML区分开来：

1. 标签几乎所有的属性都要遵守小驼峰命名规则

最典型的就是在`HTML`标签中的class是需要用`className`来替代的

```jsx
function CamelCase() {
  return <h4 className='camel-case'>camelCase 小驼峰命名的类名</h4>
}
function CacelCaseSpecial() {
  return <h4 data-something='custom-data'>自定义的data-*属性</h4>
}
```

> 几乎所有就说明有例外：`aria-*`和`data-*`这两种属性就不需要小驼峰

2. return()括号内只能返回一个element

允许嵌套，但如果多个同级的元素必须要有一个父元素包裹。这里是函数的return结果，是不能返回多个对象的

```jsx
function ReturnSingleElement() {
  return (
    <>
      <h4>single element 标题1</h4>
      <h4>single element 标题2</h4>
    </>
  )
}
// or
function ReturnSingleElement() {
  return (
    <React.Fragment>
      <h4>single element 标题1</h4>
      <h4>single element 标题2</h4>
    </React.Fragment>
  )
}
```
这里的`Fragment`元素是React提供的一种可以包裹子组件的元素，并没有实际意义，也不会在页面中显示出来。

`Fragment`和`<></>`这两个的区别就在于，`Fragment`是可以添加属性的，比如循环渲染列表时我不想在父级添加一个`div`或者`span`，但是我又必须给父级元素添加`key`属性，这时候就可以用`Fragment`

> `Fragment`是`React`提供的一个标签


另外`return`后的语句怎么书写并没有强制规定，不加`()`自然也是可以的，只要保证返回的一段JSX代码就可。

3. 所有的标签都必须有闭合标签

```html
// error 这种写法在HTML中能生效的，当在JSX中会报错
<li>
// right
<li></li>
```

##### 在JSX中写JS代码

如果在JSX中想要添加一些JS代码，需要用`{}`大括号包裹

###### 在哪里使用`{}`

1. 标签的属性值或者组件的props

2. 某个标签包裹的内容

```jsx
const variable = 233
function TestComponent() {
  return (
    <div width={100}>{variable}</div>
  )
}
```

###### `{}`可以包裹哪些东西

在JSX中可以用`{}`来包裹JS表达式，这里的表达式包括以下几种： 

1. 变量引用/声明表达式

```jsx
function VariableInJsx({ content }) {
  return <div>{content}</div>
}
function VariableComponent() {
  return (
    <>
      <VariableInJsx content='content' />
      <VariableInJsx content={100} />
      <VariableInJsx content={['name1', 'name2']} />
      <div width={100} style={{color: 'red'}}>{'{} in style'}</div>

      {/* Error：not valid */}
      {/* <VariableInJsx content={[{ name: 'name1' }, { name: 'name2' }]} /> */}
      {/* <VariableInJsx content={{ name: 'name' }} /> */}
      {/* <VariableInJsx content={() => 'name'} /> */}
    </>
  )
}
```

>  注意这里的`style={{ color:  'red' }}`，是用`{}`包裹了一层`{ color: 'red' }`对象，与Vue中的`{{}}`语法区分开来。
>
>  和HTML中的标签内只能是字符串一样，JSX的标签内也只能是字符串，如果是falsy(除了0)页面会不显示，否则会报错。

2. 三元表达式即条件渲染

```jsx
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
```

> 在React中可以通过三目运算符来进行条件渲染

3. 函数调用

```jsx
// 循环渲染
function renderMapInJsx(list) {
  return (
    <>{ list.map((name, idx) => <Fragment key={idx}>{name}</Fragment>) }</>
  )
}
const list = ['name1', 'name2']
function FunctionCallee() {
  return (
    <>
      {renderMapInJsx(list)}
    </>
  )
}
```

> 在React中想要循环渲染一个列表，可以通过在{}内调用数组的map方法遍历返回HTML元素数组即可，需要注意的是map时对子元素需要添加key，否则也会在控制台报错。

以上就是JSX在React中的大致用法。

#### key

上面的循环渲染列表的例子中，React输出错误，提示我们在`map`中返回的元素需要有一个`key`值。
在React中`key`的作用和Vue中一样，都是用来标记组件的，在框架`diff`的过程，`key`会作为一个组件是否需要重新渲染的指标来使用。

所以列表如果有删除、添加等会改变数组索引的操作时最好不要用索引作为`key`，需要在列表中选中一个唯一的值。

> 在非循环渲染的组件中，key如果不写的话默认都是`null`。

> 在循环渲染中，key如果不写默认会将数组索引作为key。

#### props/state

##### props

props在React中是传递给组件的值，是用来组件间通信的，因为这里用的是函数式组件，可以将props简单理解为函数的入参即可。

props中有几个比较特殊的值：

- key：`key`作为props是传递不到子组件中的
- ref: 如果在组件的props中添加ref属性，是需要配合`forwardRef`的，具体就是使用`forwardRef`包裹一下组件，这样组件就有第二个参数ref了，然后将ref添加到需要的位置即可。
- children：可以显示传递，也可以把包裹的内容作为children传递进props。如果同时存在，显示传递的children会被覆盖掉。

还有就是在组件内不要直接修改接收到的props的值，这样会造成难以排查的问题，也会对代码的状态管理造成影响。当这个props只在子组件内用到的话，是可以在子组件通过`useState`或其他hook进行状态管理的。

##### state

state在React中是非常重要的，在React中起到了存储状态的作用。

```jsx
function Test1() {
  let count = 1

  const handleAdd = () => {
    count++
  }
  return (
    <>
      <button onClick={handleAdd}>加点</button>
      <h3>{count}</h3>
    </>
  )
}
```

点击之后，视图是不会有任何变化的，因为在React中：

1. 组件内的变量变化不会引起组件的重渲染

> React的渲染只能由内部派发出来的更新函数来触发，即useState、useReducer返回值的第二个参数

2. 组件内的变量在两次渲染之间是不持久的

> 函数式组件的重渲染是重新执行一遍函数，所以在函数内声明的变量在每次重渲染都会重新声明，上一次渲染时的状态不会保留到下一次渲染时，所以说是不持久的。

通过`useState`改写上面的例子：

```jsx
import { useState } from 'react'

function Test1() {
  const [count, setCount] = useState(1)

  const handleAdd = () => {
    setCount(d => d + 1)
  }
  return (
    <>
      <button onClick={handleAdd}>加点</button>
      <h3>{count}</h3>
    </>
  )
}
```

#### 常用Hooks

> 先给上官方文档：[中文版](https://zh-hans.react.dev/reference/react) [英文版](https://react.dev/reference/react)

##### Hook是什么

`React V16.8`之后推出的，推出的目的就是为了避免繁琐的类组件写法。`Hook`就是为了增强函数组件而生的，`React`团队想要通过`hook`配合函数组件替代掉类组件。`Hook`为函数组件提供了引入外部功能和处理副作用的能力。

##### Hook的限制

1. 只能在函数组件中使用Hook
2. 只能在顶层使用Hook，不能在循环、条件或嵌套函数中使用Hook
3. 命名必须以`use`开头

> 这些限制都是为了保证多次渲染，Hook的顺序是不变的，如果在条件或循环中会导致Hook顺序混乱

##### useState

`useState`是用来存储数据，进行状态管理的。更新函数在执行时会让整个函数组件重新执行一遍，所以在函数组件内最好不要直接声明一些复杂的对象，需要配合`useMemo`/`useCallback`等hook来进行优化。

```react
// useState函数定义大致如下
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]；

// 具体使用如下
const [count, setCount] = useState(0)
```

###### 入参

- initialState：可选参数，作为初始state。可以是一个值，也可以是一个有返回值的函数。如果是函数，返回值会作为初始state

在初次渲染之后，这个初始state会被忽略，意思就是每次渲染不会重复声明这个初始state。 

> `useState(getInitState())`如果这种方式来进行state的初始化，每次渲染都会执行`getInitState`函数的，所以并不推荐这种方式来初始化state，可以直接`useState(getInitState)`

###### 返回值

返回一个数组：

1. 数组第一位是当前的state状态。

2. 第二位是更新state的方法。想要更新state，只能通过调用这个方法来更新，这个方法接收两种形式的入参：
   - 直接一个值：这个值会作为最新的state
   - 一个函数，最后返回一个值：该函数也有一个入参即旧的state，最终返回的值会作为最新的state。如果在函数中直接修改旧的state，是不会触发更新的

> React对state是否执行更新的依据是通过判断`Object.is(newState, oldState)`，如果false认为变化了，就会更新state。
>
> 另外这个set函数更新的是下一次渲染的状态，如果在执行set函数之后立即读取state，是拿不到最新状态的。
>
> 还有就是如果在一个事件处理函数中执行多个set函数，React是有一个批处理机制的，会将多个set函数执行完成之后才渲染页面。

###### 如果我的state是一个引用值，需要怎么更新？

因为是通过`Object.is()`来判断是否需要更新state，所以更新一个引用值就相对来说有些麻烦。

- 可以直接调用set函数传入一个新的引用值，这个值就会作为最新的state

- 可以调用set函数传入一个函数，函数中deepClone旧的state，然后更新返回新的值

> 如果嵌套很多层的引用值，用useState来更新维护是很麻烦的。可以通过immer来管理，内部通过proxy代理，每次都返回新的值。

##### useEffect/useLayoutEffect

`useEffect`是React提供用来处理副作用的。

`useLayouEffect`和`useEffect`的作用一样，不过执行时机不同，`useEffect`会在页面渲染之后执行。`useLayoutEffect`会在vdom生成之后页面渲染之前执行。所以有的时候可以在`useLayoutEffect`中拿到一些vdom进行操作。

```react
// 大致使用
useEffect(() => {
  // do something
}, [])
```

###### 入参

`useEffect`接收一个函数和一个数组作为入参。

- 函数：当函数组件初次渲染时该函数会执行一次，然后第二个参数数组内的值变化时也会执行一次该函数。

- 数组：可选，如果不传，每次组件渲染都会执行一遍函数。这个数组是一个依赖数组，当数组中的任一一项变化时都会导致前面函数重新执行。

> 依赖数组的检查是通过Object.is对每一项进行检查。
>
> 依赖数组的值包括props、state、其他定义在组件中的变量和函数。依赖数组是不受控制的，在函数体内用到了什么，依赖数组就必须要有。

前面提到`useEffect`一般是用来处理副作用的，在介绍副作用之前，介绍一下什么是纯函数。

纯函数是程序设计中的一个概念，简单来说符合以下两个条件的就可以称为纯函数：

1. 相同的输入，有着相同的输出，且输出只与输入有关。
2. 函数体不能有可观察的副作用。

> `可观察的副作用`是指函数在执行过程中，会对外部环境产生影响。比如修改全局变量、发起网络请求、DOM的查询和修改、计时器等。

为什么说`useEffect`是用来处理副作用的？因为在`useEffect`接收的第一个函数参数中，可以选择性的返回一个函数，这个函数就是用来处理副作用的。

> 这个函数的执行时机是下一次所在的useEffect执行之前，函数体中的props/state都是上一次的值。

什么时候需要声明这个清除副作用的函数呢？一般用于清除计时器、组件卸载时终止网络请求、清除内存防止内存泄露等。

##### useMemo

`useMemo`是用来缓存数据的，只有在指定的依赖更新之后才会去更新数据，依赖数组和`useEffect`的是一样的。

```react
// 大致使用
useMemo(() => {
  // 返回某个值
  return ''
}, [])
```

`useMemo`接收的函数，要有一个返回值，这个返回值就是需要缓存的值。

该hook主要就是避免一些重复渲染带来的问题，是react中性能优化的一部分。 

##### useCallback

`useCallback`也是用来缓存的，不过缓存的是一个函数。

> 实际上重复创建函数的消耗是很小的，之所以有这么个hook，是为了避免函数作为组件的props传入，当props时变动时导致的整个组件重新渲染带来的损耗。

可以将`useCallback`当做是`useMemo`缓存函数的一种特殊用法

```react
function useCallback(fn, dep) {
    return useMemo(() => fn, dep)
}
```

之所以会有这个hook，是因为在`useMemo`中缓存一个函数写法相对复杂一点，需要在函数中返回缓存的函数，所以对`useMemo`包装了一层，就成了`useCallback`。

`useMemo/useCallback`作为React提供的一种性能优化手段，并不会让渲染变快，只会减少重复更新。

##### useRef

`useRef`可以用来存储一些变量，常用的是用来获取元素，在React创建了DOM节点并已经渲染到页面上时会将DOM节点设置为ref值。

> ref只能获取到原生DOM节点，如果是一个组件，需要用forwardRef包裹组件

`useRef`的值变动并不会引起组件的重新渲染。

使用`useRef`可以在重新渲染时存储信息，不会重复声明。

因为`ref`改变不会引起组件的重新渲染，所以不应该将`ref`作为页面的内容来显示。

##### useReducer

`useReducer`是React提供的另一个管理状态的hook，可以看做是`useState`的高级版本，这个hook用来进行更加复杂的逻辑处理。

```jsx
const [state, dispatch] = useReducer(reducer, initState, init?)
```

###### 入参

- `reducer`：纯函数，用来更新state的

> reducer函数有两个入参
>
> 第一个入参是旧的state，不能直接修改。
>
> 第二个入参是state更新必要的参数，这个对象是自定义的，一般是一个对象{ action, info } action是更新的动作，info是state更新的参数。
> (state, payload) => new State 

- `initState`：state的初始状态
- `init`：可选，是一个初始化函数，作为第二种创建初始state的方法，后续如果有初始化的操作可以使用这个参数来进行初始化。

###### 返回值

- `state`：当前的状态
- `dispatch`：派发出来的更新函数。这个函数和setState返回的函数一样，React保证了渲染之间是不会变化的。该函数入参会作为reducer纯函数的第二个参数，即payload对象。

###### 和`useState`的对别

这两个Hook都是用来管理状态的，不同的是在于`useReducer`可以将组件的状态提到最顶部，然后进行统一的管理和共享

###### 扩展

`useReducer`的用法和`useState`和相似，所以遇到的问题也很相似：即复杂的对象更新时过于麻烦，因为每次都要返回新的对象。可以用`useImmerReducer`这个三方Hook来替代。

```react
import { useImmerReducer } from 'use-immer'

// 用法都是一样的，只是更新时可以直接修改state，内部会基于proxy进行了代理拦截
```

##### useContext

`useContext`是用来突破组件限制，提升状态的。一般会在维护一些多个组件的状态共享时会用到。需要配合`createContext`来使用

```jsx
import { createContext, useContext } from 'react'

const Context = createContext()

export default () => {
    return (
    	<Context.Provider>aaa</Context.Provider>
    )
}
```

###### createContext的用法

```react
const Context = createContext(defaultValue)
```

###### createContext入参

可选，是提供给context上下文的默认值，这个默认值是静态的，只能作为一种兜底的手段。

###### createContext返回值

一个Context对象

- Provider：为被其包裹的组件提供上下文信息，通过value属性来保存上下文信息。
- Consumer：用来读取上下文的值，一般很少用。在使用类组件时会用到，现在都是用`useContext`来获取，并不推荐使用这个属性来获取上下文

###### useContext入参

`createContext`创建的Context对象

###### useContext返回值

`createContext`创建的`Provider`的value值或者是`createContext`的入参

> 如果有了Provider包裹，会忽略掉createContext的入参

使用的使用有些需要注意的地方：

- 读取`context`信息时，是从最近的`Provider`上读取的
- 更新时，所有用到了`context`信息的组件都会重新渲染

> 实际这样在context越来越大的时候，是会有问题的。可以配合immer等库避免不必要的更新。

##### useImperativeHandle

不常用，这里简单介绍一下用法。一般配合`forwardRef`使用，当父级需要使用子级的一些方法或属性就能用到这个Hook

```react
import { forwardRef, useImperativeHandle } from 'react'

const ChildComp = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => {
        return {
            // ...自定义的一些方法或属性
        }
    }, [])
})
```

###### 入参

- ref：forwardRef接收到的ref值
- createHandle：function，返回一个包含想要暴露的方法或属性的对象
- dependencies：依赖数组

> 如果使用了该hook，外层使用ref只能拿到暴露出来的方法

#### 组件通讯

##### 向下传递

即父级向子级传递，直接用props即可完成

##### 向上传递

- 状态提升

> 如果父级需要子级的一些信息，通常是需要将状态提升到父级，然后再通过props传递到子级

- forwardRef+useImperativeHandle

##### 同级之间

- 借助同一个父级组件进行传递

##### 跨组件的通信

- createContext + useContext

##### 第三方库

Redux/Mobx/zusand

#### 如何在react中使用css

##### css

##### less

- `cra`是需要配置才能使用less的

通过`react-app-rewired`这个第三方库来添加额外的webpack配置，一般还需要配合`customize-cra`这个库

具体步骤：
1. 安装第三方库以及less、less-loader
```bash
yarn add react-app-rewired customize-cra less less-loader -D
```
> react-app-rewired：可以修改cra内置的webpack配置
>
> customize-cra：cra2.0之后的兼容
>
> less：提供less支持
>
> less-loader：配合babel解析less语法的

2. 在项目主目录下创建一个`config-overrides.js`文件，在该文件内进行额外的weback配置

```js
const { override, addLessLoader } = require('customize-cra')

module.exports = override(
  addLessLoader({
    // less-loader@6版本之上，需要使用lessOptions包裹
    lessOptions: {
      javascriptEnabled: true,
      cssLoaderOptions: {}
    },
  }),
)
```
3. 将`package.json`中的`scripts`命令`react-scripts`替换成`react-app-rewired`，`eject`命令`react-app-rewired`没有提供，也不需要替换掉。

4. 配置完成之后就可以使用less

##### cssInJs

以styled-components为例

不需要什么配置，安装`styled-components`即可使用

##### cssModule

```js
const { override, addLessLoader, adjustStyleLoaders } = require('customize-cra')

module.exports = override(
  addLessLoader({
    // 注意版本
    cssModules: {
      // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      localIdentName: "[path][name]__[local]--[hash:base64:5]", 
    },
  }),
  /**
   * lessloader 最新版基于webpack5开发，而react-app-rewired基于webpack4，所以需要注意版本
   * 但是即使将lessloader版本降低也可能会有相同问题，需要加上以下配置，该配置加上之后less-loader版本可以不用降低
   * https://github.com/arackaf/customize-cra/issues/315
   */
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  })
)
```

因为`react-app-rewire`是有社区维护的，基本不怎么更新，所以使用`react-app-rewire + customize-cra`会有很多版本的问题，官网也不一定可靠。

##### Craco`Create React App Configuration Override.`

[官网](https://github.com/dilanx/craco)

- 首先安装一下`yarn add @cracp/craco`，如果使用less需要额外安装`craco-less`
- 根目录创建`craco.config.js`

```js
const CracoLessPlugin = require('craco-less');
const { loaderByName } = require('@craco/craco');
const path = require('path');

const lessModuleRegex = /\.module\.less$/;

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 自定义变量
            // modifyVars: {
            //     @primary-color: '#2378ff'
            // },
            javascriptEnabled: true
          }
        },
        // lessmodule配置
        modifyLessModuleRule(lessModuleRule) {
          lessModuleRule.test = lessModuleRegex;

          lessModuleRule.use.find(loaderByName('css-loader')).options.modules =
            {
              // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            };

          return lessModuleRule;
        }
      }
    }
  ]
};

```

- 修改`package.json`的`scripts` ：`react-scripts => craco`

#### 实现一个简单的todoList

> 实现一个简单的todoList，增删改查

##### 项目搭建

- `pnpm create-vite`创建一个vite项目

- 项目添加配置

```bash
pnpm i less styled-components babel-plugin-styled-components postcss-preset-env -D 
```

然后修改`vite.config.ts`配置文件

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssPresetEnv from 'postcss-preset-env'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      // 提供打包时DCE、代码压缩等的支持
      plugins: ["babel-plugin-styled-components"]
    }
  })],
  css: {
    // css module配置
    modules: {
      generateScopedName: '[path][name]__[local]__[hash:base64:5]'
    },
    // postcss配置
    postcss: {
      plugins: [
        postcssPresetEnv()
      ]
    }
  },
})
```

##### 思路

要实现的功能有：

1. 添加列表
2. 对某一个子项的修改以及删除

涉及到的react操作有：

- antd的使用
- useState、useCallback等hook的使用
- 循环渲染、条件渲染
- 组件划分：子项有自己的状态，必须要单独拿出来
- 组件间的数据传递：这里组件层级较少，直接props传递即可

