<template>
  <div class="landing-container">
    <ProgressSpinner
      v-if="isLoading"
      style="width: 50px; height: 50px"
      strokeWidth="5"
      animationDuration=".8s"
      aria-label="Loading"
    />

    <component
      :is="componentName"
      v-if="!isLoading && componentName"
      :data="landingData"
    />

    <div
      v-else-if="!isLoading"
      class="p-10 text-center text-red-600 text-2xl"
    >
      Plantilla no encontrada o datos inválidos.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import { landingTemplateMap } from "@landing/services/landingTemplates";
import { landingSchemas } from "@landing/json/landingSchemas";
import { apiRequest } from "@/core/api/apiClient";

const route = useRoute();

const isLoading = ref(true);
const componentName = ref(null);
const landingData = ref({});

onMounted(async () => {
  const uuid = route.params.id;

  try {
    const res = await apiRequest<any>({
      key: "landing.obtener",
      params: { id: uuid }
    });
    const json = await res?.data;

    const templateId = json.template_id;
    const data = json.data;

    const schema = landingSchemas[templateId];
    console.log(landingSchemas[templateId]);

    if (!schema) {
      console.error("No existe esquema para:", templateId);
      isLoading.value = false;
      return;
    }

    const parseResult = schema.safeParse(data);

    if (!parseResult.success) {
      console.error("Datos inválidos:", parseResult.error.format());
      isLoading.value = false;
      return;
    }

    landingData.value = parseResult.data;
    console.log(landingData.value);

    if (landingTemplateMap[templateId]) {
      const module = await landingTemplateMap[templateId]();
      componentName.value = module.default;
    } else {
      console.error("Plantilla no encontrada:", templateId);
    }
  } catch (err) {
    console.error("Error al cargar landing:", err);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.landing-container {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
