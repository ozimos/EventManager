import {
  expect
} from 'chai';

import supertest from 'supertest';
import dotenv from 'dotenv';
import logger from '../../logger.js';
import app from '../../app.js';


dotenv.config();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

const request = supertest(server);
// endpoint urls
const rootURL = '/api/v1';
const centersUrl = `${rootURL}/centers`;
const centerIdUrl = `${rootURL}/centers/c848bf5c-27ab-4882-9e43-ffe178c82602`;
const eventsUrl = `${rootURL}/events`;
const eventsIdUrl = `${rootURL}/events/db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b`;
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
    logger.debug(error);
  }
});


describe('create admin user', () => {
  it('issues a token', () => expect(response1.status).to.equal(200));
  it('returns signUp message', () => expect(response1.body.message.signUp).to.equal('Signup Successful'));
  it('returns login Message', () => expect(response1.body.message.logIn).to.equal('Login Successful'));
});

describe('create normal user', () => {
  it('issues a token', () => expect(response2.status).to.equal(200));
  it('returns signUp message', () => expect(response2.body.message.signUp).to.equal('Signup Successful'));
  it('returns login Message', () => expect(response2.body.message.logIn).to.equal('Login Successful'));
});


describe('API Integration Tests', () => {
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

  const templateTest = (title, method, url, payload, key, type) => describe(title, () => {
    let packet;
    before(async () => {
      try {
        const promise = await new Promise((res) => {
          setTimeout(() => res(response1), 3000);
        });
        const Request = request[method].bind(request, url);
        packet = await Request()
          .set('authorization', `JWT ${promise.body.token}`).send(payload);
      } catch (err) {
        logger.debug(err);
      }
    });
    it('return 200 for successful', () => {
      expect(packet.statusCode).to.equal(200);
    });
    it('response should be json', () => {
      expect(packet.header['content-type']).to.match(/json/);
    });
    it(`response.body[key] should be an ${type}`, () => {
      expect(packet.body.row).to.be.a(type);
    });
    it('response.body[key] should include expected values', () => {
      expect(packet.body.row).to.include(payload);
    });
  });

  const templateTest2 = (title, method, url, payload, key, type) => describe(title, () => {
    let packet;
    before(async () => {
      try {
        packet = await request[method].bind(request, url)();
      } catch (err) {
        logger.debug(err);
      }
    });
    it('return 200 for successful', () => {
      expect(packet.statusCode).to.equal(200);
    });
    it('response should be json', () => {
      expect(packet.header['content-type']).to.match(/json/);
    });
    it(`response.body[key] should be an ${type}`, () => {
      expect(packet.body.row).to.be.a(type);
    });
    it('response.body[key] should include expected values', () => {
      expect(packet.body.row).to.include(payload);
    });
  });

  describe('Centers Endpoint Tests', async () => {
    await templateTest('Add Center', 'post', centersUrl, newCenter, 'row', 'object');
    await templateTest('Modify Center Details', 'put', centerIdUrl, changeCenter, 'row[1][0]', 'object');
    templateTest2('Get Center Details', 'get', centerIdUrl, changeCenter, 'row', 'object');
    templateTest2('Get All Centers', 'get', centersUrl, changeCenter, 'row[0]', 'array');
  });

  describe('Events Endpoint Tests', async () => {
    await templateTest('Add Event', 'post', eventsUrl, newEvent, 'row', 'object');
    await templateTest('Modify Event Details', 'put', eventsIdUrl, changeEvent, 'row[1][0]', 'object');
    templateTest2('Get Event Details', 'get', eventsIdUrl, changeEvent, 'row', 'object');
    templateTest2('Get All Events', 'get', eventsUrl, changeEvent, 'row[0]', 'array');
  });
});