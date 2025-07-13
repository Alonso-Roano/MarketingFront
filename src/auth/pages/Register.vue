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
                Crear Cuenta
              </h1>
              <p class="text-white/70 text-sm">
                Únete a la revolución de <span class="text-purple-400 font-semibold">NIUX</span>
              </p>
            </div>

            <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p class="text-red-400 text-sm">{{ error }}</p>
            </div>

            <div v-if="success" class="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p class="text-green-400 text-sm">{{ success }}</p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-white/90 mb-2">
                  Nombre completo
                </label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="Tu nombre completo"
                />
              </div>

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
                <p class="text-xs text-white/50 mt-1">
                  Mínimo 8 caracteres, incluye mayúsculas, minúsculas y números
                </p>
              </div>

              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-white/90 mb-2">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <div class="flex items-start">
                <input
                  id="terms"
                  v-model="acceptTerms"
                  type="checkbox"
                  required
                  class="w-4 h-4 text-purple-400 bg-neutral-900 border-neutral-700 rounded focus:ring-purple-400 focus:ring-2 mt-1"
                />
                <label for="terms" class="ml-2 text-sm text-white/70">
                  Acepto los 
                  <a href="#" class="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                    términos y condiciones
                  </a>
                  y la
                  <a href="#" class="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                    política de privacidad
                  </a>
                </label>
              </div>

              <button
                type="submit"
                :disabled="isLoading || !isFormValid"
                class="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando cuenta...
                </span>
                <span v-else>Crear Cuenta</span>
              </button>
            </form>

            <div class="mt-6 text-center">
              <p class="text-white/70 text-sm">
                ¿Ya tienes una cuenta?
                <router-link to="/login" class="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200">
                  Inicia sesión aquí
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/auth/stores/authStore'
import NavigationBar from '@/shared/components/NavigationBar.vue'
import FallingStarsBg from '@/shared/components/ui/bg-falling-stars/FallingStarsBg.vue'
import BlurReveal from '@/shared/components/ui/blur-reveal/BlurReveal.vue'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)

const isLoading = ref(false)
const error = ref('')
const success = ref('')

const isFormValid = computed(() => {
  return name.value.trim() !== '' &&
         email.value.trim() !== '' &&
         password.value.length >= 8 &&
         password.value === confirmPassword.value &&
         acceptTerms.value
})

const isPasswordValid = computed(() => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password.value)
})

const handleRegister = async () => {
  error.value = ''
  success.value = ''

  if (!name.value.trim()) {
    error.value = 'Por favor ingresa tu nombre completo'
    return
  }

  if (!email.value.trim()) {
    error.value = 'Por favor ingresa tu correo electrónico'
    return
  }

  if (!isPasswordValid.value) {
    error.value = 'La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  if (!acceptTerms.value) {
    error.value = 'Debes aceptar los términos y condiciones'
    return
  }

  isLoading.value = true

  try {
    await authStore.register(email.value, password.value)
    
    success.value = 'Cuenta creada exitosamente. Redirigiendo...'
    
    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (err: any) {
    error.value = err.message || 'Error al crear la cuenta'
  } finally {
    isLoading.value = false
  }
}
</script>
