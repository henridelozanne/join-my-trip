const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");
const moment = require("moment");

router.get("/trip", (req, res, next) => {
  if (req.session.currentUser) {
    res.render("trip");
  } else {
    res.redirect("/login");
  }
});

router.post("/trip", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const location = req.body.location;
  const activity = req.body.activity;
  const newTrip = Trip({
    // userId: req.session.currentUser._id,
    title,
    description,
    startdate,
    enddate,
    activity,
    location
  });
  if (
    newTrip.title === "" ||
    newTrip.description === "" ||
    newTrip.startdate === "" ||
    newTrip.enddate === "" ||
    newTrip.activity === "" ||
    newTrip.location === ""
  ) {
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
