<template>
  <!-- 消息列表 -->
  <Transition name="slide-fade">
    <div class="message-container" v-show="visibled">
      <!-- 内容 -->
      <div
        class="message-content"
        :style="{
          color: colorCom
        }"
      >
        <!-- 消息类型图标，通过消息类型确定，text类型不配置图标 -->
        <div class="message-icon" v-if="config.icon">
          <emui-icon :name="config.icon"></emui-icon>
        </div>

        <!-- 消息文本 -->
        <span v-text="config.content"></span>

        <!-- 手动关闭消息 -->
        <div class="option" v-if="config.close">
          <emui-icon name="close" @click="onClose"></emui-icon>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { configType } from './type/message'
import EmuiIcon from '../Icon'
interface configProps {
  config: configType
  remove: () => void
}
const props = defineProps<configProps>()
const visibled = ref(false)
const colorCom = computed(() => {
  let color = ''
  if (props.config.icon == 'success') {
    color = '#4ef85e'
  } else if (props.config.icon == 'Shapex') {
    color = '#b94343'
  } else if (props.config.icon == 'lights') {
    color = '#f3eb45'
  } else if (props.config.icon == 'info') {
    color = ''
  }
  return color
})
function onOpen(config: configType) {
  setTimeout(() => {
    visibled.value = true
  }, 10)
  //指定时间后移除消息
  if (config.duration !== 0) {
    setTimeout(() => {
      onClose()
    }, config.duration)
  }
}
onOpen(props.config)
function onClose() {
  visibled.value = false
  props.remove()
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: ''
})
</script>

<style lang="less">
@import './style/index.less';
</style>
