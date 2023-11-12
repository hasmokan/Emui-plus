<template>
  <ul class="dropdown-menu">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts">
import { inject, provide } from 'vue'
const dropDown = inject('dropDown') as any
provide('dropDown', dropDown)
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-dropdown-menu'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
