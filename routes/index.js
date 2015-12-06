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
		username: req.body.username,
		password: req.body.password
	};

	var conString = 'postgres://jpktrpwpkpudcn:jhmwPUIJ2gDdyfP8hG8_Ejxg5N@ec2-107-21-219-109.compute-1.amazonaws.com:5432/d9j617e8naorrt';

	pg.connect(conString, function(err, client, done) {
		if (err) {
			console.error('error fetching client from pool', err);
			return next(err);
		}
		client.query("SELECT * FROM users WHERE username='" + signUpUser.username + "'", function(err, result) {
			done();

			if (err) {
				return console.error('error running query', err);
			}
			if (result.rows.length) {
				res.json({
					success: 0,
					message: 'User Already exists ! Please login '
				});
			} else {

				client.query("INSERT INTO users (username,password) VALUES('" + signUpUser.username + "','" + signUpUser.password + "')", function(err, result) {
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
		});
	});


});

router.post('/apis/common/signup', function(req, res, next) {



	var user = {
		username: req.body.username,
		password: req.body.password
	};

	var conString = 'postgres://jpktrpwpkpudcn:jhmwPUIJ2gDdyfP8hG8_Ejxg5N@ec2-107-21-219-109.compute-1.amazonaws.com:5432/d9j617e8naorrt';

	pg.connect(conString, function(err, client, done) {
		if (err) {
			console.error('error fetching client from pool', err);
			return next(err);
		}
		client.query("SELECT * FROM users WHERE username='" + signUpUser.username + "'", function(err, result) {
			done();

			if (err) {
				return next(err);
			}
			if (result.rows.length) {

				var credential = result.rows[0].password;
				if(credential ===  user.password) {

					res.json({
						success: 1,
						message: 'Authorization Successful'
					});

				}else{

					res.json({
						success: 0,
						message: ' Password doesnt match '
					});

				}


				
			} else {

				res.json({
					success: 0,
					message: 'User Doesnt exists ! '
				});

				
			}
		});
	});


});




module.exports = router;