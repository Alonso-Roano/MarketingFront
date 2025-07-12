import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from "@pages/AboutPage.vue";
import LandingPAge from '@/landing/pages/LandingPage.vue';
import MainPage from "@pages/MainPage.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => MainPage,
  },
  {
    path: '/about',
    name: 'About',
    component: () => AboutPage,
  },
  {
    path: '/landing/:id',
    name: 'LandingPage',
    component: ()=> LandingPAge,
    props: true
  },
  {
    path: '/landing',
    name: 'Landing',
    component:  MainPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
