// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");


// Initialize Express
var port = process.env.PORT || 3000;
var app = express();
app.use(express.static("public"));


// Use body parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// Initialize Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// ROUTES
var routes = require("./routes");
app.use(routes);



// Mongoose connections
var URI = process.env.MONGODB_URI || 'mongodb://localhost/article-scraper'; 
mongoose.connect(URI);
var db = mongoose.connection;


// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});


// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Listen on port 3000
app.listen(port, function() {
  console.log("App running on port 3000!");
});