// Example code for interacting with StanPOS DynamoDB tables
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1' // Change to your region
});

const docClient = new AWS.DynamoDB.DocumentClient();

// Helper function to generate UUIDs
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Helper function to get current date in YYYY-MM-DD format
const getFormattedDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// 1. Create a new user
const createUser = async (username, firstName, lastName, email, phone, roleId, roleName) => {
  const params = {
    TableName: 'StanPOS_Users_dev',
    Item: {
      PK: `USER#${username}`,
      SK: 'PROFILE',
      GSI1PK: `ROLE#${roleId}`,
      GSI1SK: `USER#${username}`,
      username,
      passwordHash: 'PLACEHOLDER_HASH', // In real app, use proper hashing
      firstName,
      lastName,
      email,
      phone,
      roleId,
      roleName,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  try {
    await docClient.put(params).promise();
    console.log(`User ${username} created successfully`);
    return params.Item;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// 2. Create a new product
const createProduct = async (name, description, price, categoryId, categoryName, imageUrl, ingredients) => {
  const productId = generateId();
  
  const params = {
    TableName: 'StanPOS_Products_dev',
    Item: {
      PK: `PRODUCT#${productId}`,
      SK: 'DETAIL',
      GSI1PK: `CATEGORY#${categoryId}`,
      GSI1SK: `PRODUCT#${productId}`,
      id: productId,
      name,
      description,
      price,
      categoryId,
      categoryName,
      imageUrl,
      ingredients,
      isAvailable: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  try {
    await docClient.put(params).promise();
    
    // Also add to category collection for reference
    const categoryRef = {
      TableName: 'StanPOS_Products_dev',
      Item: {
        PK: `CATEGORY#${categoryId}`,
        SK: `PRODUCT#${productId}`,
        productId,
        productName: name
      }
    };
    
    await docClient.put(categoryRef).promise();
    
    console.log(`Product ${name} created successfully with ID: ${productId}`);
    return params.Item;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// 3. Create a new order
const createOrder = async (
  orderNumber,
  customerId,
  customerName,
  customerPhone,
  userId,
  userName,
  deliveryMethodId,
  deliveryMethodName,
  items,
  subtotal,
  taxAmount,
  discountAmount,
  deliveryFee,
  totalAmount,
  notes,
  paymentMethod
) => {
  const dateStr = getFormattedDate();
  const createdAt = new Date().toISOString();
  
  const params = {
    TableName: 'StanPOS_Orders_dev',
    Item: {
      PK: `ORDER#${orderNumber}`,
      SK: 'DETAIL',
      GSI1PK: `USER#${userId}`,
      GSI1SK: `ORDER#${createdAt}`,
      GSI2PK: customerId ? `CUSTOMER#${customerId}` : 'CUSTOMER#GUEST',
      GSI2SK: `ORDER#${createdAt}`,
      GSI3PK: 'STATUS#pending',
      GSI3SK: `ORDER#${orderNumber}`,
      GSI4PK: `DATE#${dateStr}`,
      GSI4SK: `ORDER#${orderNumber}`,
      orderNumber,
      customerId,
      customerName,
      customerPhone,
      userId,
      userName,
      deliveryMethodId,
      deliveryMethodName,
      status: 'pending',
      subtotal,
      taxAmount,
      discountAmount,
      deliveryFee,
      totalAmount,
      notes,
      items,
      paymentMethod,
      paymentStatus: 'pending',
      createdAt,
      updatedAt: createdAt
    }
  };

  try {
    await docClient.put(params).promise();
    
    // If there's a customer, add to customer collection for reference
    if (customerId) {
      const customerRef = {
        TableName: 'StanPOS_Orders_dev',
        Item: {
          PK: `CUSTOMER#${customerId}`,
          SK: `ORDER#${orderNumber}`,
          orderNumber,
          orderDate: createdAt,
          totalAmount
        }
      };
      
      await docClient.put(customerRef).promise();
    }
    
    console.log(`Order ${orderNumber} created successfully`);
    return params.Item;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// 4. Update order status
const updateOrderStatus = async (orderNumber, newStatus) => {
  const params = {
    TableName: 'StanPOS_Orders_dev',
    Key: {
      PK: `ORDER#${orderNumber}`,
      SK: 'DETAIL'
    },
    UpdateExpression: 'SET status = :status, GSI3PK = :statusKey, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':status': newStatus,
      ':statusKey': `STATUS#${newStatus}`,
      ':updatedAt': new Date().toISOString()
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await docClient.update(params).promise();
    console.log(`Order ${orderNumber} status updated to ${newStatus}`);
    return result.Attributes;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// 5. Get product by ID
const getProductById = async (productId) => {
  const params = {
    TableName: 'StanPOS_Products_dev',
    Key: {
      PK: `PRODUCT#${productId}`,
      SK: 'DETAIL'
    }
  };

  try {
    const result = await docClient.get(params).promise();
    return result.Item;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// 6. Get products by category
const getProductsByCategory = async (categoryId) => {
  const params = {
    TableName: 'StanPOS_Products_dev',
    IndexName: 'CategoryIndex',
    KeyConditionExpression: 'GSI1PK = :categoryKey',
    ExpressionAttributeValues: {
      ':categoryKey': `CATEGORY#${categoryId}`
    }
  };

  try {
    const result = await docClient.query(params).promise();
    return result.Items;
  } catch (error) {
    console.error('Error querying products by category:', error);
    throw error;
  }
};

// 7. Update daily sales report
const updateDailySalesReport = async (date, ordersCount, sales, tax, discounts) => {
  const params = {
    TableName: 'StanPOS_Reports_dev',
    Key: {
      PK: 'REPORT#daily_sales',
      SK: `DATE#${date}`
    },
    UpdateExpression: 'SET reportType = :reportType, #date = :date, totalOrders = totalOrders + :ordersCount, totalSales = totalSales + :sales, totalTax = totalTax + :tax, totalDiscounts = totalDiscounts + :discounts, updatedAt = :updatedAt',
    ExpressionAttributeNames: {
      '#date': 'date'
    },
    ExpressionAttributeValues: {
      ':reportType': 'daily_sales',
      ':date': date,
      ':ordersCount': ordersCount,
      ':sales': sales,
      ':tax': tax,
      ':discounts': discounts,
      ':updatedAt': new Date().toISOString()
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    await docClient.update(params).promise();
    console.log(`Daily sales report for ${date} updated successfully`);
  } catch (error) {
    // If the item doesn't exist, create it
    if (error.code === 'ValidationException') {
      const createParams = {
        TableName: 'StanPOS_Reports_dev',
        Item: {
          PK: 'REPORT#daily_sales',
          SK: `DATE#${date}`,
          reportType: 'daily_sales',
          date,
          totalOrders: ordersCount,
          totalSales: sales,
          totalTax: tax,
          totalDiscounts: discounts,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
      await docClient.put(createParams).promise();
      console.log(`Daily sales report for ${date} created successfully`);
    } else {
      console.error('Error updating daily sales report:', error);
      throw error;
    }
  }
};

// Example usage (commented out)
/*
const runExamples = async () => {
  try {
    // Create a user
    const user = await createUser(
      'john.doe',
      'John',
      'Doe',
      'john.doe@example.com',
      '555-1234',
      '1',
      'admin'
    );
    
    // Create a product with ingredients
    const burger = await createProduct(
      'Classic Burger',
      'Juicy beef patty with lettuce, tomato, and cheese',
      9.99,
      '1',
      'Main Courses',
      'https://example.com/burger.jpg',
      [
        {
          id: '101',
          name: 'Beef Patty',
          quantity: 1,
          isRemovable: false,
          priceAdjustment: 0
        },
        {
          id: '102',
          name: 'Lettuce',
          quantity: 1,
          isRemovable: true,
          priceAdjustment: 0
        },
        {
          id: '103',
          name: 'Tomato',
          quantity: 2,
          isRemovable: true,
          priceAdjustment: 0
        },
        {
          id: '104',
          name: 'Cheese',
          quantity: 1,
          isRemovable: true,
          priceAdjustment: 0
        }
      ]
    );
    
    // Create an order
    const orderNumber = 'ORD-' + new Date().getTime();
    const order = await createOrder(
      orderNumber,
      '1001',
      'Jane Smith',
      '555-5678',
      user.username,
      `${user.firstName} ${user.lastName}`,
      '1',
      'In-store',
      [
        {
          productId: burger.id,
          productName: burger.name,
          quantity: 2,
          unitPrice: burger.price,
          subtotal: burger.price * 2,
          notes: 'Medium-well',
          modifications: [
            {
              ingredientId: '104',
              ingredientName: 'Cheese',
              modificationType: 'remove',
              quantity: 1,
              priceAdjustment: 0
            },
            {
              ingredientId: '105',
              ingredientName: 'Bacon',
              modificationType: 'add',
              quantity: 1,
              priceAdjustment: 1.50
            }
          ]
        }
      ],
      19.98, // subtotal
      1.60,  // tax
      0.00,  // discount
      0.00,  // delivery fee
      21.58, // total
      'Table 5',
      'credit_card'
    );
    
    // Update order status
    const updatedOrder = await updateOrderStatus(orderNumber, 'preparing');
    
    // Get products by category
    const mainCourses = await getProductsByCategory('1');
    console.log(`Found ${mainCourses.length} main courses`);
    
    // Update daily sales report
    await updateDailySalesReport(
      getFormattedDate(),
      1,        // orders count
      21.58,    // sales
      1.60,     // tax
      0.00      // discounts
    );
    
  } catch (error) {
    console.error('Error running examples:', error);
  }
};

runExamples();
*/

module.exports = {
  createUser,
  createProduct,
  createOrder,
  updateOrderStatus,
  getProductById,
  getProductsByCategory,
  updateDailySalesReport
}; 