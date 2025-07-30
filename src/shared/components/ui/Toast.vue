<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="transform translate-x-full opacity-0"
    enter-to-class="transform translate-x-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="transform translate-x-0 opacity-100"
    leave-to-class="transform translate-x-full opacity-0"
  >
    <div
      v-if="show"
      :class="[
        'fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border max-w-sm',
        typeClasses
      ]"
    >
      <component :is="icon" class="h-5 w-5 flex-shrink-0" />
      <div class="flex-1">
        <p class="text-sm font-medium">{{ title }}</p>
        <p v-if="message" class="text-xs opacity-90 mt-1">{{ message }}</p>
      </div>
      <button
        @click="close"
        class="p-1 hover:bg-black/10 rounded transition-colors"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { CheckCircle, AlertCircle, X, Info } from 'lucide-vue-next'

const props = defineProps<{
  show: boolean
  type?: 'success' | 'error' | 'info'
  title: string
  message?: string
  duration?: number
}>()

const emit = defineEmits<{
  close: []
}>()

const icon = computed(() => {
  switch (props.type) {
    case 'success': return CheckCircle
    case 'error': return AlertCircle
    case 'info': return Info
    default: return Info
  }
})

const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-emerald-50 border-emerald-200 text-emerald-800'
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800'
    case 'info':
      return 'bg-blue-50 border-blue-200 text-blue-800'
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800'
  }
})

const close = () => {
  emit('close')
}

onMounted(() => {
  if (props.duration && props.duration > 0) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script> 