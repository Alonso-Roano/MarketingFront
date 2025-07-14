<template>
  <nav class="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-sm border-b border-neutral-800">
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

        <!-- Usuario con dropdown -->
  <div v-if="isLoggedIn" class="relative" ref="dropdownRef">
  <button
    @click="toggleDropdown"
    class="flex items-center space-x-2 text-white py-2 px-3 rounded-md hover:bg-white/10 transition-colors duration-200"
  >
    <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
      <span class="text-white text-sm font-semibold">
        {{ userInitials }}
      </span>
    </div>
    <span class="text-sm font-medium">{{ userEmail }}</span>
    <svg 
      class="w-4 h-4 transition-transform duration-200" 
      :class="{ 'rotate-180': isDropdownOpen }"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div
    v-if="isDropdownOpen"
    class="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-neutral-700 rounded-lg shadow-xl z-50"
  >
    <div class="py-2">
      <div class="px-4 py-2 border-b border-neutral-700">
        <p class="text-sm font-medium text-white">{{ userEmail }}</p>
        <p class="text-xs text-white/70">Usuario</p>
      </div>

      <button @click="handleProfileClick" class="w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors duration-200">
        Mi perfil
      </button>
      <button @click="handleSettingsClick" class="w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors duration-200">
        Configuración
      </button>
      <button @click="handleDashboardClick" class="w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors duration-200">
        Dashboard
      </button>

      <div class="border-t border-neutral-700 mt-2 pt-2">
        <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200">
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/auth/stores/authStore'
import Logo from '/logo.webp'

// 📌 ROUTER y AUTENTICACIÓN
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isLoggedIn = computed(() => !!authStore.user && !!authStore.accessToken)
const userEmail = computed(() => authStore.user?.email || '')
const userInitials = computed(() => userEmail.value.charAt(0).toUpperCase())

// 📌 Dropdown personalizado
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const closeDropdown = () => {
  isDropdownOpen.value = false
}
const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleProfileClick = () => {
  closeDropdown()
  router.push('/profile')
}
const handleSettingsClick = () => {
  closeDropdown()
  router.push('/settings')
}
const handleDashboardClick = () => {
  closeDropdown()
  router.push('/dashboard')
}
const handleLogout = async () => {
  closeDropdown()
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

// 📌 Tabs animadas
const tabs = [
  { label: 'Dashboard', route: '/dashboard', icon: 'pi pi-home', match: (path: string) => path === '/dashboard' },
  { label: 'Campañas', route: '/campaign', icon: 'pi pi-megaphone', match: (path: string) => path === '/campaign' }
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
watch(() => route.path, () => {
  updateSlider()
})
</script>


<style scoped>
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
