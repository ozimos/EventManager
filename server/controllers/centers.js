import centers from '../models/centers.js';

export default {
  /**
   *
   * Get All Centers
   * @param {obj} req
   * @param {obj} res
   * @returns {any} all centers
   * @memberof centerController
   */
  getAllCenters(req, res) {
    return res.json({
      message: 'Success',
      centers,
      error: false,
    });
  },

  /**
   *
   *  Get a single center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} A single center
   * @memberof centerController
   */
  getSingleCenter(req, res) {
    for (let i = 0; i < centers.length; i += 1) {
      if (centers[i].id === req.params.id) {
        return res.json({
          message: 'Success',
          center: centers[i],
          error: false,
        });
      }
    }
    return res.status(404).json({
      message: 'Center not Found',
      error: true,
    });
  },

  /**
   *
   * Creates a new center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} success, all centers
   * @memberof centerController
   */
  postCenter(req, res) {
    const newId = centers.length + 1;
    centers.push({
      id: newId,
      ...req.body
    });
    return res.json({
      message: 'success',
      center: centers[centers.length - 1],
      error: false,
    });
  },

  /**
   *
   *  Update a center
   * @param {obj} req
   * @param {obj} res
   * @returns {any} sucess, all centers
   * @memberof centerController
   */
  updateCenter(req, res) {
    for (let i = 0; i < centers.length; i += 1) {
      if (centers[i].id === req.params.id) {
        Object.keys(req.body).forEach((element) => {
          centers[i][element] = req.body[element];
        });

        return res.json({
          message: 'Success',
          center: centers[i],
          error: false,
        });
      }
    }

    return res.status(404).json({
      message: 'Center not Found',
      error: true
    });
  }
};
