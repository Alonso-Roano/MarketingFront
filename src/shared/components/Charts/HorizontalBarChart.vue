<template>
  <div>
    <div class="mb-4">
      <div class="flex items-center gap-3 mb-2">
        <slot name="icon"></slot>
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      </div>
      <p class="text-sm text-gray-400 mb-4">{{ description }}</p>
    </div>
    <div class="h-80">
      <Bar :data="chartDataConfig" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface BarDataItem {
  label: string
  value: number
  color?: string
}

const props = defineProps<{
  data: BarDataItem[]
  title: string
  description: string
  dataLabel?: string
}>()

const chartDataConfig = computed(() => ({
  labels: props.data.map(item => item.label),
  datasets: [{
    label: props.dataLabel || 'Valor',
    data: props.data.map(item => item.value),
    backgroundColor: props.data.map(item => item.color || '#3B82F6'),
    borderColor: props.data.map(item => item.color || '#2563EB'),
    borderWidth: 1
  }]
}))

const chartOptions = {
  indexAxis: 'y' as const, // Hace que sea horizontal
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
        label: (ctx: any) => {
          return `${ctx.dataset.label}: ${ctx.parsed.x.toLocaleString()}`
        }
      }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    },
    y: {
      ticks: {
        color: '#ccc'
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    }
  }
}
</script> 