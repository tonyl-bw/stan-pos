import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { MOCK_CATEGORIES } from '@/mock/category.mock';
import CategoryListItem from '../atoms/CategoryListItem';
import { useStyleSheet } from '@ui-kitten/components';

export default function CategoryList() {
  const styles = useStyleSheet(themedStyles) as any;
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

const themedStyles = StyleSheet.create({
  categoryContainer: {
    height: 50,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: 'background-basic-color-4',
    borderBottomColor: 'border-basic-color-4',
  },
});
