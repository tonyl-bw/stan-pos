import { CreditCard, ShoppingBag, UtensilsCrossed, Wallet } from "lucide-react-native";

const DEFAULT_DELIVERY_METHOD = 'dine-in';
const DEFAULT_PAYMENT_METHOD = 'card';
const CHECKOUT_PAYMENT_METHODS =
  {
    title: 'Payment Method',
    options: [
      { id: 'card', label: 'Card', icon: CreditCard },
    { id: 'cash', label: 'Cash', icon: Wallet },
  ],
};

const CHECKOUT_DELIVERY_METHODS =
  {
    title: 'Delivery Method',
    options: [
      { id: 'dine-in', label: 'Dine In', icon: UtensilsCrossed },
      { id: 'takeaway', label: 'Takeaway', icon: ShoppingBag },
    ],
  }


export {
  DEFAULT_DELIVERY_METHOD,
  DEFAULT_PAYMENT_METHOD,
  CHECKOUT_PAYMENT_METHODS,
  CHECKOUT_DELIVERY_METHODS,
};