<template>
  <div class="min-h-screen         relative overflow-hidden">
    <!-- Elementos decorativos de fondo -->
  
   
    
    <!-- Partículas flotantes -->
    <div class="absolute top-20 left-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse "></div>
    <div class="absolute  top-40 right-20 w-1 h-1 bg-white rounded-full 
 animate-[ping_2s_cubic-bezier(0,_0,_0.2,_1)_infinite]
    ">

  </div>
    <div class="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-30"></div>
    <div class="absolute bottom-20 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>  
    
    <!-- Contenido principal -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 py-12">
   
      <!-- <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">
        <div class="text-center">
      
          <div class="inline-flex items-center justify-center w-16 h-16      bg-black/26  border-[0.3px] border-neutral-700 rounded-2xl mb-6 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          
         
          <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-white py-2 bg-clip-text text-transparent mb-4 tracking-tight">
            Predicción de Marketing
          </h1>
          <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-6 rounded-full"></div>
          
     
          <p class="text-md tracking-wider text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Utiliza inteligencia artificial avanzada para generar predicciones precisas 
            y optimizar tus estrategias de marketing digital
          </p>
        </div>
      </div> -->
      
      <!-- Contenedor del formulario -->
      <div>
        <!-- Indicadores de estado -->
        <!-- <div class="flex items-center justify-center mb-8">
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
        </div> -->
        
        <!-- Componente del formulario -->
        <PredictionForm />
      </div>
      
      
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import PredictionForm from '@/shared/components/Form/PredictionForm.vue';
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