var express = require('express');
var router = express.Router();

const title = `Welcome to File Upload Utility`;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    'message': title
  });
});

module.exports = router;
