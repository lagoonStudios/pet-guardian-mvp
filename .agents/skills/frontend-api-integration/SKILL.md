# Frontend API Integration Skill

This skill defines the default frontend backend-integration architecture for large-scale frontend apps in this monorepo.

Use this skill whenever a frontend app integrates with a remote backend such as Supabase, REST APIs, GraphQL APIs, or any other server-state source.

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
Folder-structure rules (including Atomic Design and the `src/api`, `src/hooks`, `src/schemas` convention) are defined in the Frontend Architecture skill.