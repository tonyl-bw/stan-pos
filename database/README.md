# Restaurant Point of Sale Database Design

This directory contains the database schema for the restaurant point of sale system. The system is designed to handle the following features:
- Product management with customizable ingredients
- Customer order processing with different delivery methods
- Role-based user access control
- Reporting tools for sales analysis

## Entity Relationship Diagram (Text Format)

```
+-------------+       +---------------+       +----------------+
|    ROLES    |<------+     USERS     +------>|     ORDERS     |
+-------------+       +---------------+       +----------------+
                                                    ^   ^
                                                    |   |
                      +-------------+               |   |
                      | INGREDIENTS |<--------------+   |
                      +-------------+                   |
                          ^   ^                         |
                          |   |                         |
+-----------+    +----------------+    +------------+   |
| CATEGORIES|<-->|    PRODUCTS    |<-->| ORDER_ITEMS|<--+
+-----------+    +----------------+    +------------+
                         |                    |
                         v                    v
                  +-----------------+  +--------------------+
                  |PRODUCT_INGREDIENTS| |ORDER_ITEM_MODIFICATIONS|
                  +-----------------+  +--------------------+
```

## Main Tables and Relationships

### User Management
- **roles**: Defines different user roles (admin, manager, cashier, kitchen)
- **users**: Stores user information with role-based permissions

### Product Management
- **categories**: Product categories (appetizers, main dishes, desserts, etc.)
- **products**: Menu items available for sale
- **ingredients**: Components that can be added/removed from products
- **product_ingredients**: Default ingredients for each product

### Order Processing
- **delivery_methods**: Different ways orders can be fulfilled (in-store, take away, delivery)
- **customers**: Optional customer information for orders
- **orders**: Main order information including totals and status
- **order_items**: Individual products within an order
- **order_item_modifications**: Ingredient customizations for order items
- **payments**: Payment information for orders

### Reporting
- **daily_sales**: Aggregated daily sales information for reporting
- **product_sales**: Tracks sales by product for popularity analysis

## Key Features Implemented

1. **Product Customization**: Customers can add/remove ingredients via the order_item_modifications table
2. **Multiple Delivery Methods**: Support for in-store dining, takeaway, and delivery
3. **Role-Based Access**: Different permissions for administrators, managers, cashiers, and kitchen staff
4. **Reporting Capabilities**: Tables designed to support sales analysis and reporting
5. **Complete Order Lifecycle**: From creation to payment and fulfillment

## Database Schema

The complete SQL schema is available in the `schema.sql` file in this directory. 