<template>
  <div>
    <div>
      <emui-button>123</emui-button>
      <emui-radio label="上海"></emui-radio>
    </div>
    <div style="margin: 10px 0">
      <emui-upload list-type="picture-card" v-model:fileList="fileList">
        <emui-button>上传</emui-button>
      </emui-upload>
    </div>
    <div>
      <emui-nav v-model:selected="selected">
        <emui-nav-item name="1">首页</emui-nav-item>
        <emui-nav-item name="2">测试</emui-nav-item>
        <emui-nav-item name="3">按钮</emui-nav-item>
        <emui-sub-nav>
          <template v-slot:title> 关于 </template>
          <emui-nav-item name="4">企业文化</emui-nav-item>
          <emui-nav-item name="5">开发团队</emui-nav-item>
          <emui-sub-nav>
            <template v-slot:title> 联系方式 </template>
            <emui-nav-item name="6">电话</emui-nav-item>
            <emui-nav-item name="7">QQ</emui-nav-item>
            <emui-nav-item name="8">微信</emui-nav-item>
          </emui-sub-nav>
        </emui-sub-nav>
      </emui-nav>
    </div>
    <div style="width: 150px; margin-top: 50px">
      <emui-nav v-model:selected="selected" vertical>
        <emui-nav-item name="1">首页</emui-nav-item>
        <emui-nav-item name="2">测试</emui-nav-item>
        <emui-nav-item name="3">按钮</emui-nav-item>
        <emui-sub-nav>
          <template v-slot:title> 关于 </template>
          <emui-nav-item name="4">企业文化</emui-nav-item>
          <emui-nav-item name="5">开发团队</emui-nav-item>
          <emui-sub-nav>
            <template v-slot:title> 联系方式 </template>
            <emui-nav-item name="6">电话</emui-nav-item>
            <emui-nav-item name="7">QQ</emui-nav-item>
            <emui-nav-item name="8">微信</emui-nav-item>
          </emui-sub-nav>
        </emui-sub-nav>
      </emui-nav>
    </div>
    <div style="margin: 20px 0">
      <emui-dropdown hide-on-click split-button>
        <span>DropDown-list</span>
        <template v-slot:dropdown>
          <emui-dropdown-menu>
            <emui-dropdown-item>Action 1</emui-dropdown-item>
            <emui-dropdown-item>Action 2</emui-dropdown-item>
            <emui-dropdown-item>Action 3</emui-dropdown-item>
            <emui-dropdown-item>Action 4</emui-dropdown-item>
          </emui-dropdown-menu>
        </template>
      </emui-dropdown>
    </div>
    <div>
      <emui-icon name="eye" color="red"></emui-icon>
      <emui-icon name="close"></emui-icon>
      <emui-icon name="no_eye"></emui-icon>
      <emui-icon name="arrow-up-bold" color="red"></emui-icon>
      <emui-icon name="arrow-down-bold" color="red"></emui-icon>
      <emui-icon name="sort-down" color="red"></emui-icon>
      <emui-icon name="Shapex"></emui-icon>
      <emui-icon name="arrow-left-bold" color="red"></emui-icon>
    </div>

    <div>
      <emui-form :model="activity" :rules="rules" ref="form">
        <emui-form-item label="活动名称" prop="name">
          <emui-input v-model="activity.name"></emui-input>
        </emui-form-item>
        <emui-form-item label="活动地点" prop="address">
          <emui-radio-group v-model="activity.address">
            <emui-radio label="上海"></emui-radio>
            <emui-radio label="北京"></emui-radio>
          </emui-radio-group>
        </emui-form-item>
        <emui-form-item label="活动方式" prop="way">
          <emui-radio-group v-model="activity.way">
            <emui-radio-button label="组队"></emui-radio-button>
            <emui-radio-button label="个人"></emui-radio-button>
          </emui-radio-group>
        </emui-form-item>
        <emui-form-item label="活动性质" prop="datalist">
          <emui-checkbox-group v-model="activity.datalist">
            <emui-checkbox label="品牌推广"></emui-checkbox>
            <emui-checkbox label="形象普及"></emui-checkbox>
          </emui-checkbox-group>
        </emui-form-item>
        <emui-form-item label="请选择" prop="myValue">
          <emui-select v-model="activity.myValue" placeholder="请选择">
            <emui-option
              v-for="item in options"
              :label="item.label"
              :value="item.key"
              :key="item.key"
            ></emui-option>
          </emui-select>
        </emui-form-item>
        <emui-form-item>
          <emui-button @click="handleSubmit">提交</emui-button>
          <emui-button @click="handleReset">重置</emui-button>
        </emui-form-item>
      </emui-form>
    </div>
    <div>
      <emui-tag closable>标签1</emui-tag>
      <emui-tag type="success">标签2</emui-tag>
      <emui-tag type="info">标签3</emui-tag>
      <emui-tag type="warning">标签4</emui-tag>
      <emui-tag type="danger">标签5</emui-tag>
    </div>
    <div>
      <emui-tag-list v-model="datalist"></emui-tag-list>
    </div>
    <div>
      <emui-button @click="handlerMessage">消息提示</emui-button>
      <emui-button @click="handlerMessage">消息提示</emui-button>
    </div>
    <div class="layout">
      <emui-row :gutter="20">
        <emui-col :span="8"><div class="bg-blue"></div></emui-col>
        <emui-col :span="8"><div class="bg-blue"></div></emui-col>
        <emui-col :span="8"><div class="bg-blue"></div></emui-col>
      </emui-row>
      <emui-row :gutter="20" type="flex">
        <emui-col :span="4"><div class="bg-blue"></div></emui-col>
        <emui-col :span="8"><div class="bg-blue"></div></emui-col>
        <emui-col :span="12"><div class="bg-blue"></div></emui-col>
      </emui-row>
      <emui-row :gutter="20" type="flex">
        <emui-col :span="4"><div class="bg-blue"></div></emui-col>
        <emui-col :span="16"><div class="bg-blue"></div></emui-col>
        <emui-col :span="4"><div class="bg-blue"></div></emui-col>
      </emui-row>
    </div>
    <div>
      <emui-button @click="visiable = true">消息弹框</emui-button>
      <emui-dialog v-model:visiable="visiable">
        <template v-slot:content>
          <div>消息提示</div>
        </template>
        <template v-slot:footer>
          <emui-button>确认</emui-button>
          <emui-button>取消</emui-button>
        </template>
      </emui-dialog>
    </div>
    <div>
      <emui-table
        :data="dataSource"
        :columns="columns"
        v-model:orderBy="orderBy"
        v-model:selectedItems="selectedItems"
        expend-filed="description"
        height="300"
        bordered
        striped
        numberVisible
        selected
      ></emui-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { message } from '@emui/components'
