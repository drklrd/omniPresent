var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.post('/apis/common/signup', function(req, res, next) {

	


	var signUpUser = {
		username : req.body.username,
		password : req.body.password
	}

	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query("SELECT * FROM users WHERE username='" + signUpUser.username + "'", function(err, result) {
			done();
			if (err) {
				return next(err);
			} else {

				var user = result;
				if (result.length) {
					res.json({
						success: 0,
						message: 'User Already exists ! Please login '
					});
				} else {

					client.query("INSERT INTO users [username,password] VALUES('" + signUpUser.username + "','" + signUpUser.password + "')", function(err, result) {
						done();
						if (err) {
							return next(err)
						} else {
							res.json({
								success: 1,
								message: 'Successfully signed up !'
							});
						}
					});

				}

			}
		});
	});

});

router.get('/test', function(req, res) {

	res.send('Test OK!')
})


module.exports = router;