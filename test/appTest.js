import chai from 'chai';
import supertest from 'supertest';
import app from '../server/app.js';


const chaiExpect = chai.expect;
const request = supertest(app);

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
 * @param {string} title
 * @param {string} method
 * @param {string} url
 * @param {object} payload
 * @param {string} key
 * @param {string} type
 *  @returns {function} mocha test suite
 */

const templateTest = function generateTest(title, method, url, payload, key, type) {
  describe(title, () => {
    const postRequest = request[method].bind(request, url);
    it('return 200 for successful', (done) => {
      postRequest()
        .send(payload)
        .expect(200, done);
    });
    it('response should be json', (done) => {
      postRequest()
        .send(payload)
        .expect('Content-Type', /json/, done);
    });
    it('response should have required keys', (done) => {
      postRequest()
        .send(payload)
        .end((err, res) => {
          chaiExpect(res.body).to.include.all.keys('message', key, 'error');
          done();
        });
    });
    it('response should be an object', (done) => {
      postRequest()
        .send(payload)
        .end((err, res) => {
          chaiExpect(res.body[key]).to.be.an(type);
          done();
        });
    });
  });
};


describe('API Integration Tests', () => {
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
