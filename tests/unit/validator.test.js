const { expect } = require('chai');
const sinon = require('sinon');
const validator = require('../../helpers/validators');

describe('validation scheme registerPayload scenarios', () => {
  let req = {};
  let res = {};

  beforeEach(() => {
    res = {};
    req = {};
  });

  it('should return 400 if token is blank', (done) => {
    req = {
      body: {
        url: 'http://requestbin.fullcontact.com/rf385urfa',
        token: '',
      },
    };

    res = {
      status(status) {
        expect(status).to.equal(400);
        return res;
      },
      send(payload) {
        expect(payload.error[0]).to.equal('"token" is not allowed to be empty');
        done();
      },
    };
    const spyStatus = sinon.spy(res, 'status');
    const spySend = sinon.spy(res, 'send');
    validator.registerPayload(req, res, () => {});
    spyStatus.restore();
    spySend.restore();
    sinon.assert.calledOnce(spyStatus);
    sinon.assert.calledOnce(spySend);
  });

  it('should return 400 if url is not in correct format', (done) => {
    req = {
      body: {
        url: 'requestbin.fullcontact.com/rf385urfa',
        token: 'valid-token',
      },
    };

    res = {
      status(status) {
        expect(status).to.equal(400);
        return res;
      },
      send(payload) {
        expect(payload.error[0]).to.equal('"url" must be a valid uri with a scheme matching the https? pattern');
        done();
      },
    };
    const spyStatus = sinon.spy(res, 'status');
    const spySend = sinon.spy(res, 'send');
    validator.registerPayload(req, res, () => {});
    spyStatus.restore();
    spySend.restore();
    sinon.assert.calledOnce(spyStatus);
    sinon.assert.calledOnce(spySend);
  });

  it('should return 400 with empty body', (done) => {
    req = {
      body: {},
    };

    res = {
      status(status) {
        expect(status).to.equal(400);
        return res;
      },
      send(payload) {
        expect(payload.error[0]).to.equal('"url" is required');
        done();
      },
    };
    const spyStatus = sinon.spy(res, 'status');
    const spySend = sinon.spy(res, 'send');
    validator.registerPayload(req, res, () => {});
    spyStatus.restore();
    spySend.restore();
    sinon.assert.calledOnce(spyStatus);
    sinon.assert.calledOnce(spySend);
  });

  it('should return 200 for valid input', (done) => {
    req = {
      body: {
        url: 'http://requestbin.fullcontact.com/rf385urfa',
        token: 'valid-token-012',
      },
    };
    res = {
      status(status) {
        expect(status).to.equal(400);
        return res;
      },
      send(payload) {
        expect(payload.error[0]).to.equal('"url" is required');
        done();
      },
    };
    const spyStatus = sinon.spy(res, 'status');
    const spySend = sinon.spy(res, 'send');
    validator.registerPayload(req, res, () => { done(); });
    spyStatus.restore();
    spySend.restore();
    sinon.assert.notCalled(spyStatus);
    sinon.assert.notCalled(spySend);
  });
});

describe('validation scheme triggerClients scenarios', () => {
  let req = {};
  let res = {};

  beforeEach(() => {
    res = {};
    req = {};
  });

  it('should return 400 if fields are blank', (done) => {
    req = {
      body: {
        payload: ['', { valid: 'JSON' }],
      },
    };

    res = {
      status(status) {
        expect(status).to.equal(400);
        return res;
      },
      send(payload) {
        expect(payload.error[0]).to.equal('"payload[0]" does not match any of the allowed types');
        expect(payload.error[1]).to.equal('"payload" does not contain 1 required value(s)');
        done();
      },
    };
    const spyStatus = sinon.spy(res, 'status');
    const spySend = sinon.spy(res, 'send');
    validator.triggerClients(req, res, () => {});
    spyStatus.restore();
    spySend.restore();
    sinon.assert.calledOnce(spyStatus);
    sinon.assert.calledOnce(spySend);
  });

  it('should return 400 if payload is empty', (done) => {
    req = {
      body: {
        payload: [],
      },
    };

    res = {
      status(status) {
        expect(status).to.equal(400);
        return res;
      },
      send(payload) {
        expect(payload.error[0]).to.equal('"payload" does not contain 1 required value(s)');
        done();
      },
    };
    const spyStatus = sinon.spy(res, 'status');
    const spySend = sinon.spy(res, 'send');
    validator.triggerClients(req, res, () => {});
    spyStatus.restore();
    spySend.restore();
    sinon.assert.calledOnce(spyStatus);
    sinon.assert.calledOnce(spySend);
  });

  it('should return 400 with empty body', (done) => {
    req = {
      body: {},
    };

    res = {
      status(status) {
        expect(status).to.equal(400);
        return res;
      },
      send(payload) {
        expect(payload.error[0]).to.equal('"payload" is required');
        done();
      },
    };
    const spyStatus = sinon.spy(res, 'status');
    const spySend = sinon.spy(res, 'send');
    validator.triggerClients(req, res, () => {});
    spyStatus.restore();
    spySend.restore();
    sinon.assert.calledOnce(spyStatus);
    sinon.assert.calledOnce(spySend);
  });

  it('should return 200 for valid input', (done) => {
    req = {
      body: {
        payload: ['aaaa', { valid: 'JSON' }],
      },
    };
    res = {
      status(status) {
        expect(status).to.equal(400);
        return res;
      },
      send(payload) {
        expect(payload.error[0]).to.equal('"payload" is required');
        done();
      },
    };
    const spyStatus = sinon.spy(res, 'status');
    const spySend = sinon.spy(res, 'send');
    validator.triggerClients(req, res, () => { done(); });
    spyStatus.restore();
    spySend.restore();
    sinon.assert.notCalled(spyStatus);
    sinon.assert.notCalled(spySend);
  });
});
