# AGENTS.md (Backend)

This file applies to `apps/backend` and overrides root guidance when there is a conflict.

## Stack and structure

- Framework: NestJS (TypeScript).
- Entry point: `src/main.ts`.
- Core module wiring lives under `src/` (`app.module.ts`, controllers, services).

## Backend coding conventions

- Follow NestJS module/controller/service patterns.
- Keep controllers thin (HTTP concerns) and move business logic to services.
- Prefer dependency injection over manual instantiation.
- Keep contracts explicit with typed DTOs/interfaces where needed.

## Commands

- Dev server: `pnpm --filter backend dev`
- Build: `pnpm --filter backend build`
- Lint: `pnpm --filter backend lint`
- Unit tests: `pnpm --filter backend test`
- E2E tests: `pnpm --filter backend test:e2e`

## Validation expectations

- For backend code changes, run at least relevant tests or lint for touched areas.
- For API-facing changes, prefer unit + e2e validation when feasible.

## Skills references

- Monorepo governance: `../../.agents/skills/monorepo/SKILL.md`
- Shared workflow: `../../.agents/skills/workflow/SKILL.md`
- Shared testing: `../../.agents/skills/unit-tests/SKILL.md`
- Shared TypeScript types: `../../.agents/skills/types/SKILL.md`
- Shared i18n: `../../.agents/skills/i18n/SKILL.md`
- Backend architecture: `../.agents/skills/architecture/SKILL.md`

**Note:** This file overrides root AGENTS.md for backend-specific guidance. Update skills as backend practices evolve.
