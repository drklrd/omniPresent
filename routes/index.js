var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/apis/common/signup',function(req,res,next){

	res.json({
		success : 1,
		message : 'Successfully signed up !'
	})

});

router.get('/test',function(req,res){

		res.send('Test OK!')
})


module.exports = router;
