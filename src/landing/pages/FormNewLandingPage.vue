<template>
  <div class="min-h-screen px-6 py-10">
    <div class="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-ping opacity-40"></div>
    <div class="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-bounce opacity-30"></div>
    <div class="absolute bottom-20 right-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>

    <div class="max-w-5xl mx-auto">
      <div class="backdrop-blur-3xl bg-black/35 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Step 1: Select Template -->
          <div class="space-y-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 class="text-xl font-semibold text-white">Selecciona un Template</h3>
              <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="([templateId, schema], index) in Object.entries(landingSchemas)" :key="index" class="space-y-2">
                <InputRadio
                  v-model:fValue="payload.template_id"
                  :template-id="templateId"
                  :is-selected="templateId === payload.template_id"
                />
              </div>
            </div>
            
            <!-- Error message for template selection -->
            <div v-if="vuelidate.template_id.$error" class="text-red-400 text-sm mt-2">
              <span v-if="vuelidate.template_id.required.$invalid">
                Por favor selecciona un template
              </span>
            </div>
          </div>

          <!-- Step 2: Dynamic Form -->
          <div v-if="selectedTemplateSchema" class="space-y-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 class="text-xl font-semibold text-white">Configura tu Landing Page</h3>
              <div class="flex-1 h-px bg-gradient-to-r from-gray-500/70 to-transparent"></div>
            </div>

            <div class="space-y-6">
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Contexto de la empresa *
                </label>
                <textarea
                  v-model="payload.contexto"
                  :class="[
                    'w-full px-4 py-3 bg-white/5 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white min-h-[120px] transition-colors',
                    vuelidate.contexto.$error ? 'border-red-500' : 'border-neutral-800'
                  ]"
                  placeholder="Describe el propósito y características principales de tu landing page..."
                  @blur="vuelidate.contexto.$touch()"
                ></textarea>
                
                <!-- Error message for contexto -->
                <div v-if="vuelidate.contexto.$error" class="text-red-400 text-sm mt-2">
                  <span v-if="vuelidate.contexto.required.$invalid">
                    El contexto de la empresa es requerido
                  </span>
                  <span v-if="vuelidate.contexto.minLength && vuelidate.contexto.minLength.$invalid">
                    El contexto debe tener al menos {{ vuelidate.contexto.minLength.$params.min }} caracteres
                  </span>
                </div>
              </div>

              <DynamicFormRenderer
                ref="dynamicForm"
                :urls="selectedTemplateSchema"
                :key="payload.template_id"
                :templateId="payload.template_id"
                v-model:fValue="payload.urls"
                @validation-change="handleDynamicFormValidation"
              />

              <!-- Error message for URLs -->
              <div v-if="vuelidate.urls.$error || dynamicFormErrors.length > 0" class="text-red-400 text-sm">
                <div v-if="vuelidate.urls.required.$invalid" class="mb-1">
                  Por favor completa todos los campos requeridos
                </div>
                <div v-for="error in dynamicFormErrors" :key="error" class="mb-1">
                  {{ error }}
                </div>
              </div>

              <button 
                :disabled="loading || vuelidate.$invalid" 
                type="submit" 
                :class="[
                  'w-full font-bold py-4 px-6 rounded-md transition-all duration-300 ease-in-out transform cursor-pointer select-none shadow-lg disabled:cursor-not-allowed',
                  loading || vuelidate.$invalid 
                    ? 'bg-white/90 hover:bg-white/80 text-black hover:shadow-white/25 ' 
                    : 'bg-white/90 hover:bg-white/80 text-black hover:shadow-white/25'
                ]"
              >
                <div class="flex items-center justify-center space-x-2">
                  <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>{{ loading ? 'Generando...' : 'Generar Landing' }}</span>
                </div>
              </button>
            </div>
          </div>
        </form>

        <!-- Debug info (remove in production) -->
        <div v-if="showDebug" class="mt-8 p-4 bg-gray-800 rounded-lg text-xs text-gray-300">
          <h4 class="font-bold mb-2">Debug Info:</h4>
          <p>Form Valid: {{ !vuelidate.$invalid }}</p>
          <p>Template ID: {{ payload.template_id }}</p>
          <p>Contexto Valid: {{ !vuelidate.contexto.$invalid }}</p>
          <p>URLs Valid: {{ !vuelidate.urls.$invalid }}</p>
          <p>Dynamic Form Errors: {{ dynamicFormErrors.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { landingSchemas } from '../json/landingSchemas';
import InputRadio from '../components/form/InputRadio.vue';
import DynamicFormRenderer from '../components/DynamicFormRenderer.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { RULES_URLS_TEMPLATE } from '../rules/rulesUrlTemplate';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { apiRequest } from '@/core/api/apiClient';
import UserService from "@/landing/services/userService";
const router = useRouter();
const toast = useToast();
const dynamicForm = ref();
const userAuth=JSON.parse(localStorage.getItem("auth")??"{}")
const userService=new UserService(userAuth)
const userId=userService.getUserId()
const refTkn= userService.getRefreshToken()
const accessToken=userService.getAccessToken()
const loading = ref(false);
const showDebug = ref(false); // Set to true for debugging
const dynamicFormErrors = ref<string[]>([]);

const payload = ref({
  template_id: "",
  contexto: "",
  urls: {} as Record<string, any>,
});

/* watch(payload,(newPayload)=>{
  console.log("el payload cambio")
  console.log(newPayload)
})
setTimeout(() => {
  console.log(payload.value)
}, 2000); */
// Custom validator for URLs object
const urlsValidator = (value: Record<string, any>) => {
  if (!value || typeof value !== 'object') return false;
  
  const requiredUrls = RULES_URLS_TEMPLATE[payload.value.template_id] || [];
  return requiredUrls.every(urlKey => {
    const urlValue = value[urlKey];
    return urlValue && ((urlValue.type === 'url' && urlValue.url.length > 5)|| (urlValue.type === 'file' && urlValue.name.length > 1));
  });
};

const rulesUrlTemplate = computed(() => {
  if (payload.value.template_id && RULES_URLS_TEMPLATE[payload.value.template_id]) {
    const urls: Record<string, any> = {};
    RULES_URLS_TEMPLATE[payload.value.template_id].forEach((url: string) => {
      urls[url] = "";
    });
    return urls;
  }
  return {} as Record<string, any>;
});
watch(rulesUrlTemplate, (newUrls) => {
  payload.value.urls = newUrls;
  // Reset validation when template changes
  vuelidate.value.$reset();
});

const rules = computed(() => {
  return {
    template_id: { required },
    contexto: { 
      required,
      minLength: minLength(10) // Minimum 10 characters for context
    },
    urls: { 
      required,
      custom: urlsValidator
    },
  };
});

const vuelidate = useVuelidate(rules, payload);

// Get the selected template schema
const selectedTemplateSchema = computed(() => {
  if (payload.value.template_id && RULES_URLS_TEMPLATE[payload.value.template_id]) {
    return RULES_URLS_TEMPLATE[payload.value.template_id];
  }
  return null;
});

// Handle validation changes from dynamic form
const handleDynamicFormValidation = (errors: string[]) => {
  dynamicFormErrors.value = errors;
};

// Handle form submission
const handleSubmit = async () => {
  // Touch all fields to trigger validation
  vuelidate.value.$touch();
  
  // Check if dynamic form has custom validation
  if (dynamicForm.value && typeof dynamicForm.value.validate === 'function') {
    const dynamicFormValid = await dynamicForm.value.validate();
    if (!dynamicFormValid) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }
  }

  // Check overall form validity
  if (vuelidate.value.$invalid) {
    toast.error('Por favor completa todos los campos requeridos correctamente');
    return;
  }

  loading.value = true;
  
  try {
    console.log("Payload válido:", payload.value);
    const res = await Promise.all(
  Object.entries(payload.value.urls).map(async ([index, value]: any) => {
    if (value.type === 'file') {
      const originalFile = value.file;
      const extension = originalFile.name.split('.').pop();
      const uniqueName = `${crypto.randomUUID()}.${extension}`;
      const renamedFile = new File([originalFile], uniqueName, {
        type: originalFile.type,
      });
      const formData = new FormData(); 
      formData.append('file', renamedFile);
      console.log("el formData")
      console.log(formData)
      const response= await apiRequest({
        key: 'MinOS.crear',
        params:{
          folder_name:userId,
        },
        data:formData,
        config:{
          headers:{
            "Authorization": accessToken,
            "refresh-token": refTkn,
            "Content-Type": "multipart/form-data",
          }
        },
        backend:"python"
      });
      return {index,response};
    }else{
      payload.value.urls[index]=value.url;
      return null;
    }
  })
);
/* console.log("el resultado de las imagenes")
console.log(res) */
const resFiltrado=res.filter((item:any)=>item!==null)
resFiltrado.forEach((item:any)=>{
  payload.value.urls[item.index]=item.response.archivo.ruta_completa;
})

const response:any= await apiRequest({
  key:"landingPage.crear",
  params:{
    
  },
  data:payload.value,
  config:{
    headers:{
      "Authorization": accessToken,
      "refresh-token": refTkn,
    }
  },
  backend:"python"
})
console.log(response)
if(response.succes){
const auth=JSON.parse(localStorage.getItem("auth")??"")
auth.accessToken=response.access_token??auth.accessToken
toast.success('Landing Page creada correctamente!');
localStorage.setItem("auth",JSON.stringify(auth))
router.push({name:"Landing"})
}else{
  toast.warning('La respuesta no es exitosa');
}
    
    
  } catch (error) {
    console.error('Error creating landing page:', error);
    toast.error('Error al crear la landing page. Inténtalo de nuevo.');
  } finally {
    loading.value = false;
  }
};

// Initialize with first template if none selected
onMounted(() => {
  if(!userAuth.accessToken || !userAuth.refreshToken || !userAuth.user){
  router.push({name:"Login"})
}
  if (!payload.value.template_id && Object.keys(landingSchemas).length > 0) {
    payload.value.template_id = Object.keys(landingSchemas)[0];
  }
});
</script>