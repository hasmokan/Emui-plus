<template>
  <div :class="classStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, computed, toRefs } from 'vue'

interface CheckboxGroupProps {
  vertical?: boolean
  modelValue: any[]
  disabled?: boolean
}

const emit = defineEmits(['update:modelValue', 'change'])
const checkBoxGroupProps = defineProps<CheckboxGroupProps>()
function changeEvent(value: any[]) {
  emit('update:modelValue', value)
  emit('change', value)
}

provide('checkboxGroup', {
  name: 'checkboxGroup',
  ...toRefs(checkBoxGroupProps),
  changeEvent
})

const classStyle = computed(() => {
  return { ['vertical']: checkBoxGroupProps.vertical }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-checkbox-group'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
