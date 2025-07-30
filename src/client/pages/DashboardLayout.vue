<template>
  <div class="min-h-screen flex flex-col dark:bg-gray-900 text-gray-900 dark:text-white">
    <Navbar />

    <main class="flex flex-col pt-20 px-6 bg-black">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/shared/components/Dashboard/Navbar.vue'
</script>
