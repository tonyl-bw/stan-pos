import { Pressable, StyleSheet } from 'react-native';
import { useProductContext } from '@/context/ProductContext';
import { Text, useStyleSheet } from '@ui-kitten/components';

export default function CategoryListItem(props: { category: ProductCategory }) {
  const { category } = props;
  const { selectedCategory, setSelectedCategory } = useProductContext();
  const styles = useStyleSheet(themedStyles) as any;
  return (
    <Pressable
      style={[
        styles.categoryButton,
        selectedCategory === category.PK
          ? styles.categoryButtonActive
          : styles.categoryButtonInactive,
      ]}
      onPress={() => setSelectedCategory(category.PK)}
    >
      <Text
        category="c2"
        style={[
          selectedCategory === category.PK
            ? styles.categoryButtonTextActive
            : styles.categoryButtonTextInactive,
        ]}
      >
        {category.name}
      </Text>
    </Pressable>
  );
}

const themedStyles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 16,
  },
  categoryButtonActive: {
    backgroundColor: 'background-basic-color-1',
  },
  categoryButtonInactive: {
    backgroundColor: 'background-basic-color-2',
  },
  categoryButtonTextActive: {
    color: 'text-basic-color',
  },
  categoryButtonTextInactive: {
    color: 'text-hint-color',
  },
});
