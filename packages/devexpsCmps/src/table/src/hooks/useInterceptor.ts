import VXETable from 'vxe-table-demonic'
export const useInterceptor = () => {
  VXETable.interceptor.add('event.clearActived', (params) => {
    const keyword = ['n-date', 'n-time', 'n-select']
    for (const path of params.$event.path) {
      for (const key of keyword) {
        if (path.className && path.className.indexOf(key) > -1) {
          return false
        }
      }
    }
    // console.log(params.$event.path)
    return true
  })
  // console.log('interceptor complete')
}
