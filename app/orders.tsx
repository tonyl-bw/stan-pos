import { SafeAreaView, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { StyleService, useStyleSheet, Text } from '@ui-kitten/components';
import { OrderStatusBadge } from '@/components/atoms/OrderStatusBadge';
import Header from '@/components/layout/Header';
import OrderHistoryItem from '@/components/molecules/OrderHistoryItem';
import OrderHistoryList from '@/components/organisms/OrderHistoryList';

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
  const styles = useStyleSheet(themedStyles) as any;
  const colNum = 4;
  const gap = 16;
  const renderOrderItem = ({ item, index }: { item: any; index: number }) => (
    <View
      style={[
        styles.orderCard,
        {
          marginLeft: index % colNum === 0 ? gap : 0,
          marginRight: index % 1 === 0 ? gap : 0,
          marginBottom: index % 1 === 0 ? gap : 0,
          marginTop: index < colNum ? gap : 0,
        },
      ]}
    >
      <View style={styles.orderHeader}>
        <Text category="label" style={styles.orderDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <OrderStatusBadge status={item.status.toLowerCase()} />
      </View>

      <View style={styles.orderItems}>
        {item.items.map((orderItem: any, index: number) => (
          <View key={index} style={styles.orderItemRow}>
            <Text category="p1">
              {orderItem.quantity}x {orderItem.name}
            </Text>
            <Text category="p1">
              ${(orderItem.price * orderItem.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.orderTotal}>
        <Text category="s1">Total</Text>
        <Text category="s1">${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.container}>
        <OrderHistoryList />
        {/* <FlashList
          data={ORDERS}
          renderItem={renderOrderItem}
          estimatedItemSize={150}
          contentContainerStyle={styles.ordersList}
          numColumns={4}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    flexGrow: 1,
    backgroundColor: 'background-basic-color-1',
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
    // color: 'color-basic-default',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: 'color-basic-default',
    paddingTop: 12,
    gap: 8,
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'color-basic-default',
    paddingTop: 12,
  },
});
