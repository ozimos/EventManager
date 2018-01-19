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
    return this.Model
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
    return this.Model
      .findAll()
      .then((rows) => {
        if (rows.length > 0) {
          return res.status(200).json(rows);
        }
        return res.status(404).send('no rows available');
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
    return this.Model.findById(req.params)
      .then((rows) => {
        if (!rows) {
          return res.status(404).send('Event not found');
        }
        return res.status(200).json(rows);
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
    return this.Model.update(req.body, {
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
    return this.Model
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
