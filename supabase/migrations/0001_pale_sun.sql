/*
  # Initial Schema Setup for Beauty Salon

  1. New Tables
    - users
      - id (uuid, primary key)
      - username (text, unique)
      - password (text)
      - role (text)
      - created_at (timestamp)
    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price (decimal)
      - stock (integer)
      - created_at (timestamp)
    - clients
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - phone (text)
      - created_at (timestamp)
    - appointments
      - id (uuid, primary key)
      - client_id (uuid, references clients)
      - service_description (text)
      - appointment_date (timestamp)
      - status (text)
      - created_at (timestamp)
    - sales
      - id (uuid, primary key)
      - client_id (uuid, references clients)
      - total_amount (decimal)
      - payment_status (text)
      - created_at (timestamp)
    - sale_items
      - id (uuid, primary key)
      - sale_id (uuid, references sales)
      - product_id (uuid, references products)
      - quantity (integer)
      - price (decimal)
    - staff
      - id (uuid, primary key)
      - name (text)
      - role (text)
      - email (text)
      - phone (text)
      - created_at (timestamp)
    - credits
      - id (uuid, primary key)
      - client_id (uuid, references clients)
      - amount (decimal)
      - status (text)
      - due_date (timestamp)
      - created_at (timestamp)
    - petty_cash
      - id (uuid, primary key)
      - description (text)
      - amount (decimal)
      - type (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'user')),
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal NOT NULL CHECK (price >= 0),
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Staff table
CREATE TABLE staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  service_description text NOT NULL,
  appointment_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Sales table
CREATE TABLE sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  total_amount decimal NOT NULL CHECK (total_amount >= 0),
  payment_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Sale items table
CREATE TABLE sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id uuid REFERENCES sales(id),
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  price decimal NOT NULL CHECK (price >= 0)
);

-- Credits table
CREATE TABLE credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  amount decimal NOT NULL CHECK (amount >= 0),
  status text NOT NULL DEFAULT 'pending',
  due_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Petty cash table
CREATE TABLE petty_cash (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  amount decimal NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE petty_cash ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Full access for authenticated users" ON products
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Full access for authenticated users" ON clients
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Full access for authenticated users" ON staff
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Full access for authenticated users" ON appointments
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Full access for authenticated users" ON sales
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Full access for authenticated users" ON sale_items
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Full access for authenticated users" ON credits
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Full access for authenticated users" ON petty_cash
  FOR ALL TO authenticated
  USING (true);

-- Insert default admin user
INSERT INTO users (username, password, role)
VALUES 
  ('admin', 'admin', 'admin'),
  ('user', 'user', 'user');