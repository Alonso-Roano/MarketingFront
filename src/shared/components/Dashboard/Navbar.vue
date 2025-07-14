<template>
  <nav class="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer">
          <img :src="Logo" alt="Logo" class="size-[25px] object-contain rounded-full opacity-95" />
          <span class="uppercase tracking-widest font-sans text-xl font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 text-transparent bg-clip-text">
            NIUX
          </span>
        </div>

        <!-- Tabs con barra animada -->
        <div ref="tabBarRef" class="relative hidden md:flex items-center space-x-8">
          <router-link
            v-for="(tab, i) in tabs"
            :key="tab.route"
            :to="tab.route"
            class="relative inline-block px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="tab.match(route.path) ? 'text-white' : 'text-gray-400 hover:text-white'"
            :ref="el => {
              if (el) tabRefs[i] = el as HTMLElement
            }"
          >
            <span class="flex items-center gap-2">
              <span :class="tab.icon" class="text-base" />
              {{ tab.label }}
            </span>
          </router-link>

          <!-- Barra deslizante con animación direccional -->
          <span
            class="absolute bottom-0 h-[2px] bg-white rounded-full"
            :style="{
              transform: `translateX(${sliderX}px)`,
              width: sliderWidth + 'px',
              transition: `transform 300ms ${transitionDirection}, width 300ms ease`
            }"
          />
        </div>

        <!-- Usuario -->
        <div class="flex items-center space-x-4">
          <span class="text-sm text-white/80 hidden sm:inline">Hola, {{ username }}</span>
          <img
            src="@/assets/images/profile.png"
            class="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
            @click="toggleUserMenu"
          />
          <Menu :model="userMenu" :popup="true" ref="menuRef" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Menu from 'primevue/menu'
import Logo from '/logo.webp'
import 'primeicons/primeicons.css'

const username = 'Andrés García'
const menuRef = ref()
const route = useRoute()
const router = useRouter()

const toggleUserMenu = (event: Event) => {
  menuRef.value?.toggle(event)
}

const tabs = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: 'pi pi-home',
    match: (path: string) => path === '/dashboard'
  },
  {
    label: 'Campañas',
    route: '/campaign',
    icon: 'pi pi-megaphone',
    match: (path: string) => path === '/campaign'
  }
]

const userMenu = [
  { label: 'Perfil', icon: 'pi pi-user', command: () => router.push('/profile') },
  { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => router.push('/login') }
]

const tabBarRef = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLElement[]>([])
const sliderX = ref(0)
const sliderWidth = ref(0)
const previousIndex = ref<number | null>(null)
const transitionDirection = ref('ease-in-out')

const updateSlider = () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      const currentIndex = tabs.findIndex(tab => tab.match(route.path))
      const el = tabRefs.value[currentIndex]

      if (el) {
        if (previousIndex.value !== null) {
          transitionDirection.value = currentIndex > previousIndex.value ? 'ease-in' : 'ease-out'
        }
        sliderX.value = el.offsetLeft
        sliderWidth.value = el.offsetWidth
        previousIndex.value = currentIndex
      }
    })
  })
}

onMounted(() => {
  updateSlider()
})

watch(
  () => route.path,
  () => {
    updateSlider()
  }
)
</script>

<style scoped>
/* Fallback efecto de subrayado (por si algo falla con JS) */
.router-link-active::after,
.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: white;
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}
</style>
