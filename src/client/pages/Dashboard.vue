<template>
  <div class="min-h-screen px-6 py-10 bg-black text-white">
    <div class="w-full mx-auto space-y-12 ">
      <!-- Encabezado -->
      <section class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">Panel de Control</h1>
          <p class="text-gray-400 mt-1">Resumen general de tus campañas de marketing.</p>
        </div>
        <div class="flex gap-3">
          <button
            @click="handleGenerateReport"
            :disabled="isGenerating"
            class="group flex items-center gap-3 px-5 py-3 bg-emerald-700 hover:bg-emerald-600 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 border border-emerald-600 hover:border-emerald-500"
          >
            <div class="p-1 bg-emerald-600 rounded-md group-hover:bg-emerald-500 transition-colors">
              <Download v-if="!isGenerating" class="h-4 w-4" />
              <div v-else class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div class="text-left">
              <div class="font-medium text-sm">
                {{ isGenerating ? 'Generando...' : 'Generar Reporte' }}
              </div>
              <div class="text-xs text-emerald-100">Descargar PDF completo</div>
            </div>
          </button>
          
          <button
            @click="showHelpModal = true"
            class="group flex items-center gap-3 px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
          >
            <div class="p-1 bg-gray-600 rounded-md group-hover:bg-gray-500 transition-colors">
              <HelpCircle class="h-4 w-4" />
            </div>
            <div class="text-left">
              <div class="font-medium text-sm">Ayuda del Dashboard</div>
              <div class="text-xs text-gray-300">Cómo interpretar los gráficos</div>
            </div>
          </button>
        </div>
      </section>

      <!-- KPIs principales -->
      <section>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Campañas activas"
            :value="totalCampaigns"
            :icon="Megaphone"
            type="neutral"
            description="Actualmente en ejecución"
          />
          <KpiCard
            title="Presupuesto aprobado"
            :value="`$${totalApprovedBudget.toLocaleString()}`"
            :icon="DollarSign"
            type="success"
            description="Total asignado este mes"
          />
          <KpiCard
            title="Impresiones totales"
            :value="totalImpressions.toLocaleString()"
            :icon="Eye"
            type="neutral"
            description="Visibilidad alcanzada"
          />
          <KpiCard
            title="Clics predichos"
            :value="totalClicks.toLocaleString()"
            :icon="TrendingUp"
            type="warning"
            description="Interacciones esperadas"
          />
        </div>
      </section>

      <!-- Gráfico Principal de Líneas -->
      <section class="bg-neutral-800/25 hover:bg-neutral-700/25 p-6 rounded-lg shadow-lg">
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-3 flex items-center gap-3">
            <TrendingUp class="h-8 w-8 text-blue-400" />
            Análisis de Predicciones vs Resultados Reales
          </h2>
          <p class="text-gray-400 text-sm leading-relaxed">
            Este gráfico de líneas compara las <strong>predicciones generadas por nuestros modelos de IA</strong> contra los <strong>datos reales obtenidos</strong> 
            de las campañas de marketing. Cada línea representa una métrica diferente (clics, impresiones, presupuesto) y muestra qué tan precisas 
            son nuestras predicciones. La línea azul muestra los valores predichos por IA, mientras que la línea verde muestra los resultados 
            reales obtenidos. <em>Cuanto más cerca estén las líneas, mayor es la precisión de nuestros modelos.</em>
          </p>
        </div>
        <div class="w-full" data-chart="line-chart">
          <LineChart :data="chartData" />
        </div>
      </section>

      <!-- Grid de Gráficos Analíticos -->
      <section class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- Distribución por Canales -->
        <div class="bg-neutral-800/25 hover:bg-neutral-700/25 p-6 rounded-lg shadow-lg" data-chart="pie-chart">
          <PieChart 
            :data="channelDistribution"
            title="Distribución de Campañas por Canal"
            description="Muestra el porcentaje de campañas activas en cada canal de marketing. Este análisis ayuda a identificar qué canales se están utilizando más y cuáles podrían necesitar mayor inversión. Los datos se basan en todas las campañas activas del sistema."
          >
            <template #icon>
              <Target class="h-6 w-6 text-green-400" />
            </template>
          </PieChart>
        </div>

        <!-- Presupuesto por Estado -->
        <div class="bg-neutral-800/25 hover:bg-neutral-700/25 p-6 rounded-lg shadow-lg" data-chart="pie-chart">
          <PieChart 
            :data="budgetByStatus"
            title="Distribución del Presupuesto"
            description="Visualiza cómo se distribuye el presupuesto total entre diferentes estados de campaña. Permite identificar qué porcentaje del presupuesto está asignado a campañas activas vs pausadas o completadas, optimizando la gestión financiera."
          >
            <template #icon>
              <DollarSign class="h-6 w-6 text-green-400" />
            </template>
          </PieChart>
        </div>

        <!-- Precisión de Predicciones -->
        <div class="bg-neutral-800/25 hover:bg-neutral-700/25 p-6 rounded-lg shadow-lg" data-chart="accuracy-gauge">
          <AccuracyGauge 
            :accuracy="predictionAccuracy"
            :total-predictions="totalPredictions"
            title="Precisión del Modelo de IA"
            description="Medidor que indica qué tan precisas son nuestras predicciones comparadas con los resultados reales. Se calcula promediando la diferencia entre valores predichos y reales de todas las métricas (clics, impresiones, presupuesto)."
          >
            <template #icon>
              <Zap class="h-6 w-6 text-purple-400" />
            </template>
          </AccuracyGauge>
        </div>

        <!-- Rendimiento por Canal -->
        <div class="lg:col-span-2 bg-neutral-800/25 hover:bg-neutral-700/25 p-6 rounded-lg shadow-lg" data-chart="bar-chart">
          <HorizontalBarChart 
            :data="channelPerformance"
            title="Rendimiento por Canal de Marketing"
            description="Gráfico de barras horizontales que compara el rendimiento de cada canal basado en la relación entre clics obtenidos y presupuesto invertido. Los canales con barras más largas tienen mejor ROI (Return on Investment). Esta métrica ayuda a identificar los canales más eficientes para optimizar la distribución de presupuesto."
            data-label="ROI (Clics por $ invertido)"
          >
            <template #icon>
              <BarChart3 class="h-6 w-6 text-blue-400" />
            </template>
          </HorizontalBarChart>
        </div>

        <!-- Tendencias Temporales -->
        <div class="bg-neutral-800/25 hover:bg-neutral-700/25 p-6 rounded-lg shadow-lg" data-chart="bar-chart">
          <HorizontalBarChart 
            :data="weekdayTrends"
            title="Tendencias por Día de la Semana"
            description="Analiza en qué días de la semana las campañas obtienen mejores resultados. Se basan en el promedio de clics obtenidos por día de la semana de todas las campañas activas. Esta información es crucial para planificar el timing de las campañas y optimizar el alcance."
            data-label="Promedio de clics"
          >
            <template #icon>
              <Calendar class="h-6 w-6 text-orange-400" />
            </template>
          </HorizontalBarChart>
        </div>
      </section>

      <!-- Tabla Avanzada de Campañas -->
      <section class="bg-neutral-800/25 hover:bg-neutral-700/25 p-6 rounded-lg shadow-lg">
        <CampaignsTable 
          :campaigns="sampleCampaigns"
          @refresh="handleRefreshCampaigns"
        />
      </section>

      <!-- Modal de Ayuda -->
      <AnalyticsHelpModal 
        :is-open="showHelpModal"
        @close="showHelpModal = false"
      />

      <!-- Toast de Notificaciones -->
      <Toast
        :show="toastState.show"
        :type="toastState.type"
        :title="toastState.title"
        :message="toastState.message"
        :duration="5000"
        @close="toastState.show = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import KpiCard from '@/shared/components/Dashboard/KpiCard.vue'
