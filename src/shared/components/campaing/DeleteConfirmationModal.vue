<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div class="bg-neutral-800 p-8 rounded-lg shadow-xl text-center border border-neutral-700 min-w-[400px]">
        <!-- Icono de advertencia -->
        <div class="mb-4">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        <h3 class="text-xl font-bold mb-4 text-white">Confirmar Eliminación</h3>
        <p class="text-gray-300 mb-6">
          ¿Estás seguro de que quieres eliminar esta campaña? Esta acción no se puede deshacer.
        </p>
        
        <div class="flex justify-center gap-4">
          <button 
            @click="$emit('confirm')"
            :disabled="isDeleting"
            class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span v-if="isDeleting" class="pi pi-spin pi-spinner"></span>
            {{ isDeleting ? 'Eliminando...' : 'Sí, Eliminar' }}
          </button>
          <button 
            @click="$emit('cancel')"
            :disabled="isDeleting"
            class="px-6 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  isDeleting: boolean
}

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>