<template>
    <div>
        <!-- Elementos decorativos de fondo -->
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none">
        </div>
        <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none">
        </div>

        <!-- Partículas flotantes -->
        <div class="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div class="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping opacity-40"></div>
        <div class="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-30"></div>
        <div class="absolute bottom-20 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>

        <!-- Contenido principal -->
        <div>

            <!-- Contenedor del formulario -->
            <div
                class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">

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

                    <!-- Sección 1: Detalles de la Campaña -->
                    <div class="space-y-6">
                        <div class="flex items-center space-x-3 mb-6">
                            <div
                                class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                1</div>
                            <h3 class="text-xl font-semibold text-white">Detalles de la Campaña</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
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
                                class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                2</div>
                            <h3 class="text-xl font-semibold text-white">Plataforma Publicitaria</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
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
                                class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                3</div>
                            <h3 class="text-xl font-semibold text-white">Canales de Marketing</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
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
                                class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                                4</div>
                            <h3 class="text-xl font-semibold text-white">Momento de la Semana</h3>
                            <div class="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent"></div>
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
                            class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25">
                            <div class="flex items-center justify-center space-x-2">
                                <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                    </path>
                                </svg>
                                <span>{{ loading ? 'Generando Predicciones...' : 'Generar Predicciones' }}</span>
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
import { ref, reactive, computed } from 'vue';

// Tipos e interfaces
interface UserFriendlyFormData {
    no_of_days: number;
    approved_budget: number;
    clicks: number;
    impressions: number;
    selected_ext_service: number;
    selected_channel: number;
    selected_weekday_cat: number;
}

interface SelectOption {
    value: number;
    label: string;
}

interface FormData {
    no_of_days: number;
    approved_budget: number;
    clicks: number;
    impressions: number;
    ext_service_name_DV360: number;
    ext_service_name_Facebook_Ads: number;
    ext_service_name_Google_Ads: number;
    channel_name_Display: number;
    channel_name_Mobile: number;
    channel_name_Search: number;
    channel_name_Social: number;
    channel_name_Video: number;
    weekday_cat_week_day: number;
    weekday_cat_week_end: number;
    ext_service_name_enc: number;
    channel_name_enc: number;
    weekday_cat_enc: number;
}

// Configuración
const BASE_URL = import.meta.env.VITE_PYTHON_URL || 'http://localhost:8000';

// Funciones de autenticación
const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};

const hasAuthToken = computed(() => getAuthToken() !== null);

// Datos del formulario
const userFriendlyData: UserFriendlyFormData = reactive({
    no_of_days: 1,
    approved_budget: 1000,
    clicks: 50,
    impressions: 1000,
    selected_ext_service: 0,
    selected_channel: 0,
    selected_weekday_cat: 0,
});

// Opciones para los selects
const externalServiceOptions: SelectOption[] = [
    { value: 0, label: 'DV360' },
    { value: 1, label: 'Facebook Ads' },
    { value: 2, label: 'Google Ads' },
];

const channelOptions: SelectOption[] = [
    { value: 0, label: 'Display' },
    { value: 1, label: 'Mobile' },
    { value: 2, label: 'Search' },
    { value: 3, label: 'Social' },
    { value: 4, label: 'Video' },
];

const weekdayOptions: SelectOption[] = [
    { value: 0, label: 'Día de Semana (L-V)' },
    { value: 1, label: 'Fin de Semana (S-D)' },
];

// Estados de la aplicación
const loading = ref(false);
const error = ref<string | null>(null);
const successMessage = ref<string | null>(null);

