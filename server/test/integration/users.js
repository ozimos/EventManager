/* eslint-disable no-console */
import {
  User,
  expect,
  request,
  defaultUser,
  defaultPassword,
  rootURL
} from './helpers';

describe('Routes Users', () => {
  const signUpUrl = `${rootURL}/users`;
  const logInUrl = `${rootURL}/users/login`;


  before(async () => {
    try {
      await User.truncate({
        cascade: true
      });
      await User.create(defaultUser);
    } catch (error) {
      console.log(error);
    }
  });
  // SignUp A User
  describe('POST /users', () => {
    const newUser = {
      userName: 'ozimos',
      firstName: 'Tovieye',
      lastName: 'Ozi',
      email: 'tovieye.ozi@gmail.com',
      password: 'abc123',
      confirmPassword: 'abc123',
    };
    it('should signup new user', () => request.post(signUpUrl)
      .send(newUser).then((res) => {
        expect(res.body.row.userName).to.equal(newUser.userName);
        expect(res.body.row.email).to.equal(newUser.email);
        // eslint-disable-next-line
        expect(res.body.token).to.exist;
      }));
  });

  // Login A User
  describe('POST /users/login', () => {
    const credentials = {
      email: defaultUser.email,
      password: defaultPassword,
    };
    it('should login new user', () => request.post(logInUrl).send(credentials).then((res) => {
      expect(res.body.row.userName).to.equal(defaultUser.userName);
      expect(res.body.row.email).to.equal(defaultUser.email);
      // eslint-disable-next-line
      expect(res.body.token).to.exist;
    }));
  });
});