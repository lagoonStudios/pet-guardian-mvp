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

## Catalog maintenance rule

- The component resources catalog (`@.agents/frontend-components-catalog.md`) must be updated whenever a frontend component is created, updated in classification, renamed, or deleted.
- Do not merge component structure changes without reflecting them in the catalog.
