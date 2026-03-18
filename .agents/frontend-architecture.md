# Frontend Architecture Guidance

This document applies to all frontend apps in this monorepo (current: `apps/mobile`; future: `apps/web`).

## Required pattern: Atomic Design

All frontend UI must follow Atomic Design:

- Atoms: smallest reusable UI primitives.
- Molecules: composed units built from atoms.
- Organisms: larger composed sections built from molecules/atoms.
- Templates: page structure/layout composition.
- Pages: route-level screens that compose templates/organisms.

## Component reuse-first rule

- When implementing a new requirement, prefer composing existing atoms/molecules/organisms before creating new components.
- Before creating any new UI component, check the component resources catalog: `@.agents/frontend-components-catalog.md`.
- Prefer existing design-system-level components over direct HTML or React Native primitives in feature-level components.
- Direct HTML/React Native primitives should primarily exist in atoms or low-level design primitives.

## Component folder structure rule

Each component must live in a folder with the same component name.

Required files:

- `ComponentName/index.ts`: barrel file that exports all public members from the component folder.
- `ComponentName/ComponentName.tsx`: required root view/component implementation.

Optional files (create only when needed):

- `ComponentName/ComponentName.types.ts`: all component-specific TypeScript types.
- `ComponentName/ComponentName.functions.ts` or `ComponentName/ComponentName.functions.tsx`: reusable component logic that can be separated from the React component.
- `ComponentName/ComponentName.constants.ts`: component-specific constants.
- `ComponentName/ComponentName.schema.ts`: component/form validation schema definitions.
- `ComponentName/ComponentName.styles.tsx`: component-specific styles.
- `ComponentName/ComponentName.tests.tsx`: component unit tests.

Guidelines:

- Do not create optional files by default; create them only when the component requires them.
- Keep exports centralized in `index.ts` to keep import paths stable and explicit.

## Form implementation standard

- For frontend form handling, use `react-hook-form`.
- For schema validation, use `yup` with `@hookform/resolvers/yup`.
- Form schemas must live in `ComponentName/ComponentName.schema.ts`.
- Keep schema definitions and validation rules in the schema file, then import them into the component/form implementation.

## Catalog maintenance rule

- The component resources catalog (`@.agents/frontend-components-catalog.md`) must be updated whenever a frontend component is created, updated in classification, renamed, or deleted.
- Do not merge component structure changes without reflecting them in the catalog.
