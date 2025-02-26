-- Sample data for Restaurant POS system
-- This script populates the database with sample data to demonstrate functionality

-- Clear existing data (if needed)
-- Uncomment the following lines to reset the database before inserting sample data
-- DELETE FROM product_sales;
-- DELETE FROM daily_sales;
-- DELETE FROM payments;
-- DELETE FROM order_item_modifications;
-- DELETE FROM order_items;
-- DELETE FROM orders;
-- DELETE FROM customers;
-- DELETE FROM product_ingredients;
-- DELETE FROM products;
-- DELETE FROM categories;
-- DELETE FROM ingredients;
-- DELETE FROM users;
-- DELETE FROM roles;
-- DELETE FROM delivery_methods;

-- Insert sample categories
INSERT INTO categories (name, description, sort_order) VALUES
('Appetizers', 'Small dishes to start your meal', 1),
('Main Courses', 'Hearty entrees', 2),
('Sides', 'Complementary dishes', 3),
('Beverages', 'Drinks and refreshments', 4),
('Desserts', 'Sweet treats to finish your meal', 5);

-- Insert sample ingredients
INSERT INTO ingredients (name, description, price_adjustment, stock_quantity, is_available) VALUES
('Tomato', 'Fresh ripe tomatoes', 0.50, 100, TRUE),
('Lettuce', 'Crisp iceberg lettuce', 0.40, 80, TRUE),
('Cheese', 'Melted cheddar cheese', 1.00, 90, TRUE),
('Chicken', 'Grilled chicken breast', 2.50, 50, TRUE),
('Beef', 'Premium ground beef', 3.00, 40, TRUE),
('Bacon', 'Crispy bacon strips', 1.50, 30, TRUE),
('Onion', 'Diced red onions', 0.30, 60, TRUE),
('Mushroom', 'Sautéed mushrooms', 1.00, 45, TRUE),
('Avocado', 'Fresh sliced avocado', 1.50, 25, TRUE),
('Rice', 'Steamed white rice', 1.00, 100, TRUE),
('Ketchup', 'Tomato ketchup', 0.00, 200, TRUE),
('Mayonnaise', 'Creamy mayonnaise', 0.00, 150, TRUE),
('French Fries', 'Crispy potato fries', 2.00, 80, TRUE),
('Coca Cola', 'Classic soft drink', 0.00, 200, TRUE),
('Ice Cream', 'Vanilla ice cream', 1.50, 40, TRUE);

