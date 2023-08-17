const Page: RouteRecordItem = {
  path: '/pageTest',
  name: 'PageTest',
  component: () => import('@/pages/demo/page/index.vue'),
  meta: {
    orderNo: 4,
    title: 'Unframed page',
    icon: 'tabler:frame-off',
    hideTab: true,
    root: true,
  },
}

export default Page
