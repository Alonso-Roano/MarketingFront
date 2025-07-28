<template>
  <div 
    class="min-h-screen text-gray-900 transition-colors duration-300 w-full"
    :style="{
      '--primary-color': data?.theme?.primaryColor || '#2563eb',
      '--text-color': data?.theme?.textColor || '#1f2937',
      '--bg-color': data?.theme?.backgroundColor || '#ffffff',
      color: 'var(--text-color)',
      backgroundColor: 'var(--bg-color)'
    }"
  >
    <!-- Hero Section -->
    <section 
      class="relative overflow-hidden py-20 md:py-32 min-h-screen flex items-center"
      :style="heroBackgroundStyle"
    >
      <div class="absolute inset-0 bg-black/30 z-0"></div>
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            {{ data?.hero.title }}
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
            {{ data?.hero.subtitle }}
          </p>
          
          <a
            :href="data?.hero.ctaButton.url || '#'"
            class="inline-block px-8 py-4 rounded-lg font-medium bg-white text-primary-600 hover:bg-gray-100 transition-colors"
            @click="handleCtaClick(data.hero.ctaButton)"
          >
            {{ data?.hero.ctaButton.text }}
          </a>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="py-20" :style="{ backgroundColor: 'var(--bg-color)' }">
      <div class="container mx-auto px-4 md:px-6">
        <div class="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl text-center">
          <div class="mb-6">
            <svg class="w-10 h-10 mx-auto text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <p class="text-xl text-gray-700 italic mb-8">"{{ data?.testimonial.content }}"</p>
          
          <div class="flex items-center justify-center space-x-4">
            <img 
              v-if="data?.testimonial.avatar" 
              :src="data.testimonial.avatar" 
              :alt="data.testimonial.name" 
              class="w-12 h-12 rounded-full"
            >
            <div>
              <h4 class="font-semibold text-gray-900">{{ data?.testimonial.name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20" :style="{ backgroundColor: 'var(--primary-color)' }">
      <div class="container mx-auto px-4 md:px-6 text-center text-white">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ data?.finalCta.title }}</h2>
        <a
          :href="data?.finalCta.buttonUrl || '#'"
          class="inline-block px-8 py-4 rounded-lg font-medium bg-white text-primary-600 hover:bg-gray-100 transition-colors"
          @click="handleCtaClick({url: data.finalCta.buttonUrl, text: data.finalCta.buttonText})"
        >
          {{ data?.finalCta.buttonText }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { minimalLandingSchema, type MinimalLandingData } from '../schemas/minimalLanding.schema';
import loadImage from '../services/loadImages';

const props = defineProps<{
  data: MinimalLandingData;
}>();

// Validate props against schema
const isValid = () => {
  try {
    minimalLandingSchema.parse(props.data);
    return true;
  } catch (error) {
    console.error('Invalid landing page data:', error);
    return false;
  }
};

// Handle background image loading
const heroBackgroundImage = ref('');

watchEffect(async () => {
  if (props.data?.hero.backgroundImage) {
    const url = await loadImage(props.data.hero.backgroundImage);
    heroBackgroundImage.value = `url(${url})`;
  } else {
    heroBackgroundImage.value = `linear-gradient(135deg, var(--primary-color), #1d4ed8)`;
  }
});

// Compute dynamic styles
const heroBackgroundStyle = computed(() => ({
  backgroundImage: heroBackgroundImage.value,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
}));

// Handle CTA button clicks
const handleCtaClick = (button: { url?: string; text: string }) => {
  if (button.url) {
    window.location.href = button.url;
  }
  // Emit event for parent component to handle
  emit('cta-click', button);
};

// Define emits for parent component interaction
const emit = defineEmits(['cta-click']);

// Expose methods if needed
defineExpose({
  scrollToSection: (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
</script>

<style scoped>
/* Custom styles */
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

.primary-gradient {
  background: linear-gradient(135deg, var(--primary-color), #1d4ed8);
}

.text-primary {
  color: var(--primary-color);
}

.bg-primary {
  background-color: var(--primary-color);
}

.hover\:bg-primary\/90:hover {
  background-color: color-mix(in srgb, var(--primary-color) 90%, black);
}
</style>
