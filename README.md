# Restaurant Point of Sale System - DynamoDB Design

This repository contains a comprehensive database design for a restaurant point of sale (POS) system using Amazon DynamoDB, designed to meet the following requirements:

1. **Product Management**: Track menu items, categories, and pricing
2. **Ingredient Customization**: Allow customers to add/remove ingredients during order process
3. **Reporting Tools**: Generate insights on sales, popular products, and more
4. **Role-based User System**: Support different staff roles and permissions
5. **Multiple Delivery Methods**: Handle in-store dining, takeaway, and delivery

## DynamoDB Design Approach

DynamoDB is fundamentally different from relational databases:
- It uses a key-value and document model instead of tables with relationships
- There are no JOINs or foreign keys
- Data is often denormalized for query performance
- Schema design is based on access patterns rather than normalization

## Database Structure

The DynamoDB schema is designed with the following core tables:

### Core Tables
- **StanPOS_Users**: Staff accounts with role-based permissions
- **StanPOS_Products**: Menu items organized by category with embedded ingredients
- **StanPOS_Ingredients**: Standalone ingredients for stock management
- **StanPOS_Orders**: Order transactions with embedded line items and modifications
- **StanPOS_Reports**: Aggregated reporting data for sales analysis

## Files in this Repository

- `database/dynamodb_schema.md`: Complete DynamoDB schema design with table structures and access patterns
- `database/cloudformation.yaml`: CloudFormation template to provision the DynamoDB tables
- `database/examples.js`: JavaScript examples for interacting with the DynamoDB tables

## Key Design Features

### Single-Table Design with GSIs
The design uses global secondary indexes (GSIs) to enable multiple access patterns while minimizing the number of tables.

### Embedded Documents
Order items and ingredient modifications are embedded within order documents to avoid the need for joins.

### Hierarchical Sort Keys
Sort keys are used to create hierarchical relationships and item collections.

### Denormalized Data
Frequently accessed data is denormalized to reduce the need for multiple queries.

## Access Patterns

The DynamoDB design supports the following key access patterns:

1. **Product Management**
   - Get product by ID
   - List products by category
   - Get product ingredients (embedded)
   - Update product details

2. **Order Processing**
   - Create and retrieve orders
   - Update order status
   - List orders by status, date, customer, or user
   - Process ingredient modifications

3. **User Management**
   - Authenticate users
   - Check permissions by role
   - Manage user profiles

4. **Reporting**
   - Generate daily sales reports
   - Track product popularity
   - Analyze sales trends

## Implementation Recommendations

1. **DynamoDB Streams**: Use streams with Lambda functions to update reports automatically when orders are placed

2. **Transactions**: Utilize DynamoDB transactions for operations that need atomicity

3. **Pagination**: Implement pagination for queries that might return large result sets

4. **Caching**: Consider using DynamoDB Accelerator (DAX) for caching frequently accessed data

5. **Cost Optimization**: Set up auto-scaling or on-demand capacity to handle varying workloads efficiently

## Getting Started

1. Deploy the CloudFormation template to create the DynamoDB tables
2. Set up the necessary IAM permissions for your application
3. Use the examples.js file as a reference for implementing your data access layer
4. Connect your application to DynamoDB

## Database Design Considerations

This schema was designed with the following principles in mind:

1. **Access Pattern First**: Tables and indexes are optimized for specific query patterns
2. **Denormalization**: Data is duplicated where necessary to improve read performance
3. **Scalability**: Design allows for horizontal scaling with DynamoDB's partitioning
4. **Cost Efficiency**: Index design minimizes the need for table scans
5. **Flexibility**: Structure accommodates future feature additions 