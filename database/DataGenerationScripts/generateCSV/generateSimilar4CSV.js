var fs = require('fs');
const csvWriter = require('csv-write-stream')
require('events').EventEmitter.prototype._maxListeners = 11;


var csvWrite = csvWriter({ headers: ["id", "similarID"]});
//var fileName = './similarItems4.csv'  //uncomment to run

csvWrite.pipe(fs.createWriteStream(fileName, {'flags': 'a'}));

for (var i = 6000001 ; i < 8000001 ; i++) { //stops at 9MILL
	for(var j = 1; j < 11; j++) {
		let productObject =  
		[ i, 
			Math.floor((Math.random() * 10000000) + 36)
		]


		console.log("data entry #", i, "randomSimilar:", j)
		csvWrite.write(productObject) //will write to the new file we just created using the newest product 
 } 
};