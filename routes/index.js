var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld',(req ,res) => res.render('helloworld',{title: 'Hello, World!'}));

router.get('/userlist',(req, res) => {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},(e,docs)=>{
    res.render('userlist',{'userlist':docs})
  })
});

//add user
router.get('/newuser', (req, res) => res.render('newuser',{title:"Add New User"}))

router.post('/adduser',(req, res) =>{
  var db = req.db;

  var username = req.body.username;
  var email = req.body.useremail;

  var collection = db.get('usercollection');

  collection.insert({username,email}, (err, doc) => {
    if (err){
      res.send('There was a problen adding the information to the database.');
    }
    else {
      res.redirect("userlist");
    }
  });
});
module.exports = router;
