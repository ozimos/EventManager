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
  id: 1,
  name: 'Baranduil',
  description: 'a  dark and dank castle shrouded in gloom',
  cost: 50000,
  capacity: 5000,
  location: {
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'Oshodi'
  },
  amenities: ['Pool', 'Bar'],
  eventType: ['Cocktail', 'Birthday']
};

// const getRequest = request.get();
// const putRequest = request.put();
// const postRequest = request.post();
// const deleteRequest = request.delete();

/**
 * Generates new tests with a template
 * @param {string} title
 * @param {string} method
 * @param {string} url
 * @param {object} payload
 * @param {string} key
 *  @returns {function} mocha test suite
 */
// const templateTest = function generateTest(title, method, url, payload, key) {
//   return () => {
//     describe(title, () => {
//       it('return 200 for successful', (done) => {
//         method.bind(null, url)
//           .send(payload)
//           .expect(200, done);
//       });
//       it('response should be json', (done) => {
//         method.bind(null, url)
//           .send(payload)
//           .expect('Content-Type', /json/, done);
//       });
//       it('response should be an object', (done) => {
//         method.bind(null, url)
//           .send(payload)
//           .end((err, res) => {
//             chaiExpect(res.json).to.be.an('object');
//             done();
//           });
//       });
//       it('response should have required keys', (done) => {
//         method.bind(null, url)
//           .send(payload)
//           .end((err, res) => {
//             chaiExpect(res).to.include.all.keys('message', 'centers');
//          chaiExpect(res).to.not.have.all.keys('message', 'center');
//             done();
//           });
//       });
//     });
//   };
// };


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
          chaiExpect(res).to.not.have.all.keys('message', 'center');
          chaiExpect(res).to.include.all.keys('message', 'centers');
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
          chaiExpect(res).to.not.have.all.keys('message', 'center');
          chaiExpect(res).to.include.all.keys('message', 'center');
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
          chaiExpect(res).to.not.have.all.keys('message', 'center');
          chaiExpect(res).to.include.all.keys('message', 'center');
          done();
        });
    });
  });
});

// templateTest('Add center', postRequest, centersUrl, newCenter, 'center');
