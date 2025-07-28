<template>
  <div class="min-h-screen px-6 py-10 bg-black text-white">
    <div class="w-full mx-auto">
      <div class="flex justify-between items-start mb-10">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Landing Pages</h1>
          <p class="text-gray-400 mt-2">Aquí puedes gestionar tus landing pages o crear nuevas.</p>
        </div>
        <RouterLink :to="{name:'NewLanding'}" class="mt-2">
          <button class="flex items-center text-sm gap-2 px-4 py-2 bg-white  text-black font-semibold cursor-pointer hover:bg-white/90 rounded-lg transition">
            <span class="pi pi-plus"></span>
            Nueva Landing
          </button>
        </RouterLink>
      </div>

      <!-- Loader -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <span class="pi pi-spin pi-spinner text-4xl text-purple-400"></span>
      </div>

      <!-- Grid de landing pages -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Si hay landing pages -->
        <template v-if="landingList.length > 0">
          <div
            v-for="landing in landingList"
            :key="landing.id"
            class="   bg-neutral-800/25 hover:bg-neutral-700/25  rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-lg"
          >
            <div class="flex items-center gap-3 mb-4">
              <span class="pi pi-globe text-2xl text-gray-500" />
              <h2 class="text-xl font-semibold">{{ landing.data?.title || 'Sin título' }}</h2>
            </div>

            <p class="text-sm text-gray-400 mb-4">{{ landing.data?.subtitle || 'Sin descripción' }}</p>
            <p class="text-xs text-gray-500 mb-4">Creado: {{ formatDate(landing.created_at) }}</p>

            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs  bg-white/10 capitalize tracking-wider   text-white/90 cursor-default select-none font-semibold ">
                {{ landing.template_id || 'default' }}
              </span>
              <div class="flex gap-2">
                <a 
                  :href="landing.data?.url || '#'" 
                  target="_blank"
                  class="px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer rounded-full transition"
                  title="Ver Landing"
                >
                  <span class="pi pi-link"></span>
                </a>
                <button 
                  class="px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer rounded-full transition"
                  title="Editar"
                >
                  <span class="pi pi-pencil"></span>
                </button>
                <button 
                  class="px-3 py-2 text-red-400  0 cursor-pointer  hover:bg-red-900/30 rounded-full transition"
                  title="Eliminar"
                >
                  <span class="pi pi-trash"></span>
                </button>
              </div>
            </div>
          </div>

          <!-- Espacio para futuras cards -->
        </template>
        <!-- Si no hay landing pages -->
        <template v-else>
          <div
            class="col-span-full flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-700 rounded-xl p-10"
          >
            <span class="pi pi-info-circle text-3xl text-purple-400 mb-4" />
            <h2 class="text-lg font-semibold mb-2">No hay landing pages</h2>
            <p class="text-gray-400 mb-4">
              Empieza creando tu primera landing page personalizada para promocionar tu negocio.
            </p>
            <RouterLink :to="{name:'NewLanding'}"
              class="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-lg transition"
            >
              <span class="pi pi-plus" />
              Crear landing page
            </RouterLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { apiRequest } from "@/core/api/apiClient";
import LandingService from "@/landing/services/formLandingService";
import UserService from "@/landing/services/userService";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const userAuth = JSON.parse(localStorage.getItem("auth") ?? "{}");
const landingService = new LandingService();
const userService = new UserService(userAuth);
const userId = userService.getUserId();
const refTkn = userService.getRefreshToken();
const accessToken = userService.getAccessToken();
const landingList = ref<any>([]);
const loading = ref(true);
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

/* const viewLanding = (id: string) => {
  // Implement view functionality
  console.log('View landing:', id);
  // router.push({ name: 'ViewLanding', params: { id } });
};
 */
/* const editLanding = (id: string) => {
  // Implement edit functionality
  console.log('Edit landing:', id);
  // router.push({ name: 'EditLanding', params: { id } });
};
 */
/* const confirmDelete = (id: string) => {
  confirm.require({
    message: '¿Estás seguro de que deseas eliminar esta landing page?',
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    acceptLabel: 'Sí, eliminar',
    rejectLabel: 'Cancelar',
    accept: () => deleteLanding(id)
  });
};
 */
/* const deleteLanding = async (id: string) => {
  try {
    // Implement delete API call
    // await landingService.deleteLanding(id);
    landingList.value = landingList.value.filter((landing: any) => landing.id !== id);
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Landing page eliminada correctamente',
      life: 3000
    });
  } catch (error) {
    console.error('Error deleting landing:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar la landing page',
      life: 3000
    });
  }
};
 */
const fetchLandingPages = async () => {
  if (!userId || !refTkn) {
    router.push({ name: 'Login' });
    return;
  }
  
  loading.value = true;
  try {
    const response: any = await apiRequest({
      key: "landing.listar",
      params: {},
      data: {},
      config: {
        headers: {
          "Authorization": accessToken,
        }
      },
    });
    
    landingList.value = response.data || [];
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    toast.error("No se pudieron cargar las landing pages");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLandingPages();
});
</script>