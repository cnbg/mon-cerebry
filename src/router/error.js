export default [
  {
    path: '/503',
    name: 'error.503',
    component: () => import('@/page/error/503Page.vue'),
  },
  {
    path: '/:fallback(.*)*',
    name: 'error.404',
    component: () => import('@/page/error/404Page.vue'),
  },
]
