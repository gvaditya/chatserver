var express = require('express');
var router = express.Router();
console.log("index js 1");
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index js 2");
  res.render('index', { title: 'Express' });
});
module.exports = router;
