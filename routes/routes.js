const feedback = require("../controllers/feedbackController");
const user = require("../controllers/userController");
const express = require("express");
const router = express.Router();

/* client controllers */
router.get('/', feedback.home);
router.get('/user', feedback.user);

/* user */
router.post('/create/:id', feedback.createFeedback);

/* merchant controllers */
router.post('/signup', user.signup)
router.post('/login', user.login)
router.get('/feedback/:ownerId', feedback.getFeedbackOfUser);



router.all('*', function(req, res) {
  res.send("Error 404");
});

module.exports = router;