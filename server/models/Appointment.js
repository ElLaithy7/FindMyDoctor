const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientSchema = require('./Patient').schema;
const doctorSchema = require('./Doctor').schema;

const appointmentSchema = new Schema({
  doctor: {
    type: doctorSchema
  },
  patient: {
    type: patientSchema
  },
  date: {
    type: Date
  }
});

module.exports = Appointment = mongoose.model(
  'appointments',
  appointmentSchema
);
