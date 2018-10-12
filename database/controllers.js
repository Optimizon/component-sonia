const client = require('./connection.js');
const redisConnect = require('../server/redisFile.js') //connection to redis 

var insert = function(item, callback){
  //the item comes in like :
  //{
  // productName: "bacon", 
  // productDescription: "bacon to consume", 
  // color: "red",
  // price: 55,
  // imageURL: "http://images/bacon.com", 
  // isPrime: true,
  // reviewNumber: 0,
  // rating: 0
	// }
  var query = `INSERT INTO prodschema.products(productName, productDescription, color, price, imageURL, rating, reviewNumber, isPrime) values 
               ('${item["productName"]}', '${item["productDescription"]}', '${item["color"]}', '${item["price"]}', '${item["imageURL"]}', '${item["rating"]}', '${item["reviewNumber"]}', '${item["isPrime"]}')`
  client.query(query, (err, res) => {
    if(err) {
			callback(err, null);
    } else {
      callback(null, res);
    }
  })
};

var getRelated = function(id, callback){
	var query = `SELECT prodschema.products .* FROM prodschema.products INNER JOIN prodschema.similaritems ON (products.id = similaritems.similarID) AND similaritems.id = ${id}`
	client.query(query, (err, res) => {
		if(err) {
			callback(err, null);
		} else {
      //making sure I'm putting just the double quotes...
      redisConnect.setex(id, 120000,JSON.stringify(res)) //cache it. keep it for 120000 time
			callback(null, res);
		}
	})
};

// SELECT * FROM prodschema.products INNER JOIN prodschema.similaritems ON similaritems.similarID = products.id WHERE similaritems.id = ${id}
//var filePaths = ['/Users/lisette/products1.csv', '/Users/lisette/products2.csv']; //I moved the files to where postgreSql is running 

// import the files
var makeProducts = function(){
  var filePaths = ['/Users/lisette/products1.csv', '/Users/lisette/products2.csv']; //I moved the files to where postgreSql is running 

for(var i = 0; i < filePaths.length; i++) {
  client.query(`COPY prodschema.products from '${filePaths[i]}' WITH DELIMITER ',' CSV HEADER;`, (err, res) => {
    if(err) {
      return console.error('error running query', err);
    } else {
      console.log(res);
    }
  })
 };

};//will only run when seed.js is run

//var similarfilePaths = ['/Users/lisette/similarItems1.csv', '/Users/lisette/similarItems2.csv', '/Users/lisette/similarItems3.csv', '/Users/lisette/similarItems4.csv', '/Users/lisette/similarItems5.csv']; //I moved the files to where postgreSql is running 

var makeSimilarProducts = function() {
  var similarfilePaths = ['/Users/lisette/similarItems1.csv', '/Users/lisette/similarItems2.csv', '/Users/lisette/similarItems3.csv', '/Users/lisette/similarItems4.csv', '/Users/lisette/similarItems5.csv']; //I moved the files to where postgreSql is running 


	for(var i = 0; i < similarfilePaths.length; i++) {
		client.query(`COPY prodschema.similaritems from '${similarfilePaths[i]}' WITH DELIMITER ',' CSV HEADER;`, (err, res) => {
			if(err) {
				return console.error('error running query', err);
			} else {
				console.log(res);
			}
		})
	}
}

const updateItem = (updateObj, callback) => { 
	//going to be sent an object 
	//ex: {
  //   "productId": 828,
  //   "productName": "rice",
  //   "color": "white",
  //   "isPrime": false
	// }
	var updateIdQuery = " id = " + updateObj["productId"]; //form the id part of the query first 
  
  delete updateObj.productId;//now delete the id so I can loop properly 
  var updateValuesQuery = "";

  for(var prop in updateObj) {
    if(prop === "isPrime") {
      updateValuesQuery = updateValuesQuery.concat(prop + " = " + updateObj[prop] +  ", ") //isPrime is a pure boolean
    } else {
      updateValuesQuery = updateValuesQuery.concat(prop + " = " + "\'" + `${updateObj[prop]}` + "\'" + ", ")
    }
  }
  var valuesQuery = updateValuesQuery.slice(0, updateValuesQuery.length-2);
  
  var fullQuery = "UPDATE prodschema.products SET " + valuesQuery +  " WHERE" + updateIdQuery +';';
	
	console.log(fullQuery);
  client.query(fullQuery, (err, results)=> {
    if(err) {
      callback(err, null)
    } else {
      callback(null, results);
    }
  })
  //only updating the colums specified by the updateObject
}

const deleteFromProducts = (id, callback) => {
	var query = `DELETE FROM prodschema.products WHERE ID = ${id}`;
	console.log(query);
  connection.client.query(query, (err, results) => {
    if(err) {
      callback(err);
    } else { //also delete from the related table
      console.log(results)
      var secondQuery = `DELETE FROM prodschema.similaritems WHERE id = ${id} or id = ${id}`
      connection.client.query(secondQuery, (err, results) => {
        if(err) {
          console.log(err);
        } else {
          callback(results);
        }
      })
    }
  });
};

module.exports.deleteFromProducts = deleteFromProducts;
module.exports.updateItem = updateItem;
module.exports.makeSimilarProducts = makeSimilarProducts;
module.exports.makeProducts = makeProducts;
module.exports.insert = insert;
module.exports.getRelated = getRelated;

