const User = require('../models/userModel');

const sessionController = {};

// passwordController.setCookie
sessionController.encrypt = (req, res, next) => {
  return next();
};
// passwordController.encrypt
sessionController.setCookie = (req, res, next) => {
  return next();
};
// passwordController.setSSID
// use HttpOnly
sessionController.setSSID = (req, res, next) => {
  return next();
};
