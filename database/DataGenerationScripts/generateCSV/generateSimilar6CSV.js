var fs = require('fs');
const csvWriter = require('csv-write-stream')
require('events').EventEmitter.prototype._maxListeners = 11;


var csvWrite = csvWriter({ headers: ["id", "similarID"]});
//var fileName = fileName = './similarItems1.csv'  //uncomment to run

csvWrite.pipe(fs.createWriteStream(fileName, {'flags': 'a'}));

for (var i = 1 ; i < 2000001 ; i++) { //keep a counter and once it hits 1 million make a new file... //5000001
	for(var j = 1; j < 11; j++) {
		let productObject =  
		[ i, 
			
			Math.floor((Math.random() * 10000000) + 36)
		]


		console.log("data entry #", i, "randomSimilar:", j)
		csvWrite.write(productObject) //will write to the new file we just created using the newest product 
 } 
};


var csvWrite = csvWriter({ headers: ["id", "similarID"]});
//var fileName = fileName = './similarItems2.csv'  //uncomment to run

csvWrite.pipe(fs.createWriteStream(fileName, {'flags': 'a'}));

for (var i = 2000001 ; i < 4000001 ; i++) { //keep a counter and once it hits 1 million make a new file... //5000001
	for(var j = 1; j < 11; j++) {
		let productObject =  
		[ i, 
			Math.floor((Math.random() * 10000000) + 36)
		]


		console.log("data entry #", i, "randomSimilar:", j)
		csvWrite.write(productObject) //will write to the new file we just created using the newest product 
 } 
};

var csvWrite = csvWriter({ headers: ["id", "similarID"]});
//var fileName = fileName = './similarItems3.csv'  //uncomment to run

csvWrite.pipe(fs.createWriteStream(fileName, {'flags': 'a'}));

for (var i = 4000001 ; i < 6000001 ; i++) { //keep a counter and once it hits 1 million make a new file... //5000001
	for(var j = 1; j < 11; j++) {
		let productObject =  
		[ i, 
			Math.floor((Math.random() * 10000000) + 36)
		]


		console.log("data entry #", i, "randomSimilar:", j)
		csvWrite.write(productObject) //will write to the new file we just created using the newest product 
 } 
};


var csvWrite = csvWriter({ headers: ["id", "similarID"]});
//var fileName = fileName = './similarItems4.csv'  //uncomment to run

csvWrite.pipe(fs.createWriteStream(fileName, {'flags': 'a'}));

for (var i = 6000001 ; i < 8000001 ; i++) { //keep a counter and once it hits 1 million make a new file... //5000001
	for(var j = 1; j < 11; j++) {
		let productObject =  
		[ i , 
			Math.floor((Math.random() * 10000000) + 36)
		]


		console.log("data entry #", i, "randomSimilar:", j)
		csvWrite.write(productObject) //will write to the new file we just created using the newest product 
 } 
};

var csvWrite = csvWriter({ headers: ["id", "similarID"]});
//var fileName = fileName = './similarItems5.csv'  //uncomment to run

csvWrite.pipe(fs.createWriteStream(fileName, {'flags': 'a'}));

for (var i = 8000001 ; i < 10000001 ; i++) { //keep a counter and once it hits 1 million make a new file... //5000001
	for(var j = 1; j < 11; j++) {
		let productObject =  
		[ i , 
			Math.floor((Math.random() * 10000000) + 36)
		]


		console.log("data entry #", i, "randomSimilar:", j)
		csvWrite.write(productObject) //will write to the new file we just created using the newest product 
 } 
};