// var pg = require('pg');

// var conString = "postgresql://lisette@localhost:5432/amzproducts"; //connects to the db 

// //psql "dbname=amzproducts options=--search_path=prodschema" -a -f postGres.sql

// var client = new pg.Client(conString);
// client.connect();
const { Client } = require('pg');
const client = new Client({
  user: 'other_user',
 
   host: 'ec2-54-67-17-11.us-west-1.compute.amazonaws.com', //connecting to the postgresql remote DB
 // host: 'localhost',
  password: '1',
 // database:'slideShowData',
  database: 'amzproducts',
  port: 5432
});

module.exports = client;