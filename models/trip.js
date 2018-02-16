const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  userId: Schema.Types.ObjectId,
  description: {
    type: String,
    required: [true, "please give a description to your trip"]
  },
  startdate: {
    type: Date,
    required: [true, "please chose your date"]
  },
  enddate: {
    type: Date,
    required: [true, "please chose your date"]
  },
  location: {
    type: String,
    required: [true, "please add a location to your trip"]
  },
  activity: {
    type: String
  },
  usr: {
    type: String
  },
  tripPicture: {
    type: String,
    required: [true, "please add a photo to your trip"]
  },
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }]
  // creator: userid,
  // joinedUsers: [usersid],
  // activities: [activity_id],
  // place: googleplace
});
const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
