<template>
  <main class="bg-black">
    <!-- Navigation Bar -->
    <NavigationBar />

    <section id="features-hero" class="relative flex min-h-screen w-full flex-col items-center justify-center pt-30">
      <div class="z-[2] flex flex-col items-center gap-2">
        <BlurReveal
          :delay="0.5"
          class="flex flex-col items-center justify-center gap-4"
        >
          <span class="flex flex-col pb-3 items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
            <span>
              Características principales de
              <span class="text-purple-400 opacity-95">NIUX</span>
            </span>
            para tu estrategia digital
          </span>

          <span class="text-center block lg:text-xl text-md text-white/90 tracking-wider lg:w-1/2 w-full mx-auto mt-4">
            Explora las funcionalidades que hacen de NIUX la plataforma líder en marketing impulsado por inteligencia artificial
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

    

    <section class="dark pt-25 mt-25" id="process">
      <span class="text-white block text-center lg:text-4xl text-2xl font-semibold pt-5 pb-7">Nuestro proceso de <strong>inteligencia artificial</strong></span>
      <span class="text-center lg:text-lg text-sm font-light block text-white/90 tracking-wider pb-12">Así es como <span class="relative inline-block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent capitalize font-bold">NIUX</span> transforma tus datos en estrategias efectivas</span>
      
      <div class="max-w-4xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">1</div>
              <h3 class="ml-4 text-xl font-semibold text-white">Recopilación de datos</h3>
            </div>
            <p class="text-white/80">Nuestros algoritmos recopilan información relevante sobre tu negocio, industria y audiencia objetivo para crear una base de datos personalizada.</p>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-100">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">2</div>
              <h3 class="ml-4 text-xl font-semibold text-white">Análisis y procesamiento</h3>
            </div>
            <p class="text-white/80">Utilizamos técnicas avanzadas de machine learning para analizar patrones, tendencias y comportamientos que serían imposibles de detectar manualmente.</p>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-200">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">3</div>
              <h3 class="ml-4 text-xl font-semibold text-white">Generación de estrategias</h3>
            </div>
            <p class="text-white/80">Nuestros modelos predictivos generan recomendaciones personalizadas para optimizar tus campañas de marketing y maximizar tu ROI.</p>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-300">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">4</div>
              <h3 class="ml-4 text-xl font-semibold text-white">Implementación y mejora continua</h3>
            </div>
            <p class="text-white/80">Implementamos las estrategias generadas y monitoreamos constantemente su rendimiento para realizar ajustes y mejoras en tiempo real.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="dark pt-25 mt-25" id="competitive-advantages">
      <span class="text-white block text-center lg:text-4xl text-2xl font-semibold pt-5 pb-7">Ventajas <strong>competitivas</strong></span>
      <span class="text-center lg:text-lg text-sm font-light block text-white/90 tracking-wider pb-12">Lo que hace a <span class="relative inline-block bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent capitalize font-bold">NIUX diferente</span> de otras soluciones</span>
      
      <div class="max-w-4xl mx-auto px-4 pb-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700">
            <div class="flex flex-col items-center mb-4">
              <div class="w-16 h-16 mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white text-center">Velocidad incomparable</h3>
            </div>
            <p class="text-white/80 text-center">Obtén resultados y análisis hasta 10 veces más rápido que con métodos tradicionales, permitiéndote tomar decisiones ágiles en un mercado competitivo.</p>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-100">
            <div class="flex flex-col items-center mb-4">
              <div class="w-16 h-16 mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white text-center">Precisión garantizada</h3>
            </div>
            <p class="text-white/80 text-center">Nuestros algoritmos alcanzan una precisión del 95% en predicciones de comportamiento del consumidor, superando significativamente el promedio de la industria.</p>
          </div>
          
          <div class="bg-zinc-900/50 p-6 rounded-lg border border-purple-500/20 translate-y-6 opacity-0 intersect:translate-y-0 intersect:opacity-100 transition duration-700 delay-200">
            <div class="flex flex-col items-center mb-4">
              <div class="w-16 h-16 mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white text-center">ROI maximizado</h3>
            </div>
            <p class="text-white/80 text-center">Nuestros clientes experimentan un aumento promedio del 40% en su retorno de inversión durante los primeros 3 meses de implementación de nuestras estrategias.</p>
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
import { Observer } from 'tailwindcss-intersect'
import { onMounted } from 'vue'

onMounted(() => {
  Observer.start()
})










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