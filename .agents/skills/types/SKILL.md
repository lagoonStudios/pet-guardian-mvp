# Shared Types Skill

Use this skill for TypeScript type design across the monorepo.

## Core policy
- Prefer global shared types over app-specific duplicated types.
- Shared contracts should be the default for data exchanged between backend and frontend.

## Shared package structure
- Create and maintain a dedicated shared package (for example `packages/types` or `packages/shared-types`).
- Organize types by domain (for example `user.ts`, `order.ts`, `enums.ts`).
- Re-export package surface from `index.ts`.
- Keep this package focused on contracts: interfaces, type aliases, enums, DTO definitions.

## Workspace dependency usage
- Consume shared types as a workspace dependency from each app.
- Example dependency declaration:
  - `"@mycompany/types": "workspace:*"`
- Prefer imports from the shared package instead of redefining similar local types.

## Type consumption
- Import shared types directly from the package public API.
- Example: `import { User, Order } from '@mycompany/types';`
- Keep package exports stable and explicit to avoid deep import coupling.

## TypeScript configuration
- Use a shared base `tsconfig` for consistent compiler options.
- Configure `paths` and/or project references to resolve shared types correctly.
- Ensure build ordering supports consumers depending on shared types outputs.

## Best practices
- Treat shared types as a contract boundary, not as backend-only or frontend-only implementation detail.
- If externally published, version shared contracts with semantic versioning.
- Enable `declaration` and `declarationMap` for strong IDE and type navigation support.