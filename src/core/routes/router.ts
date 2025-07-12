import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@pages/HomePage.vue";
import AboutPage from "@pages/AboutPage.vue";
import LandingPAge from '@/landing/pages/LandingPage.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => HomePage,
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
