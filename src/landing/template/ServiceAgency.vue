<template>
  <div 
    class="min-h-screen text-gray-900 transition-colors duration-300 w-full"
    :style="{
      '--primary-color': data?.theme?.primaryColor || '#2563eb',
      '--secondary-color': data?.theme?.secondaryColor || '#1d4ed8',
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
      <div class="absolute inset-0 bg-black/40 z-0"></div>
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="max-w-3xl mx-auto text-center text-white">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {{ data?.hero.title }}
          </h1>
          
          <p class="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto">
            {{ data?.hero.subtitle }}
          </p>
          
          <button
            class="px-8 py-4 rounded-lg font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white"
            @click="handleCtaClick(data?.hero.ctaButton)"
          >
            {{ data?.hero.ctaButton?.text }}
          </button>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6">
        <div v-if="data?.services.title || data?.services.subtitle" class="text-center mb-16">
          <h2 v-if="data?.services.title" class="text-3xl md:text-4xl font-bold mb-4">
            {{ data?.services.title }}
          </h2>
          <p v-if="data?.services.subtitle" class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ data?.services.subtitle }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(service, index) in data?.services.items" 
            :key="index"
            class="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all"
          >
            <div v-if="service.icon" class="text-primary-600 text-4xl mb-6">
              <i :class="service.icon"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ service.title }}</h3>
            <p class="text-gray-600 mb-4">{{ service.description }}</p>
            <ul v-if="service.features" class="space-y-2 mb-6">
              <li v-for="(feature, fIndex) in service.features" :key="fIndex" class="flex items-center">
                <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ feature }}
              </li>
            </ul>
            <div v-if="service.price" class="text-xl font-bold text-primary-600 mt-4">
              {{ service.price }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section v-if="data?.portfolio" class="py-20">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ data?.portfolio.title || 'Our Work' }}
          </h2>
          <p v-if="data?.portfolio.subtitle" class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ data.portfolio.subtitle }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div 
            v-for="(item, index) in data.portfolio.items" 
            :key="index"
            class="group relative overflow-hidden rounded-xl shadow-md"
          >
            <img 
              :src="portfolioImages[index] || '/images/placeholder-project.jpg'" 
              :alt="item.title"
              class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 class="text-xl font-bold text-white mb-2">{{ item.title }}</h3>
              <p class="text-gray-200 mb-4">{{ item.description }}</p>
              <a 
                v-if="item.url" 
                :href="item.url" 
                class="text-white font-medium inline-flex items-center hover:underline"
              >
                View Project
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section v-if="data?.team" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ data?.team.title || 'Our Team' }}
          </h2>
          <p v-if="data?.team.subtitle" class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ data.team.subtitle }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(member, index) in data.team.members" 
            :key="index"
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
          >
            <div class="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                :src="teamAvatars[index] || '/images/avatar-placeholder.png'" 
                :alt="member.name"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-xl font-semibold mb-1">{{ member.name }}</h3>
            <p class="text-primary-600 font-medium mb-4">{{ member.role }}</p>
            <p v-if="member.bio" class="text-gray-600 mb-4">{{ member.bio }}</p>
            <div v-if="member.socialLinks" class="flex justify-center space-x-3">
              <a 
                v-for="(url, platform) in member.socialLinks" 
                :key="platform"
                :href="url" 
                :aria-label="platform"
                class="text-gray-500 hover:text-primary-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i :class="`fab fa-${platform.toLowerCase()} text-xl`"></i>
              </a>
            </div>
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
        <p v-if="data?.finalCta.description" class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          {{ data.finalCta.description }}
        </p>
        <button
          class="px-8 py-4 rounded-lg font-medium transition-colors bg-white text-primary-600 hover:bg-gray-100"
          @click="handleCtaClick(data?.finalCta.primaryButton)"
        >
          {{ data?.finalCta.primaryButton?.text || 'Get Started' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import loadImage from '../services/loadImages';
import type { ServiceAgencyData } from '../schemas/serviceAgency.schema';

const props = defineProps<{
  data: ServiceAgencyData;
  images: Record<string, string>;
}>();

// Handle image loading
const teamAvatars = ref<string[]>([]);
const portfolioImages = ref<string[]>([]);

// Load team avatars
onMounted(async () => {
  if (props.data?.team?.members) {
    teamAvatars.value = await Promise.all(
      props.data.team.members.map((_, index) => 
        loadImage(props.images[`team_member_${index}_avatar`])
      )
    );
  }

  // Load portfolio images
  if (props.data?.portfolio?.items) {
    portfolioImages.value = await Promise.all(
      props.data.portfolio.items.map((_, index) => 
        loadImage(props.images[`portfolio_item_${index + 1}_image`])
      )
    );
  }
});

// Hero background style
const heroBackgroundStyle = computed(() => ({
  backgroundImage: `url(${props.images['hero_background'] || '/images/hero-bg.jpg'})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

// Handle CTA button clicks
const handleCtaClick = (button: { url?: string; action?: string }) => {
  if (button.url) {
    window.location.href = button.url;
  } else if (button.action === 'scroll') {
    // Handle scroll action if needed
  }
};

// Expose methods
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

defineExpose({
  scrollToSection,
});
</script>

<style scoped>
/* Custom properties for theming */
:root {
  --primary-color: #2563eb;
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --primary-800: #1e40af;
  --primary-900: #1e3a8a;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Animation for elements */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
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
  background: var(--primary-500);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-600);
}
</style>
