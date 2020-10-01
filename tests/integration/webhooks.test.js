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
});
