const RegisteredClients = [];
const Clients = {};

Clients.getAll = () => RegisteredClients;

Clients.updateClients = (client) => {
  RegisteredClients.push(client);
};

module.exports = Clients;
