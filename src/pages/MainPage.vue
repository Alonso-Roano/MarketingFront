<template>
  <main class="bg-black">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-neutral-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <span class=" uppercase tracking-widest cursor-pointer  font-sans text-xl font-bold bg-gradient-to-r from-gray-400 via-gray-300  to-gray-400  text-transparent bg-clip-text">
              NIUX
            </span>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-center space-x-8 ">
              <a href="#" class="text-gray-300 hover:text-white px-3 py-2 text-sm rounded-md font-medium transition-colors duration-200">Home</a>
              <a href="#features" class="text-gray-300 hover:text-white  px-3 py-2 text-sm rounded-md font-medium transition-colors duration-200">Features</a>
              <a href="#testimonials" class="text-gray-300 hover:text-white px-3 py-2 text-sm rounded-md font-medium transition-colors duration-200">Testimonials</a>
              <a href="#contact" class="text-gray-300 hover:text-white px-3 py-2 text-sm rounded-md font-medium transition-colors duration-200">Contact</a>
            </div>
          </div>
          
          <!-- Auth Buttons -->
          <div class="flex items-center space-x-6">
            <router-link to="/login" class="  text-white py-2  relative  rounded-md  group  text-sm font-medium transition-colors duration-200">
              Iniciar Sesión
              <span class=" absolute block bottom-1   w-0  group-hover:w-full    bg-white/90 rounded-full z-[-1] h-[2px] transition-all duration-200 ease-in-out"></span>

            </router-link>
            <router-link to="/register" class=" py-2 text-white  relative  text-sm font-medium  group ">
              Registrarse
              <span class=" absolute block bottom-1   w-0  group-hover:w-full    bg-white/90 rounded-full z-[-1] h-[2px] transition-all duration-200 ease-in-out"></span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="relative flex min-h-screen w-full flex-col items-center justify-center pt-16">
    
      <FallingStarsBg class="bg-black" />
     
      <div class="z-[2] flex  flex-col items-center gap-2">
        <BlurReveal
          :delay="0.5"
          class="flex flex-col items-center justify-center gap-4"
        >
        <span class="flex flex-col items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl">
  <span>
    Empowering
    <FlipWords
      :words="['smarter', 'faster', 'better']"
      :duration="3000"
      class="text-purple-400 opacity-95"
    />
  </span>
  marketing decisions
</span>
  
          <span class="text-center text-xl text-white/90 tracking-wider">
            Inspira UI is the new way to build beautiful website
          </span>
  
          <div class="my-2 flex flex-row items-center justify-center gap-4">
            
  <div class="z-10 flex min-h-64 items-center justify-center">
    <div class="flex min-h-64 items-center justify-center">
   
    <InteractiveHoverButton text="Contact Us" />
  </div>
  </div>

          
  <div class="z-10 flex min-h-64 items-center justify-center">
  <span class="px-3.5 py-[12px] hover:bg-purple-400/15 border border-dashed border-purple-400/70    cursor-pointer duration-100  bg-purple-400/10 rounded-full whitespace-pre-wrap text-center text-purple-300 font-medium">
    Discover How It Works
  </span>
</div>

          </div>
  
       
        </BlurReveal>
      </div>
    </section>
    <section class="dark mt-50">
      <span class=" text-white block text-center text-4xl font-semibold pt-5 pb-7    ">Conoce las funcionalidades de  <strong>NIUX</strong> </span>
      <span class="text-center text-lg font-light block text-white/90 tracking-wider pb-12">Nuestros servicios te ayudarán a mejorar tus procesos de <span class=" relative inline-block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent capitalize font-bold">marketing </span></span>
  <BentoGrid class="mx-auto max-w-4xl ">
    <BentoGridItem
      v-for="(item, index) in items"
      :key="index"
      :class="index === 3 || index === 6 ? 'md:col-span-2 intersect-once intersect:motion-preset-fade' : ' intersect-once intersect:motion-preset-fade'"
    >
      <template #header>
        <div class="flex size-full animate-pulse space-x-4">
          <div class="flex size-full flex-1 rounded-md bg-zinc-800"></div>
        </div>
      </template>

      <template #title>
        <strong>{{ item.title }}</strong>
      </template>

      <template #icon> </template>

      <template #description>
        <p>{{ item.description }}</p>
      </template>
    </BentoGridItem>
  </BentoGrid>
