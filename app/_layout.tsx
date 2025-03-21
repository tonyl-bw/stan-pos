import { useEffect } from 'react';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SettingsProvider } from '@/context/SettingContext';
import App from '@/components/layout/app';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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
      <BottomSheetModalProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
