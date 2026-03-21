# Frontend API Integration Guidance

This document defines the default frontend backend-integration architecture for large-scale frontend apps in this monorepo.

Use this guidance whenever a frontend app integrates with a remote backend such as Supabase, REST APIs, GraphQL APIs, or any other server-state source.

## Goals

- Keep backend integration scalable and predictable.
- Decouple UI components from the backend client implementation.
- Treat TanStack Query as the server-state orchestrator.
- Keep the transport and persistence details inside a service layer.
- Keep Atoms and Molecules presentational.
- Restrict backend orchestration to hooks, Organisms, Templates, and Pages.

## Standard stack

- Server-state orchestration: `@tanstack/react-query` v5+
- Backend client: backend-specific SDK or HTTP client
- Supabase backend client: `@supabase/supabase-js`
- Optional HTTP client: `axios`
- Forms that submit mutations: `react-hook-form`
- Validation for forms: `yup` with `@hookform/resolvers/yup`

## High-level layering

Follow this separation for every backend-backed feature:

1. `lib/`: shared clients, providers, query client, query keys.
2. `api/services/`: service functions that call the backend client.
3. `hooks/`: TanStack Query hooks only.
4. `components/organisms/`: components that consume hooks.
5. `components/molecules/` and `components/atoms/`: presentational only.
6. `schemas/`: shared form schemas for backend-backed flows.
7. `app/` pages: route-level composition and route concerns.

## Directory structure ownership

Folder-structure rules (including Atomic Design and the `src/api`, `src/hooks`, `src/schemas` convention) are defined in `@.agents/frontend-architecture.md`.

This file focuses on backend-integration behavior and patterns, not app folder governance.

## Query Client defaults

Create one shared Query Client and configure app-wide defaults conservatively.

```ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

Guidelines:

- Set conservative shared defaults in the Query Client.
- Override `staleTime` and `gcTime` per hook only when the feature requires it.
- Keep long-lived cache for reference data and short-lived cache for volatile user-specific data.

## Query Key Factory

Never use inline array literals or magic strings directly inside components or hooks.

Centralize query keys in a factory.

### Recommended baseline

```ts
export const queryKeys = {
  pets: {
    all: ['pets'] as const,
    lists: () => [...queryKeys.pets.all, 'list'] as const,
    list: (filters: { ownerId: string; search?: string; species?: string }) =>
      [...queryKeys.pets.lists(), filters] as const,
    details: () => [...queryKeys.pets.all, 'detail'] as const,
    detail: (petId: string) => [...queryKeys.pets.details(), petId] as const,
  },
  profiles: {
    all: ['profiles'] as const,
    detail: (profileId: string) => [...queryKeys.profiles.all, profileId] as const,
  },
} as const;
```

Rules:

- Put every filter that changes the backend result into the query key.
- Include Supabase filter inputs such as `eq`, `ilike`, `order`, `range`, and pagination cursor inputs in the key.
- Do not rely on closures alone to differentiate cached results.

## Service pattern

The service layer owns backend client calls.

Rules:

- Service functions live in `src/api/services/`.
- Service functions are plain async functions.
- Service functions return typed domain or DTO results.
- Service functions must not call `useQuery`, `useMutation`, `queryClient`, or React hooks.
- Service functions should be backend-client aware; hooks should not be.

### Supabase service example

```ts
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/database.types';

type PetRow = Database['public']['Tables']['pets']['Row'];

type ListPetsFilters = {
  ownerId: string;
  search?: string;
};

export async function listPets(filters: ListPetsFilters): Promise<PetRow[]> {
  let query = supabase
    .from('pets')
    .select('*')
    .eq('owner_id', filters.ownerId)
    .order('created_at', { ascending: false });

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data ?? [];
}
```

## Strict typing with Supabase-generated types

When using Supabase, base types on generated database types.

Rules:

- Generate database types from the Supabase schema and store them in a shared `database.types.ts` file.
- Use `Database['public']['Tables']['table_name']['Row']`, `Insert`, and `Update` types for service inputs and outputs.
- Avoid `any` or hand-written approximations when generated types exist.

## Wrapping services in TanStack Query hooks

Every query and mutation must be wrapped in a custom hook.

Do not call `useQuery`, `useInfiniteQuery`, or `useMutation` directly in Pages, Templates, Molecules, or Atoms.

### Query hook example with Supabase filters in the key

```ts
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/react-query/query-keys';
import { listPets } from '@/api/services/pets.service';

