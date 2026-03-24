# AGENTS.md (Mobile Frontend)

This file applies to `apps/mobile` and overrides root guidance when there is a conflict.

## Stack and structure

- Framework: Expo + React Native + TypeScript.
- Routing: Expo Router file-based routes in `app/`.
- Shared UI lives in `components/`; shared app hooks live in `hooks/`.
- Backend services live in `api/services/` and shared validation schemas live in `schemas/`.

## Frontend coding conventions

- Keep screens route-focused; extract reusable UI into `components/`.
- Prefer existing theme and utility hooks before introducing new patterns.
- Preserve platform compatibility (iOS/Android/Web) unless task scope says otherwise.
- Keep navigation changes consistent with Expo Router file-based conventions.
- Follow Atomic Design and compose from existing atoms/molecules/organisms before creating new components.
- Check `@.agents/frontend-components-catalog.md` before adding new UI and prefer reuse over direct React Native primitives.

## Commands

- Dev server: `pnpm --filter mobile dev`
- Lint: `pnpm --filter mobile lint`
- Web preview: `pnpm --filter mobile web`
- Device targets: `pnpm --filter mobile android`, `pnpm --filter mobile ios`

## Validation expectations

- Run lint for code changes.
- For UI changes, validate the affected route/screen in at least one target runtime.

## Skills references

- Monorepo governance: `../../.agents/skills/monorepo/SKILL.md`
- Shared workflow: `../../.agents/skills/workflow/SKILL.md`
- Shared testing: `../../.agents/skills/unit-tests/SKILL.md`
- Shared TypeScript types: `../../.agents/skills/types/SKILL.md`
- Shared i18n: `../../.agents/skills/i18n/SKILL.md`
- Frontend architecture: `../../.agents/skills/frontend-architecture/SKILL.md`
- Frontend API integration: `../../.agents/skills/frontend-api-integration/SKILL.md`
- Frontend components catalog: `../../.agents/skills/frontend-components-catalog/SKILL.md`
- Mobile state management: `../../.agents/skills/state-management/SKILL.md`
- Mobile i18n: `../../.agents/skills/i18n-mobile/SKILL.md`

**Note:** This file overrides root AGENTS.md for mobile-specific guidance. Update skills as mobile practices evolve.
- Frontend API integration guidance: @.agents/frontend-api-integration.md
- Frontend components catalog: @.agents/frontend-components-catalog.md
- Mobile architecture guidance: @apps/mobile/.agents/architecture.md
- Mobile state management guidance: @apps/mobile/.agents/state-management.md
