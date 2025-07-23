<template>
  <div class="modern-landing">
    <!-- Navigation -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-primary">
          <img :src="data.navigation.logo" :alt="'Logo'" class="h-10" />
        </a>
        
        <nav class="hidden md:flex space-x-8">
          <a 
            v-for="(item, index) in data.navigation.links" 
            :key="index"
            :href="item.href"
            class="text-gray-700 hover:text-primary transition-colors"
            :class="{
              'btn': item.isButton,
              'btn-primary': item.isButton && item.variant === 'primary',
              'btn-secondary': item.isButton && item.variant === 'secondary',
              'btn-outline': item.isButton && item.variant === 'outline',
              'btn-ghost': item.isButton && item.variant === 'ghost',
            }"
          >
            {{ item.label }}
          </a>
        </nav>
        
        <button class="md:hidden" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-100">
        <div class="container mx-auto px-4 py-2 flex flex-col space-y-2">
          <a 
            v-for="(item, index) in data.navigation.links" 
            :key="'mobile-' + index"
            :href="item.href"
            class="py-2 px-4 text-gray-700 hover:bg-gray-50 rounded"
            :class="{
              'btn': item.isButton,
              'btn-primary': item.isButton && item.variant === 'primary',
              'btn-secondary': item.isButton && item.variant === 'secondary',
              'btn-outline': item.isButton && item.variant === 'outline',
              'btn-ghost': item.isButton && item.variant === 'ghost',
              'block w-full text-center': item.isButton,
            }"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section 
      class="relative py-20 md:py-32 overflow-hidden"
      :style="{
        backgroundImage: data.hero.backgroundImage ? `url(${data.hero.backgroundImage})` : 'none',
        backgroundColor: 'rgba(0, 0, 0, ' + (data.hero.overlayOpacity / 100) + ')'
      }"
    >
      <div class="absolute inset-0 bg-black/50 z-0"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">{{ data.hero.title }}</h1>
        <h2 class="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">{{ data.hero.subtitle }}</h2>
        
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <a 
            v-for="(button, index) in data.hero.ctaButtons" 
            :key="'cta-' + index"
            :href="button.url"
            class="btn px-8 py-3 rounded-full font-medium transition-all"
            :class="{
              'btn-primary': button.variant === 'primary',
              'btn-secondary': button.variant === 'secondary',
              'btn-outline bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900': button.variant === 'outline'
            }"
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
                      name="rating-2" 
                      class="mask mask-star-2"
                      :class="i <= (testimonial.rating || 5) ? 'bg-yellow-400' : 'bg-gray-300'"
                      :checked="i === (testimonial.rating || 5)"
                      disabled
                    />
                  </div>
                </div>
                <p class="text-gray-700 italic mb-6">"{{ testimonial.content }}"</p>
                <div class="flex items-center">
                  <img 
                    v-if="testimonial.avatar" 
                    :src="testimonial.avatar" 
                    :alt="testimonial.name" 
                    class="w-12 h-12 rounded-full mr-4"
                  >
                  <div>
                    <h4 class="font-semibold">{{ testimonial.name }}</h4>
                    <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
                    <p v-if="testimonial.company" class="text-sm text-gray-500">{{ testimonial.company }}</p>
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

          <!-- Footer -->
          <footer class="bg-gray-900 text-gray-300 py-12">
            <div class="container mx-auto px-4">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <!-- Logo and description -->
                <div>
                  <a href="/" class="text-2xl font-bold text-white mb-4 inline-block">
                    <img :src="data.navigation.logo" :alt="'Logo'" class="h-8" />
                  </a>
                  <p v-if="data.footer.description" class="mb-6">{{ data.footer.description }}</p>
                  
                  <!-- Social Media Links -->
                  <div v-if="data.footer.contact?.socialMedia" class="flex space-x-4">
                    <a 
                      v-for="(url, platform) in data.footer.contact.socialMedia" 
                      :key="'social-' + platform"
                      :href="url"
                      :title="platform"
                      class="text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span class="sr-only">{{ platform }}</span>
                      <i v-if="platform.toLowerCase() === 'twitter'" class="fab fa-twitter"></i>
                      <i v-else-if="platform.toLowerCase() === 'facebook'" class="fab fa-facebook"></i>
                      <i v-else-if="platform.toLowerCase() === 'instagram'" class="fab fa-instagram"></i>
                      <i v-else-if="platform.toLowerCase() === 'linkedin'" class="fab fa-linkedin"></i>
                      <i v-else class="fas fa-share-alt"></i>
                    </a>
                  </div>
                </div>

                <!-- Footer Links -->
                <div 
                  v-for="(linkGroup, index) in data.footer.links" 
                  :key="'link-group-' + index"
                  class="mb-6 md:mb-0"
                >
                  <h3 class="text-white font-semibold text-lg mb-4">{{ linkGroup.title }}</h3>
                  <ul class="space-y-2">
                    <li v-for="(link, linkIndex) in linkGroup.items" :key="'link-' + index + '-' + linkIndex">
                      <a 
                        :href="link.href" 
                        class="text-gray-400 hover:text-white transition-colors"
                      >
                        {{ link.label }}
                      </a>
                    </li>
                  </ul>
                </div>

                <!-- Contact Info -->
                <div v-if="data.footer.contact">
                  <h3 class="text-white font-semibold text-lg mb-4">Contact Us</h3>
                  <ul class="space-y-2">
                    <li v-if="data.footer.contact.email" class="flex items-start">
                      <svg class="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a :href="'mailto:' + data.footer.contact.email" class="hover:text-white transition-colors">
                        {{ data.footer.contact.email }}
                      </a>
                    </li>
                    <li v-if="data.footer.contact.phone" class="flex items-start">
                      <svg class="w-5 h-5 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a :href="'tel:' + data.footer.contact.phone.replace(/\D/g, '')" class="hover:text-white transition-colors">
                        {{ data.footer.contact.phone }}
                      </a>
                    </li>
                    <li v-if="data.footer.contact.address" class="flex items-start">
                      <svg class="w-5 h-5 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="hover:text-white transition-colors">
                        {{ data.footer.contact.address }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Copyright -->
              <div class="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                <p>{{ data.footer.copyright || `© ${new Date().getFullYear()} All rights reserved.` }}</p>
              </div>
            </div>
          </footer>
        </div>
      </template>
      
      <script lang="ts">
      import { defineComponent, ref } from 'vue';
      import { modernLandingSchema, type ModernLandingData } from '../schemas/modernLanding.schema';
      
      export default defineComponent({
        name: 'ModernLanding',
        props: {
          initialData: {
            type: Object as () => ModernLandingData,
            required: true,
            validator: (value: unknown) => {
              try {
                modernLandingSchema.parse(value);
                return true;
              } catch (error) {
                console.error('Invalid landing page data:', error);
                return false;
              }
            }
          }
        },
        setup(props) {
          const isMobileMenuOpen = ref(false);
          const data = ref<ModernLandingData>(props.initialData);
          
          // Close mobile menu when route changes
          const closeMobileMenu = () => {
            isMobileMenuOpen.value = false;
          };
          
          return {
            data,
            isMobileMenuOpen,
            closeMobileMenu
          };
        }
      });
      </script>
      
      <style scoped>
      /* Custom styles can be added here */
      .modern-landing {
        --color-primary: #4f46e5;
        --color-primary-100: #e0e7ff;
        --color-primary-600: #4f46e5;
        --color-secondary: #10b981;
        --color-secondary-100: #d1fae5;
        --color-secondary-600: #10b981;
      }
      
      .btn {
        @apply inline-flex items-center justify-center rounded-md px-5 py-2.5 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
      }
      
      .btn-primary {
        @apply bg-primary-600 text-white hover:bg-primary-700;
      }
      
      .btn-secondary {
        @apply bg-secondary-600 text-white hover:bg-secondary-700;
      }
      
      .btn-outline {
        @apply border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50;
      }
      
      .btn-ghost {
        @apply bg-transparent text-gray-700 hover:bg-gray-100;
      }
      
      /* Animation for hero section */
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