export function usePetsQuery(filters: { ownerId: string; search?: string }) {
  return useQuery({
    queryKey: queryKeys.pets.list(filters),
    queryFn: () => listPets(filters),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    select: (rows) =>
      rows.map((pet) => ({
        id: pet.id,
        name: pet.name,
        species: pet.species,
      })),
  });
}
```

Rules:

- Put Supabase filter inputs into `queryKey`.
- Call only service functions from `queryFn` and `mutationFn`.
- Use `select` to shape backend data for UI consumers.
- Return only the shape needed by the consuming Organism or Template when practical.

## Handling relational data

Supabase often returns nested relation data from `.select('*, profiles(*)')`.

Keep this backend response shape out of low-level UI components.

### Example

```ts
export async function listPetsWithProfiles(ownerId: string) {
  const { data, error } = await supabase
    .from('pets')
    .select('id, name, species, profiles(id, full_name, avatar_url)')
    .eq('owner_id', ownerId);

  if (error) {
    throw error;
  }

  return data ?? [];
}
```

```ts
export function usePetsWithProfilesQuery(ownerId: string) {
  return useQuery({
    queryKey: queryKeys.pets.list({ ownerId }),
    queryFn: () => listPetsWithProfiles(ownerId),
    select: (rows) =>
      rows.map((row) => ({
        id: row.id,
        name: row.name,
        species: row.species,
        ownerName: row.profiles?.full_name ?? 'Unknown owner',
        ownerAvatarUrl: row.profiles?.avatar_url ?? null,
      })),
  });
}
```

Rules:

- Let services return backend-shaped relational results.
- Let hooks transform relational results into UI-facing props with `select`.
- Do not pass raw Supabase relation payloads into Atoms or Molecules.

## Real-time synchronization with Supabase Realtime

Use Supabase Realtime to keep TanStack Query caches synchronized.

Preferred strategies:

1. `invalidateQueries` when updates are broad or difficult to reconcile safely.
2. `setQueryData` when the updated entity can be patched deterministically.

### Recommended pattern

- Subscribe inside a domain-scoped hook in `src/hooks/` or provider-level integration hook.
- Scope the realtime subscription by table and feature filters where possible.
- Clean up channels on unmount.

### Example with invalidation

```ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase/client';
import { queryKeys } from '@/lib/react-query/query-keys';

