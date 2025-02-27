import { View, StyleSheet } from 'react-native';
import React from 'react';
import CartList from '@/components/molecules/CartList';
import CartDeliveryMethodSelection from '@/components/atoms/CartDeliveryMethod';
import CartPaymentMethod from '@/components/atoms/CartPaymentMethod';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <CartList />
      <CartDeliveryMethodSelection />
      <CartPaymentMethod />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
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
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  itemPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
