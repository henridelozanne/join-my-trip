const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: {
    type: String,
    required: [true, "please give title to your trip"]
  },
  description: {
    type: String,
    required: [true, "please give description to your trip"]
  },
  startDate: {
    type: Date,
    required: [true, "please chose your date"]
  },
  endDate: {
    type: Date,
    required: [true, "please chose your date"]
  },
  creator: userid,
  joinedUsers: [usersid],
  activities: [activity_id],
  place: googleplace
});
const User = mongoose.model("User", userSchema);

module.exports = User;
