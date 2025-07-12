import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@pages/HomePage.vue";
import AboutPage from "@pages/AboutPage.vue";


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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
