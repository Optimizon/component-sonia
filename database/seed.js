var connection = require('./connection.js');

connection.client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  connection.client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    //client.end();
  });
});

// get filenames
var filePaths = ['/Users/lisette/products1.csv', '/Users/lisette/products2.csv']; //I moved the files to where postgreSql is running 

//import the files

for(var i = 0; i < filePaths.length; i++) {
  connection.client.query(`COPY prodschema.products from '${filePaths[i]}' WITH DELIMITER ',' CSV HEADER;`, (err, res) => {
    if(err) {
      return console.error('error running query', err);
    } else {
      console.log(res);
    }
  })
 }
 //need this to only be called when seed.js is run 


var similarfilePaths = ['/Users/lisette/similarItems1.csv', '/Users/lisette/similarItems2.csv', '/Users/lisette/similarItems3.csv', '/Users/lisette/similarItems4.csv', '/Users/lisette/similarItems5.csv']; //I moved the files to where postgreSql is running 

for(var i = 0; i < similarfilePaths.length; i++) {
  connection.client.query(`COPY prodschema.similaritems from '${similarfilePaths[i]}' WITH DELIMITER ',' CSV HEADER;`, (err, res) => {
    if(err) {
      return console.error('error running query', err);
    } else {
      console.log(res);

    }
  })
}