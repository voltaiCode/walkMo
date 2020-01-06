// Bring in requirements
const express = require('express');
const bodyParser = require('body-parser');
// Gives path of current
const path = require('path');
// fake require in for models (testing)
const models = require('./models/userModel');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const webpack = require('webpack');

const PORT = 3000;

const app = express();

// Parsing JSON req body from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sign-up user
app.post(
  '/signup',
  sessionController.encrypt,
  userController.getUser,
  userController.createUser,
  (req, res) => {
    // res.status(200).send('route to user page');
    // front end needs - authentication: boolean, all user info
    if (res.locals.authenticated === true) {
      res.status(200).json('works just fine');
    } else {
      res.status(418).json('I am a teapot');
    }
  }
);

// login user
app.post(
  '/login',
  // sessionController.encrypt,
  userController.getUser,
  sessionController.checkPassword,
  (req, res) => {
    if (res.locals.authenticated === true) {
      console.log('current pos: server response for post req to login');
      res.status(200).json(res.locals.user);
      // front end needs - authentication: boolean, all user info
    } else {
      // authentication failed and returns a simple false
      res.status(400).json(res.locals.authenticated);
    }
  }
);

// Might need this
app.get('/stats', (req, res) => {});
// MVP
// create walk route (possibly -> this will likely be handled on the frontend)
// req.body location of user and number of miles user wants to walk
// fetch walk destination, an address from yelp api
// res.body walk destination address, route, and distance

// Walk is Complete
app.post('/completed', userController.addWalk, (req, res) => {
  // userController.addWalk
  res.status(200).json('sick walk');
});

// default for serving index
app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// catch-all route handler for any requests to an unknown route
app.use('/*', (req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
