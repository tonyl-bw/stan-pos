import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { useCart, CartItem, CartItemCustomization } from '@/context/CartContext';

interface CartListItemProps {
  item: CartItem;
}

export function CartListItem({ item }: CartListItemProps) {
  const { decreaseQuantity, increaseQuantity, removeFromCart } = useCart();
  const styles = useStyleSheet(themedStyles) as any;
  const theme = useTheme();

  return (
    <View style={styles.cartItem}>
      <View style={styles.mainContent}>
        <View style={styles.itemInfo}>
          <Text category="s1" style={styles.itemName}>
            {item.name}
          </Text>
          <Text category="p1" style={styles.itemPrice}>
            ${item.price.toFixed(2)}
          </Text>
        </View>

        {/* Item notes */}
        {item.notes && <Text style={styles.itemNotes}>Note: {item.notes}</Text>}

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => decreaseQuantity(item.id)}>
            <Minus size={14} color={theme['text-basic-color']} />
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
            <Plus size={14} color={theme['text-basic-color']} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Customizations */}

      {/* Item customizations */}
      {item.customizations && item.customizations.length > 0 && (
        <View style={styles.customizationContainer}>
          {item.customizations.map((customization: CartItemCustomization, index) => (
            <Text key={index} style={styles.customizationText}>
              {customization.action === 'remove' ? 'No ' : '+ '}
              {customization.name}
              {customization.additionalCost > 0 ? ` (+$${customization.additionalCost.toFixed(2)})` : ''}
            </Text>
          ))}
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
          <Trash2 size={14} color={theme['color-basic-600']} />
          <Text category="p1" style={styles.removeText}>
            Remove
          </Text>
        </TouchableOpacity>

        <Text category="s1" style={styles.totalPrice}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const themedStyles = StyleSheet.create({
  cartItem: {
    backgroundColor: 'background-basic-color-1',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'border-basic-color-4',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontFamily: 'Inter-Medium',
    color: 'text-basic-color',
    marginBottom: 2,
  },
  itemPrice: {
    color: 'text-primary-color',
    fontFamily: 'Inter-SemiBold',
  },
  customizationContainer: {
    marginVertical: 8,
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
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'background-basic-color-2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'border-basic-color-4',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  quantity: {
    width: 32,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'text-basic-color',
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeText: {
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'text-hint-color',
  },
});
