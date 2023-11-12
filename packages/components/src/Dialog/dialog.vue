<template>
  <Transition name="dialog-fade">
    <div class="dialog-wrapper" @click.self="handlerClose" v-show="visiable">
      <div class="emui-dialog">
        <div class="emui-dialog-header">Emui-plus提示您</div>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {} from 'vue'
interface propsType {
  visiable: boolean
}
defineProps<propsType>()
const emit = defineEmits(['update:visiable'])
function handlerClose() {
  emit('update:visiable', false)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-dialog'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
