const Feedback = require("../models/Feedback");

exports.createFeedback = async (req, res) => {
  // req.body.owner = req.owner;

  if (!req.body.message || !req.body.owner) {
    res.status(400).json({
      success: false,
      msg: "request body is missing some values"
    })
  }

  try {
    const fb = await (new Feedback(req.body)).save();
    if (!fb) {
      return res.status(500).json({
        success: false,
        msg: "Unable to save feeback to database"
      })
    }
    res.status(200).json({
      success: true,
      fb
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      err: error
    })
  }
};


exports.getAllFeedbacks = async (req, res) => {

  try {
    const feedbacks = await Feedback.find({});
    console.log(feedbacks);
    res.status(200).json({
      success: true,
      feedbacks
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      err: error
    })
  }
};


