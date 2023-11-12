import EmuiRadio from './Radio.vue'
import type { BT } from './Radio.vue'
import './style/index.less'
import type { App, Plugin } from 'vue'
type SFCWithInstall<T> = T & Plugin
const withInstall = <T>(comp: T) => {
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as BT).name
    //注册组件
    app.component(name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}
const emuiRadio = withInstall(EmuiRadio)
export default emuiRadio
export { EmuiRadio }
