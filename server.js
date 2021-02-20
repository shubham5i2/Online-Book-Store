const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");

//intializing express app
const app = express();

//setting up PORT number from environment variables
const PORT = process.env.PORT || 3300;

//routes
app.get("/", (req, res) => {
  res.render("home");
});

//setting up template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//running node/express server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}...`);
});
