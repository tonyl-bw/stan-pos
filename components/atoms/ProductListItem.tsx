import { useProductContext } from '@/context/ProductContext';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { TouchableOpacity, View } from 'react-native';

interface ProductListItemProps {
  item: Product;
}

export default function ProductListItem({ item }: ProductListItemProps) {
  const { handleProductPress } = useProductContext();
  const styles = useStyleSheet(themedStyles) as any;
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productInfo}>
        <Text category="h6">{item.name}</Text>
        <Text category="s1" style={styles.productPrice}>
          ${item.price.toFixed(2)}
        </Text>
        {item.description && (
          <Text category="c1" style={styles.productDescription}>
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const themedStyles = StyleService.create({
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'background-basic-color-1',
    borderWidth: 1,
    borderColor: 'border-basic-color-4',
  },
  productInfo: {
    gap: 4,
  },
  productPrice: {
    color: 'text-primary-color',
  },
  productDescription: {
    color: 'text-hint-color',
  },
});
