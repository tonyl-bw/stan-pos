import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import {
  Card,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import { ArrowLeft, Clock, Printer, Receipt, UtensilsCrossed } from 'lucide-react-native';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';
const mockOrder = {
  id: '1234567890',
  timestamp: new Date().toISOString().toLocaleString(),
  total: 100,
  items: [
    { id: '1', name: 'Item 1', quantity: 2, price: 50 },
    { id: '2', name: 'Item 2', quantity: 1, price: 30 },
  ],
};

export default function CheckoutCompleteScreen() {
  const styles = useStyleSheet(themedStyles) as any;
  const theme = useTheme();

  const { cartItems, paymentMethod, deliveryMethod, cartTotal } = useCart();

  const handleBackToSales = () => {
    router.navigate('/sell');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text category="h5" style={styles.title}>
            Order Summary
          </Text>
          <Text category="p1" style={styles.orderId}>
            Order #{mockOrder.id}
          </Text>
          <View style={styles.timestamp}>
            <Clock size={16} color={theme['color-basic-700']} />
            <Text style={styles.timestampText}>
              {new Date(mockOrder.timestamp).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Order Details */}
          <Card>
            <Text category="s1" style={styles.cardTitle}>
              Order Details
            </Text>
            <View style={styles.orderItems}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.orderItem}>
                  <View style={styles.orderItemInfo}>
                    <View style={styles.orderItemQuantity}>
                      <Text category="p1">{item.quantity}x</Text>
                    </View>
                    <View>
                      <Text category="s1">{item.name}</Text>
                      {item.customizations.length > 0 && (
                        <View style={styles.orderItemCustomizations}>
                          {item.customizations.map((customization) => (
                            <Text
                              category="p2"
                              style={styles.orderItemCustomization}
                              key={customization.ingredientId}
                            >
                              {customization.name}
                            </Text>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                  <Text category="s1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Payment Details */}
          <Card>
            <Text category="s1" style={styles.cardTitle}>
              Payment Details
            </Text>
            <View>
              <View style={styles.paymentDetailsContainer}>
                <View style={styles.paymentMethodContainer}>
                  <Receipt size={20} color={theme['color-basic-700']} />
                  <Text category="s2">Paid by {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</Text>
                </View>
                <View style={styles.paymentMethodContainer}>
                  <UtensilsCrossed size={20} color={theme['color-basic-700']} />
                  <Text category="s2">Type: {deliveryMethod.charAt(0).toUpperCase() + deliveryMethod.slice(1)}</Text>
                </View>
              </View>
              <View style={styles.totalAmountContainer}>
                <Text category="s1" style={styles.totalAmountLabel}>
                  Total
                </Text>
                <Text category="s1" style={styles.totalAmount}>
                  ${cartTotal.toFixed(2)}
                </Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          style={styles.footerButton}
          onPress={handleBackToSales}
          status="basic"
          size="large"
          accessoryLeft={
            <ArrowLeft size={16} color={theme['color-basic-700']} />
          }
        >
          Back to Sales
        </Button>
        <Button
          style={styles.footerButton}
          size="large"
          accessoryLeft={
            <Printer size={16} color={theme['text-control-color']} />
          }
        >
          Print Receipt
        </Button>
      </View>
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
    padding: 16,
  },
  header: {
    marginBottom: 24,
    gap: 8,
    paddingHorizontal: 16,
  },
  body: {
    gap: 16,
  },
  timestamp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timestampText: {
    color: 'color-basic-700',
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'background-basic-color-1',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
  },
  footerButton: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    paddingBottom: 20,
  },
  orderItems: {
    gap: 8,
  },
  orderItem: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  orderItemInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  orderItemQuantity: {
    marginRight: 8,
  },
  orderItemCustomizations: {
    gap: 4,
    marginTop: 8,
  },
  orderItemCustomization: {
    color: 'color-basic-700',
  },
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
    paddingTop: 16,
    marginTop: 16,
  },
  totalAmountLabel: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 18,
    color: 'text-primary-color',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentDetailsContainer: {
    gap: 8,
  },
});