import LineChart from '@shared/components/Charts/LineChart.vue'
import PieChart from '@shared/components/Charts/PieChart.vue'
import HorizontalBarChart from '@shared/components/Charts/HorizontalBarChart.vue'
import AccuracyGauge from '@shared/components/Charts/AccuracyGauge.vue'
import AnalyticsHelpModal from '@shared/components/Dashboard/AnalyticsHelpModal.vue'
import CampaignsTable from '@shared/components/Dashboard/CampaignsTable.vue'
import Toast from '@shared/components/ui/Toast.vue'
import { apiRequest } from '@/core/api/apiClient'
import { useReportGenerator } from '@/shared/composables/useReportGenerator'
import { 
  Megaphone, 
  DollarSign, 
  Eye, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Calendar, 
  ClipboardList, 
  Brain, 
  Lightbulb,
  Zap,
  PieChart as PieChartIcon,
  HelpCircle,
  FileText,
  Download
} from 'lucide-vue-next'

const totalCampaigns = ref(0)
const totalApprovedBudget = ref(0)
const totalImpressions = ref(0)
const totalClicks = ref(0)
const chartData = ref([])
const sampleCampaigns = ref<any[]>([])
const rawProjectsData = ref<any[]>([])
const showHelpModal = ref(false)

const { isGenerating, generateReport } = useReportGenerator()

