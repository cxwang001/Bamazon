CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT auto_increment not null,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT null,
  PRIMARY KEY (item_id)
);