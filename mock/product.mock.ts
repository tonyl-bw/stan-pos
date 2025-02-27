export const MOCK_PRODUCTS: Product[] = [
  // 1. Classic Burger - with full ingredients list
  {
    PK: "PROD#1001",
    SK: "METADATA",
    productId: "1001",
    name: "Classic Burger",
    description: "Our signature beef patty with lettuce, tomato, cheese, and special sauce",
    category: "burgers",
    price: 9.99,
    imageUrl: "https://example.com/images/classic-burger.jpg",
    available: true,
    preparationTime: 12,
    tags: ["bestseller", "beef", "lunch", "dinner"],
    ingredients: [
      {
        ingredientId: "ING001",
        name: "Beef Patty",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: true,
        canDecrease: false,
        maxIncrease: 1,
        additionalCost: 2.50,
        isRemovable: false
      },
      {
        ingredientId: "ING002",
        name: "Burger Bun",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING003",
        name: "Cheddar Cheese",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: true,
        canDecrease: true,
        maxIncrease: 2,
        additionalCost: 0.75,
        isRemovable: true
      },
      {
        ingredientId: "ING004",
        name: "Lettuce",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING005",
        name: "Tomato",
        quantityRequired: 2,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: true,
        maxDecrease: 2,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING006",
        name: "Special Sauce",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      }
    ],
    GSI1PK: "PROD#CATEGORY#1",
    GSI1SK: "Classic Burger"
  },
  
  // 2. Vegetarian Pizza - with customizable ingredients
  {
    PK: "PROD#1002",
    SK: "METADATA",
    productId: "1002",
    name: "Vegetarian Pizza",
    description: "Fresh vegetable pizza with bell peppers, mushrooms, olives, and onions",
    category: "pizzas",
    price: 12.99,
    imageUrl: "https://example.com/images/veggie-pizza.jpg",
    available: true,
    preparationTime: 18,
    tags: ["vegetarian", "dinner"],
    ingredients: [
      {
        ingredientId: "ING010",
        name: "Pizza Dough",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING011",
        name: "Tomato Sauce",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING012",
        name: "Mozzarella Cheese",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: true,
        canDecrease: true,
        maxIncrease: 1,
        additionalCost: 1.50,
        isRemovable: true
      },
      {
        ingredientId: "ING013",
        name: "Bell Peppers",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING014",
        name: "Mushrooms",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING015",
        name: "Black Olives",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING016",
        name: "Red Onions",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      }
    ],
    GSI1PK: "PROD#CATEGORY#2",
    GSI1SK: "Vegetarian Pizza"
  },
  
  // 3. Fountain Drink - no customizable ingredients
  {
    PK: "PROD#1003",
    SK: "METADATA",
    productId: "1003",
    name: "Fountain Drink",
    description: "Regular-sized soft drink of your choice",
    category: "beverages",
    price: 2.49,
    imageUrl: "https://example.com/images/fountain-drink.jpg",
    available: true,
    preparationTime: 1,
    tags: ["drinks", "popular"],
    ingredients: [],
    GSI1PK: "PROD#CATEGORY#3",
    GSI1SK: "Fountain Drink"
  },
  
  // 4. French Fries - simple ingredients, currently unavailable
  {
    PK: "PROD#1004",
    SK: "METADATA",
    productId: "1004",
    name: "French Fries",
    description: "Crispy golden fries served with ketchup",
    category: "sides",
    price: 3.99,
    imageUrl: "https://example.com/images/fries.jpg",
    available: false, // Out of stock
    preparationTime: 8,
    tags: ["sides", "popular"],
    ingredients: [
      {
        ingredientId: "ING020",
        name: "Potatoes",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING021",
        name: "Salt",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      }
    ],
    GSI1PK: "PROD#CATEGORY#4",
    GSI1SK: "French Fries"
  },
  
  // 5. Chocolate Sundae - dessert with optional toppings
  {
    PK: "PROD#1005",
    SK: "METADATA",
    productId: "1005",
    name: "Chocolate Sundae",
    description: "Vanilla ice cream with chocolate sauce and whipped cream",
    category: "desserts",
    price: 4.99,
    imageUrl: "https://example.com/images/chocolate-sundae.jpg",
    available: true,
    preparationTime: 5,
    tags: ["desserts", "cold", "kids"],
    ingredients: [
      {
        ingredientId: "ING030",
        name: "Vanilla Ice Cream",
        quantityRequired: 2, // 2 scoops
        isOptional: false,
        isDefault: true,
        canIncrease: true,
        canDecrease: false,
        maxIncrease: 1, // Can add one more scoop
        additionalCost: 1.00,
        isRemovable: false
      },
      {
        ingredientId: "ING031",
        name: "Chocolate Sauce",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING032",
        name: "Whipped Cream",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING033",
        name: "Cherry",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      }
    ],
    GSI1PK: "PROD#CATEGORY#5",
    GSI1SK: "Chocolate Sundae"
  },
  
  // 6. Chicken Wings - with sauce options
  {
    PK: "PROD#1006",
    SK: "METADATA",
    productId: "1006",
    name: "Chicken Wings",
    description: "8-piece spicy chicken wings with choice of sauce",
    category: "appetizers",
    price: 8.99,
    imageUrl: "https://example.com/images/wings.jpg",
    available: true,
    preparationTime: 15,
    tags: ["chicken", "spicy", "appetizers"],
    ingredients: [
      {
        ingredientId: "ING040",
        name: "Chicken Wings",
        quantityRequired: 8, // 8 pieces
        isOptional: false,
        isDefault: true,
        canIncrease: true,
        canDecrease: true,
        maxIncrease: 8, // Can double the order
        maxDecrease: 4, // Minimum 4 wings
        additionalCost: 1.00, // Per wing
        isRemovable: false
      },
      {
        ingredientId: "ING041",
        name: "Buffalo Sauce",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING042",
        name: "BBQ Sauce",
        quantityRequired: 0, // Not included by default
        isOptional: true,
        isDefault: false,
        canIncrease: true,
        canDecrease: false,
        maxIncrease: 1,
        additionalCost: 0.50,
        isRemovable: true
      },
      {
        ingredientId: "ING043",
        name: "Ranch Dressing",
        quantityRequired: 0, // Not included by default
        isOptional: true,
        isDefault: false,
        canIncrease: true,
        canDecrease: false,
        maxIncrease: 2,
        additionalCost: 0.50,
        isRemovable: true
      }
    ],
    GSI1PK: "PROD#CATEGORY#6",
    GSI1SK: "Chicken Wings"
  },
  
  // 7. Caesar Salad - healthy option with ingredient choices
  {
    PK: "PROD#1007",
    SK: "METADATA",
    productId: "1007",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing, croutons and parmesan",
    category: "salads",
    price: 7.99,
    imageUrl: "https://example.com/images/caesar-salad.jpg",
    available: true,
    preparationTime: 7,
    tags: ["healthy", "vegetarian"],
    ingredients: [
      {
        ingredientId: "ING050",
        name: "Romaine Lettuce",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING051",
        name: "Caesar Dressing",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING052",
        name: "Croutons",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING053",
        name: "Parmesan Cheese",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      },
      {
        ingredientId: "ING054",
        name: "Grilled Chicken",
        quantityRequired: 0, // Not included by default
        isOptional: true,
        isDefault: false,
        canIncrease: true,
        canDecrease: false,
        maxIncrease: 1,
        additionalCost: 2.50,
        isRemovable: true
      }
    ],
    GSI1PK: "PROD#CATEGORY#7",
    GSI1SK: "Caesar Salad"
  },
  
  // 8. Coffee - simple drink, no ingredients listed
  {
    PK: "PROD#1008",
    SK: "METADATA",
    productId: "1008",
    name: "Coffee",
    description: "Freshly brewed coffee",
    category: "beverages",
    price: 2.29,
    imageUrl: "https://example.com/images/coffee.jpg",
    available: true,
    preparationTime: 3,
    tags: ["hot", "drinks", "breakfast"],
    ingredients: [],
    GSI1PK: "PROD#CATEGORY#3",
    GSI1SK: "Coffee"
  },
  
  // 9. Kids Meal - complex combo item
  {
    PK: "PROD#1009",
    SK: "METADATA",
    productId: "1009",
    name: "Kids Meal",
    description: "Child-sized burger with fries, drink, and toy",
    category: "kids",
    price: 6.99,
    imageUrl: "https://example.com/images/kids-meal.jpg",
    available: true,
    preparationTime: 10,
    tags: ["kids", "combo", "value"],
    ingredients: [
      {
        ingredientId: "ING060",
        name: "Kids Burger",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING061",
        name: "Small Fries",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING062",
        name: "Small Drink",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING063",
        name: "Toy",
        quantityRequired: 1,
        isOptional: true,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: true
      }
    ],
    GSI1PK: "PROD#CATEGORY#8",
    GSI1SK: "Kids Meal"
  },
  
  // 10. Cheesecake - premium dessert, limited availability
  {
    PK: "PROD#1010",
    SK: "METADATA",
    productId: "1010",
    name: "New York Cheesecake",
    description: "Creamy classic cheesecake with graham cracker crust",
    category: "desserts",
    price: 6.49,
    imageUrl: "https://example.com/images/cheesecake.jpg",
    available: true,
    preparationTime: 2,
    tags: ["desserts", "premium"],
    ingredients: [
      {
        ingredientId: "ING070",
        name: "Cheesecake Slice",
        quantityRequired: 1,
        isOptional: false,
        isDefault: true,
        canIncrease: false,
        canDecrease: false,
        additionalCost: 0,
        isRemovable: false
      },
      {
        ingredientId: "ING071",
        name: "Strawberry Topping",
        quantityRequired: 0,
        isOptional: true,
        isDefault: false,
        canIncrease: true,
        canDecrease: false,
        maxIncrease: 1,
        additionalCost: 1.00,
        isRemovable: true
      },
      {
        ingredientId: "ING072",
        name: "Whipped Cream",
        quantityRequired: 0,
        isOptional: true,
        isDefault: false,
        canIncrease: true,
        canDecrease: false,
        maxIncrease: 1,
        additionalCost: 0.50,
        isRemovable: true
      }
    ],
    GSI1PK: "PROD#CATEGORY#5",
    GSI1SK: "New York Cheesecake"
  }
];
