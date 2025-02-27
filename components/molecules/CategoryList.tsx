import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useProductContext } from '@/context/ProductContext';
import { MOCK_CATEGORIES } from '@/mock/category.mock';
import CategoryListItem from '../atoms/CategoryListItem';

export default function CategoryList() {
  const { selectedCategory, setSelectedCategory } = useProductContext();

  return (
    <View style={styles.categoryContainer}>
      <FlashList
        data={MOCK_CATEGORIES}
        extraData={MOCK_CATEGORIES}
        renderItem={({ item }) => <CategoryListItem category={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingHorizontal: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
});
