import { useEffect } from 'react';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SettingsProvider } from '@/context/SettingContext';
import App from '@/components/layout/app';

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
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}
