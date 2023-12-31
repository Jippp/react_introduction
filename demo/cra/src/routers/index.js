import JsxComponent from "../modules/jsx";
import PropsComponent from "../modules/props";
import StateComponent from "../modules/state";
import HookComponent from "../modules/innerHooks";
import EffectComponent from "../modules/effect";
import ReducerComponent from "../modules/reducer";
import Communicate from "../modules/communicate";
import Css from "../modules/css";

export const pathConfigs = [
  {
    title: '关于jsx',
    path: '/jsx',
    element: <JsxComponent />
  },
  {
    title: '关于props',
    path: '/props',
    element: <PropsComponent />
  },
  {
    title: '关于state',
    path: '/state',
    element: <StateComponent />
  },
  {
    title: '关于hook',
    path: '/hook',
    element: <HookComponent />
  },
  {
    title: '关于effect',
    path: '/effect',
    element: <EffectComponent />
  },
  {
    title: '关于reducer',
    path: '/reducer',
    element: <ReducerComponent />
  },
  {
    title: '关于组件通信',
    path: '/communicate',
    element: <Communicate />
  },
  {
    title: '关于样式',
    path: '/css',
    element: <Css />
  },
]
