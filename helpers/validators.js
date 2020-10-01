const Joi = require('@hapi/joi');

const validate = {};

const registerPayload = Joi.object({
  url: Joi.string().uri({
    scheme: [
      /https?/,
    ],
  }).required(),
  token: Joi.string().required(),
});

const triggerClients = Joi.object({
  payload: Joi.array().items(
    Joi.string().required(),
    Joi.object().keys({
      valid: Joi.string().required(),
    }),
  ).required(),
}).required();

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

validate.registerPayload = (req, res, next) => {
  const { error } = registerPayload.validate(req.body, options);
  if (error) {
    return res.status(400).send({ error: error.details.map((x) => x.message) });
  }
  return next();
};

validate.triggerClients = (req, res, next) => {
  const { error } = triggerClients.validate(req.body, options);
  if (error) {
    return res.status(400).send({ error: error.details.map((x) => x.message) });
  }
  return next();
};

module.exports = validate;
