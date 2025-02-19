export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/page/auth/LoginPage.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/page/auth/ProfilePage.vue'),
  },
]
