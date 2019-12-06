const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  specialization: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  ratings: {
    type: [Object]
  }
});

module.exports = Doctor = mongoose.model('doctors', doctorSchema);
