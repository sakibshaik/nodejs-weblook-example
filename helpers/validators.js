const Joi = require('@hapi/joi');

const validate = {};

const registerPayload1 = Joi.object({
  url: Joi.string().uri({
    scheme: [
      /https?/,
    ],
  }).required(),
  token: Joi.string().required(),
});

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

validate.registerPayload = (req, res, next) => {
  const { error } = registerPayload1.validate(req.body, options);
  if (error) {
    return res.status(400).send({ error: error.details.map((x) => x.message) });
  }
  next();
};

module.exports = validate;
