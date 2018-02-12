const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Trip = require("../models/trip");
const moment = require("moment");

router.get("/", (req, res, next) => {
  Trip.find({ userId: req.session.currentUser._id })
    .sort({ createdAt: "desc" })
    .exec((err, trips) => {
      if (err) return next(err);
      res.render("index", {
        trips,
        moment
      });
    });
});

module.exports = router;
