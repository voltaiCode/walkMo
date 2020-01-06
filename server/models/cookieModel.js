const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cookieSchema = new Schema({
  // create cookieSchema here
  // firstName: { type: String, require: true },
  // lastName: { type: String, require: true },
  // email: { type: String, require: true },
  // password: { type: String, require: true },
});

const Cookie = mongoose.model('cookie', cookieSchema);

module.exports = {
  Cookie
};
