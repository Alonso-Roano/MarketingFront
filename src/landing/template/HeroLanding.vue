<template>
  <section
    class="p-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center rounded"
  >
    <h1 class="text-4xl font-bold">{{ data?.hero.title }}</h1>
    <p class="mt-4 text-lg">{{ data?.hero.subtitle }}</p>
    <img
      :src="data?.hero.image"
      class="mt-6 mx-auto max-w-md rounded"
    />

    <Button
      :label="data?.hero.buttonText"
      severity="danger"
      class="mt-8"
    />
  </section>
</template>

<script setup lang="ts">
import Button from "primevue/button";

defineProps({
  data: Object
});
</script>
