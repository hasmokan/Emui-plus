<template>
  <div class="emui-nav" :class="{ vertical }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, getCurrentInstance, ComponentInternalInstance } from 'vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

interface propsType {
  selected: string
  vertical?: boolean
}
const props = defineProps<propsType>()
defineEmits(['update:selected'])
provide('nav', { proxy, vertical: props.vertical })
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-nav'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
