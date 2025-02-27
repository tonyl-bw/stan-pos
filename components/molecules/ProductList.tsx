import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useProductContext } from '@/context/ProductContext';
import ProductListEmpty from '../atoms/ProductListEmpty';

export default function ProductList() {
  const { filteredProducts, handleProductPress } = useProductContext();

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        {item.description && (
          <Text style={styles.productDescription}>{item.description}</Text>
        )}
      </View>
    </Pressable>
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

const styles = StyleSheet.create({
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productInfo: {
    gap: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  productPrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  productDescription: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
});
