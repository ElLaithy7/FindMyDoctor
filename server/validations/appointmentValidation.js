const Joi = require('joi');

const createValidation = request => {
  const createSchema = {
    doctorId: Joi.string().required(),
    patientId: Joi.string().required(),
    date: Joi.date().required()
  };
  return Joi.validate(request, createSchema);
};

module.exports = { createValidation };
