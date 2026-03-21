import { z } from 'zod';

export const envSchema = z.object({
  EXPO_PUBLIC_SUPABASE_URL: z.url().min(1),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const invalidEntries = parsedEnv.error.issues.map((issue) => {
    const variableName = issue.path.join('.') || 'unknown';
    return `${variableName}: ${issue.message}`;
  });

  const uniqueEntries = Array.from(new Set(invalidEntries));

  throw new Error(
    [
      'Invalid SaaS Infrastructure environment configuration.',
      ...uniqueEntries.map((entry) => `- ${entry}`),
    ].join('\n'),
  );
}

export const config = parsedEnv.data;