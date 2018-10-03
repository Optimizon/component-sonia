var fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream')
require('events').EventEmitter.prototype._maxListeners = 11;

const randomName = () => { //productName
	return faker.commerce.productName();
};

const randomDescription = () => { //productDescription
	return faker.lorem.sentences();
};

const color = () => { //color
	return faker.commerce.color();
};

const randomPrice = () => { //price
	return faker.commerce.price();
}


const randomImage = () => { //imageURL 
  const imageList = ['https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(1).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(10).jpeg',
    'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(2).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(3).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(4).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(5).jpeg',
    'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(6).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(7).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(8).jpeg', 'https://s3-us-west-1.amazonaws.com/pictures-hrsf/download+(9).jpeg'];
  const item = imageList[Math.floor(Math.random() * imageList.length)];
  return item;
};

const list = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]; //rating
function getRandomRating() {
  const rand = list[Math.floor(Math.random() * list.length)];
  return rand;
};

const randomReviewNumber = () => { //reviewNumber
	return Math.floor((Math.random() * 1000) + 36);
};

const randomBoolean = () => { //randomBoolean
	return faker.random.boolean();
}; 

var csvWrite = csvWriter({ headers: ["id", "productName", "productDescription", "color", "price", "imageURL", "rating", "reviewNumber", "isPrime"]});
//var fileName = '../fakeData/products2.csv'  //uncomment to run

csvWrite.pipe(fs.createWriteStream(fileName, {'flags': 'a'}));

for (var i = 5000001 ; i < 10000001 ; i++) { //generates data points 5MILL.1 to 10MILL.0
	let productObject =  
	[ i ,
	"shirt" + i,
	faker.lorem.sentences(), 
	faker.commerce.color(), 
	faker.commerce.price(),
	randomImage(),
	getRandomRating(),
	randomReviewNumber(),
	faker.random.boolean()]

		console.log("data entry #", i)
		csvWrite.write(productObject) //will write to the new file we just created using the newest product 
};


