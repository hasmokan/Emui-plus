<template>
  <div :class="classStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'
interface RadioGroupProps {
  vertical?: boolean
  modelValue?: any
  disabled?: boolean
}
const radioGroupProps = defineProps<RadioGroupProps>()
const classStyle = computed(() => {
  return {
    [`emui-radio-group_disabled--${radioGroupProps.disabled}`]:
      radioGroupProps.disabled,
    [`is-vertical`]: radioGroupProps.vertical
  }
})

const { proxy } = getCurrentInstance() as ComponentInternalInstance
provide('radioGroup', proxy)
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-radio-group'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
