import { Tabs } from 'expo-router';
import React from 'react';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useTranslation } from "react-i18next";

import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme/use-color-scheme";

export default function TabLayout() {
  const { t } = useTranslation(["common"]);
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t(($) => $.navigation.tabs.home),
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t(($) => $.navigation.tabs.explore),
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="compass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="style-guide"
        options={{
          title: t(($) => $.navigation.tabs.styleGuide),
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="palette-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
