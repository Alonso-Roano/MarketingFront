<template>
  <div class="min-h-screen px-6 py-10 bg-black text-white">
    <div class="w-7xl mx-auto space-y-12">
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
            value="2"
            icon="📣"
            type="success"
            description="Actualmente en ejecución"
          />
          <KpiCard
            title="Presupuesto aprobado"
            value="$8,500.00"
            icon="💰"
            type="neutral"
            description="Total asignado este mes"
          />
          <KpiCard
            title="Impresiones totales"
            value="120,000"
            icon="👁️"
            type="neutral"
            description="Visibilidad alcanzada"
          />
          <KpiCard
            title="CTR promedio"
            value="2.78%"
            icon="📈"
            type="warning"
            description="Ratio de clics por impresión"
          />
        </div>
      </section>

      <!-- Gráfico + Herramientas en 2 columnas -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Gráfico (2/3) -->
        <div class="lg:col-span-2 bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
          <h2 class="text-lg font-semibold mb-4">Predicción vs Realidad</h2>
          <div class="h-64 w-full bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 italic">
            (Aquí iría una gráfica de rendimiento...)
          </div>
        </div>

        <!-- Herramientas IA (1/3) -->
        <div class="bg-gradient-to-br from-purple-700 to-purple-900 p-6 rounded-lg shadow-lg text-white flex items-center justify-center text-center">
          <div>
            <h2 class="text-lg font-semibold mb-4">Herramientas Inteligentes</h2>
            <p class="mb-6 text-sm opacity-90">Genera automáticamente misión, visión y recomendaciones para tus campañas.</p>
            <button
              class="px-6 py-3 bg-white text-purple-700 font-semibold rounded-md hover:bg-gray-100 transition cursor-pointer"
            >
              Generar con IA  <span class=" p-1 pi pi-sparkles" />
            </button>
            
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
import KpiCard from '@/shared/components/Dashboard/KpiCard.vue'

const sampleCampaigns = [
  { nombre: 'Black Friday 2024', canal: 'Instagram', presupuesto: 2500, clicks: 680, estado: 'Activa' },
  { nombre: 'Lanzamiento App', canal: 'YouTube', presupuesto: 1800, clicks: 430, estado: 'Activa' },
  { nombre: 'Campaña Primavera', canal: 'Google Ads', presupuesto: 1200, clicks: 210, estado: 'Finalizada' },
]
</script>
