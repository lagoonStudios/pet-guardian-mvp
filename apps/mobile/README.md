# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Supabase setup

This app includes these env and config files:

- `.env.example` (default values for local envs)
- `types/env.d.ts` (TypeScript `process.env` declaration helpers)
- `src/lib/config.ts` (runtime env schema + validation)
- `src/lib/supabase/client.ts` (Supabase client uses validated env)

### 0. Example `.env.example`

```bash
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-public-anon-key
EXPO_PUBLIC_API_URL=https://localhost:3000
```

### 1. Copy the example env file

```bash
cp .env.example .env.local
```

### 2. Edit `.env.local` values

- `EXPO_PUBLIC_ENVIRONMENT` = `development` | `production` | `test`
- `EXPO_PUBLIC_SUPABASE_URL` = your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = your Supabase anon key
- `EXPO_PUBLIC_API_URL` = your backend API URL (default for local dev: `https://localhost:3000`)

(You can also set `EXPO_PUBLIC_SUPABASE_ANON_KEY` as a fallback alias if needed.)

### 3. Verify type declarations

`types/env.d.ts` must include the same env vars, e.g:

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_ENVIRONMENT?: "development" | "production" | "test";
    EXPO_PUBLIC_SUPABASE_URL?: string;
    EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
    EXPO_PUBLIC_API_URL?: string;
  }
}
```

### 4. Verify runtime validation in `src/lib/config.ts`

`src/lib/config.ts` validates required env vars via `yup` and exports `config`.

### 5. Start the app

```bash
pnpm dev
```

### Supabase types generation

Replace `database.types.ts` with generated types from your Supabase schema.

Example command:

```bash
supabase gen types typescript --project-id <your-project-id> --schema public > lib/supabase/database.types.ts
```

If you do not have the Supabase CLI installed, install it first:

```bash
brew install supabase/tap/supabase
```
