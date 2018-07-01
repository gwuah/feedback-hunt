const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  owner: { type: String, required: true },
  message: { type: String, required: true },
  datetime: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Feedback", feedbackSchema)