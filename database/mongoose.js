var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amazon'); //connect to mongoDB

//mongo --host 127.0.0.1:27017


var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!")
});

//creating schema and model
const productSchema = new mongoose.Schema({
  id: Number,
  productName: String,
  productDescription: String,
  color: String,
  price: String,
  rating: Number,
  reviewNumber: Number,
  isPrime: Boolean,
  similarProducts: Array
});

const product = mongoose.model('products', productSchema); //creates a collection 'products'
db.products.createIndex( { id: 1 } ) //creates index for query time purposes

module.exports = product;
