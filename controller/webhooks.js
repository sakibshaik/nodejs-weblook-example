const helpers = require('../helpers');
const processor = require('./processor')

const Controller = {};

Controller.register = (req, res) => {
  let status = 200;
  if (helpers.clients.updateClients(req.body)) status = 201;
  res.status(status).send(helpers.clients.getAll());
};

Controller.triggerClients = (req, res) => {
  res.status(202).send({});
  processor.processClients();
};


module.exports = Controller;
