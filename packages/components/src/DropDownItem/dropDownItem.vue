<template>
  <li class="dropdown-item" @click="handlerClick">
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const dropDown = inject('dropDown') as any

function handlerClick() {
  if (dropDown.isHide) {
    dropDown.isShow.value = false
  }
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-dropdown-item'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
