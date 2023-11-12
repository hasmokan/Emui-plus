## input

### 基础用法

<emui-input size='small'/>
<emui-input size='default'/>
<emui-input size='large'/>
<emui-input clearable v-model="bindValue.value"/>
<script lang='ts' setup>
     import { reactive } from 'vue'
    let bindValue = reactive({
        value:''
    })
</script>
::: details 显示代码
```html
<emui-input size='small'/>
<emui-input size='default'/>
<emui-input size='large'/>
<emui-input clearable v-model="bindValue.value"/>
<script lang='ts' setup>
    import { reactive } from 'vue'
    let bindValue = reactive({
        value:''
    })
</script>
```
:::
### 不同类型
<emui-input type='textarea'/>
<emui-input type='password' showPasswordIcon/>
::: details 显示代码
```html
<emui-input type='textarea'/>
<emui-input type='password' showPasswordIcon/>
```
:::
