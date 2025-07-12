import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@pages/HomePage.vue";
import AboutPage from "@pages/AboutPage.vue";
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
