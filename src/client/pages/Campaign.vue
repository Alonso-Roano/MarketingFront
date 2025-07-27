<template>
  <div class="min-h-screen px-6 py-10 bg-black text-white">
    <div class="w-full mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Campañas de Marketing</h1>
        <p class="text-gray-400 mt-2">Aquí puedes gestionar tus campañas activas o crear nuevas.</p>
      </div>

      <!-- Acciones -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Buscador -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar campañas por nombre o ID..."
          class="px-4 py-2 rounded-md bg-neutral-800 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full md:max-w-sm"
        />

        <!-- Botón crear -->
        <RouterLink
          to="/form"
          class="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-lg transition"
        >
          <span class="pi pi-plus" />
          Crear nueva campaña
        </RouterLink>
      </div>

      <!-- Loader -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <span class="pi pi-spin pi-spinner text-4xl text-purple-400"></span>
      </div>

      <!-- Campañas -->
      <div v-else>
        <!-- Sin campañas -->
        <div v-if="filteredCampaigns.length === 0" class="text-center py-10">
          <span class="pi pi-info-circle text-3xl text-purple-400 mb-4" />
          <h2 class="text-lg font-semibold mb-2">No hay campañas</h2>
          <p class="text-gray-400">Crea tu primera campaña para empezar.</p>
        </div>

        <!-- Grid de campañas -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(campaign, i) in paginatedCampaigns"
            :key="i"
            class="bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] border border-neutral-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex items-center gap-3 mb-4">
              <span :class="`${campaign.icono} text-2xl`" :style="{ color: campaign.color }" />
              <h2 class="text-xl font-semibold">{{ campaign.title }}</h2>
            </div>

            <p class="text-sm text-gray-400 mb-4">ID: {{ campaign.description }}</p>

            <RouterLink
              :to="`/details/${campaign.description}`"
              class="mt-auto px-4 py-2 rounded-md text-sm transition-colors cursor-pointer"
              :class="campaign.textColor"
              :style="{ backgroundColor: campaign.color }"
            >
              Ver detalles
            </RouterLink>
          </div>
        </div>

        <!-- Paginación -->
        <div class="flex justify-center mt-8 gap-4 items-center">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span class="text-sm">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiRequest } from '@/core/api/apiClient'

interface Campaign {
  title: string
  description: string
  icono: string
  color: string
  textColor: string
}

const campaigns = ref<Campaign[]>([])
const loading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

const colorFallback = '#7C3AED'
const isHexColor = (str: string) => /^#([0-9A-Fa-f]{6})$/.test(str)
const isPiIcon = (str: string) => /^pi\s+pi-[\w-]+$/.test(str)

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

// Filtro
const filteredCampaigns = computed(() =>
  campaigns.value.filter((c) =>
    `${c.title} ${c.description}`.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

// Paginación
const totalPages = computed(() => Math.ceil(filteredCampaigns.value.length / itemsPerPage))

const paginatedCampaigns = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredCampaigns.value.slice(start, start + itemsPerPage)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>