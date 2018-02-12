const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: {
    type: String,
    required: [true, "please give title to your trip"]
  },

  usersInterested: [usersid],
  tripsMatching: [activity_id]
});
const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
