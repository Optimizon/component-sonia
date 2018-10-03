-- DROP DATABASE IF EXISTS amzproducts; 
--  \connect amzproducts;

-- make the db inside the shell 

CREATE SCHEMA IF NOT EXISTS prodschema;

CREATE TABLE IF NOT EXISTS prodschema.products (
	id SERIAL primary key NOT NULL,
  productName VARCHAR (500),
	productDescription VARCHAR (500),
	color VARCHAR (500),
	price DECIMAL(6,2) NOT NULL,
	imageURL VARCHAR(500),
	rating DECIMAL,
	reviewNumber INTEGER,
	isPrime BOOLEAN
);

DROP TABLE IF EXISTS prodschema.similaritems;

CREATE TABLE IF NOT EXISTS prodschema.similaritems (
	id INTEGER,
	similarID INTEGER
)

