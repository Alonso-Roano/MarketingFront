
interface ProjectData {
    id: string;
    rubro: string;
    clicks: number;
    alcance: string;
    tamaño: string;
    is_deleted: boolean;
    no_of_days: number;
    project_id: string;
    descripcion: string;
    impressions: number;
    weekday_cat: string;
    channel_name: string;
    media_cost_usd: number;
    approved_budget: number;
    ext_service_name: string;
}

interface ProjectPrediction {
    id: string;
    clicks: number;
    mision: string;
    vision: string;
    is_deleted: boolean;
    no_of_days: number;
    project_id: string;
    impressions: number;
    weekday_cat: string;
    channel_name: string;
    media_cost_usd: number;
    palabras_clave: string;
    approved_budget: number;
    ext_service_name: string;
    interpretacion_clicks: string;
    interpretacion_no_of_days: string;
    interpretacion_impressions: string;
    interpretacion_weekday_cat: string;
    interpretacion_channel_name: string;
    interpretacion_media_cost_usd: string;
    interpretacion_palabras_clave: string;
    interpretacion_approved_budget: string;
    interpretacion_ext_service_name: string;
}

interface Project {
    id: string;
    nombre: string;
    icono: string;
    primary_color: string;
    user_id: string;
    is_deleted: boolean;
    project_data: ProjectData[];
    project_prediction: ProjectPrediction[];
}



let pdfMake: any = null;

