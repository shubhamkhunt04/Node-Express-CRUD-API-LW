// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

var mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/node-crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => console.log(err)); // connect to our database

const bearRouter = require("./routes/bearRouter");

// middleware to use for all requests
router.use(function (req, res, next) {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

// app.use("/api", router);
app.use("/bears", bearRouter);

app.listen(port);
console.log("Server is running on port " + port);
