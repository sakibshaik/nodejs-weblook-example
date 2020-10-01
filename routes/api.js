const webhooks = require('../controller/webhooks');
const helpers = require('../helpers');

const paths = [
  {
    path: '/api/webhooks',
    method: 'post',
    middlewares: [helpers.validate.registerPayload],
    handlers: webhooks.register,
  },
];

module.exports = paths;
