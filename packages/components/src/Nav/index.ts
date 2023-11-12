import EmuiNav from './Nav.vue'
import type { App, Plugin } from 'vue'
import './style/index.less'
type SFCWithInstall<T> = T & Plugin
const withInstall = <T>(comp: T) => {
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as any).name
    //注册组件
    app.component(name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}
const emuiNav = withInstall(EmuiNav)
export default emuiNav
export { EmuiNav }
