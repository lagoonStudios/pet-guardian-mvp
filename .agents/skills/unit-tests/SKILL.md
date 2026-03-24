# Shared Testing Skill

## General
- Start with the smallest relevant test target for changed code.
- Avoid changing unrelated tests.
- If no tests exist for a touched behavior, add a targeted test when the package already uses tests.

## Frontend unit test placement (`apps/mobile`)
- Unit tests for a component live with that component, using either:
  - `ComponentName.test.ts` (or `.test.tsx`) in the same component folder, or
  - `tests/ComponentName.test.ts` inside the same component folder.
- These tests should cover component-level unit behavior only.
- Keep test files focused and isolated from integration/e2e concerns.

## Mock Data Factory (Builder) Standard
### Data Creation Policy
- **Do NOT hardcode large mock objects directly in `.test.ts` files.**
- All test data for Domain Entities (e.g., User, Transaction, Profile) **must** be created using a Builder from `src/tests/builders/`.

### Mandatory Builder Usage
- Any test requiring a Domain Entity **must** use the corresponding Builder.
- Example: To create a `User` for a test, use `UserBuilder` from `src/tests/builders/user.builder.ts`.

### Builder Structure
- All builders must:
  - Reside in `src/tests/builders/`.
  - Use a fluent interface (method chaining).
  - Initialize with "Safe Defaults" that pass standard validation.

### Maintenance
- When a shared Type or DTO is updated in `packages/types`, the corresponding Builder **must** be updated immediately to match the new schema.

### Example: Correct vs Incorrect

#### Incorrect (Hardcoded Object)
// ...see full file for more examples...