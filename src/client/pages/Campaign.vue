<template>
  <div class="min-h-screen px-6 py-10 bg-black text-white">
    <div class="w-full mx-auto">
      <div class="mb-10">
        <h1 class="text-3xl font-bold tracking-tight">Campañas de Marketing</h1>
        <p class="text-gray-400 mt-2">Aquí puedes gestionar tus campañas activas o crear nuevas.</p>
      </div>

      <!-- Loader -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <span class="pi pi-spin pi-spinner text-4xl text-purple-400"></span>
      </div>

      <!-- Grid de campañas -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Si hay campañas -->
        <template v-if="campaigns.length > 0">
          <div
            v-for="(campaign, i) in campaigns"
            :key="i"
            class="bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] border border-neutral-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex items-center gap-3 mb-4">
              <span :class="`${campaign.icono} text-2xl`" :style="{ color: campaign.color }" />
              <h2 class="text-xl font-semibold">{{ campaign.title }}</h2>
            </div>

            <p class="text-sm text-gray-400 mb-4">ID: {{ campaign.description }}</p>

            <router-link :to="`/details/`+campaign.description"
              class="mt-auto px-4 py-2 rounded-md text-sm transition-colors cursor-pointer"
              :class="campaign.textColor"
              :style="{ backgroundColor: campaign.color }"
            >
              Ver detalles
            </router-link>
          </div>

          <!-- Card para añadir nueva campaña -->
          <RouterLink to="/form">
            <div
              class="flex items-center justify-center border-2 bg-black/80 border-dashed hover:bg-white/4 border-gray-700 rounded-xl hover:shadow-purple-500/20 transition-all cursor-pointer"
            >
              <button
                class="flex items-center gap-2 px-6 py-4 text-sm font-medium text-white rounded-md shadow-md transition cursor-pointer"
              >
                <span class="pi pi-plus text-purple-400"></span>
                Crear nueva campaña
              </button>
            </div>
          </RouterLink>
        </template>

        <!-- Si no hay campañas -->
        <template v-else>
          <div
            class="col-span-full flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-700 rounded-xl p-10 "
          >
            <span class="pi pi-info-circle text-3xl text-purple-400 mb-4" />
            <h2 class="text-lg font-semibold mb-2">No hay proyectos</h2>
            <p class="text-gray-400 mb-4">
              Empieza creando tu primera campaña personalizada para comenzar a captar clientes.
            </p>
            <RouterLink to="/form"
              class="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-lg transition"
            >
              <span class="pi pi-plus" />
              Crear nueva campaña
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { apiRequest } from '@/core/api/apiClient'
import { ref } from 'vue'

interface Campaign {
  title: string
  description: string
  icono: string
  color: string
  textColor: string
}

const campaigns = ref<Campaign[]>([])
const loading = ref(true)

const colorFallback = '#7C3AED'

const isHexColor = (str: string) => /^#([0-9A-Fa-f]{6})$/.test(str)
const isPiIcon = (str: string) => /^pi\s+pi-[\w-]+$/.test(str)

// Determina si un color es claro u oscuro para elegir el texto
function getTextColor(bgColor: string): string {
  const r = parseInt(bgColor.substr(1, 2), 16)
  const g = parseInt(bgColor.substr(3, 2), 16)
  const b = parseInt(bgColor.substr(5, 2), 16)
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  return luminance > 186 ? 'text-black' : 'text-white'
}

const fetchCampanas = async () => {
  loading.value = true

  try {
    const response = await apiRequest<any>({ key: 'project.listar' })

    if (response?.success && Array.isArray(response.data)) {
      campaigns.value = response.data
        .filter((c: any) => !c.is_deleted)
        .map((c: any) => {
          const icono = isPiIcon(c.icono) ? c.icono : 'pi pi-tag'
          const color = isHexColor(c.primary_color) ? c.primary_color : colorFallback
          const textColor = getTextColor(color)

          return {
            title: c.nombre,
            description: c.id,
            icono,
            color,
            textColor,
          }
        })
    }
  } catch (err) {
    console.error('Error al cargar campañas', err)
  } finally {
    loading.value = false
  }
}

fetchCampanas()
</script>
