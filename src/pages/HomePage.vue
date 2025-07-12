<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h1 class="text-xl font-bold">Auth Store Test</h1>

    <div v-if="authStore.user">
      <p class="text-green-700">Logueado como: {{ authStore.user.email }}</p>
      <p><strong>Access Token:</strong> {{ authStore.accessToken }}</p>
      <p><strong>Refresh Token:</strong> {{ authStore.refreshToken }}</p>
      <button @click="logout" class="mt-2 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
    </div>

    <div v-else>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border p-2 w-full"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 w-full mt-2"
      />
      <div class="flex gap-2 mt-2">
        <button @click="doLogin" class="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        <button @click="doRegister" class="px-4 py-2 bg-green-500 text-white rounded">Register</button>
      </div>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@auth/stores/authStore'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const doLogin = async () => {
  errorMessage.value = ''
  try {
    await authStore.login(email.value, password.value)
  } catch (err: any) {
    errorMessage.value = err.message || 'Error al iniciar sesión'
  }
}

const doRegister = async () => {
  errorMessage.value = ''
  try {
    await authStore.register(email.value, password.value)
  } catch (err: any) {
    errorMessage.value = err.message || 'Error al registrarse'
  }
}

const logout = () => {
  authStore.logout()
}
</script>
