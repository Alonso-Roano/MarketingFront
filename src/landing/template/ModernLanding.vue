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
      class="relative overflow-hidden py-20 md:py-32 min-h-screen flex items-center"
      :style="heroBackgroundStyle"
    >
      <div class="absolute inset-0 bg-black/50 z-0"></div>
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            {{ data?.hero.title }}
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
            {{ data?.hero.subtitle }}
          </p>
          
          <div class="flex flex-wrap justify-center gap-4">
            <a
              v-for="(button, index) in data?.hero.ctaButtons"
              :key="index"
              :href="button.url || '#'"
              class="inline-block px-6 py-3 rounded-lg font-medium transition-colors"
              :class="{
                'bg-white text-primary-600 hover:bg-gray-100': button.variant === 'primary',
                'bg-secondary-600 text-white hover:bg-secondary-700': button.variant === 'secondary',
                'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600': button.variant === 'outline'
              }"
              @click="handleCtaClick(button)"
            >
              {{ button.text }}
              <span v-if="button.icon" class="ml-2" v-html="button.icon"></span>
            </a>
          </div>
          
          <div v-if="data.hero.features && data.hero.features.length > 0" class="mt-16">
            <div class="inline-grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              <div v-for="(feature, index) in data.hero.features" :key="'feature-' + index" class="text-white flex items-center">
                <span v-if="feature.icon" class="mr-2" v-html="feature.icon"></span>
                <span>{{ feature.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ data.features.title }}</h2>
          <p v-if="data.features.subtitle" class="text-gray-600 max-w-2xl mx-auto">{{ data.features.subtitle }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in data.features.items" 
            :key="'feature-' + index"
            class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              v-if="feature.icon" 
              class="w-12 h-12 rounded-full flex items-center justify-center mb-6"
              :style="{ backgroundColor: `var(--color-${feature.color}-100)`, color: `var(--color-${feature.color}-600)` }"
            >
              <span v-html="feature.icon"></span>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600 mb-4">{{ feature.description }}</p>
            <a v-if="feature.link" :href="feature.link" class="text-primary font-medium inline-flex items-center">
              Learn more
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section v-if="data.testimonials" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 v-if="data.testimonials.title" class="text-3xl md:text-4xl font-bold text-center mb-16">
          {{ data.testimonials.title }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in data.testimonials.items" 
            :key="'testimonial-' + index"
            class="bg-gray-50 p-8 rounded-xl"
          >
            <div class="flex items-center mb-4">
              <div class="rating rating-sm">
                <input 
                  v-for="i in 5" 
                  :key="'star-' + i" 
                  type="radio" 
                  :name="'rating-' + index" 
                  :class="{'mask mask-star-2': true, 'bg-yellow-400': testimonial.rating && i <= testimonial.rating, 'bg-gray-300': !testimonial.rating || i > testimonial.rating}" 
                  :checked="testimonial.rating && i === testimonial.rating"
                  disabled
                />
              </div>
            </div>
            <p class="text-gray-700 mb-6">{{ testimonial.content }}</p>
            <div class="flex items-center">
              <img 
                v-if="testimonial.avatar" 
                :src="testimonial.avatar" 
                :alt="testimonial.name" 
                class="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <p v-if="testimonial.role || testimonial.company" class="text-sm text-gray-600">
                  <template v-if="testimonial.role">{{ testimonial.role }}</template>
                  <template v-if="testimonial.role && testimonial.company">, </template>
                  <template v-if="testimonial.company">{{ testimonial.company }}</template>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section v-if="data.cta" class="py-20 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ data.cta.title }}</h2>
        <p v-if="data.cta.subtitle" class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          {{ data.cta.subtitle }}
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a 
            v-for="(button, index) in data.cta.buttons" 
            :key="'cta-' + index"
            :href="button.url"
            class="btn px-8 py-3 rounded-full font-medium transition-all"
            :class="{
              'btn-primary bg-white text-gray-900 hover:bg-gray-100': button.variant === 'primary',
              'btn-secondary': button.variant === 'secondary',
              'btn-outline border-2 border-white text-white hover:bg-white hover:text-primary': button.variant === 'outline'
            }"
          >
            {{ button.text }}
          </a>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section v-if="data.finalCta" class="py-20" :style="{ backgroundColor: data.theme?.primaryColor + '0D' }">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ data.finalCta.title }}</h2>
        <p v-if="data.finalCta.description" class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          {{ data.finalCta.description }}
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a 
            v-for="(button, index) in [data.finalCta.primaryButton, data.finalCta.secondaryButton].filter(Boolean)" 
            :key="'cta-' + index"
            :href="button.url"
            class="btn px-8 py-3 rounded-full font-medium transition-all"
            :class="{
              'btn-primary': button.variant === 'primary' || button === data.finalCta.primaryButton,
              'btn-secondary': button.variant === 'secondary' || button === data.finalCta.secondaryButton
            }"
            @click="handleCtaClick(button)"
          >
            {{ button.text }}
          </a>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <!-- Logo and description -->
          <div>
            <a href="/" class="text-2xl font-bold text-white mb-4 inline-block">
              <img :src="data.footer.logo || data.navigation?.logo" alt="Logo" class="h-8" />
            </a>
            <p class="text-gray-400">{{ data.footer.description }}</p>
            
            <!-- Social Media Links -->
            <div v-if="data.footer.socialLinks" class="mt-6 flex space-x-4">
              <a 
                v-for="(social, index) in data.footer.socialLinks" 
                :key="'social-' + index"
                :href="social.url" 
                class="text-gray-400 hover:text-white transition-colors"
                :title="social.name"
              >
                <span v-html="social.icon" class="w-5 h-5"></span>
              </a>
            </div>
          </div>

          <!-- Footer Links -->
          <div v-for="(column, colIndex) in data.footer.linkColumns" :key="'col-' + colIndex">
            <h3 class="text-white font-semibold mb-4">{{ column.title }}</h3>
            <ul class="space-y-2">
              <li v-for="(link, linkIndex) in column.links" :key="'link-' + linkIndex">
                <a 
                  :href="link.url" 
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div v-if="data.footer.contact">
            <h3 class="text-white font-semibold mb-4">Contact Us</h3>
            <ul class="space-y-3">
              <li v-if="data.footer.contact.email" class="flex items-start">
                <svg class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ data.footer.contact.email }}</span>
              </li>
              <li v-if="data.footer.contact.phone" class="flex items-start">
                <svg class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{{ data.footer.contact.phone }}</span>
              </li>
              <li v-if="data.footer.contact.address" class="flex items-start">
                <svg class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ data.footer.contact.address }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>{{ data.footer.copyright || `  ${new Date().getFullYear()} All rights reserved.` }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { type ModernLandingData } from '../schemas/modernLanding.schema';
import loadImage from '../services/loadImages';

const props = defineProps<{
  data: ModernLandingData;
}>();

// Handle background image loading
const heroBackgroundImage = ref('');

watchEffect(async () => {
  if (props.data?.hero.backgroundImage) {
    const url = await loadImage(props.data.hero.backgroundImage);
    heroBackgroundImage.value = `url(${url})`;
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
const handleCtaClick = (button: { url?: string; text: string }) => {
  if (button?.url) {
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
/* Base styles */
.modern-landing {
  --color-primary: #4f46e5;
  --color-primary-100: #e0e7ff;
  --color-primary-600: #4f46e5;
  --color-secondary: #10b981;
  --color-secondary-100: #d1fae5;
  --color-secondary-600: #10b981;
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.btn:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--color-primary-500);
}

.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-700);
}

.btn-secondary {
  background-color: var(--color-secondary-600);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--color-secondary-700);
}

.btn-outline {
  border: 1px solid #d1d5db;
  background-color: transparent;
  color: #374151;
}

.btn-outline:hover {
  background-color: #f9fafb;
}

.btn-ghost {
  background-color: transparent;
  color: #374151;
}

.btn-ghost:hover {
  background-color: #f3f4f6;
}

/* Animations */
.hero-enter-active,
.hero-leave-active {
  transition: opacity 0.5s ease;
}

.hero-enter-from,
.hero-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
