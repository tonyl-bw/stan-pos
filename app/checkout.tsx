import { View, Text, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import {
  CHECKOUT_DELIVERY_METHODS,
  CHECKOUT_PAYMENT_METHODS,
  DEFAULT_DELIVERY_METHOD,
  DEFAULT_PAYMENT_METHOD,
} from '@/constant/checkout.constant';
import { OptionSection } from '@/components/molecules/OptionSelection';
import { useCart } from '@/context/CartContext';
import { useStyleSheet, StyleService } from '@ui-kitten/components';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';

export default function CheckoutScreen() {
  const styles = useStyleSheet(themedStyles) as any;
  const [paymentMethod, setPaymentMethod] = useState(DEFAULT_PAYMENT_METHOD);
  const [deliveryMethod, setDeliveryMethod] = useState(DEFAULT_DELIVERY_METHOD);

  const { cartTotal } = useCart();

  const handleConfirmOrder = () => {
    if (!paymentMethod || !deliveryMethod) {
      // Show error state if methods aren't selected
      return;
    }
    // Handle order confirmation
    router.replace('/(tabs)/orders');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        onCartPress={() => {}}
        onMenuToggle={() => {}}
        onNavigate={() => {}}
      />
      <View style={styles.container}>
        {/* Payment Method */}
        <OptionSection
          title={CHECKOUT_PAYMENT_METHODS.title}
          options={CHECKOUT_PAYMENT_METHODS.options}
          selectedOption={paymentMethod}
          onOptionSelect={setPaymentMethod}
        />

        {/* Delivery Method */}
        <OptionSection
          title={CHECKOUT_DELIVERY_METHODS.title}
          options={CHECKOUT_DELIVERY_METHODS.options}
          selectedOption={deliveryMethod}
          onOptionSelect={setDeliveryMethod}
        />

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (15%)</Text>
            <Text style={styles.summaryValue}>
              ${(cartTotal * 0.15).toFixed(2)}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${cartTotal.toFixed(2)}</Text>
          </View>
        </View>

        <Button
          size="large"
          onPress={handleConfirmOrder}
          disabled={!paymentMethod || !deliveryMethod}
        >
          Confirm Order
        </Button>
      </View>
    </SafeAreaView>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-4',
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  summary: {
    backgroundColor: 'background-basic-color-1',
    borderRadius: 12,
    padding: 16,
    marginTop: 'auto',
    marginBottom: 24,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: 'text-hint-color',
  },
  summaryValue: {
    fontSize: 16,
    color: 'text-basic-color',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'text-basic-color',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'text-primary-color',
  },
  confirmButton: {
    backgroundColor: 'text-primary-color',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: 'text-hint-color',
  },
  confirmButtonText: {
    color: 'text-basic-color',
    fontSize: 18,
    fontWeight: '600',
  },
});