// Función para cargar scripts de forma dinámica
const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
       
        if (document.querySelector(`script[src="${src}"]`)) {
            return resolve();
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Falló la carga del script: ${src}`));
        document.head.appendChild(script);
    });
};

// Función para cargar pdfMake de forma diferida (lazy-loading)
const loadPDFMake = async () => {
    if (!pdfMake) {
        try {
            // Revisa si ya está en el objeto window
            if ((window as any).pdfMake) {
                pdfMake = (window as any).pdfMake;
                return;
            }
            
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js');
            
            pdfMake = (window as any).pdfMake;
            
            if (!pdfMake) {
                throw new Error('pdfMake no se cargó correctamente en el objeto window.');
            }
        } catch (error) {
            console.error('Error cargando los scripts de pdfMake:', error);
            throw new Error('No se pudo cargar el generador de PDF.');
        }
    }
};

/**
 * Genera y descarga un reporte en PDF para un proyecto específico.
 * @param project - El objeto del proyecto que contiene todos los datos.
 */
export const generateProjectPDF = async (project: Project) => {
    await loadPDFMake();

    const projectData = project.project_data[0] || {};
    const prediction = project.project_prediction[0] || {};
    const primaryColor = project.primary_color || '#7c3aed';
    
        const icons = {
            report: 'M9 17h6l3 3v-3h2V4H4v13h5zm0 0v3l3-3h-3z',
            calendar: 'M8 2v4m8-4v4M4 8h16M6 12h4m-4 4h8M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z',
            dollar:'M2 6h20v12H2V6zm20 4c-.525 0-1.045-.103-1.53-.304a5.003 5.003 0 01-2.47-2.47C17.8 6.74 18 6.24 18 6h4v4zm0 4v4h-4c0-1.06.42-2.078 1.17-2.828A3.996 3.996 0 0122 14zM2 14v4h4c0-1.06-.42-2.078-1.17-2.828A3.996 3.996 0 002 14zM6 6H2v4c1.06 0 2.078-.42 2.828-1.17A3.996 3.996 0 006 6zm8.074 3.5H11.333A.75.75 0 0010 10.75c0 .69.597 1.25 1.333 1.25h1.778c.736 0 1.333.56 1.333 1.25s-.597 1.25-1.333 1.25H10m2-5.983V8.5m0 7.017v-1.017' ,
            trending: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94',
            target: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M21 10.5a9 9 0 11-18 0 9 9 0 0118 0z',
            click: 'M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59',
            eye: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
            building: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21',
            link: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244',
            resize: 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15',
            tool: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
            clipboard: 'M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 016.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H9a2.25 2.25 0 012.25 2.25v.75H8.25A2.25 2.25 0 016 8.25V7.5z',
            edit: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125',
            crystal: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
            rocket: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
            star: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
            tag: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6.75 7.5h.008v.008H6.75V7.5z',
            sparkles: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
        };
    
    
    const createSVG = (path: string, color = '#6b7280', size = 16) => ({
        svg: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`,
        width: size,
        height: size
    });

    const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [40, 80, 40, 60],
        header: {
             margin: [40, 20, 40, 20],
             table: {
                 widths: ['*', 'auto'],
                 body: [
                     [
                         {
                             text: 'REPORTE DE PROYECTO',
                             style: 'headerText',
                             color: primaryColor
                         },
                         {
                             text: new Date().toLocaleDateString('es-ES'),
                             style: 'headerDate'
                         }
                     ]
                 ]
             },
             layout: 'noBorders'
        },
        // Footer personalizado
        footer: function(currentPage: number, pageCount: number) {
             return {
                 margin: [40, 10],
                 table: {
                     widths: ['*', 'auto'],
                     body: [
                         [
                             {
                                 text: `${project.nombre || 'Proyecto'}`,
                                 style: 'footerText'
                             },
                             {
                                 text: `Página ${currentPage} de ${pageCount}`,
                                 style: 'footerText'
                             }
                         ]
                     ]
                 },
                 layout: 'noBorders'
             };
        },
        // Título principal con diseño atractivo
     content: [
                // Título principal con diseño atractivo
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [{
                                text: project.nombre,
                                style: 'mainTitle',
                                fillColor: primaryColor,
                                color: 'white',
                                margin: [20, 15, 20, 15]
                            }]
                        ]
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 0, 30]
                },
                
                // Resumen ejecutivo en cards
                {
                    columns: [
                        {
                            width: 20,
                            svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${primaryColor}" stroke-width="2">
                                    <path d="${icons.clipboard}"/>
                                  </svg>`
                        },
                        {
                            width: '*',
                            text: 'RESUMEN EJECUTIVO',
                            style: 'sectionTitle',
                            margin: [5, 0, 0, 0]
                        }
                    ],
                    margin: [0, 20, 0, 15]
                },
                {
                    columns: [
                        {
                            width: '30%',
                            table: {
                                body: [
                                    [{
                                        columns: [
                                            {
                                                width: 24,
                                                svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                                                        <path d="${icons.dollar}"/>
                                                      </svg>`,
                                                margin: [0, 5, 0, 0]
                                            },
                                            {
                                                width: '*',
                                                text: [
                                                    { text: `${projectData?.approved_budget?.toLocaleString() || 'N/A'}`, style: 'cardValue' },
                                                    { text: '\nPresupuesto Real', style: 'cardLabel' }
                                                ],
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        fillColor: '#f8fafc',
                                        margin: [10, 15, 10, 15]
                                    }]
                                ]
                            },
                            layout: {
                                hLineWidth: () => 1,
                                vLineWidth: () => 1,
                                hLineColor: () => '#e2e8f0',
                                vLineColor: () => '#e2e8f0'
                            }
                        },
                        {
                            width: '5%',
                            text: ''
                        },
                        {
                            width: '30%',
                            table: {
                                body: [
                                    [{
                                        columns: [
                                            {
                                                width: 24,
                                                svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                                                        <path d="${icons.trending}"/>
                                                      </svg>`,
                                                margin: [0, 5, 0, 0]
                                            },
                                            {
                                                width: '*',
                                                text: [
                                                    { text: `${prediction?.approved_budget?.toLocaleString() || 'N/A'}`, style: 'cardValue' },
                                                    { text: '\nPresupuesto Predicho', style: 'cardLabel' }
                                                ],
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        fillColor: '#fef3e2',
                                        margin: [10, 15, 10, 15]
                                    }]
                                ]
                            },
                            layout: {
                                hLineWidth: () => 1,
                                vLineWidth: () => 1,
                                hLineColor: () => '#f59e0b',
                                vLineColor: () => '#f59e0b'
                            }
                        },
                        {
                            width: '5%',
                            text: ''
                        },
                        {
                            width: '30%',
                            table: {
                                body: [
                                    [{
                                        columns: [
                                            {
                                                width: 24,
                                                svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2">
                                                        <path d="${icons.calendar}"/>
                                                      </svg>`,
                                                margin: [0, 5, 0, 0]
                                            },
                                            {
                                                width: '*',
                                                text: [
                                                    { text: `${projectData?.no_of_days || 'N/A'}`, style: 'cardValue' },
                                                    { text: '\nDías de Campaña', style: 'cardLabel' }
                                                ],
                                                margin: [5, 0, 0, 0]
                                            }
                                        ],
                                        fillColor: '#eff6ff',
                                        margin: [10, 15, 10, 15]
                                    }]
                                ]
                            },
                            layout: {
                                hLineWidth: () => 1,
                                vLineWidth: () => 1,
                                hLineColor: () => '#3b82f6',
                                vLineColor: () => '#3b82f6'
                            }
                        }
                    ],
                    columnGap: 0,
                    margin: [0, 0, 0, 30]
                },
                
                // Datos ingresados con diseño moderno
                {
                    columns: [
                        {
                            width: 20,
                            svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${primaryColor}" stroke-width="2">
                                    <path d="${icons.clipboard}"/>
                                  </svg>`
                        },
                        {
                            width: '*',
                            text: 'DATOS INGRESADOS',
                            style: 'sectionTitle',
                            margin: [5, 0, 0, 0]
                        }
                    ],
                    margin: [0, 20, 0, 15]
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['25%', '25%', '25%', '25%'],
                        body: [
                            // Header con gradiente simulado
                            [
                                { text: 'CONFIGURACIÓN', style: 'tableHeader', fillColor: primaryColor, color: 'white' },
                                { text: 'AUDIENCIA', style: 'tableHeader', fillColor: primaryColor, color: 'white' },
                                { text: 'MÉTRICAS', style: 'tableHeader', fillColor: primaryColor, color: 'white' },
                                { text: 'TEMPORALIDAD', style: 'tableHeader', fillColor: primaryColor, color: 'white' }
                            ],
                            // Filas de datos con colores alternados
                            [
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <path d="${icons.building}"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Rubro\n`, style: 'fieldLabel' },
                                                { text: projectData?.rubro || 'N/A', style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ],
                                    fillColor: '#f8fafc'
                                },
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <path d="${icons.target}"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Alcance\n`, style: 'fieldLabel' },
                                                { text: projectData?.alcance || 'N/A', style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ],
                                    fillColor: '#f8fafc'
                                },
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <path d="${icons.click}"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Clics\n`, style: 'fieldLabel' },
                                                { text: projectData?.clicks?.toLocaleString() || 'N/A', style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ],
                                    fillColor: '#f8fafc'
                                },
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <path d="${icons.calendar}"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Día de semana\n`, style: 'fieldLabel' },
                                                { text: projectData?.weekday_cat || 'N/A', style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ],
                                    fillColor: '#f8fafc'
                                }
                            ],
                            [
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <path d="${icons.link}"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Canal\n`, style: 'fieldLabel' },
                                                { text: projectData?.channel_name || 'N/A', style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <path d="${icons.resize}"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Tamaño\n`, style: 'fieldLabel' },
                                                { text: projectData?.tamaño || 'N/A', style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <path d="${icons.eye}"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Impresiones\n`, style: 'fieldLabel' },
                                                { text: projectData?.impressions?.toLocaleString() || 'N/A', style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <circle cx="12" cy="12" r="10"/>
                                                    <polyline points="12,6 12,12 16,14"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Duración\n`, style: 'fieldLabel' },
                                                { text: `${projectData?.no_of_days || 'N/A'} días`, style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ]
                                }
                            ],
                            [
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                                    <path d="${icons.tool}"/>
                                                  </svg>`
                                        },
                                        {
                                            width: '*',
                                            text: [
                                                { text: `Servicio Externo\n`, style: 'fieldLabel' },
                                                { text: projectData?.ext_service_name || 'N/A', style: 'fieldValue' }
                                            ],
                                            margin: [5, 0, 0, 0]
                                        }
                                    ],
                                    fillColor: '#f8fafc',
                                    colSpan: 4
                                },
                                {},
                                {},
                                {}
                            ]
                        ]
                    },
                    layout: {
                        hLineWidth: (i, node) => i === 1 ? 2 : 1,
                        vLineWidth: () => 1,
                        hLineColor: (i, node) => i === 1 ? primaryColor : '#e2e8f0',
                        vLineColor: () => '#e2e8f0',
                        paddingLeft: () => 8,
                        paddingRight: () => 8,
                        paddingTop: () => 8,
                        paddingBottom: () => 8
                    },
                    margin: [0, 0, 0, 20]
                },
                
                // Descripción con estilo
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [{
                                columns: [
                                    {
                                        width: 20,
                                        svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2">
                                                <path d="${icons.edit}"/>
                                              </svg>`,
                                        margin: [0, 5, 0, 0]
                                    },
                                    {
                                        width: '*',
                                        text: [
                                            { text: 'DESCRIPCIÓN DEL PROYECTO\n\n', style: 'sectionTitle' },
                                            { text: projectData?.descripcion || 'Sin descripción disponible', style: 'description' }
                                        ],
                                        margin: [10, 0, 0, 0]
                                    }
                                ],
                                fillColor: '#fefce8',
                                margin: [15, 15, 15, 15]
                            }]
                        ]
                    },
                    layout: {
                        hLineWidth: () => 2,
                        vLineWidth: () => 2,
                        hLineColor: () => '#eab308',
                        vLineColor: () => '#eab308'
                    },
                    margin: [0, 0, 0, 30]
                },
                
                // Nueva página para predicciones
                { text: '', pageBreak: 'before' },
                
                // Predicciones con diseño premium
                {
                    columns: [
                        {
                            width: 24,
                            svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${primaryColor}" stroke-width="2">
                                    <path d="${icons.crystal}"/>
                                  </svg>`
                        },
                        {
                            width: '*',
                            text: 'PREDICCIONES DEL SISTEMA IA',
                            style: 'sectionTitle',
                            color: primaryColor,
                            margin: [5, 0, 0, 0]
                        }
                    ],
                    margin: [0, 0, 0, 20]
                },
                
                // Métricas principales en cards grandes
                {
                    columns: [
                        {
                            width: '48%',
                            table: {
                                body: [
                                    [{
                                        columns: [
                                            {
                                                width: 32,
                                                svg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${primaryColor}" stroke-width="2">
                                                        <path d="${icons.dollar}"/>
                                                      </svg>`,
                                                margin: [0, 10, 0, 0]
                                            },
                                            {
                                                width: '*',
                                                text: [
                                                    { text: `${prediction?.approved_budget?.toLocaleString() || 'N/A'}\n`, style: 'bigCardValue', color: primaryColor },
                                                    { text: 'PRESUPUESTO PREDICHO\n', style: 'bigCardLabel' },
                                                    { text: prediction?.interpretacion_approved_budget || '', style: 'interpretation' }
                                                ],
                                                alignment: 'center',
                                                margin: [10, 0, 0, 0]
                                            }
                                        ],
                                        fillColor: '#f0f9ff',
                                        margin: [15, 20, 15, 20]
                                    }]
                                ]
                            },
                            layout: {
                                hLineWidth: () => 2,
                                vLineWidth: () => 2,
                                hLineColor: () => primaryColor,
                                vLineColor: () => primaryColor
                            }
                        },
                        {
                            width: '4%',
                            text: ''
                        },
                        {
                            width: '48%',
                            table: {
                                body: [
                                    [{
                                        columns: [
                                            {
                                                width: 32,
                                                svg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                                                        <path d="${icons.click}"/>
                                                      </svg>`,
                                                margin: [0, 10, 0, 0]
                                            },
                                            {
                                                width: '*',
                                                text: [
                                                    { text: `${prediction?.clicks?.toLocaleString() || 'N/A'}\n`, style: 'bigCardValue', color: '#059669' },
                                                    { text: 'CLICS ESTIMADOS\n', style: 'bigCardLabel' },
                                                    { text: prediction?.interpretacion_clicks || '', style: 'interpretation' }
                                                ],
                                                alignment: 'center',
                                                margin: [10, 0, 0, 0]
                                            }
                                        ],
                                        fillColor: '#ecfdf5',
                                        margin: [15, 20, 15, 20]
                                    }]
                                ]
                            },
                            layout: {
                                hLineWidth: () => 2,
                                vLineWidth: () => 2,
                                hLineColor: () => '#059669',
                                vLineColor: () => '#059669'
                            }
                        }
                    ],
                    margin: [0, 0, 0, 25]
                },
                
                // Misión y Visión con diseño elegante
                {
                    columns: [
                        {
                            width: 20,
                            svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f2937" stroke-width="2">
                                    <path d="${icons.target}"/>
                                  </svg>`
                        },
                        {
                            width: '*',
                            text: 'MISIÓN Y VISIÓN ESTRATÉGICA',
                            style: 'sectionTitle',
                            margin: [5, 0, 0, 0]
                        }
                    ],
                    margin: [0, 20, 0, 15]
                },
                {
                    columns: [
                        {
                            width: '48%',
                            stack: [
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5b21b6" stroke-width="2">
                                                    <path d="${icons.rocket}"/>
                                                  </svg>`,
                                            margin: [0, 2, 0, 0]
                                        },
                                        {
                                            width: '*',
                                            text: 'MISIÓN',
                                            style: 'subsectionTitle',
                                            color: '#5b21b6',
                                            margin: [5, 0, 0, 0]
                                        }
                                    ],
                                    fillColor: '#ddd6fe',
                                    margin: [10, 8, 10, 8]
                                },
                                {
                                    text: prediction?.mision || 'Sin misión definida',
                                    style: 'missionVision',
                                    margin: [10, 10, 10, 15],
                                    fillColor: '#f5f3ff'
                                }
                            ]
                        },
                        {
                            width: '4%',
                            text: ''
                        },
                        {
                            width: '48%',
                            stack: [
                                {
                                    columns: [
                                        {
                                            width: 16,
                                            svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c53030" stroke-width="2">
                                                    <path d="${icons.star}"/>
                                                  </svg>`,
                                            margin: [0, 2, 0, 0]
                                        },
                                        {
                                            width: '*',
                                            text: 'VISIÓN',
                                            style: 'subsectionTitle',
                                            color: '#c53030',
                                            margin: [5, 0, 0, 0]
                                        }
                                    ],
                                    fillColor: '#fed7d7',
                                    margin: [10, 8, 10, 8]
                                },
                                {
                                    text: prediction?.vision || 'Sin visión definida',
                                    style: 'missionVision',
                                    margin: [10, 10, 10, 15],
                                    fillColor: '#fffaf0'
                                }
                            ]
                        }
                    ],
                    margin: [0, 0, 0, 25]
                },
                
                // Palabras clave con tags visuales
                {
                    columns: [
                        {
                            width: 20,
                            svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                                    <path d="${icons.tag}"/>
                                  </svg>`
                        },
                        {
                            width: '*',
                            text: 'PALABRAS CLAVE ESTRATÉGICAS',
                            style: 'sectionTitle',
                            margin: [5, 0, 0, 0]
                        }
                    ],
                    margin: [0, 20, 0, 15]
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [{
                                text: prediction?.palabras_clave || 'Sin palabras clave definidas',
                                style: 'keywords',
                                fillColor: '#fef7cd',
                                margin: [15, 15, 15, 10]
                            }],
                            [{
                                text: prediction?.interpretacion_palabras_clave || '',
                                style: 'interpretation',
                                fillColor: '#fffbeb',
                                margin: [15, 10, 15, 15]
                            }]
                        ]
                    },
                    layout: {
                        hLineWidth: () => 2,
                        vLineWidth: () => 2,
                        hLineColor: () => '#f59e0b',
                        vLineColor: () => '#f59e0b'
                    },
                    margin: [0, 0, 0, 20]
                },
                
                // Footer de análisis
                {
                    columns: [
                        {
                            width: 20,
                            svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                                    <path d="${icons.sparkles}"/>
                                  </svg>`
                        },
                        {
                            width: '*',
                            text: 'ANÁLISIS GENERADO POR INTELIGENCIA ARTIFICIAL',
                            style: 'aiFooter',
                            alignment: 'center',
                            margin: [5, 0, 0, 0]
                        }
                    ],
                    fillColor: '#f3f4f6',
                    margin: [0, 30, 0, 0]
                }
            ],
        styles: {
                headerText: {
                    fontSize: 12,
                    bold: true
                },
                headerDate: {
                    fontSize: 10,
                    color: '#6b7280'
                },
                footerText: {
                    fontSize: 9,
                    color: '#6b7280'
                },
                mainTitle: {
                    fontSize: 24,
                    bold: true,
                    alignment: 'center'
                },
                sectionTitle: {
                    fontSize: 16,
                    bold: true,
                    color: '#1f2937'
                },
                subsectionTitle: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'center'
                },
                cardIcon: {
                    fontSize: 16,
                    color: '#6b7280'
                },
                cardValue: {
                    fontSize: 18,
                    bold: true,
                    color: '#1f2937'
                },
                cardLabel: {
                    fontSize: 10,
                    color: '#6b7280'
                },
                bigCardValue: {
                    fontSize: 20,
                    bold: true
                },
                bigCardLabel: {
                    fontSize: 11,
                    bold: true,
                    color: '#374151'
                },
                tableHeader: {
                    fontSize: 10,
                    bold: true,
                    alignment: 'center'
                },
                emoji: {
                    fontSize: 14
                },
                fieldLabel: {
                    fontSize: 8,
                    color: '#6b7280',
                    bold: true
                },
                fieldValue: {
                    fontSize: 10,
                    color: '#1f2937',
                    bold: true
                },
                description: {
                    fontSize: 11,
                    lineHeight: 1.4,
                    color: '#374151'
                },
                missionVision: {
                    fontSize: 10,
                    lineHeight: 1.4,
                    color: '#374151'
                },
                keywords: {
                    fontSize: 12,
                    bold: true,
                    color: '#92400e'
                },
                interpretation: {
                    fontSize: 9,
                    italics: true,
                    color: '#6b7280',
                    lineHeight: 1.3
                },
                aiFooter: {
                    fontSize: 10,
                    bold: true,
                    color: '#6b7280'
                }
            },
            
            defaultStyle: {
                fontSize: 10,
                lineHeight: 1.2
            }
        };

    // Crear y descargar el PDF
    pdfMake.createPdf(docDefinition).download(`${project.nombre.replace(/\s+/g, '_')}_Reporte.pdf`);
};