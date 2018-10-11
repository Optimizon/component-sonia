require('newrelic');
require('dotenv').config();
const cors = require('cors');
//const client = require('./redisFile.js')  //Going to connect to Redis 
const postgres = require('../database/connection.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// var proxy = require('http-proxy-middleware');
postgres.connect((err) => {
  if (err) return console.log(err);
  console.log('Connected to postgres')
})
app.use(cors());


//const controllers = require('../database/index.js');
const postControllers = require('../database/controllers.js');

//app.use(express.static(`${__dirname}/../client/dist`)); //should be serving up the bundle from localhost:4043

app.use(express.static(`${__dirname}/../client/dist`)); 
// app.use((req, res, next) => {
//   console.log(`${req.method} request received at ${req.url}`);
//   next();
// });


// app.get('/product', (req, res) => {
//   console.log(req.query.id)
//   controllers.getRelated(req.query.id, (err, results) => { //only retrieves from related items table
//     if (err) {
//       res.status(503).send(err);
//     } else {
//       console.log("results",results)
//       return res.json({
//         data: results,
//       });
//     }
//   });
// });

app.get('/product', (req, res) => { //next file is inside the component.
  postControllers.getRelated(req.query.id, (err, results) => {
      if (err) {
        res.status(503).send(err);
      } else {    
        return res.json({
          data:results.rows, 
        })
      }
    })
});





// app.post('/add',bodyParser(), (req, res) => { 
//   //will come in with data... using require('request') 
//   //the body: 
//   {
//  "productName": "bacon", 
//  "productDescription": "bacon to consume", 
//  "color": "red",
//  "price": 55,
//  "imageURL": "http://images/bacon.com", 
//  "isPrime": true
//  }

//   var objectToInsert = Object.assign({reviewNumber: 0, rating: 0}, req.body);
//   controllers.insertItem(objectToInsert, (err, results) => { //first insert the item 
//     if (err) {
//       res.send(err, null)
//     } else {
//       controllers.insertRelated((err, results) => { //if there is no error, insert related using id that was created  
//         if (err) {
//           console.log("errorhere:", err); 
//         } else {
//           console.log("success:", results) //if there is no error, send us back this message 
//         }
//       })
//     }
//     res.send(results) //if we get no err, send us back a response from the DB
//   })
       
// });

app.post('/additem',bodyParser(), (req, res) => {  //postgreSQL route
  var objectToInsert = Object.assign({reviewNumber: 0, rating: 0}, req.body);
  postControllers.insert(objectToInsert, (err, results) => { //first insert the item 
    if(err) {
      console.log(err);
      res.status(503).send(body);
    } else {
      //console.log("inserted into products table", results)
      res.send(200);
    }
  });

});

// app.patch('/update', bodyParser(), (req, res) => {
//   console.log("body:", req.body)
  
//   controllers.updateItem(req.body, (err, results) => {
//     if(err) {
//       res.send(err)
//     } else {
//       res.status(200).send(results)
//     }
//   })
  
// })

app.patch('/update',bodyParser(), (req, res) => { 
  
// will receive an object with the id and things to update inside the object like the name, or photo or whatever and send it to the db controller
// ex: {
//     "productId": 828,
//     "productName": "rice",
//     "color": "white",
//     "isPrime": false
//   }


  console.log("body", req.body);

  postControllers.updateItem(req.body, (err, results) => {
    if(err) {
      console.log("uh oh!")
      res.status(503).send(err)
    } else {
      console.log("results", results)
      res.status(200).send(results)
    }
  });
});

// app.delete('/remove',bodyParser(), function (req, res) {
//   //user will provide the id of the item being removed 
//   controllers.deleteFromProducts(req.body.id, (err, results) => {
//     if(err) {
//       res.send(err)
//     } else {
//       res.send(results);
//     }
//   })

// });

app.delete('/remove',bodyParser(), function (req, res) {
  //user will provide the id of the item being removed 
  console.log(req.body.id)
  postControllers.deleteFromProducts(req.body.id, (err, results) => {
    if(err) {
      res.status(503).send(err)
    } else {
      res.send(results);
    }
  })

});




//gonna have to updata both tables (do two queries)
//Delete from related
//Delete from similar products 
//first delete all the entries with the 


const PORT = 4043;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});

//200 requests per second
//node redis AND brew install redis and RUN it with the redis server
//node redis will be able to connect 

//if the query is there, query redis
//if not, query my database 

//lower the sample size (and be specific)
//the larger the sample size (less u work with redis and the more work with DB)


//goal: high RPS. (throughput)