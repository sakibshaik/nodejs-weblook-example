const helpers = require('../helpers');

const processClients = async () => {
  const responseStatuses = { processed: [], failed: [] };
  const regiseredClients = helpers.clients.getAll();
  for (let index = 0; index < regiseredClients.length; index++) {
    const client = regiseredClients[index];
    const url = new URL(client.url);
    const options = {
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };
    try {
      // eslint-disable-next-line no-await-in-loop
      await helpers.request.asyncRequest(options, client);
      responseStatuses.processed.push(client.url);
    } catch (e) {
      responseStatuses.failed.push(`${client.url} - ${e}`);
    }
  }
  return responseStatuses;
};

module.exports = { processClients };
