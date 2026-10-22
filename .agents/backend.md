# Backend Agent Rules — Node.js / NestJS

Applies only to backend services, API endpoints, persistence, and their associated tests. The root `AGENTS.md` takes precedence for universal requirements.

## Architecture

- Respect the existing project architecture. For NestJS, favor established module/controller/service/provider boundaries, dependency injection, DTOs, and clear separation of responsibilities.
- Controllers should focus on HTTP concerns; business logic belongs in services or domain layers; persistence belongs in existing repositories/adapters.
- Do not introduce Clean/Hexagonal architecture or reorganize modules without approval.
- Reuse existing error handling, dependency injection, configuration, and validation mechanisms.

## API Contracts and Validation

- Validate and sanitize input at trust boundaries with the repository's DTO/schema approach (e.g., NestJS `ValidationPipe` plus DTOs or an established schema library).
- Apply appropriate authentication and **server-side authorization** to protected operations, including resource-level access checks where relevant.
- Use consistent HTTP status codes and a centralized error-handling strategy (e.g., NestJS exception filters). Avoid leaking stack traces or internal implementation details in production responses.
- For new or modified endpoints, keep **Swagger/OpenAPI documentation up to date**: operation summary, parameters, DTO schemas, response status codes, error cases, and auth requirements. Where Swagger is not installed, propose integration rather than adding a dependency without approval.
- Avoid breaking public API contracts without an explicit migration/compatibility plan and approval.

## OWASP-Aligned Security Baseline

- Follow applicable OWASP API Security Top 10 and secure coding recommendations, including input validation, broken object-level authorization prevention, secure configuration, rate limiting when relevant, and avoidance of excessive data exposure.
- **Helmet:** integrate/configure suitable security headers for HTTP applications (commonly `helmet` with NestJS/Express). Respect the HTTP adapter and existing setup; request approval before installing or changing dependencies/configuration.
- **CORS:** use an explicit allowlist of trusted origins from environment/configuration. Permit selected localhost origins **only in local development**. Do **not** use wildcard `*`, unrestricted origin reflection, or permissive production defaults. Keep credentials and allowed origins compatible.
- Keep secret material in approved environment/secret-management mechanisms; never expose secrets in logs, error objects, or documentation.
- Use parameterized SQL/ORM queries; never interpolate untrusted input into SQL commands.
- Treat rate limiting, request-size limits, secure cookies, and other controls as deployment-specific requirements to inspect and propose where applicable.

## Async Operations and Error Handling

- Prefer `async`/`await`. Use `try/catch` when translating external errors, adding meaningful context, releasing resources, or handling recoverable failures; do not wrap every method mechanically.
- Preserve errors and relevant stack/cause where the framework allows. Never swallow exceptions or expose sensitive internals.
- Respect timeouts, retries, and transaction boundaries for external services; avoid unbounded retries.

## Logging

- Abstract application logging behind an injectable logger/service/interface so the implementation can later be replaced (e.g., console first, structured logger later).
- Start with console-backed logging **only through the abstraction**, not scattered `console.log` calls across business logic.
- Format human-readable log messages as `<functionName> -> <descriptive message>`; provide consistent severity levels and contextual metadata where useful.
- Never log credentials, tokens, personally identifiable/sensitive data, full authorization headers, or request bodies containing secrets. Apply appropriate redaction.

## Database Operations

- Respect the current database, ORM, repository conventions, and transaction strategy.
- You may propose schema changes, migration files, or data-fix scripts with impact and rollback notes; **never execute migrations or schema/data-destructive operations without explicit authorization**.
- Prefer transactions for operations that must be atomic. Assess locks, performance, rollback strategy, and backward compatibility for changes affecting production data.

## Backend Verification

- Add or update unit tests for service/domain behavior and endpoint logic affected by new features or bug fixes.
- Test input validation, permissions, expected errors, and key negative paths when relevant.
- Run focused tests for modified modules and report results. Update Swagger and changelog for relevant contract/behavior changes.
