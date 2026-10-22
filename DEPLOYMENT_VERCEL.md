# Guía de Despliegue en Vercel — KineTracker

Esta guía detalla los pasos para desplegar la solución completa de KineTracker en [Vercel](https://vercel.com) a partir del repositorio GitHub [`Poncho0794/kinetracker`](https://github.com/Poncho0794/kinetracker).

---

## 🌟 Despliegue Unificado (Recomendado — Todo en 1 solo Dominio)

Con esta configuración, tanto la aplicación web (**React 19 / Vite**) como la API RESTful (**NestJS**) viven bajo el **mismo dominio** (ej. `https://kinetracker.vercel.app`):
- `https://kinetracker.vercel.app/` -> Frontend React
- `https://kinetracker.vercel.app/api` -> Backend NestJS (Serverless)
- `https://kinetracker.vercel.app/api/docs` -> Documentación Swagger
- **Sin problemas de CORS**, ya que el frontend y el backend comparten el mismo origen.

### Pasos en el Dashboard de Vercel:
1. En tu [Vercel Dashboard](https://vercel.com/dashboard), importa el repositorio: `Poncho0794/kinetracker`.
2. Deja el **Root Directory** en `./` (la raíz del monorepo).
3. El archivo `vercel.json` en la raíz se encarga automáticamente de todo:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/apps/kinetracker-ui`
   - **Rutas `/api/*`**: Ejecutan la función serverless pre-compilada de NestJS en `api/index.js`.
4. En la sección **Environment Variables**, agrega las credenciales de Supabase:
   - `SUPABASE_URL`: `https://tu-proyecto.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `tu-service-role-key-secreta`
   - `NODE_ENV`: `production`
5. Haz clic en **Deploy** (o **Redeploy** si ya lo habías importado).

---

## 🚀 Despliegue en 2 Proyectos Separados (Opcional)

Si prefieres separar el frontend y el backend en dos proyectos distintos de Vercel:

### Proyecto 1: `kinetracker-api` (Backend)
- **Root Directory**: `apps/kinetracker-api` (marcar "Include source files outside Root Directory") o `./`
- **Build Command**: `npm run build:api`
- **Environment Variables**: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CORS_ORIGIN=*`

### Proyecto 2: `kinetracker-ui` (Frontend)
- **Root Directory**: `./`
- **Build Command**: `npm run build:ui`
- **Output Directory**: `dist/apps/kinetracker-ui`
- **Environment Variables**: `VITE_API_URL=https://tu-api.vercel.app/api`
