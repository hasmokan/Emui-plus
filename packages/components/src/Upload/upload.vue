<template>
  <div class="emui-upload">
    <div @click="onClickUpload" v-if="listType == 'text'">
      <slot></slot>
    </div>
    <div ref="temp" style="width: 0; height: 0; overflow: hidden"></div>
    <div v-if="listType == 'picture'" class="picture" @click="onClickUpload">
      <emui-icon name="add" size="30" color="#ccc"></emui-icon>
      <img :src="src" alt="" v-if="src" />
    </div>
    <ul style="margin-top: 10px" v-if="fileList && listType == 'text'">
      <li
        v-for="file in fileLists"
        :key="file.name"
        @mouseenter="handlerEnter"
        @mouseleave="handlerLeave"
      >
        <span v-if="file.status == 'uploading'">加载中...</span>
        <span v-if="listType == 'text'"> {{ file.name }}</span>
        <emui-icon
          :name="iconName"
          @click="onRemoveFile(file)"
          class="icon"
        ></emui-icon>
      </li>
    </ul>
    <div class="picture-card">
      <template v-for="file in fileLists" :key="file.name">
        <div
          class="image"
          v-if="listType == 'picture-card'"
          @mouseenter="show"
          @mouseleave="disapper"
        >
          <div class="wrapper" ref="wrapper">
            <emui-icon
              name="enlarge"
              class="icon"
              @click="enlargePicture"
            ></emui-icon>
            <emui-icon
              name="delete"
              class="icon"
              @click="onRemoveFile(file)"
            ></emui-icon>
          </div>
          <img :src="file.url" alt="" ref="img" />
          <img :src="file.url" alt="" v-if="enlarge" class="large" />
        </div>
      </template>
      <div
        class="picture"
        v-if="listType == 'picture-card'"
        @click="onClickUpload"
        style="display: inline-flex"
      >
        <emui-icon name="add" size="30" color="#ccc"></emui-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import axios from 'axios'
const temp = ref<HTMLDivElement>()
const img = ref<HTMLImageElement>()
interface propsType {
  action: string
  fileList?: any[]
  listType: 'text' | 'picture' | 'picture-card'
}
const props = defineProps<propsType>()
const emit = defineEmits(['update:fileList'])
const fileLists = computed({
  get() {
    return props.fileList || []
  },
  set(newValue) {
    emit('update:fileList', newValue)
  }
})
const iconName = ref('success')
function handlerEnter() {
  iconName.value = 'close-copy'
}
function handlerLeave() {
  iconName.value = 'success'
}
const wrapper = ref<any>()
function show() {
  wrapper.value[0].style.display = 'flex'
}
function disapper() {
  wrapper.value[0].style.display = 'none'
}
const enlarge = ref(false)
function enlargePicture() {
  enlarge.value = true
}
const src = ref('')
function onClickUpload() {
  let input = document.createElement('input')
  input.type = 'file'
  temp.value?.appendChild(input)
  input.addEventListener('change', (e) => {
    e.preventDefault()
    const files = input.files as FileList
    const uploadedFile = files[0]

    let { name, size } = uploadedFile
    let newName = updateName(name)

    // 更新fileList前将file的状态设置为uploading
    beforeUpdate(newName, size)
    const formData = new FormData()
    formData.append('file', uploadedFile)
    //使用node模拟上传接口
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://127.0.0.1:3000/upload')
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    xhr.onload = function () {
      if (xhr.response) {
        let url = `http://127.0.0.1:3000/upload/${JSON.parse(xhr.response).key}`
        src.value = url
        afterUpdate(newName, size, 'success', url)
      } else {
        afterUpdate(newName, size, 'failed')
      }
    }
    xhr.send(formData)
    // axios
    //   .post('http://127.0.0.1:3000/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //   .then(
    //     (res) => {
    //       let url = `http://127.0.0.1:3000/upload/${res.data.key}`
    //       src.value = url
    //       afterUpdate(newName, size, 'success', url)
    //     },
    //     (err) => {
    //       afterUpdate(newName, size, 'failed')
    //     }
    //   )
  })
  input.click()
  input.remove()
}
function onRemoveFile(file: File) {
  let answer = window.confirm('你确定要删除图片吗？')
  if (answer) {
    let copy = [...fileLists.value]
    let index = copy.indexOf(file)
    copy.splice(index, 1)
    fileLists.value = copy
  }
}
function updateName(name: string) {
  let newName = name
  while (fileLists.value.filter((item) => item.name == newName).length > 0) {
    let lastDotIndex = name.lastIndexOf('.')
    let nameWithoutDot = name.substring(0, lastDotIndex)
    let nameWithDot = name.substring(lastDotIndex)
    newName = nameWithoutDot + '(1)' + nameWithDot
  }
  return newName
}
function beforeUpdate(newName: string, size: number) {
  fileLists.value = [
    ...fileLists.value,
    { name: newName, size, status: 'uploading' }
  ]
}
function afterUpdate(
  newName: string,
  size: number,
  status: string,
  url?: string
) {
  let file = fileLists.value.filter((item) => item.name == newName)[0]
  let newFile = { name: newName, size, status, url }
  let index = fileLists.value.indexOf(file)
  let fileListCopy = [...fileLists.value]
  fileListCopy.splice(index, 1, newFile)
  fileLists.value = fileListCopy
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-upload'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
