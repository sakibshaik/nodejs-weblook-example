const webhooks = require('../controller/webhooks');

const paths = [
  {
    path: '/api/webhooks',
    method: 'post',
    middlewares: [],
    handlers: webhooks.register,
  },
];

module.exports = paths;
