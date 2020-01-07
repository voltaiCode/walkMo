const userModel = require('../models/userModel');
const cookieParser = require('cookie-parser');
const cookie = require('../models/cookieModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userController = {};

// createUser controller
// accept bday as YYYY-MM-DD
userController.createUser = (req, res, next) => {
  // password should have been hashed in previous middleware
  const newUser = req.body;
  if (res.locals.user == null) {
    userModel.User.create(newUser, function(err, docs) {
      if (err) {
        return next({
          log: 'user error: ERROR: Error creating user in DB.',
          message: {
            err: 'Error creating new user.'
          }
        });
      } else {
        res.locals.createdUser = docs;
        res.locals.authenticated = true;
        return next();
      }
    });
  } else {
      res.locals.authenticated = false;
      return next();
  }
};

userController.getUser = (req, res, next) => {
  const userToFind = {
    email: req.body.email
  }; // possibly stored at in another variable (test and adjust)
  console.log('current pos: userController.getUser');
  userModel.User.findOne(userToFind, function(err, docs) {
    if (err) {
      return next({
        log: 'user not found: ERROR: Error getting user from DB. Check credentials and try again.',
        message: {
          err: 'Error occurred in userController.getUser. Check server logs for more details.'
        }
      });
    } else {
      res.locals.user = docs;
      if (!res.locals.user) res.locals.authenticated = false;
      return next();
    }
  });
};

userController.addWalk = (req, res, next) => {
  // previous middleware will be getUser, and we will update the user object (or just push new routes)
  // will have to troubleshoot this once connection is made
  const completedWalk = req.body; // will have to test and adjust for proper location of this data
  // push completedWalk(s) to user prevRoutes array
  res.locals.user.prevRoutes.push(completedWalk);
  // findAndUpdate user's prevRoutes in DB
  // may need to adjust during integration testing
  const userID = req.params.id;
  models.User.findByIdAndUpdate(userID, function(err, docs) {
    if (err) {
      return next({
        log: 'user db error: ERROR: Error getting user from DB. Check credentials and try again.',
        message: {
          err: 'Error occurred in userController.addWalk. Check server logs for more details.'
        }
      });
    } else {
      // store newly updated doc for return to the frontend
      res.locals.user = docs;
      return next();
    }
  });
};
module.exports = userController;
