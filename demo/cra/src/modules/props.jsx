import { forwardRef, useRef, useEffect } from 'react'

const PropsCase = forwardRef(({ children }, ref) => {
  return (
    <div ref={ref}>
      <header>这是PropsCase组件内部添加的header</header>
      {children}
    </div>
  )
})

const Props = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    console.log('%cref', 'color: red; font-size: 20px', containerRef);
  }, [])

  return (
    <PropsCase children={123} ref={containerRef}>
      <div>some thing</div>
    </PropsCase>
  )
}

export default Props