const datalist = ref(['标签1', '标签2', '标签3'])
const selected = ref('')
const fileList = ref([])
let visiable = ref(false)
let options = reactive([
  { key: 'key1', label: '选项1' },
  { key: 'key2', label: '选项2' },
  { key: 'key3', label: '选项3' },
  { key: 'key4', label: '选项4' },
  { key: 'key5', label: '选项5' },
  { key: 'key6', label: '选项6' },
  { key: 'key7', label: '选项7' }
])
let activity = reactive({
  datalist: [],
  name: '',
  address: '',
  way: '',
  myValue: ''
})
let rules = reactive({
  name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  address: [{ required: true, message: '不能为空', trigger: 'change' }],
  way: [{ required: true, message: '不能为空', trigger: 'change' }],
  datalist: [
    {
      type: 'array',
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  myValue: [{ required: true, message: '至少选择一项' }]
})

const form = ref()
function handleSubmit() {
  form.value.validate((valid) => {
    if (valid) console.log('提交成功')
    else console.log('校验失败')
  })
}
function handleReset() {
  form.value.resetFields()
}

const selectedItems = ref([])
const columns = ref([
  { text: '姓名', filed: 'name', width: 300 },
  { text: '分数', filed: 'score', width: 300 }
])
const dataSource = reactive([
  { id: 1, name: 'lili', score: 100, description: 'score is ok' },
  { id: 2, name: 'bobo', score: 100, description: 'score is ok' },
  { id: 3, name: 'siry', score: 100 },
  { id: 4, name: 'laoliu', score: 100 },
  { id: 5, name: 'laoliu', score: 100 },
  { id: 6, name: 'laoliu', score: 100 },
  { id: 7, name: 'laoliu', score: 100 },
  { id: 8, name: 'laoliu', score: 100 },
  { id: 9, name: 'laoliu', score: 100 },
  { id: 10, name: 'laoliu', score: 100 },
  { id: 11, name: 'laoliu', score: 100 },
  { id: 12, name: 'laoliu', score: 100 },
  { id: 13, name: 'laoliu', score: 100 }
])
const orderBy = reactive({
  name: 'asc', //升序
  score: 'desc' //降序
})
function handlerMessage() {
  message.warning('消息提示')
}
</script>

<style lang="less" scoped>
.layout {
  width: 400px;
}
.bg-blue {
  background-color: lightblue;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  border-radius: 5px;
}
</style>
