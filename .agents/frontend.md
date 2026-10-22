# Frontend Agent Rules — React / Vite / Next.js

Applies only to frontend applications, UI components, client-side state, and their associated tests. Follow the root `AGENTS.md` for universal requirements.

## Components and Design

- Respect existing project structure, routing conventions, styling system, and design system.
- Prefer small, focused components with clear responsibilities. Extract reusable hooks when they remove meaningful duplication; do not create abstractions prematurely.
- Separate presentation from data-fetching and business logic when helpful, without enforcing one folder structure universally.
- Use `PascalCase` for React components and component types, `camelCase` for hooks/functions/variables, and descriptive names. Preserve existing conventions where established.
- Honor framework boundaries: in Next.js, preserve server/client component separation, data fetching conventions, and framework-native features appropriate to the installed version.

## State and Remote Data

- Prefer **Zustand** for shared/global state and for complex local state when a store provides real benefit. Keep simple component-local state in React `useState`/`useReducer` rather than adding unnecessary stores.
- Prefer **TanStack Query** for client-side server-state fetching, caching, synchronization, invalidation, and loading/error behavior when appropriate.
- **These are preferences, not automatic installation instructions**: reuse existing state/data libraries; request approval before introducing Zustand, TanStack Query, or any new dependency.
- Avoid duplicating server state in global stores when a dedicated data-fetching layer already owns it.

## Performance

- Prefer route-level or component-level lazy loading and `Suspense` boundaries **when warranted** by bundle size, loading UX, or code-splitting needs.
- Avoid unnecessary re-renders and effects. Measure or identify concrete bottlenecks before adding memoization, virtualization, or elaborate performance abstractions.
- In Next.js, favor built-in performance primitives and server-side approaches when suited to the use case; do not turn server components into client components without justification.

## Accessibility and UX

- Use semantic HTML and accessible labels; support keyboard navigation and meaningful focus behavior.
- Provide clear loading, empty, and error states. Use accessible announcements where dynamic changes require them.
- Consider contrast, responsive layout, form validation messages, and user-facing failure behavior.
- Do not add ARIA attributes unnecessarily when native semantics suffice.

## Security

- Treat data from APIs and users as untrusted; avoid unsafe HTML injection. Do not embed secrets in client-side bundles or `NEXT_PUBLIC_*`/`VITE_*` values; these prefixes expose values to browsers.
- Keep authorization enforced on the backend; frontend hiding/guards are not security boundaries.
- Follow backend API contracts and use established authentication/session patterns.

## Frontend Verification

- Add/update unit/component tests for new functionality and bug fixes with the test tools already in the repository (e.g., Jest, Vitest, React Testing Library).
- Test visible states and behavior, not fragile implementation details. Include accessibility-focused assertions where applicable.
- Run only tests related to the affected components/hooks by default; report tests not executed.
