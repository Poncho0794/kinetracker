# Guía de Despliegue en Vercel — KineTracker

Esta guía detalla los pasos para desplegar tanto el frontend (**`kinetracker-ui`**) como el backend (**`kinetracker-api`**) en [Vercel](https://vercel.com) a partir del repositorio GitHub [`Poncho0794/kinetracker`](https://github.com/Poncho0794/kinetracker).

---

## Estrategia de Despliegue

Vercel permite desplegar este monorepo mediante **dos proyectos independientes** en tu dashboard de Vercel (uno para el Frontend y otro para la API), o bien de forma **unificada**. La opción recomendada para producción son **dos proyectos**, ya que permite dominios y variables de entorno independientes:

1. **`kinetracker-api`**: Backend NestJS ejecutado como Serverless Functions.
2. **`kinetracker-ui`**: Aplicación Single Page Application (SPA) construida con Vite y React 19.

---

## 1. Despliegue del Backend (`kinetracker-api`)

### Paso 1: Crear el Proyecto en Vercel
1. Ve a tu [Vercel Dashboard](https://vercel.com/dashboard) y haz clic en **Add New...** -> **Project**.
2. Selecciona tu repositorio: `Poncho0794/kinetracker`.
3. Asigna un nombre al proyecto, por ejemplo: `kinetracker-api`.

### Paso 2: Configurar Build y Directorio
En la pantalla de configuración:
- **Framework Preset**: `Other`
- **Root Directory**: Haz clic en **Edit** y selecciona `apps/kinetracker-api` (o déjalo en `./` si usas la función de raíz).
  > **Importante:** Si seleccionas `apps/kinetracker-api`, asegúrate de mantener marcada la casilla **"Include source files outside of the Root Directory in the Build Step"** para que Vercel tenga acceso a las dependencias del monorepo.
- **Build Command**: `npx nx build kinetracker-api` (o `npm run build:api`)
- **Output Directory**: Déjalo vacío o predeterminado (el archivo `vercel.json` gestiona el runtime `@vercel/node`).

### Paso 3: Variables de Entorno (Environment Variables)
Configura las siguientes variables en la sección **Environment Variables**:
- `SUPABASE_URL`: La URL de tu proyecto en Supabase (ej. `https://xxxx.supabase.co`).
- `SUPABASE_SERVICE_ROLE_KEY`: Tu clave secreta `service_role` de Supabase.
- `CORS_ORIGIN`: La URL de tu frontend desplegado (ej. `https://kinetracker.vercel.app` o `*`).
- `NODE_ENV`: `production`

### Paso 4: Desplegar
Haz clic en **Deploy**. Al terminar, Vercel te proporcionará una URL pública, por ejemplo:
`https://kinetracker-api.vercel.app`

Prueba de salud:
- Visita `https://kinetracker-api.vercel.app/api` (debe responder `{ "message": "Bienvenido a KineTracker API", "status": "healthy", ... }`).
- Visita `https://kinetracker-api.vercel.app/api/docs` para ver Swagger/OpenAPI.

---

## 2. Despliegue del Frontend (`kinetracker-ui`)

### Paso 1: Crear el Proyecto en Vercel
1. En tu [Vercel Dashboard](https://vercel.com/dashboard), haz clic en **Add New...** -> **Project**.
2. Vuelve a seleccionar el mismo repositorio: `Poncho0794/kinetracker`.
3. Asigna un nombre al proyecto, por ejemplo: `kinetracker` o `kinetracker-ui`.

### Paso 2: Configurar Build y Directorio
En la pantalla de configuración:
- **Framework Preset**: `Vite`
- **Root Directory**: Déjalo en `./` (la raíz del monorepo).
- **Build Command**: `npx nx build kinetracker-ui` (o `npm run build:ui`)
- **Output Directory**: `dist/apps/kinetracker-ui`

### Paso 3: Variables de Entorno (Environment Variables)
Configura la URL de tu API recién desplegada:
- `VITE_API_URL`: `https://kinetracker-api.vercel.app/api` (sustituye por la URL real de tu backend).

### Paso 4: Desplegar
Haz clic en **Deploy**. Al terminar, Vercel desplegará la interfaz de usuario en su propio dominio.

---

## 3. Resumen de Archivos de Adaptación Creados

- **`apps/kinetracker-api/src/main.ts`**: Adaptado para exportar un `handler` serverless compatible con `@vercel/node` y Vercel Functions, detectando `process.env.VERCEL` automáticamente para no bloquear con `app.listen()` en la nube mientras sigue funcionando como servidor tradicional en local.
- **`apps/kinetracker-api/vercel.json`**: Enrutamiento de peticiones hacia `src/main.ts` usando `@vercel/node`.
- **`apps/kinetracker-ui/src/services/api.ts`**: Lectura dinámica de `import.meta.env.VITE_API_URL` con fallback local.
- **`apps/kinetracker-ui/vercel.json`**: Regla de rewrite SPA para evitar errores 404 al recargar páginas.
- **`api/index.ts`**: Punto de entrada serverless en la raíz como puente universal.
- **`package.json`**: Scripts de conveniencia añadidos (`build:api`, `build:ui`, `serve:api`, `serve:ui`).
