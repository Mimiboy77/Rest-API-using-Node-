const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  BookerId: {
    type: String,
    required: true,
  },
  BookerFirstName: {
    type: String,
    required: true,
  },
  BookerLastName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
