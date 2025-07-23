<template>
    <div>
        <!-- Elementos decorativos de fondo -->



        <!-- Partículas flotantes -->
        <!-- <div class="absolute top-20 left-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse opacity-60"></div> -->
        <div class="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping opacity-40"></div>
        <div class="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-30"></div>
        <div class="absolute bottom-20 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>

        <!-- Contenido principal -->
        <div>

            <!-- Contenedor del formulario -->
            <div
                class="backdrop-blur-3xl bg-black/35 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">

                <!-- Formulario  -->
                <form @submit.prevent="submitForm" class="space-y-8">
                    <!-- Advertencia de token -->
                    <div v-if="!hasAuthToken"
                        class="backdrop-blur-xl bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center">
                        <div class="flex items-center justify-center space-x-2">
                            <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                                </path>
                            </svg>
                            <span class="text-amber-300 font-medium">No se encontró un token de autenticación. Asegúrate
                                de haber iniciado sesión.</span>
                        </div>
                    </div>

                    <!-- Campos adicionales requeridos por el JSON -->
                    <div class="space-y-6">
                        <div class="flex items-center space-x-3 mb-6">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                                0
                            </div>
                            <h3 class="text-xl font-semibold text-white">Informacion de la campaña</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label for="nombre" class="block text-sm font-medium text-gray-300">Nombre</label>
                                <input id="nombre" v-model="userFriendlyData.nombre" type="text"
                                    placeholder="Ej: Campaña Invierno"
                                    class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300" />
                            </div>
                            <div class="space-y-2">
                                <label for="description"
                                    class="block text-sm font-medium text-gray-300">Descripción</label>
                                <textarea id="description" v-model="userFriendlyData.description" type="text"
                                    placeholder="Campaña enfocada en..."
                                    class="w-full p-3 rounded-xl resize-none bg-white/5 border border-white/10 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300" />
                            </div>
                            
                            <!-- Tamaño -->
                            <div class="space-y-2 relative" ref="sizeDropdownRef">
                                <label for="size" class="block text-sm font-medium text-gray-300">Tamaño</label>
                                <div @click="sizeDropdownOpen = !sizeDropdownOpen"
                                    class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 backdrop-blur-sm cursor-pointer flex items-center justify-between">
                                    <span>{{ userFriendlyData.size || 'Selecciona un tamaño' }}</span>
                                    <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <ul v-if="sizeDropdownOpen"
                                    class="absolute z-50 w-full  rounded-xl bg-black/80 border border-white/10 backdrop-blur-lg shadow-lg py-2">
                                    <li v-for="option in sizeOptions" :key="option" @click="selectSize(option)"
                                        class="flex items-center px-4 py-2 cursor-pointer hover:bg-purple-500/10 transition-all duration-200 text-white space-x-2">
                                        {{ option }}
                                    </li>
                                </ul>
                            </div>

                            <!-- Alcance -->
                            <div class="space-y-2 relative" ref="scopeDropdownRef">
                                <label for="scope" class="block text-sm font-medium text-gray-300">Alcance</label>
                                <div @click="scopeDropdownOpen = !scopeDropdownOpen"
                                    class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 backdrop-blur-sm cursor-pointer flex items-center justify-between">
                                    <span>{{ userFriendlyData.scope || 'Selecciona un alcance' }}</span>
                                    <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <ul v-if="scopeDropdownOpen"
                                    class="absolute z-50 w-full  rounded-xl bg-black/80 border border-white/10 backdrop-blur-lg shadow-lg py-2">
                                    <li v-for="option in scopeOptions" :key="option" @click="selectScope(option)"
                                        class="flex items-center px-4 py-2 cursor-pointer hover:bg-purple-500/10 transition-all duration-200 text-white space-x-2">
                                        {{ option }}
                                    </li>
                                </ul>
                            </div>

                            <!-- Industria -->
                            <div class="space-y-2 relative" ref="industryDropdownRef">
                                <label for="industry" class="block text-sm font-medium text-gray-300">Industria</label>
                                <div @click="industryDropdownOpen = !industryDropdownOpen"
                                    class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 backdrop-blur-sm cursor-pointer flex items-center justify-between">
                                    <span>{{ userFriendlyData.industry || 'Selecciona una industria' }}</span>
                                    <svg class="w-4 h-4 text-white/50" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <ul v-if="industryDropdownOpen"
                                    class="absolute z-50 w-full  rounded-xl bg-black/80 border border-white/10 backdrop-blur-lg shadow-lg py-2">
                                    <li v-for="option in industryOptions" :key="option" @click="selectIndustry(option)"
                                        class="flex items-center px-4 py-2 cursor-pointer hover:bg-purple-500/10 transition-all duration-200 text-white space-x-2">
                                        {{ option }}
                                    </li>
                                </ul>
                            </div>
                            <div class="space-y-2 relative" ref="dropdownRef">
                                <label for="icono" class="block text-sm font-medium text-gray-300">Ícono</label>

                                <!-- Botón de selección -->
                                <button type="button" @click="iconDropdownOpen = !iconDropdownOpen"
                                    class="w-full p-3 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white">
                                    <div class="flex items-center space-x-2">
                                        <i :class="userFriendlyData.icono" class="text-xl"
                                            v-if="userFriendlyData.icono"></i>
                                        <span>{{ selectedIconLabel || 'Selecciona un ícono' }}</span>
                                    </div>
                                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <!-- Lista de opciones -->
                                <ul v-if="iconDropdownOpen"
                                    class="absolute z-50 max-h-60 w-full overflow-y-auto rounded-xl bg-black/80 border border-white/10 backdrop-blur-lg shadow-lg">
                                    <li v-for="icon in iconOptions" :key="icon.class" @click="selectIcon(icon)"
                                        class="flex items-center px-4 py-2 cursor-pointer hover:bg-purple-500/10 transition-all duration-200 text-white space-x-2">
                                        <i :class="icon.class" class="text-xl" />
                                        <span>{{ icon.label }}</span>
                                    </li>
                                </ul>
                            </div>

                            <div class="space-y-2 relative" ref="colorDropdownRef">
                                <label for="primary_color" class="block text-sm font-medium text-gray-300">Color
                                    Primario</label>

                                <div class="relative">
                                    <div @click="colorDropdownOpen = !colorDropdownOpen"
                                        class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 cursor-pointer flex items-center justify-between">
                                        <div class="flex items-center space-x-2">
                                            <div :style="{ backgroundColor: userFriendlyData.primary_color }"
                                                class="w-5 h-5 rounded-full border border-white/20"></div>
                                            <span>{{ userFriendlyData.primary_color || 'Selecciona un color' }}</span>
                                        </div>
                                        <svg class="w-4 h-4 text-white opacity-50" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    <!-- Dropdown -->
                                    <div v-if="colorDropdownOpen"
                                        class="absolute z-50 mt-2 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-xl shadow-lg grid grid-cols-5 gap-2 p-3">
                                        <div v-for="color in neonColorOptions" :key="color"
                                            @click="userFriendlyData.primary_color = color; colorDropdownOpen = false"
                                            :style="{ backgroundColor: color }"
                                            class="w-8 h-8 rounded-full cursor-pointer border-2 border-white/10 hover:scale-110 transition transform ring-2 ring-transparent"
                                            :class="{ 'ring-white/50': userFriendlyData.primary_color === color }">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Sección 1: Detalles de la Campaña -->
                    <div class="space-y-6">
                        <div class="flex items-center space-x-3 mb-6">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                                1</div>
                            <h3 class="text-xl font-semibold text-white">Detalles de la Campaña</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label for="campaign_duration" class="block text-sm font-medium text-gray-300">
                                    Duración de la Campaña (días)
                                </label>
                                <input type="number" id="campaign_duration" v-model.number="userFriendlyData.no_of_days"
                                    required
                                    class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                                    placeholder="Ej: 30" min="1" />
                            </div>

                            <div class="space-y-2">
                                <label for="campaign_budget" class="block text-sm font-medium text-gray-300">
                                    Presupuesto Aprobado ($)
                                </label>
                                <input type="number" id="campaign_budget"
                                    v-model.number="userFriendlyData.approved_budget" required
                                    class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                                    placeholder="Ej: 10000" min="0" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label for="past_clicks" class="block text-sm font-medium text-gray-300">
                                    Clics (histórico o estimado)
                                </label>
                                <input type="number" id="past_clicks" v-model.number="userFriendlyData.clicks" required
                                    class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                                    placeholder="Ej: 500" min="0" />
                            </div>

                            <div class="space-y-2">
                                <label for="past_impressions" class="block text-sm font-medium text-gray-300">
                                    Impresiones (histórico o estimado)
                                </label>
                                <input type="number" id="past_impressions" v-model.number="userFriendlyData.impressions"
                                    required
                                    class="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                                    placeholder="Ej: 10000" min="0" />
                            </div>
                        </div>
                    </div>

                    <!-- Sección 2: Plataforma Publicitaria -->
                    <div class="space-y-6">
                        <div class="flex items-center space-x-3 mb-6">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                                2</div>
                            <h3 class="text-xl font-semibold text-white">Plataforma Publicitaria</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div v-for="service in externalServiceOptions" :key="service.value"
                                class="relative cursor-pointer group">
                                <input type="radio" :id="`service-${service.value}`" :value="service.value"
                                    v-model.number="userFriendlyData.selected_ext_service" class="sr-only" />
                                <label :for="`service-${service.value}`"
                                    class="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group-hover:bg-white/10"
                                    :class="{ 'border-purple-500 bg-purple-500/10': userFriendlyData.selected_ext_service === service.value }">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
                                            :class="{ 'border-purple-500': userFriendlyData.selected_ext_service === service.value }">
                                            <div v-if="userFriendlyData.selected_ext_service === service.value"
                                                class="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        </div>
                                        <span class="text-gray-200 font-medium">{{ service.label }}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 3: Canales de Marketing -->
                    <div class="space-y-6">
                        <div class="flex items-center space-x-3 mb-6">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                                3</div>
                            <h3 class="text-xl font-semibold text-white">Canales de Marketing</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div v-for="channel in channelOptions" :key="channel.value"
                                class="relative cursor-pointer group">
                                <input type="radio" :id="`channel-${channel.value}`" :value="channel.value"
                                    v-model.number="userFriendlyData.selected_channel" class="sr-only" />
                                <label :for="`channel-${channel.value}`"
                                    class="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group-hover:bg-white/10"
                                    :class="{ 'border-purple-500 bg-purple-500/10': userFriendlyData.selected_channel === channel.value }">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
                                            :class="{ 'border-purple-500': userFriendlyData.selected_channel === channel.value }">
                                            <div v-if="userFriendlyData.selected_channel === channel.value"
                                                class="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        </div>
                                        <span class="text-gray-200 font-medium">{{ channel.label }}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Sección 4: Momento de la Semana -->
                    <div class="space-y-6">
                        <div class="flex items-center space-x-3 mb-6">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                                4</div>
                            <h3 class="text-xl font-semibold text-white">Momento de la Semana</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div v-for="weekday in weekdayOptions" :key="weekday.value"
                                class="relative cursor-pointer group">
                                <input type="radio" :id="`weekday-${weekday.value}`" :value="weekday.value"
                                    v-model.number="userFriendlyData.selected_weekday_cat" class="sr-only" />
                                <label :for="`weekday-${weekday.value}`"
                                    class="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group-hover:bg-white/10"
                                    :class="{ 'border-purple-500 bg-purple-500/10': userFriendlyData.selected_weekday_cat === weekday.value }">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center"
                                            :class="{ 'border-purple-500': userFriendlyData.selected_weekday_cat === weekday.value }">
                                            <div v-if="userFriendlyData.selected_weekday_cat === weekday.value"
                                                class="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        </div>
                                        <span class="text-gray-200 font-medium">{{ weekday.label }}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Botón de envío -->
                    <div class="pt-6">
                        <button type="submit" :disabled="loading || !hasAuthToken"
                            class="w-full bg-white/90 hover:bg-white/80 text-black  font-bold py-4 px-6 rounded-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform  cursor-pointer select-none shadow-lg hover:shadow-white/25">
                            <div class="flex items-center justify-center space-x-2">
                                <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                    </path>
                                </svg>
                                <span>{{ loading ? currentLoadingMessage : 'Generar Campaña' }}</span>
                            </div>
                        </button>
                    </div>

                    <!-- Mensajes de error -->
                    <div v-if="error"
                        class="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
                        <div class="flex items-center justify-center space-x-2">
                            <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-red-300">{{ error }}</span>
                        </div>
                    </div>

                    <!-- Mensaje de éxito -->
                    <div v-if="successMessage"
                        class="backdrop-blur-xl bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
                        <div class="flex items-center justify-center space-x-2 mb-2">
                            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-green-300 font-medium">{{ successMessage }}</span>
                        </div>
                        <p class="text-green-200 text-sm">Las predicciones se han guardado en tu navegador
                            (localStorage).</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDropdowns } from '@client/services/formService';

const {
  userFriendlyData,
  iconDropdownOpen,
  iconOptions,
  selectedIconLabel,
  selectIcon,
  dropdownRef,

  sizeOptions,
  scopeOptions,
  industryOptions,

  sizeDropdownOpen,
  scopeDropdownOpen,
  industryDropdownOpen,

  sizeDropdownRef,
  scopeDropdownRef,
  industryDropdownRef,

  selectSize,
  selectScope,
  selectIndustry,

  colorDropdownOpen,
  colorDropdownRef,
  neonColorOptions,
  channelOptions,
  weekdayOptions,
  externalServiceOptions,
  loading,
  error,
  successMessage,
  hasAuthToken,
  submitForm,
  currentLoadingMessage
} = useDropdowns();
</script>

<style scoped>
/* Animaciones personalizadas adicionales */
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
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
