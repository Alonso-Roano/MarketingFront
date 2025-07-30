<template>
  <div>
    <div class="mb-4">
      <div class="flex items-center gap-3 mb-2">
        <slot name="icon"></slot>
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      </div>
      <p class="text-sm text-gray-400 mb-4">{{ description }}</p>
    </div>
    <div class="h-64">
      <Doughnut :data="chartDataConfig" :options="chartOptions" />
    </div>
    <div class="text-center mt-4">
      <div class="text-3xl font-bold" :class="getAccuracyColor(accuracy)">
        {{ accuracy.toFixed(1) }}%
      </div>
      <div class="text-sm text-gray-400 mt-1">
        {{ getAccuracyLabel(accuracy) }}
      </div>
      <div class="text-xs text-gray-500 mt-2">
        Basado en {{ totalPredictions }} predicciones comparadas con datos reales
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  accuracy: number // Porcentaje de precisión (0-100)
  title: string
  description: string
  totalPredictions: number
}>()

const chartDataConfig = computed(() => ({
  labels: ['Precisión', 'Error'],
  datasets: [{
    data: [props.accuracy, 100 - props.accuracy],
    backgroundColor: [
      getAccuracyHexColor(props.accuracy),
      '#374151'
    ],
    borderWidth: 0,
    cutout: '75%'
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  }
}

function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 90) return 'text-green-400'
  if (accuracy >= 75) return 'text-yellow-400'
  if (accuracy >= 50) return 'text-orange-400'
  return 'text-red-400'
}

function getAccuracyHexColor(accuracy: number): string {
  if (accuracy >= 90) return '#4ade80'
  if (accuracy >= 75) return '#facc15'
  if (accuracy >= 50) return '#fb923c'
  return '#f87171'
}

function getAccuracyLabel(accuracy: number): string {
  if (accuracy >= 90) return 'Excelente precisión'
  if (accuracy >= 75) return 'Buena precisión'
  if (accuracy >= 50) return 'Precisión moderada'
  return 'Necesita mejoras'
}
</script> 