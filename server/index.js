require('dotenv').config();
const cors = require('cors');


const express = require('express');

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
  controllers.getRelated(req.query.id, (err, results) => {
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

app.post('/add', (req, res) => { //will come in with data: look up express's way to have data... 
  console.log("the body is:", req.body)
  res.send("got here")
})



// app.post('/add', (req, res) => { //is going to be recieving data and putting it into the DB
//   controllers.addToDB(req.query.id, (err, results) => {
//     if (err) {
//       res.status(503).send(err);
//     } else {
//       return res.status(200).send("success")
//     }
//   });
// })

const PORT = 4043;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
