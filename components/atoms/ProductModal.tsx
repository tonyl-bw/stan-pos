import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { X, Check, ShoppingCart } from 'lucide-react-native';
import { useProductContext } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

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

  // Snap points for the bottom sheet (defines how high it can expand)
  const snapPoints = useMemo(() => ['80%'], []);

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
      addToCart(selectedProduct, selectedIngredients);
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
        <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
        <Pressable style={styles.closeButton} onPress={closeProductModal}>
          <X size={24} color="#000000" />
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
                <Text style={styles.ingredientName}>
                  {ingredient.name}
                  {!ingredient.isOptional && ' *'}
                </Text>
                {ingredient.additionalCost > 0 && (
                  <Text style={styles.ingredientPrice}>
                    +${ingredient.additionalCost.toFixed(2)}
                  </Text>
                )}
              </View>
              {selectedIngredients.includes(ingredient.ingredientId) && (
                <Check size={20} color="#007AFF" />
              )}
            </Pressable>
          ))}
        </View>
      </BottomSheetScrollView>

      <View style={styles.modalFooter}>
        <Text style={styles.totalPrice}>
          Total: ${calculateTotalPrice().toFixed(2)}
        </Text>
        <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color="#FFFFFF" style={styles.cartIcon} />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
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
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  ingredientSelected: {
    backgroundColor: '#E1F0FF',
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    color: '#000000',
  },
  ingredientPrice: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
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
    color: '#000000',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cartIcon: {
    marginRight: 8,
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
