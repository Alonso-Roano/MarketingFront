<template>
  <main class="bg-black min-h-screen">
    <NavigationBar :show-nav-links="false" />

    <section class="relative flex min-h-screen w-full flex-col items-center justify-center pt-16">
      <FallingStarsBg class="bg-black" />
      
      <div class="z-[2] w-full max-w-md mx-auto px-6">
        <BlurReveal :delay="0.3" class="w-full">
          <div class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent mb-2">
                Iniciar Sesión
              </h1>
              <p class="text-white/70 text-sm">
                Accede a tu cuenta de <span class="text-purple-400 font-semibold">NIUX</span>
              </p>
            </div>

            <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p class="text-red-400 text-sm">{{ error }}</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-white/90 mb-2">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-white/90 mb-2">
                  Contraseña
                </label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="w-4 h-4 text-purple-400 bg-neutral-900 border-neutral-700 rounded focus:ring-purple-400 focus:ring-2"
                  />
                  <span class="ml-2 text-sm text-white/70">Recordarme</span>
                </label>
                <a href="#" class="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando sesión...
                </span>
                <span v-else>Iniciar Sesión</span>
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-white/70 text-sm">
                ¿No tienes una cuenta?
                <router-link to="/register" class="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200">
                  Regístrate aquí
                </router-link>
              </p>
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/auth/stores/authStore'
import NavigationBar from '@/shared/components/NavigationBar.vue'
import FallingStarsBg from '@/shared/components/ui/bg-falling-stars/FallingStarsBg.vue'
import BlurReveal from '@/shared/components/ui/blur-reveal/BlurReveal.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    await authStore.login(email.value, password.value)
    
    router.push('/')
  } catch (err: any) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    isLoading.value = false
  }
}
</script>
