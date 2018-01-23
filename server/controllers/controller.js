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
   * @param {any} req
   * @param {any} res
   * @returns {obj} HTTP Response
   * @memberof Controller
   */
  createRow(req, res) {
    this.Model
      .create(req.body)
      .then(row => res.status(201).json(row))
      .catch(error => res.status(400).send(error.message));
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
          res.status(404).send('no rows available');
        }
      })
      .catch(error => res.status(400).send(error.message));
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
    this.Model.findById(req.params)
      .then((rows) => {
        if (!rows) {
          res.status(404).send('Event not found');
        } else {
          res.status(200).json(rows);
        }
      })
      .catch(error => res.status(400).send(error.message));
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
        id: req.params
      },
      returning: true
    })
      .then(rows => res.status(200).json(rows))
      .catch(error => res.status(422).send(error.message));
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
          id: req.params
        },
      })
      .then(result => res.status(204).json(result))
      .catch(error => res.status(422).send(error.message));
  }
}

export default Controller;
