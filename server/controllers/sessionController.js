const userModel = require('../models/userModel');
const cookieParser = require('cookie-parser');
const cookie = require('../models/cookieModel');
const bcrypt = require('bcrypt');

const sessionController = {};

// passwordController.setCookie
sessionController.encrypt = (req, res, next) => {
  console.log('current pos: sessionController.encrypt');
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
  console.log('current pos: sessionController.checkPassword');
  userModel.User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) {
        return next(err);
      } else {
        // bcrypt.compareSync(passwords[i], userObj.password)
        const inputPassword = bcrypt.compareSync(req.body.password, user.password);

        // bcrypt.compare(req.body.password, user.password, function(err, result) {
        // console.log(err);
        if (inputPassword == true) {
          console.log('line 37');
          res.locals.authenticated = true;
          // return next();
          // res.redirect('/main');
          return next();
        } else {
          res.locals.authenticated = false;
          // return next();
          // res.send('Incorrect password');
          // res.redirect('/public');
          return next();
        }
        // });
        console.log('at bottom of .then bycryptCompare');
        // }
      }

      console.log('current pos: sessionController.checkPassword BOTTOM');
    }
  );
};

sessionController.setSSID = (req, res, next) => {
  res.cookie('sessionid', 'replace this with db id from user', { httpOnly: true, secure: true });
  // may need to send this over https for security reasons
  // could potentially expose cookie in the middle of redirect to HTTP endpoint
  return next();
};

module.exports = sessionController;
