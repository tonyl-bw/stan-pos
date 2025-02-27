import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

// Mock data for orders
const ORDERS = [
  {
    id: '1',
    date: '2024-02-20',
    total: 14.97,
    items: [
      { name: 'Coffee', quantity: 2, price: 3.99 },
      { name: 'Sandwich', quantity: 1, price: 6.99 },
    ],
    status: 'Completed',
  },
  {
    id: '2',
    date: '2024-02-19',
    total: 21.97,
    items: [
      { name: 'Tea', quantity: 1, price: 2.99 },
      { name: 'Salad', quantity: 2, price: 8.99 },
    ],
    status: 'Completed',
  },
];

export default function OrdersScreen() {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </View>

      <View style={styles.orderItems}>
        {item.items.map((orderItem, index) => (
          <View key={index} style={styles.orderItemRow}>
            <Text style={styles.itemName}>
              {orderItem.quantity}x {orderItem.name}
            </Text>
            <Text style={styles.itemPrice}>
              ${(orderItem.price * orderItem.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.orderTotal}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={ORDERS}
        renderItem={renderOrderItem}
        estimatedItemSize={150}
        contentContainerStyle={styles.ordersList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  orderStatus: {
    fontSize: 14,
    color: '#34C759',
    fontWeight: '500',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
    gap: 8,
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    color: '#000000',
  },
  itemPrice: {
    fontSize: 14,
    color: '#8E8E93',
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
});
