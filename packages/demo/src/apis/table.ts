import { request } from '@devexps/request'

export function getTableData() {
  return request.post({ url: '/demo/table' })
}