-- Insert sample products
INSERT INTO products (name, description, price, category_id, is_available) VALUES
('Classic Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 9.99, (SELECT id FROM categories WHERE name = 'Main Courses'), TRUE),
('Chicken Sandwich', 'Grilled chicken with avocado and mayo', 8.99, (SELECT id FROM categories WHERE name = 'Main Courses'), TRUE),
('Caesar Salad', 'Fresh romaine lettuce with chicken and Caesar dressing', 7.99, (SELECT id FROM categories WHERE name = 'Appetizers'), TRUE),
('French Fries', 'Crispy golden fries with salt', 3.99, (SELECT id FROM categories WHERE name = 'Sides'), TRUE),
('Chocolate Cake', 'Rich chocolate cake with ice cream', 5.99, (SELECT id FROM categories WHERE name = 'Desserts'), TRUE),
('Soft Drink', 'Choice of Coca Cola, Sprite, or Fanta', 1.99, (SELECT id FROM categories WHERE name = 'Beverages'), TRUE);

-- Insert product ingredients
INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES
-- Classic Burger ingredients
((SELECT id FROM products WHERE name = 'Classic Burger'), (SELECT id FROM ingredients WHERE name = 'Beef'), 1, FALSE),
((SELECT id FROM products WHERE name = 'Classic Burger'), (SELECT id FROM ingredients WHERE name = 'Lettuce'), 1, TRUE),
((SELECT id FROM products WHERE name = 'Classic Burger'), (SELECT id FROM ingredients WHERE name = 'Tomato'), 2, TRUE),
((SELECT id FROM products WHERE name = 'Classic Burger'), (SELECT id FROM ingredients WHERE name = 'Cheese'), 1, TRUE),
((SELECT id FROM products WHERE name = 'Classic Burger'), (SELECT id FROM ingredients WHERE name = 'Onion'), 1, TRUE),
-- Chicken Sandwich ingredients
((SELECT id FROM products WHERE name = 'Chicken Sandwich'), (SELECT id FROM ingredients WHERE name = 'Chicken'), 1, FALSE),
((SELECT id FROM products WHERE name = 'Chicken Sandwich'), (SELECT id FROM ingredients WHERE name = 'Lettuce'), 1, TRUE),
((SELECT id FROM products WHERE name = 'Chicken Sandwich'), (SELECT id FROM ingredients WHERE name = 'Tomato'), 1, TRUE),
((SELECT id FROM products WHERE name = 'Chicken Sandwich'), (SELECT id FROM ingredients WHERE name = 'Avocado'), 1, TRUE),
((SELECT id FROM products WHERE name = 'Chicken Sandwich'), (SELECT id FROM ingredients WHERE name = 'Mayonnaise'), 1, TRUE),
-- Caesar Salad ingredients
((SELECT id FROM products WHERE name = 'Caesar Salad'), (SELECT id FROM ingredients WHERE name = 'Lettuce'), 2, FALSE),
((SELECT id FROM products WHERE name = 'Caesar Salad'), (SELECT id FROM ingredients WHERE name = 'Chicken'), 1, TRUE),
-- French Fries ingredients
((SELECT id FROM products WHERE name = 'French Fries'), (SELECT id FROM ingredients WHERE name = 'French Fries'), 1, FALSE),
-- Chocolate Cake ingredients
((SELECT id FROM products WHERE name = 'Chocolate Cake'), (SELECT id FROM ingredients WHERE name = 'Ice Cream'), 1, TRUE),
-- Soft Drink ingredients
((SELECT id FROM products WHERE name = 'Soft Drink'), (SELECT id FROM ingredients WHERE name = 'Coca Cola'), 1, TRUE);

-- Insert sample users (password_hash would be properly hashed in a real system)
INSERT INTO users (username, password_hash, first_name, last_name, email, phone, role_id) VALUES
('admin', '$2a$10$XOOhcNJGrFtL5ina7yGrVOQ5rPtUUiDP4U2MT/q4/vUqI1jvIQtLC', 'Admin', 'User', 'admin@restaurant.com', '555-1234', (SELECT id FROM roles WHERE name = 'admin')),
('manager', '$2a$10$XOOhcNJGrFtL5ina7yGrVOQ5rPtUUiDP4U2MT/q4/vUqI1jvIQtLC', 'Manager', 'User', 'manager@restaurant.com', '555-2345', (SELECT id FROM roles WHERE name = 'manager')),
('cashier', '$2a$10$XOOhcNJGrFtL5ina7yGrVOQ5rPtUUiDP4U2MT/q4/vUqI1jvIQtLC', 'Cashier', 'User', 'cashier@restaurant.com', '555-3456', (SELECT id FROM roles WHERE name = 'cashier')),
('kitchen', '$2a$10$XOOhcNJGrFtL5ina7yGrVOQ5rPtUUiDP4U2MT/q4/vUqI1jvIQtLC', 'Kitchen', 'Staff', 'kitchen@restaurant.com', '555-4567', (SELECT id FROM roles WHERE name = 'kitchen'));

-- Insert sample customers
INSERT INTO customers (first_name, last_name, phone, email, address) VALUES
('John', 'Doe', '555-6789', 'john.doe@example.com', '123 Main St, Anytown'),
('Jane', 'Smith', '555-7890', 'jane.smith@example.com', '456 Oak Ave, Somewhere'),
('Bob', 'Johnson', '555-8901', 'bob.johnson@example.com', '789 Pine Rd, Nowhere');

-- Insert sample orders
INSERT INTO orders (order_number, customer_id, user_id, delivery_method_id, status, subtotal, tax_amount, discount_amount, delivery_fee, total_amount, notes) VALUES
('ORD-20230601-001', 1, (SELECT id FROM users WHERE username = 'cashier'), (SELECT id FROM delivery_methods WHERE name = 'In-store'), 'completed', 23.97, 1.92, 0.00, 0.00, 25.89, 'Table 5'),
('ORD-20230601-002', 2, (SELECT id FROM users WHERE username = 'cashier'), (SELECT id FROM delivery_methods WHERE name = 'Take away'), 'completed', 15.98, 1.28, 0.00, 0.00, 17.26, 'Ready in 15 minutes'),
('ORD-20230601-003', 3, (SELECT id FROM users WHERE username = 'cashier'), (SELECT id FROM delivery_methods WHERE name = 'Delivery'), 'completed', 19.97, 1.60, 0.00, 5.00, 26.57, 'Call before delivery');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal, notes) VALUES
-- Order 1 items
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-001'), (SELECT id FROM products WHERE name = 'Classic Burger'), 1, 9.99, 9.99, NULL),
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-001'), (SELECT id FROM products WHERE name = 'French Fries'), 2, 3.99, 7.98, NULL),
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-001'), (SELECT id FROM products WHERE name = 'Soft Drink'), 3, 1.99, 5.97, NULL),
-- Order 2 items
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-002'), (SELECT id FROM products WHERE name = 'Chicken Sandwich'), 1, 8.99, 8.99, 'Extra mayo'),
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-002'), (SELECT id FROM products WHERE name = 'French Fries'), 1, 3.99, 3.99, NULL),
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-002'), (SELECT id FROM products WHERE name = 'Soft Drink'), 1, 1.99, 1.99, 'No ice'),
-- Order 3 items
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-003'), (SELECT id FROM products WHERE name = 'Classic Burger'), 2, 9.99, 19.98, NULL);