const toastState = ref({
  show: false,
  type: 'info' as 'success' | 'error' | 'info',
  title: '',
  message: ''
})
const channelDistribution = computed(() => {
  const channelCounts = new Map<string, number>()
  
  rawProjectsData.value.forEach(project => {
    const prediction = project.project_prediction?.[0]
    if (prediction?.channel_name) {
      const channel = prediction.channel_name
      channelCounts.set(channel, (channelCounts.get(channel) || 0) + 1)
    }
  })
  
  return Array.from(channelCounts.entries()).map(([label, value]) => ({
    label,
    value
  }))
})

const budgetByStatus = computed(() => {
  const statusBudgets = new Map<string, number>()
  
  rawProjectsData.value.forEach(project => {
    const prediction = project.project_prediction?.[0]
    if (prediction?.approved_budget) {
      const status = project.estado || 'Activa'
      const budget = Number(prediction.approved_budget) || 0
      statusBudgets.set(status, (statusBudgets.get(status) || 0) + budget)
    }
  })
  
  return Array.from(statusBudgets.entries()).map(([label, value]) => ({
    label,
    value
  }))
})

const predictionAccuracy = computed(() => {
  if (rawProjectsData.value.length === 0) return 0
  
  let totalAccuracy = 0
  let validComparisons = 0
  
  rawProjectsData.value.forEach(project => {
    const prediction = project.project_prediction?.[0]
    const realData = project.project_data?.[0]
    
    if (prediction && realData) {
      if (prediction.clicks && realData.clicks) {
        const accuracy = Math.max(0, 100 - Math.abs(
          (prediction.clicks - realData.clicks) / Math.max(realData.clicks, 1) * 100
        ))
        totalAccuracy += accuracy
        validComparisons++
      }
      
      if (prediction.impressions && realData.impressions) {
        const accuracy = Math.max(0, 100 - Math.abs(
          (prediction.impressions - realData.impressions) / Math.max(realData.impressions, 1) * 100
        ))
        totalAccuracy += accuracy
        validComparisons++
      }
    }
  })
  
  return validComparisons > 0 ? totalAccuracy / validComparisons : 0
})

const totalPredictions = computed(() => {
  return rawProjectsData.value.filter(project => 
    project.project_prediction?.[0] && project.project_data?.[0]
  ).length
})

const channelPerformance = computed(() => {
  const channelMetrics = new Map<string, { totalClicks: number, totalBudget: number }>()
  
  rawProjectsData.value.forEach(project => {
    const prediction = project.project_prediction?.[0]
    if (prediction?.channel_name && prediction?.clicks && prediction?.approved_budget) {
      const channel = prediction.channel_name
      const clicks = Number(prediction.clicks) || 0
      const budget = Number(prediction.approved_budget) || 1
      
      if (!channelMetrics.has(channel)) {
        channelMetrics.set(channel, { totalClicks: 0, totalBudget: 0 })
      }
      
      const metrics = channelMetrics.get(channel)!
      metrics.totalClicks += clicks
      metrics.totalBudget += budget
    }
  })
  
  return Array.from(channelMetrics.entries()).map(([label, metrics]) => ({
    label,
    value: metrics.totalBudget > 0 ? (metrics.totalClicks / metrics.totalBudget * 1000) : 0,
    color: getChannelColor(label)
  })).sort((a, b) => b.value - a.value)
})

const weekdayTrends = computed(() => {
  const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const weekdayClicks = new Map<string, { total: number, count: number }>()
  
  weekdays.forEach(day => {
    weekdayClicks.set(day, { total: 0, count: 0 })
  })
  
  rawProjectsData.value.forEach(project => {
    const prediction = project.project_prediction?.[0]
    if (prediction?.clicks && prediction?.week_day !== undefined) {
      const dayIndex = Number(prediction.week_day) % 7
      const dayName = weekdays[dayIndex]
      const clicks = Number(prediction.clicks) || 0
      
      const metrics = weekdayClicks.get(dayName)!
      metrics.total += clicks
      metrics.count += 1
    }
  })
  
  return weekdays.map(day => {
    const metrics = weekdayClicks.get(day)!
    return {
      label: day,
      value: metrics.count > 0 ? metrics.total / metrics.count : 0,
      color: getDayColor(day)
    }
  })
})

