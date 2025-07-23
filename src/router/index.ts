import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout.vue'
import { authGuard } from './guards/authGuard'
import { usernameGuard } from './guards/usernameGuard'

const router = createRouter({
  history: createWebHistory('/OsrsTodo/'),
  routes: [
    {
      path: '/',
      component: AuthenticatedLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/monthly-stats',
          name: 'Monthly Stats',
          component: () => import('@/views/monthlyStats/MonthlyStats.vue'),
          meta: { requiresAuth: false, requiresUsername: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgottenPasswordView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

router.beforeEach(authGuard)
router.beforeEach(usernameGuard)

export default router
