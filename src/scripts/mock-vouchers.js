const admin = require('firebase-admin');
const faker = require('faker');

const adminConfig = require('../../config/firebase-admin');

admin.initializeApp(adminConfig);

const database = admin.database();

const firebaseVenues = database.ref('/venues');
const firebaseVouchers = database.ref('/vouchers');
firebaseVouchers.set([]);

firebaseVenues.once('value', (snapshot) => {
  for (const venueId in snapshot.val()) {
    for (let i = 0; i < 6; i++) {
      firebaseVouchers.push({
        venueId,
        title: faker.company.bs(),
        subtitle: faker.lorem.sentence(),
        description: faker.lorem.sentences(),
        disabled: faker.random.boolean(),
        featured: (faker.random.number(100) < 20),
        availability: {
          days: ['mon', 'tue', 'wed'],
          startTime: '11:00',
          endTime: '18:00',
        },
        priority: faker.random.number(100000),
      });
    }
  }
  console.log('Done creating fakes');
});
