<template>
<main class=" h-screen px-6 py-10">
    <h4 class=" text-white/90 text-3xl tracking-tight font-bold mb-10">Landing Page</h4>
         <div
            class="col-span-full flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-700 rounded-xl p-10 "
          >
            <span class="pi pi-info-circle text-3xl text-purple-400 bg-purple-700/30 rounded-full mb-4" />
            <h2 class="text-lg font-semibold mb-2 text-white/90">No se ha creado una landing</h2>
            <p class="text-gray-400 mb-4">
              Crea tu landing page personalizada para comenzar a promocionar tu empresa.
            </p>
            <RouterLink :to="{name:'NewLanding'}"
              class="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-lg transition"
            >
              <span class="pi pi-plus" />
              Crear landing page
            </RouterLink>
          </div>

</main>
</template>
<script lang="ts" setup>
import { apiRequest } from "@/core/api/apiClient";
import LandingService from "@/landing/services/formLandingService";
import UserService from "@/landing/services/userService";
import { onMounted } from "vue";
const userAuth=JSON.parse(localStorage.getItem("auth")??"{}")
const landingService=new LandingService()
const userService=new UserService(userAuth);
const userId=userService.getUserId()
const refTkn= userService.getRefreshToken()
console.log(userId)
console.log(refTkn)
onMounted(()=>{
  if(!userId|| !refTkn){
  }
})
</script>