import { Pressable, StyleSheet } from 'react-native';
import { useProductContext } from '@/context/ProductContext';
import { Text, useTheme } from '@ui-kitten/components';

export default function CategoryListItem(props: { category: ProductCategory }) {
  const { category } = props;
  const { selectedCategory, setSelectedCategory } = useProductContext();
  const theme = useTheme();
  return (
    <Pressable
      style={[
        styles.categoryButton,
        selectedCategory === category.PK
          ? {
              backgroundColor: theme['background-basic-color-4'],
            }
          : {
              backgroundColor: theme['background-basic-color-2'],
            },
      ]}
      onPress={() => setSelectedCategory(category.PK)}
    >
      <Text
        category="c2"
        style={[
          selectedCategory === category.PK
            ? { color: theme['text-basic-color'] }
            : { color: theme['text-hint-color'] },
        ]}
      >
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 16,
  },
});
