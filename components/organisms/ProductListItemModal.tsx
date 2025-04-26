import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useProductContext } from '@/context/ProductContext';
import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import { useCart } from '@/context/CartContext';

export default function ProductListItemModal() {
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles) as any;

  const {
    selectedProduct,
    selectedIngredients,
    handleIngredientToggle,
    calculateTotalPrice,
    closeProductModal,
    visible,
    handleCloseModal,
  } = useProductContext();

  const { addToCart } = useCart();

  // Handle add to cart action
  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, selectedIngredients);
      closeProductModal();
      handleCloseModal();
    }
  };

  if (!selectedProduct) return null;

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text category="h6" style={styles.modalTitle}>
              Customize Order
            </Text>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}
            >
              <X size={24} color={theme['text-basic-color']} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.productHeader}>
              {/* <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                resizeMode="cover"
              /> */}
              <View style={styles.productInfo}>
                <Text category="s1" style={styles.productName}>
                  {selectedProduct.name}
                </Text>
                <Text category="s1" style={styles.productPrice}>
                  ${selectedProduct.price.toFixed(2)}
                </Text>
                {selectedProduct.description && (
                  <Text category="p2" style={styles.productDescription}>
                    {selectedProduct.description}
                  </Text>
                )}
              </View>
            </View>

            {selectedProduct?.ingredients &&
              selectedProduct.ingredients.length > 0 && (
                <View style={styles.customizationSection}>
                  <View style={styles.customizationHeader}>
                    <Text style={styles.customizationTitle}>Customize</Text>
                  </View>

                  <View style={styles.optionsContainer}>
                    {selectedProduct.ingredients.map((ingredient) => (
                      <TouchableOpacity
                        key={ingredient.ingredientId}
                        style={[
                          styles.optionButton,
                          selectedIngredients.includes(
                            ingredient.ingredientId
                          ) && styles.optionButtonSelected,
                        ]}
                        onPress={() =>
                          handleIngredientToggle(ingredient.ingredientId)
                        }
                      >
                        <View style={styles.optionContent}>
                          <Text
                            style={[
                              styles.optionName,
                              selectedIngredients.includes(
                                ingredient.ingredientId
                              ) && styles.optionNameSelected,
                            ]}
                          >
                            {ingredient.name}{' '}
                            {ingredient.isOptional ? '' : ' *'}
                          </Text>
                          {ingredient.additionalCost > 0 && (
                            <Text
                              style={[
                                styles.optionPrice,
                                selectedIngredients.includes(
                                  ingredient.ingredientId
                                ) && styles.optionPriceSelected,
                              ]}
                            >
                              +${ingredient.additionalCost.toFixed(2)}
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  quantity <= 1 && styles.quantityButtonDisabled,
                ]}
                onPress={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Text
                  category="p1"
                  style={[
                    styles.quantityButtonText,
                    quantity <= 1 && styles.quantityButtonTextDisabled,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>

              <Text category="p1" style={styles.quantityText}>
                {quantity}
              </Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
            >
              <Text category="s1" style={styles.addButtonText}>
                Add to Order • ${calculateTotalPrice().toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const themedStyles = StyleService.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '70%',
    maxWidth: 600,
    maxHeight: '80%',
    backgroundColor: 'background-basic-color-1',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'border-basic-color-4',
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    maxHeight: 500,
  },
  productHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'border-basic-color-4',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'background-basic-color-4',
  },
  productInfo: {
    flex: 1,
    // marginLeft: 16,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  productPrice: {
    fontFamily: 'Inter-SemiBold',
    // fontSize: 16,
    // color: Colors.primary[600],
    marginBottom: 8,
  },
  productDescription: {
    fontFamily: 'Inter-Regular',
    // fontSize: 14,
    // color: Colors.gray[600],
  },
  customizationSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'border-basic-color-4',
  },
  customizationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customizationTitle: {
    fontFamily: 'Inter-Medium',
    // fontSize: 16,
    // color: Colors.gray[800],
  },
  requiredBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'color-danger-500',
    borderRadius: 4,
    // color: 'error-basic-color-6',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    margin: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'border-basic-color-4',
    backgroundColor: 'background-basic-color-1',
  },
  optionButtonSelected: {
    borderColor: 'color-primary-600',
    backgroundColor: 'color-primary-100',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    // color: Colors.gray[700],
  },
  optionNameSelected: {
    // color: Colors.primary[700],
  },
  optionPrice: {
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    // color: Colors.gray[600],
  },
  optionPriceSelected: {
    // color: Colors.primary[600],
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'border-basic-color-4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: 'background-basic-color-4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: 'color-basic-transparent-disabled',
  },
  quantityButtonText: {
    fontFamily: 'Inter-Bold',
  },
  quantityButtonTextDisabled: {
    color: 'text-disabled-color',
  },
  quantityText: {
    width: 32,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
  addButton: {
    flex: 1,
    backgroundColor: 'color-primary-600',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: 'background-basic-color-1',
  },
});
