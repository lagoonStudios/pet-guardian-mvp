# Mobile State Management Skill (Zustand)

This skill defines standards for global state management in `apps/mobile` using Zustand.

## Technical context
- Library: Zustand.
- Platform: React Native (Expo).
- Architecture: domain-driven stores (one store per feature/module).

## Folder structure and placement
All global stores must live in:
```
apps/mobile/src/store/
```
Required structure:
```
apps/mobile/src/store/
  index.ts
  STORES.md
  auth/
    auth.store.ts
    aut.store.types.ts
  settings/
    settings.store.ts
    settings.store.types.ts
```

Rules:
- Each domain store must have its own directory under `src/store/`.
- Store files must follow `<domain>.store.ts` naming.
- `src/store/index.ts` must re-export all store hooks to keep imports consistent.
- Avoid creating global state outside `src/store/`.