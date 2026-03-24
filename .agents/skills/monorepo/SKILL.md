# Monorepo Governance Skill

Use this skill for repository-wide architecture and workflow decisions beyond shared types.

## Modular structure
- Keep clear top-level boundaries:
  - `apps/` for runnable services and clients.
  - `packages/` for shared libraries and contracts.
  - `tools/` for scripts, generators, and automation utilities.
- Keep each package focused on one responsibility.
- Avoid mixing app runtime code with reusable library code.

## Dependency management
- Use workspace-aware package management with `pnpm` workspaces.
- Use `workspace:*` for local package dependencies.
- Prefer centralizing common dependency versions at root when possible to reduce version drift.
- Keep package dependencies explicit and minimal.

## Build and CI/CD optimization
- Use incremental task execution and affected-project strategies.
- Prefer Turbo pipelines to avoid full repository rebuilds on every change.
- Cache build and test outputs in CI where possible.
- Run checks only for changed or affected packages before broad full-repo jobs.

## Code boundaries and governance
- Enforce clear module boundaries to prevent circular or invalid cross-package imports.
- Prefer TypeScript project references and lint constraints for boundary enforcement.
- Define ownership with `CODEOWNERS` to route reviews to the right teams.
- Maintain dependency graph visibility using monorepo tooling.

## Tooling and automation
- Prefer monorepo-native orchestration (`pnpm` workspaces + Turbo).
- Standardize lint, formatting, testing, and TypeScript configuration patterns.
- Reuse common configuration in shared files rather than duplicating per app.
- Automate repetitive developer tasks through scripts in `tools/` or package scripts.