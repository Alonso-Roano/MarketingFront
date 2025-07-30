<template>
  <div
    :class="[
      'p-5 rounded-xl text-center transition-all hover:scale-105 backdrop-blur-sm',
      colorClasses.bg,
      colorClasses.text
    ]"
  >
    <div class="text-3xl mb-2 cursor-default pointer-events-none select-none">
      <component :is="icon" v-if="typeof icon !== 'string'" class="w-8 h-8 mx-auto" />
      <span v-else>{{ icon }}</span>
    </div>
    <h3 class="text-sm font-semibold">{{ title }}</h3>
    <p class="text-2xl text-white font-bold mt-1">{{ value }}</p>
    <p v-if="description" class="text-xs mt-1 opacity-70">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string | number
  icon: string | any
  description?: string
  type?: 'success' | 'warning' | 'danger' | 'neutral'
}>()

const type = props.type || 'neutral'

const colorMap = {
  success: { bg: 'bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border border-emerald-700/30', text: 'text-emerald-400' },
  warning: { bg: 'bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-700/30', text: 'text-amber-400' },
  danger: { bg: 'bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/30', text: 'text-red-400' },
  neutral: { bg: 'bg-gradient-to-br from-slate-800/40 to-slate-700/30 border border-slate-600/30', text: 'text-slate-300' }
}

const colorClasses = colorMap[type]
</script>
