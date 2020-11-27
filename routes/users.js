var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
/* GET User rating here */

router.get('/addRating', (req, res) => {
  res.render('rating.html');
});

module.exports = router;
