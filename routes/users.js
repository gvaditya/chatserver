var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/register',function(req,res,next){
  var User = require('../models/user_schema');
  var newUser = new User({name:req.body.name,password:req.body.pass});
  newUser.save(function (err, newUser) {
    if (err){
      return console.error(err);
    }
    res.redirect('../');
  });
});

router.post('/login',function(req,res,next){
  var User = require('../models/user_schema');
  console.log('name'+req.body.name+' password'+ req.body.pass);
  User.findOne({ 'name': req.body.name,'password': req.body.pass},function (err, users) {
    if ((users==null)||(err)) {
      res.redirect('/users');
    }
    res.render("index",{myObject:users});
  });
});
module.exports = router;
