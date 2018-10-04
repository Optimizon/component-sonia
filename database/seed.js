var pg = require('pg');

var conString = "postgresql://lisette@localhost:5432/amzproducts"; //connects to the db 

//psql "dbname=amzproducts options=--search_path=prodschema" -a -f postGres.sql

var client = new pg.Client(conString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});

//this file will contain the functions for DB queries  
//\copy { table | ( query ) } { from | to } { ‘filename’ } [ [ with ] ( option [, …] ) ]
// get filenames
var filePaths = ['/Users/lisette/products1.csv', '/Users/lisette/products2.csv']; //I moved the files to where postgreSql is running 

// import the files
for(var i = 0; i < filePaths.length; i++) {
  client.query(`COPY prodschema.products from '${filePaths[i]}' WITH DELIMITER ',' CSV HEADER;`, (err, res) => {
    if(err) {
      return console.error('error running query', err);
    } else {
      console.log(res);
    }
  })
}


var similarfilePaths = ['/Users/lisette/similarItems1.csv', '/Users/lisette/similarItems2.csv', '/Users/lisette/similarItems3.csv', '/Users/lisette/similarItems4.csv', '/Users/lisette/similarItems5.csv']; //I moved the files to where postgreSql is running 

// import the files
for(var i = 0; i < similarfilePaths.length; i++) {
  client.query(`COPY prodschema.similaritems from '${similarfilePaths[i]}' WITH DELIMITER ',' CSV HEADER;`, (err, res) => {
    if(err) {
      return console.error('error running query', err);
    } else {
      console.log(res);
    }
  })
}



//CREATE INDEX idex_name ON table_name USING btree(column1, column2);
//CREATE INDEX IF NOT EXISTS indexid ON prodschema.products USING btree(id);

//CREATE INDEX idindex ON prodschema.similaritems USING btree(id);

//psql -U lisette -d amzproducts -c ` + "\\" + `
//id, productName,productDescription, color, price, imageURL, rating, reviewNumber, isPrime

//\COPY prodschema.similaritems from '/Users/lisette/similarItems2.csv' WITH DELIMITER ',' CSV HEADER;