// Transformar datos para el backend
const transformToBackendFormData = (data: UserFriendlyFormData): FormData => {
    return {
        no_of_days: data.no_of_days,
        approved_budget: data.approved_budget,
        clicks: data.clicks,
        impressions: data.impressions,
        ext_service_name_DV360: data.selected_ext_service === 0 ? 1 : 0,
        ext_service_name_Facebook_Ads: data.selected_ext_service === 1 ? 1 : 0,
        ext_service_name_Google_Ads: data.selected_ext_service === 2 ? 1 : 0,
        channel_name_Display: data.selected_channel === 0 ? 1 : 0,
        channel_name_Mobile: data.selected_channel === 1 ? 1 : 0,
        channel_name_Search: data.selected_channel === 2 ? 1 : 0,
        channel_name_Social: data.selected_channel === 3 ? 1 : 0,
        channel_name_Video: data.selected_channel === 4 ? 1 : 0,
        weekday_cat_week_day: data.selected_weekday_cat === 0 ? 1 : 0,
        weekday_cat_week_end: data.selected_weekday_cat === 1 ? 1 : 0,
        ext_service_name_enc: data.selected_ext_service,
        channel_name_enc: data.selected_channel,
        weekday_cat_enc: data.selected_weekday_cat,
    };
};

// Configuración de modelos
const modelsConfig = [
    {
        endpoint: '/modelo/marketing_impressions/predict',
        key: 'prediction_marketing_impressions',
        getPayload: (data: FormData) => ({
            no_of_days: data.no_of_days,
            approved_budget: data.approved_budget,
            ext_service_name_DV360: data.ext_service_name_DV360,
            ext_service_name_Facebook_Ads: data.ext_service_name_Facebook_Ads,
            ext_service_name_Google_Ads: data.ext_service_name_Google_Ads,
            channel_name_Display: data.channel_name_Display,
            channel_name_Mobile: data.channel_name_Mobile,
            channel_name_Search: data.channel_name_Search,
            channel_name_Social: data.channel_name_Social,
            channel_name_Video: data.channel_name_Video,
            weekday_cat_week_day: data.weekday_cat_week_day,
            weekday_cat_week_end: data.weekday_cat_week_end,
        }),
    },
    {
        endpoint: '/modelo/marketing_clicks/predict',
        key: 'prediction_marketing_clicks',
        getPayload: (data: FormData) => ({
            no_of_days: data.no_of_days,
            approved_budget: data.approved_budget,
            ext_service_name_DV360: data.ext_service_name_DV360,
            ext_service_name_Facebook_Ads: data.ext_service_name_Facebook_Ads,
            ext_service_name_Google_Ads: data.ext_service_name_Google_Ads,
            channel_name_Display: data.channel_name_Display,
            channel_name_Mobile: data.channel_name_Mobile,
            channel_name_Search: data.channel_name_Search,
            channel_name_Social: data.channel_name_Social,
            channel_name_Video: data.channel_name_Video,
            weekday_cat_week_day: data.weekday_cat_week_day,
            weekday_cat_week_end: data.weekday_cat_week_end,
        }),
    },
    {
        endpoint: '/modelo/marketing_media_cost/predict',
        key: 'prediction_marketing_media_cost',
        getPayload: (data: FormData) => ({
            no_of_days: data.no_of_days,
            approved_budget: data.approved_budget,
            ext_service_name_DV360: data.ext_service_name_DV360,
            ext_service_name_Facebook_Ads: data.ext_service_name_Facebook_Ads,
            ext_service_name_Google_Ads: data.ext_service_name_Google_Ads,
            channel_name_Display: data.channel_name_Display,
            channel_name_Mobile: data.channel_name_Mobile,
            channel_name_Search: data.channel_name_Search,
            channel_name_Social: data.channel_name_Social,
            channel_name_Video: data.channel_name_Video,
            weekday_cat_week_day: data.weekday_cat_week_day,
            weekday_cat_week_end: data.weekday_cat_week_end,
        }),
    },
    {
        endpoint: '/modelo/marketing_no_days/predict',
        key: 'prediction_marketing_no_days',
        getPayload: (data: FormData) => ({
            clicks: data.clicks,
            impressions: data.impressions,
            approved_budget: data.approved_budget,
            ext_service_name_enc: data.ext_service_name_enc,
            channel_name_enc: data.channel_name_enc,
            weekday_cat_enc: data.weekday_cat_enc,
        }),
    },
    {
        endpoint: '/modelo/marketing_budget/predict',
        key: 'prediction_marketing_budget',
        getPayload: (data: FormData) => ({
            clicks: data.clicks,
            impressions: data.impressions,
            no_of_days: data.no_of_days,
            ext_service_name_enc: data.ext_service_name_enc,
            channel_name_enc: data.channel_name_enc,
            weekday_cat_enc: data.weekday_cat_enc,
        }),
    },
    {
        endpoint: '/modelo/marketing_external_service/predict',
        key: 'prediction_marketing_external_service',
        getPayload: (data: FormData) => ({
            clicks: data.clicks,
            impressions: data.impressions,
            no_of_days: data.no_of_days,
            approved_budget: data.approved_budget,
            channel_name_enc: data.channel_name_enc,
            weekday_cat_enc: data.weekday_cat_enc,
        }),
    },
    {
        endpoint: '/modelo/marketing_week_day/predict',
        key: 'prediction_marketing_week_day',
        getPayload: (data: FormData) => ({
            clicks: data.clicks,
            impressions: data.impressions,
            no_of_days: data.no_of_days,
            approved_budget: data.approved_budget,
            ext_service_name_enc: data.ext_service_name_enc,
            channel_name_enc: data.channel_name_enc,
        }),
    },
    {
        endpoint: '/modelo/marketing_chanel_name/predict',
        key: 'prediction_marketing_chanel_name',
        getPayload: (data: FormData) => ({
            clicks: data.clicks,
            impressions: data.impressions,
            no_of_days: data.no_of_days,
            approved_budget: data.approved_budget,
            ext_service_name_enc: data.ext_service_name_enc,
            channel_name_enc: data.channel_name_enc,
        }),
    },
];

