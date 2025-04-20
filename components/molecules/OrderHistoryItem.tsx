import { Card, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { View, useWindowDimensions } from 'react-native';
import { OrderStatusBadge } from '../atoms/OrderStatusBadge';

const BREAKPOINT = 1024;
const PADDING = 16;
const COLUMNS = {
  SMALL: 3,
  LARGE: 4,
} as const;

const calculateCardWidth = (width: number) => {
  const isSmallScreen = width <= BREAKPOINT;
  const columns = isSmallScreen ? COLUMNS.SMALL : COLUMNS.LARGE;
  const totalPadding = PADDING * 2; // Left and right padding
  const totalGap = PADDING * (columns - 1); // Gaps between columns
  return (width - totalPadding - totalGap) / columns;
};

export default function OrderHistoryItem() {
  const { width } = useWindowDimensions();
  const styles = useStyleSheet(themedStyles(width)) as any;
  
  const CardHeader = () => {
    return (
      <View style={styles.cardHeader}>
        <View>
          <Text category="h6">#1234567890</Text>
          <Text category="s2">Date: 2024-01-01</Text>
        </View>
        <OrderStatusBadge status="completed" />
      </View>
    );
  };

  const CardFooter = () => {
    return (
      <View style={styles.cardFooter}>
        <View style={styles.cardFooterItem}>
          <Text category="s1">Total:</Text>
          <Text category="s1">$100</Text>
        </View>
        <View style={styles.cardFooterItem}>
          <Text category="s1">Delivery Method:</Text>
          <Text category="s1">Dine In</Text>
        </View>
        <View style={styles.cardFooterItem}>
          <Text category="s1">Payment Method:</Text>
          <Text category="s1">Cash</Text>
        </View>
      </View>
    );
  };
  return (
    <Card header={CardHeader} footer={CardFooter} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardItem}>
          <View style={styles.cardItemContent}>
            <Text category="s1">1x</Text> 
            <Text category="s1">Pizza</Text>
          </View>
          <Text category="s1">$100</Text>
        </View>
      </View>
    </Card>
  );
}

const themedStyles = (width: number) => StyleService.create({
  card: {
    width: calculateCardWidth(width),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardFooter: {
    padding: 16,
    gap: 8,
  },
  cardFooterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
