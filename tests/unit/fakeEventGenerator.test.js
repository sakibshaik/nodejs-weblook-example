const { expect } = require('chai');
const event = require('../../helpers/event').eventBus;

describe('fakeEventsGenerator tests', () => {
  it('should recieve fake events at regular interval with valid payload', (done) => {
    let regularData = 0;
    // eslint-disable-next-line global-require
    require('../../helpers/fakeEventGenerator');
    const validator = (data) => {
      if (regularData === 3) {
        done();
        regularData += 1;
      } else {
        regularData += 1;
      }
      if (regularData > 3) {
        event.off('OrderReceived', validator);
      }

      expect(data[0]).to.have.key('productName', 'color', 'deliveryDetails', 'dispatchBy', 'orderDate', 'price');
      expect(data[0].deliveryDetails).to.have.key('firstName', 'lastName', 'street', 'county', 'city', 'country', 'zipCode');
    };
    event.on('OrderReceived', validator);
  });
});
