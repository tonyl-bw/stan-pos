import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';

export type OrderStatus =
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return theme['color-warning-500'];
      case 'preparing':
        return theme['color-info-500'];
      case 'ready':
        return theme['color-success-500'];
      case 'completed':
        return theme['color-primary-500'];
      case 'cancelled':
        return theme['color-danger-500'];
      default:
        return theme['color-basic-500'];
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <View style={[styles.container as ViewStyle, { backgroundColor: getStatusColor(status) }]}>
      <Text style={styles.text as TextStyle}>{getStatusText(status)}</Text>
    </View>
  );
}

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    color: 'text-control-color',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
