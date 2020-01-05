const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://walkmoAdmin:pikachu33@voltaicode-hm860.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // using new options for parsing the URI - prev method deprecated
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets dbName in connected Cluster
    dbName: 'walkmo'
  })
  .then(() => console.log('Connected to Mongo DB: WalkMo'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  // change to accept Month, Day, Year
  birthdate: { type: String },
  createdAt: { type: Date, default: Date.now },
  prevRoutes: [
    {
      // Note that longitude comes first in a GeoJSON coordinate array, not latitude
      origin: {
        type: {
          type: String, // Don't do `{ origin: { type: String } }`
          enum: ['Point'], // 'origin.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      destination: {
        type: {
          type: String, // Don't do `{ destination: { type: String } }`
          enum: ['Point'], // 'destination.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      miles: { type: Number, required: true },
      points: { type: Number, required: true }
    }
  ]
});

const User = mongoose.model('user', userSchema);

module.exports = {
  User
};
