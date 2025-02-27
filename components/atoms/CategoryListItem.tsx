import { Pressable, StyleSheet, Text } from 'react-native';
import { useProductContext } from '@/context/ProductContext';
export default function CategoryListItem(props: { category: ProductCategory }) {
  const { category } = props;
  const { selectedCategory, setSelectedCategory } = useProductContext();
  return (
    <Pressable
      style={[
        styles.categoryButton,
        selectedCategory === category.PK && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(category.PK)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category.PK && styles.categoryButtonTextActive,
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
    backgroundColor: '#F2F2F7',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
});
