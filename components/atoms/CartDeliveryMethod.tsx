import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';

export default function CartDeliveryMethodSelection() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    'dine-in' | 'takeout' | 'delivery'
  >('dine-in');
  const { checkoutInProgress } = useCart();
  const deliveryMethods = ['dine-in', 'takeout', 'delivery'];
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Delivery Method</Text>
      <View style={styles.optionButtonsContainer}>
        {deliveryMethods.map((method) => (
          <Pressable
            key={method}
            style={[
              styles.optionButton,
              selectedDeliveryMethod === method && styles.selectedOption,
            ]}
            onPress={() =>
              setSelectedDeliveryMethod(
                method as 'dine-in' | 'takeout' | 'delivery'
              )
            }
            disabled={checkoutInProgress}
          >
            <Text
              style={[
                styles.optionText,
                selectedDeliveryMethod === method && styles.selectedOptionText,
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
    marginTop: 16,
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
