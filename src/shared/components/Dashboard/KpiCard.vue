<template>
  <div
    :class="[
      'p-4 rounded-lg shadow-md text-center transition-all',
      colorClasses.bg,
      colorClasses.text
    ]"
  >
    <div class="text-3xl mb-2">{{ icon }}</div>
    <h3 class="text-sm font-semibold">{{ title }}</h3>
    <p class="text-2xl font-bold mt-1">{{ value }}</p>
    <p v-if="description" class="text-xs mt-1 opacity-70">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string | number
  icon: string
  description?: string
  type?: 'success' | 'warning' | 'danger' | 'neutral'
}>()

const type = props.type || 'neutral'

const colorMap = {
  success: { bg: 'bg-green-900', text: 'text-green-300' },
  warning: { bg: 'bg-yellow-900', text: 'text-yellow-300' },
  danger: { bg: 'bg-red-900', text: 'text-red-300' },
  neutral: { bg: 'bg-[#2a2a2a]', text: 'text-white' }
}

const colorClasses = colorMap[type]
</script>
