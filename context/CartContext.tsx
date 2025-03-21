import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for cart items
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  customizations: CartItemCustomization[];
  notes?: string;
}

export interface CartItemCustomization {
  ingredientId: string;
  name: string;
  action: 'add' | 'remove' | 'reduce' | 'increase';
  quantity?: number;
  additionalCost: number;
}

// Define the cart context type
interface CartContextType {
  // State
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartEmpty: boolean;
  checkoutInProgress: boolean;
  isLoading: boolean;

  // Actions
  addToCart: (
    product: Product,
    customizations: ProductIngredient['ingredientId'][],
    notes?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  clearCart: () => Promise<void>;

  // Checkout
  checkout: (deliveryMethod: string, paymentMethod: string) => Promise<void>;
}

// Create the context
const CartContext = createContext<CartContextType>({} as CartContextType);

// Context provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate derived values
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.subtotal, 0);
  const isCartEmpty = cartItems.length === 0;

  // Load cart from AsyncStorage on initial load
  useEffect(() => {
    const loadCart = async () => {
      try {
        setIsLoading(true);
        const savedCart = await AsyncStorage.getItem('restaurantPosCart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage when it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(
          'restaurantPosCart',
          JSON.stringify(cartItems)
        );
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    };

    // Only save if the cart has been initially loaded
    if (!isLoading) {
      saveCart();
    }
  }, [cartItems, isLoading]);

  // Helper to calculate the price of customizations
  const calculateCustomizationsPrice = (
    product: Product,
    selectedIngredients: ProductIngredient['ingredientId'][]
  ) => {
    if (!product.ingredients) return 0;

    let customizationPrice = 0;

    // Check each product ingredient
    product.ingredients.forEach((ingredient) => {
      const isSelected = selectedIngredients.includes(ingredient.ingredientId);

      // If the ingredient is optional and selected, and has additional cost
      if (
        ingredient.isOptional &&
        isSelected &&
        ingredient.additionalCost > 0
      ) {
        // If ingredient isn't default but is selected, add its cost
        if (!ingredient.isDefault) {
          customizationPrice += ingredient.additionalCost;
        }
      }

      // If ingredient is default but not selected (removed), we don't add its cost
    });

    return customizationPrice;
  };

  // Transform selected ingredients into customization objects
  const createCustomizationsFromSelectedIngredients = (
    product: Product,
    selectedIngredients: ProductIngredient['ingredientId'][]
  ): CartItemCustomization[] => {
    if (!product.ingredients) return [];

    const customizations: CartItemCustomization[] = [];

    product.ingredients.forEach((ingredient) => {
      const isSelected = selectedIngredients.includes(ingredient.ingredientId);

      // Handle default ingredients that were removed
      if (ingredient.isDefault && !isSelected) {
        customizations.push({
          ingredientId: ingredient.ingredientId,
          name: ingredient.name,
          action: 'remove',
          additionalCost: 0,
        });
      }

      // Handle non-default ingredients that were added
      if (!ingredient.isDefault && isSelected) {
        customizations.push({
          ingredientId: ingredient.ingredientId,
          name: ingredient.name,
          action: 'add',
          additionalCost: ingredient.additionalCost,
        });
      }
    });

    return customizations;
  };

  // Add a product to cart
  const addToCart = useCallback(
    (
      product: Product,
      selectedIngredients: ProductIngredient['ingredientId'][],
      notes?: string
    ) => {
      const customizations = createCustomizationsFromSelectedIngredients(
        product,
        selectedIngredients
      );

      const customizationPrice = calculateCustomizationsPrice(
        product,
        selectedIngredients
      );
      const itemPrice = product.price + customizationPrice;

      // Create a unique ID for this cart item based on product and customizations
      const customizationKey =
        customizations.length > 0
          ? '-' +
            customizations.map((c) => `${c.ingredientId}:${c.action}`).join('-')
          : '';

      const itemId = `${product.productId}${customizationKey}${
        notes ? '-' + notes : ''
      }`;

      setCartItems((prevItems) => {
        // Check if this exact item is already in the cart
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === itemId
        );

        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedItems = [...prevItems];
          const existingItem = updatedItems[existingItemIndex];

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
            subtotal: (existingItem.quantity + 1) * itemPrice,
          };

          return updatedItems;
        } else {
          // Add new item
          return [
            ...prevItems,
            {
              id: itemId,
              productId: product.productId,
              name: product.name,
              price: itemPrice,
              quantity: 1,
              subtotal: itemPrice,
              customizations,
              notes,
            },
          ];
        }
      });
    },
    []
  );

  // Remove item from cart
  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== cartItemId)
    );
  }, []);

  // Increase item quantity
  const increaseQuantity = useCallback((cartItemId: string) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price,
          };
        }
        return item;
      });
    });
  }, []);

  // Decrease item quantity
  const decreaseQuantity = useCallback((cartItemId: string) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === cartItemId) {
            const newQuantity = Math.max(1, item.quantity - 1);
            return {
              ...item,
              quantity: newQuantity,
              subtotal: newQuantity * item.price,
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with 0 quantity
    });
  }, []);

  // Clear the cart
  const clearCart = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('restaurantPosCart');
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart from storage:', error);
    }
  }, []);

  // Process checkout
  const checkout = useCallback(
    async (deliveryMethod: string, paymentMethod: string) => {
      if (isCartEmpty) return;

      setCheckoutInProgress(true);

      try {
        // Here you would connect to your backend API to create an order
        // For now, we'll just simulate an API call with a timeout
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const order = {
          items: cartItems,
          total: cartTotal,
          deliveryMethod,
          paymentMethod,
          timestamp: new Date().toISOString(),
        };

        console.log('Order submitted:', order);

        // Clear the cart after successful checkout
        await clearCart();
        setCheckoutInProgress(false);
      } catch (error) {
        console.error('Checkout failed:', error);
        setCheckoutInProgress(false);
        throw error;
      }
    },
    [cartItems, cartTotal, clearCart, isCartEmpty]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartEmpty,
        checkoutInProgress,
        isLoading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
