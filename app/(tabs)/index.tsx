import React from 'react';
import { View } from 'react-native';
import { ProductProvider } from '@/context/ProductContext';
import ProductList from '@/components/organisms/ProductList';
import CategoryList from '@/components/organisms/CategoryList';
import CartList from '@/components/organisms/CartList';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import { ProductSearch } from '@/components/atoms/ProductSearch';
import ProductListItemModal from '@/components/organisms/ProductListItemModal';

export default function ProductsScreen() {
  const { cartTotal } = useCart();
  const styles = useStyleSheet(themedStyles) as any;
  const goToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <ProductProvider>
      <View style={styles.container}>
        {/* Left side - Products */}
        <View style={styles.productsSection}>
          <ProductSearch />
          <CategoryList />
          <ProductList />
          <ProductListItemModal />
          <ProductListItemModal />
        </View>

        {/* Right side - Cart */}
        <View style={styles.cartSection}>
          <CartList />
          <View style={styles.cartFooter}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
            </View>
            <Button onPress={goToCheckout}>Checkout</Button>
          </View>
        </View>
      </View>
    </ProductProvider>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'background-basic-color-4',
  },
  productsSection: {
    flex: 2,
  },
  cartSection: {
    flex: 1,
    backgroundColor: 'background-basic-color-4',
  },
  cartFooter: {
    padding: 16,
    backgroundColor: 'background-basic-color-1',
    margin: 16,
    borderRadius: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'text-basic-color',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: 'text-primary-color',
  },
});
