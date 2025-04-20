import Header from '@/components/layout/Header';
import CategoryList from '@/components/molecules/CategoryList';
import { ProductProvider } from '@/context/ProductContext';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { Dimensions, Platform, SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import ProductList from '@/components/molecules/ProductList';
import CartList from '@/components/molecules/CartList';
import CartSummary from '@/components/molecules/CartSummary';
import { useCart } from '@/context/CartContext';
import ProductListItemModal from '@/components/atoms/ProductListItemModal';

export default function SellScreen() {
  const styles = useStyleSheet(themedStyles) as any;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Responsive layout
  const isLargeScreen =
    Platform.OS === 'web' || Dimensions.get('window').width >= 1024;

  const { clearCart } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      <ProductProvider>
        <Header />
        <View style={styles.content}>
          {/* Left panel */}
          <View
            style={[
              styles.leftPanel,
              !isLargeScreen && isDrawerOpen && styles.hiddenOnMobile,
            ]}
          >
            <CategoryList />
            <ProductList />
            {/* Product list item modal */}
            <ProductListItemModal />
          </View>
          {/* Right panel */}
          {(isLargeScreen || isDrawerOpen) && (
            <View style={styles.rightPanel}>
              <CartList />
              <CartSummary onClearCart={clearCart} />
            </View>
          )}
        </View>
      </ProductProvider>
    </SafeAreaView>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 3,
    display: 'flex',
  },
  hiddenOnMobile: {
    display: 'none',
  },
  rightPanel: {
    flex: 2,
    backgroundColor: 'background-basic-color-1',
    borderLeftWidth: 1,
    borderLeftColor: 'border-basic-color-4',
    maxWidth: 400,
    ...Platform.select({
      web: {
        boxShadow: '-1px 0 2px rgba(0, 0, 0, 0.05)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: -1, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
    }),
  },
});
