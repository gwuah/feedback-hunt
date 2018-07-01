const feedback = require("../controllers/feedback");
const express = require("express");
const router = express.Router();

router.post('/create', feedback.createFeedback)

router.all('*', function(req, res) {
  res.send("Error 404");
});

module.exports = router;