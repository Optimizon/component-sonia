-- DB was created with script in package.json this file runs after.

CREATE SCHEMA prodschema;

CREATE TABLE prodschema.products (
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

CREATE TABLE prodschema.similaritems (
	id INTEGER,
	similarID INTEGER
);

CREATE INDEX idindex ON prodschema.similaritems USING btree(id);
CREATE INDEX indexid ON prodschema.products USING btree(id);

-- psql "dbname=amzproducts options=--search_path=prodschema" -a -f postGres.sql

-- psql - < postGres.sql

-- psql -U lisette -d amzproducts -a -f "postGres.sql"
-- INSERT INTO prodschema.products ("testShirt", "its just a shirt", "red", 126.78, "www.http:getalife.com", 6.5, 4, "true");


-- DELETE FROM prodschema.products WHERE id=10000001;

-- INSERT INTO prodschema.products(productName, productDescription, color, price, imageURL, rating, reviewNumber, isPrime) values ('shirt10000001','a shirt', 'red', 184.26, 'www', 4, 5, true);