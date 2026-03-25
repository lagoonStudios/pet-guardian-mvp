import * as yup from "yup";

export const envSchema = yup.object({
  EXPO_PUBLIC_ENVIRONMENT: yup
    .string()
    .oneOf(
      ["development", "production", "test"],
      "EXPO_PUBLIC_ENVIRONMENT must be one of 'development', 'production', or 'test'",
    )
    .required("EXPO_PUBLIC_ENVIRONMENT is required"),
  EXPO_PUBLIC_SUPABASE_URL: yup
    .string()
    .required("EXPO_PUBLIC_SUPABASE_URL is required")
    .min(1, "EXPO_PUBLIC_SUPABASE_URL cannot be empty")
    .url("EXPO_PUBLIC_SUPABASE_URL must be a valid URL"),
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: yup
    .string()
    .required("EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required")
    .min(1, "EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY cannot be empty"),
  EXPO_PUBLIC_API_URL: yup
    .string()
    .required("EXPO_PUBLIC_API_URL is required")
    .min(1, "EXPO_PUBLIC_API_URL cannot be empty")
    /* .url("EXPO_PUBLIC_API_URL must be a valid URL") */
    .required("EXPO_PUBLIC_API_URL is required"),
});

let parsedEnv: yup.InferType<typeof envSchema>;

try {
  parsedEnv = envSchema.validateSync(process.env, {
    abortEarly: false,
    stripUnknown: false,
  });
} catch (error) {
  if (error instanceof yup.ValidationError) {
    const allIssues = error.inner.length > 0 ? error.inner : [error];
    const issuesByVariable = new Map<string, string>();

    for (const issue of allIssues) {
      const variableName = issue.path ?? "unknown";
      if (!issuesByVariable.has(variableName)) {
        issuesByVariable.set(variableName, issue.message);
      }
    }

    throw new Error(
      [
        "Invalid environment configuration.",
        ...Array.from(issuesByVariable.entries()).map(
          ([variableName, message]) => `- ${variableName}: ${message}`,
        ),
      ].join("\n"),
    );
  }

  throw error;
}

export const config = parsedEnv;
