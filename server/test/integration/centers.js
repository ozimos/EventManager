/* eslint-disable no-console */
import {
  Users,
  Centers,
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
    password: 'abc123',
    confirmPassword: 'abc123',
    isAdmin: true
  };
  const defaultCenter = {
    id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
    name: 'Baranduil',
    description: 'a  dark and dank castle shrouded in gloom',
    cost: 50000,
    capacity: 5000,
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'Oshodi',
    amenities: ['Pool', 'Bar'],
    eventType: ['Cocktail', 'Birthday'],
    userId: defaultUser.id,

  };
  const newCenter = {
    id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
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
  const updatedCenter = {
    name: 'Updated center',
    state: 'updated state',
  };
  const payload = {
    isAdmin: true,
    id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b'
  };
  const rootURL = '/api/v1';
  const centersUrl = `${rootURL}/centers`;
  const centerIdUrl = `${rootURL}/centers/${defaultCenter.id}`;


  // Destroys defaultCenter & defaultUser and creates a new one before test
  // Creates JWT before test
  let token;
  before(async () => {
    try {
      await Centers.truncate({
        cascade: true
      });
      await Users.truncate({
        cascade: true
      });
      await Users.create(defaultUser);
      await Centers.create(defaultCenter);
      token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
        expiresIn: '1h'
      });
    } catch (error) {
      console.log(error);
    }
  });

  // Create A Center
  describe('POST /centers', () => {
    it('should create a center', () => request.post(centersUrl)
      .set('authorization', `JWT ${token}`)
      .send(newCenter).then((res) => {
        expect(res.body.id).to.be.equal(newCenter.id);
        expect(res.body.centerName).to.be.equal(newCenter.centerName);
      }));
  });

  // Get All Centers
  describe('GET /centers', () => {
    it('should return a list of centers', () => request.get(centersUrl)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].id).to.be.equal(defaultCenter.id);
        expect(res.body[0].name).to.be.equal(defaultCenter.name);
      }));
  });
  // Get One Center
  describe('GET /centers/:id', () => {
    it('should return a center', () =>
      request.get(centerIdUrl)
        .then((res) => {
          expect(res.body.id).to.be.equal(defaultCenter.id);
          expect(res.body.name).to.be.equal(defaultCenter.name);
        }));
  });
  // Update A Center
  describe('PUT /centers/:id', () => {
    it('should update a center', () => {
      request
        .put(centerIdUrl)
        .set('authorization', `JWT ${token}`)
        .send(updatedCenter)
        .then((res) => {
          expect(res.body.name).to.be.equal(updatedCenter.name);
          expect(res.body.state).to.be.equal(updatedCenter.state);
        });
    });
  });
});