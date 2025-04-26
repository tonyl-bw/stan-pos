import { SafeAreaView, View } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import Header from '@/components/layout/Header';
import OrderHistoryList from '@/components/organisms/OrderHistoryList';

export default function OrdersScreen() {
  const styles = useStyleSheet(themedStyles) as any;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.container}>
        <OrderHistoryList />
      </View>
    </SafeAreaView>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
});
