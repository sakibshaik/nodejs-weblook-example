const helpers = require('../helpers');

const processClients = async (payload) => {
  const responseStatuses = { processed: [], failed: [] };
  const regiseredClients = helpers.clients.getAll();
  // eslint-disable-next-line no-plusplus
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
      const data = { token: client.token, payload };
      // eslint-disable-next-line no-await-in-loop
      await helpers.request.asyncRequest(options, data);
      responseStatuses.processed.push(client.url);
    } catch (e) {
      responseStatuses.failed.push(`${client.url} - ${e}`);
    }
  }
  return responseStatuses;
};

module.exports = { processClients };
