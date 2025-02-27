import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PackageOpen } from 'lucide-react-native';

interface EmptyProductListProps {
  message?: string;
}

export default function EmptyProductList({ 
  message = "No products available"
}: EmptyProductListProps) {
  return (
    <View style={styles.container}>
      <PackageOpen 
        size={80} 
        color="#CCCCCC" 
        style={styles.icon}
      />
      <Text style={styles.title}>Nothing to show</Text>
      <Text style={styles.message}>{message}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    maxWidth: '80%',
  }
});