const express = require("express");
const authRoutes = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/signup", upload.single("photo"), (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  //const checkbox = req.body.checkbox;
  const description = req.body.description;
  const img = `/uploads/${req.file.filename}`;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = User({
    firstname,
    lastname,
    email,
    description,
    img,
    password: hashPass
  });
  if (
    newUser.firstname === "" ||
    newUser.password === "" ||
    newUser.lastname === "" ||
    newUser.email === "" ||
    newUser.description === "" ||
    newUser.img === ""
  ) {
    res.render("auth/signup", {
      errorMessage: "Please fill in all the fields"
    });
    return;
  }
  User.findOne({ email: email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The email already exists"
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

authRoutes.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.render("auth/login", {
      errors: "please enter valid email and password"
    });
  }
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res.render("auth/login", { errors: "the email doesn't exist" });
    }
    bcrypt.compare(password, user.password, (err, areTheSame) => {
      if (err) return next(err);
      if (areTheSame) {
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("auth/login", { errors: "Invalid password" });
      }
    });
  });
});
authRoutes.get("/logout", (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/");
    return;
  }

  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = authRoutes;
