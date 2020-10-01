const helpers = require('../helpers');

const Controller = {};

Controller.register = (req, res) => {
  helpers.clients.updateClients(req.body);
  res.status(200).send(helpers.clients.getAll());
};

module.exports = Controller;
