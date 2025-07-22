import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from "@pages/AboutPage.vue";
import LandingPAge from '@/landing/pages/LandingPage.vue';
import MainPage from "@pages/MainPage.vue";
import ProfilePage from "@pages/ProfilePage.vue";
import ContactPage from "@pages/ContactPage.vue";
import Login from '@auth/pages/Login.vue';
import Register from '@auth/pages/Register.vue';
import { useAuthStore } from '@/auth/stores/authStore';
import Dashboard from '@/client/pages/Dashboard.vue';
import Campaign from '@/client/pages/Campaign.vue';
import DashboardLayout from '@/client/pages/DashboardLayout.vue';
import PredictionToolPage from '@/client/pages/PredictionToolPage.vue';
//@ts-ignore
import Detalles from '@/client/pages/Detalles.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Home',
    component: MainPage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/landing/:id',
    name: 'LandingPage',
    component: LandingPAge,
    props: true
  },
  {
    path: '/landing',
    name: 'Landing',
    component: MainPage,
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'campaign',
        name: 'Campaign',
        component: Campaign
      },
      {
        path: 'form',
        name: 'Form',
        component: PredictionToolPage,
      },
  {
    path: '/details/:id',
    name: 'Details',
    component: Detalles,
    props: true
  },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()

    // Check if user is authenticated
    if (!authStore.user || !authStore.accessToken) {
      // Redirect to login page if not authenticated
      next('/login')
      return
    }
  }

  next()
})

export default router
