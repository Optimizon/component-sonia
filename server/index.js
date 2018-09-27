require('dotenv').config();
const cors = require('cors');


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());

const controllers = require('../database/index.js');

app.use(express.static(`${__dirname}/../client/dist`));
app.use((req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
});


app.get('/product', (req, res) => {
  console.log(req.query.id)
  controllers.getRelated(req.query.id, (err, results) => { //only retrieves from related items table
    if (err) {
      res.status(503).send(err);
    } else {
      console.log("results",results)
      return res.json({
        data: results,
      });
    }
  });
});

app.post('/add',bodyParser(), (req, res) => { 
  console.log("Jesse", req.body)
  //will come in with data... using require('request') 
  //the body: 
  //{
  // productName: "bacon", 
  // productDescription: "bacon to consume", 
  // color: "red",
  // price: 55,
  // imageURL: "http://images/bacon.com", 
  // isPrime: true
  // }

  var objectToInsert = Object.assign({reviewNumber: 0, rating: 0}, req.body);
  controllers.insertItem(objectToInsert, (err, results) => { //first insert the item 
    if (err) {
      res.send(err, null)
    } else {
      controllers.insertRelated((err, results) => { //if there is no error, insert related using id that was created  
        if (err) {
          console.log("errorhere:", err); 
        } else {
          console.log("success:", results) //if there is no error, send us back this message 
        }
      })
    }
    res.send(results) //if we get no err, send us back a response from the DB
  })
       
})

app.patch('/update', bodyParser(), (req, res) => {
  console.log("body:", req.body)
  
  controllers.updateItem(req.body, (err, results) => {
    if(err) {
      res.send(err)
    } else {
      res.status(200).send(results)
    }
  })
  
})

app.delete('/remove',bodyParser(), function (req, res) {
  //user will provide the id of the item being removed 
  controllers.deleteFromProducts(req.body.id, (err, results) => {
    if(err) {
      res.send(err)
    } else {
      res.send(results);
    }
  })

})

//gonna have to updata both tables (do two queries)
//Delete from related
//Delete from similar products 
//first delete all the entries with the 


const PORT = 4043;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
