import { View, SafeAreaView, Platform } from 'react-native';
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
import {
  useStyleSheet,
  StyleService,
  useTheme,
  Text,
} from '@ui-kitten/components';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import { ArrowRight } from 'lucide-react-native';
import SummaryLabel from '@/components/atoms/SummaryLabel';

export default function CheckoutScreen() {
  const styles = useStyleSheet(themedStyles) as any;
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState(DEFAULT_PAYMENT_METHOD);
  const [deliveryMethod, setDeliveryMethod] = useState(DEFAULT_DELIVERY_METHOD);

  const { cartTotal } = useCart();

  const handleConfirmOrder = () => {
    if (!paymentMethod || !deliveryMethod) {
      // Show error state if methods aren't selected
      return;
    }
    // Handle order confirmation
    router.replace('/orders');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
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
            <SummaryLabel label="Subtotal" />
            <Text category="s1">${cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <SummaryLabel label="Tax (15%)" />
            <Text category="s1">${(cartTotal * 0.15).toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text category="s1" style={styles.totalLabel}>
              Total
            </Text>
            <Text category="s1" style={styles.totalValue}>
              ${cartTotal.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          onPress={handleConfirmOrder}
          disabled={!paymentMethod || !deliveryMethod}
          accessoryRight={() => (
            <ArrowRight size={20} color={theme['text-alternate-color']} />
          )}
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
    backgroundColor: 'background-basic-color-2',
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
    ...Platform.select({
      web: {
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
    }),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  footer: {
    padding: 16,
    backgroundColor: 'background-basic-color-1',
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
  },
});
