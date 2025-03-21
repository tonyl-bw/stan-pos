import { View } from 'react-native';
import {
  Text,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import { ShoppingCart } from 'lucide-react-native';

export function CartListEmpty() {
  const styles = useStyleSheet(themedStyles) as any;
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ShoppingCart size={40} color={theme['color-basic-600']} />
      </View>
      <Text category="h6" style={styles.title}>
        Your cart is empty
      </Text>
      <Text category="p1" appearance="hint" style={styles.subtitle}>
        Add some items to start shopping
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
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
  },
});
