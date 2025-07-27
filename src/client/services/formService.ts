import { useAuthStore } from '@/auth/stores/authStore';
import { apiRequest } from '@/core/api/apiClient';
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';

export interface UserFriendlyFormData {
    no_of_days: number;
    approved_budget: number;
    clicks: number;
    impressions: number;
    selected_ext_service: number;
    selected_channel: number;
    selected_weekday_cat: number;
    nombre: string;
    icono: string;
    primary_color: string;
    description: string;
    size: string;
    scope: string;
    industry: string;
    media_cost_usd: number;
}

export interface SelectOption {
    value: number;
    label: string;
    real?: string;
}

export function useDropdowns() {
    // Datos del formulario reactivo
    const userFriendlyData = reactive<UserFriendlyFormData>({
        no_of_days: 1,
        approved_budget: 1000,
        clicks: 50,
        impressions: 1000,
        selected_ext_service: 0,
        selected_channel: 0,
        selected_weekday_cat: 0,

        nombre: '',
        icono: '',
        primary_color: '',
        description: '',
        size: '',
        scope: '',
        industry: '',
        media_cost_usd: 0,
    });

    // Iconos
    const iconDropdownOpen = ref(false);
    const iconOptions = [
    { class: 'pi pi-chart-line', label: 'Gráfico de Línea' },
    { class: 'pi pi-users', label: 'Usuarios' },
    { class: 'pi pi-bolt', label: 'Relámpago' },
    { class: 'pi pi-globe', label: 'Globo' },
    { class: 'pi pi-dollar', label: 'Dinero' },
    { class: 'pi pi-calendar', label: 'Calendario' },
    { class: 'pi pi-envelope', label: 'Correo' },
    { class: 'pi pi-video', label: 'Video' },
    { class: 'pi pi-chart-bar', label: 'Gráfico de Barras' },
    { class: 'pi pi-tags', label: 'Etiquetas' },
    { class: 'pi pi-bell', label: 'Notificaciones' },
    { class: 'pi pi-shopping-cart', label: 'Carrito de Compras' },
    { class: 'pi pi-share-alt', label: 'Compartir' },
    { class: 'pi pi-thumbs-up', label: 'Me Gusta' },
    { class: 'pi pi-star', label: 'Estrella' },
    { class: 'pi pi-mobile', label: 'Móvil' },
    { class: 'pi pi-desktop', label: 'Escritorio' },
    { class: 'pi pi-clock', label: 'Reloj' },
    { class: 'pi pi-search', label: 'Buscar' },
    { class: 'pi pi-cog', label: 'Configuración' },
    { class: 'pi pi-eye', label: 'Vista' },
    { class: 'pi pi-heart', label: 'Favorito' },
    { class: 'pi pi-camera', label: 'Cámara' },
    { class: 'pi pi-upload', label: 'Subir' },
    { class: 'pi pi-download', label: 'Descargar' },
    { class: 'pi pi-lock', label: 'Bloquear' },
    { class: 'pi pi-unlock', label: 'Desbloquear' },
    { class: 'pi pi-map-marker', label: 'Ubicación' },
    { class: 'pi pi-check', label: 'Aceptar' },
    { class: 'pi pi-times', label: 'Cancelar' },
    { class: 'pi pi-cloud', label: 'Nube' },
    { class: 'pi pi-sitemap', label: 'Mapa del sitio' },
    { class: 'pi pi-comments', label: 'Comentarios' },
    { class: 'pi pi-briefcase', label: 'Portafolio' },
    { class: 'pi pi-credit-card', label: 'Tarjeta' },
    { class: 'pi pi-wifi', label: 'Wi-Fi' },
    { class: 'pi pi-moon', label: 'Modo Oscuro' },
    { class: 'pi pi-sun', label: 'Modo Claro' },
    { class: 'pi pi-database', label: 'Base de Datos' },
    { class: 'pi pi-question-circle', label: 'Ayuda' },
    { class: 'pi pi-info-circle', label: 'Información' },
    { class: 'pi pi-exclamation-triangle', label: 'Alerta' },
    { class: 'pi pi-power-off', label: 'Apagar' },
    { class: 'pi pi-replay', label: 'Reiniciar' },
    { class: 'pi pi-angle-double-right', label: 'Avanzar' },
    { class: 'pi pi-angle-double-left', label: 'Retroceder' },
    { class: 'pi pi-book', label: 'Documentación' },
    { class: 'pi pi-pencil', label: 'Editar' },
    { class: 'pi pi-trash', label: 'Eliminar' },
    { class: 'pi pi-file', label: 'Archivo' },
    { class: 'pi pi-image', label: 'Imagen' },
    { class: 'pi pi-volume-up', label: 'Volumen' },
    { class: 'pi pi-microphone', label: 'Micrófono' },
];

    const neonColorOptions = [
    '#00BFFF', // Azul neón
    '#00CED1', // Azul profundo
    '#00FA9A', // Verde menta neón
    '#00FF00', // Verde puro
    '#00FFFF', // Cian eléctrico
    '#20B2AA', // Verde azulado vibrante
    '#39FF14', // Verde neón
    '#40E0D0', // Turquesa vivo
    '#7CFC00', // Césped brillante
    '#7DF9FF', // Azul hielo
    '#8A2BE2', // Azul violeta (eléctrico)
    '#98FB98', // Verde pastel fosforescente
    '#ADFF2F', // Verde lima neón
    '#B0FC38', // Verde fosforescente
    '#BA55D3', // Púrpura neón fuerte
    '#DFFF00', // Chartreuse neón
    '#DA70D6', // Orquídea vibrante
    '#DC143C', // Carmesí chillón
    '#E0FFFF', // Azul hielo claro
    '#EE82EE', // Violeta claro
    '#FF00FF', // Magenta puro
    '#FF1493', // Rosa profundo
    '#FF3131', // Rojo intenso
    '#FF4500', // Naranja lava
    '#FF6347', // Tomate vibrante
    '#FF69B4', // Rosado brillante
    '#FF6EC7', // Rosa chicle neón
    '#FF8C00', // Naranja fuerte
    '#FFB6C1', // Rosa neón claro
    '#FFD700', // Dorado brillante
    '#FFE135', // Amarillo plátano
    '#FFFF00', // Amarillo puro
];


    const loadingMessages = [
    'Analizando tendencias de mercado...',
    'Entrenando modelos de IA...',
    'Prediciendo impacto de campaña...',
    'Calculando presupuesto óptimo...',
    'Generando estrategia multicanal...',
    'Optimizando conversiones...',
    'Conectando con servidores...',
    'Finalizando detalles creativos...',
    'Cargando magia publicitaria...',
    'Ultimando toques finales...',
    'Afinando algoritmos secretos...',
    'Invocando a los gurús del marketing...',
    'Recopilando métricas de otro plano...',
    'Comprobando si todo está bajo control...',
    'Haciendo que todo parezca más inteligente...',
    'Sacando estadísticas de la galera...',
    'Traduciendo ideas en resultados...',
    'Consultando con la oráculo de los datos...',
    'Aplicando polvo de pixeles mágicos...',
    'Sincronizando con las estrellas de conversión...',
    'Probando teorías locas de performance...',
    'Calculando el ROI interdimensional...',
    'Modelando decisiones como un ajedrecista ruso...',
    'Minando insights en la blockchain del hype...',
    'Revisando cada byte como si fuera el último...',
    'Convenciendo al servidor de cooperar...',
    'Recargando neuronas artificiales...',
    'Auditando KPIs con rayos láser...',
    'Leyendo los pensamientos del usuario...',
    'Aplicando marketing cuántico (experimental)...',
    'Compilando éxitos publicitarios previos...',
    'Jugando al Tetris con tus datos...',
    'Dándole café a la IA (metafóricamente)...',
    'Eligiendo el mejor color para el botón mágico...',
    'Evangelizando al algoritmo sobre tu visión...',
    'Comparando tu campaña con la de los grandes...',
    'Hackeando las emociones (legalmente)...',
    'Apuntando al corazón de tu audiencia...',
    'Reseteando ideas preconcebidas...',
    'Calculando la probabilidad de asombro...',
    'Decidiendo si mostrar unicornios o gráficos...',
];


    const selectedIconLabel = computed(() => {
        const match = iconOptions.find(i => i.class === userFriendlyData.icono);
        return match ? match.label : '';
    });

    function selectIcon(icon: any) {
        userFriendlyData.icono = icon.class;
        iconDropdownOpen.value = false;
    }

    // Dropdowns básicos
    const sizeOptions = ['Muy pequeña', 'Pequeña', 'Mediana', 'Grande', 'Muy grande', 'Nivel Empresarial'];
    const scopeOptions = ['Local', 'Regional', 'Nacional', 'Global'];
    const industryOptions = ['Retail', 'Tecnología', 'Salud', 'Educación', 'Finanzas', 'Turismo'];

    // Estados dropdown
    const sizeDropdownOpen = ref(false);
    const scopeDropdownOpen = ref(false);
    const industryDropdownOpen = ref(false);

    // Referencias a DOM para clicks fuera
    const sizeDropdownRef = ref<HTMLElement | null>(null);
    const scopeDropdownRef = ref<HTMLElement | null>(null);
    const industryDropdownRef = ref<HTMLElement | null>(null);

    // Funciones selección
    function selectSize(val: string) {
        userFriendlyData.size = val;
        sizeDropdownOpen.value = false;
    }
    function selectScope(val: string) {
        userFriendlyData.scope = val;
        scopeDropdownOpen.value = false;
    }
    function selectIndustry(val: string) {
        userFriendlyData.industry = val;
        industryDropdownOpen.value = false;
    }

    // Manejar click afuera para cerrar dropdowns
    function handleClickOutside(event: MouseEvent) {
        if (sizeDropdownRef.value && !sizeDropdownRef.value.contains(event.target as Node))
            sizeDropdownOpen.value = false;
        if (scopeDropdownRef.value && !scopeDropdownRef.value.contains(event.target as Node))
            scopeDropdownOpen.value = false;
        if (industryDropdownRef.value && !industryDropdownRef.value.contains(event.target as Node))
            industryDropdownOpen.value = false;
        if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node))
            iconDropdownOpen.value = false;
        if (colorDropdownRef.value && !colorDropdownRef.value.contains(event.target as Node))
            colorDropdownOpen.value = false;
    }

    // Color primario
    const colorDropdownOpen = ref(false);
    const colorDropdownRef = ref<HTMLElement | null>(null);

    function selectColor(color: string) {
        userFriendlyData.primary_color = color;
        colorDropdownOpen.value = false;
    }

    const dropdownRef = ref<HTMLElement | null>(null);

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
    });

    // Otros selects de ejemplo
    const externalServiceOptions: SelectOption[] = [
        { value: 0, label: 'DV360', real: 'DV360' },
        { value: 1, label: 'Facebook Ads', real: 'Facebook Ads' },
        { value: 2, label: 'Google Ads', real: 'Google Ads' },
    ];


    const channelOptions: SelectOption[] = [
        { value: 0, label: 'Display (Publicidad en banners)', real: 'Display' },
        { value: 1, label: 'Mobile (Dispositivos móviles)', real: 'Mobile' },
        { value: 2, label: 'Search (Búsqueda en Google)', real: 'Search' },
        { value: 3, label: 'Social (Redes Sociales)', real: 'Social' },
        { value: 4, label: 'Video (Anuncios en video)', real: 'Video' },
    ];

    const weekdayOptions: SelectOption[] = [
        { value: 0, label: 'Día de Semana (Lunes a Viernes)', real: 'week_day' },
        { value: 1, label: 'Fin de Semana (Sábado y Domingo)', real: 'week_end' },
    ];

    // Estado de app
    const loading = ref(false);
    const error = ref<string | null>(null);
    const successMessage = ref<string | null>(null);

    const getAuthToken = (): string | null => {
        const auth = JSON.parse(localStorage.getItem('auth') ?? "")
        if (auth) return auth.accessToken;
        return null;
    };

    const hasAuthToken = computed(() => getAuthToken() !== null);

    const submitForm = async () => {
        const refreshToken = useAuthStore().refreshToken
        const accesstoken = useAuthStore().accessToken
        error.value = null;
        successMessage.value = null;

        // Validación mínima
        if (!userFriendlyData.nombre || !userFriendlyData.icono || !userFriendlyData.primary_color) {
            error.value = 'Faltan campos obligatorios como nombre, ícono o color primario.';
            return;
        }

        loading.value = true;
        let i = 0;
        messageInterval = window.setInterval(() => {
            currentLoadingMessage.value = loadingMessages[i % loadingMessages.length];
            i++;
        }, 3000);

        try {
            const token = getAuthToken();
            if (!token) {
                error.value = 'No hay token de autenticación.';
                loading.value = false;
                return;
            }

            const payload = {
                nombre: userFriendlyData.nombre,
                icono: userFriendlyData.icono,
                primary_color: userFriendlyData.primary_color,
                description: userFriendlyData.description,
                size: userFriendlyData.size,
                scope: userFriendlyData.scope,
                industry: userFriendlyData.industry,
                approved_budget: userFriendlyData.approved_budget,
                clicks: userFriendlyData.clicks,
                impressions: userFriendlyData.impressions,
                no_of_days: userFriendlyData.no_of_days,
                media_cost_usd: userFriendlyData.media_cost_usd,

                ext_service_name_enc: userFriendlyData.selected_ext_service,
                channel_name_enc: userFriendlyData.selected_channel,
                weekday_cat_enc: userFriendlyData.selected_weekday_cat,

                ext_service_name: externalServiceOptions.find(o => o.value === userFriendlyData.selected_ext_service)?.real ?? '',
                channel_name: channelOptions.find(o => o.value === userFriendlyData.selected_channel)?.real ?? '',
                weekday_cat: weekdayOptions.find(o => o.value === userFriendlyData.selected_weekday_cat)?.real ?? '',
            };

            const response = await apiRequest<any>({
                key: "modelsAI.cargar",
                data: payload,
                config: {
                    headers: {
                        'refresh-token': `${refreshToken}`,
                        'Authorization': `Bearer Bearer ${accesstoken}`,
                    },
                },
                backend: "python"
            });


            if (!response.succes) {
                const errorText = await response.text();
                throw new Error(errorText || 'Error desconocido al enviar el formulario.');
            }

            successMessage.value = 'Formulario enviado con éxito.';
            window.location.href = "/campaign"
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
            if (messageInterval) {
                clearInterval(messageInterval);
                currentLoadingMessage.value = 'Campaña creada, redirigiendo...';
            }
        }
    };

    const currentLoadingMessage = ref('Creando campaña...');
    let messageInterval: number | undefined = undefined;


  

    return {
        userFriendlyData,
        iconDropdownOpen,
        iconOptions,
        selectedIconLabel,
        selectIcon,
        dropdownRef,

        sizeOptions,
        scopeOptions,
        industryOptions,

        sizeDropdownOpen,
        scopeDropdownOpen,
        industryDropdownOpen,

        sizeDropdownRef,
        scopeDropdownRef,
        industryDropdownRef,

        selectSize,
        selectScope,
        selectIndustry,

        colorDropdownOpen,
        colorDropdownRef,
        neonColorOptions,
        selectColor,

        externalServiceOptions,
        channelOptions,
        weekdayOptions,

        loading,
        error,
        successMessage,
        hasAuthToken,
        submitForm,
        currentLoadingMessage
    };
}
