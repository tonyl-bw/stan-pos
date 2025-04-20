import React from 'react';

import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { CartProvider } from '@/context/CartContext';
// import { useSettings } from '@/context/SettingContext';
import Stack from './Stack';
import mapping from '../../mapping.json';

export default function App() {
  // const { isDarkMode } = useSettings();
  return (
    <ApplicationProvider
      {...eva}
      theme={eva.light}
      // @ts-ignore
      customMapping={mapping}
    >
      <CartProvider>
        <Stack />
        <StatusBar />
      </CartProvider>
    </ApplicationProvider>
  );
}
