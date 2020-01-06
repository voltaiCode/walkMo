const User = require('../models/userModel');

const sessionController = {};

// passwordController.setCookie
sessionController.encrypt = (req, res, next) => {
  return next();
};
// passwordController.encrypt
sessionController.setCookie = (req, res, next) => {
  res.cookie('sessionid', '1', { httpOnly: true, secure: true });
  // may need to send this over https for security reasons
  // could potentially expose cookie in the middle of redirect to HTTP endpoint
  return next();
};
// passwordController.setSSID
// use HttpOnly
sessionController.setSSID = (req, res, next) => {
  return next();
};
