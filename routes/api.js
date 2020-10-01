const webhooks = require("../controller/webhooks");

const paths = [
  {
    'path' : '/api/webhooks',
    'method' : 'get',
    'middlewares' : [],
    'handlers' : webhooks.register
  }
];

module.exports = paths;
