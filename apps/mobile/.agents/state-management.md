# Mobile State Management Guidance (Zustand)

This document defines standards for global state management in `apps/mobile` using Zustand.

## Technical context

- Library: Zustand.
- Platform: React Native (Expo).
- Architecture: domain-driven stores (one store per feature/module).

## Folder structure and placement

All global stores must live in:

```text
apps/mobile/src/store/
```

Required structure:

```text
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

## Store creation patterns

### 1) Typed `create<T>()` with explicit interfaces

Every store must have a file containing the types and define separate interfaces for:

- State (data only)
- Actions (functions only)

Then compose them in a single store type.

Example pattern:

```ts
// auth.store.types.ts
export interface AuthState {
  userId: string | null;
  token: string | null;
}

export interface AuthActions {
  setSession: (payload: { userId: string; token: string }) => void;
  clearSession: () => void;
}
```

```ts 
// auth.store.ts
import { create } from 'zustand';
import { AuthActions, AuthState } from './auth.store.types'


type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()((set) => ({
  userId: null,
  token: null,
  setSession: ({ userId, token }) => set({ userId, token }),
  clearSession: () => set({ userId: null, token: null }),
}));
```

### 2) State/Actions separation rule

Inside each store definition:

- Keep state fields grouped together at the top of the object.
- Keep action functions grouped after state.
- Do not mix derived UI state and domain data in the same store unless they share the same domain responsibility.

### 3) Persistence for mobile (AsyncStorage)

For data that must survive app restarts (for example session tokens, selected theme, notification preferences), use Zustand `persist` middleware with React Native AsyncStorage.

Pattern:

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
}

interface SettingsActions {
  setTheme: (theme: SettingsState['theme']) => void;
}

type SettingsStore = SettingsState & SettingsActions;

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
```

Guidelines:

- Persist only minimal required fields (`partialize`) to reduce storage overhead.
- Do not persist transient UI flags (loading, open/close toggles, temporary inputs).
- Use stable, domain-specific storage keys (for example `auth-store`, `theme-store`).

## Performance and selector rules

Selectors are mandatory when consuming stores in components.

Required:

```ts
const user = useUserStore((state) => state.user);
const setTheme = useSettingsStore((state) => state.setTheme);
```

Forbidden:

```ts
const { user, setTheme } = useUserStore();
```

Rules:

- Always subscribe to the smallest possible slice of state.
- Prefer one selector per value/action used by the component.
- Never destructure the full store object inside React components.

## Store registry rule

A registry file must exist at:

```text
apps/mobile/src/store/STORES.md
```

This file must be updated every time a store is created, renamed, moved, or removed.

Each registry entry must include:

1. Store Name (for example `useUserStore`)
2. Domain (for example `Authentication & Profile`)
3. Primary Responsibility (for example `Manages session tokens and user metadata.`)
4. Location (file path)

Recommended table format:

```md
| Store Name | Domain | Primary Responsibility | Location |
| --- | --- | --- | --- |
| useAuthStore | Authentication | Manages session token and identity state. | src/store/auth/auth.store.ts |
| useThemeStore | Preferences | Manages app theme preference and persistence. | src/store/settings/settings.store.ts |
| useNotificationStore | Notifications | Manages notification settings and unread counters. | src/store/notifications/notifications.store.ts |
```

## Agent workflow requirements

Before creating new stateful logic:

1. Check `apps/mobile/src/store/STORES.md`.
2. Confirm whether the state belongs to an existing domain store.
3. Only create a new store when the domain is clearly new and independent.

When creating a store, agents must also provide a small usage example for a React Native component.

Example:

```tsx
import { View } from 'react-native';
import { Text, Button } from '@/components/atoms';
import { useThemeStore } from '@/store';

export function ThemeSwitcher() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <View>
      <Text>Current theme: {theme}</Text>
      <Button onPress={() => setTheme('dark')}>Use dark mode</Button>
    </View>
  );
}
```

## Naming and domain examples

Preferred generic app domains include:

- Authentication store
- Settings/Theme store
- Notification store
- Session store

Avoid legacy vanilla JavaScript patterns for shared state. Use Zustand hooks and typed store modules consistently.
