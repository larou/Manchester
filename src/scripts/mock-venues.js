const faker = require('faker');
const firebase = require('firebase');
const GeoFire = require('geofire');
const shortid = require('shortid');

const firebaseConfig = require('../../config/firebase');
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const firebaseVenues = database.ref('/venues');
const firebaseCategories = database.ref('/categories');
const firebaseVouchers = database.ref('/vouchers');
firebaseVouchers.set([]);
firebaseVenues.set([]);

const venueLocations = database.ref('/locations');
const geoFire = new GeoFire(venueLocations);
venueLocations.set([]);

firebaseCategories.once('value', (snapshot) => {
  const categories = [];
  snapshot.forEach((snapshot) => {
    const category = snapshot.val();
    for (const subcategory in category) {
      if (category.hasOwnProperty(subcategory) && subcategory !== '!subtitle'){
        categories.push(`${snapshot.key}|||${subcategory}`);
      }
    }
  });
  createFakes(categories);
  console.log('Done creating fakes');
});

function createFakes(categories) {
  const locations = {};
  for (let i = 0; i < 25; i++) {
    const category = faker.random.arrayElement(categories);
    const $key = `${category}|||${shortid.generate()}`;
    const fakeName = `${category} Venue ${i}`;
    const slugified = faker.helpers.slugify(fakeName);

    // Roughly Manchester.  There is probably a better way of doing this.
    const lat = parseFloat(`53.4${faker.random.number(10000)}`);
    const lng = parseFloat(`-2.2${faker.random.number(10000)}`);
    locations[$key] = [lat, lng];

    const fakeVenue = {
      name: fakeName,
      location: { lat, lng },
      subtitle: faker.company.bs(),
      bio: faker.lorem.sentences(),
      featured: faker.random.boolean(),
      createdAt: faker.date.recent().toISOString(),
      contacts: [
        {details: faker.phone.phoneNumber(), title: 'Call'},
        {details: `${faker.random.number(9)} mins away (walk)`, title: 'Directions'},
        {details: 'via Facebook', title: 'Message'},
      ],
      social: [
        {details: '/' + slugified, title: 'Facebook'},
        {details: '@' + slugified, title: 'Twitter'},
        {details: '@' + slugified, title: 'Snapchat'},
        {details: '@' + slugified, title: 'Instagram'},
      ],
      photos: [
        faker.image.cats(320, 280, true),
        faker.image.cats(320, 280, true),
        faker.image.cats(320, 280, true),
        faker.image.cats(320, 280, true),
        faker.image.cats(320, 280, true),
        faker.image.cats(320, 280, true),
      ],
      openingTimes: {
        mon: {open: '11:00', close: '22:00'},
        tue: {open: '11:00', close: '22:00'},
        wed: {open: '11:00', close: '22:00'},
        thu: {open: '11:00', close: '22:00'},
        fri: {open: '10:00', close: '23:00'},
      }
    };
    database.ref(`/venues/${$key}`).set(fakeVenue);
  }
  geoFire.set(locations);
}
