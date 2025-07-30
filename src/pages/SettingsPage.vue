<template>
  <main class="bg-black min-h-screen">
    <NavigationBar :show-nav-links="false" />

    <section class="relative min-h-screen w-full pt-16">
      <div class="w-full max-w-4xl mx-auto px-6 py-12">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent mb-4">
            Configuración
          </h1>
          <p class="text-white/70 text-lg">
            Personaliza tu experiencia en <span class="text-purple-400 font-semibold">NIUX</span>
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Sidebar de navegación -->
          <div class="lg:col-span-1">
            <div class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 shadow-2xl sticky top-24">
              <h3 class="text-lg font-semibold text-white mb-6">Ajustes</h3>
              
              <nav class="space-y-2">
                <button 
                  @click="activeSection = 'general'"
                  class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                  :class="activeSection === 'general' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'"
                >
                  <span class="pi pi-cog text-lg"></span>
                  <span>General</span>
                </button>
                
                <button 
                  @click="activeSection = 'notifications'"
                  class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                  :class="activeSection === 'notifications' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'"
                >
                  <span class="pi pi-bell text-lg"></span>
                  <span>Notificaciones</span>
                </button>
                
                <button 
                  @click="activeSection = 'appearance'"
                  class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                  :class="activeSection === 'appearance' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'"
                >
                  <span class="pi pi-palette text-lg"></span>
                  <span>Apariencia</span>
                </button>
                
                <button 
                  @click="activeSection = 'privacy'"
                  class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                  :class="activeSection === 'privacy' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'"
                >
                  <span class="pi pi-shield text-lg"></span>
                  <span>Privacidad</span>
                </button>
                
                <button 
                  @click="activeSection = 'integrations'"
                  class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200"
                  :class="activeSection === 'integrations' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'"
                >
                  <span class="pi pi-link text-lg"></span>
                  <span>Integraciones</span>
                </button>
              </nav>
            </div>
          </div>

          <!-- Contenido principal -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Sección General -->
            <div v-if="activeSection === 'general'" class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
              <h3 class="text-xl font-semibold text-white mb-6">Configuración General</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-white/90 mb-2">
                    Idioma
                  </label>
                  <select 
                    v-model="settings.language"
                    class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-white/90 mb-2">
                    Zona horaria
                  </label>
                  <select 
                    v-model="settings.timezone"
                    class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  >
                    <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Europe/Madrid">Madrid (GMT+1)</option>
                    <option value="Europe/London">London (GMT+0)</option>
                  </select>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-neutral-900/30 rounded-lg">
                  <div>
                    <p class="text-white font-medium">Sesiones activas</p>
                    <p class="text-white/70 text-sm">Administra tus sesiones en diferentes dispositivos</p>
                  </div>
                  <button class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                    Administrar
                  </button>
                </div>
              </div>
            </div>

            <!-- Sección Notificaciones -->
            <div v-if="activeSection === 'notifications'" class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
              <h3 class="text-xl font-semibold text-white mb-6">Preferencias de Notificaciones</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-neutral-900/30 rounded-lg">
                  <div>
                    <p class="text-white font-medium">Notificaciones por correo</p>
                    <p class="text-white/70 text-sm">Recibe actualizaciones importantes por email</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-neutral-900/30 rounded-lg">
                  <div>
                    <p class="text-white font-medium">Notificaciones de campañas</p>
                    <p class="text-white/70 text-sm">Recibe alertas sobre el rendimiento de tus campañas</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.campaignNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-neutral-900/30 rounded-lg">
                  <div>
                    <p class="text-white font-medium">Notificaciones de nuevas funciones</p>
                    <p class="text-white/70 text-sm">Mantente al día con las últimas actualizaciones</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.featureNotifications" class="sr-only peer">
                    <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Sección Apariencia -->
            <div v-if="activeSection === 'appearance'" class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
              <h3 class="text-xl font-semibold text-white mb-6">Personalización de Apariencia</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-white/90 mb-2">
                    Tema
                  </label>
                  <div class="grid grid-cols-3 gap-4">
                    <button 
                      @click="settings.theme = 'dark'"
                      class="aspect-video rounded-lg border-2 transition-all duration-200 flex items-center justify-center"
                      :class="settings.theme === 'dark' ? 'border-purple-500' : 'border-neutral-700 hover:border-neutral-500'"
                    >
                      <div class="w-full h-full bg-neutral-900 rounded-md flex items-center justify-center">
                        <span class="text-white text-xs">Oscuro</span>
                      </div>
                    </button>
                    
                    <button 
                      @click="settings.theme = 'light'"
                      class="aspect-video rounded-lg border-2 transition-all duration-200 flex items-center justify-center"
                      :class="settings.theme === 'light' ? 'border-purple-500' : 'border-neutral-700 hover:border-neutral-500'"
                    >
                      <div class="w-full h-full bg-neutral-200 rounded-md flex items-center justify-center">
                        <span class="text-neutral-900 text-xs">Claro</span>
                      </div>
                    </button>
                    
                    <button 
                      @click="settings.theme = 'system'"
                      class="aspect-video rounded-lg border-2 transition-all duration-200 flex items-center justify-center"
                      :class="settings.theme === 'system' ? 'border-purple-500' : 'border-neutral-700 hover:border-neutral-500'"
                    >
                      <div class="w-full h-full bg-gradient-to-r from-neutral-900 to-neutral-200 rounded-md flex items-center justify-center">
                        <span class="text-white text-xs">Sistema</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-white/90 mb-2">
                    Densidad de contenido
                  </label>
                  <select 
                    v-model="settings.density"
                    class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  >
                    <option value="compact">Compacta</option>
                    <option value="comfortable">Cómoda</option>
                    <option value="spacious">Espaciosa</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-white/90 mb-2">
                    Animaciones
                  </label>
                  <div class="flex items-center justify-between p-4 bg-neutral-900/30 rounded-lg">
                    <p class="text-white/90">Mostrar animaciones en la interfaz</p>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="settings.animations" class="sr-only peer">
                      <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sección Privacidad -->
            <div v-if="activeSection === 'privacy'" class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
              <h3 class="text-xl font-semibold text-white mb-6">Configuración de Privacidad</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-neutral-900/30 rounded-lg">
                  <div>
                    <p class="text-white font-medium">Datos de análisis</p>
                    <p class="text-white/70 text-sm">Compartir datos anónimos para mejorar el servicio</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.shareAnalytics" class="sr-only peer">
                    <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                  </label>
                </div>
                
                <div class="flex items-center justify-between p-4 bg-neutral-900/30 rounded-lg">
                  <div>
                    <p class="text-white font-medium">Cookies de terceros</p>
                    <p class="text-white/70 text-sm">Permitir cookies de servicios externos</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.thirdPartyCookies" class="sr-only peer">
                    <div class="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                  </label>
                </div>
                
                <div class="mt-6">
                  <button class="text-red-400 hover:text-red-300 font-medium transition-colors duration-200 flex items-center">
                    <span class="pi pi-trash mr-2"></span>
                    Solicitar eliminación de datos
                  </button>
                </div>
              </div>
            </div>

            <!-- Sección Integraciones -->
            <div v-if="activeSection === 'integrations'" class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
              <h3 class="text-xl font-semibold text-white mb-6">Integraciones y API</h3>
              
              <div class="space-y-6">
                <div class="p-4 bg-neutral-900/30 rounded-lg">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span class="pi pi-google text-white text-lg"></span>
                      </div>
                      <div>
                        <p class="text-white font-medium">Google Analytics</p>
                        <p class="text-white/70 text-xs">Conecta tus datos de análisis</p>
                      </div>
                    </div>
                    <button class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-md text-sm font-medium hover:bg-blue-500/30 transition-colors duration-200">
                      Conectar
                    </button>
                  </div>
                </div>
                
                <div class="p-4 bg-neutral-900/30 rounded-lg">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span class="pi pi-facebook text-white text-lg"></span>
                      </div>
                      <div>
                        <p class="text-white font-medium">Facebook Ads</p>
                        <p class="text-white/70 text-xs">Integra tus campañas publicitarias</p>
                      </div>
                    </div>
                    <button class="px-3 py-1 bg-green-500/20 text-green-400 rounded-md text-sm font-medium hover:bg-green-500/30 transition-colors duration-200">
                      Conectar
                    </button>
                  </div>
                </div>
                
                <div class="p-4 bg-neutral-900/30 rounded-lg">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span class="pi pi-slack text-white text-lg"></span>
                      </div>
                      <div>
                        <p class="text-white font-medium">Slack</p>
                        <p class="text-white/70 text-xs">Recibe notificaciones en tu espacio de trabajo</p>
                      </div>
                    </div>
                    <button class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-md text-sm font-medium hover:bg-purple-500/30 transition-colors duration-200">
                      Conectar
                    </button>
                  </div>
                </div>
                
                <div class="mt-6">
                  <h4 class="text-white font-medium mb-2">Claves API</h4>
                  <p class="text-white/70 text-sm mb-4">Genera claves API para integrar con servicios externos</p>
                  
                  <button class="py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center">
                    <span class="pi pi-key mr-2"></span>
                    Generar nueva clave API
                  </button>
                </div>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-end space-x-4 mt-8">
              <button 
                @click="resetSettings"
                class="py-2 px-6 border border-neutral-600 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Restaurar valores predeterminados
              </button>
              <button 
                @click="saveSettings"
                :disabled="isSaving"
                class="py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span v-if="isSaving">Guardando...</span>
                <span v-else>Guardar cambios</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import NavigationBar from '@/shared/components/NavigationBar.vue'

const activeSection = ref('general')
const isSaving = ref(false)

const defaultSettings = {
  language: 'es',
  timezone: 'America/Mexico_City',
  theme: 'dark',
  density: 'comfortable',
  animations: true,
  emailNotifications: true,
  campaignNotifications: true,
  featureNotifications: false,
  shareAnalytics: true,
  thirdPartyCookies: false
}

const settings = reactive({ ...defaultSettings })

const saveSettings = async () => {
  isSaving.value = true
  
  try {
    // Simulación de guardado
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Settings saved:', settings)
  } catch (error) {
    console.error('Error saving settings:', error)
  } finally {
    isSaving.value = false
  }
}

const resetSettings = () => {
  Object.assign(settings, defaultSettings)
}
</script>