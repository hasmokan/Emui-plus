<template>
  <div class="form">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import {
  formItemAdd,
  formItemRemove,
  resetFields,
  validate
} from './hooks/useForm'
type formProps = {
  model: object
  rules: object
}
const props = defineProps<formProps>()

defineExpose({ resetFields, validate })
provide('form', {
  formItemAdd,
  formItemRemove,
  model: props.model,
  rules: props.rules
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-form'
})
</script>

<style lang="less" scoped></style>
