<template>
  <div class="emui-tag" :class="`emui-tag-${etype}`">
    <slot></slot>
    <emui-icon
      name="close"
      class="iconfont"
      @click="removeTag($event)"
    ></emui-icon>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { removeTagtype } from '../inject-provide'
type tagType = {
  closable?: boolean
  type?: 'primary' | 'success' | 'danger' | 'info' | 'warning'
}
const props = defineProps<tagType>()
const etype = computed(() => {
  if (props.type) return props.type
  return 'primary'
})
const tagLists = inject<removeTagtype>('tagList', {} as removeTagtype)
function removeTag(e: any) {
  tagLists.removeTag(e.target.parentElement.innerText)
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-tag'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
