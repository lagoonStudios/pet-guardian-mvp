import { vi } from 'vitest';

const asyncStorageMemory = new Map<string, string>();

vi.mock('react-native-reanimated', async () => {
  const mock = await vi.importActual<object>('react-native-reanimated/mock');
  return mock;
});

vi.mock('@react-native-async-storage/async-storage', () => {
  const mockApi = {
    setItem: vi.fn(async (key: string, value: string) => {
      asyncStorageMemory.set(key, value);
    }),
    getItem: vi.fn(async (key: string) => asyncStorageMemory.get(key) ?? null),
    removeItem: vi.fn(async (key: string) => {
      asyncStorageMemory.delete(key);
    }),
    clear: vi.fn(async () => {
      asyncStorageMemory.clear();
    }),
  };

  return {
    default: mockApi,
    ...mockApi,
  };
});