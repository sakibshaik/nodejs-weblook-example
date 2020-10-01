const RegisteredClients = [];
const Clients = {};

function clientUrlExists(url) {
  return RegisteredClients.some((el) => el.url === url);
}

Clients.getAll = () => RegisteredClients;

Clients.updateClients = (client) => {
  if (clientUrlExists(client.url)) {
    return false;
  }
  RegisteredClients.push(client);
  return true;
};

module.exports = Clients;
