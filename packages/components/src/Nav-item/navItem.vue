<template>
  <div
    class="emui-nav-item"
    @click="onClick"
    :class="{
      selected: selected && !subnav,
      sub: selected && subnav,
      vertical,
      'not-vertical': !vertical
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, ref } from 'vue'
interface propsType {
  name: string
}
const props = defineProps<propsType>()
const nav = inject('nav') as any
const vertical = ref(nav.vertical)
const subnav = inject('subnav')

const selected = computed(() => {
  return nav.proxy.selected == props.name
})
function onClick() {
  nav.proxy.$emit('update:selected', props.name)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-nav-item'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
