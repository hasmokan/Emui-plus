<template>
  <div :style="styleName">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface colProps {
  span: number
  offset?: number
}
const props = defineProps<colProps>()
const styleName = computed(() => {
  let width = 100 / (24 / props.span)
  return { width: width + '%' }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-col'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
