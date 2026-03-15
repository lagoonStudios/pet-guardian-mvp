# AGENTS.md (Mobile Frontend)

This file applies to `apps/mobile` and overrides root guidance when there is a conflict.

## Stack and structure

- Framework: Expo + React Native + TypeScript.
- Routing: Expo Router file-based routes in `app/`.
- Shared UI and hooks live in `components/`, `constants/`, and `hooks/`.

## Frontend coding conventions

- Keep screens route-focused; extract reusable UI into `components/`.
- Prefer existing theme and utility hooks before introducing new patterns.
- Preserve platform compatibility (iOS/Android/Web) unless task scope says otherwise.
- Keep navigation changes consistent with Expo Router file-based conventions.

## Commands

- Dev server: `pnpm --filter mobile dev`
- Lint: `pnpm --filter mobile lint`
- Web preview: `pnpm --filter mobile web`
- Device targets: `pnpm --filter mobile android`, `pnpm --filter mobile ios`

## Validation expectations

- Run lint for code changes.
- For UI changes, validate the affected route/screen in at least one target runtime.

## Shared references

- Monorepo governance guidance: @.agents/monorepo.md
- Shared workflow: @.agents/workflow.md
- Shared testing guidance: @.agents/unit-tests.md
- Shared TypeScript types guidance: @.agents/types.md
- Mobile architecture guidance: @apps/mobile/.agents/architecture.md
