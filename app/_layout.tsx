import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CartProvider } from '@/context/CartContext';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </CartProvider>
        <StatusBar style="auto" />
      </ApplicationProvider>
    </GestureHandlerRootView>
  );
}
