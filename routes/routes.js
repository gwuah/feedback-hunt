const express = require("express");
const router = express.Router();


router.all('*', function(req, res) {
  res.send("Error 404");
});

module.exports = router;