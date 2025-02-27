import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { useCart } from '@/context/CartContext';

export default function CartPaymentMethod() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'cash' | 'card'
  >('cash');
  const { checkoutInProgress } = useCart();
  const paymentMethods = ['cash', 'card'];
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.optionButtonsContainer}>
        {paymentMethods.map((method) => (
          <Pressable
            key={method}
            style={[
              styles.optionButton,
              styles.optionButton,
              selectedPaymentMethod === method && styles.selectedOption,
            ]}
            onPress={() => setSelectedPaymentMethod(method as 'cash' | 'card')}
            disabled={checkoutInProgress}
          >
            <Text
              style={[
                styles.optionText,
                selectedPaymentMethod === method && styles.selectedOptionText,
              ]}
            >
              {method}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  optionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedOption: {
    backgroundColor: '#E1F0FF',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedOptionText: {
    fontWeight: '600',
    color: '#007AFF',
  },
});
