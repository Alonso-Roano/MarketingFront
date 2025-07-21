<template>
  <div class="min-h-screen px-6 py-10 bg-black text-white">
    <div class="w-full mx-auto space-y-12 ">
      <!-- Encabezado -->
      <section>
        <h1 class="text-3xl font-bold">Panel de Control</h1>
        <p class="text-gray-400 mt-1">Resumen general de tus campañas de marketing.</p>
      </section>

      <!-- KPIs principales -->
      <section>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Campañas activas"
            :value="totalCampaigns"
            icon="📣"
            type="success"
            description="Actualmente en ejecución"
          />
          <KpiCard
            title="Presupuesto aprobado"
            :value="`$${totalApprovedBudget.toLocaleString()}`"
            icon="💰"
            type="neutral"
            description="Total asignado este mes"
          />
          <KpiCard
            title="Impresiones totales"
            :value="totalImpressions.toLocaleString()"
            icon="👁️"
            type="neutral"
            description="Visibilidad alcanzada"
          />
          <KpiCard
            title="Clicks predichos"
            :value="totalClicks.toLocaleString()"
            icon="📈"
            type="warning"
            description="Interacciones esperadas"
          />
        </div>
      </section>

      <!-- Gráfico + Herramientas en 2 columnas -->
      <section class="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <!-- Gráfico (2/3) -->
        <div class="lg:col-span-2 bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
          <h2 class="text-lg font-semibold mb-4">Predicción vs Realidad</h2>
          <div class=" w-full">
            <LineChart :data="chartData" />
          </div>
        </div>

      </section>

      <!-- Tabla de campañas recientes -->
      <section class="bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-4">Campañas recientes</h2>
        <table class="w-full text-left table-auto text-sm">
          <thead class="text-gray-400 border-b border-gray-600">
            <tr>
              <th class="py-2">Nombre</th>
              <th class="py-2">Canal</th>
              <th class="py-2">Presupuesto</th>
              <th class="py-2">Clicks</th>
              <th class="py-2">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="(campaign, i) in sampleCampaigns" :key="i">
              <td class="py-3">{{ campaign.nombre }}</td>
              <td class="py-3">{{ campaign.canal }}</td>
              <td class="py-3">${{ campaign.presupuesto }}</td>
              <td class="py-3">{{ campaign.clicks }}</td>
              <td class="py-3">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    campaign.estado === 'Activa'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-500 text-white'
                  ]"
                >
                  {{ campaign.estado }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import KpiCard from '@/shared/components/Dashboard/KpiCard.vue'
import LineChart from '@shared/components/Charts/LineChart.vue'
import { apiRequest } from '@/core/api/apiClient'

const totalCampaigns = ref(0)
const totalApprovedBudget = ref(0)
const totalImpressions = ref(0)
const totalClicks = ref(0)
const chartData = ref([])
const sampleCampaigns = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await apiRequest<any>({key:"stats.listar"})
    if (!res.success) throw new Error()
    const data = res.data;
    totalCampaigns.value = data.totalCampaigns
    totalApprovedBudget.value = data.totalApprovedBudgetPredicted
    totalImpressions.value = data.totalPredictedImpressions
    totalClicks.value = data.totalPredictedClicks
    chartData.value = data.chartData

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
  } catch (err) {
    console.error('Error al cargar dashboard:', err)
  }
})
</script>
