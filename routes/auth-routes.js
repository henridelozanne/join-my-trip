const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
authRoutes.get("/", (req, res, next) => {
  res.render("index");
});

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
authRoutes.get("/trip", (req, res, next) => {
  res.render("auth/trip");
});
authRoutes.post("/signup", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  var salt = bcrypt.genSaltSync(bcryptSalt);
  var hashPass = bcrypt.hashSync(password, salt);

  var newUser = User({
    username,
    password: hashPass
  });
  if (newUser.username === "" && newUser.password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }
  User.findOne({ username: username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists"
      });
      return;
    }
    newUser.save(err => {
      if (err) {
        res.render("auth/signup", {
          errorMessage: "Something went wrong"
        });
      } else {
        res.redirect("/");
      }
    });
  });
});
module.exports = authRoutes;
