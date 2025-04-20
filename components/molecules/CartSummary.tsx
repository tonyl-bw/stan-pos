import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowRight, Trash } from 'lucide-react-native';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { useCart } from '@/context/CartContext';

interface CartSummaryProps {
  onCheckout: () => void;
  onClearCart: () => void;
}

export default function CartSummary({
  onCheckout,
  onClearCart,
}: CartSummaryProps) {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles) as any;
  const { cartTotal } = useCart();

  const tax = useMemo(() => {
    return cartTotal * 0.15;
  }, [cartTotal]);

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>

        {/* <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View> */}

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (15%)</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${cartTotal.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={onClearCart}>
          <Trash size={16} color={theme['color-danger-600']} />
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
          <ArrowRight size={16} color={theme['text-control-color']} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'text-basic-color',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'text-basic-color',
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'text-basic-color',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'color-basic-300',
  },
  totalLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'text-basic-color',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'color-primary-600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'color-danger-600',
  },
  clearButtonText: {
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'color-danger-600',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'color-primary-600',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 12,
  },
  checkoutButtonText: {
    marginRight: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'text-control-color',
  },
});
