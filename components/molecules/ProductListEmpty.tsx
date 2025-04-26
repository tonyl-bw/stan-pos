import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PackageOpen } from 'lucide-react-native';
import { Text, useTheme, useStyleSheet } from '@ui-kitten/components';
interface EmptyProductListProps {
  message?: string;
}

export default function EmptyProductList({
  message = 'No products available',
}: EmptyProductListProps) {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles) as any;
  return (
    <View style={styles.container}>
      <PackageOpen size={80} color={theme['text-hint-color']} style={styles.icon} />
      <Text category="h6" style={{ paddingBottom: 8 }}>
        Nothing to show
      </Text>
      <Text category="c1" style={{ color: theme['text-hint-color'] }}>
        {message}
      </Text>
    </View>
  );
}

const themedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'background-basic-color-2',
    minHeight: 300,
  },
  icon: {
    marginBottom: 20,
    opacity: 0.7,
  },
});
