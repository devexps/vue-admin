import { DevexpsColumns } from '../../../devexpsCmps/src/table'

export interface Data {
  table: {
    items: any[]
    total: number
  }
}
export const baseColumns: DevexpsColumns = [
  {
    field: 'userId',
    title: 'id',
    align: 'center',
    width: '10%',
  },
  {
    field: 'username',
    title: 'User Name',
    width: '10%',
  },
  {
    field: 'realname',
    title: 'Real Name',
    width: '10%',
  },
  {
    field: 'address',
    title: 'Address',
    width: '10%',
  },
  {
    field: 'startTime',
    title: 'Start Time',
    align: 'center',
    width: '10%',
  },
  {
    field: 'endTime',
    title: 'End Time',
    align: 'center',
    width: '10%',
  },
  {
    field: 'desc',
    title: 'Description',
    align: 'center',
    width: '40%',
  },
]
export const fixedColumns: DevexpsColumns = [
  { field: 'userId', title: 'id', width: 100, fixed: 'left' },
  { field: 'username', title: 'userName', width: 120, fixed: 'left' },
  { field: 'realname', title: 'realName', width: 280 },
  { field: 'address', title: 'address', width: 280 },
  { field: 'startTime', title: 'startTime', width: 280 },
  { field: 'endTime', title: 'endTime', width: 280 },
  {
    field: 'desc',
    title: 'desc',
    width: 280,
    fixed: 'right',
  },
]

export const innerLabels: string[] = [
  'userId',
  'username',
  'realname',
  'address',
  'startTime',
  'endTime',
  'desc',
]

export const innerColumns: DevexpsColumns = [
  { field: 'label', title: 'label' },
  { field: 'value', title: 'value' },
]
