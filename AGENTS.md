# AGENTS.md

This file defines default guidance for AI coding agents working in this monorepo.

## Scope and precedence

- This file applies to the whole repository.
- A deeper `AGENTS.md` (for example in `apps/backend` or `apps/mobile`) overrides this file for that subtree.

## Repository map

- `apps/backend`: NestJS API service.
- `apps/mobile`: Expo + React Native app (frontend).

## Global working rules

- Use `pnpm` workspace commands from repository root unless a task is explicitly package-local.
- Prefer filtered commands for package-specific work:
  - `pnpm --filter backend <command>`
  - `pnpm --filter mobile <command>`
- Prefer Turbo for multi-package tasks (`pnpm build`, `pnpm dev`).
- Make focused changes only in relevant package(s); avoid cross-package refactors unless requested.
- Do not edit generated output directories (for example `dist/`).

## Quality checks

- Run the narrowest relevant validation first, then broaden only if needed.
- Backend checks usually involve `build`, `lint`, and `test` scripts in `apps/backend`.
- Mobile checks usually involve `lint` and Expo run scripts in `apps/mobile`.

## Skills and reusable guidance

This monorepo uses a skills-based structure for reusable domain knowledge and workflows. All skills are located in `.agents/skills/<skill-name>/SKILL.md`.

**Key skills:**
- Find skills (Vercel Labs): `.agents/skills/find-skills/SKILL.md`

- Add new skills under `.agents/skills/` as the codebase evolves.

**Override rules:**
- Project-level AGENTS.md files (e.g., in `apps/backend` or `apps/mobile`) override this file for their subtree.
- Backend architecture guidance: @apps/backend/.agents/architecture.md
- Mobile architecture guidance: @apps/mobile/.agents/architecture.md
