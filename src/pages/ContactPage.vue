<template>
  <main class="bg-black">
    <NavigationBar />

    <section class="relative flex h-[500px] w-full flex-col items-center justify-center pt-16">
      <FallingStarsBg class="bg-black" />
      
      <div class="z-[2] flex flex-col items-center gap-8 max-w-6xl mx-auto px-4">
        <BlurReveal :delay="0.2" class="flex flex-col items-center justify-center gap-6">
          <span class="flex flex-col items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl">
            <span>Conectemos</span>
            <FlipWords :words="['ideas', 'proyectos', 'objetivos']" :duration="3000" class="text-purple-400 opacity-95" />
          </span> 
          
          <span class="text-center block text-xl text-white/90 tracking-wider  max-w-2xl">
            Estamos aquí para ayudarte a llevar tu negocio al siguiente nivel. Hablemos sobre cómo <strong>NIUX</strong> puede transformar tu estrategia de marketing.
          </span>
        </BlurReveal>
      </div>
    </section>

    <section class="relative py-20 bg-black">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent mb-4">
            ¿Listo para comenzar?
          </h2>
          <p class="text-white/70 text-lg">
            Completa el formulario y nos pondremos en contacto contigo
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="space-y-8">
            <div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8">
              <h3 class="text-2xl font-semibold text-white mb-6">Información de contacto</h3>
              
              <div class="space-y-6">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-semibold">Email</h4>
                    <p class="text-white/70">contacto@niux.com</p>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-semibold">Teléfono</h4>
                    <p class="text-white/70">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-white font-semibold">Horario</h4>
                    <p class="text-white/70">Lun - Vie: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 text-center">
              <h3 class="text-xl font-semibold text-white mb-4">¿Prefieres una llamada?</h3>
              <p class="text-white/70 mb-6">Agenda una consulta gratuita de 30 minutos</p>
              <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                Agendar llamada
              </button>
            </div>
          </div>

          <div class="bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div v-if="isSuccess" class="p-4 bg-green-500/20 border border-green-500/30 rounded-lg mb-6">
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <p class="text-green-400 font-medium">¡Mensaje enviado exitosamente!</p>
                </div>
                <p class="text-green-400/70 text-sm mt-1">Te responderemos en las próximas 24 horas.</p>
              </div>

              <div v-if="error" class="p-4 bg-red-500/20 border border-red-500/30 rounded-lg mb-6">
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  <p class="text-red-400 font-medium">Error</p>
                </div>
                <p class="text-red-400/70 text-sm mt-1">{{ error }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-white/90 mb-2">Nombre *</label>
                  <input
                    v-model="formData.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-black/50 border border-neutral-600 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-200"
                    placeholder="Juan"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white/90 mb-2">Apellido *</label>
                  <input
                    v-model="formData.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-black/50 border border-neutral-600 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-200"
                    placeholder="Pérez"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-white/90 mb-2">Email *</label>
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-black/50 border border-neutral-600 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-200"
                  placeholder="juan@empresa.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-white/90 mb-2">Empresa</label>
                <input
                  v-model="formData.company"
                  type="text"
                  class="w-full px-4 py-3 bg-black/50 border border-neutral-600 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-200"
                  placeholder="Mi Empresa S.A."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-white/90 mb-2">¿Cómo podemos ayudarte? *</label>
                <select
                  v-model="formData.service"
                  required
                  class="w-full px-4 py-3 bg-black/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-200"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="marketing-digital">Marketing Digital</option>
                  <option value="diseno-web">Diseño Web</option>
                  <option value="seo">SEO y Posicionamiento</option>
                  <option value="social-media">Social Media</option>
                  <option value="consultoria">Consultoría</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-white/90 mb-2">Mensaje *</label>
                <textarea
                  v-model="formData.message"
                  rows="4"
                  required
                  class="w-full px-4 py-3 bg-black/50 border border-neutral-600 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-200 resize-none"
                  placeholder="Cuéntanos más sobre tu proyecto..."
                />
              </div>

              <div class="flex justify-center">
                <div ref="recaptchaContainer" class="transform scale-90 origin-center"></div>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting || !isRecaptchaVerified"
                class="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando mensaje...
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Enviar mensaje
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavigationBar from '@/shared/components/NavigationBar.vue'
import FallingStarsBg from '@/shared/components/ui/bg-falling-stars/FallingStarsBg.vue'
import BlurReveal from '@/shared/components/ui/blur-reveal/BlurReveal.vue'
import FlipWords from '@/shared/components/ui/flip-words/FlipWords.vue'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  service: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)
const error = ref('')
const isRecaptchaVerified = ref(false)
const recaptchaContainer = ref<HTMLElement | null>(null)

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
let recaptchaWidget: number | null = null

const loadRecaptcha = () => {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve(window.grecaptcha)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      window.onRecaptchaLoad = () => {
        resolve(window.grecaptcha)
      }
    }
    
    script.onerror = () => {
      reject(new Error('Failed to load reCAPTCHA'))
    }
    
    document.head.appendChild(script)
  })
}

const initRecaptcha = async () => {
  try {
    await loadRecaptcha()
    
    if (recaptchaContainer.value && window.grecaptcha) {
      recaptchaWidget = window.grecaptcha.render(recaptchaContainer.value, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (response: string) => {
          if (response) {
            isRecaptchaVerified.value = true
            error.value = ''
          }
        },
        'expired-callback': () => {
          isRecaptchaVerified.value = false
        },
        'error-callback': () => {
          isRecaptchaVerified.value = false
          error.value = 'Error al cargar reCAPTCHA. Por favor, recarga la página.'
        }
      })
    }
  } catch (err) {
    console.error('Error loading reCAPTCHA:', err)
    error.value = 'Error al cargar reCAPTCHA. Por favor, recarga la página.'
  }
}

const handleSubmit = async () => {
  if (!isRecaptchaVerified.value) {
    error.value = 'Por favor, completa la verificación reCAPTCHA'
    return
  }

  isSubmitting.value = true
  error.value = ''
  isSuccess.value = false

  try {
    window.grecaptcha.getResponse(recaptchaWidget)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    isSuccess.value = true
    formData.value = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      service: '',
      message: ''
    }
    
    if (window.grecaptcha && recaptchaWidget !== null) {
      window.grecaptcha.reset(recaptchaWidget)
      isRecaptchaVerified.value = false
    }
    
  } catch (err) {
    console.error('Error sending message:', err)
    error.value = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  initRecaptcha()
})

onUnmounted(() => {
  if (recaptchaWidget !== null && window.grecaptcha) {
    window.grecaptcha.reset(recaptchaWidget)
  }
})

declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoad: () => void
  }
}
</script> 