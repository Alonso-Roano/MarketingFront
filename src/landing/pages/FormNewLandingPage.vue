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
                  @update:modelValue="onTemplateSelect(templateId)"
                />
              </div>
            </div>
          </div>

          <!-- Step 2: Dynamic Form -->
          <div v-if="selectedTemplateSchema" class="space-y-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 class="text-xl font-semibold text-white">Configura tu Landing Page</h3>
              <div class="flex-1 h-px bg-gradient-to-r from-purple-500/70 to-transparent"></div>
            </div>

            <div class="space-y-6">
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Contexto (Opcional)
                </label>
                <textarea
                  v-model="payload.contexto"
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white min-h-[120px]"
                  placeholder="Describe el propósito y características principales de tu landing page..."
                ></textarea>
              </div>

              <DynamicFormRenderer
                ref="dynamicForm"
                :schema="selectedTemplateSchema"
                :key="payload.template_id"
                @submit="handleFormSubmit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { landingSchemas } from '../json/landingSchemas';
import InputRadio from '../components/form/InputRadio.vue';
import DynamicFormRenderer from '../components/DynamicFormRenderer.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const dynamicForm = ref();

const payload = ref({
  template_id: "",
  contexto: ""
});

// Get the selected template schema
const selectedTemplateSchema = computed(() => {
  if (payload.value.template_id && landingSchemas[payload.value.template_id]) {
    return landingSchemas[payload.value.template_id];
  }
  return null;
});

// Handle template selection
const onTemplateSelect = (templateId: string) => {
  payload.value.template_id = templateId;
  // Reset form data when template changes
  payload.value.contexto = "";
};

// Handle form submission
const handleFormSubmit = async () => {
  try {
    const formData = dynamicForm.value?.getFormData();
    
    // Combine template data with additional payload
    const submissionData = {
      ...payload.value,
      formData
    };

    console.log('Form submitted:', submissionData);
    
    // Here you would typically send the data to your API
    // await api.createLandingPage(submissionData);
    
    toast.success('¡Landing page creada exitosamente!');
    router.push('/landing');
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('Error al crear la landing page. Por favor, inténtalo de nuevo.');
  }
};

// Handle form submission from the submit button
const handleSubmit = () => {
  // This will trigger the DynamicFormRenderer's submit event
};

// Initialize with first template if none selected
onMounted(() => {
  if (!payload.value.template_id && Object.keys(landingSchemas).length > 0) {
    payload.value.template_id = Object.keys(landingSchemas)[0];
  }
});
</script>
