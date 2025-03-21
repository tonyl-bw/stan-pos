import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, useStyleSheet } from '@ui-kitten/components';
import {
  useCart,
  CartItem,
  CartItemCustomization,
} from '@/context/CartContext';

interface CartListItemProps {
  item: CartItem;
}

export function CartListItem({ item }: CartListItemProps) {
  const {
    checkoutInProgress,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useCart();
  const styles = useStyleSheet(themedStyles) as any;

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>

      {/* Item customizations */}
      {item.customizations && item.customizations.length > 0 && (
        <View style={styles.customizationContainer}>
          {item.customizations.map(
            (customization: CartItemCustomization, index) => (
              <Text key={index} style={styles.customizationText}>
                {customization.action === 'remove' ? 'No ' : '+ '}
                {customization.name}
                {customization.additionalCost > 0
                  ? ` (+$${customization.additionalCost.toFixed(2)})`
                  : ''}
              </Text>
            )
          )}
        </View>
      )}

      {/* Item notes */}
      {item.notes && <Text style={styles.itemNotes}>Note: {item.notes}</Text>}

      <View style={styles.quantityContainer}>
        <Pressable
          style={styles.quantityButton}
          onPress={() => decreaseQuantity(item.id)}
          disabled={checkoutInProgress}
        >
          <Minus size={20} color="#007AFF" />
        </Pressable>

        <Text style={styles.quantity}>{item.quantity}</Text>

        <Pressable
          style={styles.quantityButton}
          onPress={() => increaseQuantity(item.id)}
          disabled={checkoutInProgress}
        >
          <Plus size={20} color="#007AFF" />
        </Pressable>

        <Pressable
          style={[styles.quantityButton, styles.deleteButton]}
          onPress={() => removeFromCart(item.id)}
          disabled={checkoutInProgress}
        >
          <Trash2 size={20} color="#FF3B30" />
        </Pressable>
      </View>
    </View>
  );
}

const themedStyles = StyleSheet.create({
  cartItem: {
    backgroundColor: 'background-basic-color-1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'text-basic-color',
  },
  itemPrice: {
    fontSize: 16,
    color: 'text-primary-color',
    fontWeight: '500',
  },
  customizationContainer: {
    marginBottom: 12,
  },
  customizationText: {
    fontSize: 14,
    color: 'text-hint-color',
    marginBottom: 2,
  },
  itemNotes: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'text-hint-color',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'background-basic-color-2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
});
