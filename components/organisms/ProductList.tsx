import React from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useProductContext } from '@/context/ProductContext';
import ProductListEmpty from '../molecules/ProductListEmpty';
import { useStyleSheet } from '@ui-kitten/components';
import ProductListItem from '../molecules/ProductListItem';

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
