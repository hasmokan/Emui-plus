import { ref } from 'vue'
import type { formItem } from '../../components'
// 用于保存formItem子项
const fields: any = ref([])
export function formItemAdd(field: formItem) {
  if (field) fields.value.push(field)
}
export function formItemRemove(field: formItem) {
  if (field) fields.value.splice(fields.value.indexOf(field), 1)
}
export function resetFields() {
  fields.value.forEach((field: formItem) => field.resetField())
}
export function validate(cb: any) {
  return new Promise((resolve) => {
    let valid = true,
      count = 0
    fields.value.forEach((field: formItem) => {
      field.validate('', (error: any) => {
        if (error) valid = false
        if (++count === fields.value.length) {
          resolve(valid)
          if (typeof cb === 'function') cb(valid)
        }
      })
    })
  })
}
