# DynamoDB Schema Design for Restaurant POS

This document outlines the design for a restaurant Point of Sale (POS) system using Amazon DynamoDB. The design supports all key requirements: product management with customizable ingredients, order processing with multiple delivery methods, role-based users, and reporting.

## Design Principles

When designing for DynamoDB, we follow these key principles:
1. **Design for access patterns, not entities**
2. **Denormalize data where necessary**
3. **Use composite keys and sparse indexes**
4. **Keep related data together in single items**
5. **Use item collections for one-to-many relationships**

## Core Tables

For our Restaurant POS system, we'll use these primary tables:

### 1. Users Table

```
Table Name: StanPOS_Users
Primary Key: PK (Partition Key) = "USER#{username}"
Sort Key: SK = "PROFILE"

Attributes:
- username
- passwordHash
- firstName
- lastName
- email
- phone
- roleId
- roleName
- isActive
- createdAt
- updatedAt
```

**Global Secondary Indexes (GSI):**
- `RoleIndex` - PK: "ROLE#{roleId}", SK: "USER#{username}"
  - For querying users by role

### 2. Products Table

```
Table Name: StanPOS_Products
Primary Key: PK (Partition Key) = "PRODUCT#{id}"
Sort Key: SK = "DETAIL"

Attributes:
- id
- name
- description
- price
- categoryId
- categoryName
- imageUrl
- isAvailable
- ingredients: [
    {
      id
      name
      quantity
      isRemovable
      priceAdjustment
    }
  ]
- createdAt
- updatedAt
```

**Global Secondary Indexes (GSI):**
- `CategoryIndex` - PK: "CATEGORY#{categoryId}", SK: "PRODUCT#{id}"
  - For querying products by category

### 3. Ingredients Table

```
Table Name: StanPOS_Ingredients
Primary Key: PK (Partition Key) = "INGREDIENT#{id}"
Sort Key: SK = "DETAIL"

Attributes:
- id
- name
- description
- priceAdjustment
- stockQuantity
- isAvailable
- createdAt
- updatedAt
```

### 4. Orders Table

```
Table Name: StanPOS_Orders
Primary Key: PK (Partition Key) = "ORDER#{orderNumber}"
Sort Key: SK = "DETAIL"

Attributes:
- orderNumber
- customerId
- customerName (denormalized)
- customerPhone (denormalized)
- userId
- userName (denormalized)
- deliveryMethodId
- deliveryMethodName (denormalized)
- status
- subtotal
- taxAmount
- discountAmount
- deliveryFee
- totalAmount
- notes
- items: [
    {
      productId
      productName
      quantity
      unitPrice
      subtotal
      notes
      modifications: [
        {
          ingredientId
          ingredientName
          modificationType (add/remove)
          quantity
          priceAdjustment
        }
      ]
    }
  ]
- paymentMethod
- paymentStatus
- paymentReference
- createdAt
- updatedAt
- completedAt
```

**Global Secondary Indexes (GSI):**
- `UserIndex` - PK: "USER#{userId}", SK: "ORDER#{createdAt}"
  - For querying orders by user
- `CustomerIndex` - PK: "CUSTOMER#{customerId}", SK: "ORDER#{createdAt}"
  - For querying orders by customer
- `StatusIndex` - PK: "STATUS#{status}", SK: "ORDER#{createdAt}"
  - For querying orders by status
- `DateIndex` - PK: "DATE#{YYYY-MM-DD}", SK: "ORDER#{orderNumber}"
  - For querying orders by date

### 5. Reporting Table

```
Table Name: StanPOS_Reports
Primary Key: PK (Partition Key) = "REPORT#{type}"
Sort Key: SK = "DATE#{YYYY-MM-DD}"

Attributes:
- reportType (daily_sales, product_sales)
- date
- totalOrders
- totalSales
- totalTax
- totalDiscounts
- productDetails (for product sales): [
    {
      productId
      productName
      quantitySold
      totalSales
    }
  ]
- createdAt
- updatedAt
```

**Global Secondary Indexes (GSI):**
- `ProductReportIndex` - PK: "PRODUCT#{productId}", SK: "DATE#{YYYY-MM-DD}"
  - For querying sales by product

## Item Collections for One-to-Many Relationships

For related items, we can use the same partition key with different sort keys:

### Categories Collection

```
PK: "CATEGORY#{id}", SK: "DETAIL"
Attributes: id, name, description, sortOrder

PK: "CATEGORY#{id}", SK: "PRODUCT#{productId}"
Attributes: productId, productName (for quick reference)
```

### Customer Collection

```
PK: "CUSTOMER#{id}", SK: "DETAIL"
Attributes: id, firstName, lastName, phone, email, address, notes

PK: "CUSTOMER#{id}", SK: "ORDER#{orderNumber}"
Attributes: orderNumber, orderDate, totalAmount (for quick reference)
```

## Access Patterns

This DynamoDB design supports the following access patterns:

1. **Product Management**
   - Get product by ID: Query `StanPOS_Products` where PK="PRODUCT#{id}"
   - List products by category: Query `CategoryIndex` where PK="CATEGORY#{categoryId}"
   - Get product ingredients: Included in product item
   - Update product details: Update `StanPOS_Products` item

2. **Ingredient Customization**
   - Add/remove ingredients: Store modifications in order items
   - Get available ingredients: Scan `StanPOS_Ingredients` where isAvailable=true
   - Update ingredient stock: Update `StanPOS_Ingredients` item

3. **Order Processing**
   - Create new order: Put item in `StanPOS_Orders`
   - Get order details: Query `StanPOS_Orders` where PK="ORDER#{orderNumber}"
   - Update order status: Update `StanPOS_Orders` item
   - List orders by status: Query `StatusIndex` where PK="STATUS#{status}"
   - List orders by date: Query `DateIndex` where PK="DATE#{YYYY-MM-DD}"

4. **User Management**
   - Get user by username: Query `StanPOS_Users` where PK="USER#{username}"
   - List users by role: Query `RoleIndex` where PK="ROLE#{roleId}"
   - Update user details: Update `StanPOS_Users` item

5. **Reporting**
   - Get daily sales report: Query `StanPOS_Reports` where PK="REPORT#daily_sales" and SK="DATE#{YYYY-MM-DD}"
   - Get product sales report: Query `ProductReportIndex` where PK="PRODUCT#{productId}"
   - Get sales date range: Query `StanPOS_Reports` with SK between "DATE#{startDate}" and "DATE#{endDate}"

## Implementation Notes

1. **Denormalization**: We've denormalized some data (like customer name in orders) to reduce the need for multiple queries

2. **Transaction Support**: Use DynamoDB transactions for operations that need atomicity (like updating inventory when an order is placed)

3. **Report Generation**: Consider using DynamoDB Streams with Lambda functions to update reports automatically when orders are placed

4. **Data Consistency**: For stronger consistency requirements, specify ConsistentRead=true for critical operations

5. **Cost Optimization**: 
   - Use TTL for temporary data
   - Consider using DynamoDB Accelerator (DAX) for caching frequently accessed data
   - Provision appropriate read/write capacity units based on usage patterns 