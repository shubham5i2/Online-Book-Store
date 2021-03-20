require("dotenv").config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");

//intializing express app
const app = express();

//setting up PORT number from environment variables
const PORT = process.env.PORT || 3300;

//Dataase connection
const url =
  "mongodb+srv://shubham2306:j74l2ihdQu8IHgg2@onlinebookstorecluster.4dmiz.mongodb.net/books?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => console.log("Connected to database"))
  .on("error", (error) => {
    console.log("Error in connecting", error);
  });

//storing session in mongoDB database
const mongoStore = MongoStore.create({
  mongoUrl: url,
  collectionName: "sessions",
});

//session configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //cookie valid for 24 hours
  })
);

//passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//configure express flash
app.use(flash());

//assets
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//global moddleware to avail session and user variable across the application
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

//setting up template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

//routes
require("./routes/web")(app);

//running node/express server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}...`);
});
