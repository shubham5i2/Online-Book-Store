const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");

//intializing express app
const app = express();

//setting up PORT number from environment variables
const PORT = process.env.PORT || 3300;

//assets
app.use(express.static("public"));

//setting up template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cart", (req, res) => {
  res.render("customers/cart");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.get("/register", (req, res) => {
  res.render("auth/register");
});

//running node/express server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}...`);
});
