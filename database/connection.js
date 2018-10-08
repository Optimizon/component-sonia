var pg = require('pg');

var conString = "postgresql://lisette@localhost:5432/amzproducts"; //connects to the db 

//psql "dbname=amzproducts options=--search_path=prodschema" -a -f postGres.sql

var client = new pg.Client(conString);
client.connect();

module.exports.client = client;
