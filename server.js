// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// set dynamic or 3000 default
const PORT = process.env.PORT || 3000;

// Express App
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MongoScraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
require("./controllers/apiRoutes")(app);
require("./controllers/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log("App running on port " + PORT + "!");
});