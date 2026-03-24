# i18n Mobile Skill

This skill applies to `apps/mobile` and complements the main i18n skill.

## Core standards
- The mobile app is multilingual by default.
- Every user-facing string must come from locale JSON files.
- Hardcoded strings inside UI components (including `<Text>`) are not allowed.
- Backend message codes are treated as a contract and must be translated on the frontend.

## Locale file structure
- Keep locale files under `src/locales/<language>/`.
- Use domain files only:
  - `auth.json`
  - `common.json`
  - `errors.json`
- Prefer nested domain keys such as:
  - `auth.login.title`
  - `auth.errors.invalid_credentials`
  - `errors.backend.ERR_AUTH_INVALID_PASSWORD`

## How to add a new language
1. Create `src/locales/<new-language>/`.
2. Add `auth.json`, `common.json`, and `errors.json` with the same key shape as `en`.
3. Register the new language in `src/lib/i18n.ts`:
   - Add resource imports.
   - Add the language to `supportedLanguages`.
   - Add the language resource object under `resources`.
4. Verify fallback behavior still points to `en`.
5. Run lint/tests for `apps/mobile`.

## React usage patterns
- Use `useTranslation` inside components and hooks that prepare UI-facing messages.
- Use selector-based `t` access for better type-safe and scalable lookups:
  - `t($ => $.auth.login.title)`
  - `t($ => $.errors.backend.ERR_AUTH_INVALID_PASSWORD)`