//seeding for cloud purposes
const faker = require('faker');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
  // waitForConnections : true,
  host: 'localhost',
  user: 'root',
  database: 'slideShowData'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB connected!');
  }
});

const getRelated = (id, callback) => { //getting the related items according to the id in the browser
  const queryString = `select * from products where id in (select relatedItemId from similarProducts where productId= ?)`;
  connection.query(queryString, [id], callback);
};

// function picks a random image from S3
const randomImage = () => {
  const imageList = ['https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(1).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(10).jpeg',
    'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(2).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(3).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(4).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(5).jpeg',
    'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(6).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(7).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(8).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(9).jpeg'];
  const item = imageList[Math.floor(Math.random() * imageList.length)];
  return item;
};
const list = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
function getRandomRating() {
  const rand = list[Math.floor(Math.random() * list.length)];
  return rand;
}

const DATA_NUMBER = 100;
const createTable = function () {
  for (let i = 0; i < DATA_NUMBER; i += 1) {
    const randomName = faker.commerce.productName();
    const randomDescription = faker.lorem.sentences();
    const randomColor = faker.commerce.color();
    const randomPrice = faker.commerce.price();
    const randomImageURL = randomImage();
    const randomRating = getRandomRating(list);
    const randomReviewNumber = Math.floor((Math.random() * 1000) + 36); //displayed on the page
    const randomBoolean = faker.random.boolean();

    const queryString = `INSERT INTO products (productName, productDescription, color, price, imageURL, rating, reviewNumber, isPrime)
                            VALUES ("${randomName}", "${randomDescription}", "${randomColor}", "${randomPrice}", "${randomImageURL}", ${randomRating}, ${randomReviewNumber}, ${randomBoolean})`;
    connection.query(queryString);
    console.log('entering query');
  }
};
// preventing the funtion from running more than once
// createTable();

const getRelatedItems = () => { 
  for (let i = 1; i <= 100; i += 1) { 
    const relatedItems = ((Math.random() * 38) + 6); // two random numbers to generate number of related items
    for (let j = 0; j < relatedItems; j += 1) {
      const relatedTo = ((Math.random() * 100) + 1);
      connection.query(`INSERT INTO similarProducts (productId, relatedItemId) values (${i}, ${relatedTo})`);
    }
  }
};
// getRelatedItems();

const insertItem = (itemObj, callback) => {
   //       productName varchar (500),
  //       productDescription varchar (500),
  //       color varchar (500),
  //       price decimal(6,2) NOT NULL,
  //       imageURL varchar(500),
  //       rating float,
  //       reviewNumber INT,
  //       isPrime BOOLEAN
  
  var queryString = `INSERT INTO products (productName, productDescription, color, price, imageURL, rating, reviewNumber, isPrime)
                            VALUES ("${itemObj["productName"]}", "${itemObj["productDescription"]}", "${itemObj["color"]}", "${itemObj["price"]}", "${itemObj["imageURL"]}", ${itemObj["rating"]}, ${itemObj["reviewNumber"]}, ${itemObj["isPrime"]})`
  
  connection.query(queryString, (err, res) => {
    if (err) {
      callback(err,"error occured while inserting")
    } else {
      callback(null, res);
    }
  });

}

const insertRelated = (callback) => { //will simply be called anytime an item is inserted into the products table 
  //will need to do the above operations 
  //to do this correctly: will need to grab the last inserted and make that the id;
  const amountRelatedItems = ((Math.random() * 38) + 6); //well aware this isn't all the items anymore...
  for (var i = 0; i < amountRelatedItems; i += 1) { //for each item generate a number 1 - 100
    const relatedTo = ((Math.random() * 100) + 1);
    connection.query(`SELECT MAX(id) from products;`, (err, results) => {
      if(err) {
        console.log(err)
      } else {
    var maxID = results[0]["MAX(id)"];
   // console.log("inserted", maxID); //inserting into relatedproducts using the last inserted ID
    connection.query(`INSERT INTO similarProducts (productId, relatedItemId) values (${maxID}, ${relatedTo})`, 
    (err, res) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null,res);
      }
    })
  }
})
}
}

const updateItem = (updateObj, callback) => {

  var updateIdQuery = " id = " + updateObj["productId"]; //form the id query first 
  
  delete updateObj.productId;//now delete the id so I can loop properly 
  var updateValuesQuery = "";

  for(var prop in updateObj) {
    if(prop === "isPrime") {
      updateValuesQuery = updateValuesQuery.concat(prop + " = " + updateObj[prop] +  ", ") //isPrime is a pure boolean
    } else {
      updateValuesQuery = updateValuesQuery.concat(prop + " = " + "\"" + `${updateObj[prop]}` + "\"" + ", ")
    }
  }
  var valuesQuery = updateValuesQuery.slice(0, updateValuesQuery.length-2);
  
  var fullQuery = "UPDATE products SET " + valuesQuery +  " WHERE" + updateIdQuery;
  
  connection.query(fullQuery, (err, results)=> {
    if(err) {
      callback("query", fullQuery)
    } else {
      callback(results);
    }
  })
  //only updating the colums specified by the updateObject
}


const deleteFromProducts = (id, callback) => {
  var query = `DELETE FROM PRODUCTS WHERE ID = ${id}`;
  connection.query(query, (err, results) => {
    if(err) {
      callback(err);
    } else { //also delete from the related table
      console.log(results)
      var secondQuery = `DELETE FROM similarProducts WHERE productId = ${id} or relatedItemId = ${id}`
      connection.query(secondQuery, (err, results) => {
        if(err) {
          console.log(err);
        } else {
          callback(results);
        }
      })
    }
  })
}


module.exports.getRelated = getRelated;
module.exports.insertRelated = insertRelated;
module.exports.insertItem = insertItem;
module.exports.updateItem = updateItem;
module.exports.deleteFromProducts = deleteFromProducts;
module.exports.deleteFromProducts = deleteFromProducts;
