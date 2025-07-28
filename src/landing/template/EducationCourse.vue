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
            <span class="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Online Course
            </span>
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
  
      <!-- Course Overview -->
      <section class="py-20">
        <div class="container mx-auto px-4 md:px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-8">{{ data?.overview.title }}</h2>
            <p class="text-lg mb-8">{{ data?.overview.description }}</p>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div v-if="data?.overview.duration" class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">Duration</h3>
                <p class="text-xl font-semibold">{{ data.overview.duration }}</p>
              </div>
              <div v-if="data?.overview.level" class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">Level</h3>
                <p class="text-xl font-semibold">{{ data.overview.level }}</p>
              </div>
              <div v-if="data?.overview.studentsCount" class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">Students</h3>
                <p class="text-xl font-semibold">{{ data.overview.studentsCount.toLocaleString() }}+</p>
              </div>
              <div v-if="data?.overview.language" class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">Language</h3>
                <p class="text-xl font-semibold">{{ data.overview.language }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- What You'll Learn -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4 md:px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-8">What You'll Learn</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div v-for="(item, index) in data?.learningOutcomes.items" :key="index" class="flex items-start">
                <svg class="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Course Modules -->
      <section class="py-20">
        <div class="container mx-auto px-4 md:px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-8">Course Modules</h2>
            <div class="space-y-4">
              <div v-for="(module, moduleIndex) in data?.modules" :key="moduleIndex" class="border rounded-lg overflow-hidden">
                <button 
                  class="w-full px-6 py-4 bg-white hover:bg-gray-50 text-left flex justify-between items-center"
                  @click="toggleModule(moduleIndex)"
                >
                  <div>
                    <h3 class="text-lg font-medium">{{ module.title }}</h3>
                    <p v-if="module.duration" class="text-sm text-gray-500">{{ module.duration }}</p>
                  </div>
                  <svg 
                    class="h-5 w-5 text-gray-400 transition-transform duration-200"
                    :class="{ 'transform rotate-180': openModules[moduleIndex] }"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div v-if="openModules[moduleIndex]" class="px-6 pb-4 bg-gray-50">
                  <p class="mb-4">{{ module.description }}</p>
                  <div v-if="module.lessons && module.lessons.length > 0" class="space-y-2">
                    <div v-for="(lesson, lessonIndex) in module.lessons" :key="lessonIndex" class="flex items-center p-3 bg-white rounded-lg">
                      <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="flex-1">{{ lesson.title }}</span>
                      <span class="text-sm text-gray-500">{{ lesson.duration }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Instructor Section -->
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4 md:px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold mb-8">About the Instructor</h2>
            <div class="bg-white rounded-xl p-8 shadow-sm">
              <div class="flex flex-col md:flex-row items-center md:items-start">
                <div v-if="data?.instructor.avatar" class="w-32 h-32 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                  <img 
                    :src="instructorAvatar" 
                    :alt="data.instructor.name"
                    class="w-full h-full object-cover"
                  >
                </div>
                <div>
                  <h3 class="text-2xl font-bold mb-2">{{ data?.instructor.name }}</h3>
                  <p class="text-primary-600 font-medium mb-4">{{ data?.instructor.role }}</p>
                  <p class="text-gray-700 mb-6">{{ data?.instructor.bio }}</p>
                  <div v-if="data?.instructor.socialLinks" class="flex space-x-4">
                    <a 
                      v-for="(url, platform) in data.instructor.socialLinks" 
                      :key="platform"
                      :href="url" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-gray-500 hover:text-primary-600"
                    >
                      <span class="sr-only">{{ platform }}</span>
                      <i :class="getSocialIcon(platform)" class="text-2xl"></i>
                    </a>
                  </div>
                </div>
              </div>
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
              </div>
              <div class="flex items-center mb-2" v-if="testimonial.rating">
                <div class="flex text-yellow-400">
                  <span v-for="i in 5" :key="i">
                    <svg 
                      v-if="i <= testimonial.rating" 
                      class="h-5 w-5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg 
                      v-else 
                      class="h-5 w-5 text-gray-300" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
                <span class="ml-2 text-sm text-gray-600">{{ testimonial.rating }}.0</span>
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
          <p v-if="data?.finalCta.description" class="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            {{ data.finalCta.description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              @click="handleCtaClick(data?.finalCta.primaryButton)"
            >
              {{ data?.finalCta.primaryButton.text }}
            </button>
            <button
              v-if="data?.finalCta.secondaryButton"
              class="px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors"
              @click="handleCtaClick(data?.finalCta.secondaryButton)"
            >
              {{ data.finalCta.secondaryButton.text }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import loadImage from '../services/loadImages';
  import type { EducationCourseData } from '../schemas/educationCourse.schema';
  
  const props = defineProps<{
    data: EducationCourseData;
  }>();
  
  const openModules = ref<Record<number, boolean>>({});
  
  const toggleModule = (index: number) => {
    openModules.value = {
      ...openModules.value,
      [index]: !openModules.value[index]
    };
  };
  
  const heroBackgroundStyle = computed(() => {
    if (!props.data?.hero.backgroundImage) return {};
    return {
      backgroundImage: `url(${props.data.hero.backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundBlendMode: 'overlay',
      color: 'white',
    };
  });
  
  // Handle image loading for avatars
  const testimonialAvatars = reactive<Record<number, string>>({});
  const instructorAvatar = ref('');
  
  // Load images when component mounts or data changes
  const loadImages = async () => {
    if (props.data?.testimonials) {
      for (let i = 0; i < props.data.testimonials.items.length; i++) {
        const testimonial = props.data.testimonials.items[i];
        if (testimonial.avatar) {
          try {
            const img = await loadImage(testimonial.avatar);
            testimonialAvatars[i] = img.src;
          } catch (error) {
            console.error(`Error loading testimonial avatar ${i}:`, error);
          }
        }
      }
    }
  
    if (props.data?.instructor.avatar) {
      try {
        const img = await loadImage(props.data.instructor.avatar);
        instructorAvatar.value = img.src;
      } catch (error) {
        console.error('Error loading instructor avatar:', error);
      }
    }
  };
  
  // Load images on component mount
  onMounted(() => {
    loadImages();
  });
  
  // Watch for data changes
  watch(() => props.data, () => {
    loadImages();
  }, { deep: true });
  
  // Handle CTA button clicks
  const handleCtaClick = (button: { url?: string; action?: string; text: string }) => {
    if (button.url) {
      window.open(button.url, '_blank');
    } else if (button.action) {
      // Handle custom actions if needed
      console.log(`Action: ${button.action}`, button);
    }
    // Emit event to parent component
    emit('cta-click', button);
  };
  
  // Helper function to get social media icons
  const getSocialIcon = (platform: string) => {
    const icons: Record<string, string> = {
      twitter: 'fab fa-twitter',
      facebook: 'fab fa-facebook',
      linkedin: 'fab fa-linkedin',
      instagram: 'fab fa-instagram',
      youtube: 'fab fa-youtube',
      github: 'fab fa-github',
      website: 'fas fa-globe',
    };
    return icons[platform.toLowerCase()] || 'fas fa-link';
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
  :root {
    --primary-50: rgba(99, 102, 241, 0.1);
    --primary-100: rgba(99, 102, 241, 0.2);
    --primary-200: rgba(99, 102, 241, 0.3);
    --primary-300: rgba(99, 102, 241, 0.4);
    --primary-400: rgba(99, 102, 241, 0.5);
    --primary-500: var(--primary-color, #4f46e5);
    --primary-600: #4338ca;
    --primary-700: #3730a3;
    --primary-800: #312e81;
    --primary-900: #1e1b4b;
  }
  
  /* Smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
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