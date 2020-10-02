const nock = require('nock');
const { expect } = require('chai');

nock('https://postman-echo-test.com')
  .post('/post?hand=mocker')
  .reply(200, (uri, requestBody) => {
    describe('should recieve the request and send 200', () => {
      it('should recieve the request and send 200', (done) => {
        expect(uri).to.equal('/post?hand=mocker');
        expect(requestBody).to.deep.equal({ token: 'foo', payload: { payload: ['aaaa', { valid: 'JSON' }] } });
        done();
      });
    });
    return {
    };
  });

nock('https://postman-echo-test.com')
  .post('/post?hand=mock1')
  .reply(404, (uri, requestBody) => {
    describe('should recieve the request and send 404', () => {
      it('should recieve the request and send 200', (done) => {
        expect(uri).to.equal('/post?hand=mock1');
        expect(requestBody).to.deep.equal({ token: 'foo', payload: { payload: ['aaaa', { valid: 'JSON' }] } });
        done();
      });
    });
    return {
      error: 'page not found',
    };
  });
