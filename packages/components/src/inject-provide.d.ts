import type { Ref } from 'vue'

export type removeTagtype = {
  removeTag: (value: string) => void
}

interface optionsType {
  label: string
  value: string
}
export type selectType = {
  options: Ref<optionsType[]>
  curLabel: Ref<string>
  curValue: Ref<string>
  showOption: () => void
}
