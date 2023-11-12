import { DirectiveBinding } from 'vue'

interface elType extends HTMLElement {
  __click_outside__: (e: MouseEvent) => boolean | void
}
export default {
  mounted(el: elType, binding: DirectiveBinding) {
    function eventHandler(e: MouseEvent) {
      if (el.contains(e.target as HTMLElement)) {
        return false
      }
      // 如果绑定的参数是函数，正常情况也应该是函数，执行
      if (binding.value && typeof binding.value === 'function') {
        binding.value(e)
      }
    }
    // 用于销毁前注销事件监听
    el.__click_outside__ = eventHandler
    // 添加事件监听
    document.addEventListener('click', eventHandler)
  },
  beforeUnmount(el: elType) {
    // 移除事件监听
    document.removeEventListener('click', el.__click_outside__)
  }
}
