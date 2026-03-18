import type { Theme as NavigationTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

type PaperColorOverrides = Partial<MD3Theme['colors']>;

const palette = {
  brand: "#09A6A3",
  brandBright: "#00CCBE",
  brandMuted: "#9DBFAF",
  cream: "#EDEBC9",
  error: "#FF3B3B",
  warning: "#FFC700",
  info: "#0063F7",
  success: "#06C270",
  dark1: "#3A3A3C",
  dark2: "#6B7588",
  dark3: "#8F90A6",
  dark4: "#C7C9D9",
  light1: "#D9DBE9",
  light2: "#EDEFF6",
  light3: "#F7F7FC",
  light4: "#FAFAFC",
  lightBackground: "#F5F8F8",
  white: "#FFFFFF",
  black: "#000000",
} as const;

export const paperColorOverrides: Record<"light" | "dark", PaperColorOverrides> = {
  light: {
    primary: palette.brand,
    onPrimary: palette.white,
    primaryContainer: palette.brandMuted,
    onPrimaryContainer: palette.dark1,
    secondary: palette.brandBright,
    onSecondary: palette.dark1,
    secondaryContainer: "#CCF4F2",
    onSecondaryContainer: palette.dark1,
    tertiary: palette.cream,
    onTertiary: palette.dark1,
    tertiaryContainer: "#F6F3D7",
    onTertiaryContainer: palette.dark1,
    error: palette.error,
    onError: palette.white,
    errorContainer: "#FFDAD7",
    onErrorContainer: "#410002",
    background: palette.lightBackground,
    onBackground: palette.dark1,
    surface: palette.white,
    onSurface: palette.dark1,
    surfaceVariant: palette.light1,
    onSurfaceVariant: palette.dark2,
    outline: palette.dark3,
    outlineVariant: palette.dark4,
    inverseSurface: palette.dark1,
    inverseOnSurface: palette.light4,
    inversePrimary: palette.brandBright,
    shadow: palette.black,
    scrim: palette.black,
    surfaceDisabled: "rgba(58, 58, 60, 0.12)",
    onSurfaceDisabled: "rgba(58, 58, 60, 0.38)",
    backdrop: "rgba(58, 58, 60, 0.4)",
  },
  dark: {
    primary: palette.brandBright,
    onPrimary: "#003735",
    primaryContainer: palette.brand,
    onPrimaryContainer: "#D9FFFC",
    secondary: palette.brandMuted,
    onSecondary: "#233330",
    secondaryContainer: "#4A625B",
    onSecondaryContainer: "#E7F2EC",
    tertiary: palette.cream,
    onTertiary: "#34321D",
    tertiaryContainer: "#646149",
    onTertiaryContainer: "#FAF8D9",
    error: palette.error,
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD7",
    background: "#1E1E1E",
    onBackground: palette.light4,
    surface: palette.dark1,
    onSurface: palette.light4,
    surfaceVariant: palette.dark2,
    onSurfaceVariant: palette.light1,
    outline: palette.dark3,
    outlineVariant: palette.dark2,
    inverseSurface: palette.light4,
    inverseOnSurface: "#1E1E1E",
    inversePrimary: palette.brand,
    shadow: palette.black,
    scrim: palette.black,
    surfaceDisabled: "rgba(250, 250, 252, 0.12)",
    onSurfaceDisabled: "rgba(250, 250, 252, 0.38)",
    backdrop: "rgba(0, 0, 0, 0.5)",
  },
};

export function createPaperTheme(
  isDark: boolean,
  navigationTheme: NavigationTheme,
): MD3Theme {
  const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const scheme = isDark ? 'dark' : 'light';

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...paperColorOverrides[scheme],
      background: paperColorOverrides[scheme].background ?? navigationTheme.colors.background,
    },
  };
}
