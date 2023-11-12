<template>
  <button
    class="emui-radio"
    @click="changeValue"
    :class="{ 'emui-radio-active': reactValue == label }"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
const isGrouped: any = inject('radioGroup')

interface radioButtonProps {
  label: string
  modelValue?: any
}
const props = defineProps<radioButtonProps>()
const emit = defineEmits(['update:modelValue'])

const reactValue = computed(() => {
  return isGrouped ? isGrouped.modelValue : props.modelValue
})

function changeValue() {
  isGrouped
    ? isGrouped.$emit('update:modelValue', props.label)
    : emit('update:modelValue', props.label)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-radio-button'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
