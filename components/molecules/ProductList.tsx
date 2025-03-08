import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useProductContext } from '@/context/ProductContext';
import ProductListEmpty from '../atoms/ProductListEmpty';
import { Text, useTheme } from '@ui-kitten/components';

export default function ProductList() {
  const { filteredProducts, handleProductPress } = useProductContext();
  const theme = useTheme();

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      style={[
        styles.productCard,
        {
          backgroundColor: theme['background-basic-color-1'],
        },
      ]}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productInfo}>
        <Text category="h6">{item.name}</Text>
        <Text category="s1" style={{ color: theme['text-primary-color'] }}>
          ${item.price.toFixed(2)}
        </Text>
        {item.description && (
          <Text category="c1" style={{ color: theme['text-hint-color'] }}>
            {item.description}
          </Text>
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
});
