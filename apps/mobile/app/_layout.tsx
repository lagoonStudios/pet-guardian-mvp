import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { type ComponentProps } from 'react';
import { PaperProvider } from "react-native-paper";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-reanimated';

import { createPaperTheme } from "@/constants/paper-theme";
import { useAuthInit } from "@/src/hooks/use-auth-init";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ReactQueryProvider } from "@/lib/react-query/ReactQueryProvider";

export const unstable_settings = {
  anchor: '(tabs)',
};

type MaterialDesignIconName = ComponentProps<typeof MaterialDesignIcons>['name'];

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useAuthInit();

  const navigationTheme = isDark ? DarkTheme : DefaultTheme;
  const paperTheme = createPaperTheme(isDark, navigationTheme);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ReactQueryProvider>
        <PaperProvider
          theme={paperTheme}
          settings={{
            icon: (props) => (
              <MaterialDesignIcons {...props} name={props.name as MaterialDesignIconName} />
            ),
          }}>
          <ThemeProvider value={navigationTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
            </Stack>
            <StatusBar style={isDark ? "light" : "dark"} />
          </ThemeProvider>
        </PaperProvider>
      </ReactQueryProvider>
    </SafeAreaProvider>
  );
}
