const Feedback = require("../models/Feedback");

exports.home = (req, res) => {
  res.render("home")
}

exports.user = (req, res) => {
  res.render("user")
}

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
    console.log(`saving message to ${req.params.id}`)
    res.io.of(req.params.id).emit('feedback', `${JSON.stringify(fb)}`)
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
    // console.log(feedbacks);
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

exports.getFeedbackOfUser = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({owner: req.params.ownerId});
    res.status(200).json({
      sucess: true,
      feedbacks
    })
  } catch (error) {
    res.status(500).json({
      sucess: false,
      err: error
    })
  }
}

exports.markAsRead = async (req, res) => {
  // console.log(req.body)
  req.body.read = true;

  try {
    const feedback = await Feedback.findOneAndUpdate({
      _id: req.params.id
    }, req.body);
    res.status(200).json({
      sucess: true,
      feedback
    })
  } catch (error) {
    res.status(500).json({
      sucess: false,
      err: error
    })
  }
}

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findOneAndRemove({
      _id: req.params.id
    });
    res.status(200).json({
      sucess: true,
      feedback
    })
  } catch (error) {
    res.status(500).json({
      sucess: false,
      err: error
    })
  }
}


