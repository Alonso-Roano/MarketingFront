<template>
  <div class="w-full grid grid-cols-2 gap-4 h-[600px]">
    <div v-for="(label, i) in labels" :key="label" class="h-48">
      <Bar :data="getChartData(i)" :options="chartOptions" />
      <p class="text-center mt-2 text-gray-300">{{ label }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{ project: any }>()

const labels = ['Presupuesto', 'Clics', 'Impresiones', 'Días']

// Extraemos los datos predichos y reales, por índice
const predictedData = computed(() => [
  props.project.project_prediction[0]?.approved_budget || 0,
  props.project.project_prediction[0]?.clicks || 0,
  props.project.project_prediction[0]?.impressions || 0,
  props.project.project_prediction[0]?.no_of_days || 0
])

const realData = computed(() => [
  props.project.project_data[0]?.approved_budget || 0,
  props.project.project_data[0]?.clicks || 0,
  props.project.project_data[0]?.impressions || 0,
  props.project.project_data[0]?.no_of_days || 0
])

// Para cada índice devolvemos un objeto data distinto para un gráfico individual
const getChartData = (index: number) => ({
  labels: [labels[index]],
  datasets: [
    {
      label: 'Predicho',
      backgroundColor: props.project.primary_color,
      data: [predictedData.value[index]]
    },
    {
      label: 'Real',
      backgroundColor: '#a1a1aa',
      data: [realData.value[index]]
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#d4d4d8'
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: '#e4e4e7' },
      grid: { color: 'rgba(255,255,255,0.1)' }
    },
    x: {
      ticks: { color: '#e4e4e7' },
      grid: { color: 'rgba(255,255,255,0.1)' }
    }
  }
}
</script>
