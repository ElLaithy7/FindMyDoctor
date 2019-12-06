const express = require('express');
const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');
const validator = require('../../validations/patientValidation');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

router.get('/', async (req, res) => {
  const patients = await Patient.find();
  return res.json({ data: patients });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);
  if (!patient) return res.status(400).send({ error: 'id not found' });
  return res.json({ data: patient });
});

router.post('/create', async (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const { email, password } = req.body;
  //checking email
  const patientEmailCheck = await Patient.findOne({ email });
  const doctorEmailCheck = await Doctor.findOne({ email });
  if (patientEmailCheck || doctorEmailCheck)
    return res.status(400).json({ error: 'Email already exists' });
  //hashing password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const patient = await Patient.create({
    ...req.body,
    password: hashedPassword
  });
  return res.json({ data: patient });
});

module.exports = router;
