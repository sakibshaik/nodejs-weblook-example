const request = require('supertest');
require('./nocker')
const app = require('../../app');

describe('POST /api/webhooks', () => {
  it('should return 201 if client is not registered', (done) => {
    request(app)
      .post('/api/webhooks')
      .send({
        url: 'https://postman-echo-test.com/post?hand=mocker',
        token: 'foo',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, [{
        url: 'https://postman-echo-test.com/post?hand=mocker',
        token: 'foo',
      }],
      done);
  });

  it('should return 200 if client is already registered and should not update the client list', (done) => {
    request(app)
      .post('/api/webhooks')
      .send({
        url: 'https://postman-echo-test.com/post?hand=mocker',
        token: 'foo',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        url: 'https://postman-echo-test.com/post?hand=mocker',
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

describe('POST /api/webhooks/test', () => {
  it('should return 201 if client is not registered and doesnt exist', (done) => {
    request(app)
      .post('/api/webhooks')
      .send({
        url: 'https://postman-echo-test.com/post?hand=mock1',
        token: 'foo',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, [{
        url: 'https://postman-echo-test.com/post?hand=mocker',
        token: 'foo',
      },
      {
        url: 'https://postman-echo-test.com/post?hand=mock1',
        token: 'foo',
      },
      ],
      done);
  });

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
