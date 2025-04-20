import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useProductContext } from '@/context/ProductContext';
import ProductListEmpty from '../atoms/ProductListEmpty';
import { Text, useStyleSheet } from '@ui-kitten/components';
import ProductListItem from '../atoms/ProductListItem';

export default function ProductList() {
  const { filteredProducts } = useProductContext();
  const styles = useStyleSheet(themedStyles) as any;

  return (
    <FlashList
      data={filteredProducts}
      ListEmptyComponent={ProductListEmpty}
      extraData={filteredProducts}
      renderItem={({ item }) => <ProductListItem item={item} />}
      numColumns={2}
      estimatedItemSize={150}
      contentContainerStyle={styles.productList}
    />
  );
}

const themedStyles = StyleSheet.create({
  productList: {
    padding: 8,
  },
});
