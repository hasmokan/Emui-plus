<template>
  <div class="table" style="height: 200px" ref="wrapper">
    <div
      class="tableWrapper"
      ref="tableWrapper"
      :style="{
        height: height + 'px'
      }"
    >
      <table
        class="emui-table"
        :class="{ bordered, compact, striped }"
        ref="tableRef"
      >
        <thead>
          <tr ref="theadrowRef">
            <th v-if="expendFiled" style="width: 50px"></th>
            <th v-if="numberVisible" style="width: 50px; text-align: center">
              序号
            </th>
            <th style="width: 50px" v-if="selected" class="emui-table-center">
              <input
                type="checkbox"
                ref="allChecked"
                :checked="isAllItemsChecked"
                @change="onChangeAllChecked($event)"
                :indeterminate="indeterminate"
              />
            </th>
            <th v-for="column in columns" :key="column.filed">
              <div class="table-column">
                {{ column.text }}

                <span
                  class="table-sort"
                  v-if="column.filed in order"
                  @click="changeOrder(column.filed)"
                >
                  <emui-icon
                    name="sort-up"
                    class="iconfont"
                    :class="{ active: order[column.filed] === 'asc' }"
                  ></emui-icon>
                  <emui-icon
                    name="sort-down"
                    class="iconfont"
                    :class="{ active: order[column.filed] === 'desc' }"
                  ></emui-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in data" :key="item.id">
            <tr>
              <td style="width: 50px" v-if="expendFiled">
                <emui-icon
                  name="arrow-right-bold"
                  class="iconfont emui-table-expend-icon"
                  :class="{
                    'emui-table-expend-icon-active': inExpendIds(item.id)
                  }"
                  @click="expendItem(item.id)"
                ></emui-icon>
              </td>
              <td v-if="numberVisible" style="width: 50px; text-align: center">
                {{ index }}
              </td>
              <td style="width: 50px" v-if="selected" class="emui-table-center">
                <input type="checkbox" v-model="selectedItem" :value="item" />
              </td>
              <template v-for="column in columns" :key="column.filed">
                <td :style="{ width: column.width + 'px' }">
                  {{ item[column.filed] }}
                </td>
              </template>
            </tr>
            <tr v-if="inExpendIds(item.id)">
              <td :colspan="columnsLength + 1">
                {{ item[expendFie] || '默认内容' }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, watch, ref, onMounted } from 'vue'
interface tableProps {
  data: any[]
  columns: any[]
  selectedItems?: any[]
  orderBy?: object
  expendFiled?: string
  height?: number
  bordered?: boolean
  striped?: boolean
  compact?: boolean
  numberVisible?: boolean
  selected?: boolean
}
const props = defineProps<tableProps>()
const emit = defineEmits(['update:orderBy', 'update:selectedItems'])
const propsRef = toRefs(props)
const order = computed({
  get() {
    return propsRef.orderBy?.value !== undefined ? propsRef.orderBy.value : {}
  },
  set(newValue) {
    emit('update:orderBy', newValue)
  }
})
const selectedItem = computed({
  get() {
    return props.selectedItems
  },
  set(newValue) {
    emit('update:selectedItems', newValue)
  }
})
const indeterminate = ref(false)
watch(selectedItem, () => {
  if (
    selectedItem.value?.length !== propsRef.data.value.length &&
    selectedItem.value?.length !== 0
  ) {
    indeterminate.value = true
  } else {
    indeterminate.value = false
  }
})
const isAllItemsChecked = computed(() => {
  let a = propsRef.data.value.map((i) => i.id).sort()
  let b = propsRef.selectedItems?.value?.map((i) => i.id).sort()
  if (a.length !== b?.length) return false
  let equal = true
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      equal = false
    }
  }
  return equal
})
function changeOrder(key: string) {
  let oldValue = order.value[key]

  if (oldValue == 'asc') {
    order.value[key] = 'desc'
  } else if (oldValue == 'desc') {
    order.value[key] = true
  } else {
    order.value[key] = 'asc'
  }
}
function onChangeAllChecked(e: Event) {
  let selected = (e.target as HTMLInputElement)?.checked
  if (selected) {
    emit('update:selectedItems', propsRef.data.value)
  } else {
    emit('update:selectedItems', [])
  }
}
const expendFie = computed(() => {
  return propsRef.expendFiled?.value !== undefined
    ? propsRef.expendFiled.value
    : ''
})
const expendIds = ref<number[]>([])
function inExpendIds(id: number) {
  return expendIds.value.includes(id)
}
function expendItem(id: number) {
  if (inExpendIds(id)) {
    expendIds.value.splice(expendIds.value.indexOf(id), 1)
  } else {
    expendIds.value.push(id)
  }
}
function updateHeadersWidth() {
  const { width } = tableRef.value.getBoundingClientRect()

  tableCopy.value.style.width = width + 'px'
  let tableHeader: any = Array.from(tableRef.value.children).filter(
    (node: any) => node.tagName.toLowerCase() == 'thead'
  )[0]
  let tableBody: any = Array.from(tableRef.value.children).filter(
    (node: any) => node.tagName.toLowerCase() == 'tbody'
  )[0]
  tableCopy.value.appendChild(tableHeader)
  Array.from(tableBody.children[0].children).map((th: any, i) => {
    const { width } = th.getBoundingClientRect()

    tableCopy.value.children[0].children[0].children[i].style.width =
      width + 'px'
  })
}
// 计算有几列
const theadrowRef = ref()
const columnsLength = ref(0)
const tableRef = ref()
const wrapper = ref()
const tableCopy = ref()
onMounted(() => {
  columnsLength.value = theadrowRef.value.children.length
  //将页面原有的table复制一份
  tableCopy.value = tableRef.value.cloneNode(false)
  tableCopy.value.classList.add('emui-table-copy')
  wrapper.value.appendChild(tableCopy.value)
  let tHead = tableRef.value.children[0]
  const { height } = tHead.getBoundingClientRect()
  tableRef.value.style.marginTop = height + 'px'
  updateHeadersWidth()
  const onWindowResize = () => updateHeadersWidth()
  window.addEventListener('resize', onWindowResize) //监听页面宽度发生变化，随时调整tableheader宽度
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'emui-table'
})
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
