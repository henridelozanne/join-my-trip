const express = require("express");
const profilesController = express.Router();

profilesController.get("/", (req, res, next) => {
  res.render("profiles/index", {
    firstname: req.session.currentUser.firstname,
    lastname: req.session.currentUser.lastname,
    description: req.session.currentUser.description,
    email: req.session.currentUser.email,
    img: req.session.currentUser.img
  });
});

module.exports = profilesController;