export function usePetsRealtime(ownerId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`pets:${ownerId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pets', filter: `owner_id=eq.${ownerId}` },
        () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.pets.lists() });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [ownerId, queryClient]);
}
```

### Example with `setQueryData`

Use `setQueryData` when the payload is small and the reconciliation is safe and local.

```ts
queryClient.setQueryData(queryKeys.pets.detail(payload.new.id), payload.new);
```

Rules:

- Prefer invalidation if cache patching would be fragile.
- Use direct cache updates only when entity identity and merge logic are clear.
- Keep realtime wiring outside Atoms and Molecules.

## Auth integration with Supabase

Supabase Auth session state must stay aligned with TanStack Query cache behavior.

Recommended pattern:

- Keep auth session in a dedicated auth provider or auth integration module.
- On login or token refresh, invalidate or refetch session-dependent queries as needed.
- On logout, clear or reset the Query Client cache.

### Logout strategy

```ts
import { queryClient } from '@/lib/react-query/query-client';

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  queryClient.clear();
}
```

Rules:

- Clear cache on logout to prevent cross-user stale data leaks.
- Scope user-specific query keys so session transitions are easy to invalidate.
- Keep auth event listeners in a shared integration layer, not in leaf UI components.

## Pagination and infinite scroll with Supabase Range

Use `useInfiniteQuery` with Supabase `.range(from, to)` for infinite scrolling.

### Example

```ts
type ListPetsPageInput = {
  ownerId: string;
  pageParam?: number;
  pageSize?: number;
};

export async function listPetsPage({
  ownerId,
  pageParam = 0,
  pageSize = 20,
}: ListPetsPageInput) {
  const from = pageParam * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('owner_id', ownerId)
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return {
    items: data ?? [],
    nextPage: (data?.length ?? 0) < pageSize ? undefined : pageParam + 1,
  };
}
```

```ts
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfinitePetsQuery(ownerId: string) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.pets.lists(), { ownerId, mode: 'infinite' }] as const,
    queryFn: ({ pageParam = 0 }) => listPetsPage({ ownerId, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => ({
      ...data,
      items: data.pages.flatMap((page) => page.items),
    }),
  });
}
```

Rules:

- Include pagination mode and filters in the query key.
- Keep page calculations in the service layer.
- Flatten pages in `select` if the Organism needs a simple list.

## Optimistic updates

Optimistic updates belong in custom mutation hooks.

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/react-query/query-keys';
import { updateProfileSettings } from '../api/profile-settings.service';
import type { ProfileSettingsRow, UpdateProfileSettingsInput } from '../api/profile-settings.types';

export function useUpdateProfileSettingsMutation(userId: string) {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.profiles.detail(userId);

  return useMutation({
    mutationFn: (input: UpdateProfileSettingsInput) => updateProfileSettings(userId, input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey });

      const previousProfile = queryClient.getQueryData<ProfileSettingsRow>(queryKey);

      queryClient.setQueryData<ProfileSettingsRow>(queryKey, (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          ...input,
        };
      });

      return { previousProfile };
    },
    onError: (_error, _input, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(queryKey, context.previousProfile);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
```

Rules:

- Cancel in-flight queries before optimistic updates.
- Snapshot previous cache values in `onMutate`.
- Roll back in `onError`.
- Reconcile server truth in `onSuccess` or `onSettled`.

## Organism integration

Organisms may consume backend integration hooks.

Atoms and Molecules must stay presentational and receive data only through props.

### Example

```tsx
import { PetListSection } from '../../molecules/PetListSection/PetListSection';
import { usePetsQuery } from '../../hooks/use-pets-query';

export function PetListOrganism({ ownerId, search }: { ownerId: string; search?: string }) {
  const { data, isPending, isError } = usePetsQuery({ ownerId, search });

  if (isPending) {
    return <PetListSection title="Pets" description="Loading pets..." items={[]} />;
  }

  if (isError || !data) {
    return <PetListSection title="Pets" description="Unable to load pets." items={[]} />;
  }

  return <PetListSection title="Pets" description="Available pets" items={data} />;
}
```

Rules:

- Organisms can orchestrate query state.
- Molecules and Atoms should not know where data came from.
- Keep backend integration logic in services, hooks, and Organisms.

## Loading and error strategy

Use two patterns intentionally.

### Global route-level loading and errors

Use `useSuspenseQuery` for page-level or template-level blocking data when:

- The screen cannot render meaningfully without the data.
- A route-level error boundary is available.
- The app benefits from consistent loading fallbacks.

Recommended:

- Wrap page or template branches with Suspense boundaries.
- Use route or app-level error boundaries for fatal fetch failures.

### Local component-level loading and errors

Use standard `useQuery` state flags when:

- The page can render partially without the data.
- Only one section needs to load independently.
- The UI should show skeletons or placeholders inside a specific Organism.

Recommended:

- `isPending` or `isLoading` for local loading UI.
- `isError` for section-level retry surfaces.
- Escalate only critical failures to route boundaries.

## Atomic Design guidance for backend integration

- Atoms: never call backend hooks.
- Molecules: never call backend hooks.
- Organisms: may call feature hooks.
- Templates: may coordinate multiple Organisms and Suspense boundaries.
- Pages: compose templates and route concerns.

## Naming conventions

- Shared integration guide file: `frontend-api-integration.md`
- Query key factory: `queryKeys`
- Backend service files: `*.service.ts`
- Query hooks: `use-*.query.ts` or `use-*-query.ts`
- Mutation hooks: `use-*.mutation.ts` or `use-*-mutation.ts`
- Form schemas: `ComponentName.schema.ts`

Choose one naming convention per app and keep it consistent.

## Minimum implementation checklist

For every new backend-backed feature:

- Add typed service functions in `src/api/services/`.
- Base Supabase typing on generated database types when Supabase is used.
- Add query keys to the centralized factory.
- Add custom query and mutation hooks in `src/hooks/`.
- Include filter inputs in the query key.
- Use `select` when the UI does not need the raw backend payload.
- Keep Atoms and Molecules presentational.
- Add realtime synchronization logic when the feature benefits from it.
- Clear or reset query cache correctly on logout.
- Use `src/schemas/` for shared submitted-form validation and `ComponentName.schema.ts` for component-local validation.
