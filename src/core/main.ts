import { createApp } from 'vue'

import App from './App.vue'
import router from './routes/router'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';


// Componentes usados
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import './style/style.css'

const pinia = createPinia()
pinia.use(piniaPersistedstate)

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})


app.component('Button', Button)
app.component('InputText', InputText)

app.mount('#app');