-- Insert sample order item modifications
INSERT INTO order_item_modifications (order_item_id, ingredient_id, modification_type, quantity, price_adjustment) VALUES
-- Modifications for Order 1, Item 1 (Classic Burger)
((SELECT oi.id FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.order_number = 'ORD-20230601-001' AND oi.product_id = (SELECT id FROM products WHERE name = 'Classic Burger')), (SELECT id FROM ingredients WHERE name = 'Onion'), 'remove', 1, 0.00),
((SELECT oi.id FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.order_number = 'ORD-20230601-001' AND oi.product_id = (SELECT id FROM products WHERE name = 'Classic Burger')), (SELECT id FROM ingredients WHERE name = 'Bacon'), 'add', 1, 1.50),
-- Modifications for Order 2, Item 1 (Chicken Sandwich)
((SELECT oi.id FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.order_number = 'ORD-20230601-002' AND oi.product_id = (SELECT id FROM products WHERE name = 'Chicken Sandwich')), (SELECT id FROM ingredients WHERE name = 'Mayonnaise'), 'add', 1, 0.00);

-- Insert sample payments
INSERT INTO payments (order_id, payment_method, amount, status, reference_number) VALUES
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-001'), 'credit_card', 25.89, 'completed', 'PAY-20230601-001-CC'),
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-002'), 'cash', 17.26, 'completed', 'PAY-20230601-002-CASH'),
((SELECT id FROM orders WHERE order_number = 'ORD-20230601-003'), 'credit_card', 26.57, 'completed', 'PAY-20230601-003-CC');

-- Insert sample daily sales for reporting
INSERT INTO daily_sales (date, total_orders, total_sales, total_tax, total_discounts) VALUES
('2023-06-01', 3, 69.72, 4.80, 0.00),
('2023-06-02', 5, 112.45, 9.00, 5.00),
('2023-06-03', 4, 87.33, 7.00, 2.50);

-- Insert sample product sales for reporting
INSERT INTO product_sales (date, product_id, quantity_sold, total_sales) VALUES
('2023-06-01', (SELECT id FROM products WHERE name = 'Classic Burger'), 3, 29.97),
('2023-06-01', (SELECT id FROM products WHERE name = 'Chicken Sandwich'), 1, 8.99),
('2023-06-01', (SELECT id FROM products WHERE name = 'French Fries'), 3, 11.97),
('2023-06-01', (SELECT id FROM products WHERE name = 'Soft Drink'), 4, 7.96); 