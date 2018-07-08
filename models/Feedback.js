const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  owner: { type: String, required: true },
  message: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  userAvatar: { type: String },
  read: { type: Boolean, default: false}
});

feedbackSchema.pre("save", function(next){
  // fix user avatar there
  this.userAvatar = "https://zeit.co/api/www/avatar/80a05295ee60a79cf50b0dbd63e0deaaec49568f?s=240";
  next()
})

module.exports = mongoose.model("Feedback", feedbackSchema)