# Testing and Verification Rules

Applies to all JavaScript/TypeScript project types. Respect the root `AGENTS.md` and the installed testing stack.

## Required Coverage by Change Type

- **New functionality:** add unit tests covering intended behavior and important edge/error cases.
- **Bug fix:** add a regression test demonstrating the failure where feasible, then verify it passes with the fix.
- **Refactor with no intended behavior change:** update tests if needed; preserve existing observable behavior.
- Do not enforce a universal numeric coverage target unless the repository defines one. Aim for meaningful assertions and risk-based coverage.

## Tool Selection and Isolation

- Discover and use the existing framework and scripts (Jest, Vitest, React Testing Library, NestJS testing utilities, etc.). Do not replace test tooling without approval.
- Mock external integrations at clear boundaries. Avoid brittle mocks of internal implementation details.
- Keep tests deterministic and independent. Reset shared state, mocks, timers, and fixtures between tests as needed.
- Prefer tests against public behavior, contracts, authorization, validation, and observable effects.

## Scope of Execution

1. Identify the changed units/modules and their direct dependents.
2. Run the **smallest relevant test scope** using the detected package manager and scripts/workspace filters.
3. Investigate failures connected to the change; correct issues within task scope and rerun.
4. If execution is blocked, explain why and what remains unverified. Do not report a test as passed without executing it.
5. Run broader verification (full suite, entire build, workspace-wide lint) only when justified by cross-cutting impact or explicitly requested.

## Completion Report

In Spanish, state:
- Relevant test commands executed and their results.
- Tests added or updated and the behavior they validate.
- Any existing failures, skipped checks, unresolved risks, and approvals required.
