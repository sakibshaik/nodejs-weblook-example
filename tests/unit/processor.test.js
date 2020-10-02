const { expect } = require('chai');
const sinon = require('sinon');
const processor = require('../../controller/processor');
const request = require('../../helpers/request');
const clients = require('../../helpers/clients');

describe('processor tests', () => {
  let requestStub;
  let clientStub;
  beforeEach(() => {
    requestStub = sinon.stub(request, 'asyncRequest').callsFake((options, data) => new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      const status = data.token === 'fail-it' ? reject({ statusCode: 400 }) : resolve({ statusCode: 200 });
      resolve({ statusCode: status });
    }));

    clientStub = sinon.stub(clients, 'getAll').callsFake(() => [{
      url: 'https://postman-echo.com/post?hand=randomName1',
      token: 'token-1',
    },
    {
      url: 'https://postman-echo.com/post?hand=randomName2',
      token: 'token-2',
    },
    {
      url: 'https://postman-echo.com/post?hand=randomName3',
      token: 'fail-it',
    },
    ]);
  });

  afterEach(() => {
    requestStub.restore();
    clientStub.restore();
  });

  it('should process all the clients successfully', (done) => {
    processor.processClients({ payload: ['testing', { valid: 'JSON' }] }).then((processedClients) => {
      expect(processedClients.processed.length).to.equal(2);
      expect(processedClients.failed.length).to.equal(1);
      done();
    });
  });
});
