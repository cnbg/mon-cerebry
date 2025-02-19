import { createRouter, createWebHistory } from 'vue-router'

import homeRoutes from './home'
import authRoutes from './auth'
import errorRoutes from './error'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...homeRoutes,
    ...authRoutes,
    ...errorRoutes,
  ],
})

router.beforeEach((to) => {})

export default router
