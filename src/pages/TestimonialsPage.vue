<template>
  <main class="bg-black">
    <!-- Navigation Bar -->
    <NavigationBar />

    <section id="testimonials-hero" class="relative flex min-h-screen w-full flex-col items-center justify-center pt-30">
      <div class="z-[2] flex flex-col items-center gap-2">
        <BlurReveal
          :delay="0.5"
          class="flex flex-col items-center justify-center gap-4"
        >
          <span class="flex flex-col pb-3 items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
            <span>
              Lo que nuestros clientes dicen sobre
              <span class="text-purple-400 opacity-95">NIUX</span>
            </span>
          </span>

          <span class="text-center block lg:text-xl text-md text-white/90 tracking-wider lg:w-1/2 w-full mx-auto mt-4">
            Descubre cómo NIUX ha transformado las estrategias de marketing de empresas de todos los tamaños
          </span>

          <div class="my-2 flex flex-row items-start mt-10 justify-center gap-4">
            <div class="z-10 flex items-start justify-center">
              <router-link to="/contact">
                <InteractiveHoverButton text="Solicitar demo" />
              </router-link>
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>

    <!-- Testimonios Destacados -->
    <section class="dark pt-25 mt-25" id="featured-testimonials">
      <span class="text-white block text-center lg:text-4xl text-2xl font-semibold pt-5 pb-7">Testimonios <strong>destacados</strong></span>
      <span class="text-center lg:text-lg text-sm font-light block text-white/90 tracking-wider pb-12">Experiencias reales de clientes que han utilizado <span class="relative inline-block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent capitalize font-bold">NIUX</span></span>
      
      <div class="max-w-4xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700">
            <div class="flex flex-col items-center mb-6">
              <div class="w-20 h-20 mb-4 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Garcia" class="w-full h-full object-cover" />
              </div>
              <h3 class="text-xl font-semibold text-white text-center">Maria Garcia</h3>
              <p class="text-purple-400 text-sm">Product Manager at InnovateCo</p>
              <div class="flex text-yellow-400 mt-2">
                <span v-for="i in 5" :key="i" class="text-lg">★</span>
              </div>
            </div>
            <p class="text-white/80 text-center italic">"Las funciones de gestión de tareas han sido un cambio radical para nuestro equipo de producto. ¡Altamente recomendado!"</p>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-100">
            <div class="flex flex-col items-center mb-6">
              <div class="w-20 h-20 mb-4 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex Johnson" class="w-full h-full object-cover" />
              </div>
              <h3 class="text-xl font-semibold text-white text-center">Alex Johnson</h3>
              <p class="text-purple-400 text-sm">CTO at TechCorp</p>
              <div class="flex text-yellow-400 mt-2">
                <span v-for="i in 5" :key="i" class="text-lg">★</span>
              </div>
            </div>
            <p class="text-white/80 text-center italic">"NIUX ha transformado la forma en que nuestro equipo remoto colabora. La interfaz es intuitiva y las características son exactamente lo que necesitábamos."</p>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-200">
            <div class="flex flex-col items-center mb-6">
              <div class="w-20 h-20 mb-4 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="James Wilson" class="w-full h-full object-cover" />
              </div>
              <h3 class="text-xl font-semibold text-white text-center">James Wilson</h3>
              <p class="text-purple-400 text-sm">Lead Developer at DevHouse</p>
              <div class="flex text-yellow-400 mt-2">
                <span v-for="i in 5" :key="i" class="text-lg">★</span>
              </div>
            </div>
            <p class="text-white/80 text-center italic">"La API está bien documentada y la plataforma es increíblemente estable. ¡A nuestros desarrolladores les encanta!"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonios en Carrusel -->
    <section class="dark pt-25 mt-25" id="testimonials-carousel">
      <div class="flex flex-col gap-4 py-12 text-center text-black dark:text-white dark:bg-black">
        <div class="text-3xl font-semibold sm:text-4xl">Más opiniones sobre NIUX</div>
        <div class="text-lg font-light sm:text-xl">
          Conoce lo que dicen nuestros usuarios sobre su experiencia
        </div>
      </div>
      <div
        class="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
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
          class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
        ></div>

        <!-- Right Gradient -->
        <div
          class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
        ></div>
      </div>
    </section>

    <!-- Sección de Casos de Éxito -->
    <section class="dark pt-25 mt-25" id="success-stories">
      <span class="text-white block text-center lg:text-4xl text-2xl font-semibold pt-5 pb-7">Casos de <strong>éxito</strong></span>
      <span class="text-center lg:text-lg text-sm font-light block text-white/90 tracking-wider pb-12">Empresas que han mejorado sus resultados con <span class="relative inline-block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent capitalize font-bold">NIUX</span></span>
      
      <div class="max-w-4xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">1</div>
              <h3 class="ml-4 text-xl font-semibold text-white">TechStart Inc.</h3>
            </div>
            <p class="text-white/80 mb-4">Una startup de tecnología que aumentó sus conversiones en un 45% después de implementar las estrategias de marketing recomendadas por NIUX.</p>
            <div class="flex justify-between items-center">
              <span class="text-purple-400 font-semibold">+45% conversiones</span>
              <span class="text-white/60 text-sm">3 meses de implementación</span>
            </div>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-100">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">2</div>
              <h3 class="ml-4 text-xl font-semibold text-white">Global Retail Co.</h3>
            </div>
            <p class="text-white/80 mb-4">Una cadena minorista internacional que optimizó su presupuesto de marketing y aumentó el ROI en un 60% utilizando las predicciones de NIUX.</p>
            <div class="flex justify-between items-center">
              <span class="text-purple-400 font-semibold">+60% ROI</span>
              <span class="text-white/60 text-sm">6 meses de implementación</span>
            </div>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-200">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">3</div>
              <h3 class="ml-4 text-xl font-semibold text-white">HealthPlus</h3>
            </div>
            <p class="text-white/80 mb-4">Una clínica de salud que mejoró su posicionamiento en buscadores y aumentó el tráfico orgánico en un 75% gracias a las recomendaciones de palabras clave de NIUX.</p>
            <div class="flex justify-between items-center">
              <span class="text-purple-400 font-semibold">+75% tráfico orgánico</span>
              <span class="text-white/60 text-sm">4 meses de implementación</span>
            </div>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-300">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">4</div>
              <h3 class="ml-4 text-xl font-semibold text-white">EduLearn Academy</h3>
            </div>
            <p class="text-white/80 mb-4">Una plataforma educativa que redujo sus costos de adquisición de clientes en un 35% y aumentó sus inscripciones en un 50% utilizando las estrategias de NIUX.</p>
            <div class="flex justify-between items-center">
              <span class="text-purple-400 font-semibold">-35% CAC, +50% inscripciones</span>
              <span class="text-white/60 text-sm">5 meses de implementación</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="dark mt-50" id="contact">
      <FooterComponent />
    </section>
  </main>
