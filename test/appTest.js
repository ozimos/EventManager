import chai from 'chai';
import supertest from 'supertest';
import app from '../server/app.js';

const chaiExpect = chai.expect;
const request = supertest(app);
const rootURL = '/api/v1';
const centersUrl = `${rootURL}/centers`;
const centerIdUrl = `${rootURL}/centers/1`;
const eventsUrl = `${rootURL}/events`;
const eventsIdUrl = `${rootURL}/events/1`;

const newCenter = {
  name: 'Baranduil',
  description: 'a  dark and dank castle shrouded in gloom',
  cost: 50000,
  capacity: 5000,
  country: 'Nigeria',
  state: 'Lagos',
  lga: 'Oshodi',
  amenities: ['Pool', 'Bar'],
  eventTypes: ['Cocktail', 'Birthday']
};

/**
 * Generates new tests with a template
 * @param {string} title
 * @param {string} method
 * @param {string} url
 * @param {object} payload
 * @param {string} key
 *  @returns {function} mocha test suite
 */

const templateTest = function generateTest(title, method, url, payload, key) {
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
    it('response should be an object', (done) => {
      postRequest()
        .send(payload)
        .end((err, res) => {
          chaiExpect(res.body).to.be.an('object');
          done();
        });
    });
    it('response should have required keys', (done) => {
      postRequest()
        .send(payload)
        .end((err, res) => {
          chaiExpect(res.body).to.include.all.keys('message', key, 'error');
          done();
        });
    });
  });
};


describe('API Integration Tests', () => {
  describe('Get All Centers', () => {
    it('return 200 for successful', (done) => {
      request.get(centersUrl)
        .expect(200, done);
    });
    it('response should be json', (done) => {
      request.get(centersUrl)
        .expect('Content-Type', /json/, done);
    });
    it('response should be an object', (done) => {
      request.get(centersUrl)
        .end((err, res) => {
          chaiExpect(res).to.be.an('object');
          done();
        });
    });
    it('response should have required keys', (done) => {
      request.get(centersUrl)
        .end((err, res) => {
          chaiExpect(res.body).to.include.all.keys('message', 'centers');
          done();
        });
    });
  });
  describe('Get Center Details', () => {
    it('return 200 for successful', (done) => {
      request.get(centerIdUrl)
        .expect(200, done);
    });
    it('response should be json', (done) => {
      request.get(centerIdUrl)
        .expect('Content-Type', /json/, done);
    });
    it('response should be an object', (done) => {
      request.get(centerIdUrl)
        .end((err, res) => {
          chaiExpect(res).to.be.an('object');
          done();
        });
    });
    it('response should have required keys', (done) => {
      request.get(centerIdUrl)
        .end((err, res) => {
          chaiExpect(res.body).to.include.all.keys('message', 'center');
          done();
        });
    });
  });
  describe('Modify Center Details', () => {
    it('return 200 for successful', (done) => {
      request.put(centerIdUrl)
        .send({
          name: 'Codex Alexera',
          state: 'Abuja',
        })
        .expect(200, done);
    });
    it('response should be json', (done) => {
      request.put(centerIdUrl)
        .send({
          name: 'Codex Alexera',
          state: 'Abuja',
        })
        .expect('Content-Type', /json/, done);
    });
    it('response should be an object', (done) => {
      request.put(centerIdUrl)
        .send({
          name: 'Codex Alexera',
          state: 'Abuja',
        })
        .end((err, res) => {
          chaiExpect(res).to.be.an('object');
          done();
        });
    });
    it('response should have required keys', (done) => {
      request.put(centerIdUrl)
        .send({
          name: 'Codex Alexera',
          state: 'Abuja',
        })
        .end((err, res) => {
          chaiExpect(res.body).to.include.all.keys('message', 'center');
          done();
        });
    });
  });

  templateTest('Add center', 'post', centersUrl, newCenter, 'center');
});