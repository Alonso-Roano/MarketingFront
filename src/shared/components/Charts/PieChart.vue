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
      <Pie :data="chartDataConfig" :options="chartOptions" />
    </div>
    <div class="mt-4 text-sm text-gray-300">
      <div class="grid grid-cols-2 gap-2">
        <div v-for="(item, index) in data" :key="index" class="flex items-center">
          <div 
            class="w-3 h-3 rounded-full mr-2" 
            :style="{ backgroundColor: colors[index % colors.length] }"
          ></div>
          <span>{{ item.label }}: {{ item.value.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

interface PieDataItem {
  label: string
  value: number
}

const props = defineProps<{
  data: PieDataItem[]
  title: string
  description: string
}>()

const colors = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#06B6D4', // cyan
  '#F97316', // orange
  '#84CC16', // lime
]

const chartDataConfig = computed(() => ({
  labels: props.data.map(item => item.label),
  datasets: [{
    data: props.data.map(item => item.value),
    backgroundColor: colors.slice(0, props.data.length),
    borderWidth: 2,
    borderColor: '#1f2937'
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Usamos nuestra propia leyenda personalizada
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          const total = ctx.dataset.data.reduce((sum: number, value: number) => sum + value, 0)
          const percentage = ((ctx.parsed / total) * 100).toFixed(1)
          return `${ctx.label}: ${ctx.parsed.toLocaleString()} (${percentage}%)`
        }
      }
    }
  }
}
</script> 