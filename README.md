# Niux Marketing

## Integrantes

### Sánchez Roano Carlos Alonso

## Índice

1. [Tecnologías y Paqueterías](#tecnologías-y-paqueterías)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Llamadas a la API](#llamadas-a-la-api)
4. [Flujo de trabajo](#flujo-de-trabajo)
5. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)

---

## Tecnologías y Paqueterías

Este proyecto utiliza las siguientes tecnologías clave:

* **Vue** `^3.5.17` – Framework progresivo para construir interfaces de usuario.
* **Vite** `^7.0.4` – Bundler ultrarrápido para desarrollo y producción.
* **TypeScript** `~5.8.3` – Tipado estático para JavaScript.
* **TailwindCSS** `^4.1.11` – Framework de utilidades para estilos.
* **PrimeVue** `^4.3.6` – Biblioteca de componentes UI para Vue.
* **@primeuix/themes** `^1.2.1` – Temas para PrimeVue.
* **Vue Router** `^4.5.1` – Enrutador oficial para Vue.js.
* **Pinia** `^3.0.3` – Store para gestión de estado en Vue.
* **pinia-plugin-persistedstate** `^4.4.1` – Persistencia de estado para Pinia.
* **Axios** `^1.10.0` – Cliente HTTP para consumo de APIs.
* **Chart.js** `^4.5.0` – Gráficos y visualizaciones.
* **Path** `^0.12.7` – Utilidades para manejo de rutas.
* **@vitejs/plugin-vue** `^6.0.0` – Integración de Vue en Vite.
* **@vue/tsconfig** `^0.7.0` – Configuración compartida de TypeScript para proyectos Vue.
* **vue-tsc** `^2.2.12` – Comprobación de tipos para Vue SFCs.
* **@types/node** `^24.0.13` – Tipos para Node.js.
* **autoprefixer** `^10.4.21` – Añade prefijos CSS automáticamente.
* **postcss** `^8.5.6` – Procesador de CSS.
* **@tailwindcss/vite** `^4.1.11` – Plugin oficial de Tailwind para Vite.

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura modular y escalable basada en `Screaming Architecture`. La estructura principal es:

```
src/
│
├── admin/              # Módulo de administración
│   ├── interfaces/     # Tipos e interfaces TS
│   ├── pages/          # Pantallas específicas del dominio
│   └── services/       # Servicios específicos del dominio
├── assets/             # Recursos estáticos (imágenes, íconos, videos)
│   ├── images/
│   ├── svgs/
│   └── videos/
├── auth/               # Funcionalidad de autenticación y estado
│   ├── interfaces/     # Tipos e interfaces TS
│   ├── pages/          # Pantallas específicas del dominio
│   ├── services/       # Servicios específicos del dominio
│   └── stores/         # Configuración global de la autenticación
├── client/             # Módulo para la sección del cliente
│   ├── interfaces/     # Tipos e interfaces TS
│   ├── pages/          # Pantallas específicas del dominio
│   └── services/       # Servicios específicos del dominio
├── core/               # Módulos centrales de infraestructura
│   ├── api/            # Configuración y lógica de llamadas a API
│   ├── routes/         # Definición de rutas de navegación
│   ├── services/       # Servicios reutilizables
│   ├── style/          # Estilos globales o de tema
│   ├── App.vue         # Componente principal de la aplicación
│   ├── main.ts         # Punto de entrada de la aplicación
│   └── vite-env.d.ts   # Definiciones de tipos para Vite
├── landing/            # Módulo para la página de aterrizaje (landing page)
│   ├── interfaces/     # Tipos e interfaces TS
│   ├── json/           # Datos en formato JSON
│   ├── services/       # Servicios específicos del dominio
│   └── template/       # Plantillas o componentes de la landing
├── pages/              # Páginas globales (ej. 404)
└── shared/             # Componentes y utilidades compartidas entre módulos
    ├── components/     # Componentes UI reutilizables
    ├── helpers/        # Funciones auxiliares/helpers
    ├── interfaces/     # Tipos e interfaces TS
    └── styles/         # Estilos compartidos
```

---

## Llamadas a la API

Las llamadas a la API están centralizadas en un cliente Axios con soporte para:

* **Intercepción de peticiones:** se añade automáticamente el token de autenticación si existe.
* **Manejo de rutas dinámicas:** se permite el reemplazo de parámetros en URLs (`{id}`, etc.).
* **Configuración por endpoint:** mediante un archivo `endpoints.ts`.

### Ejemplo de definición de endpoints:

```ts
const endpoints = {
  auth: {
    register: { method: 'POST', url: '/api/Auth/registrar' },
    login: { method: 'POST', url: '/api/Auth/login' },
  },
  ejemplo: {
    listar: { method: 'GET', url: '/api/Ejemplo' },
    obtener: { method: 'GET', url: '/api/Ejemplo/{id}' },
    crear: { method: 'POST', url: '/api/Ejemplo' },
    actualizar: { method: 'PUT', url: '/api/Ejemplo/{id}' },
    eliminar: { method: 'DELETE', url: '/api/Ejemplo/{id}' },
  }
}
```

### Uso del cliente API:
Funcion `Get` global
```ts
const data = await apiRequest({key:'ejemplo.listar'});
```

Funcion `Get` especifica
```ts
const data = await apiRequest({key:'ejemplo.obtener', params:{ id: 3 }});
```

Funcion `Post`
```ts
const data = await apiRequest({key:'ejemplo.crear', data:{ body: {nombre: 'Si'} }});
```

Funcion `Put`
```ts
const data = await apiRequest({key:'ejemplo.actualizar', params:{ id: 9 }, data:{ body: {nombre: 'No'} }});
```

Funcion `Delete`
```ts
const data = await apiRequest({key:'ejemplo.eliminar', params:{ id: 9 }});
```

Llamar al backend de python
```ts
const data = await apiRequest({key:'ejemplo.eliminar', params:{ id: 9 }, beackend:'python'});
```
---
## Flujo de trabajo

Para mantener un control ordenado del desarrollo en GitHub, se sigue el siguiente flujo de trabajo basado en ramas y pull requests:

### 1. Nomenclatura de ramas

Las ramas deben crearse siguiendo el patrón:

```
tipo/descripcion-breve
```

**Tipos comunes:**

* `feat/` – Nuevas funcionalidades
* `fix/` – Correcciones de bugs
* `refactor/` – Refactorización de código sin cambios funcionales
* `docs/` – Cambios en documentación
* `test/` – Agregado o modificación de pruebas
* `chore/` – Tareas menores, configuración o mantenimiento

**Ejemplos:**

```
feat/login-screen
fix/navbar-overlap
refactor/api-client
```

### 2. Crear una nueva rama

Desde la rama `main` o `develop`:

```bash
git checkout -b feat/nueva-funcionalidad
```

### 3. Subir los cambios

```bash
git add .
git commit -m "feat: agregar pantalla de login"
git push origin feat/nueva-funcionalidad
```

### 4. Abrir un Pull Request (PR)

Desde GitHub:

* El PR debe tener un título claro y una descripción concisa del cambio.
* El título del PR debe iniciar con el tipo de cambio (feat, fix, etc.).

**Ejemplo de título:**
`feat: agregar integración con endpoint de login`

### 5. Revisión y merge

* Esperar aprobación al menos de un revisor.
* Solo hacer merge cuando la rama pase los checks de CI y pruebas.

### 6. Grafico explicativo

```
main
 │
 ├─ develop
 │    │
 │    ├─ feat/login-screen        ← rama de nuevas caracteristicas
 │    │       └─ PR → develop
 │    │
 │    ├─ fix/navbar-bug           ← rama de correcciones menores
 │    │       └─ PR → develop
 │    │
 │    └─ chore/update-deps
 │            └─ PR → develop
 │
 └─ (cuando está listo)
      └─ PR → main (release)
```

### Leyenda:

* `main`: rama estable de producción.
* `develop`: rama de integración para features antes de liberar.
* `feat/*`, `fix/*`, `chore/*`: ramas temporales para desarrollo.
* `PR`: Pull Request.

Este diagrama ilustra que:

* Todas las ramas de trabajo se crean desde `develop`.
* Se integran de vuelta mediante Pull Requests.
* Solo cuando `develop` está estable, se hace merge a `main`.
---

## Cómo Ejecutar el Proyecto

### Requisitos

* Node.js ≥ 18

### Variables de Entorno

Crea un archivo `.env` o edita `example.env` con el siguiente formato:

```env
VITE_SUPABASE_URL=https://rveaaqxzqkstmhsofhee.supabase.co
VITE_SUPABASE_ANONKEY=zsdfghjklnbcxdcfghj
VITE_PYTHON_URL=https://niux-back.sublimedev.com.mx
```

> Esta variable se usará como baseURL por `axios`.

### Ejecutar

```bash
npm run dev
```

Esto abrirá el navegador con la aplicación funcionando en modo web.
