import { View } from "react-native";

import { ScrollView } from 'react-native';
import OrderHistoryItem from '../molecules/OrderHistoryItem';
import { StyleService, useStyleSheet } from '@ui-kitten/components';

export default function OrderHistoryList() {
  const styles = useStyleSheet(themedStyles) as any;
  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <View style={styles.orderHistoryList}>
        {Array.from({ length: 10 }).map((_, index) => (
          <OrderHistoryItem key={index} />
        ))}
      </View>
    </ScrollView>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderHistoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
