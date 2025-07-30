<template>
  <main class="bg-black">
    <!-- Navigation Bar -->
   
    <NavigationBar />

    <section id="home" class="relative flex min-h-screen w-full flex-col items-center justify-center pt-30">
  <FallingStarsBg class="bg-black" />

  <div class="z-[2] flex flex-col items-center gap-2">
    <BlurReveal
      :delay="0.5"
      class="flex flex-col items-center justify-center gap-4"
    >
      <span class="flex flex-col pb-3  items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
        <span>
          Toma decisiones de marketing
          <FlipWords
            :words="['más inteligentes', 'más rápidas', 'más efectivas']"
            :duration="3000"
            class="text-purple-400 opacity-95"
          />
        </span>
        con inteligencia artificial
      </span>

      <span class="text-center block lg:text-xl text-md text-white/90 tracking-wider lg:w-1/2 w-full mx-auto mt-4">
         Utiliza machine learning para clasificar negocios, optimizar campañas publicitarias y generar estrategias de marketing personalizadas.
      </span>

      <div class="my-2 flex flex-row items-start mt-10  justify-center gap-4">
        <div class="z-10 flex min-h-64 items-start justify-center">
          <div class="flex min-h- items-center justify-center">
            <router-link to="/contact">
            <InteractiveHoverButton text="Contáctanos" />
            </router-link>
          </div>
        </div>

        <div class="z-10 flex min-h-64 items-start justify-center ">
          <router-link to="/features" class=" flex items-center gap-2 justify-center px-3.5 py-2.5 hover:bg-purple-400/15 border border-dashed border-purple-400/70 cursor-pointer duration-100 bg-purple-400/10 rounded-full whitespace-pre-wrap text-center text-purple-300 font-medium">
          <Lightbulb class="size-6 text-purple-300" />
          <span class="">
            Descubre cómo funciona
          </span>
          </router-link>
        </div>
      </div>
    </BlurReveal>
  </div>
</section>
    <section class="dark pt-25 mt-25" id="features">
>
      <span class=" text-white block text-center lg:text-4xl  text-2xl font-semibold pt-5 pb-7    ">Conoce las funcionalidades de  <strong>NIUX</strong> </span>
      <span class="text-center lg:text-lg text-sm font-light block text-white/90 tracking-wider pb-12">Nuestros servicios te ayudarán a mejorar tus procesos de <span class=" relative inline-block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent capitalize font-bold">marketing </span></span>
  <BentoGrid class="mx-auto max-w-4xl ">
    <BentoGridItem
      v-for="(item, index) in items"
      :key="index"
      :class="index === 3 || index === 6 ? 'md:col-span-2 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700' : 'translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700'"
    >
    <template #header>
        <div class=" size-full flex-1  rounded-md bg-zinc-800 overflow-hidden  space-x-4">
         
            <img :src="item.img" class="size-full  object-fill  rounded-md" alt="">
         
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
    <section class=" dark pt-25 mt-25" id="testimonials">
      <div class="flex flex-col gap-4 py-12 text-center text-black  dark:text-white dark:bg-black">
      <div class="text-3xl font-semibold sm:text-4xl   ">¿Qué dicen las personas sobre nosotros?</div>
      <div class="text-lg font-light sm:text-xl">
        Aquí está lo que dicen las personas sobre <strong>NIUX</strong>
      </div>
    </div>
    <div
    class="relative  flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
  >
    <!-- First Marquee -->
    <Marquee
      :pause-on-hover="true"
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
      :pause-on-hover="true"
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
<section class="dark mt-50" id="contact">
<FooterComponent />
</section>


</main>
  </template>

<script setup lang="ts">
import NavigationBar from '@/shared/components/NavigationBar.vue'
import FallingStarsBg from '@/shared/components/ui/bg-falling-stars/FallingStarsBg.vue'
import BlurReveal from '@/shared/components/ui/blur-reveal/BlurReveal.vue'
import FlipWords from '@/shared/components/ui/flip-words/FlipWords.vue'
import Marquee from '@/shared/components/ui/marquee/Marquee.vue'
import ReviewCard from '@/shared/components/ui/marquee/ReviewCard.vue'
import { ref } from 'vue'
import BentoGrid from '@/shared/components/ui/bento-grid/BentoGrid.vue'
import BentoGridItem from '@/shared/components/ui/bento-grid/BentoGridItem.vue'
import InteractiveHoverButton from '@/shared/components/ui/interactive-hover-button/InteractiveHoverButton.vue'

