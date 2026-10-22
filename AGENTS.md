# Agent Instructions — Reusable JavaScript/TypeScript Template

> Applies to this repository and its subdirectories unless a more specific `AGENTS.md` overrides it. Customize the **Project Profile** before using this template. Follow only the technology-specific guidance relevant to the repository.

## Project Profile (complete for each repository)

- **Purpose and domain:** <!-- Describe the business problem and primary users. -->
- **Repository type:** <!-- Single application / monorepo; workspace tooling. -->
- **Applications and packages:** <!-- Main directories and responsibilities. -->
- **Stack:** <!-- Node.js, NestJS, React/Vite, Next.js, versions. -->
- **Package manager and version:** <!-- Detect from packageManager field and lockfile. -->
- **Key commands:** <!-- test, test:unit, lint, typecheck, build; workspace-specific filters. -->
- **Architecture and conventions:** <!-- Link to established documentation or representative modules. -->
- **Supported environments:** <!-- Local/staging/production, no credentials. -->

## Instruction Map

Read this file first. When relevant, also read:

- [Backend rules](.agents/backend.md) for Node.js services, NestJS, APIs, databases, security, and OpenAPI.
- [Frontend rules](.agents/frontend.md) for React, Vite, Next.js, state, accessibility, and performance.
- [Testing rules](.agents/testing.md) whenever adding features, fixing bugs, or changing tested behavior.

In a mixed repository, apply both backend and frontend rules to their respective areas. If a guideline conflicts with working repository-specific conventions, preserve existing behavior and document the trade-off; ask permission before changing architecture. Repository-specific `AGENTS.md` files may add scoped instructions.

## Before Making Changes

1. Understand the request and identify the smallest required scope.
2. Inspect the relevant repository structure, `package.json` scripts, package manager/lockfile, TypeScript configuration, lint/formatting rules, tests, and analogous implementations.
3. Determine which instruction modules apply and whether a task changes a public contract, security controls, persistence, or runtime configuration.
4. For complex changes, architectural changes, or changes spanning multiple files, provide a concise implementation plan before editing. Small, straightforward changes do not require a formal plan.
5. If requirements are materially ambiguous or the proposed change is high-impact, clarify before modifying.

## Engineering Principles

- Follow **SOLID, DRY, KISS, YAGNI, Clean Code, and separation of concerns** pragmatically. Avoid over-engineering and speculative abstractions.
- Preserve existing architecture and patterns. **Propose architectural improvements and obtain approval before implementing them.**
- Change **only what is necessary** for the requested work. Do not opportunistically refactor unrelated code.
- Prefer descriptive English identifiers; `PascalCase` for components, classes, interfaces and types; `camelCase` for functions, methods, and variables. Honor existing project exceptions.
- Use strict TypeScript where applicable. Avoid `any`; prefer `unknown` with narrowing, generics, and specific domain types. Use explicit annotations where they improve contracts and readability; allow inference for obvious locals.
- Follow existing ESLint and Prettier configurations rather than introducing a competing style.
- Prefer `async`/`await` to promise chains. Use `try/catch` when an error can be meaningfully handled, translated, enriched, cleaned up, or logged; otherwise allow the appropriate error boundary to handle it. Never silently swallow errors.
- Add comments only for complex logic, non-obvious decisions, or important constraints. Code, comments, technical documentation, API documentation, and identifiers should be **in English**.
- Communicate explanations, plans, status, and final summaries to the user **in Spanish**, unless they request another language.

## Dependencies and Tooling

- Detect and use the **existing** package manager (`npm`, `pnpm`, `yarn`, etc.) and its lockfile; do not replace or regenerate lockfiles without reason.
- Reuse existing libraries first. When a new dependency is necessary, explain the rationale and **request approval before adding it**.
- Before suggesting a dependency or version, check available vulnerability data/advisories when feasible. **Do not intentionally introduce known critical or high-severity vulnerabilities**; report and obtain guidance if a safe compatible alternative is unavailable.
- Use repository-provided scripts and workspace filters rather than assuming standard script names or running every project in a monorepo.

## Security and Secrets (Mandatory)

- Apply secure-by-default practices appropriate to the app and relevant OWASP guidance. Validate untrusted inputs, enforce authorization server-side, avoid sensitive information leakage, and use least privilege.
- Never hardcode, expose, print, commit, or include API keys, access tokens, passwords, connection strings with credentials, or other secrets in source, tests, logs, documentation, examples, or output.
- Keep real `.env` files out of version control. Confirm `.gitignore` covers applicable local secret files, and maintain an `.env.example` with **placeholder values only**. Do not assume ignoring a file removes it if it is already tracked; raise that issue for remediation.
- Do not weaken security controls for convenience. Ask before changing authentication, authorization, CORS policy, headers, secret management, environment configuration, or other sensitive settings.
- Never execute destructive commands (e.g., `rm -rf`, `git reset --hard`, force pushes, dropping/truncating tables) without explicit authorization; suggest safer alternatives and assess scope first.
- **Do not execute database migrations, schema-altering SQL, or destructive data operations without explicit permission**, including locally. You may draft migrations/scripts and explain their effects.

## Authorization and Git

- Ordinary, scoped code edits are allowed. **Ask first** before architectural changes, dependency installation/upgrades, sensitive or broad configuration changes, code deletion beyond the clearly requested scope, destructive operations, or irreversible actions.
- Local commits are allowed when useful and consistent with the user's request; describe what is committed. **Do not push, merge, rebase shared branches, force-push, or modify remote branches without explicit authorization.**
- Preserve unrelated working-tree changes; inspect `git status` before risky operations. Never discard user changes.
- Do not modify CI/CD pipelines or deployment configuration without authorization.

## Documentation and Changelog

- Keep impacted documentation current, including README, architecture notes, and API references when relevant.
- Maintain the existing `CHANGELOG.md` structure. For meaningful user-facing behavior changes, fixes, or noteworthy technical changes, add an entry to the project's current Unreleased section (or equivalent). Do not create noisy entries for trivial formatting changes.
- Do not include sensitive details in docs or changelogs.

## Verification and Completion

- **Add or update unit tests for new functionality and bug fixes.** Follow [.agents/testing.md](.agents/testing.md).
- Execute **only tests relevant to the modified code** by default, selecting the narrowest useful scope. Run focused lint/typecheck or other checks only when needed to validate the affected area; avoid automatically running the full suite/build.
- Investigate failures related to the change, fix them when in scope, and rerun relevant checks. Report unrelated or pre-existing failures without expanding scope.
- Do not claim tests passed if they were not run. Clearly distinguish executed checks, failures, and checks that could not run.
- At completion, respond **in Spanish** with: (1) change summary, (2) files changed, (3) checks executed and results, and (4) remaining risks/blockers. Call out any approvals needed for next steps.

## Additional Instructions

Before implementing changes, review the relevant
project guidelines when applicable:

- `.agents/DESIGN.md` - Design system, UI/UX guidelines,
  colors, typography, and visual consistency.
- `.agents/backend.md` - Backend architecture and security.
- `.agents/frontend.md` - Frontend conventions.
- `.agents/testing.md` - Testing requirements.

Follow the instructions relevant to the files
being modified.

If a referenced file does not exist, skip it.
