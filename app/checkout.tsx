import { View, SafeAreaView, Platform } from 'react-native';
import { router } from 'expo-router';
import { CHECKOUT_DELIVERY_METHODS, CHECKOUT_PAYMENT_METHODS } from '@/constant/checkout.constant';
import { OptionSection } from '@/components/organisms/OptionSelection';
import { useCart } from '@/context/CartContext';
import { useStyleSheet, StyleService, useTheme, Text } from '@ui-kitten/components';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import { ArrowRight, Split, Receipt } from 'lucide-react-native';
import SummaryLabel from '@/components/atoms/SummaryLabel';
import { PaymentMethod } from '@/types/cart.type';
import { DeliveryMethod } from '@/types/cart.type';
import { useState } from 'react';
import SplitBillModal from '@/components/organisms/SplitBillModal';

export default function CheckoutScreen() {
  const styles = useStyleSheet(themedStyles) as any;
  const theme = useTheme();
  const [splitBillModalVisible, setSplitBillModalVisible] = useState(false);
  const {
    cartTotal,
    paymentMethods,
    handleOnPaymentMethodChange,
    deliveryMethod,
    setDeliveryMethod,
    isSplitBill,
    splitBillPayments,
    addSplitBillPayment,
    remainingAmount,
  } = useCart();

  const handleConfirmOrder = () => {
    if (paymentMethods.length === 0 || !deliveryMethod) {
      // Show error state if methods aren't selected
      return;
    }

    // Handle order confirmation
    router.replace('/checkout-complete');
  };

  const handleAddSplitBillPayment = (payment: { method: PaymentMethod; amount: number }) => {
    addSplitBillPayment(payment);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        {/* Payment Method */}
        <OptionSection
          title={CHECKOUT_PAYMENT_METHODS.title}
          options={CHECKOUT_PAYMENT_METHODS.options}
          selectedOption={paymentMethods[0] as any}
          onOptionSelect={(option) => handleOnPaymentMethodChange(option as unknown as PaymentMethod)}
        />

        {/* Delivery Method */}
        <OptionSection
          title={CHECKOUT_DELIVERY_METHODS.title}
          options={CHECKOUT_DELIVERY_METHODS.options}
          selectedOption={deliveryMethod as any}
          onOptionSelect={(option) => setDeliveryMethod(option as unknown as DeliveryMethod)}
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
          {isSplitBill && splitBillPayments.length > 0 && (
            <View style={styles.splitBillPayments}>
              <Text category="s2" style={styles.splitBillTitle}>Split Bill Payments</Text>
              {splitBillPayments.map((payment, index) => (
                <View key={index} style={styles.splitBillPayment}>
                  <View style={styles.splitBillPaymentInfo}>
                    <Receipt size={16} color={theme['color-basic-700']} />
                    <Text category="s2">{payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}</Text>
                  </View>
                  <Text category="s2">${payment.amount.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text category="s1" style={styles.totalLabel}>
              {isSplitBill ? 'Remaining' : 'Total'}
            </Text>
            <Text category="s1" style={styles.totalValue}>
              ${remainingAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          status="danger"
          appearance="outline"
          style={{ flex: 1 }}
          onPress={() => setSplitBillModalVisible(true)}
          accessoryLeft={() => <Split size={20} color={theme['color-danger-500']} />}
        >
          Split Bill
        </Button>
        <Button
          style={{ flex: 2 }}
          onPress={handleConfirmOrder}
          disabled={paymentMethods.length === 0 || !deliveryMethod || (isSplitBill && remainingAmount > 0)}
          accessoryRight={() => <ArrowRight size={20} color={theme['text-alternate-color']} />}
        >
          Confirm Order
        </Button>
      </View>
      <SplitBillModal
        visible={splitBillModalVisible}
        onClose={() => setSplitBillModalVisible(false)}
        onAddPayment={handleAddSplitBillPayment}
        remainingAmount={remainingAmount}
        totalAmount={cartTotal}
      />
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
  splitBillPayments: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
    gap: 8,
  },
  splitBillTitle: {
    color: 'text-hint-color',
    marginBottom: 4,
  },
  splitBillPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  splitBillPaymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: 'background-basic-color-1',
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
    gap: 12,
    flexDirection: 'row',
  },
});
