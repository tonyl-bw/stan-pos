import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MOCK_CATEGORIES } from '@/mock/category.mock';
import CategoryListItem from '../atoms/CategoryListItem';
import { useTheme } from '@ui-kitten/components';

export default function CategoryList() {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.categoryContainer,
        {
          backgroundColor: theme['background-basic-color-1'],
          borderBottomColor: theme['border-basic-color-4'],
        },
      ]}
    >
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
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
});
