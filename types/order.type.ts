// Order model
interface Order {
  PK: string; // ORDER#{orderId}
  SK: string; // METADATA
  orderId: string;
  customerId?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  tip?: number;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string; // ISO date
  completedAt?: string; // ISO date
  deliveryMethod: 'in-store' | 'take-away' | 'delivery';
  paymentMethod: 'cash' | 'credit' | 'debit' | 'mobile';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  tableNumber?: string;
  employeeId: string; // cashier who took the order
  notes?: string;
  GSI1PK?: string; // ORDER#STATUS#{status}
  GSI1SK?: string; // createdAt
  GSI2PK?: string; // ORDER#DATE#{dateOnly}
  GSI2SK?: string; // createdAt
}

// Order item model
interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  notes?: string;
  customizations: OrderItemCustomization[];
}

// Order item customization model
interface OrderItemCustomization {
  inventoryId: string;
  name: string;
  action: 'add' | 'remove' | 'reduce' | 'increase';
  quantity?: number;
  additionalCost: number;
}

// Customer model
interface Customer {
  PK: string; // CUST#{customerId}
  SK: string; // METADATA
  customerId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  loyaltyPoints: number;
  visitCount: number;
  lastVisit: string; // ISO date
  totalSpent: number;
  notes?: string;
  GSI1PK?: string; // CUST#PHONE#{phone}
  GSI1SK?: string; // name
}
