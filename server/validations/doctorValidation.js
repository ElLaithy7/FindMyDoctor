const Joi = require('joi');

const createValidation = request => {
  const createSchema = {
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required(),
    image: Joi.string(),
    specialization: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required()
  };
  return Joi.validate(request, createSchema);
};

module.exports = { createValidation };
