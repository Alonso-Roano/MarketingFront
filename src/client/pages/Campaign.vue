<template>
  <div class="min-h-screen px-6 py-10 bg-black text-white">
    <!-- Encabezado -->
    <div class="max-w-7xl mx-auto">
      <div class="mb-10">
        <h1 class="text-3xl font-bold tracking-tight">Campañas de Marketing</h1>
        <p class="text-gray-400 mt-2">Aquí puedes gestionar tus campañas activas o crear nuevas.</p>
      </div>

      <!-- Grid de campañas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-7xl">
        <!-- Si hay campañas -->
        <template v-if="campaigns.length > 0">
          <div
            v-for="(campaign, i) in campaigns"
            :key="i"
            class="bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          >
            <h2 class="text-xl font-semibold mb-2">{{ campaign.title }}</h2>
            <p class="text-sm text-gray-400 mb-4">{{ campaign.description }}</p>
            <button
              class="mt-auto px-4 py-2 rounded-md text-sm bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Ver detalles
            </button>
          </div>

          <!-- Card para añadir nueva campaña -->
          <div
            class="flex items-center justify-center border-2 border-dashed border-gray-700 rounded-xl hover:border-purple-500 hover:shadow-purple-500/20 transition-all cursor-pointer"
          >
            <button
              class="flex items-center gap-2 px-6 py-4 text-sm font-medium bg-black text-white rounded-md shadow-md transition cursor-pointer"
            >
              <span class="pi pi-plus text-purple-400"></span>
              Crear nueva campaña
            </button>
          </div>
        </template>

        <!-- Si no hay campañas -->
        <template v-else>
          <div
            class="col-span-full flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-700 rounded-xl p-10 w-7xl"
          >
            <span class="pi pi-info-circle text-3xl text-purple-400 mb-4" />
            <h2 class="text-lg font-semibold mb-2">Aún no hay campañas activas</h2>
            <p class="text-gray-400 mb-4">
              Empieza creando tu primera campaña personalizada para comenzar a captar clientes.
            </p>
            <button
              class="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-lg transition"
            >
              <span class="pi pi-plus" />
              Crear nueva campaña
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const campaigns = ref([
   { title: 'Black Friday', description: 'Campaña para promoción de descuentos.' },
   { title: 'Lanzamiento App', description: 'Difusión de la nueva app móvil.' },
])
</script>

<style scoped>

</style>
