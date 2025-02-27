import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductProvider } from '@/context/ProductContext';
import ProductList from '@/components/molecules/ProductList';
import ProductModal from '@/components/atoms/ProductModal';
import CategoryList from '@/components/molecules/CategoryList';

export default function ProductsScreen() {
  return (
    <ProductProvider>
      <View style={styles.container}>
        <CategoryList />
        <ProductList />
        <ProductModal />
      </View>
    </ProductProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
});
