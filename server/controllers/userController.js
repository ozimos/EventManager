import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Controller from './controller';

dotenv.config();

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
    return this.Model
      .findOne({
        where: {
          email: req.body.email,
        },
      }).then((response) => {
        if (!response) {
          return res.status(404).send({
            message: 'Account does not exist! Visit /api/v1/users/signup and register.',
          });
        }
        bcrypt.compare(req.body.password, response.dataValues.passwordHash, (err, isCorrect) => {
          if (isCorrect) {
            const payloader = {
              isAdmin: this.Model.isAdmin,
              id: response.id,
            };
            const token = jwt.sign(payloader, process.env.TOKEN_PASSWORD, {
              expiresIn: 60 * 60
            });
            if (token) {
              return res.status(200).send({
                message: 'Login Successful',
                token,
              });
            }
          }
          return res.status(406).send({
            message: 'Incorrect password',
          });
        });
      }).catch(error => res.status(400).send({
        message: error,
      }));
  }

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  signUp(req, res) {
    return this.Model.findAll({
      where: {
        email: req.body.email,
      },
    }).then((response) => {
      if (response.length !== 0) {
        return res.status(406).send({
          message: 'Email has been used',
        });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          req.body.passwordHash = hash;
        });
      });
      delete req.body.password;
      return this.createRow(req, res);
    });
  }
}

export default UserController;
