/**
 *
 *
 * @class Controller
 */
class Controller {
  /**
   * Creates an instance of Controller.
   * @param {any} Model
   * @memberof Controller
   */
  constructor(Model) {
    this.Model = Model;
  }

  /**
   *
   *
   * @static
   * @param {object} instance
   * @param {String} method
   * @returns {function} Express middleware
   * @memberof Controller
   */
  static select(instance, method) {
    return (req, res) => {
      instance[method](req, res);
    };
  }

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} HTTP Response
   * @memberof Controller
   */
  createRow(req, res) {
    this.Model
      .create(req.body)
      .then(row => res.status(201).json(row))
      .catch(error => res.status(400).send(error));
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} Model
   * @memberof Controller
   */
  getAllRows(req, res) {
    this.Model
      .findAll()
      .then((rows) => {
        if (rows.length > 0) {
          res.status(200).json(rows);
        } else {
          res.status(404).send('no records available');
        }
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} Model
   * @memberof Controller
   */
  getRowById(req, res) {
    this.Model.findById(req.params.id)
      .then((rows) => {
        if (!rows) {
          res.status(404).send('Event not found');
        } else {
          res.status(200).json(rows);
        }
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} Model
   * @memberof Controller
   */
  updateRow(req, res) {
    this.Model.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
      .then(rows => res.status(200).json(rows))
      .catch(error => res.status(422).send(error));
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} Model
   * @memberof Controller
   */
  deleteRow(req, res) {
    this.Model
      .destroy({
        where: {
          id: req.params.id
        },
      })
      .then(result => res.status(200).send(`${result} record deleted`))
      .catch(error => res.status(422).send(error));
  }
}

export default Controller;
