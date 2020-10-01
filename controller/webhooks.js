const helpers = require('../helpers');

const Controller = {};

Controller.register = (req, res) => {
  let status = 200;
  if (helpers.clients.updateClients(req.body)) status = 201;
  res.status(status).send(helpers.clients.getAll());
};

module.exports = Controller;
