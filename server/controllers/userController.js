import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Controller from './controller';

/**
 *
 *
 * @class UserController
 */
class UserController extends Controller {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  login(req, res) {
    this.Model
      .findOne({
        where: {
          email: req.body.email,
        },
      }).then((response) => {
        if (!response) {
          res.status(404).send({
            message: 'Account does not exist! Visit /api/v1/users/signup and register.',
          });
        } else {
          bcrypt.compare(req.body.password, response.passwordHash, (err, isCorrect) => {
            if (isCorrect) {
              const payloader = {
                isAdmin: this.Model.isAdmin,
                id: response.id,
              };
              const token = jwt.sign(payloader, process.env.TOKEN_PASSWORD, {
                expiresIn: 60 * 60
              });
              if (token) {
                res.status(200).send({
                  message: 'Login Successful',
                  token,
                });
              } else {
                res.status(406).send({
                  message: 'No token found',
                });
              }
            } else {
              res.status(406).send({
                message: `Incorrect password: ${err.message} `,
              });
            }
          });
        }
      }).catch(error => res.status(400).send({
        message: error,
      }));
  }

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  signUp(req, res) {
    this.Model.findAll({
      where: {
        email: req.body.email,
      },
    }).then((response) => {
      if (response.length !== 0) {
        res.status(406).send({
          message: 'Email has been used',
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            req.body.passwordHash = hash;
          });
        });
        delete req.body.password;
        this.createRow(req, res);
      }
    });
  }
}

export default UserController;
