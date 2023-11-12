<template>
  <div>
    <svg class="icon" aria-hidden="true" :style="iconColor">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface iconProps {
  name: string
  color?: string
  size?: number
}
const props = defineProps<iconProps>()
const iconName = computed(() => {
  return `#emui-${props.name}`
})
const iconColor = computed(() => {
  return {
    color: props.color,
    fontSize: props.size + 'px'
  }
})
</script>

<script lang="ts">
import './font/iconfont.js'
import './style/index.less'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-icon'
})
</script>

<style lang="less" scoped></style>
