-- Restaurant Point of Sale Database Schema

-- Role-based user system
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    role_id INTEGER NOT NULL REFERENCES roles(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products (menu items)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ingredients that can be added/removed from products
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price_adjustment DECIMAL(10, 2) DEFAULT 0.00, -- Extra cost when adding this ingredient
    stock_quantity INTEGER,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default ingredients for each product
CREATE TABLE product_ingredients (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    ingredient_id INTEGER NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    is_removable BOOLEAN DEFAULT TRUE, -- Can customer remove this ingredient?
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, ingredient_id)
);

-- Delivery methods
CREATE TABLE delivery_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- In-store, Take away, Delivery, etc.
    description TEXT,
    has_additional_fee BOOLEAN DEFAULT FALSE,
    fee_amount DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer information (optional for some orders)
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(20) NOT NULL UNIQUE, -- User-friendly order reference
    customer_id INTEGER REFERENCES customers(id),
    user_id INTEGER NOT NULL REFERENCES users(id), -- Staff who created the order
    delivery_method_id INTEGER NOT NULL REFERENCES delivery_methods(id),
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, preparing, ready, delivered, cancelled
    subtotal DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Order items (products in an order)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL, -- Price at the time of order
    subtotal DECIMAL(10, 2) NOT NULL, -- unit_price * quantity + ingredient modifications
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order item ingredient modifications
CREATE TABLE order_item_modifications (
    id SERIAL PRIMARY KEY,
    order_item_id INTEGER NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
    ingredient_id INTEGER NOT NULL REFERENCES ingredients(id),
    modification_type VARCHAR(10) NOT NULL, -- 'add' or 'remove'
    quantity INTEGER NOT NULL DEFAULT 1,
    price_adjustment DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- Price adjustment for this modification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment information
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL, -- cash, credit_card, etc.
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, completed, failed, refunded
    reference_number VARCHAR(100), -- For card transactions, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- For reporting: Daily sales summary
CREATE TABLE daily_sales (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    total_orders INTEGER NOT NULL DEFAULT 0,
    total_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_tax DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_discounts DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- For reporting: Product sales summary
CREATE TABLE product_sales (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity_sold INTEGER NOT NULL DEFAULT 0,
    total_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, product_id)
);

-- Insert default data

-- Default roles
INSERT INTO roles (name, description) VALUES
    ('admin', 'System administrator with full access'),
    ('manager', 'Restaurant manager with access to reports and management functions'),
    ('cashier', 'Staff handling orders and payments'),
    ('kitchen', 'Kitchen staff who view and process orders');

-- Default delivery methods
INSERT INTO delivery_methods (name, description, has_additional_fee, fee_amount) VALUES
    ('In-store', 'Customer dining in the restaurant', FALSE, 0.00),
    ('Take away', 'Customer picks up the order', FALSE, 0.00),
    ('Delivery', 'Order delivered to customer address', TRUE, 5.00); 