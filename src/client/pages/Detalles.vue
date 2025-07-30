<template>
    <div class="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <!-- Elementos decorativos de fondo -->
        <div class="absolute top-20 left-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse opacity-60"></div>
        <div class="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping opacity-40"></div>
        <div class="absolute bottom-32 left-1/4 w-3 h-3 rounded-full animate-bounce opacity-30"
            :style="{ backgroundColor: project?.primary_color }"></div>
        <div class="absolute bottom-20 right-1/3 w-2 h-2 rounded-full animate-pulse opacity-50"
            :style="{ backgroundColor: project?.primary_color }"></div>

        <!-- Contenedor principal -->
        <div class="max-w-5xl mx-auto">
            <!-- Encabezado del proyecto -->
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        :style="{ backgroundColor: project?.primary_color + '20', color: project?.primary_color, border: `1px solid ${project?.primary_color}50` }">
                        <i :class="project?.icono"></i>
                    </div>
                    <h1 v-if="!loading" class="text-3xl font-bold text-white">{{ project?.nombre }}</h1>
                    <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                </div>
                <router-link to="/campaign"
                    class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    <span>Volver a proyectos</span>
                </router-link>
            </div>
            <!-- Sección: Datos Reales en Grid Avanzado -->
            <div
                class="backdrop-blur-3xl bg-black/35 border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-500 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        :style="{ backgroundColor: project?.primary_color }">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h2l1 2h13l1-2h2M4 14h16v6H4v-6z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-white">Datos ingresados</h3>
                    <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Rubro -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Rubro</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].rubro || 'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Servicio Externo -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Servicio Externo</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].ext_service_name ||'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Canal -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Canal</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].channel_name || 'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Alcance -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Alcance</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].alcance || 'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Tamaño -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Tamaño</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].tamaño || 'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Día de la semana -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Día de la semana</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].weekday_cat || 'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Clicks -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Clics</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].clicks || 'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Impresiones -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Impresiones</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].impressions || 'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Duración -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 col-span-1">
                        <h4 class="text-sm text-gray-400">Duración</h4>
                        <p v-if="!loading" class="text-white text-lg font-semibold">{{ project?.project_data[0].no_of_days || 'N/A' }} días</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Presupuesto (a lo ancho) -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 sm:col-span-2 lg:col-span-3">
                        <h4 class="text-sm text-gray-400">Presupuesto Aprobado</h4>
                        <p v-if="!loading" class="text-white text-2xl font-bold">${{ project?.project_data[0].approved_budget?.toLocaleString() || 'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <!-- Descripción (bloque ancho) -->
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10 sm:col-span-2 lg:col-span-3">
                        <h4 class="text-sm text-gray-400 mb-2">Descripción</h4>
                        <p v-if="!loading" class="text-white text-sm whitespace-pre-line">{{ project?.project_data[0].descripcion ||'N/A' }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>
                </div>
            </div>
            <!-- Tarjeta principal del proyecto -->
            <div
                class="backdrop-blur-3xl bg-black/35 border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-500 mb-8">
                <!-- Resumen del proyecto -->
                <div class="flex items-center space-x-3 mb-6">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        :style="{ backgroundColor: project?.primary_color }">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h2l1 2h13l1-2h2M4 14h16v6H4v-6z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-white">Predicciones hechas por el sistema</h3>
                    <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 class="text-sm font-medium text-gray-300 mb-2">Presupuesto</h3>
                        <p v-if="!loading"  class="text-2xl font-bold text-white">${{ project?.project_prediction[0].approved_budget.toLocaleString() }}</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        <p class="text-xs text-gray-400 mt-1">{{project?.project_prediction[0].interpretacion_approved_budget }}</p>
                    </div>

                    <div class="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 class="text-sm font-medium text-gray-300 mb-2">Duración</h3>
                        <p v-if="!loading"  class="text-2xl font-bold text-white">{{ project?.project_prediction[0].no_of_days }} días</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        <p class="text-xs text-gray-400 mt-1">{{
                            project?.project_prediction[0].interpretacion_no_of_days }}</p>
                    </div>

                    <div class="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 class="text-sm font-medium text-gray-300 mb-2">Canal principal</h3>
                        <p v-if="!loading"  class="text-2xl font-bold text-white">{{ project?.project_prediction[0].channel_name }}</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        <p class="text-xs text-gray-400 mt-1">{{
                            project?.project_prediction[0].interpretacion_channel_name }}</p>
                    </div>
                </div>

                <!-- Sección de Misión y Visión -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center"
                                :style="{ backgroundColor: project?.primary_color + '20', color: project?.primary_color }">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-white">Misión</h3>
                        </div>
                        <p v-if="!loading" class="text-gray-300">{{ project?.project_prediction[0].mision }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>

                    <div class="bg-white/5 rounded-xl p-6 border border-white/10">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center"
                                :style="{ backgroundColor: project?.primary_color + '20', color: project?.primary_color }">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-white">Visión</h3>
                        </div>
                        <p v-if="!loading" class="text-gray-300">{{ project?.project_prediction[0].vision }}</p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>
                </div>

                <!-- Palabras clave -->
                <div class="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center"
                            :style="{ backgroundColor: project?.primary_color + '20', color: project?.primary_color }">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-white">Palabras clave</h3>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="(keyword, index) in project?.project_prediction[0].palabras_clave.split(',')"
                            :key="index" class="px-3 py-1 rounded-full text-sm" :style="{
                                backgroundColor: project?.primary_color + '20',
                                color: project?.primary_color,
                                border: `1px solid ${project?.primary_color}30`
                            }">
                            {{ keyword }}
                        </span>
                        <p v-if="!loading" class="text-xs text-gray-400 mt-2">
                            {{ project?.project_prediction[0].interpretacion_palabras_clave }}
                        </p>
                        <div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    </div>
                </div>

                <!-- Métricas de desempeño -->
                <div class="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div class="flex items-center space-x-3 mb-6">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                            :style="{ backgroundColor: project?.primary_color }">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-white">Métricas de desempeño</h3>
                        <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="space-y-2">
                            <h4 class="text-sm font-medium text-gray-300">Clics estimados</h4>
                            <p v-if="!loading"  class="text-2xl font-bold text-white">{{ project?.project_prediction[0].clicks }}</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                            <p v-if="!loading" class="text-xs text-gray-400">{{ project?.project_prediction[0].interpretacion_clicks }}</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        </div>

                        <div class="space-y-2">
                            <h4 class="text-sm font-medium text-gray-300">Impresiones estimadas</h4>
                            <p v-if="!loading"  class="text-2xl font-bold text-white">{{ project?.project_prediction[0].impressions }}</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                            <p v-if="!loading" class="text-xs text-gray-400">{{project?.project_prediction[0].interpretacion_impressions }}</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        </div>

                        <div class="space-y-2">
                            <h4 class="text-sm font-medium text-gray-300">Costo por medio</h4>
                            <p v-if="!loading"  class="text-2xl font-bold text-white">${{ project?.project_prediction[0].media_cost_usd.toFixed(2) }}</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                            <p v-if="!loading" class="text-xs text-gray-400">{{ project?.project_prediction[0].interpretacion_media_cost_usd }}</p>
<div v-else class="h-6 bg-gray-700 rounded animate-pulse w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Comparativa gráfica: valores reales vs predichos -->
            <div
                class="backdrop-blur-3xl bg-black/35 border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-500 mb-8">
                <div class="flex items-center space-x-3 mb-6">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        :style="{ backgroundColor: project?.primary_color }">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-white">Comparativa visual: Predicho vs Real</h3>
                    <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
                </div>

                <BarChart v-if="project" :project="project" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apiRequest } from '@/core/api/apiClient';
import { useRoute } from 'vue-router';
import BarChart from '@shared/components/Charts/BarChar.vue';


interface ProjectData {
    id: string;
    rubro: string;
    clicks: number;
    alcance: string;
    tamaño: string;
    is_deleted: boolean;
    no_of_days: number;
    project_id: string;
    descripcion: string;
    impressions: number;
    weekday_cat: string;
    channel_name: string;
    media_cost_usd: number;
    approved_budget: number;
    ext_service_name: string;
}

interface ProjectPrediction {
    id: string;
    clicks: number;
    mision: string;
    vision: string;
    is_deleted: boolean;
    no_of_days: number;
    project_id: string;
    impressions: number;
    weekday_cat: string;
    channel_name: string;
    media_cost_usd: number;
    palabras_clave: string;
    approved_budget: number;
    ext_service_name: string;
    interpretacion_clicks: string;
    interpretacion_no_of_days: string;
    interpretacion_impressions: string;
    interpretacion_weekday_cat: string;
    interpretacion_channel_name: string;
    interpretacion_media_cost_usd: string;
    interpretacion_palabras_clave: string;
    interpretacion_approved_budget: string;
    interpretacion_ext_service_name: string;
}

interface Project {
    id: string;
    nombre: string;
    icono: string;
    primary_color: string;
    user_id: string;
    is_deleted: boolean;
    project_data: ProjectData[];
    project_prediction: ProjectPrediction[];
}

const route = useRoute();
const project = ref<Project | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const fetchProject = async () => {
    try {
        loading.value = true;
        error.value = null;

        const response = await apiRequest<any>({
            key: "project.obtener",
            params: { id: route.params.id }
        });

        if (response.success && response.data) {
            project.value = {
                id: response.data.id,
                nombre: response.data.nombre,
                icono: response.data.icono,
                primary_color: response.data.primary_color || '#7c3aed', // Color por defecto si no viene
                user_id: response.data.user_id,
                is_deleted: response.data.is_deleted,
                project_data: response.data.project_data || [],
                project_prediction: response.data.project_prediction || []
            };
        } else {
            throw new Error(response.message || 'No se pudo obtener el proyecto');
        }
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Error desconocido al cargar el proyecto';
        console.error('Error fetching project:', err);
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await fetchProject();
});
</script>

<style scoped>
/* Animaciones y estilos personalizados */
.backdrop-blur-3xl {
    backdrop-filter: blur(24px);
}

.backdrop-blur-xl {
    backdrop-filter: blur(12px);
}
</style>