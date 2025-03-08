import React from 'react';

import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { CartProvider } from '@/context/CartContext';
import { useSettings } from '@/context/SettingContext';
import { useTheme } from '@ui-kitten/components';
import Stack from './stack';

export default function App() {
  const { isDarkMode } = useSettings();
  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      <CartProvider>
        <Stack />
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </CartProvider>
    </ApplicationProvider>
  );
}
