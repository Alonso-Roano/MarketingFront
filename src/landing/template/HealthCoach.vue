<template>
  <div 
    class="min-h-screen text-gray-900 transition-colors duration-300 w-full"
    :style="{
      '--primary-color': data?.theme?.primaryColor || '#10B981',
      '--secondary-color': data?.theme?.secondaryColor || '#059669',
      '--text-color': data?.theme?.textColor || '#1F2937',
      '--bg-color': data?.theme?.backgroundColor || '#F9FAFB',
      color: 'var(--text-color)',
      backgroundColor: 'var(--bg-color)'
    }"
  >
    <!-- Hero Section -->
    <section 
      class="relative overflow-hidden py-20 md:py-32"
      :style="heroBackgroundStyle"
    >
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            {{ data?.hero.title }}
          </h1>
          
          <p class="text-xl md:text-2xl text-white/90 mb-8">
            {{ data?.hero.subtitle }}
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              v-for="(button, index) in data?.hero.ctaButtons"
              :key="index"
              class="px-8 py-4 rounded-lg font-medium transition-colors"
              :class="{
                'bg-primary-600 hover:bg-primary-700 text-white': button.variant === 'primary',
                'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm': button.variant === 'secondary'
              }"
              @click="handleCtaClick(button)"
            >
              {{ button.text }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              {{ data?.about.title }}
            </h2>
            <div class="prose max-w-none text-gray-600 mb-8" v-html="data?.about.content"></div>
            
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div v-for="(stat, index) in data?.about.stats" :key="index" class="text-center">
                <div class="text-3xl font-bold text-primary-600">{{ stat.value }}</div>
                <div class="text-sm text-gray-500">{{ stat.label }}</div>
              </div>
            </div>
          </div>
          
          <div class="relative rounded-xl overflow-hidden shadow-xl">
            <img 
              v-if="aboutImage" 
              :src="aboutImage" 
              :alt="data?.about.title"
              class="w-full h-auto"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Programs Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ data?.programs.title }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ data?.programs.subtitle }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(program, index) in data?.programs.items" 
            :key="index"
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            :class="{ 'ring-2 ring-primary-500': program.isPopular }"
          >
            <div 
              v-if="program.isPopular" 
              class="bg-primary-500 text-white text-center py-1 text-sm font-medium"
            >
              Most Popular
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ program.title }}</h3>
              <div class="text-3xl font-bold text-primary-600 mb-4">{{ program.price }}</div>
              <div class="text-gray-500 mb-6">{{ program.duration }}</div>
              
              <ul class="space-y-3 mb-8">
                <li v-for="(feature, i) in program.features" :key="i" class="flex items-start">
                  <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
              
              <button
                @click="handleProgramClick(program)"
                class="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20">
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
                
                <div v-if="testimonial.rating" class="flex mt-1">
                  <svg 
                    v-for="i in 5" 
                    :key="i" 
                    class="w-4 h-4" 
                    :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
            <p class="text-gray-600 italic">"{{ testimonial.content }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20 bg-primary-600 text-white">
      <div class="container mx-auto px-4 md:px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          {{ data?.finalCta.title }}
        </h2>
        <p v-if="data?.finalCta.description" class="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          {{ data?.finalCta.description }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            v-if="data?.finalCta.primaryButton"
            @click="handleCtaClick(data.finalCta.primaryButton)"
            class="px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            {{ data.finalCta.primaryButton.text }}
          </button>
          <button
            v-if="data?.finalCta.secondaryButton"
            @click="handleCtaClick(data.finalCta.secondaryButton)"
            class="px-8 py-4 border-2 border-white text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
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
import type { HealthCoachData } from '../schemas/healthCoach.schema';

const props = defineProps<{
  data: HealthCoachData;
  imageUrls?: Record<string, string>;
}>();

const heroImage = ref<string>('');
const aboutImage = ref<string>('');
const testimonialAvatars = ref<Record<number, string>>({});

// Load hero background image
const heroBackgroundStyle = computed(() => {
  if (heroImage.value) {
    return {
      backgroundImage: `url(${heroImage.value})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  }
  return {};
});

// Handle CTA button clicks
const handleCtaClick = (button: { url?: string; action?: string }) => {
  if (button.url) {
    window.location.href = button.url;
  } else if (button.action) {
    // Handle custom actions if needed
    console.log('Action:', button.action);
  }
};

// Handle program selection
const handleProgramClick = (program: any) => {
  console.log('Selected program:', program.title);
  // Handle program selection (e.g., add to cart, navigate to checkout, etc.)
};

// Load images when component mounts
onMounted(async () => {
  try {
    // Load hero image
    if (props.data.hero.backgroundImage) {
      const url = props.imageUrls?.['hero_background'] || props.data.hero.backgroundImage;
      heroImage.value = await loadImage(url);
    }

    // Load about image
    if (props.data.about.image) {
      aboutImage.value = await loadImage(props.data.about.image);
    }

    // Load testimonial avatars
    if (props.data.testimonials?.items) {
      const avatarPromises = props.data.testimonials.items.map(async (testimonial, index) => {
        if (testimonial.avatar) {
          const url = props.imageUrls?.[`testimonial_${index}_avatar`] || testimonial.avatar;
          testimonialAvatars.value[index] = await loadImage(url);
        }
      });
      await Promise.all(avatarPromises);
    }
  } catch (error) {
    console.error('Error loading images:', error);
  }
});

// Expose methods if needed
defineExpose({
  scrollToSection: (sectionId: string) => {
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
  --primary-color: #10B981;
  --secondary-color: #059669;
  --text-color: #1F2937;
  --bg-color: #F9FAFB;
}

.text-primary-600 {
  color: var(--primary-color);
}

.bg-primary-600 {
  background-color: var(--primary-color);
}

.hover\:bg-primary-700:hover {
  background-color: color-mix(in srgb, var(--primary-color), black 10%);
}

.bg-primary-500 {
  background-color: color-mix(in srgb, var(--primary-color), white 20%);
}

.bg-primary-50 {
  background-color: color-mix(in srgb, var(--primary-color), white 95%);
}
</style>
