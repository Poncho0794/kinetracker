# KineTracker — Monorepo de Seguimiento Biomecánico

Monorepo desarrollado con **Nx** que contiene la solución completa de KineTracker:
1. **`kinetracker-ui`**: Aplicación web frontend (React + Vite + Tailwind CSS) construida a partir de los diseños de Stitch y las directrices de [`DESIGN.md`](./DESIGN.md).
2. **`kinetracker-api`**: Backend RESTful (NestJS) conectado a Supabase para almacenamiento relacional, documentado con Swagger/OpenAPI y protegido con Helmet y CORS estricto.

---

## 🏗️ Estructura del Proyecto

```
KineTracker/
├── apps/
│   ├── kinetracker-ui/            # Frontend (React 19, Vite, Tailwind CSS)
│   │   ├── src/
│   │   │   ├── components/        # Header, MetricCards, ExerciseCard, LoggingModal, etc.
│   │   │   ├── services/          # Cliente API y fallback de datos locales
│   │   │   └── app/               # Vistas: Hoy, Crear Rutina, Ejercicios, Historial
│   │   └── tailwind.config.js     # Tokens de diseño extraídos de Stitch
│   │
│   └── kinetracker-api/           # Backend (NestJS 11)
│       ├── src/
│       │   ├── common/logger/     # Servicio abstracto de logging
│       │   ├── supabase/          # Cliente Supabase & Repositorio
│       │   ├── users/             # Entidad Usuarios
│       │   ├── routines/          # Entidad Rutinas (1:N con Usuarios)
│       │   ├── exercises/         # Entidad Ejercicios (1:N con Rutinas)
│       │   └── workout-logs/      # Entidad Registros de Ejercicios Diarios
│       └── .env.example           # Plantilla de variables de entorno
│
├── supabase/
│   └── schema.sql                 # DDL de PostgreSQL con tablas, claves, índices y semillas
└── DESIGN.md                      # Sistema de diseño ("Athletic Kinetic") de Stitch
```

---

## 🗄️ Estructura Relacional en Supabase

El archivo [`supabase/schema.sql`](./supabase/schema.sql) contiene el esquema completo para ejecutar en el SQL Editor de tu proyecto Supabase:

1. **`users` (Usuarios)**: `id` (UUID), `email`, `name`, `avatar_url`, `weekly_goal_days`, `created_at`.
2. **`routines` (Rutinas)**: Relación **1 a muchos** con `users` (`user_id` -> `users.id`). Atributos: `name`, `description`, `day_of_week`, `frequency_days`.
3. **`exercises` (Ejercicios)**: Relación **1 a muchos** con `routines` (`routine_id` -> `routines.id`). Atributos: `name`, `target_muscle`, `secondary_muscles`, `target_sets`, `target_reps_min`, `target_reps_max`, `target_weight`, `rest_seconds`, `notes`, `image_url`.
4. **`workout_logs` (Registros de Ejercicios por Día)**: Vincula `exercise_id`, `user_id`, `routine_id`, `set_number`, `reps_completed`, `weight_used`, `rpe`, `is_personal_record` y `log_date`.

---

## 🚀 Comandos Principales

### 1. Compilación (Build)
```bash
# Compilar todo el monorepo
npx nx run-many -t build

# Compilar proyectos individualmente
npx nx build kinetracker-api
npx nx build kinetracker-ui
```

### 2. Pruebas Unitarias (Test)
```bash
# Ejecutar todas las suites de prueba
npx nx run-many -t test

# Pruebas individuales
npx nx test kinetracker-api
npx nx test kinetracker-ui
```

### 3. Desarrollo Local (Dev Servers)
```bash
# Iniciar backend NestJS (Puerto 3000)
npx nx serve kinetracker-api

# Iniciar frontend React / Vite (Puerto 4200)
npx nx serve kinetracker-ui
```

- **Frontend:** [http://localhost:4200](http://localhost:4200)
- **Backend API:** [http://localhost:3000/api](http://localhost:3000/api)
- **Documentación Swagger / OpenAPI:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