import { Lightbulb } from 'lucide-vue-next';
import { Observer } from 'tailwindcss-intersect';
import { onMounted } from 'vue';
import Web from "@/assets/images/features-marketing/web.jpg"
import FooterComponent from '@/shared/components/others/FooterComponent.vue';
import Market from '@/assets/images/features-marketing/market.jpg'
import Seo from '@/assets/images/features-marketing/seo.jpg'
import DigitalMarketing from "@/assets/images/features-marketing/digital-marketing.jpg"
import Brain from "@/assets/images/features-marketing/brain.png"
import ImgSi from "@/assets/images/features-marketing/img-si.png"
import Stadistic from "@/assets/images/features-marketing/stadistic.png"
onMounted(() => {
    Observer.start();
})
// Reviews data
const reviews = [
  {
    name: "Ana Morales",
    username: "@AnaMorales_Mkt",
    body: "¡Increíble! NIUX clasificó nuestro rubro automáticamente y mejoró nuestro SEO en semanas. ¡Resultados reales!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg", // Imagen sugerida: avatar de una profesional de marketing
  },
  {
    name: "Carlos Rivera",
    username: "@CarlosR_Agency",
    body: "Las predicciones de clics y costos de NIUX nos ayudaron a optimizar nuestras campañas en Google Ads.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg", // Imagen sugerida: avatar de un dueño de agencia
  },
  {
    name: "Laura Gómez",
    username: "@LauraG_Startup",
    body: "La misión y visión generadas por NIUX capturan perfectamente la esencia de nuestra startup. ¡Súper útil!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg", // Imagen sugerida: avatar de una emprendedora
  },
  {
    name: "Miguel Torres",
    username: "@MiguelT_Marketing",
    body: "Con NIUX descubrimos palabras clave que dispararon nuestro tráfico orgánico. ¡Herramienta imprescindible!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg", // Imagen sugerida: avatar de un especialista SEO
  },
  {
    name: "Sofía Vargas",
    username: "@SofiaV_CMO",
    body: "NIUX nos dijo exactamente qué canal usar para nuestra campaña. ¡Ahorramos tiempo y dinero!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg", // Imagen sugerida: avatar de una CMO
  },
  {
    name: "Javier López",
    username: "@JavierL_Data",
    body: "Los análisis de patrones de mercado de NIUX nos dieron una ventaja competitiva clara. ¡Impresionante!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg", // Imagen sugerida: avatar de un analista de datos
  },
  {
    name: "Elena Martínez",
    username: "@ElenaM_Ads",
    body: "Simular campañas con NIUX nos permitió tomar decisiones basadas en datos. ¡Resultados garantizados!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg", // Imagen sugerida: avatar de una especialista en publicidad
  },
];




// Split reviews into two rows
const firstRow = ref(reviews.slice(0, reviews.length / 2));
const secondRow = ref(reviews.slice(reviews.length / 2));
const items = [
  {
    title: "Clasificación Automática de Negocios",
    description: "Identifica al instante el rubro de tu negocio analizando descripciones y palabras clave con machine learning, optimizando tu posicionamiento.",
    img: Brain,

  },
  {
    title: "Recomendaciones de Palabras Clave",
    description: "Obtén sugerencias de keywords personalizadas para mejorar tu SEO y atraer más clientes a tu sitio web o anuncios.",
    img: Seo,

  },
  {
    title: "Predicción de Campañas Publicitarias",
    description: "Estima impresiones, clics y costos de tus campañas con modelos de regresión para maximizar tu retorno de inversión.",
    img: Market,

  },
  {
    title: "Optimización de Estrategias de Marketing",
    description: "Descubre el mejor canal, servicio y día para lanzar tus campañas, basándote en análisis predictivo avanzado.",
    img: DigitalMarketing,

  },
  {
    title: "Generación de Misión y Visión",
    description: "Crea declaraciones de misión y visión únicas para tu empresa, basadas en su descripción, tamaño y alcance geográfico.",
    img: Stadistic,

  },
  {
    title: "Análisis de Patrones de Mercado",
    description: "Identifica tendencias y palabras clave frecuentes por rubro o región para alinear tus estrategias con el mercado.",
    img: ImgSi,

    },
  {
    title: "Diseño de landing pages",
    description: "Diseña landing pages personalizadas para tu negocio con machine learning, optimizando tu posicionamiento.",
    img: Web,

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