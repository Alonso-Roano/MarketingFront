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
            v-for="landing in paginatedLandings"
            :key="landing.id"
            class=" border-[0.5px] border-white/5   bg-neutral-800/25  hover:border-white/10 relative  rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-lg"
          >
        
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs  bg-black  border-white/20 border-[0.8px] absolute top-2 left-2 capitalize tracking-wider   text-white/90 cursor-default select-none font-semibold ">
                {{ landing.template_id || 'default' }}
              </span>
     
         
            <img :src="landing.data?.hero.backgroundImageSigned || '/landing-default.jpg'" alt=""   class="object-cover w-full h-48 rounded-lg">
            <div class=" my-2 tracking-tighter">
              <h2 class="text-xl font-semibold text-white  line-clamp-2 h-15">{{ landing.data?.features.title || 'Sin título' }}</h2>
            </div>
            <p class="text-sm text-gray-300 mb-4 line-clamp-2">{{ landing.data?.features.subtitle || 'Sin descripción' }}</p>
            <div class="flex items-center  justify-between">
              <p class="text-xs font-semibold text-zinc-300 ">Creado: {{ formatDate(landing.created_at) }}</p>
              <RouterLink 
                  :to="{ name: 'LandingPage', params: { id: landing.id } }"
                  class="px-3 py-2 text-white text-xs flex items-center gap-2 border-[0.3px] bg-black border-white/20   hover:bg-white/10 cursor-pointer rounded-full transition"
                  title="Ver Landing"
                >
                  <span class="pi pi-globe"></span>
                  <span class="text-xs font-semibold">Ver Landing</span>
                </RouterLink>
            </div>

            <div class="flex items-center justify-between mt-4 pt-3 border-t border-neutral-700">
          
              <div class="flex gap-2">
             
                <button 
                  class="px-3 py-2 text-white text-xs flex items-center gap-2 border-[0.3px] bg-black border-white/20   hover:bg-white/10 cursor-pointer rounded-3xl transition"
                  title="Editar"
                >
                  <span class="pi pi-pencil"></span>
                  <span class="text-xs font-semibold">Editar</span>
                </button>
                <button 
                  class="px-3 py-2 text-red-500/90 text-xs flex items-center gap-2   cursor-pointer bg-black  hover:bg-red-900/10 border-red-400/50 border-[0.3px] rounded-3xl transition"
                  title="Eliminar"
                >
                <span class="pi pi-trash"></span>
                <span class="text-xs font-semibold">Eliminar</span>
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
      
      <!-- Paginación -->
      <div v-if="landingList.length > itemsPerPage" class="flex justify-center items-center mt-8 gap-2">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1" 
          class="px-3 py-2 rounded-lg bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <span class="pi pi-chevron-left"></span>
          Anterior
        </button>
        
        <div class="px-4 py-2 rounded-lg bg-neutral-800/50 text-white">
          {{ currentPage }} de {{ totalPages }}
        </div>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages" 
          class="px-3 py-2 rounded-lg bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          Siguiente
          <span class="pi pi-chevron-right"></span>
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { apiRequest } from "@/core/api/apiClient";
import LandingService from "@/landing/services/formLandingService";
import UserService from "@/landing/services/userService";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';
import loadImage from '../../landing/services/loadImages';

const loadImg = async (url:string) => {
  const res= await loadImage(url);
  console.log(res);
  
  return res.url_firmada;
}
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

// Paginación
const currentPage = ref(1);
const itemsPerPage = ref(6); // 6 items por página (2 filas de 3 en desktop)
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

    const rawLandingList = response.data || [];

    // Firmar todas las imágenes antes de asignarlas
    const withSignedImages = await Promise.all(
      rawLandingList.map(async (landing: any) => {
        const bgImage = landing.data?.hero?.backgroundImage;
        if (bgImage) {
          try {
            const signed = await loadImage(bgImage);
            console.log(" el signed")
            console.log(signed); 
            landing.data.hero.backgroundImageSigned = signed;
          } catch (e) {
            console.error('Error firmando imagen:', bgImage, e);
            landing.data.hero.backgroundImageSigned = '';
          }
        }
        return landing;
      })
    );

    landingList.value = withSignedImages;
    console.log(landingList.value);
    
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    toast.error("No se pudieron cargar las landing pages");
  } finally {
    loading.value = false;
  }
};


// Funciones de paginación
const totalPages = computed(() => Math.ceil(landingList.value.length / itemsPerPage.value));

const paginatedLandings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return landingList.value.slice(start, start + itemsPerPage.value);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

onMounted(() => {
  fetchLandingPages();
});
</script>