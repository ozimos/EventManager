import {
  expect
} from 'chai';
import Sequelize from 'sequelize';
import td from 'testdouble';
import UserController from '../../../controllers/userController.js';

const OpAlias = Sequelize.Op;
const Op = td.object(OpAlias);
const User = td.object();
const userController = new UserController(User);
const req = {
  // provide either email or userName
  body: {
    email: 'some email',
    // userName: 'some userName',
    password: 'some password',
  }
};
const input = {
  where: {
    [Op.or]: [{
      email: req.body.email
    }, {
      userName: req.body.userName
    }]
  },
};

describe('User Controllers', () => {
  afterEach(() => td.reset());
  describe('login(req)', () => {
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'Account does not exist! Visit /api/v1/users/signup and register.';

      td.when(User.findOne(input)).thenResolve(null);
      userController.login(req)
        .then(response => expect(response.message).to.equal(expectedResponse));
    });
    it('should return an error message if password is incorrect', () => {
      const response = {
        passwordHash: 'some Hash'
      };
      const expectedResponse = 'Incorrect password';
      const bcrypt = {
        compareSync: td.func()
      };

      td.when(User.findOne(input)).thenResolve(response);
      td.when(bcrypt.compareSync(req.body.password, response.passwordHash)).thenResolve(false);
      userController.login(req)
        .then(response2 => expect(response2.message).to.equal(expectedResponse));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };

      td.when(User.findOne(input)).thenReject(error);
      userController.login(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('signUp(req)', () => {
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'email has been used';
      const dummyUser = {
        email: req.body.email,
        userName: req.body.userName
      };
      td.when(User.findOne(input)).thenResolve(dummyUser);
      userController.signUp(req)
        .then(response => expect(response.message).to.equal(expectedResponse));
    });

    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };

      td.when(User.findOne(input)).thenReject(error);
      userController.signUp(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('sendResponseWithToken(data)', () => {
    const data = {
      passwordHash: 'abc123',
      isAdmin: true,
      id: 'some id'
    };
    const jwt = {
      sign: td.func()
    };
    const payload = td.object();
    process.env.TOKEN_PASSWORD = 'abc123';
    const inputMessage = 'Signup Successful ';
    it('should create a token', () => {
      td.when(jwt.sign(payload, process.env.TOKEN_PASSWORD, {
        expiresIn: '1h'
      })).thenReturn('token');


      const response = UserController.sendResponseWithToken(data, inputMessage);

      expect(response.message).to.equal('Signup Successful Login Successful');
      expect(response.statusCode).to.equal(200);
      expect(response.data).to.eql(data);
    });
    // it('should return error message when token creation fails', () => {
    //   td.when(jwt.sign(payload, process.env.TOKEN_PASSWORD, {
    //     expiresIn: '1h'
    //   })).thenReturn(null);


    //   const response = UserController.sendResponseWithToken(data, inputMessage);

    //   expect(response.message).to.equal('Signup Successful No token found');
    //   expect(response.statusCode).to.equal(406);
    //   expect(response.data).to.eql(data);
    // });
  });
});