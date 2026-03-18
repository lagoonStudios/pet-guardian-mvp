import { Tabs } from 'expo-router';
import React from 'react';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
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
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="compass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="style-guide"
        options={{
          title: "Style Guide",
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="palette-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
