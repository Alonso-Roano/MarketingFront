<template>
  <div class="bg-white text-gray-800">
    <!-- HERO SECTION -->
    <section
      class="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
    >
      <div class="md:w-1/2">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">
          {{ data?.hero.titulo }}
        </h1>
        <p class="text-lg md:text-xl mb-6">
          {{ data?.hero.subtitulo }}
        </p>
        <Button
          :label="data?.hero.ctaText"
          class="bg-white text-violet-600 font-bold"
          rounded
        />
      </div>
      <img
        :src="''+data?.hero.imagen"
        alt="Hero image"
        class="md:w-1/2 mt-8 md:mt-0 rounded-lg shadow-lg"
      />
    </section>

    <!-- FEATURES SECTION -->
    <section class="py-16 px-6 md:px-20">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        Características Destacadas
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in data?.features"
          :key="index"
          class="bg-gray-100 p-6 rounded-lg text-center hover:bg-violet-50 transition"
        >
          <i
            :class="feature.icon"
            class="text-5xl text-violet-600 mb-4"
          ></i>
          <h3 class="text-xl font-semibold mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section class="py-16 px-6 md:px-20 bg-gray-50">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        Testimonios
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <Card
          v-for="(test, index) in data?.testimonials"
          :key="index"
          class="text-center"
        >
          <template #header>
            <img
              :src="test.foto"
              class="w-24 h-24 rounded-full mx-auto -mt-12 border-4 border-white shadow-lg"
            />
          </template>
          <template #title>{{ test.nombre }}</template>
          <template #content>
            <p class="text-gray-600">{{ test.mensaje }}</p>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";

defineProps({
  data: Object
});
</script>