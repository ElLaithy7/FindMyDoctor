const express = require('express');
const Doctor = require('../../models/Doctor');
const Appointment = require('../../models/Appointment');
const validator = require('../../validations/appointmentValidation');
const Patient = require('../../models/Patient');

const router = express.Router();

router.get('/', async (req, res) => {
  const appointments = await Appointment.find();
  return res.json({ data: appointments });
});

router.get('/doctorAppointments/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  const doctor = await Doctor.findById(doctorId);
  if (!doctor)
    // Bad request if not found
    return res.status(400).send({ error: 'doctor not found' });
  const query = { 'doctor._id': doctorId };
  const appointments = await Appointment.find(query);
  return res.json({ data: appointments });
});

router.get('/patientAppointments/:patientId', async (req, res) => {
  const { patientId } = req.params;
  const patient = await Doctor.findById(patientId);
  if (!patient)
    // Bad request if not found
    return res.status(400).send({ error: 'patient not found' });
  const query = { 'patient._id': patientId };
  const appointments = await Appointment.find(query);
  return res.json({ data: appointments });
});

router.post('/create', async (req, res) => {
  const { doctorId, patientId, date } = req.body;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const doctor = await Doctor.findById(doctorId);
  if (!doctor)
    // Bad request if not found
    return res.status(400).send({ error: 'doctor not found' });
  const patient = await Patient.findById(patientId);
  if (!patient)
    // Bad request if not found
    return res.status(400).send({ error: 'patient not found' });
  const appointment = await Appointment.create({
    doctor,
    patient,
    date
  });
  return res.json({ data: appointment });
});

module.exports = router;