</section>
    <section class=" dark">
      <div class="flex flex-col gap-4 py-12 text-center text-black  dark:text-white dark:bg-black">
      <div class="text-3xl font-semibold sm:text-4xl   ">What people say about us</div>
      <div class="text-lg font-light sm:text-xl">
        Here's what people say about <strong> Inspira UI</strong>
      </div>
    </div>
    <div
    class="relative  flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
  >
    <!-- First Marquee -->
    <Marquee
      pause-on-hover
      class="[--duration:20s]"
    >
      <ReviewCard
        v-for="review in firstRow"
        :key="review.username"
        :img="review.img"
        :name="review.name"
        :username="review.username"
        :body="review.body"
      />
    </Marquee>

    <!-- Second Marquee (reverse) -->
    <Marquee
      reverse
      pause-on-hover
      class="[--duration:20s]"
    >
      <ReviewCard
        v-for="review in secondRow"
        :key="review.username"
        :img="review.img"
        :name="review.name"
        :username="review.username"
        :body="review.body"
      />
    </Marquee>

    <!-- Left Gradient -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r  from-white dark:from-background"
    ></div>

    <!-- Right Gradient -->
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
    ></div>
  </div>
</section>


</main>
  </template>

<script setup lang="ts">
import FallingStarsBg from '@/shared/components/ui/bg-falling-stars/FallingStarsBg.vue'
import BlurReveal from '@/shared/components/ui/blur-reveal/BlurReveal.vue'
import FlipWords from '@/shared/components/ui/flip-words/FlipWords.vue'
import Marquee from '@/shared/components/ui/marquee/Marquee.vue'
import ReviewCard from '@/shared/components/ui/marquee/ReviewCard.vue'
import { ref } from 'vue'
import BentoGrid from '@/shared/components/ui/bento-grid/BentoGrid.vue'
import BentoGridItem from '@/shared/components/ui/bento-grid/BentoGridItem.vue'
import InteractiveHoverButton from '@/shared/components/ui/interactive-hover-button/InteractiveHoverButton.vue'
import { Observer } from 'tailwindcss-intersect';
import { onMounted } from 'vue';
onMounted(() => {
    Observer.start();
})
// Reviews data
const reviews = [
  {
    name: "kiri",
    username: "@kiruba_selvi6",
    body: "Oooohhh wowww...!!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Sébastien Chopin",
    username: "@Atinux",
    body: "You ship 🚢",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Mattia Guariglia",
    username: "@matt_guariglia",
    body: "Omg 🥰",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Nelson🐐",
    username: "@Mathiasokafor3",
    body: "Thank you so much for all you do for the Vue/nuxt eco system.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Premdas Vm",
    username: "@premdasvm",
    body: "Man, this is soo good! I've been jealous of React because their eco-system had Magic UI and other ones like this. Inspira UI is 🔥🙌🏼",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Pierre",
    username: "@PierreHenryBap",
    body: "It looks really awesome! Just noticed it a couple of days ago and I can’t wait to try it out.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Waldemar Enns",
    username: "@WaldemarEnns",
    body: "Awesome! ⭐️ed it immediately",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
];

// Split reviews into two rows
const firstRow = ref(reviews.slice(0, reviews.length / 2));
const secondRow = ref(reviews.slice(reviews.length / 2));
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and experience design.",
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
  },
];
</script>
<style scoped>
.marquee {
  --duration: 40s;
  position: absolute;
  left: -10%;
  width: 120%;
  padding: 0.5rem 0;
}


</style>