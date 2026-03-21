export const queryKeys = {
  userSettings: {
    all: ['user-settings'] as const,
    detail: (userId: string) => ['user-settings', userId] as const,
  },
} as const;