function getChannelColor(channel: string): string {
  const colors = {
    'Google Ads': '#4285f4',
    'Facebook': '#1877f2',
    'Instagram': '#e4405f',
    'LinkedIn': '#0077b5',
    'Twitter': '#1da1f2',
    'Email': '#34a853',
    'Display': '#ff6d01',
    'Video': '#ff0000'
  }
  return colors[channel as keyof typeof colors] || '#6366f1'
}

function getDayColor(day: string): string {
  const colors = {
    'Lunes': '#3B82F6',
    'Martes': '#10B981',
    'Miércoles': '#F59E0B',
    'Jueves': '#EF4444',
    'Viernes': '#8B5CF6',
    'Sábado': '#06B6D4',
    'Domingo': '#F97316'
  }
  return colors[day as keyof typeof colors] || '#6366f1'
}

onMounted(async () => {
  try {
    const statsRes = await apiRequest<any>({key:"stats.listar"})
    if (!statsRes.success) throw new Error('Error loading stats')
    
    const data = statsRes.data;
    totalCampaigns.value = data.totalCampaigns
    totalApprovedBudget.value = data.totalApprovedBudgetPredicted
    totalImpressions.value = data.totalPredictedImpressions
    totalClicks.value = data.totalPredictedClicks
    chartData.value = data.chartData

    rawProjectsData.value = data.projects || []

    sampleCampaigns.value = data.projects.map((p: any) => {
      const pred = p.project_prediction[0] || {}
      return {
        nombre: p.nombre,
        canal: pred.channel_name || 'N/A',
        presupuesto: Number(pred.approved_budget || 0).toLocaleString(),
        clicks: pred.clicks || 0,
        estado: 'Activa'
      }
    })

    if (rawProjectsData.value.length === 0) {
      try {
        const projectsRes = await apiRequest<any>({key:"project.listar"})
        if (projectsRes.success && projectsRes.data) {
          rawProjectsData.value = projectsRes.data
        }
      } catch (projectErr) {
        
      }
    }

  } catch (err) {
    rawProjectsData.value = [
      {
        nombre: 'Campaña Demo 1',
        project_prediction: [{
          channel_name: 'Google Ads',
          clicks: 1500,
          impressions: 50000,
          approved_budget: 5000,
          week_day: 1
        }],
        project_data: [{
          clicks: 1400,
          impressions: 48000,
          approved_budget: 5000
        }]
      },
      {
        nombre: 'Campaña Demo 2',
        project_prediction: [{
          channel_name: 'Facebook',
          clicks: 800,
          impressions: 30000,
          approved_budget: 3000,
          week_day: 2
        }],
        project_data: [{
          clicks: 850,
          impressions: 32000,
          approved_budget: 3000
        }]
      },
      {
        nombre: 'Campaña Demo 3',
        project_prediction: [{
          channel_name: 'Instagram',
          clicks: 1200,
          impressions: 40000,
          approved_budget: 4000,
          week_day: 5
        }],
        project_data: [{
          clicks: 1180,
          impressions: 39500,
          approved_budget: 4000
        }]
      }
    ]
  }
})

const handleRefreshCampaigns = async () => {
  try {
    const statsRes = await apiRequest<any>({key:"stats.listar"})
    if (statsRes.success) {
      const data = statsRes.data;
      sampleCampaigns.value = data.projects.map((p: any) => {
        const pred = p.project_prediction[0] || {}
        return {
          nombre: p.nombre,
          canal: pred.channel_name || 'N/A',
          presupuesto: Number(pred.approved_budget || 0).toLocaleString(),
          clicks: pred.clicks || 0,
          estado: 'Activa'
        }
      })
    }
  } catch (err) {
    
  }
}

const handleGenerateReport = async () => {
  const dashboardData = {
    totalCampaigns: totalCampaigns.value,
    totalApprovedBudget: totalApprovedBudget.value,
    totalImpressions: totalImpressions.value,
    totalClicks: totalClicks.value,
    campaigns: sampleCampaigns.value,
    chartData: chartData.value,
    predictionAccuracy: predictionAccuracy.value,
    channelDistribution: channelDistribution.value,
    channelPerformance: channelPerformance.value,
    weekdayTrends: weekdayTrends.value
  }

  const result = await generateReport(dashboardData)
  
  if (result.success) {
    showToast('success', 'Reporte Generado', 'El reporte PDF se ha descargado correctamente')
  } else {
    showToast('error', 'Error al Generar Reporte', result.message)
  }
}

const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
  toastState.value = {
    show: true,
    type,
    title,
    message
  }
}
</script>
