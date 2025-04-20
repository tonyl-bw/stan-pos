import {
  CreditCard,
  Gift,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
  Wallet,
} from 'lucide-react-native';
import { DeliveryMethod, PaymentMethod } from '@/types/cart.type';
const DEFAULT_DELIVERY_METHOD = 'dine-in';
const DEFAULT_PAYMENT_METHOD = 'card';
const CHECKOUT_PAYMENT_METHODS = {
  title: 'Payment Method',
  options: [
    { id: PaymentMethod.CREDIT_CARD, label: 'Card', icon: CreditCard },
    { id: PaymentMethod.CASH, label: 'Cash', icon: Wallet },
    { id: PaymentMethod.GIFT_CARD, label: 'Gift Card', icon: Gift },
  ],
};

const CHECKOUT_DELIVERY_METHODS = {
  title: 'Delivery Method',
  options: [
    { id: DeliveryMethod.DINE_IN, label: 'Dine In', icon: UtensilsCrossed },
    { id: DeliveryMethod.TAKE_OUT, label: 'Takeaway', icon: ShoppingBag },
    { id: DeliveryMethod.DELIVERY, label: 'Delivery', icon: Truck },
  ],
};

export {
  DEFAULT_DELIVERY_METHOD,
  DEFAULT_PAYMENT_METHOD,
  CHECKOUT_PAYMENT_METHODS,
  CHECKOUT_DELIVERY_METHODS,
};
