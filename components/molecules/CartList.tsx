import { FlashList } from '@shopify/flash-list';
import { StyleSheet } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';
import { useCart } from '@/context/CartContext';
import { CartListItem } from '@/components/atoms/CartListItem';
import { CartListEmpty } from '@/components/atoms/CartListEmpty';
export default function CartList() {
  const { cartItems } = useCart();
  const styles = useStyleSheet(themedStyles) as any;

  return (
    <FlashList
      data={cartItems}
      renderItem={({ item }) => <CartListItem item={item} />}
      ListEmptyComponent={<CartListEmpty />}
      estimatedItemSize={100}
      contentContainerStyle={styles.cartList}
      keyExtractor={(item) => item.id}
    />
  );
}

const themedStyles = StyleSheet.create({
  cartList: {
    padding: 16,
  },
});
