import React from 'react';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { CartProvider } from '@/context/CartContext';
import { useSettings } from '@/context/SettingContext';
import { useTheme } from '@ui-kitten/components';

export default function App() {
  const { isDarkMode } = useSettings();
  const theme = useTheme();
  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: theme['background-basic-color-1'],
            },
            headerTitleStyle: {
              color: theme['text-primary-color'],
            },
            contentStyle: {
              backgroundColor: theme['background-basic-color-1'],
            },
          }}
        >
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </CartProvider>
    </ApplicationProvider>
  );
}
