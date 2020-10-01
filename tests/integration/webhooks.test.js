const request = require('supertest');
const app = require('../../app');

describe('POST /api/webhooks', () => {
  it('should return 201 if client is not registered', (done) => {
    request(app)
      .post('/api/webhooks')
      .send({
        url: 'https://requestbin.fullcontact.com/rf385urf',
        token: 'foo',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, [{
        url: 'https://requestbin.fullcontact.com/rf385urf',
        token: 'foo',
      }],
      done);
  });

  it('should return 200 if client is already registered and should not update the client list', (done) => {
    request(app)
      .post('/api/webhooks')
      .send({
        url: 'https://requestbin.fullcontact.com/rf385urf',
        token: 'foo',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        url: 'https://requestbin.fullcontact.com/rf385urf',
        token: 'foo',
      }],
      done);
  });

  it('should return 400 on bad request', (done) => {
    request(app)
      .post('/api/webhooks')
      .send({
        urls: 'https://requestbin.fullcontact.com/rf385urfa',
        tokens: 'foo',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, {
        error: [
          '"url" is required',
          '"token" is required',
        ],
      },
      done);
  });
});

describe('POST /api/webhooks/describe', () => {
  it('should return 202 if client is not registered', (done) => {
    request(app)
      .post('/api/webhooks/test')
      .send({
        payload: ['aaaa', { valid: 'JSON' }],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202, {}, done);
  });
  it('should return 400 on bad request', (done) => {
    request(app)
      .post('/api/webhooks/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { error: ['"payload" is required'] },
        done);
  });
});
