const Feedback = require("../models/Feedback");

exports.createFeedback = async (req, res) => {
  // req.body.owner = req.owner;

  if (!req.message && !req.owner) {
    res.send(400).json({
      success: false,
      msg: "request body is missing some values"
    })
  }

  try {
    const feedback = await (Feedback(req.body)).save();
    if (!feedback) {
      res.send(500).json({
        success: false,
        msg: "Unable to save feeback to database"
      })
    }
    res.send(200).json({
      success: true,
      feedback
    })
  } catch (error) {
    res.send(500).json({
      success: false,
      err: error
    })
  }
};


