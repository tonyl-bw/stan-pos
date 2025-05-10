import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Platform } from 'react-native';
import { X } from 'lucide-react-native';
import { StyleService, useTheme, useStyleSheet, Text, Input } from '@ui-kitten/components';
import { CHECKOUT_PAYMENT_METHODS } from '@/constant/checkout.constant';
import { PaymentMethod } from '@/types/cart.type';
import OptionSelectionItem from '../molecules/OptionSelectionItem';

interface SplitBillModalProps {
  visible: boolean;
  onClose: () => void;
  onAddPayment: (payment: { method: PaymentMethod; amount: number }) => void;
  remainingAmount: number;
  totalAmount: number;
}

export default function SplitBillModal({
  visible,
  onClose,
  onAddPayment,
  remainingAmount,
  totalAmount,
}: SplitBillModalProps) {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles) as any;
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);

  const handleAddPayment = () => {
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0 || paymentAmount > remainingAmount) {
      return;
    }

    onAddPayment({
      method: paymentMethod,
      amount: paymentAmount,
    });

    // Reset form
    setAmount('');
    setPaymentMethod(PaymentMethod.CASH);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Split Bill</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme['text-basic-color']} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.amountInfo}>
              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Total Amount</Text>
                <Text style={styles.amountValue}>${totalAmount.toFixed(2)}</Text>
              </View>
              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Remaining</Text>
                <Text style={styles.remainingValue}>${remainingAmount.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Payment Amount</Text>
              <View style={styles.inputWrapper}>
                <Input
                  style={{ flex: 1 }}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                  placeholder="Enter amount"
                  placeholderTextColor={theme['text-hint-color']}
                  inputMode="decimal"
                />
                <TouchableOpacity style={styles.inputCurrency} onPress={() => setAmount(remainingAmount.toString())}>
                  <View>
                    <Text style={styles.inputCurrencyText} category="label">
                      max
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Method */}
            <View style={styles.methodContainer}>
              <Text style={styles.methodTitle}>Payment Method</Text>
              <View style={styles.methodOptions}>
                {CHECKOUT_PAYMENT_METHODS.options.map((option) => (
                  <OptionSelectionItem
                    key={option.id}
                    option={option}
                    selectedOption={paymentMethod}
                    onOptionSelect={(option) => setPaymentMethod(option as unknown as PaymentMethod)}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddPayment}>
              <Text style={styles.addButtonText}>Add Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const themedStyles = StyleService.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: 'background-basic-color-1',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'border-basic-color-4',
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'text-basic-color',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 16,
  },
  amountInfo: {
    backgroundColor: 'background-basic-color-1',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 24,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amountLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'text-hint-color',
  },
  amountValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'text-basic-color',
  },
  remainingValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'text-primary-color',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'text-hint-color',
    marginBottom: 8,
  },
  methodContainer: {
    marginBottom: 24,
  },
  methodTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'text-hint-color',
    marginBottom: 12,
  },
  methodOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
  },
  addButton: {
    backgroundColor: 'text-primary-color',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'text-control-color',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCurrency: {
    position: 'absolute',
    right: 4,
    padding: 8,
    borderRadius: 8,
    // backgroundColor: 'background-basic-color-1',
  },
  inputCurrencyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'text-primary-color',
  },
});
