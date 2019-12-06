const express = require('express');
const Patient = require('../../models/Patient');
const Doctor = require('../../models/Doctor');
const validator = require('../../validations/doctorValidation');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const tokenKey = process.env.SECRET_OR_KEY;

const router = express.Router();

router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  return res.json({ data: doctors });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);
  if (!doctor) return res.status(400).send({ error: 'id not found' });
  return res.json({ data: doctor });
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
  const doctor = await Doctor.create({
    ...req.body,
    password: hashedPassword
  });
  return res.json({ data: doctor });
});

router.post('/login', async (req, res) => {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  const { email, password } = req.body;
  let user = await Doctor.findOne({ email });
  if (!user) {
    user = await Patient.findOne({ email });
  }
  if (!user) return res.status(400).json({ error: 'Email does not exist' });
  const match = bcrypt.compareSync(password, user.password);
  if (match) {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' });
    return res.json({ data: `Bearer ${token}` });
  } else return res.status(400).send({ error: 'Wrong password' });
});

router.put('/rate/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  const { patientId } = req.body;
  const schema = {
    patientId: Joi.string().required(),
    rating: Joi.number().required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(400).json({ error: 'Doctor not found' });
  }
  const rating = doctor.ratings.find(rating => rating.patientId == patientId);
  if (!rating) {
    doctor.ratings.push(req.body);
  } else {
    const ratingIndex = doctor.ratings.indexOf(rating);
    doctor.ratings[ratingIndex] = req.body;
  }
  await Doctor.findOneAndUpdate({ _id: doctorId }, doctor, {
    new: true
  });
  return res.sendStatus(200);
});

module.exports = router;
