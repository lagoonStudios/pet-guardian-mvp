# pet-guardian-mvp

This repository is a monorepo for the Pet Guardian MVP. It groups multiple applications in a single workspace so they can share tooling, dependency management, and development workflows.

## Apps

The `apps/` folder contains the runnable applications in this project:

- `apps/backend`: a NestJS backend service.
- `apps/mobile`: an Expo / React Native mobile application.

## Installing dependencies

This monorepo uses `pnpm` workspaces. Install all packages from the repository root so dependencies are resolved for every app:

```bash
pnpm install
```

## Building the project with Turbo

To run the build pipeline from the repository root, use:

```bash
pnpm build
```

or:

```bash
npx turbo run build
```

This currently executes the `build` script for apps that define one. At the moment, that means:

- the backend is built with NestJS into `apps/backend/dist`
- the mobile app is not included in the build pipeline yet

The build command does not start any server or app. It only compiles the code.

To confirm the build worked:

- check that `apps/backend/dist` was created
- look for a successful Turbo summary in the terminal

If you want to run the compiled backend after building, start it with:

```bash
pnpm --filter backend start:prod
```

By default, the NestJS backend listens on `http://localhost:3000` unless the `PORT` environment variable is set.

## Running the project with Turbo

[Turbo](https://turborepo.com/) is a build system for monorepos. It helps run tasks across multiple apps from the workspace root and coordinates those tasks in a single command.

To start the project in development mode from the repository root, run either:

```bash
npm run dev
```

or:

```bash
npx turbo run dev
```

This will execute the `dev` script in each app that defines it, which currently starts:

- the backend in watch mode
- the mobile app with Expo

How to verify each app is running:

- Backend: NestJS listens on `http://localhost:3000` by default. Open that URL in the browser or run `curl http://localhost:3000`. In the current starter app, it responds with `Hello World!`.
- Mobile: Expo starts the Metro development server. The terminal shows a QR code and the local/LAN URLs for the app. Metro usually runs on `http://localhost:8081`, but Expo may choose another port if that one is busy.

If you want to open the mobile app in a browser specifically, run:

```bash
pnpm --filter mobile web
```

Expo will then print the browser URL in the terminal, usually `http://localhost:8081` or the next available port.

## Supabase in this monorepo

This repository keeps database assets at the workspace root:

- SQL migrations: `supabase/migrations/`
- Generated shared DB types: `supabase/database.types.ts`

Both apps consume the same generated database types through local alias/re-export files, so mobile and backend stay aligned with the same schema contract.

### Prerequisite

The Supabase CLI is required to run the root Supabase scripts.

- In this repo, the CLI is already available as a dev dependency (`supabase`) and is executed via `npx` inside scripts.
- If needed outside scripts, you can also install it globally by following the official Supabase CLI installation guide: https://supabase.com/docs/guides/cli/getting-started

### Root Supabase scripts

The root `package.json` includes the following scripts:

- `pnpm run supabase:link`
  - Runs `npx supabase link --project-ref "$PROJECT_REF"`
  - Links your local Supabase CLI context to the remote project defined by `PROJECT_REF`.

- `pnpm run supabase:migrate`
  - Runs `npx supabase db push`
  - Applies local migrations from `supabase/migrations/` to the linked Supabase project.

- `pnpm run supabase:gen`
  - Runs `npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > supabase/database.types.ts`
  - Regenerates the shared TypeScript database contract after schema changes.

### Typical workflow

1. Set your project reference:

	```bash
	export PROJECT_REF="your-project-ref"
	```

2. Link your local CLI to Supabase:

	```bash
	pnpm run supabase:link
	```

3. Apply migrations:

	```bash
	pnpm run supabase:migrate
	```

4. Regenerate shared DB types:

	```bash
	pnpm run supabase:gen
	```

If you are not linked and need an explicit one-off command, you can still generate with:

```bash
npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > supabase/database.types.ts
```