<template>
  <div class="space-y-4">
    <!-- Header con controles -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold flex items-center gap-3">
          <ClipboardList class="h-8 w-8 text-green-400" />
          Campañas  
          <span class="text-lg font-normal text-gray-400">({{ filteredCampaigns.length }})</span>
        </h2>
        <p class="text-gray-400 text-sm mt-1">
          Gestiona y monitorea todas tus campañas en tiempo real
        </p>
      </div>
      
      <div class="flex gap-2">
        <button
          @click="refreshData"
          class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          :disabled="isLoading"
        >
          <RefreshCw :class="['h-4 w-4', { 'animate-spin': isLoading }]" />
          Actualizar
        </button>
        <button
          @click="exportData"
          class="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <Download class="h-4 w-4" />
          Exportar
        </button>
      </div>
    </div>

    <!-- Filtros y búsqueda -->
    <div class="bg-slate-800/25 p-4 rounded-xl border border-slate-600/25">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Búsqueda -->
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar campañas..."
            class="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Filtro por canal -->
        <select
          v-model="selectedChannel"
          class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los canales</option>
          <option v-for="channel in uniqueChannels" :key="channel" :value="channel">
            {{ channel }}
          </option>
        </select>

        <!-- Filtro por estado -->
        <select
          v-model="selectedStatus"
          class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los estados</option>
          <option value="Activa">Activa</option>
          <option value="Pausada">Pausada</option>
          <option value="Completada">Completada</option>
        </select>

        <!-- Filtro por rango de presupuesto -->
        <select
          v-model="selectedBudgetRange"
          class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los presupuestos</option>
          <option value="0-1000">$0 - $1,000</option>
          <option value="1000-5000">$1,000 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000+">$10,000+</option>
        </select>
      </div>
    </div>

    <!-- Estadísticas de la tabla filtrada -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-br from-indigo-900/25 to-indigo-800/15 p-4 rounded-xl border border-indigo-700/25 hover:border-indigo-600/40 transition-all">
        <div class="flex items-center gap-2">
          <Search class="h-5 w-5 text-indigo-400" />
          <span class="text-indigo-300 font-medium text-sm">Filtradas</span>
        </div>
        <p class="text-2xl font-bold text-white mt-2">{{ filteredCampaigns.length }}</p>
        <p class="text-xs text-indigo-300/80 mt-1">de {{ enrichedCampaigns.length }} total</p>
      </div>
      
      <div class="bg-gradient-to-br from-emerald-900/25 to-emerald-800/15 p-4 rounded-xl border border-emerald-700/25 hover:border-emerald-600/40 transition-all">
        <div class="flex items-center gap-2">
          <DollarSign class="h-5 w-5 text-emerald-400" />
          <span class="text-emerald-300 font-medium text-sm">Presupuesto Visible</span>
        </div>
        <p class="text-2xl font-bold text-white mt-2">${{ filteredBudget.toLocaleString() }}</p>
        <p class="text-xs text-emerald-300/80 mt-1">campañas mostradas</p>
      </div>
      
      <div class="bg-gradient-to-br from-violet-900/25 to-violet-800/15 p-4 rounded-xl border border-violet-700/25 hover:border-violet-600/40 transition-all">
        <div class="flex items-center gap-2">
          <TrendingUp class="h-5 w-5 text-violet-400" />
          <span class="text-violet-300 font-medium text-sm">Clics Promedio</span>
        </div>
        <p class="text-2xl font-bold text-white mt-2">{{ averageClicks.toLocaleString() }}</p>
        <p class="text-xs text-violet-300/80 mt-1">por campaña</p>
      </div>
      
      <div class="bg-gradient-to-br from-cyan-900/25 to-cyan-800/15 p-4 rounded-xl border border-cyan-700/25 hover:border-cyan-600/40 transition-all">
        <div class="flex items-center gap-2">
          <Globe class="h-5 w-5 text-cyan-400" />
          <span class="text-cyan-300 font-medium text-sm">Canal Popular</span>
        </div>
        <p class="text-xl font-bold text-white mt-2">{{ topChannel }}</p>
        <p class="text-xs text-cyan-300/80 mt-1">{{ topChannelCount }} campañas</p>
      </div>
    </div>

    <!-- Tabla -->
    <div class="bg-slate-800/30 rounded-xl overflow-hidden border border-slate-600/30 backdrop-blur-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-700/40">
            <tr>
              <th 
                v-for="column in columns" 
                :key="column.key"
                @click="column.sortable && toggleSort(column.key)"
                :class="[
                  'px-6 py-4 text-xs font-medium text-gray-300 uppercase tracking-wider',
                  column.sortable && 'cursor-pointer hover:bg-gray-600/50 transition-colors'
                ]"
              >
                <div class="flex items-center gap-2">
                  <component :is="column.icon" class="h-4 w-4" />
                  {{ column.label }}
                  <ArrowUpDown 
                    v-if="column.sortable" 
                    :class="[
                      'h-3 w-3',
                      sortField === column.key ? 'text-blue-400' : 'text-gray-500'
                    ]" 
                  />
                </div>
              </th>

            </tr>
          </thead>
          <tbody class="divide-y divide-gray-600">
            <tr 
              v-for="campaign in paginatedCampaigns" 
              :key="campaign.id"
              class="hover:bg-slate-700/25 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div :class="[
                    'w-3 h-3 rounded-full',
                    getStatusColor(campaign.estado)
                  ]"></div>
                  <div>
                    <p class="font-medium text-white">{{ campaign.nombre }}</p>
                    <p class="text-xs text-gray-400">ID: {{ campaign.id }}</p>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <component :is="getChannelIcon(campaign.canal)" class="h-4 w-4 text-gray-400" />
                  <span class="text-gray-300">{{ campaign.canal }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span class="text-white font-medium">${{ campaign.presupuesto }}</span>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <Mouse class="h-4 w-4 text-gray-400" />
                  <span class="text-gray-300">{{ campaign.clicks.toLocaleString() }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <Eye class="h-4 w-4 text-gray-400" />
                  <span class="text-gray-300">{{ (campaign.impressions || 0).toLocaleString() }}</span>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getStatusBadgeClass(campaign.estado)
                ]">
                  {{ campaign.estado }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div class="flex items-center justify-between px-6 py-4 bg-slate-700/20 border-t border-slate-600/30">
        <div class="text-sm text-gray-400">
          Mostrando {{ startIndex + 1 }} - {{ endIndex }} de {{ filteredCampaigns.length }} campañas
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded transition-colors"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>
          
          <span class="px-3 py-1 text-gray-300">
            {{ currentPage }} de {{ totalPages }}
          </span>
          
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded transition-colors"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  ClipboardList, 
  Search, 
  RefreshCw, 
  Download, 
  Target, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  ArrowUpDown,
  Eye,
  Mouse,
  ChevronLeft,
  ChevronRight,
  Globe,
  Smartphone,
  Mail,
  Video,
  Image,
  Zap
} from 'lucide-vue-next'

interface Campaign {
  id: string
  nombre: string
  canal: string
  presupuesto: string
  clicks: number
  impressions?: number
  estado: 'Activa' | 'Pausada' | 'Completada'
  createdAt?: string
}

const props = defineProps<{
  campaigns: Campaign[]
}>()

const emit = defineEmits<{
  refresh: []
}>()

// Estado de filtros y búsqueda
const searchTerm = ref('')
const selectedChannel = ref('')
const selectedStatus = ref('')
const selectedBudgetRange = ref('')
const sortField = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const isLoading = ref(false)

// Definición de columnas
const columns = [
  { key: 'nombre', label: 'Campaña', icon: Target, sortable: true },
  { key: 'canal', label: 'Canal', icon: Globe, sortable: true },
  { key: 'presupuesto', label: 'Presupuesto', icon: DollarSign, sortable: true },
  { key: 'clicks', label: 'Clics', icon: Mouse, sortable: true },
  { key: 'impressions', label: 'Impresiones', icon: Eye, sortable: true },
  { key: 'estado', label: 'Estado', icon: Zap, sortable: true }
]

// Datos calculados
const enrichedCampaigns = computed(() => 
  props.campaigns.map((campaign, index) => ({
    ...campaign,
    id: campaign.id || `campaign-${index + 1}`,
    impressions: campaign.impressions || campaign.clicks * 15
  }))
)

const uniqueChannels = computed(() => 
  [...new Set(enrichedCampaigns.value.map(c => c.canal))].filter(Boolean)
)

const filteredCampaigns = computed(() => {
  let filtered = enrichedCampaigns.value

  // Filtro por búsqueda
  if (searchTerm.value) {
    filtered = filtered.filter(campaign =>
      campaign.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      campaign.canal.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  // Filtro por canal
  if (selectedChannel.value) {
    filtered = filtered.filter(campaign => campaign.canal === selectedChannel.value)
  }

  // Filtro por estado
  if (selectedStatus.value) {
    filtered = filtered.filter(campaign => campaign.estado === selectedStatus.value)
  }

  // Filtro por presupuesto
  if (selectedBudgetRange.value) {
    filtered = filtered.filter(campaign => {
      const budget = parseFloat(campaign.presupuesto.replace(/,/g, ''))
      switch (selectedBudgetRange.value) {
        case '0-1000': return budget <= 1000
        case '1000-5000': return budget > 1000 && budget <= 5000
        case '5000-10000': return budget > 5000 && budget <= 10000
        case '10000+': return budget > 10000
        default: return true
      }
    })
  }

  // Ordenamiento
  if (sortField.value) {
    filtered.sort((a, b) => {
      let aVal: any = a[sortField.value as keyof Campaign]
      let bVal: any = b[sortField.value as keyof Campaign]

      if (sortField.value === 'presupuesto') {
        aVal = parseFloat(String(aVal || '0').replace(/,/g, '')) || 0
        bVal = parseFloat(String(bVal || '0').replace(/,/g, '')) || 0
      }

      aVal = aVal ?? 0
      bVal = bVal ?? 0

      if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredCampaigns.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredCampaigns.value.length))

const paginatedCampaigns = computed(() => 
  filteredCampaigns.value.slice(startIndex.value, startIndex.value + itemsPerPage.value)
)



const filteredBudget = computed(() => 
  filteredCampaigns.value.reduce((sum, c) => sum + parseFloat(c.presupuesto.replace(/,/g, '')), 0)
)

const averageClicks = computed(() => {
  const total = filteredCampaigns.value.reduce((sum, c) => sum + c.clicks, 0)
  return filteredCampaigns.value.length > 0 ? Math.round(total / filteredCampaigns.value.length) : 0
})

const topChannel = computed(() => {
  const channelCounts = new Map<string, number>()
  filteredCampaigns.value.forEach(c => {
    const count = channelCounts.get(c.canal) || 0
    channelCounts.set(c.canal, count + 1)
  })
  
  let maxCount = 0
  let topCh = 'N/A'
  channelCounts.forEach((count, channel) => {
    if (count > maxCount) {
      maxCount = count
      topCh = channel
    }
  })
  
  return topCh
})

const topChannelCount = computed(() => {
  const channelCounts = new Map<string, number>()
  filteredCampaigns.value.forEach(c => {
    const count = channelCounts.get(c.canal) || 0
    channelCounts.set(c.canal, count + 1)
  })
  
  return Math.max(...Array.from(channelCounts.values()), 0)
})

// Funciones de utilidad
const getStatusColor = (estado: string) => {
  switch (estado) {
    case 'Activa': return 'bg-green-500'
    case 'Pausada': return 'bg-yellow-500'
    case 'Completada': return 'bg-gray-500'
    default: return 'bg-gray-500'
  }
}

const getStatusBadgeClass = (estado: string) => {
  switch (estado) {
    case 'Activa': return 'bg-green-600 text-white'
    case 'Pausada': return 'bg-yellow-600 text-white'
    case 'Completada': return 'bg-gray-600 text-white'
    default: return 'bg-gray-600 text-white'
  }
}

const getChannelIcon = (canal: string) => {
  switch (canal.toLowerCase()) {
    case 'google ads': return Globe
    case 'facebook': return Smartphone
    case 'instagram': return Image
    case 'email': return Mail
    case 'video': return Video
    default: return Globe
  }
}

// Funciones de interacción
const toggleSort = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const refreshData = async () => {
  isLoading.value = true
  emit('refresh')
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}

const exportData = () => {
  const csv = [
    ['Campaña', 'Canal', 'Presupuesto', 'Clics', 'Impresiones', 'Estado'],
    ...filteredCampaigns.value.map(c => [
      c.nombre, c.canal, c.presupuesto, c.clicks, c.impressions, c.estado
    ])
  ].map(row => row.join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `campaigns-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script> 