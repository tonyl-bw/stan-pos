// TODO: Inventory template
export interface Inventory {
  PK: string; // INV#{inventoryId}
  SK: string; // METADATA
  inventoryId: string;
  name: string;
  category: string;
  currentQuantity: number;
  unitOfMeasurement: string;
  reorderThreshold: number;
  supplierInfo: {
    supplierId: string;
    name: string;
    contactInfo: string;
  };
  costPerUnit: number;
  lastRestockDate: string; // ISO date
  expiryDate?: string; // ISO date
  locationInStore?: string;
  status: 'in stock' | 'low' | 'out of stock';
  GSI1PK?: string; // INV#CATEGORY#{category}
  GSI1SK?: string; // name
}

// Product-Inventory relationship model
export interface ProductInventory {
  PK: string; // PROD#{productId}
  SK: string; // INV#{inventoryId}
  productId: string;
  inventoryId: string;
  quantityRequired: number;
  isOptional: boolean;
  isDefault: boolean;
  canIncrease: boolean;
  canDecrease: boolean;
  maxIncrease?: number;
  maxDecrease?: number;
  additionalCost: number;
  isRemovable: boolean;
  GSI1PK?: string; // INV#{inventoryId}
  GSI1SK?: string; // PROD#{productId}
}

// Inventory transaction model
export interface InventoryTransaction {
  PK: string; // INV#{inventoryId}
  SK: string; // TXN#{timestamp}
  inventoryId: string;
  timestamp: string; // ISO date
  transactionType: 'restock' | 'consumption' | 'adjustment' | 'waste';
  quantity: number; // positive for additions, negative for reductions
  documentReference?: string; // order ID, supplier invoice, etc.
  notes?: string;
  performedBy: string; // userId
  GSI1PK?: string; // TXN#DATE#{dateOnly}
  GSI1SK?: string; // timestamp
}

// Supplier model
export interface Supplier {
  PK: string; // SUP#{supplierId}
  SK: string; // METADATA
  supplierId: string;
  name: string;
  contactPerson?: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  preferredFor: string[]; // categories
  paymentTerms?: string;
  notes?: string;
  GSI1PK?: string; // SUP#CATEGORY#{category}
  GSI1SK?: string; // name
}
