const Joi = require('joi');

const createValidation = request => {
  const createSchema = {
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required(),
    image: Joi.string()
  };
  return Joi.validate(request, createSchema);
};

module.exports = { createValidation };
