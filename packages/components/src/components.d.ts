import * as components from './index'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    EmuiButton: typeof components.Button
    EmuiIcon: typeof components.Icon
    EmuiFormItem: typeof components.EmuiFormItem
  }
  type formItem = typeof components.EmuiFormItem
}

export { formItem }
