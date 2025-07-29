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
        <input v-model="searchQuery" type="text" placeholder="Buscar campañas por nombre"
          class="px-4 py-2 rounded-lg text-sm font-semibold bg-white/10 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/80 w-full md:max-w-sm" />

        <!-- Botón crear -->
        <RouterLink to="/form"
          class="flex items-center gap-2 px-6 py-2 text-sm font-semibold hover:bg-white/90  bg-white text-black  rounded-md shadow-lg transition">
          <span class="pi pi-plus" />
          Nueva campaña
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
          <div v-for="(campaign, i) in paginatedCampaigns" :key="i"
            class="relative bg-neutral-800/25 hover:bg-neutral-700/25 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-lg">
            <!-- Ícono eliminar en esquina superior derecha -->
            <button @click="confirmDelete(campaign.description)"
              class="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
              title="Eliminar campaña">
              <!-- Ícono SVG de basurero -->
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 40 40" fill="currentColor">
                <path
                  d="M21.499 19.994L32.755 8.727a1.064 1.064 0 0 0-.001-1.502c-.398-.396-1.099-.398-1.501.002L20 18.494 8.743 7.224c-.4-.395-1.101-.393-1.499.002a1.05 1.05 0 0 0-.309.751c0 .284.11.55.309.747L18.5 19.993 7.245 31.263a1.064 1.064 0 0 0 .003 1.503c.193.191.466.301.748.301h.006c.283-.001.556-.112.745-.305L20 21.495l11.257 11.27c.199.198.465.308.747.308a1.06 1.06 0 0 0 1.061-1.061c0-.283-.11-.55-.31-.747z" />
              </svg>
            </button>

            <!-- Encabezado con ícono y título -->
            <div class="flex items-center gap-3 mb-4">
              <span :class="`${campaign.icono} text-2xl`" :style="{ color: campaign.color }" />
              <h2 class="text-xl font-semibold">{{ campaign.title }}</h2>
            </div>

            <!-- Descripción -->
            <p class="text-sm text-gray-400 mb-6">ID: {{ campaign.description }}</p>

            <!-- Botón de ver detalles -->
            <RouterLink :to="`/details/${campaign.description}`"
              class="inline-block px-4 py-2 rounded-md text-sm transition-colors cursor-pointer"
              :class="campaign.textColor" :style="{ backgroundColor: campaign.color }">
              Ver detalles
            </RouterLink>
          </div>
        </div>


        <!-- Paginación -->
        <div class="flex justify-center mt-8 gap-4 items-center">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded disabled:opacity-50">
            Anterior
          </button>
          <span class="text-sm">Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded disabled:opacity-50">
            Siguiente
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación para eliminar -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div class="bg-neutral-800 p-8 rounded-lg shadow-xl text-center border border-neutral-700">
        <h3 class="text-xl font-bold mb-4 text-white">Confirmar Eliminación</h3>
        <p class="text-gray-300 mb-6">¿Estás seguro de que quieres eliminar esta campaña?</p>
        <div class="flex justify-center gap-4">
          <button @click="deleteCampaignConfirmed"
            class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition">
            Sí, Eliminar
          </button>
          <button @click="cancelDelete"
            class="px-6 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-md font-semibold transition">
            Cancelar
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
  id: string;
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

// Estado para la eliminación
const showDeleteModal = ref(false);
const campaignToDeleteId = ref<string | null>(null);

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
            id: c.id,
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

const confirmDelete = (id: string) => {
  campaignToDeleteId.value = id;
  showDeleteModal.value = true;
};
const cancelDelete = () => {
  showDeleteModal.value = false;
  campaignToDeleteId.value = null;
};
const deleteCampaignConfirmed = async () => {
  if (!campaignToDeleteId.value) return;
  try {
    // Llama al endpoint de eliminar, pasando el ID como parámetro de URL
    await apiRequest({
      key: 'project.eliminar',
      params: { id: campaignToDeleteId.value }
    });
    console.log(`Campaña con ID ${campaignToDeleteId.value} eliminada.`);
    // Después de eliminar, recargar la lista de campañas
    fetchCampanas()
    await fetchCampanas();
    // Podrías añadir una notificación de éxito aquí
  } catch (err) {
    console.error('Error al eliminar la campaña:', err);
    // Podrías añadir una notificación de error aquí
  } finally {
    cancelDelete(); // Cierra el modal de confirmación
  }
};

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