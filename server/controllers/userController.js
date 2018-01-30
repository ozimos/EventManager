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
    // check if user is in db
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
          // check if password is correct
          const isCorrectPassword = bcrypt.compareSync(req.body.password, response.passwordHash);

          if (isCorrectPassword) {
            UserController.sendResponseWIthToken(response, res);
          } else {
            res.status(406).send({
              message: 'Incorrect password',
            });
          }
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
    // check if email is available
    this.Model.findOne({
      where: {
        email: req.body.email,
      },
    }).then((response) => {
      if (response) {
        res.status(406).send({
          message: 'Email has been used',
        });
      } else {
        // create hash of password
        const salt = bcrypt.genSaltSync(10);
        req.body.passwordHash = bcrypt.hashSync(req.body.password, salt);
        // remove plaintext password from record to write to db
        delete req.body.password;
        // create user in db
        this.Model.create(req.body).then((row) => {
          // send response with token to client
          UserController.sendResponseWIthToken(row, res, 'Signup Successful');
        }).catch(error => res.status(400).send({
          message: error,
        }));
      }
    }).catch(error => res.status(400).send({
      message: error,
    }));
  }

  /**
   *
   *
   * @param {Sequelize<Model<Instance>>} row
   * @param {Express} res
   * @param {String} extraMessage
   * @returns {obj} HTTP Response
   * @memberof UserController
   */
  static sendResponseWIthToken(row, res, extraMessage) {
    // remove password info
    row.passwordHash = 'censored';

    const message = extraMessage ? [extraMessage] : [];
    const payloader = {
      isAdmin: row.isAdmin,
      id: row.id,
    };
    const token = jwt.sign(payloader, process.env.TOKEN_PASSWORD, {
      expiresIn: '1h'
    });
    if (token) {
      message.push('Login Successful');
      res.status(200).send({
        row,
        message,
        token,
      });
    } else {
      message.push('No token found');
      res.status(406).send({
        message
      });
    }
  }
}

export default UserController;