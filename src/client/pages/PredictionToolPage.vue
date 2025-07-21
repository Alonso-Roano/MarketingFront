<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
    <!-- Elementos decorativos de fondo -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none"></div>
    
    <!-- Partículas flotantes -->
    <div class="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
    <div class="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping opacity-40"></div>
    <div class="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-30"></div>
    <div class="absolute bottom-20 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>
    
    <!-- Contenido principal -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 py-12">
      <!-- Header con efecto glassmorphism -->
      <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">
        <div class="text-center">
          <!-- Icono futurista -->
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          
          <!-- Título principal -->
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent mb-4 tracking-tight">
            Predicción de Marketing
          </h1>
          <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-6 rounded-full"></div>
          
          <!-- Subtítulo -->
          <p class="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Utiliza inteligencia artificial avanzada para generar predicciones precisas 
            y optimizar tus estrategias de marketing digital
          </p>
        </div>
      </div>
      
      <!-- Contenedor del formulario -->
      <div>
        <!-- Indicadores de estado -->
        <div class="flex items-center justify-center mb-8">
          <div class="flex space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-sm text-gray-400">Sistema Activo</span>
            </div>
            <div class="w-px h-4 bg-gray-600"></div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span class="text-sm text-gray-400">IA Conectada</span>
            </div>
            <div class="w-px h-4 bg-gray-600"></div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span class="text-sm text-gray-400">Modelo Listo</span>
            </div>
          </div>
        </div>
        
        <!-- Componente del formulario -->
        <PredictionForm />
      </div>
      
      <!-- Footer con estadísticas -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
          <div class="text-2xl font-bold text-purple-400 mb-2">99.2%</div>
          <div class="text-sm text-gray-400">Precisión del Modelo</div>
        </div>
        <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
          <div class="text-2xl font-bold text-indigo-400 mb-2">< 0.5s</div>
          <div class="text-sm text-gray-400">Tiempo de Respuesta</div>
        </div>
        <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
          <div class="text-2xl font-bold text-cyan-400 mb-2">24/7</div>
          <div class="text-sm text-gray-400">Disponibilidad</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PredictionForm from '@/shared/components/form/PredictionForm.vue';
</script>

<style scoped>
/* Animaciones personalizadas adicionales */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Efecto de brillo en hover */
.hover\:shadow-purple-500\/10:hover {
  box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.1);
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}
</style>