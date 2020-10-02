const faker = require('faker');

const event = require('./event').eventBus;

const frequency = process.env.GENERATORFREQUENCY || 5000;


function generateRandomData() {
  return {
    productName: faker.commerce.productName(),
    price: `$ ${faker.commerce.price()}`,
    color: faker.commerce.color(),
    orderDate: faker.date.recent(),
    dispatchBy: faker.date.soon(),
    deliveryDetails: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      county: faker.address.county(),
      city: faker.address.city(),
      country: faker.address.country(),
      zipCode: faker.address.zipCode(),
    },
  };
}

setInterval(() => {
  const payload = [];
  const randomNumber = Math.floor(Math.random() * 10);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= randomNumber; i++) {
    payload.push(generateRandomData());
  }
  event.emit('OrderReceived', payload);
}, frequency);
