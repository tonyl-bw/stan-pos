// Product model
interface Product {
  PK: string; // PROD#{productId}
  SK: string; // METADATA
  productId: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  imageUrl?: string;
  available: boolean;
  preparationTime: number; // in minutes
  tags: string[];
  ingredients: ProductIngredient[]; // Added ingredients array
  GSI1PK?: string; // PROD#CATEGORY#{category}
  GSI1SK?: string; // name
}

// Product category model
interface ProductCategory {
  PK: string; // CATEGORY#{categoryId}
  SK: string; // METADATA
  categoryId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  active: boolean;
}

// Product ingredient relationship (used within Product model)
interface ProductIngredient {
  ingredientId: string;
  name: string;
  quantityRequired: number;
  isOptional: boolean;
  isDefault: boolean;
  canIncrease: boolean;
  canDecrease: boolean;
  maxIncrease?: number;
  maxDecrease?: number;
  additionalCost: number;
  isRemovable: boolean;
}

// Ingredient model
interface Ingredient {
  PK: string; // ING#{ingredientId}
  SK: string; // METADATA
  ingredientId: string;
  name: string;
  description?: string;
  category: string; // e.g., "meat", "vegetable", "dairy", "sauce", etc.
  isAllergenic: boolean;
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
  };
  unitOfMeasurement: string; // e.g., "piece", "gram", "oz", "ml"
  costPerUnit: number;
  inventoryId: string; // Reference to inventory item
  imageUrl?: string;
  active: boolean;
  GSI1PK?: string; // ING#CATEGORY#{category}
  GSI1SK?: string; // name
}

// Product-Inventory relationship model (DynamoDB table)
interface ProductInventory {
  PK: string; // PROD#{productId}
  SK: string; // ING#{ingredientId}
  productId: string;
  ingredientId: string;
  quantityRequired: number;
  isOptional: boolean;
  isDefault: boolean;
  canIncrease: boolean;
  canDecrease: boolean;
  maxIncrease?: number;
  maxDecrease?: number;
  additionalCost: number;
  isRemovable: boolean;
  GSI1PK?: string; // ING#{ingredientId}
  GSI1SK?: string; // PROD#{productId}
}