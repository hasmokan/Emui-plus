<template>
  <div class="select">
    <div class="title">
      <span class="placeholder" v-show="curValue == '' || modelValue == ''">{{
        placeholder
      }}</span>
      <span class="curlabel" v-show="modelValue">{{ curLabel }}</span>
      <emui-icon
        name="arrow-up-bold"
        class="iconfont"
        :class="{ rotateIcon: isShowOptions }"
        @click="showOption"
      ></emui-icon>
    </div>
    <Transition
      @enter="enter"
      @leave="leave"
      @after-leave="afterLeave"
      @after-enter="afterEnter"
    >
      <div class="options" v-show="isShowOptions">
        <div style="height: 10px" class="arrow"></div>
        <div class="select-option">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { optionsType } from '../inject-provide'
import { enter, leave, afterEnter, afterLeave } from '../../utils/translition'
type selectProps = {
  modelValue: string
  placeholder: string
}
const props = defineProps<selectProps>()

let curLabel = ref('')
let curValue = ref(props.modelValue)
let isShowOptions = ref(false)
const options = ref<optionsType[]>([])
function showOption() {
  isShowOptions.value = !isShowOptions.value
}
const emit = defineEmits(['update:modelValue'])
watch(curValue, (value) => {
  emit('update:modelValue', value)
})
provide('select', { options, curLabel, curValue, showOption })
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-select'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
