import { createApp } from 'vue'
import Toast from "vue-toastification";
import App from './App.vue'
import router from './routes/router'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'

// Componentes usados
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Menubar from 'primevue/menubar';
import ConfirmDialog from 'primevue/confirmdialog';
import "vue-toastification/dist/index.css";
import './style/style.css'
import 'primeicons/primeicons.css';

const pinia = createPinia()
pinia.use(piniaPersistedstate)

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Toast);
app.use(ConfirmationService);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})


app.component('Button', Button)
app.component('InputText', InputText)
app.component('Menu', Menubar)
app.component('ConfirmDialog', ConfirmDialog)

app.mount('#app');
