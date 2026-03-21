import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
}

interface ThemeActions {
  setTheme: (theme: ThemeState['theme']) => void;
  resetTheme: () => void;
}

type ThemeStore = ThemeState & ThemeActions;

const initialState: ThemeState = {
  theme: 'system',
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
      resetTheme: () => set(initialState),
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
