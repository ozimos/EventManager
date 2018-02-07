import jwt from 'jsonwebtoken';

/**
 *
 *
 * @export
 * @class authenticate
 */
export default class IsUser {
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
      res.status(401).send({
        message: 'No token provided.'
      });
    } else {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      jwt.verify(token, process.env.TOKEN_PASSWORD, (err, decoded) => {
        if (err) {
          res.status(403).json({
            message: err.message
          });
        } else {
          req.decoded = decoded;
          // add userId field to request body
          req.body.userId = decoded.id;
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