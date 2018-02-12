const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Trip = require("../models/trip");
const moment = require("moment");

router.get("/trip", (req, res, next) => {
  res.render("trip");
});

router.post("/trip", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const newTrip = Trip({
    userId: req.session.currentUser._id,
    title,
    description
  });
  if (newTrip.title === "" || newTrip.description === "") {
    res.render("trip", {
      errorMessage: "Please fill in all the fields"
    });
    return;
  }
  newTrip.save(err => {
    if (err) {
      res.render("trip", {
        errorMessage: "Something went wrong"
      });
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
