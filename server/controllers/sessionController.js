const User = require('../models/userModel');
const cookieParser = require('cookie-parser');
const cookie = require('../models/cookieModel');
const bcrypt = require('bcrypt');

const sessionController = {};

// passwordController.setCookie
sessionController.encrypt = (req, res, next) => {
  const saltRounds = 10;
  const hashed = bcrypt.hashSync(req.body.password, saltRounds);
  // storing hashed pw at req.body.password
  req.body.password = hashed;
  // next piece of middleware is createUser
  return next();
  // }
};

// might be redundant, but wrote this code just in case we need to do it this way for login
sessionController.checkPassword = (req, res, next) => {
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(user) {
    if (!user) {
      res.redirect('/public');
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (result == true) {
          res.locals.authenticated = true;
          res.redirect('/main');
        } else {
          res.send('Incorrect password');
          res.redirect('/public');
        }
      });
    }
  });
  return next();
};

sessionController.setSSID = (req, res, next) => {
  res.cookie('sessionid', 'replace this with db id from user', { httpOnly: true, secure: true });
  // may need to send this over https for security reasons
  // could potentially expose cookie in the middle of redirect to HTTP endpoint
  return next();
};

module.exports = sessionController;
