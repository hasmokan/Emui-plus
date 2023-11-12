<template>
  <div class="option">
    <div class="content" @click="showOption">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { selectType } from '../inject-provide'
const select = inject<selectType>('select', {} as selectType)

type optionsProp = {
  label: string
  value: string
}
const props = defineProps<optionsProp>()
select.options?.value.push({ label: props.label, value: props.value })

function showOption() {
  select.curLabel.value = props.label
  select.curValue.value = props.value
  select.showOption()
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-option'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
