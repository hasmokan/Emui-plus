<template>
  <div class="radio">
    <span class="emui-radio-primary">
      <input
        type="radio"
        :disabled="isDisabled"
        class="emui-radio"
        v-model="currentValue"
        :value="label"
      />
      <label :class="radioStyle">{{ label }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
const isGrouped: any = inject('radioGroup')

type RadioProps = {
  label?: string
  disabled?: boolean
  modelValue?: any
}
const radioProps = defineProps<RadioProps>()
const isDisabled = isGrouped
  ? isGrouped.disabled || radioProps.disabled
  : radioProps.disabled

const radioStyle = computed(() => {
  return {
    [`emui-radio_disabled--${isDisabled}`]: isDisabled
  }
})

const emit = defineEmits(['update:modelValue'])
const currentValue = computed({
  get() {
    return isGrouped ? isGrouped.modelValue : radioProps.modelValue
  },
  set(value) {
    isGrouped
      ? isGrouped.$emit('update:modelValue', value)
      : emit('update:modelValue', value)
  }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export type BT = {
  name: string
}
export default defineComponent({
  name: 'emui-radio'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
