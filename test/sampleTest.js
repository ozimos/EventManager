import supertest from 'supertest';
import {
  expect
} from 'chai';
import app from '../server/app.js';


// Get port from environment and store in Express.
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT);

const request = supertest(server);

const rootURL = '/api/v1';

const user = {
  // id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
  userName: 'ozimos',
  firstName: 'Tovieye',
  lastName: 'Ozi',
  email: 'tovieye.ozi@gmail.com',
  password: 'abc123',
  confirmPassword: 'abc123',
};


const adminUser = {
  id: 'c848bf5c-27ab-4882-9e43-ffe178c82602',
  userName: 'admin',
  firstName: 'Tovieye',
  lastName: 'Ozi',
  email: 'ad.min@gmail.com',
  password: 'abc123',
  confirmPassword: 'abc123',
  isAdmin: true
};

let token1;
after((done) => {
  server.close();
  done();
});
const response = request.post(`${rootURL}/users`).send(adminUser);

describe('create admin user', () => {
  it('issues admin token', () => response.then(res => expect(res.status).to.equal(200)));
});