// Función para enviar el formulario
const submitForm = async () => {
    // Validación básica
    if (!userFriendlyData.no_of_days || userFriendlyData.no_of_days < 1) {
        error.value = 'La duración de la campaña debe ser al menos 1 día.';
        return;
    }

    if (!userFriendlyData.approved_budget || userFriendlyData.approved_budget < 0) {
        error.value = 'El presupuesto debe ser un valor positivo.';
        return;
    }

    if (!userFriendlyData.clicks || userFriendlyData.clicks < 0) {
        error.value = 'Los clics deben ser un valor positivo.';
        return;
    }

    if (!userFriendlyData.impressions || userFriendlyData.impressions < 0) {
        error.value = 'Las impresiones deben ser un valor positivo.';
        return;
    }

    loading.value = true;
    error.value = null;
    successMessage.value = null;

    const AUTH_TOKEN = getAuthToken();

    if (!AUTH_TOKEN) {
        error.value = 'No se encontró un token de autenticación. Por favor, inicia sesión.';
        loading.value = false;
        return;
    }

    console.log('Datos del formulario:', userFriendlyData);

    const backendFormData = transformToBackendFormData(userFriendlyData);
    console.log('Datos transformados para backend:', backendFormData);

    try {
        const fetchPromises = modelsConfig.map(async (model) => {
            const payload = model.getPayload(backendFormData);
            const url = `${BASE_URL}${model.endpoint}`;

            console.log(`Enviando POST a: ${url} con payload:`, payload);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Error en ${model.endpoint}: ${response.status} ${response.statusText} - ${errorData.detail || 'Error desconocido'}`);
            }

            const predictionData = await response.json();
            localStorage.setItem(model.key, JSON.stringify(predictionData));
            console.log(`Predicción para ${model.key} guardada:`, predictionData);
            return { key: model.key, data: predictionData };
        });

        await Promise.all(fetchPromises);
        successMessage.value = '¡Todas las predicciones se han generado y guardado exitosamente!';

    } catch (err: any) {
        console.error('Error al enviar el formulario:', err);
        error.value = err.message || 'Error desconocido al procesar las predicciones.';
    } finally {
        loading.value = false;
    }
};
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
