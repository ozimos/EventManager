import {
  expect
} from 'chai';
import {
  debug
} from 'util';
import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../server/app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

const request = supertest(server);
// endpoint urls
const rootURL = '/api/v1';
const centersUrl = `${rootURL}/centers`;
const centerIdUrl = `${rootURL}/centers/c848bf5c-27ab-4882-9e43-ffe178c82602`;
const eventsUrl = `${rootURL}/events`;
const eventsIdUrl = `${rootURL}/events/c848bf5c-27ab-4882-9e43-ffe178c82602`;
// sample data for test
const user = {
  id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
  userName: 'ozimos',
  firstName: 'Tovieye',
  lastName: 'Ozi',
  email: 'tovieye.ozi@gmail.com',
  password: 'abc123',
  confirmPassword: 'abc123',
};
const adminUser = {
  id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
  userName: 'admin',
  firstName: 'Tovieye',
  lastName: 'Ozi',
  email: 'ad.min@gmail.com',
  password: 'abc123',
  confirmPassword: 'abc123',
  isAdmin: true
};
const changeCenter = {
  name: 'Codex Alexera',
  state: 'Abuja',
};
const newCenter = {
  name: 'Baranduil',
  description: 'a  dark and dank castle shrouded in gloom',
  cost: 50000,
  capacity: 5000,
  country: 'Nigeria',
  state: 'Lagos',
  lga: 'Oshodi',
  amenities: ['Pool', 'Bar'],
  eventType: ['Cocktail', 'Birthday']
};

const changeEvent = {
  name: 'Academy',
  type: ['Dinner'],
  startDate: '2018-02-17',
};

const newEvent = {
  name: 'ZAL',
  type: ['Cocktail', 'Dinner'],
  centerId: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
  numOfDays: 2,
  startDate: '2018-02-18',
  estimatedAttendance: 5000,
};
let response1, response2;

before(async () => {
  try {
    response1 = await request.post(`${rootURL}/users`).send(adminUser);
    response2 = await request.post(`${rootURL}/users`).send(user);
  } catch (error) {
    debug(error);
  }
});


describe('create admin user', () => {
  it('issues a token', () => response1.then(res => expect(res.status).to.equal(200)));
  it('returns signUp message', () => response1.then(res => expect(res.body.message.signUp).to.equal('Signup Successful')));
  it('returns login Message', () => response1.then(res => expect(res.body.message.logIn).to.equal('Login Successful')));
});

describe('create normal user', () => {
  it('issues a token', () => response2.then(res => expect(res.status).to.equal(200)));
  it('returns signUp message', () => response2.then(res => expect(res.body.message.signUp).to.equal('Signup Successful')));
  it('returns login Message', () => response2.then(res => expect(res.body.message.logIn).to.equal('Login Successful')));
});

/**
 * Generates new tests with a template
 * @param {string} title    - Title of the test
 * @param {string} method   - HTTP verb in lowercase e.g. get
 * @param {string} url      - Request URL
 * @param {object} payload  - Data to be sent to server
 * @param {string} key      - key for requested data in res.body
 * @param {string} type     - type of value for key above
 *  @returns {function} mocha test suite
 */

const templateTest = function generateTest(title, method, url, payload, key, type) {
  const token = response1.then(res => res.body.token);
  let packet;
  before(async () => {
    try {
      packet = await request[method].bind(request, url)
        .set('authorization', `JWT ${token}`).send(payload);
    } catch (err) {
      debug(err);
    }
  });
  describe(title, () => {
    it('return 200 for successful', () => {
      expect(packet.status).to.equal(200);
    });
    it('response should be json', () => {
      expect(packet.header['content-type']).to.equal(/json/);
    });
    it('response.body should have required keys', () => {
      expect(packet.body).to.include.all.keys('message', key, 'error');
    });
    it('response.body.key should be an object', () => {
      expect(packet.body[key]).to.be.a(type);
    });
  });
};

describe('API Integration Tests', () => {
  // describe('Centers Endpoint Tests', () => {
  //   templateTest('Add Center', 'post', centersUrl, newCenter, 'center', 'object');
  //   templateTest('Modify Center Details', 'put', centerIdUrl, changeCenter, 'center', 'object');
  //   templateTest('Get All Centers', 'get', centersUrl, null, 'centers', 'array');
  //   templateTest('Get Center Details', 'get', centerIdUrl, null, 'center', 'object');
  // });

  // describe('Events Endpoint Tests', () => {
  //   templateTest('Add Event', 'post', eventsUrl, newEvent, 'event', 'object');
  //   templateTest('Modify Event Details', 'put', eventsIdUrl, changeEvent, 'event', 'object');
  //   templateTest('Get All Events', 'get', eventsUrl, null, 'events', 'array');
  //   templateTest('Get Event Details', 'get', eventsIdUrl, null, 'event', 'object');
  // });
});