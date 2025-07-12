import { createApp } from 'vue'
import './style/style.css'
import App from './App.vue'
import router from './routes/router'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

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

app.mount('#app');
