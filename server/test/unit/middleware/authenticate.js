import {
  expect
} from 'chai';
import td from 'testdouble';
import Authenticate from '../../../middleware/authenticate.js';


const res = td.object();
// const jwt = td.object();

describe('Authentication middleware tests', () => {
  afterEach(() => td.reset());
  describe('verify', () => {
    it('returns an error message if no authorization header', () => {
      const req = {
        headers: {}
      };
      const message = 'No token provided.';
      td.when(res.status(401)).thenReturn(res);
      td.when(res.send({
        message
      })).thenReturn(message);
      const result = Authenticate.verify(req, res);
      expect(result).to.equal(message);
    });
    //   it('returns an error message if jwt verification fails', () => {
    //     const req = {
    //       headers: {
    //         authorization: 'JWT 123abc'
    //       }
    //     };
    //     const err = td.object({
    //       message: 'No token provided.'
    //     });
    //     process.env.TOKEN_PASSWORD = '123abc';
    //     const token = td.object();
    //     td.when(jwt.verify(token, process.env.TOKEN_PASSWORD)).thenCallback(err, null);
    //     td.when(res.status(403)).thenReturn(res);
    //     td.when(res.json({
    //       message: err.message
    //     })).thenReturn(err);
    //     const result = Authenticate.verify(req, res);
    //     expect(result).to.eql(err);
    //   });
  });
  describe('admin', () => {
    it('returns an error message if isAdmin field on req object is not true', () => {
      const req = {
        headers: {}
      };
      const message = 'You Are not Authorized to access this page!';
      td.when(res.status(401)).thenReturn(res);
      td.when(res.send({
        message
      })).thenReturn(message);
      const result = Authenticate.admin(req, res);
      expect(result).to.equal(message);
    });
  });
});