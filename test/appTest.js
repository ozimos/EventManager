import {
  expect
} from 'chai';
import supertest from 'supertest';
import app from '../server/app.js';

const server = app.listen();
const request = supertest(server);

// endpoint urls
const rootURL = '/api/v1';
const centersUrl = `${rootURL}/centers`;
const centerIdUrl = `${rootURL}/centers/1`;
const eventsUrl = `${rootURL}/events`;
const eventsIdUrl = `${rootURL}/events/1`;
// sample data for test
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
  startDate: '2018-01-17',
};

const newEvent = {
  name: 'ZAL',
  type: ['Cocktail', 'Dinner'],
  centerId: 200,
  duration: 2,
  startDate: '2017-12-17',
  estimatedAttendance: 5000,
};

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
  describe(title, () => {
    const Request = request[method].bind(request, url);
    it('return 200 for successful', async () => {
      try {
        const response = await Request().send(payload);
        expect(response.status).to.equal(200);
      } catch (err) {
        throw err;
      }
    });
    it('response should be json', async () => {
      try {
        const response = await Request().send(payload);
        expect(response.header).to.include.all.keys('content-type');
        expect(response.header['content-type']).to.match(/json/);
      } catch (err) {
        throw err;
      }
    });
    it('response.body should have required keys', async () => {
      try {
        const response = await Request().send(payload);
        expect(response.body).to.include.all.keys('message', key, 'error');
      } catch (err) {
        throw err;
      }
    });
    it('response.body.key should be an object', async () => {
      try {
        const response = await Request().send(payload);
        return expect(response.body[key]).to.be.a(type);
      } catch (err) {
        throw err;
      }
    });
  });
};

describe('API Integration Tests', () => {
  after(async () => {
    await server.close();
  });
  describe('Centers Endpoint Tests', () => {
    templateTest('Get All Centers', 'get', centersUrl, null, 'centers', 'array');
    templateTest('Get Center Details', 'get', centerIdUrl, null, 'center', 'object');
    templateTest('Modify Center Details', 'put', centerIdUrl, changeCenter, 'center', 'object');
    templateTest('Add Center', 'post', centersUrl, newCenter, 'center', 'object');
  });

  describe('Events Endpoint Tests', () => {
    templateTest('Get All Events', 'get', eventsUrl, null, 'events', 'array');
    templateTest('Get Event Details', 'get', eventsIdUrl, null, 'event', 'object');
    templateTest('Modify Event Details', 'put', eventsIdUrl, changeEvent, 'event', 'object');
    templateTest('Add Event', 'post', eventsUrl, newEvent, 'event', 'object');
  });
});
