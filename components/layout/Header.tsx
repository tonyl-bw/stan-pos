import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import {
  Menu,
  LayoutDashboard,
  ReceiptText,
  ShoppingBag,
  Settings,
} from 'lucide-react-native';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import BarcodeProductField from '../atoms/BarcodeProductField';
import { router } from 'expo-router';

export default function Header() {
  const styles = useStyleSheet(themedStyle) as any;
  const theme = useTheme();

  const handleOnNavigate = (route: string) => {
    router.navigate(route as any);
  };

  const handleOnMenuToggle = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          onPress={handleOnMenuToggle}
          style={styles.menuButton}
        >
          <Menu size={24} color={theme['color-basic-700']} />
        </TouchableOpacity>
        <Text style={styles.logo}>StanPOS</Text>
      </View>

      <BarcodeProductField />

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleOnNavigate('/sell')}
        >
          <LayoutDashboard size={22} color={theme['color-basic-700']} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleOnNavigate('/orders')}
        >
          <ReceiptText size={22} color={theme['color-basic-700']} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleOnNavigate('/inventory')}
        >
          <ShoppingBag size={22} color={theme['color-basic-700']} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleOnNavigate('/settings')}
        >
          <Settings size={22} color={theme['color-basic-700']} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const themedStyle = StyleService.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: 'background-basic-color-1',
    borderBottomWidth: 1,
    borderBottomColor: 'border-basic-color-4',
    ...Platform.select({
      web: {
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      },
    }),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  logo: {
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'text-primary-color',
  },
  searchContainerFocused: {
    borderColor: 'text-primary-color',
    backgroundColor: 'background-basic-color-1',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  cartButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'text-primary-color',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: 'background-basic-color-1',
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
});
