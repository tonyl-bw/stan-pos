import { View } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

export function CartListEmpty() {
  const styles = useStyleSheet(themedStyles) as any;

  return (
    <View style={styles.container}>
      <Text category="s1" style={styles.title}>
        Your cart is empty
      </Text>
    </View>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    opacity: 0.5,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    color: 'text-hint-color',
  },
});
