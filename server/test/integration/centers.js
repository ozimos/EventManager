/* eslint-disable no-console */
import {
  Center,
  User,
  jwt,
  expect,
  request
} from './helpers';

describe('Routes Centers', () => {
  const defaultUser = {
    id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    userName: 'admin',
    firstName: 'Tovieye',
    lastName: 'Ozi',
    email: 'ad.min@gmail.com',
    passwordHash: 'abc123',
    isAdmin: true
  };
  const defaultCenter = {
    id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
    name: 'Baranduil',
    description: 'a  dark and dank castle shrouded in gloom',
    cost: 50000,
    capacity: 5000,
    country: 'Algeria',
    state: 'Lagos',
    lga: 'Oshodi',
    amenities: ['Pool', 'Bar'],
    eventType: ['Cocktail', 'Birthday'],
    userId: defaultUser.id
  };
  const payload = {
    isAdmin: defaultUser.isAdmin,
    id: defaultUser.id
  };
  const rootURL = '/api/v1';
  const centersUrl = `${rootURL}/centers`;
  const centerIdUrl = `${rootURL}/centers/${defaultCenter.id}`;


  // truncates Center & User and creates new row entries before test
  // Creates JWT before test
  let token;
  before(async () => {
    try {
      await Center.truncate({
        cascade: true
      });
      await User.truncate({
        cascade: true
      });
      await User.create(defaultUser);
      await Center.create(defaultCenter);
      token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
        expiresIn: '1h'
      });
    } catch (error) {
      console.log(error);
    }
  });


  // Get All Centers
  describe('GET /centers', () => {
    it('should return a list of centers', () => request.get(centersUrl)
      .then((res) => {
        expect(res.body).to.an('array');
        expect(res.body[0].name).to.equal(defaultCenter.name);
        expect(res.body[0].country).to.equal(defaultCenter.country);
      }));
  });
  // Get One Center
  describe('GET /centers/:id', () => {
    it('should return a center', () =>
      request.get(centerIdUrl)
        .then((res) => {
          expect(res.body.name).to.equal(defaultCenter.name);
          expect(res.body.country).to.equal(defaultCenter.country);
        }));
  });
  // Update A Center
  describe('PUT /centers/:id', () => {
    const updatedCenter = {
      name: 'Updated center',
      state: 'updated state',
    };

    it('should update a center', () => request.put(centerIdUrl)
      .set('authorization', `JWT ${token}`).send(updatedCenter).then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[1][0].name).to.equal(updatedCenter.name);
        expect(res.body[1][0].state).to.equal(updatedCenter.state);
      }));
  });

  // Create A Center
  describe('POST /centers', () => {
    const newCenter = {
      name: 'Maranatha center',
      description: 'a  dark and dank castle shrouded in gloom',
      cost: 200000.00,
      capacity: 5000,
      country: 'Nigeria',
      state: 'Lagos',
      lga: 'Oshodi',
      amenities: ['Pool', 'Bar'],
      eventType: ['Cocktail', 'Birthday'],
    };


    it('should create a center', () => request.post(centersUrl).set('authorization', `JWT ${token}`)
      .send(newCenter).then((res) => {
        expect(res.body.name).to.equal(newCenter.name);
        expect(res.body.userId).to.equal(payload.id);
      }));
  });
});