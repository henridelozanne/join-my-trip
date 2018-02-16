const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");
const moment = require("moment");
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });
router.get("/trip", (req, res, next) => {
  if (req.session.currentUser) {
    res.render("trip");
  } else {
    res.redirect("/login");
  }
});

router.post("/trip", upload.single("picture"), (req, res, next) => {
  const usr = req.session.currentUser.firstname;

  const description = req.body.description;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const location = req.body.location;
  const activity = req.body.activity;
  const tripPicture = `/uploads/${req.file.filename}`;
  const newTrip = Trip({
    // userId: req.session.currentUser._id,

    description,
    startdate,
    enddate,
    activity,
    location,
    usr,
    tripPicture
  });
  if (
    newTrip.description === "" ||
    newTrip.startdate === "" ||
    newTrip.enddate === "" ||
    newTrip.activity === "" ||
    newTrip.location === "" ||
    newTrip.tripPicture === ""
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
