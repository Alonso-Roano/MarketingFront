<template>
  <footer class="bg-black/90 backdrop-blur-md border-t border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand Column -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <img :src="Logo" alt="NIUX Logo" class="size-8 object-contain aspect-square rounded-full opacity-95">
            <span class="uppercase tracking-widest text-xl font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 text-transparent bg-clip-text">
              NIUX
            </span>
          </div>
          <p class="text-gray-400 text-sm">
            Potenciando tus decisiones de marketing con inteligencia artificial y análisis de datos avanzados.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <span class="sr-only">Twitter</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <span class="sr-only">GitHub</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links Columns -->
        <div>
          <h3 class="text-sm font-semibold text-white tracking-wider uppercase">Producto</h3>
          <ul class="mt-4 space-y-2">
            <li><a href="#features" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Características</a></li>
            <li><a href="#pricing" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Precios</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Documentación</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Guías</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white tracking-wider uppercase">Compañía</h3>
          <ul class="mt-4 space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Sobre Nosotros</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Blog</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Carreras</a></li>
            <li><a href="#contact" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
          <ul class="mt-4 space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Política de Privacidad</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Términos de Servicio</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Política de Cookies</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">
          &copy; {{ new Date().getFullYear() }} NIUX. Todos los derechos reservados.
        </p>
        <div class="mt-4 md:mt-0 flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
            Términos
          </a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
            Privacidad
          </a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from '/logo.webp' // Asegúrate de tener el logo en la ruta correcta
</script>