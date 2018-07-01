const feedback = require("../controllers/feedbackController");
const express = require("express");
const router = express.Router();

router.get('/', feedback.getAllFeedbacks);
router.post('/create', feedback.createFeedback);

router.all('*', function(req, res) {
  res.send("Error 404");
});

module.exports = router;