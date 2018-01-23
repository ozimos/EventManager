import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 *
 *
 * @export
 * @class authenticate
 */
export default class authenticate {
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {function} any
   * @memberof authenticate
   */
  static verify(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
      res.status(403).json({
        message: 'Unauthorized Action'
      });
    } else {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, process.env.TOKEN_PASSWORD, (err, decoded) => {
        if (err) {
          res.status(403).json({
            message: err.message
          });
        } else {
          req.decoded = decoded;
        }
      });
      next();
    }
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {function} any
   * @memberof authenticate
   */
  static admin(req, res, next) {
    if (req.decoded && req.decoded.isAdmin) {
      next();
    } else {
      res.status(401).send({
        message: 'You Are not Authorized to access this page!'
      });
    }
  }
}
