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

    <!-- Product Gallery Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6">
        <div v-if="data?.productImages.title || data?.productImages.subtitle" class="text-center mb-16">
          <h2 v-if="data?.productImages.title" class="text-3xl md:text-4xl font-bold mb-4">
            {{ data?.productImages.title }}
          </h2>
          <p v-if="data?.productImages.subtitle" class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ data?.productImages.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(image, index) in productImages" 
            :key="index"
            class="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
          >
            <img
              :src="image.url"
              :alt="image.alt || 'Product Image'"
              class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div v-if="image.caption" class="p-4">
              <p class="text-sm text-gray-600">{{ image.caption }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
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
    <section v-if="data?.testimonials" class="py-20 bg-gray-50">
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
            </div>
            <p class="text-gray-700 mb-3">"{{ testimonial.content }}"</p>
            <div v-if="testimonial.rating" class="flex text-yellow-400">
              <span v-for="i in 5" :key="i" :class="{ 'text-gray-300': i > testimonial.rating }">
                ★
              </span>
            </div>
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
            v-if="data?.finalCta.primaryButton"
            @click="handleCtaClick(data.finalCta.primaryButton)"
            class="px-8 py-3 rounded-lg font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white"
          >
            {{ data.finalCta.primaryButton.text }}
          </button>
          <button
            v-if="data?.finalCta.secondaryButton"
            @click="handleCtaClick(data.finalCta.secondaryButton)"
            class="px-8 py-3 rounded-lg font-medium transition-colors bg-white hover:bg-gray-100 text-primary-600 border border-primary-600"
          >
            {{ data.finalCta.secondaryButton.text }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import loadImage from '../services/loadImages';
import type { ProductShowcaseData } from '../schemas/productShowcase.schema';

const props = defineProps<{
  data: ProductShowcaseData;
  urls?: Record<string, string>;
}>();

// Handle image loading for product images
const productImages = ref<Array<{url: string; alt?: string; caption?: string}>>([]);

// Handle testimonial avatars
const testimonialAvatars = ref<string[]>([]);

// Compute hero background style
const heroBackgroundStyle = computed(() => {
  if (props.data?.hero?.backgroundImage) {
    return {
      backgroundImage: `url(${props.data.hero.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    };
  }
  return {};
});

// Load product images
const loadProductImages = async () => {
  if (!props.data?.productImages?.items?.length) return;
  
  const loadedImages = [];
  for (let i = 0; i < props.data.productImages.items.length; i++) {
    const image = props.data.productImages.items[i];
    try {
      const url = props.urls?.[`product_image_${i + 1}`] || image.url;
      await loadImage(url);
      loadedImages.push({
        ...image,
        url
      });
    } catch (error) {
      console.error(`Error loading product image ${i + 1}:`, error);
      loadedImages.push(image);
    }
  }
  productImages.value = loadedImages;
};

// Load testimonial avatars
const loadTestimonialAvatars = async () => {
  if (!props.data?.testimonials?.items?.length) return;
  
  const avatars = [];
  for (let i = 0; i < props.data.testimonials.items.length; i++) {
    const testimonial = props.data.testimonials.items[i];
    if (testimonial.avatar) {
      try {
        const url = props.urls?.[`testimonio_${i}_avatar`] || testimonial.avatar;
        await loadImage(url);
        avatars.push(url);
      } catch (error) {
        console.error(`Error loading testimonial avatar ${i}:`, error);
        avatars.push(testimonial.avatar);
      }
    } else {
      avatars.push('');
    }
  }
  testimonialAvatars.value = avatars;
};

// Load all images when component mounts
onMounted(async () => {
  await Promise.all([
    loadProductImages(),
    loadTestimonialAvatars()
  ]);
});

// Handle CTA button clicks
const handleCtaClick = (button: { url?: string; action?: string; [key: string]: any }) => {
  if (button.url) {
    window.location.href = button.url;
  } else if (button.action === 'scroll') {
    const element = document.getElementById(button.target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  // Emit event for parent component to handle
  emit('cta-click', button);
};

// Define emits for parent component interaction
const emit = defineEmits(['cta-click']);

// Expose methods if needed
defineExpose({
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },
});
</script>

<style scoped>
/* Custom styles */
:root {
  --primary-50: color-mix(in srgb, var(--primary-color) 10%, white);
  --primary-100: color-mix(in srgb, var(--primary-color) 20%, white);
  --primary-200: color-mix(in srgb, var(--primary-color) 40%, white);
  --primary-300: color-mix(in srgb, var(--primary-color) 60%, white);
  --primary-400: color-mix(in srgb, var(--primary-color) 80%, white);
  --primary-500: var(--primary-color);
  --primary-600: color-mix(in srgb, var(--primary-color) 80%, black);
  --primary-700: color-mix(in srgb, var(--primary-color) 60%, black);
  --primary-800: color-mix(in srgb, var(--primary-color) 40%, black);
  --primary-900: color-mix(in srgb, var(--primary-color) 20%, black);
  --primary-950: color-mix(in srgb, var(--primary-color) 10%, black);
}

/* Animation for product images */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
