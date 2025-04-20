import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useProductContext } from '@/context/ProductContext';
import ProductListEmpty from '../atoms/ProductListEmpty';
import { Text, useStyleSheet } from '@ui-kitten/components';

export default function ProductList() {
  const { filteredProducts, handleProductPress } = useProductContext();
  const styles = useStyleSheet(themedStyles) as any;

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productInfo}>
        <Text category="h6">{item.name}</Text>
        <Text category="s1" style={styles.productPrice}>
          ${item.price.toFixed(2)}
        </Text>
        {item.description && (
          <Text category="c1" style={styles.productDescription}>
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlashList
      data={filteredProducts}
      ListEmptyComponent={ProductListEmpty}
      extraData={filteredProducts}
      renderItem={renderProduct}
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
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'background-basic-color-1',
    borderWidth: 1,
    borderColor: 'border-basic-color-4',
  },
  productInfo: {
    gap: 4,
  },
  productPrice: {
    color: 'text-primary-color',
  },
  productDescription: {
    color: 'text-hint-color',
  },
});
