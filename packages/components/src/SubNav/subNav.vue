<template>
  <div
    class="emui-sub-nav"
    v-click-outside="close"
    :class="{ vertical, 'not-vertical': !vertical }"
  >
    <div class="emui-sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <emui-icon
        :name="vertical ? 'arrow-down-bold' : 'arrow-left-bold'"
        class="icon"
        :class="{ open: open }"
      ></emui-icon>
    </div>
    <template v-if="vertical">
      <Transition
        @enter="enter"
        @leave="leave"
        @after-leave="afterLeave"
        @after-enter="afterEnter"
      >
        <div class="emui-sub-nav-item" v-show="open" :class="vertical">
          <slot></slot>
        </div>
      </Transition>
    </template>
    <template v-else>
      <Transition name="show-out">
        <div class="emui-sub-nav-item" v-show="open" :class="vertical">
          <slot></slot></div
      ></Transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, provide } from 'vue'
import vClickOutside from './directives/vClickOutside'
import { enter, leave, afterEnter, afterLeave } from '../../utils/translition'
const nav = inject('nav') as any
const vertical = ref(nav.vertical)
provide('nav', nav)
provide('subnav', true)
const open = ref(false)
function onClick() {
  open.value = !open.value
}
function close() {
  open.value = false
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-sub-nav'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
