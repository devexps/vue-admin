import { LAYOUT } from '@devexps/router'

const test: RouteRecordItem = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/test',
  meta: {
    orderNo: 1,
    icon: 'ph:code-bold',
    title: 'Test',
    root: true,
  },
  children: [
    {
      path: 'test',
      name: 'ttest',
      component: () => import('@/pages/test/test.vue'),
      meta: {
        icon: 'mdi:monitor-dashboard',
        title: 'Test',
        collapsedShowTitle: true,
      },
    },
  ],
}

export default test
