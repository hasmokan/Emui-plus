<template>
  <div class="input">
    <input
      :type="inputType"
      v-model="currentValue"
      class="emui-input"
      @blur="handlerblur"
      @input="handlerInput"
    />
    <emui-icon
      v-show="isClearable"
      name="close"
      class="icon close"
      :size="20"
      @click="currentValue = ''"
    ></emui-icon>
    <emui-icon
      :name="inputType == 'text' ? 'eye' : 'no_eye'"
      @click="changeType"
      v-if="showPassword"
    >
    </emui-icon>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue'
type Ttype = 'text' | 'textarea' | 'password'
interface inputProps {
  type?: Ttype
  modelValue: string
  clearable?: boolean
  showPassword?: false
}
const props = defineProps<inputProps>()
const emit = defineEmits(['update:modelValue'])
const currentValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
const isClearable = computed(() => {
  return props.clearable
})
let inputType = ref(props.type || 'text')

function changeType() {
  if (inputType.value == 'text') {
    inputType.value = 'password'
  } else {
    inputType.value = 'text'
  }
}

const formItem: any = inject('formItem', {})
function handlerblur() {
  formItem.formBlur()
}
function handlerInput() {
  formItem.formChange()
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-input'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
