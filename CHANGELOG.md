# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Vercel Deployment Support**:
  - Serverless execution handler and dynamic CORS support for Vercel in `apps/kinetracker-api/src/main.ts`.
  - Vercel configuration files: `apps/kinetracker-api/vercel.json` (serverless node function) and `apps/kinetracker-ui/vercel.json` (SPA routing rewrites).
  - Configurable `VITE_API_URL` environment variable support in `apps/kinetracker-ui/src/services/api.ts` with local fallback.
  - Root `api/index.ts` serverless adapter bridge.
  - Step-by-step deployment guide in `DEPLOYMENT_VERCEL.md`.
  - Helper build scripts in `package.json` (`build:api`, `build:ui`, `serve:api`, `serve:ui`).
- Monorepo setup with **Nx 24** (`apps/kinetracker-ui` and `apps/kinetracker-api`).
- **`kinetracker-ui`**: Frontend application in React 19, Vite, and Tailwind CSS using tokens and layout from [`DESIGN.md`](./DESIGN.md) and Stitch.
  - Interactive components: `Header`, `MetricCards`, `ExerciseCard`, `LoggingModal`, and `CreateRoutineModal`.
  - Views for active routine logging, routine creation with frequency split selector (3-6 days), exercise catalogue with muscle group filters, and history table.
- **`kinetracker-api`**: Backend application in NestJS 11 with `@supabase/supabase-js`, Helmet security headers, CORS allowlist, and Swagger/OpenAPI documentation.
  - Modules and REST endpoints: `Users`, `Routines`, `Exercises`, and `WorkoutLogs`.
  - Fallback local in-memory dataset seeded with demo data when Supabase remote credentials are not yet configured.
- **Supabase Relational Schema**: [`supabase/schema.sql`](./supabase/schema.sql) with entities:
  - `users`
  - `routines` (1:N with users)
  - `exercises` (1:N with routines)
  - `workout_logs` (registros de series, repeticiones, cargas y PRs diarios)
  - Triggers para actualización automática de timestamp `updated_at`, índices de alto rendimiento y datos de semilla.
- Unit test suites for both applications passing cleanly (`vitest` for frontend, `jest` for backend).
