<template>
  <div class="emui-tag-list">
    <emui-tag closable v-for="(tag, index) in modelValue" :key="index">{{
      tag
    }}</emui-tag>
    <span class="add-tag" v-if="addTag" @click="addNewTag">+ New Tag</span>
    <input
      ref="input"
      type="text"
      class="add-input"
      v-else
      @blur="addSuccess($event)"
      @keyup.enter="handlerEnter($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, nextTick } from 'vue'
type tagListProp = {
  modelValue: string[]
}
const props = defineProps<tagListProp>()
const emit = defineEmits(['update:modelValue'])
const addTag = ref(true)
const isEnter = ref(false)
const input = ref()
function addNewTag() {
  addTag.value = !addTag.value
  nextTick(() => {
    input.value.focus()
  })
}
function addSuccess(e: FocusEvent) {
  if (isEnter.value) {
    let copy = JSON.parse(JSON.stringify(props.modelValue))
    if ((e.target as HTMLInputElement).value.trim()) {
      copy.push((e.target as HTMLInputElement).value)
      emit('update:modelValue', copy)
      isEnter.value = false
    }
  } else {
    let copy = JSON.parse(JSON.stringify(props.modelValue))
    if ((e.target as HTMLInputElement).value.trim()) {
      copy.push((e.target as HTMLInputElement).value)
      emit('update:modelValue', copy)
    }
  }
  addTag.value = !addTag.value
}
function handlerEnter(e: any) {
  isEnter.value = true
  e.target.blur(e)
}
function removeTag(value: string) {
  console.log(value)

  let copy = JSON.parse(JSON.stringify(props.modelValue))
  copy.splice(copy.indexOf(value), 1)
  emit('update:modelValue', copy)
}

provide('tagList', { removeTag })
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-tag-list'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
