import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: () => import('@/pages/Drivers/DriverIndex.vue'),
    },
  ],
})

export default router
