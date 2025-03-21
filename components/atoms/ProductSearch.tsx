import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, useTheme } from '@ui-kitten/components';
import { Search } from 'lucide-react-native';
import { useProductContext } from '@/context/ProductContext';

export function ProductSearch() {
  const { setSearchQuery } = useProductContext();
  const theme = useTheme();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <Input
      style={styles.searchInput}
      placeholder="Search products..."
      accessoryLeft={<Search size={20} color={theme['text-hint-color']} />}
      onChangeText={handleSearch}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: '30%',
  },
});
