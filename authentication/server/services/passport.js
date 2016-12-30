const passport = require('passport'),
	User = require('../models/user'),
	config = require('../config'),
	JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt,
	LocalStrategry = require('passport-local');

const localOptions = {
	usernameField: 'email'
}
// Create a local strategy
const localLogin = new LocalStrategry(localOptions, function(email, password, done) {
	// Verify the email and password, call done with user.
	// if it is the correct email and password
	// otherwise, call done with false.
	User.findOne({email: email}, function(err, user) {
		if(err) {return next(err); }
		if (!user) { return done(null, false); }

		// Compare passwords - is 'password' equal to user.password?
		user.comparePassword(password, function(err, isMatch) {
			if(err) { return done(err); }
			if(!isMatch) { return done(null, false); }

			return done(null, user);
		});

	});

})

// Setup options for JWt Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create jwt strategy.
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database.
	// If it does, call done wit that other.
	// Otherwise call done with out a user object.
	User.findById(payload.sub, function(err, user) {
		if(err) { return done(err, false); }

		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}
	})

})

// Tell passport to use this strategy. 
passport.use(jwtLogin);
passport.use(localLogin);