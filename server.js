const express = require("express");
const path = require("path");
const session = require('express-session')
const route = require("./router/router.js");
const { urlencoded } = require("express");
const database = require("./config/databse.js");
const fs = require("fs");
const passport = require("passport");
const localAuth = require("./middleware/localAuth.js");
localAuth(passport)
const app = express();

app.set("view engine", "ejs");
app.use(urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
app.use(session({ secret: "key", resave: false, saveUninitialized: false }))
app.use(express.static(path.join(__dirname, "/public")));

// app.use(cookie());
app.use(passport.initialize());
app.use(passport.session());
app.use(route);

app.listen(5000, (err) => {
    database();
  if (err) {
    console.log(err);
  } else {
    console.log("Server Connected http://localhost:5000");
  }
});
