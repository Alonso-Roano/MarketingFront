<template>
  <main class="bg-black min-h-screen">
    <NavigationBar :show-nav-links="false" />

    <section class="relative min-h-screen w-full pt-16">
      <div class="w-full max-w-4xl mx-auto px-6 py-12">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent mb-4">
              Mi Perfil
            </h1>
            <p class="text-white/70 text-lg">
              Gestiona tu información personal en <span class="text-purple-400 font-semibold">NIUX</span>
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1">
              <div class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div class="flex flex-col items-center mb-6">
                  <div class="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <span class="text-white text-3xl font-bold">
                      {{ userInitials }}
                    </span>
                  </div>
                  <h2 class="text-xl font-semibold text-white mb-2">{{ userEmail }}</h2>
                  <p class="text-white/70 text-sm">Usuario desde {{ joinedDate }}</p>
                </div>

                <div class="space-y-3">
                  <button class="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                    Cambiar foto
                  </button>
                  <button class="w-full py-2 px-4 border border-neutral-600 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200">
                    Configuración
                  </button>
                </div>
              </div>
            </div>

            <div class="lg:col-span-2 space-y-6">
              <div class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-xl font-semibold text-white">Información personal</h3>
                  <button 
                    @click="toggleEditMode"
                    class="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                  >
                    {{ isEditing ? 'Cancelar' : 'Editar' }}
                  </button>
                </div>

                <form @submit.prevent="handleSaveProfile" class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-white/90 mb-2">
                      Nombre completo
                    </label>
                    <input
                      v-model="profileData.name"
                      :disabled="!isEditing"
                      type="text"
                      class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-white/90 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      v-model="profileData.email"
                      disabled
                      type="email"
                      class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 opacity-50 cursor-not-allowed transition-all duration-200"
                    />
                    <p class="text-xs text-white/50 mt-1">
                      El correo electrónico no se puede cambiar
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-white/90 mb-2">
                      Teléfono
                    </label>
                    <input
                      v-model="profileData.phone"
                      :disabled="!isEditing"
                      type="tel"
                      class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                      
                  <div>
                    <label class="block text-sm font-medium text-white/90 mb-2">
                      Empresa
                    </label>
                    <input
                      v-model="profileData.company"
                      :disabled="!isEditing"
                      type="text"
                      class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      placeholder="Tu empresa"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-white/90 mb-2">
                      Biografía
                    </label>
                    <textarea
                      v-model="profileData.bio"
                      :disabled="!isEditing"
                      rows="4"
                      class="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 resize-none"
                      placeholder="Cuéntanos sobre ti..."
                    />
                  </div>

                  <div v-if="isEditing" class="flex justify-end space-x-4">
                    <button
                      type="button"
                      @click="cancelEdit"
                      class="py-2 px-6 border border-neutral-600 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      :disabled="isSaving"
                      class="py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <span v-if="isSaving">Guardando...</span>
                      <span v-else>Guardar cambios</span>
                    </button>
                  </div>
                </form>
              </div>

              <div class="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <h3 class="text-xl font-semibold text-white mb-6">Seguridad</h3>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-neutral-900/30 rounded-lg">
                    <div>
                      <p class="text-white font-medium">Cambiar contraseña</p>
                      <p class="text-white/70 text-sm">Actualiza tu contraseña regularmente</p>
                    </div>
                    <button class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                      Cambiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/auth/stores/authStore'
import NavigationBar from '@/shared/components/NavigationBar.vue'

const authStore = useAuthStore()

const profileData = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  bio: ''
})

const originalProfileData = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  bio: ''
})

const isEditing = ref(false)
const isSaving = ref(false)

const userEmail = computed(() => authStore.user?.email || '')
const userInitials = computed(() => {
  if (!authStore.user?.email) return ''
  return authStore.user.email.charAt(0).toUpperCase()
})

const joinedDate = computed(() => {
  return new Date().toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long' 
  })
})

const toggleEditMode = () => {
  if (isEditing.value) {
    cancelEdit()
  } else {
    originalProfileData.value = { ...profileData.value }
    isEditing.value = true
  }
}

const cancelEdit = () => {
  profileData.value = { ...originalProfileData.value }
  isEditing.value = false
}

const handleSaveProfile = async () => {
  isSaving.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) 
    
    console.log('Profile saved:', profileData.value)
    isEditing.value = false
    
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  profileData.value = {
    name: authStore.user?.name || '',
    email: authStore.user?.email || '',
    phone: authStore.user?.phone || '',
    company: authStore.user?.company || '',
    bio: authStore.user?.bio || ''
  }
})
</script> 