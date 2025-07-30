<template>
  <div class="min-h-screen px-6 py-10 bg-black text-white">
    <div class="w-full mx-auto space-y-6">

      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight">Campañas de Marketing</h1>
        <p class="text-gray-400 mt-2">Gestiona y monitorea todas tus campañas de marketing desde un solo lugar. Crea nuevas estrategias y optimiza el rendimiento de tus anuncios.</p>
      </div>


      <div class="relative flex items-center justify-end">

        <div class="absolute left-1/2 transform -translate-x-1/2">
          <input v-model="searchQuery" type="text" placeholder="Buscar campañas"
            class="px-4 py-2 rounded-lg text-sm font-semibold bg-white/10 text-white placeholder-gray-400 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/80 w-80" />
        </div>


        <RouterLink to="/form"
          class="flex items-center gap-2 px-6 py-2 text-sm font-semibold hover:bg-white/90 bg-white text-black rounded-md shadow-lg transition whitespace-nowrap">
          <span class="pi pi-plus" />
          Nueva campaña
        </RouterLink>
      </div>


      <div v-if="loading" class="flex justify-center items-center h-64">
        <span class="pi pi-spin pi-spinner text-4xl text-purple-400"></span>
      </div>


      <div v-else>

        <div v-if="filteredCampaigns.length === 0" class="text-center py-10">
          <span class="pi pi-info-circle text-3xl text-purple-400 mb-4" />
          <h2 class="text-lg font-semibold mb-2">No hay campañas</h2>
          <p class="text-gray-400">Crea tu primera campaña para empezar.</p>
        </div>


        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(campaign, i) in paginatedCampaigns" :key="i"
            class="group relative bg-gradient-to-br from-slate-800/40 to-slate-700/30 border border-slate-600/30 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-slate-500/50">
            

            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="p-3 rounded-xl transition-all duration-300" :style="{ backgroundColor: `${campaign.color}20`, border: `1px solid ${campaign.color}40` }">
                  <span :class="`${campaign.icono} text-xl`" :style="{ color: campaign.color }" />
                </div>
                <div>
                  <h2 class="text-lg font-bold text-white group-hover:text-gray-100 transition-colors">{{ campaign.title }}</h2>
                  <p class="text-xs text-gray-400">Campaña activa</p>
                </div>
              </div>
              <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>


            <div class="space-y-4 mb-6">

              <div class="bg-slate-900/30 rounded-lg p-3 border border-slate-600/20">
                <div class="flex items-center gap-2 mb-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  <span class="text-xs font-medium text-gray-300">ID de Campaña</span>
                </div>
                <p class="text-sm font-mono text-white">{{ campaign.description }}</p>
              </div>


              <div class="grid grid-cols-1 gap-3">
                <div class="bg-slate-900/30 border border-slate-600/20 rounded-lg p-3">
                  <div class="flex items-center gap-2 mb-1">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    <span class="text-xs text-gray-300">Estado</span>
                  </div>
                  <p class="text-sm font-semibold text-white">Activa</p>
                </div>
              </div>
            </div>


            <div class="flex gap-2">
              <RouterLink :to="`/details/${campaign.description}`"
                class="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-center transition-all duration-200 bg-slate-700/50 hover:bg-slate-600/60 text-gray-200 hover:text-white border border-slate-600/30 hover:border-slate-500/50">
                Ver campaña
              </RouterLink>
              

              <button @click="confirmDelete(campaign.description)"
                class="px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-red-600/80 text-gray-300 hover:text-white border border-slate-600/30 hover:border-red-500/50 transition-all duration-200"
                title="Eliminar campaña">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="M19,6v14a2,2 0,0,1-2,2H7a2,2 0,0,1-2-2V6M8,6V4a2,2 0,0,1,2-2h4a2,2 0,0,1,2,2V6"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>


            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          </div>
        </div>


        <div class="flex justify-center mt-8 gap-4 items-center">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/60 text-gray-200 hover:text-white rounded border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-700/50 disabled:hover:text-gray-200">
            Anterior
          </button>
          <span class="text-sm text-gray-300">Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/60 text-gray-200 hover:text-white rounded border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-700/50 disabled:hover:text-gray-200">
            Siguiente
          </button>
        </div>
      </div>
    </div>


    <DeleteConfirmationModal :show="showDeleteModal" :isDeleting="isDeletingCampaign" @confirm="deleteCampaignConfirmed"
      @cancel="cancelDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { apiRequest } from '@/core/api/apiClient'
import DeleteConfirmationModal from '@/shared/components/campaing/DeleteConfirmationModal.vue';

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


const showDeleteModal = ref(false)
const campaignToDeleteId = ref<string | null>(null)
const isDeletingCampaign = ref(false)

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


const confirmDelete = (id: string) => {
  campaignToDeleteId.value = id
  showDeleteModal.value = true
}

const cancelDelete = () => {
  if (!isDeletingCampaign.value) {
    showDeleteModal.value = false
    campaignToDeleteId.value = null
  }
}

const deleteCampaignConfirmed = async () => {
  if (!campaignToDeleteId.value || isDeletingCampaign.value) return

  isDeletingCampaign.value = true

  try {
    await apiRequest({
      key: 'project.eliminar',
      params: { id: campaignToDeleteId.value }
    })

    console.log(`Campaña con ID ${campaignToDeleteId.value} eliminada.`)


    await fetchCampanas()

  } catch (err) {
    console.error('Error al eliminar la campaña:', err)

  } finally {
    isDeletingCampaign.value = false
    cancelDelete()
  }
}


fetchCampanas()


const filteredCampaigns = computed(() =>
  campaigns.value.filter((c) =>
    `${c.title} ${c.description}`.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)


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