<template>
  <div
    class="emui-dropdown"
    @mouseenter="showContent"
    @mouseleave="closeContent"
  >
    <div class="header">
      <emui-button type="primary" v-if="splitButton" class="button">
        <slot></slot>

        <emui-icon name="arrow-down-bold" class="icon"></emui-icon>
      </emui-button>
      <span v-else><slot></slot></span>
    </div>
    <Transition
      @enter="enter"
      @leave="leave"
      @after-leave="afterLeave"
      @after-enter="afterEnter"
    >
      <div class="content" v-show="show">
        <slot name="dropdown"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { enter, leave, afterEnter, afterLeave } from '../../utils/translition'
interface propsType {
  hideOnClick?: boolean
  splitButton?: boolean
  size?: 'large' | 'small'
}
const props = defineProps<propsType>()

const show = ref(false)
function showContent() {
  show.value = true
}
function closeContent() {
  show.value = false
}

provide('dropDown', { isHide: props.hideOnClick, isShow: show })
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-dropdown'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
