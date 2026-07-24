import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import JaxVoid from '@/views/Jax-void.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/jax-void',
      name: 'jax-void',
      component: JaxVoid,
    },
  ],
})

export default router
