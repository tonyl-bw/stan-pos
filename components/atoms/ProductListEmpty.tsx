import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PackageOpen } from 'lucide-react-native';
import { Text, useTheme } from '@ui-kitten/components';
interface EmptyProductListProps {
  message?: string;
}

export default function EmptyProductList({
  message = 'No products available',
}: EmptyProductListProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <PackageOpen size={80} color="#CCCCCC" style={styles.icon} />
      <Text category="h6" style={{ paddingBottom: 8 }}>
        Nothing to show
      </Text>
      <Text category="c1" style={{ color: theme['text-hint-color'] }}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F2F2F7',
    minHeight: 300,
  },
  icon: {
    marginBottom: 20,
    opacity: 0.7,
  },
});
