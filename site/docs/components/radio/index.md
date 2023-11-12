## raido

### 基础用法
<br>
<emui-radio label="上海" v-model:modelValue="value"></emui-radio>
<emui-radio label="北京" v-model:modelValue="value"></emui-radio>

<script lang='ts' setup>
    import { ref} from 'vue'
    let value=ref(false)
    let value1=ref(false)
    let value2=ref(false)
</script>

::: details 显示代码

```html
<emui-radio label="上海" v-model:modelValue="value"></emui-radio>
<emui-radio label="北京" v-model:modelValue="value"></emui-radio>
<script lang="ts" setup>
  import { ref } from 'vue'
  let value = ref(false)
</script>
```

:::

### 禁用状态
<br>

<emui-radio label='上海' disabled></emui-radio>
::: details 显示代码

```html
<emui-radio label="上海" disabled></emui-radio>
```

:::

### 单选组
<br>
<emui-radio-group v-model:modelValue="value1">
<emui-radio label="上海"></emui-radio>
<emui-radio label="北京"></emui-radio>
</emui-radio-group>

::: details 显示代码

```html
<emui-radio-group v-model:modelValue="value">
  <emui-radio label="上海"></emui-radio>
  <emui-radio label="北京"></emui-radio>
</emui-radio-group>
<script lang="ts" setup>
  import { ref } from 'vue'
  let value = ref(false)
</script>
```

:::

### 单选按钮
<br>
<emui-radio-group v-model:modelValue="value2">
<emui-radio-button label="上海"></emui-radio-button>
<emui-radio-button label="北京"></emui-radio-button>
</emui-radio-group>

::: details 显示代码
```html
<emui-radio-group v-model:modelValue="value1">
<emui-radio-button label="上海"></emui-radio-button>
<emui-radio-button label="北京"></emui-radio-button>
</emui-radio-group>
<script lang="ts" setup>
  import { ref } from 'vue'
  let value = ref(false)
</script>
```
:::
