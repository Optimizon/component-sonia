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


\COPY prodschema.products from '../fakeProductData/asCSV/products1.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY prodschema.products from '../fakeProductData/asCSV/products2.csv' WITH DELIMITER AS ',' CSV HEADER;

\COPY prodschema.similaritems from '../fakeProductData/asCSV/similarItems1.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY prodschema.similaritems from '../fakeProductData/asCSV/similarItems2.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY prodschema.similaritems from '../fakeProductData/asCSV/similarItems3.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY prodschema.similaritems from '../fakeProductData/asCSV/similarItems4.csv' WITH DELIMITER AS ',' CSV HEADER;
\COPY prodschema.similaritems from '../fakeProductData/asCSV/similarItems5.csv' WITH DELIMITER AS ',' CSV HEADER;


CREATE INDEX idindex ON prodschema.similaritems USING btree(id);
CREATE INDEX indexid ON prodschema.products USING btree(id);

