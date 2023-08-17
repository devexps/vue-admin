import { ref, unref } from 'vue'
import { DevexpsTableProps } from '../type'
import { error } from '#/index'

export interface tableMethod {
  reload: () => void
  setProps: (props: DevexpsTableProps) => void
}

export function useTable(props: DevexpsTableProps): [Function, tableMethod] {
  const tableRef = ref<Nullable<tableMethod>>(null)

  function register(instance) {
    tableRef.value = instance
    props && instance.setProps(props)
  }
  function getInstance(): tableMethod {
    const table = unref(tableRef)
    if (!table) {
      error('table instance does not exist')
    }
    return table as tableMethod
  }
  const methods: tableMethod = {
    reload: () => getInstance().reload(),
    setProps: (props) => getInstance().setProps(props),
  }
  return [register, methods]
}
