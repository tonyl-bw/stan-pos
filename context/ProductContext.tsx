import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { MOCK_PRODUCTS } from '@/mock/product.mock';
import BottomSheet from '@gorhom/bottom-sheet';
import { useCart } from './CartContext';

// Define the context type
interface ProductContextType {
  // State
  selectedCategory: ProductCategory['PK'] | 'All';
  selectedProduct: Product | null;
  selectedIngredients: ProductIngredient['ingredientId'][];
  filteredProducts: Product[];
  bottomSheetModalRef: React.RefObject<BottomSheet>;
  searchQuery: string;

  // Functions
  setSelectedCategory: (category: ProductCategory['PK'] | 'All') => void;
  handleProductPress: (product: Product) => void;
  handleIngredientToggle: (ingredientId: string) => void;
  calculateTotalPrice: () => number;
  closeProductModal: () => void;
  setSearchQuery: (query: string) => void;
}

// Create the context with a default value
const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

// Context provider component
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { addToCart } = useCart();
  // Create a ref for the bottom sheet modal
  const bottomSheetModalRef = useRef<BottomSheet>(null);

  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory['PK'] | 'All'
  >('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<
    ProductIngredient['ingredientId'][]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    let products =
      selectedCategory === 'All'
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter((product) =>
            product.GSI1PK?.includes(selectedCategory)
          );

    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    return products;
  }, [selectedCategory, searchQuery]);

  // Handle product selection
  const handleProductPress = useCallback((product: Product) => {
    if (product.ingredients && product.ingredients.length > 0) {
      setSelectedProduct(product);
      setSelectedIngredients(
        product.ingredients
          .filter((ing) => ing.isOptional === false || ing.isDefault)
          .map((ing) => ing.ingredientId)
      );

      // Present the bottom sheet
      bottomSheetModalRef.current?.expand();
    } else {
      addToCart(product, selectedIngredients);
    }
  }, []);

  // Toggle ingredients
  const handleIngredientToggle = useCallback(
    (ingredientId: string) => {
      if (!selectedProduct || !selectedProduct.ingredients) return;
      const ingredient = selectedProduct.ingredients.find(
        (i) => i.ingredientId === ingredientId
      );
      if (!ingredient || !ingredient.isOptional) return;

      setSelectedIngredients((prev) =>
        prev.includes(ingredientId)
          ? prev.filter((id) => id !== ingredientId)
          : [...prev, ingredientId]
      );
    },
    [selectedProduct]
  );

  // Calculate total price
  const calculateTotalPrice = useCallback(() => {
    if (!selectedProduct) return 0;
    const ingredientsPrice = selectedProduct.ingredients
      .filter((ing) => selectedIngredients.includes(ing.ingredientId))
      .reduce((sum, ing) => sum + (ing.additionalCost || 0), 0);
    return selectedProduct.price + ingredientsPrice;
  }, [selectedProduct, selectedIngredients]);

  // Close product modal
  const closeProductModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const value = useMemo(
    () => ({
      selectedCategory,
      selectedProduct,
      selectedIngredients,
      filteredProducts,
      bottomSheetModalRef,
      setSelectedCategory,
      handleProductPress,
      handleIngredientToggle,
      calculateTotalPrice,
      closeProductModal,
      searchQuery,
      setSearchQuery,
    }),
    [
      selectedCategory,
      selectedProduct,
      selectedIngredients,
      filteredProducts,
      bottomSheetModalRef,
      searchQuery,
    ]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// Custom hook to use the product context
export const useProductContext = () => useContext(ProductContext);
