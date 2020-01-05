const User = require('../models/userModel');

const userController = {};

// createUser controller
// accept bday as YYYY-MM-DD
userController.createUser = (req, res, next) => {
  const newUser = req.body;
  // console.log(newUser);
  models.User.create(newUser, function(err, docs) {
    if (err) {
      return next({
        log: 'user error: ERROR: Error creating user from DB. Check credentials and try again.',
        message: {
          err: 'Error occurred in userController.createUser. Check server logs for more details.'
        }
      });
    } else {
      res.locals.createdUser = docs;
      return next();
    }
  });
};

userController.getUser = (req, res, next) => {
  const userToFind = req.params.name; // possibly stored at in another variable (test and adjust)
  // will need to test the find on this
  models.User.find(userToFind, function(err, docs) {
    if (err) {
      return next({
        log: 'user not found: ERROR: Error getting user from DB. Check credentials and try again.',
        message: {
          err: 'Error occurred in userController.getUser. Check server logs for more details.'
        }
      });
    } else {
      res.locals.user = docs;
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
  const userID = res.locals.user._id;
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
