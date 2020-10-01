const request = require('supertest');
const app = require('../../app');

describe('GET /api/webhooks', () => {
  it('responds with json', (done) => {
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
