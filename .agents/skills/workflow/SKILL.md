# Shared Workflow Skill

Use this as reusable guidance from package-level `AGENTS.md` files.

## Monorepo commands
- Install dependencies (root): `pnpm install`
- Build pipeline (root): `pnpm build`
- Dev pipeline (root): `pnpm dev`
- Lint pipeline (root): `pnpm lint`
- Lint with auto-fix (root): `pnpm lint:fix`

## Package-scoped commands
- Backend: `pnpm --filter backend <script>`
- Mobile: `pnpm --filter mobile <script>`

## Change strategy
- Keep edits minimal and package-scoped.
- Prefer existing libraries and patterns already present in the touched package.
- Update docs when behavior or developer workflow changes.