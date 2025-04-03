import React, { useMemo } from 'react';
import { View, Pressable } from 'react-native';
import { X, Check } from 'lucide-react-native';
import { useProductContext } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  Text,
} from '@ui-kitten/components';
import Button from '../ui/Button';

export default function ProductModal() {
  const {
    selectedProduct,
    selectedIngredients,
    handleIngredientToggle,
    calculateTotalPrice,
    closeProductModal,
    bottomSheetModalRef,
  } = useProductContext();

  const { addToCart } = useCart();
  const styles = useStyleSheet(themedStyles) as any;
  const theme = useTheme();
  // Snap points for the bottom sheet (defines how high it can expand)
  const snapPoints = useMemo(() => ['100%'], []);

  // Render backdrop component
  const renderBackdrop = useMemo(
    () => (props: any) =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
    []
  );

  // Handle add to cart action
  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(
        {
          ...selectedProduct,
          price: calculateTotalPrice(),
        },
        selectedIngredients
      );
      closeProductModal();
    }
  };

  // If no product is selected, don't render anything
  if (!selectedProduct) return null;

  return (
    <BottomSheet
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.bottomSheetBackground}
    >
      <View style={styles.modalHeader}>
        <Text category="h6">{selectedProduct.name}</Text>
        <Pressable style={styles.closeButton} onPress={closeProductModal}>
          <X size={24} color={theme['color-basic-default']} />
        </Pressable>
      </View>

      <BottomSheetScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.ingredientsList}>
          {selectedProduct.ingredients.map((ingredient) => (
            <Pressable
              key={ingredient.ingredientId}
              style={[
                styles.ingredientItem,
                selectedIngredients.includes(ingredient.ingredientId) &&
                  styles.ingredientSelected,
              ]}
              onPress={() => handleIngredientToggle(ingredient.ingredientId)}
              disabled={!ingredient.isOptional}
            >
              <View style={styles.ingredientInfo}>
                <Text
                  category="s1"
                  style={[
                    styles.ingredientName,
                    selectedIngredients.includes(ingredient.ingredientId) &&
                      styles.ingredientNameSelected,
                  ]}
                >
                  {ingredient.name}
                  {ingredient.isOptional ? '' : ' *'}
                </Text>
                {ingredient.additionalCost > 0 && (
                  <Text
                    category="c1"
                    style={[
                      styles.ingredientPrice,
                      selectedIngredients.includes(ingredient.ingredientId) &&
                        styles.ingredientPriceSelected,
                    ]}
                  >
                    +${ingredient.additionalCost.toFixed(2)}
                  </Text>
                )}
              </View>
              {selectedIngredients.includes(ingredient.ingredientId) && (
                <Check size={20} color="#FFFFFF" />
              )}
            </Pressable>
          ))}
        </View>
      </BottomSheetScrollView>

      <View style={styles.modalFooter}>
        <Text style={styles.totalPrice}>
          Total: ${calculateTotalPrice().toFixed(2)}
        </Text>
        <Button size="large" onPress={handleAddToCart}>
          Add to Cart
        </Button>
      </View>
    </BottomSheet>
  );
}

const themedStyles = StyleService.create({
  bottomSheetBackground: {
    backgroundColor: 'background-basic-color-3',
  },
  indicator: {
    backgroundColor: '#CCCCCC',
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'color-basic-default',
  },
  closeButton: {
    padding: 8,
  },
  ingredientsList: {
    gap: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'color-primary-100',
    borderRadius: 12,
  },
  ingredientSelected: {
    backgroundColor: 'color-primary-500',
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    color: 'color-basic-900',
  },
  ingredientNameSelected: {
    color: 'color-basic-default',
  },
  ingredientPrice: {
    color: 'color-basic-900',
    marginTop: 2,
  },
  ingredientPriceSelected: {
    color: 'color-basic-default',
  },
  modalFooter: {
    marginTop: 20,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: 'color-basic-default',
    marginBottom: 16,
  },
});
