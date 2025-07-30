<template>
  <div>
    <div class="mb-4">
      <label for="metric" class="block mb-1 text-white font-semibold">Selecciona métrica:</label>
      <select id="metric" v-model="selectedMetric" class="p-2 rounded bg-gray-800 text-white">
        <option value="clicks">Clics</option>
        <option value="impressions">Impresiones</option>
        <option value="approved_budget">Presupuesto aprobado</option>
      </select>
    </div>

    <div class="h-72">
      <Line :data="chartDataConfig" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps<{
  data: {
    project_id: string
    nombre: string
    approved_budget: { predicted: number; real: number }
    impressions: { predicted: number; real: number }
    clicks: { predicted: number; real: number }
  }[]
}>()

const selectedMetric = ref<'clicks' | 'impressions' | 'approved_budget'>('clicks')

const chartDataConfig = computed(() => {
  return {
    labels: props.data.map(p => p.nombre),
    datasets: [
      {
        label: `${selectedMetric.value} Predicho`,
        data: props.data.map(p => Number(p[selectedMetric.value].predicted.toFixed(2))),
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
        tension: 0.4,
        fill: false
      },
      {
        label: `${selectedMetric.value} Real`,
        data: props.data.map(p => Number(p[selectedMetric.value].real.toFixed(2))),
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.4,
        fill: false
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#fff'
      }
    },
    tooltip: {
      callbacks: {
        label: (ctx:any) => {
          return `${ctx.dataset.label}: ${ctx.parsed.y}`
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ccc'
      }
    },
    y: {
      ticks: {
        color: '#ccc'
      }
    }
  }
}
</script>

<style scoped>
select {
  outline: none;
  border: 1px solid #444;
}
</style>
