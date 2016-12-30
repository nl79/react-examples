const User = require('../models/user'),
  jwt = require('jwt-simple'),
  config = require('../config');

function tokenForUser(user) {
  // Subject is the user._id
  const timestamp = new Date().getTime();

  return jwt.encode(
    { 
      // subject
      sub: user._id, 
      // Issue At Time
      iat: timestamp 
    }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd,
  // we just need to give them a token.
  res.send({token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({error: 'You must provide Email and Password'});
  }

  // See if a user with the given email exists.
  User.findOne({email: email}, (err, existingUser) => {
    if(err) { next(err); }

    if(existingUser) {
      return res.status(422).send({error: 'Email is in use'});
    }

    // If a user with email does exist, return an error.
    const user = new User({
      email: email,
      password: password
    });

    user.save((err, user) => {
      if(err){ next(err); }
      console.log(user);
      res.send({ token: tokenForUser(user)});
    });
  });
}