</template>

<script setup lang="ts">
import NavigationBar from '@/shared/components/NavigationBar.vue'
import BlurReveal from '@/shared/components/ui/blur-reveal/BlurReveal.vue'
import InteractiveHoverButton from '@/shared/components/ui/interactive-hover-button/InteractiveHoverButton.vue'
import FooterComponent from '@/shared/components/others/FooterComponent.vue'
import Marquee from '@/shared/components/ui/marquee/Marquee.vue'
import ReviewCard from '@/shared/components/ui/marquee/ReviewCard.vue'
import { Observer } from 'tailwindcss-intersect'
import { onMounted, ref } from 'vue'

onMounted(() => {
  Observer.start()
})

// Reviews data para el carrusel
const reviews = [
  {
    name: "Ana Morales",
    username: "@AnaMorales_Mkt",
    body: "¡Increíble! NIUX clasificó nuestro rubro automáticamente y mejoró nuestro SEO en semanas. ¡Resultados reales!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Carlos Rivera",
    username: "@CarlosRTech",
    body: "La predicción de campañas de NIUX nos ahorró miles en publicidad. Precisión sorprendente.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Laura Mendoza",
    username: "@LauraMendoza",
    body: "Implementamos las recomendaciones de palabras clave y nuestro tráfico orgánico creció un 40% en solo 2 meses.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Roberto Sánchez",
    username: "@RobertoSanchez",
    body: "La misión y visión generadas por NIUX capturaron perfectamente la esencia de nuestra empresa. Impresionante.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Patricia Gómez",
    username: "@PatriciaGomez",
    body: "El análisis de patrones de mercado nos dio insights que nunca hubiéramos descubierto por nuestra cuenta.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Miguel Ángel",
    username: "@MiguelAngel_CEO",
    body: "Nuestra landing page generada por NIUX tiene una tasa de conversión 3 veces mayor que la anterior. Excelente.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Elena Martínez",
    username: "@ElenaM_Ads",
    body: "Simular campañas con NIUX nos permitió tomar decisiones basadas en datos. ¡Resultados garantizados!",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
  {
    name: "Javier López",
    username: "@JavierLopez",
    body: "La optimización de estrategias de marketing nos ayudó a elegir el mejor canal y día para nuestras campañas.",
    img: "https://cdn.inspira-ui.com/images/x-logo.svg",
  },
];

// Split reviews into two rows
const firstRow = ref(reviews.slice(0, reviews.length / 2));
const secondRow = ref(reviews.slice(reviews.length / 2));
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