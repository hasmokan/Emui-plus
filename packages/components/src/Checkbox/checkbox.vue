<template>
  <div class="checkbox">
    <span class="emui-checkbox-primary">
      <input
        type="checkbox"
        class="emui-checkbox"
        :value="label"
        v-model="currentValue"
      />
      <label class="emui-checkbox-label">{{ label }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
const checkboxGroup: any = inject('checkboxGroup', {})

type CheckBoxProps = {
  label: string
  modelValue?: any
}
const props = defineProps<CheckBoxProps>()
const emit = defineEmits(['update:modelValue', 'change'])

const isGrouped = computed(() => {
  return checkboxGroup.name ? true : false
})

const currentValue = computed({
  get() {
    return isGrouped.value ? checkboxGroup.modelValue.value : props.modelValue
  },
  set(newValue) {
    if (isGrouped.value) {
      checkboxGroup.changeEvent(newValue)
    } else {
      emit('update:modelValue', newValue)
    }
  }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-checkbox'
})
</script>
<style lang="less" scoped>
@import './style/index.less';
</style>
