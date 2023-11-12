<template>
  <div :class="className" ref="row">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, getCurrentInstance } from 'vue'
interface rowProsps {
  gutter?: number
  type?: 'flex' | ''
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'start' | 'end' | 'middle'
}
const props = defineProps<rowProsps>()
const justify = computed(() => {
  return props.justify ? props.justify : 'center'
})
const align = computed(() => {
  return props.align ? props.align : 'middle'
})
const className = computed(() => {
  const isFlex = props.type == 'flex'
  const proflx = isFlex ? 'emui-row-flex' : 'emui-row'
  const name = [proflx]
  if (isFlex) {
    name.push(`${proflx}-justify-${justify.value}`)
    name.push(`${proflx}-align-${align.value}`)
  }
  return name
})
function addGutter() {
  const obj = getCurrentInstance() as any

  const rows = obj.ctx.$refs.row.children || []
  const len = rows.length

  if (props.gutter && props.gutter >= 0 && len > 1) {
    for (let i = 0; i < len; i++) {
      rows[i].classList.add('emui-col')
      if (i !== 0) rows[i].style.paddingLeft = `${props.gutter}px`
      if (i !== len - 1) rows[i].style.paddingRight = `${props.gutter}px`
    }
  }
}
onMounted(() => {
  addGutter()
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-row'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
