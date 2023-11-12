<template>
  <div class="form-item">
    <label
      v-show="label"
      class="form-item-label"
      :class="{ 'label-required': isRequired }"
      >{{ label }}</label
    >
    <slot></slot>
    <div v-if="isShowMes" class="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import AsyncValidator from 'async-validator'
import {
  onMounted,
  inject,
  provide,
  getCurrentInstance,
  ComponentInternalInstance,
  computed,
  ref
} from 'vue'
const form: any = inject('form')
const { proxy } = getCurrentInstance() as ComponentInternalInstance

type formItemProps = {
  label: string
  prop: string
}
const props = defineProps<formItemProps>()
const initialValue: any = ref('')
const fieldValue = computed(() => {
  return form.model[props.prop]
})
const isShowMes = computed(() => {
  return form.model[props.prop] == ''
})
const message: any = ref('')
const isRequired = ref(false)
// 组件挂载时往form中添加
onMounted(() => {
  if (props.prop) {
    form.formItemAdd(proxy)
  }
  if (Array.isArray(fieldValue)) {
    initialValue.value = fieldValue.value.concat([])
  } else {
    initialValue.value = fieldValue.value
  }
  setRules()
})

function getRules() {
  let formRules = form.rules

  formRules = formRules ? formRules[props.prop] : []

  return formRules
}
function setRules() {
  let rules: any = getRules()
  if (rules) {
    rules.forEach((rule: any) => {
      if (rule.required !== undefined) isRequired.value = rule.required
    })
  }
}
// 过滤出符合要求的 rule 规则
type triggerType = 'change' | 'blur'

function getFilteredRule(trigger: triggerType) {
  const rules = getRules()
  return rules.filter(
    (rule: any) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
  )
}
/**
 * 校验表单数据
 * @param trigger 触发校验类型
 * @param callback 回调函数
 */
function validate(trigger: triggerType) {
  let rules = getFilteredRule(trigger)
  if (!rules || rules.length === 0) return true
  // 使用 async-validator
  const validator = new AsyncValidator({ [props.prop]: rules })
  let value = { [props.prop]: fieldValue.value }
  validator.validate(value, { firstFields: true }, (errors) => {
    message.value = errors ? errors[0].message : ''
  })
}
// 重置表单
function resetField() {
  message.value = ''
  if (Array.isArray(initialValue.value)) {
    form.model[props.prop] = initialValue.value.concat([])
  } else {
    form.model[props.prop] = initialValue.value
  }
}
function formBlur() {
  validate('blur')
}
function formChange() {
  validate('change')
}

provide('formItem', {
  formBlur,
  formChange
})
defineExpose({ resetField, validate })
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-form-item'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
