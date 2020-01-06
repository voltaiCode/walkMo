const User = require('../models/userModel');
const cookieParser = require('cookieParser');
const cookie = require('../models/cookieModel');
const bcrypt = require('bcrypt');

const sessionController = {};

// passwordController.setCookie
sessionController.encrypt = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // storing hashed pw at req.body.password
    req.body.password = hash;
    console.log('inside encrypt middleware', req.body.password);
  });
  // next piece of middleware is createUser
  return next();
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
          res.redirect('/main');
        } else {
          res.send('Incorrect password');
          res.redirect('/public');
        }
      });
    }
  });
  return next();
}
  ///////////////////////////
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // storing hashed pw at req.body.password
    req.body.password = hash;
    res.locals.password = hash;
    models.User.find(req.body.username, function(err, docs) {
      if (err) {
        return next({
          log:
            'user not found: ERROR: Error getting user from DB. Check credentials and try again.',
          message: {
            err: 'Error occurred in userController.getUser. Check server logs for more details.'
          }
        });
      } else {
        res.locals.user = docs;
        return next();
      }
    });
  });
};

sessionController.setSSID = (req, res, next) => {
  res.cookie('sessionid', 'replace this with db id from user', { httpOnly: true, secure: true });
  // may need to send this over https for security reasons
  // could potentially expose cookie in the middle of redirect to HTTP endpoint
  return next();
};
