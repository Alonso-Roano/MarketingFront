<template>
  <div 
    class="min-h-screen text-gray-900 transition-colors duration-300 w-full"
    :style="{
      '--primary-color': data?.theme?.primaryColor || '#4f46e5',
      '--secondary-color': data?.theme?.secondaryColor || '#7c3aed',
      '--text-color': data?.theme?.textColor || '#1f2937',
      '--bg-color': data?.theme?.backgroundColor || '#ffffff',
      color: 'var(--text-color)',
      backgroundColor: 'var(--bg-color)'
    }"
  >
    <!-- Hero Section -->
    <section 
      class="relative overflow-hidden py-20 md:py-32"
      :style="heroBackgroundStyle"
    >
      <div class="container mx-auto px-4 md:px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {{ data?.hero.title }}
          </h1>
          
          <p class="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto">
            {{ data?.hero.subtitle }}
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              v-for="(button, index) in data?.hero.ctaButtons"
              :key="index"
              class="px-8 py-4 rounded-lg font-medium transition-colors"
              :class="{
                'bg-primary-600 hover:bg-primary-700 text-white': button.variant === 'primary',
                'bg-white hover:bg-gray-100 text-primary-600': button.variant === 'secondary'
              }"
              @click="handleCtaClick(button)"
            >
              {{ button.text }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6">
        <div v-if="data?.features.title || data?.features.subtitle" class="text-center mb-16">
          <h2 v-if="data?.features.title" class="text-3xl md:text-4xl font-bold mb-4">
            {{ data?.features.title }}
          </h2>
          <p v-if="data?.features.subtitle" class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ data?.features.subtitle }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in data?.features.items" 
            :key="index"
            class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div v-if="feature.icon" class="text-primary-600 text-4xl mb-4">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section v-if="data?.testimonials" class="py-20">
      <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          {{ data?.testimonials.title }}
        </h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in data?.testimonials.items" 
            :key="index"
            class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <div class="flex items-center mb-4">
              <div 
                v-if="testimonial.avatar" 
                class="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden"
              >
                <img 
                  :src="testimonialAvatars[index] || '/images/avatar-placeholder.png'"
                  :alt="testimonial.name"
                  class="w-full h-full object-cover"
                >
              </div>
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
              </div>
              
              <div v-if="testimonial.rating" class="ml-auto text-yellow-400 flex">
                <span v-for="i in 5" :key="i" class="text-lg">
                  {{ i <= testimonial.rating ? '★' : '☆' }}
                </span>
              </div>
            </div>
            
            <p class="text-gray-700 italic">"{{ testimonial.content }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20 bg-primary-50">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          {{ data?.finalCta.title }}
        </h2>
        
        <p v-if="data?.finalCta.description" class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          {{ data?.finalCta.description }}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="px-8 py-3 rounded-lg font-medium transition-colors"
            :class="{
              'bg-primary-600 hover:bg-primary-700 text-white': data?.finalCta.primaryButton.variant === 'primary',
              'bg-white hover:bg-gray-100 text-primary-600 border border-primary-600': data?.finalCta.primaryButton.variant === 'outline',
              'bg-white hover:bg-gray-100 text-primary-600': data?.finalCta.primaryButton.variant === 'secondary'
            }"
            @click="handleCtaClick(data?.finalCta.primaryButton)"
          >
            {{ data?.finalCta.primaryButton.text }}
          </button>
          
          <button
            v-if="data?.finalCta.secondaryButton"
            class="px-8 py-3 rounded-lg font-medium transition-colors"
            :class="{
              'bg-primary-600 hover:bg-primary-700 text-white': data?.finalCta.secondaryButton.variant === 'primary',
              'bg-white hover:bg-gray-100 text-primary-600 border border-primary-600': data?.finalCta.secondaryButton.variant === 'outline',
              'bg-white hover:bg-gray-100 text-primary-600': data?.finalCta.secondaryButton.variant === 'secondary'
            }"
            @click="handleCtaClick(data?.finalCta.secondaryButton)"
          >
            {{ data?.finalCta.secondaryButton.text }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import loadImage from '../services/loadImages';
import { ref } from 'vue';
import { watchEffect } from 'vue';


const props = defineProps({
  data: Object
});

const heroBackgroundImage = ref('');
const testimonialAvatars = reactive<Record<number, string>>({});

watchEffect(async () => {
  if (props.data?.testimonials?.items) {
    for (const [index, testimonial] of props.data.testimonials.items.entries()) {
      if (testimonial.avatar) {
        const url = await loadImage(testimonial.avatar);
        testimonialAvatars[index] = url;
      }
    }
  }
});


watchEffect(async () => {
  if (props.data?.hero.backgroundImage) {
    const url = await loadImage(props.data.hero.backgroundImage);
    heroBackgroundImage.value = `url(${url})`;
    console.log("Hola")
  } else {
    heroBackgroundImage.value = `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`;
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
const handleCtaClick = (button:any) => {
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
  scrollToSection: (sectionId:any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
</script>

<style scoped>
/* Custom styles */
:root {
  --primary-color: #4f46e5;
  --secondary-color: #7c3aed;
  --text-color: #1f2937;
  --bg-color: #ffffff;
}

.bg-primary-50 {
  background-color: color-mix(in srgb, var(--primary-color) 5%, white);
}

.bg-primary-600 {
  background-color: var(--primary-color);
}

.bg-primary-700 {
  background-color: color-mix(in srgb, var(--primary-color), black 15%);
}

.text-primary-600 {
  color: var(--primary-color);
}

.border-primary-600 {
  border-color: var(--primary-color);
}

.hover\:bg-primary-700:hover {
  background-color: color-mix(in srgb, var(--primary-color), black 15%);
}
</style>
