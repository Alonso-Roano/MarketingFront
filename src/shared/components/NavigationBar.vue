<template>
  <nav class="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="uppercase tracking-widest cursor-pointer font-sans text-xl font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 text-transparent bg-clip-text">
            NIUX
          </router-link>
        </div>
        
        <div v-if="showNavLinks" class="hidden md:block">
          <div class="ml-10 flex items-center space-x-8">
            <router-link to="/" class="text-gray-300 hover:text-white px-3 py-2 text-sm rounded-md font-medium transition-colors duration-200">Home</router-link>
            <a href="#features" class="text-gray-300 px-3 py-2 text-sm rounded-md font-medium transition-colors duration-200">Features</a>
            <a href="#testimonials" class="text-gray-300 hover:text-white px-3 py-2 text-sm rounded-md font-medium transition-colors duration-200">Testimonials</a>
            <router-link to="/contact" class="text-gray-300 hover:text-white px-3 py-2 text-sm rounded-md font-medium transition-colors duration-200">Contact</router-link>
          </div>
        </div>

        <div v-else class="flex items-center space-x-6">
          <router-link to="/" class="text-white py-2 relative rounded-md group text-sm font-medium transition-colors duration-200">
            Volver al inicio
            <span class="absolute block bottom-1 w-0 group-hover:w-full bg-white/90 rounded-full z-[-1] h-[2px] transition-all duration-200 ease-in-out"></span>
          </router-link>
        </div>
        
        <div class="flex items-center space-x-6">
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="text-white py-2 relative rounded-md group text-sm font-medium transition-colors duration-200">
              Iniciar sesión
              <span class="absolute block bottom-1 w-0 group-hover:w-full bg-white/90 rounded-full z-[-1] h-[2px] transition-all duration-200 ease-in-out"></span>
            </router-link>
            <router-link to="/register" class="py-2 text-white relative text-sm font-medium group">
              Registrarse
              <span class="absolute block bottom-1 w-0 group-hover:w-full bg-white/90 rounded-full z-[-1] h-[2px] transition-all duration-200 ease-in-out"></span>
            </router-link>
          </template>
          
          <!-- Logged In -->
          <template v-else>
            <div class="relative" ref="dropdownRef">
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div
                v-if="isDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-neutral-700 rounded-lg shadow-xl z-50"
              >
                <div class="py-2">
                  <div class="px-4 py-2 border-b border-neutral-700">
                    <p class="text-sm font-medium text-white">{{ userEmail }}</p>
                    <p class="text-xs text-white/70">Usuario</p>
                  </div>
                  
                  <button
                    @click="handleProfileClick"
                    class="w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors duration-200"
                  >
                    Mi perfil
                  </button>
                  
                  <button
                    @click="handleSettingsClick"
                    class="w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors duration-200"
                  >
                    Configuración
                  </button>
                  
                  <button
                    @click="handleDashboardClick"
                    class="w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                  
                  <div class="border-t border-neutral-700 mt-2 pt-2">
                    <button
                      @click="handleLogout"
                      class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/auth/stores/authStore'
import type { PropsNavbar } from '@/shared/interfaces'

const props = withDefaults(defineProps<PropsNavbar>(), {
  showNavLinks: true
})

const router = useRouter()
const authStore = useAuthStore()

const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const isLoggedIn = computed(() => !!authStore.user && !!authStore.accessToken)
const userEmail = computed(() => authStore.user?.email || '')
const userInitials = computed(() => {
  if (!authStore.user?.email) return ''
  return authStore.user.email.charAt(0).toUpperCase()
})

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

const handleProfileClick = () => {
  closeDropdown()
  router.push('/profile')
}

const handleSettingsClick = () => {
  closeDropdown()
}

const handleDashboardClick = () => {
  closeDropdown()
}

const handleLogout = async () => {
  closeDropdown()
  try {
    await authStore.logout()
    router.push('/')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 