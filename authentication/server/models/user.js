const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

// Define our model.
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

userSchema.methods.comparePassword = function(canditatePassword, callback) {
  bcrypt.compare(canditatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }
    return callback(null, isMatch);
  });
};
// Create the model class.
const ModelClass = mongoose.model('user', userSchema);
// On Save hook, ecrypt password
userSchema.pre('save', function(next) {
  // Save a reference to this object.
  const user = this;

  // Generate a Salt object.
  bcrypt.genSalt(10, (err, salt) => {
    if(err) { return next(err); }

    // Has the password string.
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) { return next(err); }
      user.password = hash;
      next();
    })
  });
});



// Export the model.
module.exports = ModelClass;
