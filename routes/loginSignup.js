const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', checkSessionLogin, (req, res, next) => {
 	res.render('loginSignup', {
  		title: 'ToDo',
  		signupMessageError: req.flash('signupMessageError'),
		signupMessageSucess: req.flash('signupMessageSucess'),
		loginMessage: req.flash('loginMessage')
	});
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/todo',
	failureRedirect : '/',
	failureFlash : true
}));

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/',
	failureRedirect : '/',
	failureFlash : true,
	session:false
}));

function checkSessionLogin (req, res, next) {
	if(req.isAuthenticated()){
	//if user is looged in, req.isAuthenticated() will return true 
		return res.redirect(303,"/todo");
	} else{
		return next();
	}
}

module.exports = router;
