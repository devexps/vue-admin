import type { VxeGridProps, VxeTableEvents } from 'vxe-table-demonic'
import { VxeGridPropTypes } from 'vxe-table-demonic'

export type DevexpsTableProps<D = any> = VxeGridProps<D> & {
  api?: Function
  params?: Object
  title?: string
  pagination?: boolean | VxeGridPropTypes.PagerConfig
  afterFetch?: Function
}
export type DevexpsColumns = VxeGridPropTypes.Columns

export type DevexpsCellClick = VxeTableEvents.CellClick
